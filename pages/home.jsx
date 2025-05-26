import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Footer from "../components/footer";

export default function Home() {
  const token = localStorage.getItem("token");
  const [urls, setUrls] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const getUrls = async () => {
    try {
      const res = await fetch(
        `https://url-shortener-production-0bea.up.railway.app/url/my-urls`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch your URLs or Authorization denied");
      const data = await res.json();
      setUrls(data);
    } catch (err) {
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUrls();
  }, []);

  const validateSchema = Yup.object({
    longUrl: Yup.string().required("Long URL is required"),
    customCode: Yup.string().required("customcode is required"),
    expiresAt: Yup.date().required("Expiring date is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await fetch(
        `https://url-shortener-production-0bea.up.railway.app/url/shorten`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to shorten the URL");
      }

      resetForm();
      // await getUrls();
    } catch (error) {
      console.error("Error while shortening URL:", error.message);
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

  if (loading) return <p>Loading...</p>;
  if (err) return <p>Error: {err}</p>;

  return (
    <>
      <h1 id="typing">Welcome On Board</h1>
      <div className="grid">
        <div className="grid-right">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <input
                type="text"
                name="longUrl"
                placeholder="Enter your long link"
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
                placeholder="Enter your custom code"
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
            <button
              type="submit"
              className="sh-link"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Shortening..." : "Shorten URL"}
            </button>
          </form>
        </div>
        <div className="grid-left">
          <h1 id="myurl">My Shortened Links</h1>
          <div className="urls">
            {urls.length > 0 ? (
              <ol>
                {urls.map((url, index) => (
                  <li key={index}>
                    <p>Long: {url.long_url}</p>
                    <p><a href={`https://url-shortener-production-0bea.up.railway.app/redirect/${url.short_code}`} target="_blank" rel="noopener noreferrer">Short: {url.short_code}</a></p>
                    <p>Created: {url.created_at}</p>
                    <p>Expires: {url.expires_at}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p>You haven't shortened any URLs yet.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}