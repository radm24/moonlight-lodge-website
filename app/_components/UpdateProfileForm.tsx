"use client";

import React from "react";
import { useFormState } from "react-dom";
import { GuestType } from "../_lib/data-service";
import { updateProfile } from "@/app/_lib/actions";
import SubmitButton from "@/app/_components/SubmitButton";

type UpdateProfileFormProps = {
  guest: GuestType;
  children: React.ReactNode;
};

const initialState = {
  message: "",
};

export default function UpdateProfileForm({
  guest,
  children,
}: UpdateProfileFormProps) {
  const {
    full_name: fullName,
    email,
    national_id: nationalId,
    country_flag: countryFlag,
  } = guest!;

  const [state, updateProfileAction] = useFormState(
    updateProfile,
    initialState
  );

  return (
    <form
      action={updateProfileAction}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          name="fullName"
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          defaultValue={fullName}
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          name="email"
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          defaultValue={email}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {countryFlag && (
            <img
              src={countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          )}
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalId">National ID number</label>
        <input
          name="nationalId"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultValue={nationalId ?? ""}
        />
        {state?.message && (
          <p aria-live="polite" className="text-red-500 pt-2">
            {state.message}
          </p>
        )}
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
      </div>
    </form>
  );
}
