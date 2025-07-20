import Header from "@/components/layout/header";
import { Cta, Feature, Hero, Testimonials } from "@/components/sections/";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Header
        children={
          <Link href="/rishtas">
            <Button className="bg-pink-600 hover:bg-pink-700">
              Find Matches
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        }
      />

      <main>
        <Hero />
        <Feature />
        <Testimonials />
        <Cta />
      </main>
    </div>
  );
}
