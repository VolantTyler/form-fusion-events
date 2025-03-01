
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Event, EventType, SignatureEvent } from "@/types/event";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Common schema for both event types
const baseSchema = z.object({
  name: z.string().min(3, "Event name must be at least 3 characters"),
  date: z.date({
    required_error: "Please select a date",
  }),
  location: z.string().min(3, "Location must be at least 3 characters"),
  duration: z.coerce
    .number()
    .min(1, "Duration must be at least 1 hour")
    .max(72, "Duration cannot exceed 72 hours"),
});

// Signature event requires additional fields
const signatureSchema = baseSchema.extend({
  program_type_name: z.string().min(2, "Program type name is required"),
  program_type_id: z.string().min(2, "Program type ID is required"),
  staff_advisor_id: z.string().min(2, "Staff advisor ID is required"),
});

interface EventFormProps {
  type: EventType;
  onSubmit: (data: Omit<Event, "type" | "id" | "createdAt">) => void;
}

const EventForm: React.FC<EventFormProps> = ({ type, onSubmit }) => {
  // Use the appropriate schema based on event type
  const schema = type === "signature" ? signatureSchema : baseSchema;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      location: "",
      duration: 1,
      ...(type === "signature" && {
        program_type_name: "",
        program_type_id: "",
        staff_advisor_id: "",
      }),
    },
  });

  const handleSubmit = (data: z.infer<typeof schema>) => {
    onSubmit(data);
    form.reset();
    toast.success(`${type === "signature" ? "Signature" : "Affiliate"} event created!`);
  };

  return (
    <div className="animate-fade-in">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 py-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Annual Conference 2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Grand Hotel, New York" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (hours)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="4"
                        {...field}
                        className="pl-8"
                      />
                      <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {type === "signature" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t">
              <FormField
                control={form.control}
                name="program_type_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Conference" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="program_type_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Type ID</FormLabel>
                    <FormControl>
                      <Input placeholder="CONF-2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="staff_advisor_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Staff Advisor ID</FormLabel>
                    <FormControl>
                      <Input placeholder="ADV-123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <Button type="submit" className="w-full mt-6">
            Create {type === "signature" ? "Signature" : "Affiliate"} Event
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EventForm;
