"use server";

import { auth } from "@/app/_lib/auth";
import { signIn, signOut } from "@/app/_lib/auth";
import {
  updateGuest,
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} from "@/app/_lib/data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalId = formData.get("nationalId");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalId))
    throw new Error("Please provide a valid national ID");

  const updatedFields = {
    national_id: nationalId,
    nationality,
    country_flag: countryFlag,
  };

  try {
    await updateGuest(session.user.id, updatedFields);
    revalidatePath("/account/profile");
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function createReservation(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newReservation = {
    ...bookingData,
    guest_id: session.user.id,
    num_guests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extras_price: 0,
    total_price: bookingData.cabin_price,
    status: "unconfirmed",
    has_breakfast: false,
    is_paid: false,
  };

  try {
    await createBooking(newReservation);
    revalidatePath(`/cabins/${bookingData.cabin_id}`);
  } catch (err) {
    throw new Error(err.message);
  }

  redirect("/cabins/thankyou");
}

export async function updateReservation(bookingId, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const bookings = await getBookings(session.user.id);
  if (!bookings.find((booking) => booking.id === bookingId))
    throw new Error("You are not allowed to delete this reservation");

  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000);
  const updatedFields = { num_guests: numGuests, observations };

  try {
    await updateBooking(bookingId, updatedFields);
    revalidatePath(`/account/reservations/edit/${bookingId}`);
    revalidatePath("/account/reservations");
  } catch (err) {
    throw new Error(err.message);
  }

  redirect("/account/reservations");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.id);
  if (!guestBookings.find((booking) => booking.id === bookingId))
    throw new Error("You are not allowed to delete this reservation");

  try {
    await deleteBooking(bookingId);
    revalidatePath("/account/reservations");
  } catch (err) {
    throw new Error(err.message);
  }
}
