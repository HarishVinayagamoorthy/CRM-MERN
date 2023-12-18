// import React, { useState, useEffect } from "react";
// import Table from "react-bootstrap/Table";
// import Pagination from "react-bootstrap/Pagination";
// import styles from "../../components/Dashboard/AdminDashboard/Dashboard.module.css";

// import TaskForm from "./TaskForm";
// import AxiosService from "../../components/utils/ApiService";
// import Spinner from "../../components/Spiner/Spiner"; // Replace with the correct path to your Spinner component

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const tasksPerPage = 9;

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const response = await AxiosService.get("/task/tasks");
//       setTasks(response.data.tasks);
//     } catch (error) {
//       console.error("Error fetching tasks:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []); // Run once on component mount

//   const refreshTasks = () => {
//     fetchTasks();
//   };

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const reversedTasks = Array.isArray(tasks) ? tasks.slice().reverse() : [];
//   const indexOfLastTask = currentPage * tasksPerPage;
//   const indexOfFirstTask = indexOfLastTask - tasksPerPage;
//   const currentTasks = reversedTasks.slice(indexOfFirstTask, indexOfLastTask);

//   return (
//     <div className="container">
//       {loading && <Spinner />} {/* Show the spinner when loading */}
//       <div className={`card mb-2 ${styles.userTable}`}>
//         <div className="card-header">
//           <i className="fas fa-table me-1"></i>
//           Tasks Data
//         </div>
//         <div className="mt-2 d-flex me-4 justify-content-end">
//           <TaskForm refreshTasks={refreshTasks} />
//         </div>
//         <div className="card-body">
//           <div
//             className="table-responsive"
//             style={{ maxHeight: "400px", overflowY: "auto" }}
//           >
//             <Table
//               id="datatablesSimple"
//               className={`table ${styles.userTable}`}
//             >
//               <thead className="thead-dark">
//                 <tr>
//                   <th>Id</th>
//                   <th>Title</th>
//                   <th>Description</th>
//                   <th>Assigned To</th>
//                   {/* <th>Status</th> */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentTasks.map((task, index) => (
//                   <tr key={task._id}>
//                     <td>{index + 1}</td>
//                     <td>{task.title}</td>
//                     <td>{task.description}</td>
//                     <td>{task.assignedTo}</td>
//                     {/* <td>{task.status}</td> */}
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>

//           <div className="d-flex justify-content-center">
//             <Pagination>
//               {[
//                 ...Array(Math.ceil(reversedTasks.length / tasksPerPage)).keys(),
//               ].map((number) => (
//                 <Pagination.Item
//                   key={number + 1}
//                   active={number + 1 === currentPage}
//                   onClick={() => paginate(number + 1)}
//                 >
//                   {number + 1}
//                 </Pagination.Item>
//               ))}
//             </Pagination>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskList;


// import React, { useState, useEffect } from "react";
// import Table from "react-bootstrap/Table";
// import Pagination from "react-bootstrap/Pagination";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import styles from "../../components/Dashboard/AdminDashboard/Dashboard.module.css";
// import AxiosService from "../../components/utils/ApiService";
// import Spinner from "../../components/Spiner/Spiner";
// import EditTaskForm from "./EditTaskForm";
// import TaskForm from "./TaskForm";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import CreateIcon from "@mui/icons-material/Create";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [userDetails, setUserDetails] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const tasksPerPage = 9;

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const response = await AxiosService.get("/task/tasks");
//       setTasks(response.data.tasks);

//       // Fetch user details for each task
//       const userIds = response.data.tasks.map((task) => task.assignedTo);
//       const usersDetails = await Promise.all(
//         userIds.map(async (userId) => {
//           try {
//             const userResponse = await AxiosService.get(`/user/getuser/${userId}`);
//             return userResponse.data;
//           } catch (error) {
//             console.error(`Error fetching user details for user ${userId}:`, error.message);
//             return { _id: userId, email: 'N/A' }; // Return a placeholder if user details are not available
//           }
//         })
//       );

//       const usersMap = {};
//       usersDetails.forEach((user) => {
//         usersMap[user._id] = user;
//       });

//       setUserDetails(usersMap);

//       // Recalculate total page count based on the updated tasks
//       const updatedTotalPageCount = Math.ceil(response.data.tasks.length / tasksPerPage);

