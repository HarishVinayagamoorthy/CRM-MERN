import React, { useState, useEffect } from "react";
import AxiosService from "../../components/utils/ApiService";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const Task = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await AxiosService.get("/task/tasks");
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const refreshTasks = () => {
    fetchTasks();
  };

  return (
    <div className="container ">
      <div className="row">
        <div className="col-md-12">
          {/* <div className="mt-5 d-flex me-4 justify-content-end">
      
          /
          <TaskForm refreshTasks={refreshTasks} />
          </div> */}

          <TaskList tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default Task;
