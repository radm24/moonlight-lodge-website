import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Filter from "@/app/_components/Filter";
import CabinsList from "@/app/_components/CabinsList";
import ReservationReminder from "@/app/_components/ReservationReminder";

// export const revalidate = 3600;

export const metadata = {
  title: "Cabins",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
    capacity: string | undefined;
  }>;
}) {
  const filterCapacity = {
    field: "capacity",
    value: (await searchParams)?.capacity || "all",
  };

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-300 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature's beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter
          filterField={filterCapacity.field}
          options={[
            {
              value: "all",
              label: "All cabins",
            },
            {
              value: "small",
              label: "2—3 guests",
            },
            {
              value: "medium",
              label: "4—7 guests",
            },
            {
              value: "large",
              label: "8—12 guests",
            },
          ]}
        />
      </div>

      <Suspense fallback={<Spinner />} key={filterCapacity.value}>
        <CabinsList filter={filterCapacity} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
