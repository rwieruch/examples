"use client";

import { createInvoice } from "../actions/create-invoice";

const InvoiceCreateForm = () => {
  return (
    <form action={createInvoice}>
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" id="name" />

      <label htmlFor="amount">Amount:</label>
      <input type="number" name="amount" id="amount" />

      <button type="submit">Send</button>
    </form>
  );
};

export default InvoiceCreateForm;
