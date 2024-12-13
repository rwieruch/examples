"use server";

import { ActionState, fromErrorToActionState, toActionState } from "@/helper";
import { createInvoiceSchema } from "../schemas/create-invoice";

export const createInvoice = async (
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const { title, amount, draft, features } =
      createInvoiceSchema.parse(formData);

    console.log(title, amount, draft, features);

    // TODO: create invoice
  } catch (error) {
    return fromErrorToActionState(error);
  }

  return toActionState("Invoice created");
};
