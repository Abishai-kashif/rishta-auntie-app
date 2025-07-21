import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, User } from "lucide-react";
import { MatchCardProps } from "@/type";

export function MatchCard({ match }: MatchCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={match?.imageUrl} alt={match.name} />
            <AvatarFallback className="bg-pink-100 text-pink-700">
              {getInitials(match.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">
              {match.name}
            </h3>
            <div className="flex items-center text-gray-500 text-sm space-x-3">
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{match.age} years</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{match.location}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-sm text-gray-600 mb-2">Interests:</p>
          <div className="flex flex-wrap gap-1">
            {match.interests.map((interest, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-pink-50 text-pink-700 hover:bg-pink-100"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
