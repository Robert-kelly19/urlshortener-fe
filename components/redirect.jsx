import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Redirect() {
  const validateSchema = Yup.object({
    short_code: Yup.string().required("please provide a short code"),
  });
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await fetch(
        `https://url-shortener-production-0bea.up.railway.app/`,
        values,
        {
          method: "post",
          header: { "content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const data = res.json();
      resetForm();
    } catch (error) {
      console.error("error while redirecting:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      short_code: "",
    },
    validationSchema: validateSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="short_code"
          id="shcode"
          placeholder="Enter short_code from your url"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.short_code}
        />
      </form>
    </>
  );
};
