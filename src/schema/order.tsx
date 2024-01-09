import * as yup from "yup";
export const OrderSchema = yup
  .object()
  .shape({
    page_size: yup.number().required(),
    page: yup.number().required(),
    sort_by: yup.string().required(),
  })
  .required();


export type TOrder = yup.InferType<typeof OrderSchema>;
