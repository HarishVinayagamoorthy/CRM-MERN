import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import TicketTile from "../../components/common/TicketTile";
import AxiosService from "../../components/utils/ApiService";
import { useNavigate } from "react-router-dom";
import useLogout from "../../components/hooks/useLogout";
import { toast } from "react-toastify";

function Create() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const navigate = useNavigate();
  const logout = useLogout();

  const createTicket = async () => {
    try {
      setLoading(true); // Set loading to true before the API call

      let res = await AxiosService.post("/tickets/create", {
        title,
        imageUrl,
        description,
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        navigate("/tickets");
      }
    } catch (error) {
      toast.error(error.response.data.message);

      if (error.response.status === 401) {
        logout();
      }
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  return (
    <div className="container mt-4 col-md-7">
      <div className="card p-4 bg-light">
        <h3 className="text-center mb-4">Share Your Tickets!</h3>
        <Form>
          <Form.Group className="mb-4 col-md-auto" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4 col-md-auto" controlId="formImageUrl">
            <Form.Label>Image Url</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image Url"
              value={imageUrl}
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-5 col-md-auto" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              style={{ height: "150px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <div className="text-center">
            <Button
              variant="primary"
              onClick={() => createTicket()}
              disabled={loading}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Create;
