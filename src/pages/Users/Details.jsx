import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WorkIcon from "@mui/icons-material/Work";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import AxiosService from "../../components/utils/ApiService";
import { toast } from "react-toastify";


// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

const Details = () => {
  const [getuserdata, setUserdata] = useState([]);
  const { id } = useParams("");
  const navigate = useNavigate();

  const getdata = async () => {
    try {
      const response = await AxiosService.get(`/user/getuser/${id}`);
      const data = response.data;

      if (response.status === 200) {
        setUserdata(data);
        console.log("Data fetched successfully:", data);
      } else {
        console.log("Error fetching data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteuser = async (id) => {
    try {
      const response = await AxiosService.delete(`/user/deleteuser/${id}`);
      const deletedata = response.data;

      if (response.status === 422 || !deletedata) {
        console.log("error");
      } else {
        console.log("user deleted");
        toast.success("User deleted successfully");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="container mt-3">
      <h1 className="text-center text-white mb-4">User Profile</h1>

      <Card
        className="mx-auto"
        style={{ maxWidth: "600px", backgroundColor: "#f8f9fa" }}
      >
        <CardContent>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <NavLink to={`/edit/${getuserdata._id}`}>
              <button className="btn btn-primary">
                <CreateIcon /> Edit
              </button>
            </NavLink>
            <button
              className="btn btn-danger"
              onClick={() => deleteuser(getuserdata._id)}
            >
              <DeleteOutlineIcon /> Delete
            </button>
          </div>

          <div className="row border-bottom py-3">
            <div className="col-lg-6 col-md-6 col-6">
              <p className="mb-0">
                <b>Name:</b> <span>{getuserdata.name}</span>
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-6">
              <p className="mb-0">
                <b>Status: </b>
                <span>{getuserdata.status}</span>
              </p>
            </div>
          </div>

          <div className="row border-bottom py-3">
            <div className="col-lg-6 col-md-6 col-6">
              <p className="mb-0">
                <MailOutlineIcon /> Email: <span>{getuserdata.email}</span>
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-6">
              <p className="mb-0">
                <WorkIcon /> Occupation: <span>Software Engineer</span>
              </p>
            </div>
          </div>

          <div className="row border-bottom py-3">
            <div className="col-lg-6 col-md-6 col-6">
              <p className="mb-0">
                <PhoneAndroidIcon /> Mobile:{" "}
                <span>+91 {getuserdata.mobile}</span>
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-6">
              <p className="mb-0">
                <LocationOnIcon /> Location: <span>{getuserdata.add}</span>
              </p>
            </div>
          </div>

          <div className="row border-bottom py-3">
            <div className="col-lg-6 col-md-6 col-6">
              <p className="mb-0">
                <b>UserId:</b> <span>{getuserdata._id}</span>
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-6">
              <p className="mb-0">
                <b>Description:</b> <span>{getuserdata.desc}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
