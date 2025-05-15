import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

export default function Home() {
    const token = localStorage.getItem('token')
  const validateSchema = Yup.object({
    longUrl: Yup.string().required("longUrl is required"),
    customCode: Yup.string().optional(),
    expiresAt: Yup.date().required("expiring date is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await axios.post(`http://localhost:8000/url/shorten`, values,{
        headers: {
            'Authorization': `Bearer ${token}`
          }
      },);
      console.log(res.data);
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      longUrl: "",
      customCode: "",
      expiresAt: "",
    },
    validationSchema: validateSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <h1 id="typing">Welcome</h1>
      <div className="grid">
        <div className="grid-right">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <input
                type="text"
                name="longUrl"
                placeholder="enter your long link "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.longUrl}
              />
              {formik.touched.longUrl && formik.errors.longUrl && (
                <div style={{ color: "red" }}>{formik.errors.longUrl}</div>
              )}
            </div>
            <div>
              <input
                type="text"
                name="customCode"
                placeholder="enter your customCode(optional) "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.customCode}
              />
              {formik.touched.customCode && formik.errors.customCode && (
                <div style={{ color: "red" }}>{formik.errors.customCode}</div>
              )}
            </div>
            <div>
              <input
                type="date"
                name="expiresAt"
                placeholder="enter your customCode(optional) "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.expiresAt}
                min={new Date().toISOString().split("T")[0]}
              />
              {formik.touched.expiresAt && formik.errors.expiresAt && (
                <div style={{ color: "red" }}>{formik.errors.expiresAt}</div>
              )}
            </div>
            <button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Shortening..." : "Shorten URL"}
            </button>
          </form>
        </div>
        <div className="grid-left">
            <h1 id="myurl"> MY shorten links</h1>
        </div>
      </div>
    </>
  );
}
