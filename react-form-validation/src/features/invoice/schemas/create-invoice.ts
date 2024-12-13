import { z } from "zod";
import { zfd } from "zod-form-data";

export const createInvoiceSchema = zfd.formData({
  title: zfd.text(z.string().min(3).max(191)),
  amount: zfd.numeric(z.number().positive()),
  draft: zfd.checkbox(),
  features: zfd.repeatable(),
});
