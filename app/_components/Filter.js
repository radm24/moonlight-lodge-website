"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Filter({ filterField, options }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeFilter = searchParams.get("capacity") ?? options[0].value;

  function handleFIlter(filterValue) {
    const params = new URLSearchParams(searchParams);
    params.set(filterField, filterValue);
    router.replace(pathname + "?" + params.toString(), { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      {options.map((option, idx) => (
        <button
          key={idx}
          className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === option.value ? "bg-primary-700 text-primary-50" : ""}`}
          onClick={() => handleFIlter(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
