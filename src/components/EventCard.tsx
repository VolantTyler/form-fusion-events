
import React from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin, X } from "lucide-react";

import { Event, isSignatureEvent } from "@/types/event";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  onDelete: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDelete }) => {
  const isSignature = isSignatureEvent(event);
  const createdAt = event.createdAt 
    ? format(new Date(event.createdAt), "MMM d, yyyy") 
    : "";

  return (
    <Card className={cn(
      "card-hover overflow-hidden transition-all",
      isSignature 
        ? "border-blue-100 dark:border-blue-900/30" 
        : "border-amber-100 dark:border-amber-900/30"
    )}>
      <CardHeader className="relative pb-2">
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full opacity-70 hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => onDelete(event.id || "")}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-1.5">
          <Badge 
            variant="outline" 
            className={cn(
              "mb-1.5",
              isSignature 
                ? "bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400" 
                : "bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400"
            )}
          >
            {isSignature ? "Signature Event" : "Affiliate Event"}
          </Badge>
          <CardTitle className="line-clamp-2">{event.name}</CardTitle>
          <CardDescription className="flex items-center gap-1.5">
            <CalendarIcon className="h-3.5 w-3.5" />
            {format(new Date(event.date), "MMMM d, yyyy")}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-3 pt-1">
        <div className="space-y-3">
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{event.duration} {event.duration === 1 ? "hour" : "hours"}</span>
          </div>
          
          {isSignature && (
            <>
              <Separator className="my-2" />
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Program Type:</span>
                  <span className="font-medium">{event.program_type_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Program ID:</span>
                  <span className="font-medium">{event.program_type_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Advisor ID:</span>
                  <span className="font-medium">{event.staff_advisor_id}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3 pb-3 text-xs text-muted-foreground">
        Created on {createdAt}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
