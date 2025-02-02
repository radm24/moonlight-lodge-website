import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.jpg";

export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill
        placeholder="blur"
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-accent-500 drop-shadow-lg mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-300 px-8 py-6 text-primary-900 text-lg font-semibold hover:bg-accent-400 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
