"use client"

import { useState } from "react"
import { MatchCard } from "@/components/match-card"
import { ChatModal } from "@/components/chat-modal"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export interface Match {
  name: string
  age: number
  location: string
  interests: string[]
  avatar?: string
}

// Mock initial data
const initialMatches: Match[] = [
  {
    name: "Muneeb",
    age: 22,
    location: "Karachi",
    interests: ["reading", "gaming", "photography"],
  },
  {
    name: "Fatima",
    age: 24,
    location: "Lahore",
    interests: ["cooking", "traveling", "music"],
  },
  {
    name: "Ahmed",
    age: 26,
    location: "Islamabad",
    interests: ["sports", "technology", "movies"],
  },
  {
    name: "Zara",
    age: 23,
    location: "Karachi",
    interests: ["art", "books", "yoga"],
  },
  {
    name: "Hassan",
    age: 25,
    location: "Lahore",
    interests: ["fitness", "coding", "cricket"],
  },
  {
    name: "Ayesha",
    age: 27,
    location: "Islamabad",
    interests: ["fashion", "dancing", "food"],
  },
]

export default function HomePage() {
  const [matches, setMatches] = useState<Match[]>(initialMatches)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const updateMatches = (newMatches: Match[]) => {
    setMatches(newMatches)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Rishta Aunite</h1>
              <p className="text-gray-600 mt-1 hidden sm:block">Find your perfect match with AI assistance</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{matches.length} matches found</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match, index) => (
            <MatchCard key={`${match.name}-${index}`} match={match} />
          ))}
        </div>

        {matches.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No matches found</div>
            <p className="text-gray-400 mt-2">Try chatting with Rishta Auntie to find better matches!</p>
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
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} onMatchesUpdate={updateMatches} />
    </div>
  )
}
