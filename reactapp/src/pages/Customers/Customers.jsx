import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/NavBar/Navbar';
import './Customers.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate} from 'react-router-dom';


const CUSTOMER_URL = 'http://localhost:8080/crm/customer';
const SMS_URL='http://localhost:8080/sms';
export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [createMode, setCreateMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [viewCustomer, setViewCustomer] = useState(null);

  useEffect(() => {
    getAllCustomers();
  }, []);

  const getAllCustomers = async () => {
    try {
      const response = await axios.get(CUSTOMER_URL);
      setCustomers(response.data);
    } catch (error) {
      console.log('Error retrieving customers:', error);
    }
  };

  const createCustomer = async () => {
    try {
      await axios.post(CUSTOMER_URL, formData);
      getAllCustomers();
      setCreateMode(false);
      resetFormData();
    } 
    catch (error) {
      console.log('Error creating customer:', error);
    }
  };

  const updateCustomer = async () => {
    try {
      const customerId = selectedCustomers[0];
      await axios.put(`${CUSTOMER_URL}/${customerId}`, formData);
      getAllCustomers();
      setCreateMode(false);
      resetFormData();
    } 
    catch (error) {
      console.log('Error updating customer:', error);
    }
  };

  const deleteCustomer = async () => {
    try {
      await axios.delete(`${CUSTOMER_URL}/${selectedCustomers[0]}`);
      getAllCustomers();
      setSelectedCustomers([]);
    } 
    catch (error) {
      console.log('Error deleting customer:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFormChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value,});
  };

  const handleCreateClick = () => {
    setCreateMode(true);
    resetFormData();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (selectedCustomers.length === 1) {
      updateCustomer();
    } 
    else {
      createCustomer();
    }
  };

  const handleBackClick = () => {
    setCreateMode(false);
    resetFormData();
  };

  const handleCheckboxChange = (customerId) => {
    const selectedIndex = selectedCustomers.indexOf(customerId);
    if (selectedIndex > -1) {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  const handleDeleteSelected = () => {
    deleteCustomer();
  };

  const handleEditSelected = () => {
    if (selectedCustomers.length === 1) {
      setCreateMode(true);
      const selectedCustomer = customers.find((customer) => customer.id === selectedCustomers[0]);
      setFormData(selectedCustomer);
    }
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: ''
    });
  };

  const handleViewSelected = () => {
    if (selectedCustomers.length === 1) {
      const selectedCustomer = customers.find((customer) => customer.id === selectedCustomers[0]);
      setViewCustomer(selectedCustomer);
    }
  };

  const handleViewClose = () => {
    setViewCustomer(null);
  };
  
  const smsToCustomer = async (selectedCustomer) => {
    try {
      await axios.post(SMS_URL,selectedCustomer);
      setSelectedCustomers([]);
    } catch (error) {
      console.log('Error sending phone no to customer:', error);
    }
  };
  const handleSmsSelected = () => {
    if (selectedCustomers.length === 1) {
      const selectedCustomer = customers.find((customer) => customer.id === selectedCustomers[0]);
      smsToCustomer(selectedCustomer);
      navigate("/sms")
    }
  };


  return (
    <div>
      <Navbar name="CUSTOMERS" searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center">
        <h2>Customers</h2>
          <div>
            {!createMode && (
              <button className="btn btn-primary" onClick={handleCreateClick}>
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
              {/* Customer form inputs */}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                />
                </div>
                <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                />
                </div>
              <button type="submit" className="btn btn-primary">
                {createMode ? 'Create' : 'Update'}
              </button>
            </form>
          </div>
        ) : viewCustomer ? (
          <div className="view-overlay">
            <div className="view-content">
              <button className="btn btn-primary mb-3" onClick={handleViewClose}>
                Close
              </button>
              <div className="view-scroll">
                <h3>Customer Details</h3>
                <p>ID: {viewCustomer.id}</p>
                <p>Name: {viewCustomer.name}</p>
                <p>Email: {viewCustomer.email}</p>
                <p>Phone: {viewCustomer.phone}</p>
                <p>Address: {viewCustomer.address}</p>
                <div className="card mt-4">
                  <div className="card-header">
                    <h4>Communication History</h4>
                  </div>
                  <div className="card-body">
                    {viewCustomer.communicationHistory.length > 0 ? (
                    <ul className="list-group">
                      {viewCustomer.communicationHistory.map((communicationHistory) => (
                      <li className="list-group-item" key={communicationHistory.id}>
                        <b>Id:</b> {communicationHistory.id}
                        <br />
                        <b>Subject:</b> {communicationHistory.subject}
                        <br />
                        <b>Description:</b> {communicationHistory.description}
                        <br />
                        <b>Assigned To:</b>{" "}
                          {communicationHistory.assignedTo ? (communicationHistory.assignedTo.name) : (
                          <span>No assigned users</span>
                        )}
                        <br />
                        <b>Status:</b> {communicationHistory.status}
                        <br />
                        <b>Created At:</b> {communicationHistory.createdAt}
                        <br />
                        <b>Updated At:</b> {communicationHistory.updatedAt}
                      </li>
                      ))}
                    </ul>
                    ) : (
                    <span>No communication history</span>
                    )}
                  </div>
                </div>
                <div className="card mt-4">
                  <div className="card-header">
                    <h4>Purchase History</h4>
                  </div>
                  <div className="card-body">
                    {viewCustomer.purchaseHistory.length > 0 ? (
                    <ul className="list-group">
                      {viewCustomer.purchaseHistory.map((purchase) => (
                      <li className="list-group-item" key={purchase.id}>
                        <b>Id:</b> {purchase.id}
                        <br />
                        <b>Name:</b> {purchase.name}
                        <br />
                        <b>Amount:</b> {purchase.amount}
                        <br />
                        <b>Date:</b> {purchase.date}
                        <br />
                        <b>Notes:</b> {purchase.notes}
                      </li>
                      ))}
                    </ul>
                    ) : (
                    <span>No purchase history</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-3">
              {selectedCustomers.length > 0 && (
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
                      <button className="dropdown-item" onClick={handleEditSelected}>
                        Edit
                      </button>
                      <button className="dropdown-item" onClick={handleViewSelected}>
                        View
                      </button>
                      <button className="dropdown-item" onClick={handleSmsSelected}>
                        sms
                      </button>

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
                      checked={selectedCustomers.length === customers.length}
                      onChange={() => {
                        if (selectedCustomers.length === customers.length) {
                          setSelectedCustomers([]);
                        } 
                        else {
                          const allCustomerIds = customers.map((customer) => customer.id);
                          setSelectedCustomers(allCustomerIds);
                        }
                      }}
                    />
                  </th>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {customers
                  .filter((customer) => {
                    const { id, name, email } = customer;
                    const search = searchQuery.toLowerCase();
                    return (
                      id.toString().toLowerCase().includes(search) ||
                      name.toLowerCase().includes(search) ||
                      email.toLowerCase().includes(search)
                    );
                  })
                  .map((customer) => (
                    <tr key={customer.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedCustomers.includes(customer.id)}
                          onChange={() => handleCheckboxChange(customer.id)}
                        />
                      </td>
                      <td>{customer.id}</td>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.address}</td>
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
