export interface Room {
  id: string;
  name: string;
  location: string;
  capacity: number;
  blocked: boolean;
  blockedReason?: string;
}

export interface Booking {
  id: string;
  roomId: string;
  start: number; // minutes from 00:00
  end: number;   // minutes from 00:00
  title: string;
  bookedBy: string;
}

export type CheckResult = {
  available: boolean;
  reason?: string;
};

export type FormState = {
  roomId: string;
  start: string; // "HH:MM" from input
  end: string;   // "HH:MM" from input
  currentTime: number; // minutes from 00:00
};
