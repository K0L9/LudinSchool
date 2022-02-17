import * as Yup from "yup";

export const validationFields = () => {
  return Yup.object().shape({
    title: Yup.string().required("Введіть заголовок для новини"),
    smallContent: Yup.string().required("Введіть короткий опис"),
    content: Yup.string().required("Введіть внутрішній контент"),
    newsCategoryId: Yup.number()
      .required("Оберіть категорію")
      .min(0, "Оберіть категорію"),
  });
};
