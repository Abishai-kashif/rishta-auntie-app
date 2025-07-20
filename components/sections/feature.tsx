import { MessageCircle, Sparkles, Users } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";

function Feature() {
  return (
        <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Rishta Auntie?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Combining traditional matchmaking wisdom with cutting-edge AI technology to help you find your perfect
              life partner.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Conversations</h3>
                <p className="text-gray-600">
                  Chat with our intelligent Rishta Auntie who understands your preferences and provides personalized
                  matchmaking advice.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Matching</h3>
                <p className="text-gray-600">
                  Our advanced algorithms analyze compatibility based on interests, location, age, and personal
                  preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-time Updates</h3>
                <p className="text-gray-600">
                  Get instant match updates as you chat with Rishta Auntie. Your preferences are understood and applied
                  immediately.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> 
    );
}

export default Feature;
