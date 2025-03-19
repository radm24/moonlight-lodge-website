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

type NewBookingData = {
  start_date: string;
  end_date: string;
  num_nights: number;
  cabin_price: number;
  cabin_id: number;
};

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalId = formData.get("nationalId") as string;
  const [nationality, countryFlag] = (
    formData.get("nationality") as string
  ).split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalId))
    return { message: "Please provide a valid national ID" };

  const updatedFields = {
    national_id: nationalId,
    nationality,
    country_flag: countryFlag,
  };

  try {
    const userId = Number(session.user!.id);
    await updateGuest(userId, updatedFields);
    revalidatePath("/account/profile");
  } catch (err) {
    throw new Error((err as Error).message);
  }
}

export async function createReservation(
  bookingData: NewBookingData,
  formData: FormData
) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newReservation = {
    ...bookingData,
    guest_id: Number(session.user!.id),
    num_guests: Number(formData.get("numGuests")),
    observations: (formData.get("observations") as string).slice(0, 1000),
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
    throw new Error((err as Error).message);
  }

  redirect("/cabins/thankyou");
}

export async function updateReservation(bookingId: number, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const bookings = await getBookings(Number(session.user!.id));
  if (!bookings.find((booking) => booking.id === bookingId))
    throw new Error("You are not allowed to delete this reservation");

  const numGuests = Number(formData.get("numGuests"));
  const observations = (formData.get("observations") as string).slice(0, 1000);
  const updatedFields = { num_guests: numGuests, observations };

  try {
    await updateBooking(bookingId, updatedFields);
    revalidatePath(`/account/reservations/edit/${bookingId}`);
    revalidatePath("/account/reservations");
  } catch (err) {
    throw new Error((err as Error).message);
  }

  redirect("/account/reservations");
}

export async function deleteReservation(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(Number(session.user!.id));
  if (!guestBookings.find((booking) => booking.id === bookingId))
    throw new Error("You are not allowed to delete this reservation");

  try {
    await deleteBooking(bookingId);
    revalidatePath("/account/reservations");
  } catch (err) {
    throw new Error((err as Error).message);
  }
}
