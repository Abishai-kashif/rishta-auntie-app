"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Cta, Feature, Hero, Testimonials } from "@/components/sections/";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SignInButton, SignedOut, useClerk, useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { isLoaded, isSignedIn } = useUser();
  const searchParams = useSearchParams();
  const openModal = searchParams.has("signout");
  const clerk = useClerk();

  useEffect(() => {
    if (openModal && !isSignedIn && isLoaded) {
      clerk.openSignIn();
    }
  }, [openModal, isSignedIn, isLoaded, clerk]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <Header
          children={
            <div className="space-x-4">
              {isSignedIn ? (
                <Link href="/dashboard" prefetch={false}>
                  <Button className="bg-pink-600 hover:bg-pink-700">
                    Find Matches
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : !isLoaded ? (
                <Skeleton className="size-[26px] rounded-full" />
              ) : (
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button className="bg-pink-600 hover:bg-pink-700">
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </SignInButton>
                </SignedOut>
              )}
            </div>
          }
        />

        <main>
          <Hero />
          <Feature />
          <Testimonials />
          <Cta />
        </main>
      </div>
      <Footer />
    </>
  );
}
