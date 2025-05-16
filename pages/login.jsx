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
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await axios.post(
        `https://url-shortener-production-0bea.up.railway.app/auth/login`,
        values
      );
      console.log("form submitted", res.data);
      localStorage.setItem('token', res.data.token);
      console.log("this is the token:",res.data.token)
      resetForm();
      navigate('/home')
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
    validationSchema: validateSchema,
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
