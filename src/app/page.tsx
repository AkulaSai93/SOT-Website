import { TopBar } from "@/components/site/TopBar";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
      </main>
    </>
  );
}
