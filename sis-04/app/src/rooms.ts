export type RoomBooking = {
  start: number;
  end: number;
  id?: string;
  title?: string;
  bookedBy?: string;
};

export type Room = {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  blocked: boolean;
  bookings: RoomBooking[];

  // Optional display metadata used by the existing Week 08 UI.
  location?: string;
  blockedReason?: string;
};

export const ROOMS: Room[] = [
  {
    id: 'r1',
    name: 'Athena Hall',
    location: 'Building A · Floor 1',
    capacity: 120,
    equipment: ['projector', 'whiteboard', 'microphone'],
    blocked: false,
    bookings: [
      {
        id: 'b1',
        start: 540,
        end: 600,
        title: 'Intro to CS',
        bookedBy: 'Prof. Adler',
      },
      {
        id: 'b2',
        start: 780,
        end: 840,
        title: 'Faculty Meeting',
        bookedBy: 'Dean Office',
      },
    ],
  },
  {
    id: 'r2',
    name: 'Newton Lab',
    location: 'Building B · Floor 2',
    capacity: 40,
    equipment: ['projector', 'whiteboard'],
    blocked: false,
    bookings: [
      {
        id: 'b3',
        start: 600,
        end: 660,
        title: 'Physics Lab Session',
        bookedBy: 'Prof. Boyle',
      },
    ],
  },
  {
    id: 'r3',
    name: 'Darwin Seminar',
    location: 'Building C · Floor 3',
    capacity: 25,
    equipment: ['whiteboard'],
    blocked: false,
    bookings: [
      {
        id: 'b4',
        start: 720,
        end: 780,
        title: 'Biology Seminar',
        bookedBy: 'Prof. Mendel',
      },
    ],
  },
  {
    id: 'r4',
    name: 'Curie Auditorium',
    location: 'Building D · Floor 1',
    capacity: 200,
    equipment: ['projector', 'whiteboard', 'microphone', 'video'],
    blocked: true,
    blockedReason: 'Under maintenance',
    bookings: [],
  },
  {
    id: 'r5',
    name: 'Tesla Workshop',
    location: 'Building E · Floor 4',
    capacity: 30,
    equipment: ['whiteboard', '3d-printer'],
    blocked: false,
    bookings: [
      {
        id: 'b5',
        start: 480,
        end: 540,
        title: 'Robotics Build',
        bookedBy: 'Team Volt',
      },
      {
        id: 'b6',
        start: 900,
        end: 960,
        title: '3D Printing Workshop',
        bookedBy: 'Mr. Tesla',
      },
    ],
  },
];