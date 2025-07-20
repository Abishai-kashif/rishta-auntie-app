import React from "react";
import { Card, CardContent } from "../ui/card";
import { Star } from "lucide-react";

function Testimonials() {
  return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-gray-600">See what our users say about finding their perfect match</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Rishta Auntie understood exactly what I was looking for. The AI conversations felt so natural, and I
                  found my perfect match within weeks!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-pink-600 font-semibold">A</span>
                  </div>
                  <div>
                    <p className="font-semibold">Ayesha K.</p>
                    <p className="text-sm text-gray-500">Karachi</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The personalized recommendations were spot-on. It's like having a real Rishta Auntie who knows
                  exactly what you need!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-semibold">M</span>
                  </div>
                  <div>
                    <p className="font-semibold">Muhammad A.</p>
                    <p className="text-sm text-gray-500">Lahore</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
}

export default Testimonials;
