
export type EventType = "signature" | "affiliate";

export interface BaseEvent {
  id?: string;
  name: string;
  date: string;
  location: string;
  duration: number;
  type: EventType;
  createdAt?: string;
}

export interface SignatureEvent extends BaseEvent {
  type: "signature";
  program_type_name: string;
  program_type_id: string;
  staff_advisor_id: string;
}

export interface AffiliateEvent extends BaseEvent {
  type: "affiliate";
}

export type Event = SignatureEvent | AffiliateEvent;

export function isSignatureEvent(event: Event): event is SignatureEvent {
  return event.type === "signature";
}
