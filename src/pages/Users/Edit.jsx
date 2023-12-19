import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { updatedata } from '../../components/context/ContextProvider';
import { toast } from 'react-toastify'
import AxiosService from '../../components/utils/ApiService';
import Spinner from '../../components/utils/Sipnners';
const Edit = () => {
    const { updata, setUPdata } = useContext(updatedata);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [loading, setLoading] = useState(true);
    const [inpval, setINP] = useState({
        name: "",
        email: "",
        status: "",
        mobile: "",
        password: "",
        add: "",
        desc: ""
    });

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const { id } = useParams("");
    console.log(id);

    // const getdata = async () => {
    //     const res = await fetch(`http://localhost:8000/user/getuser/${id}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     });

    //     const data = await res.json();
    //     console.log(data);

    //     if (res.status === 422 || !data) {
    //         console.log("error ");
    //     } else {
    //         setINP(data);
    //         console.log("get data");
    //     }
    // }

    const getdata = async () => {
        try {
          const response = await AxiosService.get(`/user/getuser/${id}`);
          const data = response.data;
      
          console.log(data);
      
          if (response.status === 422 || !data) {
            console.log('error');
 
          } else {
            setINP(data);
            console.log('get data');
            setLoading(false); 

          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false); 
        }
      };
      

    useEffect(() => {
        getdata();
    }, []);

    // const updateuser = async (e) => {
    //     e.preventDefault();
    
    //     const { name, email, password, add, mobile, desc, status } = inpval;
    
    //     // Client-side validation
    //     if (!name || !email || !password || !mobile || !add || !desc || !status) {
    //         toast.error("Please fill in all the required fields.");
    //         return; // Exit the function early if validation fails
    //     }
    
    //     try {
    //         const res2 = await fetch(`/user/updateuser/${id}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 name, email, password, add, mobile, desc, status
    //             })
    //         });
    
    //         if (!res2.ok) {
    //             throw new Error("Failed to update user");
    //         }
    
    //         const data2 = await res2.json();
    //         console.log(data2);
    
    //         navigate("/home");
    //         setUPdata(data2);
    //         toast.success("User Updated Successfully");
    //     } catch (error) {
    //         console.error("Error updating user:", error);
    //         toast.error("Email or Mobile is Already exited");
    //     }
    // };
    const updateuser = async (e) => {
      e.preventDefault();
  
      const { name, email, password, add, mobile, desc, status } = inpval;
  
      // Client-side validation
      if (!name || !email || !password || !mobile || !add || !desc || !status) {
          toast.error("Please fill in all the required fields.");
          return; // Exit the function early if validation fails
      }
  
    // Password regex pattern: At least 8 characters, at least one uppercase letter, one lowercase letter, and one digit
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    // Validate the password
    if (!passwordRegex.test(password)) {
        toast.error("Password must be at least 8 characters, with at least one uppercase letter, one lowercase letter, and one digit.");
        return;
    }



      try {
          const response = await AxiosService.put(`/user/updateuser/${id}`, {
              name,
              email,
              password,
              add,
              mobile,
              desc,
              status
          }, {
              headers: {
                  "Content-Type": "application/json"
              }
          });
  
          // Axios automatically throws an error for non-2xx responses
          const data2 = response.data;
          console.log(data2);
  
          navigate("/home");
          setUPdata(data2);
          toast.success("User Updated Successfully");
      } catch (error) {
          console.error("Error updating user:", error);
  
          // Check if the error is due to duplicate email or mobile
          if (error.response && (error.response.status === 400 || error.response.status === 409)) {
              toast.error("Email or Mobile is Already existed");
          } else {
              toast.error("Failed to update user");
          }
      }
  };
  
    return (
      <div className="container mt-2">
      <form className="bg-light p-4 rounded">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" value={inpval.name} onChange={setdata} name="name" className="form-control" id="name" required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" value={inpval.email} onChange={setdata} name="email" className="form-control" id="email" required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="status" className="form-label">
              Select Your Status
            </label>
            <select className="form-select" id="status" name="status" value={inpval.status} onChange={setdata}>
              <option value="Active">Active</option>
              <option value="InActive">Inactive</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="mobile" className="form-label">
              Mobile
            </label>
            <input type="number" value={inpval.mobile} onChange={setdata} name="mobile" className="form-control" id="mobile" required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" value={inpval.password} onChange={setdata} name="password" className="form-control" id="password" required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="add" className="form-label">
              Address
            </label>
            <input type="text" value={inpval.add} onChange={setdata} name="add" className="form-control" id="add" required />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <textarea name="desc" value={inpval.desc} onChange={setdata} className="form-control" id="desc" cols="30" rows="5"></textarea>
          </div>
          <div className="col-12">
            <button type="submit"onClick={updateuser}  className="btn btn-primary">
            {loading ? <Spinner /> : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
    )
}

export default Edit;