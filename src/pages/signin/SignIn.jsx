import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import AxiosService from "../../components/utils/ApiService";
import { useNavigate, Link } from "react-router-dom";
import signincss from "./signin.module.css";
import Spinner from "../../components/utils/Sipnners";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons from react-icons/fi

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await AxiosService.post(`/user/login`, {
        email,
        password,
      });

      if (res.status === 200) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("userData", JSON.stringify(res.data.userData));
        if (res.data.userData.status === "InActive") {
          navigate("/");
          toast.error("You are not Allow to login");
        } else if (res.data.userData.role === "admin") {
          toast.success(res.data.message);
          navigate("/dashboard");
        } else {
          toast.success(res.data.message);
          navigate("/userdash");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={signincss.Signin}>
        <div className={signincss.circles}>
          <div className={signincss.circle1}></div>
          <div className={signincss.circle2}></div>
        </div>
        <div className={signincss.wrapper}>
          <form className={signincss.loginform} onSubmit={handleLogin}>
            <h2 className={signincss.heading}>Login</h2>
            <div className={signincss.inputfield}>
              <input
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Enter your email</label>
            </div>
            <div className={signincss.inputfield}>
             
            <div className="d-flex "> <input
                type={showPassword ? "text" : "password"}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Enter your password</label>
              {/* Toggle password visibility */}
              {showPassword ? (
                <FiEyeOff
                  className={signincss.passwordIcon}
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FiEye
                  className={signincss.passwordIcon}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
              </div> 
            </div>
            <div className={signincss.forget}>
              <label>
                <input type="checkbox" className={signincss.remember} />
                <p>Remember me</p>
              </label>
              <Link to="/Forgotpassword">Forgot password?</Link>
            </div>
            <button
              className={signincss.login}
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Log In"}
            </button>
            <div className={signincss.register}>
              <p></p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;










































// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import { toast } from "react-toastify";
// import AxiosService from "../../components/utils/ApiService";
// import { useNavigate, Link } from "react-router-dom";
// import signincss from "./signin.module.css";
// import Spinner from "../../components/utils/Sipnners";

// function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true); // Set loading to true when starting the login process

//       const res = await AxiosService.post(`/user/login`, {
//         email,
//         password,
//       });

//       if (res.status === 200) {
//         sessionStorage.setItem("token", res.data.token);
//         sessionStorage.setItem("userData", JSON.stringify(res.data.userData));
//         if (res.data.userData.status === "InActive") {
//           navigate("/");
//           toast.error("You are not Allow to login");
//         } else if (res.data.userData.role === "admin") {
//           toast.success(res.data.message);
//           navigate("/dashboard");
//         } else {
//           toast.success(res.data.message);
//           navigate("/userdash");
//         }
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     } finally {
//       setLoading(false); // Set loading to false after the login attempt (success or failure)
//     }
//   };

//   return (
//     <>
//       <div className={signincss.Signin}>
//         <div className={signincss.circles}>
//           <div className={signincss.circle1}></div>
//           <div className={signincss.circle2}></div>
//         </div>
//         <div className={signincss.wrapper}>
//           <form className={signincss.loginform} onSubmit={handleLogin}>
//             <h2 className={signincss.heading}>Login</h2>
//             <div className={signincss.inputfield}>
//               <input
//                 type="email"
//                 required
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <label>Enter your email</label>
//             </div>
//             <div className={signincss.inputfield}>
//               <input
//                 type="password"
//                 required
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <label>Enter your password</label>
//             </div>
//             <div className={signincss.forget}>
//               <label>
//                 <input type="checkbox" className={signincss.remember} />
//                 <p>Remember me</p>
//               </label>
//               <Link to="/Forgotpassword">Forgot password?</Link>
//             </div>
//             <button
//               className={signincss.login}
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? <Spinner /> : "Log In"}
//             </button>
//             <div className={signincss.register}>
//               <p></p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default SignIn;





