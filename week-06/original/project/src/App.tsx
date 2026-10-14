import { Calendar, Clock, Users, AlertCircle, CheckCircle2, XCircle, Ban, MapPin } from 'lucide-react';
import { useState, useMemo } from 'react';
import { rooms, bookings } from './sampleData';
import { checkAvailability, timeToMinutes, minutesToTime, formatDuration, overlapsExisting } from './bookingLogic';
import type { CheckResult } from './types';

export default function App() {
  const [roomId, setRoomId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  });
  const [result, setResult] = useState<CheckResult | null>(null);

  const selectedRoom = useMemo(() => rooms.find((r) => r.id === roomId), [roomId]);
  const roomBookings = useMemo(
    () => (roomId ? bookings.filter((b) => b.roomId === roomId).sort((a, b) => a.start - b.start) : []),
    [roomId],
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const startMin = timeToMinutes(startTime);
    const endMin = timeToMinutes(endTime);

    if (startMin === null || endMin === null) {
      setResult({ available: false, reason: 'Please enter valid times in HH:MM format.' });
      return;
    }

    setResult(checkAvailability(startMin, endMin, selectedRoom, roomBookings, currentTime));
  }

  function handleReset() {
    setRoomId('');
    setStartTime('');
    setEndTime('');
    setResult(null);
  }

  const currentLabel = minutesToTime(currentTime);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">Smart Campus Room Availability</h1>
            <p className="text-xs sm:text-sm text-slate-500">Check if a campus room is free for your time slot</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ---- Left: Form ---- */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600" />
              Check Availability
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Room selector */}
              <div>
                <label htmlFor="room" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Select Room
                </label>
                <select
                  id="room"
                  value={roomId}
                  onChange={(e) => { setRoomId(e.target.value); setResult(null); }}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-white"
                >
                  <option value="">— Choose a room —</option>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id} disabled={r.blocked}>
                      {r.name} ({r.location}){r.blocked ? ' — Blocked' : ''}
                    </option>
                  ))}
                </select>
                {selectedRoom && (
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{selectedRoom.location}</span>
                    <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5" />{selectedRoom.capacity} seats</span>
                    {selectedRoom.blocked && (
                      <span className="inline-flex items-center gap-1 text-red-600"><Ban className="w-3.5 h-3.5" />{selectedRoom.blockedReason}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Time inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="start" className="block text-sm font-medium text-slate-700 mb-1.5">Start Time</label>
                  <input
                    id="start"
                    type="time"
                    value={startTime}
                    onChange={(e) => { setStartTime(e.target.value); setResult(null); }}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                  />
                </div>
                <div>
                  <label htmlFor="end" className="block text-sm font-medium text-slate-700 mb-1.5">End Time</label>
                  <input
                    id="end"
                    type="time"
                    value={endTime}
                    onChange={(e) => { setEndTime(e.target.value); setResult(null); }}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                  />
                </div>
              </div>

              {/* Current time display */}
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-2">
                <Clock className="w-3.5 h-3.5" />
                Current time reference: <span className="font-mono font-semibold text-slate-700">{currentLabel}</span>
                <button
                  type="button"
                  onClick={() => {
                    const now = new Date();
                    const m = now.getHours() * 60 + now.getMinutes();
                    setCurrentTime(m);
                    setResult(null);
                  }}
                  className="ml-auto text-teal-600 hover:text-teal-700 font-medium underline"
                >
                  Update now
                </button>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white text-sm font-semibold rounded-lg px-4 py-2.5 transition shadow-sm"
                >
                  Check Availability
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 border border-slate-300 rounded-lg transition hover:bg-slate-50"
                >
                  Reset
                </button>
              </div>
            </form>

            {/* Result panel */}
            {result && (
              <div
                className={`mt-5 rounded-xl border p-4 flex items-start gap-3 transition ${
                  result.available
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                {result.available ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className={`text-sm font-semibold ${result.available ? 'text-emerald-800' : 'text-red-800'}`}>
                    {result.available ? 'Available' : 'Unavailable'}
                  </p>
                  {result.reason && (
                    <p className={`text-sm mt-0.5 ${result.available ? 'text-emerald-700' : 'text-red-700'}`}>
                      {result.reason}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Helper / rules */}
            <div className="mt-5 border-t border-slate-100 pt-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Booking Rules</p>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">•</span> Time must be within 00:00–24:00 and start after the current time.</li>
                <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">•</span> Maximum booking duration is 120 minutes.</li>
                <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">•</span> Blocked rooms cannot be booked.</li>
                <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">•</span> Overlapping bookings are rejected; back-to-back slots are allowed.</li>
              </ul>
            </div>
          </section>

          {/* ---- Right: Room schedule / timeline ---- */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-600" />
              Room Schedule
            </h2>

            {!selectedRoom ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <AlertCircle className="w-8 h-8 text-slate-300 mb-3" />
                <p className="text-sm text-slate-400">Select a room to view its schedule</p>
              </div>
            ) : (
              <>
                {/* Room info card */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">{selectedRoom.name}</h3>
                    <p className="text-xs text-slate-500">{selectedRoom.location}</p>
                  </div>
                  {selectedRoom.blocked ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                      <Ban className="w-3 h-3" /> Blocked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Open
                    </span>
                  )}
                </div>

                {/* Timeline visualization */}
                <Timeline
                  roomBookings={roomBookings}
                  startTime={startTime}
                  endTime={endTime}
                  currentTime={currentTime}
                />

                {/* Booking list */}
                {roomBookings.length === 0 ? (
                  <p className="text-sm text-slate-400 py-4 text-center">No existing bookings for this room.</p>
                ) : (
                  <div className="mt-5">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Existing Bookings</p>
                    <ul className="space-y-2">
                      {roomBookings.map((b) => (
                        <li key={b.id} className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 border border-slate-100 px-3 py-2.5">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-800 truncate">{b.title}</p>
                            <p className="text-xs text-slate-500 truncate">{b.bookedBy}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs font-mono font-semibold text-slate-700">
                              {minutesToTime(b.start)}–{minutesToTime(b.end)}
                            </p>
                            <p className="text-xs text-slate-400">{formatDuration(b.end - b.start)}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>

      <footer className="max-w-5xl mx-auto px-4 sm:px-6 pb-8">
        <p className="text-center text-xs text-slate-400">
          Fictional sample data for demonstration · No bookings are saved or modified
        </p>
      </footer>
    </div>
  );
}

/* ---------- Timeline component ---------- */

function Timeline({
  roomBookings,
  startTime,
  endTime,
  currentTime,
}: {
  roomBookings: { id: string; start: number; end: number; title: string }[];
  startTime: string;
  endTime: string;
  currentTime: number;
}) {
  const HOURS = 24;
  const candidateStart = timeToMinutes(startTime);
  const candidateEnd = timeToMinutes(endTime);

  return (
    <div>
      {/* Hour labels */}
      <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1 px-0.5">
        {[0, 4, 8, 12, 16, 20, 24].map((h) => (
          <span key={h}>{String(h).padStart(2, '0')}:00</span>
        ))}
      </div>

      {/* Bar */}
      <div className="relative h-16 bg-slate-100 rounded-lg border border-slate-200 overflow-hidden">
        {/* Hour gridlines */}
        {Array.from({ length: HOURS }, (_, h) => h).map((h) => (
          <div
            key={h}
            className="absolute top-0 bottom-0 border-l border-slate-200"
            style={{ left: `${(h / HOURS) * 100}%` }}
          />
        ))}

        {/* Current time marker */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-20"
          style={{ left: `${(currentTime / (HOURS * 60)) * 100}%` }}
          title={`Now: ${minutesToTime(currentTime)}`}
        />

        {/* Existing bookings */}
        {roomBookings.map((b) => (
          <div
            key={b.id}
            className="absolute top-1.5 bottom-1.5 rounded bg-slate-400/80 text-white text-[10px] px-1 flex items-center overflow-hidden z-10"
            style={{
              left: `${(b.start / (HOURS * 60)) * 100}%`,
              width: `${((b.end - b.start) / (HOURS * 60)) * 100}%`,
            }}
            title={`${b.title}: ${minutesToTime(b.start)}–${minutesToTime(b.end)}`}
          >
            <span className="truncate">{b.title}</span>
          </div>
        ))}

        {/* Candidate slot */}
        {candidateStart !== null && candidateEnd !== null && candidateStart < candidateEnd && (
          <div
            className="absolute top-1.5 bottom-1.5 rounded border-2 border-dashed z-30 flex items-center justify-center"
            style={{
              left: `${(candidateStart / (HOURS * 60)) * 100}%`,
              width: `${((candidateEnd - candidateStart) / (HOURS * 60)) * 100}%`,
              borderColor: '#0d9488',
              backgroundColor: 'rgba(13,148,136,0.15)',
            }}
            title={`Candidate: ${minutesToTime(candidateStart)}–${minutesToTime(candidateEnd)}`}
          >
            {candidateEnd - candidateStart >= 30 && (
              <span className="text-[10px] font-semibold text-teal-700 px-1 truncate">
                {minutesToTime(candidateStart)}–{minutesToTime(candidateEnd)}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-400/80 inline-block" /> Existing booking</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded border-2 border-dashed border-teal-600 bg-teal-500/15 inline-block" /> Your slot</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-0.5 h-3 bg-slate-400 inline-block" /> Now</span>
      </div>
    </div>
  );
}
