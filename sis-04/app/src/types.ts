export type CheckResult = {
  available: boolean;
  reason?: string;
};

export type FormState = {
  roomId: string;
  start: string;
  end: string;
  currentTime: number;
};