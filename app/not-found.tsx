import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <Heart className="h-24 w-24 text-pink-300 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Oops! It looks like this page doesn't exist. Let's get you back to finding your perfect match.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full bg-pink-600 hover:bg-pink-700">
              <Home className="mr-2 h-4 w-4" />
              Go to Homepage
            </Button>
          </Link>
          <Link href="/rishtas">
            <Button variant="outline" className="w-full bg-transparent">
              <Search className="mr-2 h-4 w-4" />
              Browse Matches
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
