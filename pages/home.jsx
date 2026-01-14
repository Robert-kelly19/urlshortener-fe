import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Qrcode from "../components/Qrcode";
export default function Home() {
  const BE_URL = import.meta.env.VITE_BE_URL;
  const token = localStorage.getItem("token");
  const [urls, setUrls] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const validateSchema = Yup.object({
    longUrl: Yup.string().required("Long URL is required"),
    customCode: Yup.string().required("customcode is required"),
    expiresAt: Yup.date().required("Expiring date is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await fetch(`${BE_URL}/url/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message);
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

  useEffect(() => {
    const getUrls = async () => {
      try {
        const res = await fetch(`http://localhost:8000/url/my-urls`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch URLs. Please try again.");
        const data = await res.json();
        setUrls(data);
      } catch (err) {
        setErr(err.message);
      } finally {
        setLoading(false);
      }
    };
    getUrls();
  }, [handleSubmit]);

  if (loading) return <p className="pre">Loading...</p>;
  if (err) return <p className="pre">Error: {err}</p>;

  return (
    <>
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
            <div className="button">
              <button
                type="submit"
                className="sh-link"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Shortening..." : "Shorten URL"}
              </button>
            </div>
          </form>
        </div>
        <div className="grid-left">
          <h1 id="myurl">Short Links</h1>
          <div className="urls">
            {urls.length > 0 ? (
              <ol>
                {urls.map((url, index) => (
                  <li key={index}>
                    <div className="display">
                      <div className="">
                        <p>Long: {url.long_url}</p>
                        <p>
                          Short_code:
                          <a
                            href={`http://localhost:8000/redirect/${url.short_code}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {url.short_code}
                          </a>
                        </p>
                        <p>
                          Created ON:{" "}
                          {new Date(url.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              weekday: "short",
                              day: "numeric", 
                            }
                          )}
                        </p>
                        <p>Expires On: {new Date(url.expires_at).toLocaleDateString("en-US",{
                          weekday: "short",
                          year: "numeric",
                          day:"numeric",
                        })}</p>
                      </div>
                      <Qrcode link={url.short_code} />
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="pre1">You haven't shortened any URLs yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
