"use client";

import { useFormStatus } from "react-dom";

//Managing the Form Submission Status with useFormStatus
export default function MealsFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? "Submitting..." : "Share Meal"}
    </button>
  );
}
