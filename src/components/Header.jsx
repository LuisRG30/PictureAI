import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={`xPaddings py-4 relative gradient-01`}>
      <div className="absolulte gradient-03 inset-0" />
      <div className={`flex justify-between gap-8 max-width`}>
        <div
          className="flex flex-row justify-center items-center gap-3 cursor-pointer relative"
          onClick={() => {
            router.push("/");
          }}
        >
          <img
            src="/assets/images/logo.png"
            alt="logo-icon"
            className="w-[240px] h-[102px] object-contain"
          />
        </div>

        <div className="flex gap-5">
          <Link href="/mystery-box" className="flex items-center">
            <p
              className={`${
                pathname === "/mystery-box" ? "text-white" : "text-gray-500"
              }`}
            >
              Mystery Boxes
            </p>
          </Link>
          <Link href="/products" className="flex items-center">
            <div className="flex flex-row gap-0.5 cursor-pointer items-center">
              <p
                className={`${
                  pathname === "/products" ? "text-white" : "text-gray-500"
                }`}
              >
                Buy Now
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Header };
