"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  pendingLabel: string;
  children: React.ReactNode;
};

export default function SubmitButton({
  pendingLabel,
  children,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-accent-300 px-8 py-4 text-primary-900 font-semibold hover:bg-accent-400 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
