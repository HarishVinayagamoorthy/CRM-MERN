import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AxiosService from "../../components/utils/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/utils/Sipnners"; // Replace with the correct path to your Spinner component
import resetcss from "./resetPassword.module.css";

function ResetPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    token: Yup.string().required("OTP is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must be at least 8 characters, with at least one uppercase letter, one lowercase letter, and one digit."
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await AxiosService.post("/user/reset-password", {
        token: values.token,
        password: values.password,
      });

      // Assuming your backend returns a message on success
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      // Handle errors from the backend
      if (error.response.status === 404) {
        toast.error(error.response.data.message);
      }
      if (error.response.status === 401) {
        toast.error(error.response.data.message);
        navigate("/");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      token: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className={resetcss.totalbody}>
        <div className={resetcss.circles}>
          <div className={resetcss.circle1}></div>
          <div className={resetcss.circle2}></div>
        </div>
        <form onSubmit={formik.handleSubmit} className={resetcss.login_form}>
          <h1>Welcome back!</h1>
          <p>Reset Password</p>

          <input
            type="text"
            name="token"
            className={resetcss.formcontrol}
            value={formik.values.token}
            placeholder="OTP"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.token && formik.errors.token && (
            <p className={resetcss.error}>{formik.errors.token}</p>
          )}

          <div className={resetcss.passwordInputContainer}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={resetcss.formcontrol}
              value={formik.values.password}
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            

              
            
            />
            <button
              type="button"
              
              className={resetcss.passwordIcon}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            
          </div>

          {formik.touched.password && formik.errors.password && (
            <p className={resetcss.error}>{formik.errors.password}</p>
          )}

          <input
            type="password"
            name="confirmPassword"
            className={resetcss.formcontrol}
            value={formik.values.confirmPassword}
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className={resetcss.error}>{formik.errors.confirmPassword}</p>
          )}

          <button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? <Spinner /> : "Reset Password"}
          </button>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;































// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import AxiosService from "../../components/utils/ApiService";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import Spinner from "../../components/utils/Sipnners"; // Replace with the correct path to your Spinner component
// import resetcss from "./resetPassword.module.css";

// function ResetPassword() {
//   const navigate = useNavigate();
//   const validationSchema = Yup.object().shape({
//     token: Yup.string().required("OTP is required"),
//     password: Yup.string().required("Password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password"), null], "Passwords must match")
//       .required("Confirm Password is required"),
//   });

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const response = await AxiosService.post("/user/reset-password", {
//         token: values.token,
//         password: values.password,
//       });

//       // Assuming your backend returns a message on success
//       toast.success(response.data.message);
//       navigate("/");
//     } catch (error) {
//       // Handle errors from the backend
//       if (error.response.status === 404) {
//         toast.error(error.response.data.message);
//       }
//       if (error.response.status === 401) {
//         toast.error(error.response.data.message);
//         navigate("/");
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       token: "",
//       password: "",
//       confirmPassword: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: handleSubmit,
//   });

//   return (
//     <>
//       <div className={resetcss.totalbody}>
//         <div className={resetcss.circles}>
//           <div className={resetcss.circle1}></div>
//           <div className={resetcss.circle2}></div>
//         </div>
//         <form onSubmit={formik.handleSubmit} className={resetcss.login_form}>
//           <h1>Welcome back!</h1>
//           <p>Reset Password</p>

//           <input
//             type="text"
//             name="token"
//             className={resetcss.formcontrol}
//             value={formik.values.token}
//             placeholder="OTP"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.token && formik.errors.token && (
//             <p className={resetcss.error}>{formik.errors.token}</p>
//           )}

//           <input
//             type="password"
//             name="password"
//             className={resetcss.formcontrol}
//             value={formik.values.password}
//             placeholder="Password"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.password && formik.errors.password && (
//             <p className={resetcss.error}>{formik.errors.password}</p>
//           )}

//           <input
//             type="password"
//             name="confirmPassword"
//             className={resetcss.formcontrol}
//             value={formik.values.confirmPassword}
//             placeholder="Confirm Password"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//             <p className={resetcss.error}>{formik.errors.confirmPassword}</p>
//           )}

//           <button type="submit" disabled={formik.isSubmitting}>
//             {formik.isSubmitting ? <Spinner /> : "Reset Password"}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default ResetPassword;












