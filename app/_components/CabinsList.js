// import { unstable_noStore as noStore } from "next/cache";
import { getCabins } from "@/app/_lib/data-service";
import CabinCard from "@/app/_components/CabinCard";

export default async function CabinsList({ filter }) {
  // noStore();
  const cabins = await getCabins();

  if (!cabins.length) return null;

  const filteredCabins = cabins.filter((cabin) => {
    if (filter.field === "capacity") {
      switch (filter.value) {
        case "all":
          return true;
        case "small":
          return cabin.max_capacity <= 3;
        case "medium":
          return cabin.max_capacity >= 4 && cabin.max_capacity <= 7;
        case "large":
          return cabin.max_capacity >= 8;
      }
    }
    return true;
  });

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard key={cabin.id} cabin={cabin} />
      ))}
    </div>
  );
}
