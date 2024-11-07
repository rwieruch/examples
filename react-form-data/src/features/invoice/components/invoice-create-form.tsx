"use client";

import { createInvoice } from "../actions/create-invoice";

const InvoiceCreateForm = () => {
  return (
    <form action={createInvoice}>
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" id="name" />

      <label htmlFor="amount">Amount:</label>
      <input type="number" name="amount" id="amount" />

      <label htmlFor="draft">Draft:</label>
      <input type="checkbox" name="draft" id="draft" />

      <label htmlFor="feature1">Feature 1:</label>
      <input type="checkbox" name="features" value="feature1" id="feature1" />

      <label htmlFor="feature2">Feature 2:</label>
      <input type="checkbox" name="features" value="feature2" id="feature2" />

      <label htmlFor="opts">Options:</label>
      <select name="opts" multiple id="opts">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>

      <button type="submit">Send</button>
    </form>
  );
};

export default InvoiceCreateForm;
