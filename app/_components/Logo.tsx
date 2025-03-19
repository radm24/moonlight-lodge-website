import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

type LogoProps = {
  isHomepage?: boolean;
};

function Logo({ isHomepage }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src={logo}
        width="60"
        height="60"
        quality={100}
        alt="Moonlight Lodge logo"
      />
      <span
        className={`text-xl font-semibold ${isHomepage ? "text-primary-700" : ""}`}
      >
        Moonlight Lodge
      </span>
    </Link>
  );
}

export default Logo;
