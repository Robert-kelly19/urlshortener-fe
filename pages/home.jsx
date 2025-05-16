import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import Footer from "../components/footer";

export default function Home() {
  const [urls, setUrls] = useState([]);
  const token = localStorage.getItem("token");

 
  const validateSchema = Yup.object({
    longUrl: Yup.string().required("Long URL is required"),
    customCode: Yup.string().optional(),
    expiresAt: Yup.date().required("Expiring date is required"),
  });

 
  const fetchUrls = async () => {
    try {
      const res = await fetch("https://url-shortener-production-0bea.up.railway.app/url/my-urls", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUrls(data.results || []);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };


  useEffect(() => {
    fetchUrls();
  }, []);


  const formik = useFormik({
    initialValues: {
      longUrl: "",
      customCode: "",
      expiresAt: "",
    },
    validationSchema: validateSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const res = await axios.post(
          "https://url-shortener-production-0bea.up.railway.app/url/shorten",
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        resetForm();
        fetchUrls();
      } catch (error) {
        console.error("Error shortening URL:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <h1 id="typing">Welcome on board</h1>
      <div className="grid">
        <div className="grid-right">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <input
                type="text"
                name="longUrl"
                placeholder="Enter your long URL"
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
                placeholder="Enter a custom code (optional)"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.customCode}
              />
            </div>

            <div>
              <input
                type="date"
                name="expiresAt"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.expiresAt}
                min={new Date().toISOString().split("T")[0]}
              />
              {formik.touched.expiresAt && formik.errors.expiresAt && (
                <div style={{ color: "red" }}>{formik.errors.expiresAt}</div>
              )}
            </div>

            <button type="submit" className="sh-link" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Shortening..." : "Shorten"}
            </button>
          </form>
        </div>

        <div className="grid-left">
          <h1 id="myurl">MY Shortened Links</h1>
          <div className="urls">
            {urls.length === 0 ? (
              <p>No URLs found.
              </p>
            ) : (
              urls.map((url, index) => <Cards key={index} url={url} />)
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