//       if (currentPage > updatedTotalPageCount) {
//         setCurrentPage(updatedTotalPageCount);
//       }
//     } catch (error) {
//       console.error("Error fetching tasks:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const deleteTask = async (taskId) => {
//     try {
//       await AxiosService.delete(`/task/delete/${taskId}`);
//       toast.success("Task Deleted Successfully");

//       // Update the state by filtering out the deleted task
//       setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
//     } catch (error) {
//       console.error("Error deleting task:", error.message);
//     }
//   };

//   const handleShowEditModal = (task) => {
//     setSelectedTask(task);
//     setShowEditModal(true);
//   };

//   const handleShowCreateTaskModal = () => {
//     setSelectedTask(null);
//     setShowEditModal(true);
//   };

//   const handleUpdateTask = async (updatedData) => {
//     try {
//       await AxiosService.put(`/task/edit/${selectedTask._id}`, updatedData);
//       toast.success("Task Updated Successfully");

//       // Update the state with the modified task
//       setTasks((prevTasks) =>
//         prevTasks.map((task) =>
//           task._id === selectedTask._id ? { ...task, ...updatedData } : task
//         )
//       );

//       setShowEditModal(false);
//       setSelectedTask(null);
//     } catch (error) {
//       console.error("Error updating task:", error.message);

//       if (error.response && error.response.data && error.response.data.message) {
//         toast.error(`Error updating task: ${error.response.data.message}`);
//       } else {
//         toast.error("An error occurred while updating the task.");
//       }
//     }
//   };

//   const handleHideEditModal = () => {
//     setShowEditModal(false);
//     setSelectedTask(null);
//   };

//   const refreshTasks = () => {
//     fetchTasks();
//   };

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const reversedTasks = Array.isArray(tasks) ? tasks.slice().reverse() : [];
//   const indexOfLastTask = currentPage * tasksPerPage;
//   const indexOfFirstTask = indexOfLastTask - tasksPerPage;
//   const currentTasks = reversedTasks.slice(indexOfFirstTask, indexOfLastTask);

//   return (
//     <div className="container">
//       <div className={`card mb-2 ${styles.userTable}`}>
//         <div className="card-header">
//           <i className="fas fa-table me-1"></i>
//           Tasks Data
//         </div>
//         <div className="mt-2 d-flex me-4 justify-content-end">
//           <TaskForm refreshTasks={refreshTasks} />
//         </div>
//         <div className="card-body">
//           <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
//             {loading && <Spinner />}
//             <Table id="datatablesSimple" className={`table ${styles.userTable}`}>
//               <thead className="thead-dark">
//                 <tr>
//                   <th>Id</th>
//                   <th>Title</th>
//                   <th>Description</th>
//                   <th>Assigned To</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentTasks.map((task, index) => (
//                   <tr key={task._id}>
//                     <td>{index + 1}</td>
//                     <td>{task.title}</td>
//                     <td>{task.description}</td>
//                     <td>{userDetails[task.assignedTo]?.email || "N/A"}</td>
//                     <td>
//                       <Button variant="danger" size="sm" onClick={() => deleteTask(task._id)}>
//                         <DeleteOutlineIcon />
//                       </Button>{" "}
//                       <Button variant="primary" size="sm" onClick={() => handleShowEditModal(task)}>
//                         <CreateIcon />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>

//           <div className="d-flex justify-content-center">
//             <Pagination>
//               {[...Array(Math.ceil(reversedTasks.length / tasksPerPage)).keys()].map((number) => (
//                 <Pagination.Item
//                   key={number + 1}
//                   active={number + 1 === currentPage}
//                   onClick={() => paginate(number + 1)}
//                 >
//                   {number + 1}
//                 </Pagination.Item>
//               ))}
//             </Pagination>
//           </div>
//         </div>
//       </div>

//       {selectedTask && (
//         <Modal show={showEditModal} onHide={handleHideEditModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Task</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <EditTaskForm task={selectedTask} onUpdate={handleUpdateTask} />
//           </Modal.Body>
//         </Modal>
//       )}

//       {!selectedTask && (
//         <Modal show={showEditModal} onHide={handleHideEditModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Create Task</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <TaskForm refreshTasks={refreshTasks} />
//           </Modal.Body>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default TaskList;




