import { getBooking, getCabin } from "@/app/_lib/data-service";
import UpdateReservationForm from "@/app/_components/UpdateReservationForm";

export const metadata = {
  title: "Edit reservation",
};

export default async function Page({ params }) {
  const { bookingId } = params;
  const booking = await getBooking(bookingId);
  const { max_capacity: maxCapacity } = await getCabin(booking.cabin_id);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-300 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <UpdateReservationForm booking={booking} maxCapacity={maxCapacity} />
    </div>
  );
}
