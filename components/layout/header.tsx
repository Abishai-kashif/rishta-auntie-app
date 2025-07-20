import { Heart } from "lucide-react";
import React from "react";

function Header({ children }: { children: React.ReactNode }) {
  return  (
    <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-600" />
              <h1 className="text-xl leading-none sm:text-2xl font-bold text-gray-900">Rishta Connect</h1>
            </div>
            { children }
          </div>
        </div>
    </header> 
    )
}

export default Header;
