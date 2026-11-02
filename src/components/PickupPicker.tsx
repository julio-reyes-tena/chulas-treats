"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

type PickupSlot = {
  value: string;
  label: string;
};

function getPickupSlots(): PickupSlot[] {
  const now = Date.now();
  const earliest = now + 72 * 60 * 60 * 1000;
  const latest = now + 28 * 24 * 60 * 60 * 1000;
  const interval = 30 * 60 * 1000;

  const partsFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const labelFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const slots: PickupSlot[] = [];

  for (
    let timestamp = Math.ceil(earliest / interval) * interval;
    timestamp <= latest;
    timestamp += interval
  ) {
    const date = new Date(timestamp);
    const parts = partsFormatter.formatToParts(date);

    const weekday = parts.find((part) => part.type === "weekday")?.value;
    const hour = Number(
      parts.find((part) => part.type === "hour")?.value
    );

    const isPickupDay = weekday === "Fri" || weekday === "Sat";
    const isPickupHour = hour >= 11 && hour < 17;

    if (isPickupDay && isPickupHour) {
      slots.push({
        value: date.toISOString(),
        label: labelFormatter.format(date),
      });
    }
  }

  return slots;
}

export default function PickupPicker() {
  const [slots, setSlots] = useState<PickupSlot[]>([]);
const {
  pickupSlot: selectedSlot,
  setPickupSlot: setSelectedSlot,
} = useCart();  const [loaded, setLoaded] = useState(false);

  const selected = slots.find((slot) => slot.value === selectedSlot);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="rounded-3xl border border-pink-200 bg-white p-6 sm:p-8">
        <h2 className="text-3xl font-bold">Choose your pickup</h2>

        <p className="mt-3 leading-relaxed text-stone-600">
          Friday and Saturday, 11 AM–5 PM Pacific time.
          Please order at least 72 hours ahead.
          Each pickup window lasts 30 minutes.
        </p>

        <button
          type="button"
          onClick={() => {
            setSlots(getPickupSlots());
            setSelectedSlot("");
            setLoaded(true);
          }}
          className="mt-6 rounded-full border border-pink-700 px-6 py-3 font-semibold text-pink-800 hover:bg-pink-50"
        >
          {loaded ? "Refresh pickup times" : "Show pickup times"}
        </button>

        {loaded && slots.length > 0 && (
          <div className="mt-6">
            <label
              htmlFor="pickup-slot"
              className="mb-2 block font-semibold"
            >
              Pickup window start time
            </label>

            <select
              id="pickup-slot"
              value={selectedSlot}
              onChange={(event) => setSelectedSlot(event.target.value)}
              required
              className="w-full rounded-xl border border-pink-200 bg-white p-3"
            >
              <option value="">Select a date and time</option>

              {slots.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {loaded && slots.length === 0 && (
          <p className="mt-4 text-stone-600">
            No pickup times were found in the next four weeks.
          </p>
        )}

        <p role="status" className="mt-4 font-medium text-pink-800">
          {selected
            ? `Selected: ${selected.label} — a 30-minute pickup window.`
            : ""}
        </p>

        <p className="mt-4 text-sm text-stone-500">
          Preview only. Selecting a time does not reserve it or place an order.
        </p>
      </div>
    </section>
  );
}