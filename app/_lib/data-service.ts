import { Database } from "./database.types";
import { eachDayOfInterval } from "date-fns";
import supabase from "@/app/_lib/supabase";
import { notFound } from "next/navigation";

/////////////
// GET

export const getCabins = async function () {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, max_capacity, regular_price, discount, image")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

export async function getCabin(id: number) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

// Guests are uniquely identified by their email address
export async function getGuest(email: string) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getBookings(guestId: number) {
  const { data, error, count } = await supabase
    .from("bookings")
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      "id, created_at, start_date, end_date, num_nights, num_guests, total_price, guest_id, cabin_id, cabins(name, image)"
    )
    .eq("guest_id", guestId)
    .order("start_date");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getBooking(id: number) {
  const { data, error, count } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }

  return data;
}

export async function getBookedDatesByCabinId(cabinId: number) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabin_id", cabinId)
    .or(`start_date.gte.${today.toISOString()},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.start_date),
        end: new Date(booking.end_date),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getCountries() {
  type Country = {
    name: string;
    flag: string;
    independent: boolean;
  };

  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries: Country[] = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

export async function createGuest(newGuest: {
  email: string;
  full_name: string;
}) {
  console.log(newGuest);
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function createBooking(newBooking: NewBookingType) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(
  id: number,
  updatedFields: GuestUpdateFieldsType
) {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  return data;
}

export async function updateBooking(
  id: number,
  updatedFields: BookingUpdateFieldsType
) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id: number) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

/////////////
// Types
export type CabinsType = Awaited<ReturnType<typeof getCabins>>;
export type CabinAllFieldsType = Awaited<ReturnType<typeof getCabin>>;
export type GuestType = Awaited<ReturnType<typeof getGuest>>;
export type BookingsType = Awaited<ReturnType<typeof getBookings>>;
export type BookingType = Awaited<ReturnType<typeof getBooking>>;
export type BookedDatesType = Awaited<
  ReturnType<typeof getBookedDatesByCabinId>
>;
export type SettingsType = Awaited<ReturnType<typeof getSettings>>;
export type CountriesType = Awaited<ReturnType<typeof getCountries>>;
export type CabinLimitedFieldsType = {
  id: number;
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  image: string;
};
export type BookingWithCabinType = {
  id: number;
  created_at: string;
  start_date: string;
  end_date: string;
  num_nights: number;
  num_guests: number;
  total_price: number;
  guest_id: number;
  cabin_id: number;
  cabins: {
    name: string;
    image: string;
  };
};
type NewBookingType = Database["public"]["Tables"]["bookings"]["Insert"];
type GuestUpdateFieldsType = {
  national_id: string | null;
  nationality: string | null;
  country_flag: string | null;
};
type BookingUpdateFieldsType = {
  num_guests: number;
  observations: string;
};
