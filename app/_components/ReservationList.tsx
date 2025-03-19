"use client";

import { useOptimistic } from "react";
import { BookingsType } from "../_lib/data-service";
import { deleteReservation } from "@/app/_lib/actions";
import ReservationCard from "@/app/_components/ReservationCard";

type ReservationListProps = {
  bookings: BookingsType;
};

export default function ReservationList({ bookings }: ReservationListProps) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          key={booking.id}
          booking={booking}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
