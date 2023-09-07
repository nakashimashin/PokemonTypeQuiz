import Link from "next/link";

export default function Header() {
    return (
      <header className="fixed top-0 w-full bg-rose-500 p-4 z-10">
        <nav className="flex justify-between mx-auto container items-center">
            <div className="text-white font-bold text-4xl">POKETYPE</div>
            <div className="space-x-12">
                {/* <Link href="" className="text-white font-bold text-3xl no-underline hover:underline">usename</Link> */}
                <Link href="/" className="text-white font-bold text-3xl no-underline hover:underline">×</Link>
            </div>
        </nav>
      </header>
    );
  }