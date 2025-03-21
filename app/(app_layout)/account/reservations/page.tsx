import Link from "next/link";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
import ReservationList from "@/app/_components/ReservationList";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session = (await auth())!;
  const userId = Number(session.user!.id);
  const bookings = await getBookings(userId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-300 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-400" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
