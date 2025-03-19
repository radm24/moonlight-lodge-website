"use client";

import {
  CabinAllFieldsType,
  BookedDatesType,
  SettingsType,
} from "@/app/_lib/data-service";
import { useReservation } from "@/app/_components/ReservationContext";
import {
  isWithinInterval,
  differenceInDays,
  isPast,
  isSameDay,
} from "date-fns";
import { DateRange as DateRangeType, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

type DateSelectorProps = {
  settings: SettingsType;
  cabin: CabinAllFieldsType;
  bookedDates: BookedDatesType;
};

function isAlreadyBooked(range: DateRangeType, datesArr: BookedDatesType) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from!, end: range.to! })
    )
  );
}

function DateSelector({ settings, cabin, bookedDates }: DateSelectorProps) {
  const { range, setRange, resetRange } = useReservation();
  const { regular_price: regularPrice, discount } = cabin;

  const displayRange = isAlreadyBooked(range, bookedDates) ? undefined : range;
  const numNights = displayRange
    ? differenceInDays(displayRange.to!, displayRange.from!)
    : 0;
  const cabinPrice = (regularPrice - discount) * numNights;

  // SETTINGS
  const {
    min_booking_length: minBookingLength,
    max_booking_length: maxBookingLength,
  } = settings;

  function selectDateHandler(range: DateRangeType) {
    if (!range) return;
    setRange(range);
  }

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 11)}
        captionLayout="dropdown"
        numberOfMonths={2}
        selected={displayRange}
        onSelect={selectDateHandler}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(curDate, date))
        }
        required={true}
      />

      <div className="flex items-center justify-between px-8 bg-accent-300 text-primary-900 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-400 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
