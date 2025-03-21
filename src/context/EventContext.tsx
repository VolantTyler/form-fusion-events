import React, { createContext, useContext, useState, useEffect } from "react";
import { Event, SignatureEvent, AffiliateEvent } from "@/types/event";

interface EventContextType {
  signatureEvents: SignatureEvent[];
  affiliateEvents: AffiliateEvent[];
  addEvent: (event: Event) => void;
  updateEvent: (id: string, eventData: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [signatureEvents, setSignatureEvents] = useState<SignatureEvent[]>([]);
  const [affiliateEvents, setAffiliateEvents] = useState<AffiliateEvent[]>([]);

  // Load events from localStorage on initial render
  useEffect(() => {
    try {
      const savedSignatureEvents = localStorage.getItem("signatureEvents");
      const savedAffiliateEvents = localStorage.getItem("affiliateEvents");
      
      if (savedSignatureEvents) {
        setSignatureEvents(JSON.parse(savedSignatureEvents));
      }
      
      if (savedAffiliateEvents) {
        setAffiliateEvents(JSON.parse(savedAffiliateEvents));
      }
    } catch (error) {
      console.error("Error loading events from localStorage:", error);
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("signatureEvents", JSON.stringify(signatureEvents));
  }, [signatureEvents]);

  useEffect(() => {
    localStorage.setItem("affiliateEvents", JSON.stringify(affiliateEvents));
  }, [affiliateEvents]);

  const addEvent = (event: Event) => {
    // Generate a unique ID if not provided
    const newEvent = {
      ...event,
      id: event.id || crypto.randomUUID(),
      createdAt: event.createdAt || new Date().toISOString()
    };

    if (event.type === "signature") {
      setSignatureEvents(prev => [...prev, newEvent as SignatureEvent]);
    } else {
      setAffiliateEvents(prev => [...prev, newEvent as AffiliateEvent]);
    }
  };

  const updateEvent = (id: string, eventData: Partial<Event>) => {
    if (eventData.type === "signature" || (eventData.type === undefined && signatureEvents.some(e => e.id === id))) {
      setSignatureEvents(prev => prev.map(event => 
        event.id === id ? { ...event, ...eventData } as SignatureEvent : event
      ));
    } else {
      setAffiliateEvents(prev => prev.map(event => 
        event.id === id ? { ...event, ...eventData } as AffiliateEvent : event
      ));
    }
  };

  const deleteEvent = (id: string) => {
    setSignatureEvents(prev => prev.filter(event => event.id !== id));
    setAffiliateEvents(prev => prev.filter(event => event.id !== id));
  };

  return (
    <EventContext.Provider value={{ signatureEvents, affiliateEvents, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};
