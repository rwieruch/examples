import { z } from "zod";

const createInvoiceSchema = z.object({
  title: z.string().min(3).max(191),
  amount: z.coerce.number().positive(),
});

export const createInvoice = (formData: FormData) => {
  const { title, amount } = createInvoiceSchema.parse(
    Object.fromEntries(formData)
  );

  console.log(title, amount);
};
