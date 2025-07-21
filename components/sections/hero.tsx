import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Heart, Sparkles } from "lucide-react";

function Hero() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2 bg-pink-100 px-4 py-2 rounded-full">
            <Sparkles className="h-5 w-5 text-pink-600" />
            <span className="text-pink-700 font-medium">
              AI-Powered Matchmaking
            </span>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Rishta Auntie!
          </span>
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Meet your perfect match with the wisdom of a traditional Rishta
          Auntie, powered by modern AI technology. Get personalized
          recommendations and find your life partner today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard" prefetch={false}>
            <Button
              size="lg"
              className="bg-pink-600 hover:bg-pink-700 text-lg px-8 py-3"
            >
              Start Finding Matches
              <Heart className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Link href="#features">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 bg-transparent"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
