"use client"

import { ChatModal } from "@/components/chat-modal";
import Header from "@/components/layout/header";
import { MatchCard } from "@/components/match-card";
import MatchLoader from "@/components/match-loader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Match, MatchRespones } from "@/type";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import Footer from "@/components/layout/footer";

export default function RishtasPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMatchesEmpty, setIsMatchesEmpty] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { isLoaded, user, isSignedIn } = useUser();
  const { push } = useRouter();

  useEffect(() => {
    async function fetchMatches() {
      try {
        setLoading(true);

        const pythonApiUrl =
          process.env.PYTHON_API_URL || "http://localhost:8000";
        const baseUrl = `${pythonApiUrl}/users`;

        const response = await fetch(baseUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data: MatchRespones = await response.json();
        const users = data?.users || [];

        setIsMatchesEmpty(users?.length === 0);

        setMatches(users);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, []);

   useEffect(() => {
    if (!isSignedIn) push("/?signout=true")
  }, [isSignedIn, user, push]);

  if (!isSignedIn) return null;

  const updateMatches = (newMatches: Match[]) => {
    setMatches(newMatches);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pb-10">
        <Header
          children={
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 hidden sm:inline-block">
                {matches.length} matches found
              </span>

              <span>
                {!isLoaded ? (
                  <Skeleton className="size-[26px] rounded-full" />
                ) : (
                  <>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <Image
                          title="My account"
                          src="/account-alert-icon.png"
                          alt="Alert Account Icon"
                          height={28}
                          width={28}
                          className="size-[26px] object-contain object-center shrink-0 cursor-pointer"
                        />
                      </SignInButton>
                    </SignedOut>
                    <SignedIn>
                      <UserButton
                        appearance={{
                          elements: {
                            userButtonBox: "relative mt-1.5",
                            userButtonAvatar: "size-[26px]",
                          },
                        }}
                      />
                    </SignedIn>
                  </>
                )}
              </span>

              <Button
                onClick={() => setIsChatOpen(true)}
                className="bg-pink-600 hover:bg-pink-700"
                size="sm"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat with Auntie
              </Button>
            </div>
          }
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-pink-100 p-2 rounded-full">
                <MessageCircle className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 leading-tight mb-2">
                  Welcome to Your Match Dashboard
                </h2>
                <p className="text-gray-600">
                  Chat with Rishta Auntie to refine your matches and find your
                  perfect partner
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsChatOpen(true)}
              className="bg-pink-600 hover:bg-pink-700"
            >
              Start Conversation with Rishta Auntie
              <MessageCircle className="ml-2 h-4 w-4 hidden sm:inline-block" />
            </Button>
          </div>
          {loading ? (
            <MatchLoader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((match, index) => (
                <MatchCard key={`${match.name}-${index}`} match={match} />
              ))}
            </div>
          )}

          {isMatchesEmpty && (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <div className="text-gray-500 text-lg mb-2">No matches found</div>
                <p className="text-gray-400 mb-6">
                  Try chatting with Rishta Auntie to find better matches!
                </p>
                <Button
                  onClick={() => setIsChatOpen(true)}
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  Chat with Rishta Auntie
                  <MessageCircle className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </main>

        {/* Chat Modal Toggle Button */}
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-pink-600 hover:bg-pink-700 z-40"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>

        {/* Chat Modal */}
        <ChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          onMatchesUpdate={updateMatches}
        />
      </div>
      <Footer />
    </>
  );
}
