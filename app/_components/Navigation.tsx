import { auth } from "@/app/_lib/auth";
import Link from "next/link";

type NavigationProps = {
  isHomepage?: boolean;
};

export default async function Navigation({ isHomepage }: NavigationProps) {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className={`${isHomepage ? "text-primary-700" : ""} ${isHomepage ? "hover:text-accent-500" : "hover:text-accent-300"} transition-colors`}
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`${isHomepage ? "text-primary-700" : ""} ${isHomepage ? "hover:text-accent-500" : "hover:text-accent-300"} transition-colors`}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className={`${isHomepage ? "text-primary-700" : ""} ${isHomepage ? "hover:text-accent-500" : "hover:text-accent-300"} transition-colors flex items-center gap-4`}
          >
            {session?.user?.image && (
              <img
                src={session.user.image}
                className="h-8 rounded-full"
                alt={session.user.name ?? ""}
                referrerPolicy="no-referrer"
              />
            )}
            <span>Guest area</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
