import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/NavBar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../Tasks/Tasks.css';
import { format } from 'date-fns';

const TICKETS_BASE_REST_API_URL = 'http://localhost:8080/crm/ticket';

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [createMode, setCreateMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    customer: {
        id:''
    },
    subject:'',
    description: '',
    status:'',
    assignedTo: {
        id:''
    }
  });
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [viewTickets, setViewTickets] = useState(null);
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    getAllTickets();
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(()=>{
    if(create){
        createTicket()
    }else if(update){
        updateTicket()
    }
  },[formData,update,create])

  const getAllTickets = async () => {
    try {
      const response = await axios.get(TICKETS_BASE_REST_API_URL);
      setTickets(response.data);
    } catch (error) {
      console.log('Error retrieving tickets:', error);
    }
  };

  const createTicket = async () => {
    try {
      await axios.post(TICKETS_BASE_REST_API_URL,formData);
      getAllTickets();
      setCreateMode(false);
      resetFormData();
      setCreate(false)
    } catch (error) {
        setCreate(false)
        console.log('Error creating tickets:', error);
    }
  };

  const updateTicket = async () => {
    try {
      const ticketId = selectedTickets[0];
      await axios.put(`${TICKETS_BASE_REST_API_URL}/${ticketId}`, formData);
      getAllTickets();
      setCreateMode(false);
      resetFormData();
      setUpdate(false);
    } catch (error) {
        setUpdate(false);
        console.log('Error updating tickets:', error);
    }
  };

  const deleteTicket = async () => {
    try {
      await axios.delete(`${TICKETS_BASE_REST_API_URL}/${selectedTickets[0]}`);
      getAllTickets();
      setSelectedTickets([]);
    } catch (error) {
      console.log('Error deleting ticket:', error);
    }
  };

  const deleteMultiple= async () =>{
    try{
      for(let id of selectedTickets){
        await axios.delete(`${TICKETS_BASE_REST_API_URL}/${id}`);
      }
      getAllTickets();
      setSelectedTickets([]);
    }catch (error) {
      console.log('Error deleting tickets:', error);
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFormChange = (e) => {
    if(e.target.name==='assignedTo'){
        setFormData({
            ...formData,
            assignedTo: {
                id:e.target.value
            },
            });
    }else if(e.target.name==='customer'){
        setFormData({
            ...formData,
            customer: {
                id:e.target.value
            },
            });
    }
    else{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            });
    }
  };

  const handleCreateClick = () => {
    setCreateMode(true);
    resetFormData();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(formData.assignedTo!==null&&formData.assignedTo.id===''){
        setFormData({...formData, assignedTo:null})
    }
    if (selectedTickets.length === 1) {
        setUpdate(true);
    } else {
        setCreate(true);
    }
  };

  const handleBackClick = () => {
    setCreateMode(false);
    resetFormData();
  };

  const handleCheckboxChange = (taskId) => {
    const selectedIndex = selectedTickets.indexOf(taskId);
    if (selectedIndex > -1) {
      setSelectedTickets(selectedTickets.filter((id) => id !== taskId));
    } else {
      setSelectedTickets([...selectedTickets, taskId]);
    }
  };

  const handleDeleteSelected = () => {
    if(selectedTickets.length>1){
      deleteMultiple()
    }else{
      deleteTicket();
    }
  };

  const handleEditSelected = () => {
    if (selectedTickets.length === 1) {
      setCreateMode(true);
      const selectedTask = tickets.find((ticket) => ticket.id === selectedTickets[0]);
      setFormData(selectedTask);
    }
  };

  const resetFormData = () => {
    setFormData({
        id: '',
        customer: {
            id:''
        },
        subject:'',
        description: '',
        status:'',
        assignedTo: {
            id:''
        }
    });
  };

  const handleViewSelected = () => {
    if (selectedTickets.length === 1) {
      const selectedTask = tickets.find((task) => task.id === selectedTickets[0]);
      console.log("selectedTask")
      console.log(selectedTask)
      setViewTickets(selectedTask);
    }
  };

  const handleViewClose = () => {
    setViewTickets(null);
  };

  return (
    <div>
      <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Tickets</h2>
          <div>
            {!createMode && (
              <button className="btn btn-primary" onClick={handleCreateClick} disabled={selectedTickets.length>0}>
                Create
              </button>
            )}
          </div>
        </div>
        {createMode ? (
          <div>
            <button className="btn btn-primary mb-3" onClick={handleBackClick}>
              Back
            </button>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="customer">Customer ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="customer"
                  name="customer"
                  value={formData.customer.id}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  className="form-control"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  required  
                >
                  <option value="" disabled>-- Select Status --</option>
                  <option value="OPEN">OPEN</option>
                  <option value="ASSIGNED">ASSIGNED</option>
                  <option value="RESOLVED">RESOLVED</option>
                  <option value="REOPENED">REOPENED</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="assignedTo">Assigned to</label>
                <input
                  type="text"
                  className="form-control"
                  id="assignedTo"
                  name="assignedTo"
                  disabled={formData.status==="OPEN"||formData.status==="REOPENED"}
                  value={formData.assignedTo!==null?formData.assignedTo.id:''}
                  onChange={handleFormChange}
                  required={formData.status==="ASSIGNED"||formData.status==="RESOLVED"}
                />
              </div>
              
              <button type="submit" className="btn btn-primary">
                {selectedTickets.length===1 ? 'Update' : 'Create'}
              </button>
            </form>
          </div>
        ) : viewTickets ? (
          <div className="view-overlay">
            <div className="view-content">
              <button className="btn btn-primary mb-3" onClick={handleViewClose}>
                Close
              </button>
              <div>
                <h3>Ticket Details</h3>
                <p>ID: {viewTickets.id}</p>
                Customer:<p style={{border: '2px solid grey', borderRadius:'10px', padding: '10px',margin:'15px'}}> 
                    <p>ID: {viewTickets.customer.id}</p>
                    <p>Name: {viewTickets.customer.name}</p>
                    <p>Email ID: {viewTickets.customer.email}</p>
                    <p>Phone: {viewTickets.customer.phone}</p>
                    <p>Address: {viewTickets.customer.address}</p>
                </p>
                <p>Name: {viewTickets.subject}</p>
                <p>Desc: {viewTickets.description}</p>
                Assigned to:{viewTickets.assignedTo==null?<p>N/A</p>:
                <p style={{border: '2px solid grey', borderRadius:'10px', padding: '10px',margin:'15px'}}> 
                    <p>ID: {viewTickets.assignedTo.id}</p>
                    <p>Name: {viewTickets.assignedTo.name}</p>
                    <p>Email ID: {viewTickets.assignedTo.email}</p>
                </p>}
                <p>Created At: {format(new Date(viewTickets.createdAt),'dd-MM-yyyy')}</p>
                <p>Updated At: {format(new Date(viewTickets.updatedAt),'dd-MM-yyyy')}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-3">
              {selectedTickets.length > 0 && (
                <div className="dropdown d-inline-block">
                  <div className="btn-group dropdown">
                    <button
                      className="btn btn-primary dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Actions
                    </button>
                    <div className="dropdown-menu">
                      <button className="dropdown-item" onClick={handleDeleteSelected}>
                        Delete
                      </button>
                      {(selectedTickets.length===1)&&<button className="dropdown-item" onClick={handleEditSelected}>
                        Edit
                      </button>}
                      {(selectedTickets.length===1)&&<button className="dropdown-item" onClick={handleViewSelected}>
                        View
                      </button>}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div style={{overflowY: 'scroll', maxHeight:'500px'}}>
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedTickets.length === tickets.length}
                      onChange={() => {
                        if (selectedTickets.length === tickets.length) {
                          setSelectedTickets([]);
                        } else {
                          const allTicketIds = tickets.map((ticket) => ticket.id);
                          setSelectedTickets(allTicketIds);
                        }
                      }}
                    />
                  </th>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>AssignedTo</th>
                  <th>Created At</th>
                  <th>Updated at</th>
                </tr>
              </thead>
              <tbody>
                {tickets
                  .filter((ticket) => {
                    const { id, customer, subject, status } = ticket;
                    const search = searchQuery.toLowerCase();
                    return (
                      id.toString().toLowerCase().includes(search) ||
                      customer.toString().toLowerCase().includes(search) ||
                      subject.toLowerCase().includes(search)||
                      status.toLowerCase().includes(search)
                    );
                  })
                  .map((ticket) => (
                    <tr key={ticket.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedTickets.includes(ticket.id)}
                          onChange={() => handleCheckboxChange(ticket.id)}
                        />
                      </td>
                      <td>{ticket.id}</td>
                      <td>{ticket.customer.id}</td>
                      <td>{ticket.subject}</td>
                      <td>{ticket.status}</td>
                      {ticket.assignedTo!==null?<td>{ticket.assignedTo.id}</td>:<td>NA</td>}
                      <td>{format(new Date(ticket.createdAt),'dd-MM-yyyy')}</td>
                      {ticket.updatedAt!==null?<td>{ticket.updatedAt.slice(11,16)} - {format(new Date(ticket.updatedAt),'dd-MM-yyyy')}</td>
                      :<td>NA</td>}
                    </tr>
                  ))}
              </tbody>
            </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}