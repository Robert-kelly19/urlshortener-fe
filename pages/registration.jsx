import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router";


export default function Signup() {
    const navigate = useNavigate();
  const validateSchema = Yup.object({
    firstName: Yup.string().min(3).required("firstName is required"),
    lastName: Yup.string().min(3).required("lastName is required"),
    email: Yup.string().email().required("email is required"),
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
      const res = await fetch(`https://url-shortener-production-0bea.up.railway.app/auth/register`, {
        method:"post",
        headers:{'content-Type': 'application/json',},
        body:JSON.stringify(values)
      });
      const data = await res.json();;
      resetForm();
      navigate('/home')
    } catch (error) {
      console.error("error while registatring:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validateSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className="contain">
        <div className="con1">
          <div className="item1-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2615/2615096.png"
              alt="logo"
            />
            <h1>
              <span>Url</span>Shortener
            </h1>
          </div>
          <form id='signup'onSubmit={formik.handleSubmit}>
          <h3>create a new account</h3>
          <hr />
            <div className="names">
              <div>
                <label htmlFor="firstName">FirstName</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="enter your firstname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div style={{ color: "red" }}>{formik.errors.firstName}</div>
                )}
              </div>
              <div>
                <label htmlFor="lastName">lastName</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="enter your last name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div style={{ color: "red" }}>{formik.errors.lastName}</div>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="email">Email</label>
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
            <div className="password">
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="enter your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <div style={{ color: "red" }}>{formik.errors.password}</div>
                )}
              </div>
              <div>
                {" "}
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm your password"
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
            <br /> <hr />
            <button id='switch' type="button" onClick={()=>navigate('/')}>Already have an account</button>
          </form>
        </div>
      </div>
    </>
  );
}
