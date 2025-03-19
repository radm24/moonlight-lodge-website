"use client";

import { useContext, createContext, useState } from "react";
import { DateRange as DateRangeType } from "react-day-picker";

type ReservationContextType = {
  range: DateRangeType;
  setRange: React.Dispatch<React.SetStateAction<DateRangeType>>;
  resetRange: () => void;
};

const ReservationContext = createContext<ReservationContextType>(
  {} as ReservationContextType
);

const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<DateRangeType>(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context is used outside of provider");
  return context;
}

export { ReservationProvider, useReservation };
