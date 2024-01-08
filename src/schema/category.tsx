import * as yup from "yup";

export const CategorySchema = yup
  .object()
  .shape({
    page_size: yup.number().required(),
    page: yup.number().required(),
    sort_by: yup.string().required(),
    parent_category_id: yup.number(),
    category_name: yup.string(),
  })
  .required();

export type TCategory = yup.InferType<typeof CategorySchema>;

export const categoryRequestSchema = yup.array().of(
  yup.object({
    id: yup.number().required(),
    category_name: yup.string().required(),
    notes: yup.string().required(),
    image: yup.string().required(),
    parent_category_id: yup.number().required(),
    sub_category: yup.array().of(
      yup.object({
        id: yup.number().required(),
        category_name: yup.string().required(),
        notes: yup.string().required(),
        image: yup.string().required(),
        parent_category_id: yup.number().required(),
        sub_category: yup.array().of(yup.object({})),
      })
    ),
  })
);

export type CategoryRequest = yup.InferType<typeof categoryRequestSchema>;
