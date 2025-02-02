import Link from "next/link";
import Header from "@/app/_components/Header";

export const metadata = {
  title: "Not found",
};

function NotFound() {
  return (
    <>
      <Header />
      <div className="flex-1 px-8 py-12 grid">
        <main className="max-w-7xl mx-auto w-full">
          <main className="text-center space-y-6 mt-4">
            <h1 className="text-3xl font-semibold">
              This page could not be found :(
            </h1>
            <Link
              href="/"
              className="inline-block bg-accent-300 text-primary-900 px-6 py-3 text-lg hover:bg-accent-400 transition-all"
            >
              Go back home
            </Link>
          </main>
        </main>
      </div>
    </>
  );
}

export default NotFound;
