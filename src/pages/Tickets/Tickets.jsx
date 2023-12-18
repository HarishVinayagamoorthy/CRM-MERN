import React, { useEffect, useState } from "react";
import TicketTile from "../../components/common/TicketTile";
import { useParams } from "react-router-dom";
import useLogout from "../../components/hooks/useLogout";
import { toast } from "react-toastify";
import AxiosService from "../../components/utils/ApiService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Ticket() {
  let logout = useLogout();
  let userData = JSON.parse(sessionStorage.getItem("userData"));

  return (
    <Container fluid>
      <Row>
        <Col>
          {userData.role === "admin" ? <AdminTicket /> : <EditTicket />}
        </Col>
      </Row>
    </Container>
  );
}

function EditTicket() {
  let params = useParams();
  let [title, setTitle] = useState("");
  let [imageUrl, setImage] = useState("");
  let [description, setDescription] = useState("");
  let [ticket, setTicket] = useState({});
  let navigate = useNavigate();
  let logout = useLogout();

  let getTicket = async () => {
    try {
      let res = await AxiosService.get(`/tickets/${params.id}`);
      if (res.status === 200) {
        setTitle(res.data.ticket.title);
        setImage(res.data.ticket.imageUrl);
        setDescription(res.data.ticket.description);
        setTicket(res.data.ticket);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    if (params.id) {
      getTicket();
    } else {
      logout();
    }
  }, [params.id]);

  let editticket = async () => {
    try {
      let res = await AxiosService.put(`/tickets/edit/${ticket._id}`, {
        title,
        imageUrl,
        description,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/tickets");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        logout();
      }
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
          <div style={{ textAlign: "center" }}>
            <Button variant="primary" onClick={() => editticket()}>
              Submit
            </Button>
            &nbsp;
            <Button variant="warning" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

// ... (your imports)

function AdminTicket() {
  const params = useParams();
  const [ticket, setTicket] = useState({});
  const [reason, setReason] = useState("");
  const logout = useLogout();
  const navigate = useNavigate();

  const getTicket = async () => {
    try {
      const res = await AxiosService.get(`/tickets/${params.id}`);
      if (res.status === 200) {
        setTicket(res.data.ticket);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    if (params.id) {
      getTicket();
    } else {
      logout();
    }
  }, [params.id]);

  const changeStatus = async (status) => {
    try {
      if (!reason && status === "resolved") {
        toast.error("Please provide a Solution for the Resolve.");
        return;
      }

      const res = await AxiosService.put(
        `/tickets/status/${ticket._id}/${status}`,
        {
          reason: reason,
        }
      );

      if (res.status === 200) {
        getTicket();
        setReason(""); // Clear the reason after a successful status change

        // Provide different responses for each status change
        switch (status) {
          case "pending":
            toast.success("Ticket status changed to Pending.");
            navigate("/tickets");
            break;
          case "approved":
            toast.success("Ticket status changed to Approved.");
            navigate("/tickets");
            break;
          case "resolved":
            toast.success("Ticket status changed to Resolved.");
            navigate("/tickets");
            break;
          default:
            break;
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        logout();
      }
    }
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor: "",
        padding: "",
        maxHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <Row className="justify-content-center ">
        <Col
          xs={12}
          md={8}
          lg={6}
          className=""
          style={{ background: "#fff", padding: "20px", borderRadius: "10px" }}
        >
          <div
            className="Tickets-wrapper"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <TicketTile ticket={ticket} />
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            {ticket.status !== "pending" ? (
              <Button variant="warning" onClick={() => changeStatus("pending")}>
                Pending
              </Button>
            ) : (
              <></>
            )}
            &nbsp;
            {ticket.status !== "approved" ? (
              <Button
                variant="secondary"
                onClick={() => changeStatus("approved")}
              >
                Approved
              </Button>
            ) : (
              <></>
            )}
            &nbsp;
            {ticket.status !== "resolved" ? (
              <>
                <Button
                  variant="success"
                  onClick={() => changeStatus("resolved")}
                >
                  Resolved
                </Button>
                <Form.Group className="mb-3" style={{ marginTop: "10px" }}>
                  <Form.Control
                    as="textarea"
                    placeholder="Solution for Resolved"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    style={{ height: "100px" }}
                  />
                </Form.Group>
              </>
            ) : (
              <></>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Ticket;
