
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventForm from "@/components/EventForm";
import EventCard from "@/components/EventCard";
import { Event, EventType } from "@/types/event";
import { useEvents } from "@/context/EventContext";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const EventsPage = () => {
  const { signatureEvents, affiliateEvents, addEvent, updateEvent, deleteEvent } = useEvents();
  const [activeTab, setActiveTab] = useState<EventType>("signature");
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleSubmit = (data: Omit<Event, "type" | "id" | "createdAt">) => {
    if (editingEvent) {
      // Update existing event
      updateEvent(editingEvent.id!, {
        ...data,
        type: activeTab,
      });
      setEditingEvent(null);
    } else {
      // Create new event
      addEvent({
        ...data,
        type: activeTab,
      } as Event);
    }
    setShowForm(false);
  };

  const handleEdit = (event: Event) => {
    setActiveTab(event.type);
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingEvent(null);
    setShowForm(false);
  };

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4 sm:px-6">
      <header className="mb-12 text-center">
        <span className="inline-block text-sm font-medium tracking-wider text-primary mb-2">EVENT MANAGEMENT</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Form Fusion Events</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create and manage your signature and affiliate events from one beautiful interface.
        </p>
      </header>
      
      <Tabs 
        defaultValue="signature" 
        className="space-y-8"
        value={activeTab}
        onValueChange={(value) => {
          if (!editingEvent) {
            setActiveTab(value as EventType);
            setShowForm(false);
          }
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="signature" disabled={!!editingEvent}>Signature Events</TabsTrigger>
            <TabsTrigger value="affiliate" disabled={!!editingEvent}>Affiliate Events</TabsTrigger>
          </TabsList>
          
          <Button
            onClick={() => {
              if (showForm && !editingEvent) {
                setShowForm(false);
              } else if (!editingEvent) {
                setShowForm(true);
                setEditingEvent(null);
              }
            }}
            variant={showForm && !editingEvent ? "secondary" : "default"}
            className="gap-1.5"
            disabled={!!editingEvent}
          >
            <PlusCircle className="h-4 w-4" />
            {showForm && !editingEvent ? "Cancel" : "New Event"}
          </Button>
        </div>
        
        <AnimatePresence mode="wait">
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-panel p-6"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-1">
                  {editingEvent ? 'Edit' : 'Create'} {activeTab === "signature" ? "Signature" : "Affiliate"} Event
                </h2>
                <p className="text-muted-foreground text-sm">
                  {editingEvent ? 'Update event details below' : 'Fill out the form below to create a new event'}
                </p>
              </div>
              <EventForm 
                type={activeTab} 
                event={editingEvent || undefined} 
                onSubmit={handleSubmit} 
                onCancel={editingEvent ? handleCancel : undefined}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <TabsContent value="signature" className="space-y-6">
          {signatureEvents.length === 0 && !showForm ? (
            <div className="text-center py-12 border rounded-lg bg-muted/30">
              <h3 className="text-lg font-medium mb-2">No Signature Events</h3>
              <p className="text-muted-foreground mb-4">
                Create your first signature event to get started
              </p>
              <Button onClick={() => setShowForm(true)} data-testid="create-signature-event" className="gap-1.5">
                <PlusCircle className="h-4 w-4" />
                Create Signature Event
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {signatureEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onDelete={deleteEvent} 
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="affiliate" className="space-y-6">
          {affiliateEvents.length === 0 && !showForm ? (
            <div className="text-center py-12 border rounded-lg bg-muted/30">
              <h3 className="text-lg font-medium mb-2">No Affiliate Events</h3>
              <p className="text-muted-foreground mb-4">
                Create your first affiliate event to get started
              </p>
              <Button onClick={() => setShowForm(true)} data-testid="create-affiliate-event" className="gap-1.5">
                <PlusCircle className="h-4 w-4" />
                Create Affiliate Event
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {affiliateEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onDelete={deleteEvent}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsPage;
