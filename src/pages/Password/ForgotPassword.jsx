import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import AxiosService from "../../components/utils/ApiService";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/utils/Sipnners"; // Import your Spinner component

import Forgotpassword from "../Password/frogot.module.css";

const ResetPassword = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await AxiosService.post("/user/resetpassword", values);
      toast.success(`OTP and Link Sent Successfully to ${values.email}`);
      navigate("/resetpassword");
      console.log(response.data.message);
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className={Forgotpassword.totalbody}>
        <div className={Forgotpassword.circles}>
          <div className={Forgotpassword.circle1}></div>
          <div className={Forgotpassword.circle2}></div>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className={Forgotpassword.login_form}
        >
          <h1>Welcome back!</h1>
          <p>Forgot Password</p>
          <input
            type="email"
            name="email"
            className={Forgotpassword.formcontrol}
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
         
         
         
         />
          {formik.touched.email && formik.errors.email && (
            <p className={Forgotpassword.error}>{formik.errors.email}</p>
          )}

          <button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? <Spinner /> : "Reset Password"}
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
