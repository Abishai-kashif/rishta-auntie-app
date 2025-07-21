import { Heart, Loader2 } from "lucide-react";

function MatchLoader() {
  return (
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Heart className="h-12 w-12 text-pink-600 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Finding Your Perfect Matches</h2>
            <p className="text-gray-600 mb-6">Our AI is analyzing profiles to find the best matches for you...</p>
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-6 w-6 text-pink-600 animate-spin" />
              <span className="text-pink-600 font-medium">Loading matches...</span>
            </div>
            <div className="mt-6">
              <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default MatchLoader;
