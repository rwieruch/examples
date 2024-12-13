"use client";

import { useActionState, useState } from "react";
import { FieldError } from "@/field-error";
import { createInvoice } from "../actions/create-invoice";
import { createInvoiceSchema } from "../schemas/create-invoice";
import {
  ActionState,
  EMPTY_ACTION_STATE,
  fromErrorToActionState,
} from "@/helper";

const InvoiceCreateForm = () => {
  const [actionState, formAction] = useActionState(
    createInvoice,
    EMPTY_ACTION_STATE
  );

  const [validation, setValidation] = useState<ActionState | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);

    setValidation(null);

    try {
      createInvoiceSchema.parse(formData);
    } catch (error) {
      setValidation(fromErrorToActionState(error));

      event.preventDefault();
    }
  };

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" id="name" />
      <FieldError actionState={validation ?? actionState} name="title" />

      <label htmlFor="amount">Amount:</label>
      <input type="number" name="amount" id="amount" />
      <FieldError actionState={validation ?? actionState} name="amount" />

      <label htmlFor="draft">Draft:</label>
      <input type="checkbox" name="draft" id="draft" />
      <FieldError actionState={validation ?? actionState} name="draft" />

      <label htmlFor="feature1">Feature 1:</label>
      <input type="checkbox" name="features" value="feature1" id="feature1" />

      <label htmlFor="feature2">Feature 2:</label>
      <input type="checkbox" name="features" value="feature2" id="feature2" />

      <FieldError actionState={validation ?? actionState} name="features" />

      <button type="submit">Send</button>
      {validation ? validation.message : actionState.message}
    </form>
  );
};

export default InvoiceCreateForm;