import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../../components/Dashboard/AdminDashboard/Dashboard.module.css";
import AxiosService from "../../components/utils/ApiService";
import Spinner from "../../components/Spiner/Spiner";
import EditTaskForm from "./EditTaskForm";
import TaskForm from "./TaskForm";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { FaSort } from "react-icons/fa6";
import SearchIcon from "@mui/icons-material/Search";


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("desc"); // "asc" or "desc"
  const tasksPerPage = 9;

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await AxiosService.get("/task/tasks");
      setTasks(response.data.tasks);

      // Fetch user details for each task
      const userIds = response.data.tasks.map((task) => task.assignedTo);
      const usersDetails = await Promise.all(
        userIds.map(async (userId) => {
          try {
            const userResponse = await AxiosService.get(`/user/getuser/${userId}`);
            return userResponse.data;
          } catch (error) {
            console.error(`Error fetching user details for user ${userId}:`, error.message);
            return { _id: userId, email: 'N/A' }; // Return a placeholder if user details are not available
          }
        })
      );

      const usersMap = {};
      usersDetails.forEach((user) => {
        usersMap[user._id] = user;
      });

      setUserDetails(usersMap);

      // Recalculate total page count based on the updated tasks
      const updatedTotalPageCount = Math.ceil(response.data.tasks.length / tasksPerPage);

      if (currentPage > updatedTotalPageCount) {
        setCurrentPage(updatedTotalPageCount);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (taskId) => {
    try {
      await AxiosService.delete(`/task/delete/${taskId}`);
      toast.success("Task Deleted Successfully");

      // Update the state by filtering out the deleted task
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const handleShowEditModal = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleShowCreateTaskModal = () => {
    setSelectedTask(null);
    setShowEditModal(true);
  };

  const handleUpdateTask = async (updatedData) => {
    try {
      await AxiosService.put(`/task/edit/${selectedTask._id}`, updatedData);
      toast.success("Task Updated Successfully");

      // Update the state with the modified task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === selectedTask._id ? { ...task, ...updatedData } : task
        )
      );

      setShowEditModal(false);
      setSelectedTask(null);
    } catch (error) {
      console.error("Error updating task:", error.message);

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Error updating task: ${error.response.data.message}`);
      } else {
        toast.error("An error occurred while updating the task.");
      }
    }
  };

  const handleHideEditModal = () => {
    setShowEditModal(false);
    setSelectedTask(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
  });

  const filteredTasks = sortedTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    userDetails[task.assignedTo]?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const refreshTasks = () => {
    fetchTasks();
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const reversedTasks = Array.isArray(filteredTasks) ? filteredTasks.slice().reverse() : [];
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = reversedTasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div className="container">
      <div className={`card mb-2 ${styles.userTable}`}>
        <div className="card-header">
          <i className="fas fa-table me-1"></i>
          Tasks Data
        </div>
        <div className=" mt-4 mb-1 d-flex justify-content-around col-sm-12">
            <div className="mb-3  col-sm-auto">
          <TaskForm refreshTasks={refreshTasks} />
          </div>
          <div className="mb-3  col-sm-auto">
          <div className="input-group">
          
           <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="form-control"
                />
                <span className="input-group-text">
                  <SearchIcon />
                </span>
              </div>
              </div>
              <div className="mb-3  col-sm-auto">
           <FaSort 
            onClick={handleSort}
            className={`ms-2 ${styles.sortIcon}`} 
          />
          </div>
        
        </div>
        <div className="card-body">
          <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
            {loading && <Spinner />}
            <Table id="datatablesSimple" className={`table ${styles.userTable}`}>
              <thead className="thead-dark">
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Assigned To</th>
                  <th>User ID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentTasks.map((task, index) => (
                  <tr key={task._id}>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{userDetails[task.assignedTo]?.email || "N/A"}</td>
                    <td>{task.assignedTo}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => deleteTask(task._id)}>
                        <DeleteOutlineIcon />
                      </Button>{" "}
                      <Button variant="primary" size="sm" onClick={() => handleShowEditModal(task)}>
                        <CreateIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="d-flex justify-content-center">
            <Pagination>
              {[...Array(Math.ceil(reversedTasks.length / tasksPerPage)).keys()].map((number) => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </div>
      </div>

      {selectedTask && (
        <Modal show={showEditModal} onHide={handleHideEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditTaskForm task={selectedTask} onUpdate={handleUpdateTask} />
          </Modal.Body>
        </Modal>
      )}

      {!selectedTask && (
        <Modal show={showEditModal} onHide={handleHideEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TaskForm refreshTasks={refreshTasks} />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default TaskList;

