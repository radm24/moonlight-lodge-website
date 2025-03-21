import Image from "next/image";
import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/solid";
import { CabinLimitedFieldsType } from "@/app/_lib/data-service";
import CabinPrice from "@/app/_components/CabinPrice";

type CabinCardProps = {
  cabin: CabinLimitedFieldsType;
};

function CabinCard({ cabin }: CabinCardProps) {
  const {
    id,
    name,
    max_capacity: maxCapacity,
    regular_price: regularPrice,
    discount,
    image,
  } = cabin;

  return (
    <div className="flex border-primary-800 border">
      <div className="flex-1 relative">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover border-r border-primary-800"
        />
      </div>

      <div className="flex-grow">
        <div className="pt-5 pb-4 px-7 bg-primary-900">
          <h3 className="text-accent-400 font-semibold text-2xl mb-3">
            Cabin {name}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <CabinPrice regularPrice={regularPrice} discount={discount} />
        </div>

        <div className="bg-primary-900 border-t border-t-primary-800 text-right">
          <Link
            href={`/cabins/${id}`}
            className="border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-400 transition-all hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
