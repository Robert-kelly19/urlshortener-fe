import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const navigate = useNavigate();

  const BE_URL = import.meta.env.VITE_BE_URL;
  const validateSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 8 characters")
      .matches(/[a-z]/, "At least one lowercase letter required")
      .matches(/[A-Z]/, "At least one uppercase letter required")
      .matches(/[0-9]/, "At least one number required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await fetch(`${BE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }
      toast.success(data.message);
      resetForm();
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validateSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="contain">
        {/* Image Section */}
        <div className="auth-image-section">
          <img 
            src="https://pngimg.com/d/qr_code_PNG17.png" 
            alt="QR Code" 
            className="auth-image"
          />
          <h2>Join Us Today!</h2>
          <p>Create an account and start shortening your links instantly</p>
        </div>

        {/* Form Section */}
        <div className="con1">
          <div className="item1-2"></div>

          <form id="signup" onSubmit={formik.handleSubmit}>
            <h1>
              <span>Url</span>Shortener
            </h1>
            <h3>Create a New Account</h3>
            <hr />

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              )}
            </div>

            <div className="password">
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <div style={{ color: "red" }}>{formik.errors.password}</div>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div style={{ color: "red" }}>
                      {formik.errors.confirmPassword}
                    </div>
                  )}
              </div>
            </div>

            <button type="submit" id="btn" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
            <hr />
            <button
              id="switch"
              type="button"
              onClick={() => navigate("/login")}
            >
              Already have an account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
