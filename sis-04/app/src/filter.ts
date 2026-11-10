import type { Room } from './rooms';

export function filterRooms(
  rooms: Room[],
  criteria: {
    attendees: number;
    equipment: string[];
  },
): Room[] {
  return rooms.filter((room) => {
    const hasCapacity = room.capacity >= criteria.attendees;

    const hasAllEquipment = criteria.equipment.every((item) =>
      room.equipment.includes(item),
    );

    return hasCapacity && hasAllEquipment;
  });
}