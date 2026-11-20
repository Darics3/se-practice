import type { Room, Booking } from './types';

export const rooms: Room[] = [
  { id: 'r1', name: 'Athena Hall',   location: 'Building A · Floor 1', capacity: 120, blocked: false },
  { id: 'r2', name: 'Newton Lab',    location: 'Building B · Floor 2', capacity: 40,  blocked: false },
  { id: 'r3', name: 'Darwin Seminar',location: 'Building C · Floor 3', capacity: 25,  blocked: false },
  { id: 'r4', name: 'Curie Auditorium', location: 'Building D · Floor 1', capacity: 200, blocked: true, blockedReason: 'Under maintenance until Oct 20' },
  { id: 'r5', name: 'Tesla Workshop', location: 'Building E · Floor 4', capacity: 30, blocked: false },
];

export const bookings: Booking[] = [
  { id: 'b1', roomId: 'r1', start: 540,  end: 600,  title: 'Intro to CS',         bookedBy: 'Prof. Adler' },
  { id: 'b2', roomId: 'r1', start: 780,  end: 840,  title: 'Faculty Meeting',     bookedBy: 'Dean Office' },
  { id: 'b3', roomId: 'r2', start: 600,  end: 660,  title: 'Physics Lab Session', bookedBy: 'Prof. Boyle' },
  { id: 'b4', roomId: 'r3', start: 720,  end: 780,  title: 'Biology Seminar',     bookedBy: 'Prof. Mendel' },
  { id: 'b5', roomId: 'r5', start: 480,  end: 540,  title: 'Robotics Build',      bookedBy: 'Team Volt' },
  { id: 'b6', roomId: 'r5', start: 900,  end: 960,  title: '3D Printing Workshop',bookedBy: 'Mr. Tesla' },
];
