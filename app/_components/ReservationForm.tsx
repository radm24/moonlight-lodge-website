"use client";

import { User } from "next-auth";
import { useReservation } from "@/app/_components/ReservationContext";
import { differenceInDays } from "date-fns";
import { CabinAllFieldsType } from "@/app/_lib/data-service";
import { createReservation } from "@/app/_lib/actions";
import SubmitButton from "@/app/_components/SubmitButton";

type ReservationFormProps = {
  user: User;
  cabin: CabinAllFieldsType;
};

function ReservationForm({ user, cabin }: ReservationFormProps) {
  const { range, resetRange } = useReservation();
  const {
    id: cabinId,
    max_capacity: maxCapacity,
    regular_price: regularPrice,
    discount,
  } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  let createReservationWithData:
    | ((formData: FormData) => Promise<void>)
    | undefined;
  if (startDate && endDate) {
    const numNights = differenceInDays(endDate, startDate);
    const cabinPrice = numNights * (regularPrice - discount);

    const bookingData = {
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      num_nights: numNights,
      cabin_price: cabinPrice,
      cabin_id: cabinId,
    };
    createReservationWithData = createReservation.bind(null, bookingData);
  }

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as {user.name}</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image ?? ""}
            alt={user.name ?? ""}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={(formData) => {
          if (!createReservationWithData) return;
          createReservationWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
