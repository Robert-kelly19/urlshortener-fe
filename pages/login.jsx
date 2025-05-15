import { useFormik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const validateSchema = Yup.object({
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "At least one lowercase letter required")
      .matches(/[A-Z]/, "At least one uppercase letter required")
      .matches(/[0-9]/, "At least one number required")
      .matches(/[@$!%*?&#]/, "At least one special character required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/auth/login`,
        values
      );
      console.log("form submitted", res.data);
      resetForm();
    } catch (error) {
      console.error("error while submitting:", error);
    } finally {
      setSubmitting(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className="container">
        <div className="item">
          <div className="item1">
            <div className="item1-1">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2615/2615096.png"
                alt="logo"
              />
              <h1>
                {" "}
                <span>Url</span>Shortener
              </h1>
            </div>
            <h4>login to your Account</h4>
          </div>
          <div className="item2">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label>Email</label>
                <br />
                <input
                  type="email"
                  name="email"
                  placeholder="enter your email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div style={{ color: "red" }}>{formik.errors.email}</div>
                )}
              </div>

              <div>
                <label>Password</label>
                <br />
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <div style={{ color: "red" }}>{formik.errors.password}</div>
                )}
              </div>

              <button type="submit" id="btn" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "loggingin..." : "login"}
              </button>
            </form>
          </div>
          <hr />
          <button id='switch' onClick={()=>navigate('/signup')}>Create New Account</button>
        </div>
      </div>
    </>
  );
}
