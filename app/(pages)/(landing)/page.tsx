import Image from "next/image";
import LandingCTA from "./cta";
import { useAuthState } from "@/hooks/useAuthState";

export default async function Home() {
  const { signedIn } = await useAuthState();

  return (
    <main className="flex flex-col items-center">
      <Image src="/images/landing.svg" alt="background" width={1440} height={562} className="w-screen absolute left-0 top-[80px] z-[-1]" />
      <div className="mt-[200px] flex flex-col items-center">
        <h1 className="text-7xl font-bold mb-6 text-center">Achieve anything.</h1>
        <p className="text-2xl text-gray-500 text-center mb-8">The only thing limiting you from success is yourself.</p>
        <div className="grid grid-cols-2 gap-4">
          <LandingCTA signedIn={signedIn} />
        </div>
      </div>
    </main>
  );
}