import React, { useState, useEffect, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import { adddata, deldata } from "../../components/context/ContextProvider";
import { updatedata } from "../../components/context/ContextProvider";
import AxiosService from "../../components/utils/ApiService";
import { toast } from "react-toastify";
import useLogout from "../../components/hooks/useLogout";
import styles from "../../components/Dashboard/AdminDashboard/Dashboard.module.css";

import Spinner from "../../components/Spiner/Spiner";

const Home = () => {
  let logout = useLogout();
  const [loading, setLoading] = useState(true);
  const [getuserdata, setUserdata] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const { udata, setUdata } = useContext(adddata);
  const { updata, setUPdata } = useContext(updatedata);
  const { dltdata, setDLTdata } = useContext(deldata);

  const getdata = async () => {
    try {
      let res = await AxiosService.get(`/user/getdata`);
      const data = res.data;

      if (res.status === 200) {
        toast.success(res.data.message);
        setUserdata(data.userData);
        setFilteredData(data.userData);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        logout();
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    try {
      const response = await AxiosService.delete(`/user/deleteuser/${id}`);
      const deletedata = response.data;

      if (response.status === 422 || !deletedata) {
        console.log("error");
      } else {
        console.log("user deleted");
        setDLTdata(deletedata);
        toast.success("Delete Successfully");
        getdata();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    const filtered = getuserdata.filter((user) => {
      const mobile = String(user.mobile);

      return (
        user.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        user.email.toLowerCase().includes(inputValue.toLowerCase()) ||
        user._id.toLowerCase().includes(inputValue.toLowerCase()) ||
        mobile.toLowerCase().includes(inputValue.toLowerCase())
      );
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    setFilteredData(getuserdata);
  }, [getuserdata]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="container ">
      <div className={`card mb-4 ${styles.userTable}`}>
        <div className="card-header  ">
          <i className="fas fa-table me-1"></i>
          UserData
        </div>

        <div className="card-body">
          <div className="mb-3 col-sm-6">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={handleSearchInputChange}
                className="form-control"
              />
              <span className="input-group-text">
                <SearchIcon />
              </span>
            </div>
          </div>
          <div className="add_btn  ">
            <NavLink to="/register" className="btn btn-primary">
              Add data
            </NavLink>
          </div>
          <div
            className="table-responsive"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <table
              id="datatablesSimple"
              className={`table ${styles.userTable}`}
            >
              <thead className="thead-dark">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user, id) => (
                  <tr key={user._id}>
                    <td>{id + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td
                      className={`status-cell ${
                        user.status === "Active"
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {user.status}
                    </td>
                    <td>{user.mobile}</td>
                    <td className="d-flex justify-content-between">
                      <NavLink to={`/view/${user._id}`}>
                        {" "}
                        <button className="btn btn-success">
                          <RemoveRedEyeIcon />
                        </button>
                      </NavLink>
                      <NavLink to={`/edit/${user._id}`}>
                        {" "}
                        <button className="btn btn-primary">
                          <CreateIcon />
                        </button>
                      </NavLink>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteuser(user._id)}
                      >
                        <DeleteOutlineIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <nav>
            <ul className="pagination">
              {[
                ...Array(Math.ceil(filteredData.length / itemsPerPage)).keys(),
              ].map((number) => (
                <li
                  key={number + 1}
                  className={`page-item ${
                    currentPage === number + 1 ? "active" : ""
                  }`}
                >
                  <a onClick={() => paginate(number + 1)} className="page-link">
                    {number + 1}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Home;
