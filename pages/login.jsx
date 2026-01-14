import { useFormik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();

  const BE_URL = import.meta.env.VITE_BE_URL

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      if (!data.token) {
        throw new Error("Token not returned from server");
      }

      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      resetForm();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="container">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="item">
        <div className="item1">
          <div className="item1-1">
            <h1>
              <span>Url</span>Shortener
            </h1>
          </div>
          <h3>Login to your Account</h3>
        </div>

        <div className="item2">
          <form onSubmit={formik.handleSubmit} noValidate>
            <div>
              <label htmlFor="email">Email</label>
              <br />
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              )}
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <br />
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              id="btn"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        <hr />

        <button id="switch" onClick={() => navigate("/signUP")}>
          Create New Account
        </button>
      </div>
    </div>
  );
}
