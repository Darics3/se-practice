export type Room = {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  blocked: boolean;
  bookings: { start: number; end: number }[];
};

export const ROOMS: Room[] = [
  {
    id: 'r1',
    name: 'Athena Hall',
    capacity: 120,
    equipment: ['projector', 'whiteboard', 'microphone'],
    blocked: false,
    bookings: [
      { start: 540, end: 600 },
      { start: 780, end: 840 },
    ],
  },
  {
    id: 'r2',
    name: 'Newton Lab',
    capacity: 40,
    equipment: ['projector', 'whiteboard'],
    blocked: false,
    bookings: [
      { start: 600, end: 660 },
    ],
  },
  {
    id: 'r3',
    name: 'Darwin Seminar',
    capacity: 25,
    equipment: ['whiteboard'],
    blocked: false,
    bookings: [
      { start: 720, end: 780 },
    ],
  },
  {
    id: 'r4',
    name: 'Curie Auditorium',
    capacity: 200,
    equipment: ['projector', 'whiteboard', 'microphone', 'video'],
    blocked: true,
    bookings: [],
  },
  {
    id: 'r5',
    name: 'Tesla Workshop',
    capacity: 30,
    equipment: ['whiteboard', '3d-printer'],
    blocked: false,
    bookings: [
      { start: 480, end: 540 },
      { start: 900, end: 960 },
    ],
  },
];