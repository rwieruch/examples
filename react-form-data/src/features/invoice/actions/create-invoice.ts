// import { z } from "zod";

// const createInvoiceSchema = z.object({
//   title: z.string().min(3).max(191),
//   amount: z.coerce.number().positive(),
//   draft: z.coerce.boolean(),
//   features: z.array(z.string()).optional(),
//   opts: z.array(z.string()).optional(),
// });

// export const createInvoice = (formData: FormData) => {
//   const { title, amount, draft, features, opts } = createInvoiceSchema.parse({
//     ...Object.fromEntries(formData),
//     features: formData.getAll("features"),
//     opts: formData.getAll("opts"),
//   });

//   console.log(title, amount, draft, features, opts);
// };

import { z } from "zod";
import { zfd } from "zod-form-data";

const createInvoiceSchema = zfd.formData({
  title: zfd.text(z.string().min(3).max(191)),
  amount: zfd.numeric(z.number().positive()),
  draft: zfd.checkbox(),
  features: zfd.repeatable(),
  opts: zfd.repeatable(),
});

export const createInvoice = (formData: FormData) => {
  const { title, amount, draft, features, opts } =
    createInvoiceSchema.parse(formData);

  console.log(title, amount, draft, features, opts);
};
