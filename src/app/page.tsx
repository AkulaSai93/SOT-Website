import { TopBar } from "@/components/site/TopBar";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Legacy } from "@/components/sections/Legacy";
import { BestOfBoth } from "@/components/sections/BestOfBoth";
import { BuiltDifferent } from "@/components/sections/BuiltDifferent";
import { Specializations } from "@/components/sections/Specializations";

export default function Home() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Legacy />
        <BestOfBoth />
        <BuiltDifferent />
        <Specializations />
      </main>
    </>
  );
}
