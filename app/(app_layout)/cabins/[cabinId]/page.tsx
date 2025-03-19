import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cabinId: string }>;
}) {
  const cabinId = Number((await params).cabinId);
  const { name: cabinName } = await getCabin(cabinId);
  return {
    title: `Cabin ${cabinName}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  return cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ cabinId: string }>;
}) {
  const cabinId = Number((await params).cabinId);
  const cabin = await getCabin(cabinId);
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-300">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
