import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/NavBar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Opportunities.css';

const OPPORTUNITY_BASE_REST_API_URL = "http://localhost:8080/crm/opportunity";
const CUSTOMER_BASE_REST_API_URL = "http://localhost:8080/crm/customer";

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [createMode, setCreateMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    customer: '',
    status: '',
    value: '',
    closeDate: new Date(),
    notes: '',
  });
  const [selectedOpportunities, setSelectedOpportunities] = useState([]);
  const [viewOpportunity, setViewOpportunity] = useState(null);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedCustomerDetails, setSelectedCustomerDetails] = useState(null);


  useEffect(() => {
    getAllOpportunities();
    getAllCustomers();
  },[]);  
  
  useEffect(() => {
    if(formData.status==null&&formData.customer!==''){
        console.log("updating opportunity")
        updateOpportunity();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[formData]);  

  const getAllCustomers = async () => {
    try {
      const response = await axios.get(CUSTOMER_BASE_REST_API_URL);
      setCustomerOptions(response.data.map((customer) => ({ id: customer.id, name: customer.name })));
    } catch (error) {
      console.log('Error retrieving customers:', error);
    }
  };

  const getAllOpportunities = async () => {
    try {
      const response = await axios.get(OPPORTUNITY_BASE_REST_API_URL);
      setOpportunities(response.data);
    } catch (error) {
      console.log('Error retrieving opportunities:', error);
    }
  };

  const createOpportunity = async (formData) => {
    try {
      const selectedCustomer = customerOptions.find(
        (customer) => customer.id === parseInt(formData.customer)
      );

      const newOpportunity = {
        ...formData,
        customer: selectedCustomer ? { id: selectedCustomer.id } : null,
      };

      // eslint-disable-next-line no-unused-vars
      const response=await axios.post(OPPORTUNITY_BASE_REST_API_URL, newOpportunity);
      getAllOpportunities();
      setCreateMode(false);
      resetFormData();
      if ((!selectedCustomer || formData.customer === 'N/A')&&formData.status==="CLOSED_WIN" ) {
        setShowCustomerForm(true);
      }
    } catch (error) {
      console.log('Error creating opportunity:', error);
    }
  };
  
  

  const updateOpportunity = async () => {
    try {
      const opportunityId = selectedOpportunities[0];
      await axios.put(`${OPPORTUNITY_BASE_REST_API_URL}/${opportunityId}`, formData);
      getAllOpportunities();
      setCreateMode(false);
      resetFormData();
      setSelectedOpportunities([]);
    } catch (error) {
      console.log('Error updating opportunity:', error);
    }
  };

  const deleteOpportunity = async () => {
    try {
      for (const opportunityId of selectedOpportunities) {
        await axios.delete(`${OPPORTUNITY_BASE_REST_API_URL}/${opportunityId}`);
      }
      getAllOpportunities();
      setSelectedOpportunities([]);
    } catch (error) {
      console.log('Error deleting opportunity:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === 'customer') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleCreateClick = () => {
    setCreateMode(true);
    resetFormData();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (createMode) {
      createOpportunity(formData);
    } else if (selectedOpportunities.length === 1) {
      updateOpportunity();
    }
  };

  const handleDateChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      closeDate: date || null,
    }));
  };

  const handleBackClick = () => {
    setCreateMode(false);
    resetFormData();
    // Set customer ID to "N/A" when going back from the create opportunity form
    setFormData((prevFormData) => ({
      ...prevFormData,
      customer: 'N/A',
    }));
  };
  
  

  const handleCheckboxChange = (opportunityId) => {
    setSelectedOpportunities((prevSelectedOpportunities) => {
      if (prevSelectedOpportunities.includes(opportunityId)) {
        return prevSelectedOpportunities.filter((id) => id !== opportunityId);
      } else {
        return [...prevSelectedOpportunities, opportunityId];
      }
    });
  };

  const handleDeleteSelected = () => {
    deleteOpportunity();
  };

  const handleEditSelected = () => {
    if (selectedOpportunities.length === 1) {
      setCreateMode(true);
      const selectedOpportunity = opportunities.find((opp) => opp.id === selectedOpportunities[0]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...selectedOpportunity,
        customer: selectedOpportunity.customer?.id.toString() || '',
      }));
    }
    
  };

  const resetFormData = () => {
    setFormData({
      id: '',
      name: '',
      customer: '',
      status: '',
      value: '',
      closeDate: new Date(),
      notes: '',
    });
  };

  const handleViewSelected = async () => {
    if (selectedOpportunities.length === 1) {
      const selectedOpportunity = opportunities.find((opp) => opp.id === selectedOpportunities[0]);
      setViewOpportunity(selectedOpportunity);
      setSelectedOpportunities([]);
  
      // Check if there is a customer associated with the opportunity
      if (selectedOpportunity.customer && selectedOpportunity.customer.id) {
        try {
          const customerId = selectedOpportunity.customer.id;
          const response = await axios.get(`${CUSTOMER_BASE_REST_API_URL}/${customerId}`);
          setSelectedCustomerDetails(response.data);
        } catch (error) {
          console.log('Error retrieving customer details:', error);
          setSelectedCustomerDetails(null); // Reset customer details in case of an error
        }
      } else {
        setSelectedCustomerDetails(null);
      }
    }
  };
  
  

  const handleViewClose = () => {
    setViewOpportunity(null);
  };

  const handleCreateCustomerFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const customerData = {
      name: data.get('customerName'),
      email: data.get('customerEmail'),
      phone: data.get('customerPhone'),
      address: data.get('customerAddress'),
    };
    try {
      const response = await axios.post(CUSTOMER_BASE_REST_API_URL, customerData);
      const newCustomer = { id: response.data.id, name: customerData.name };
      setCustomerOptions((prevOptions) => [...prevOptions, newCustomer]);
  
      // Update opportunity's customer ID with the newly created customer's ID
      setFormData(
        {customer: {id:newCustomer.id.toString()}}
      );
      setShowCustomerForm(false);
    } catch (error) {
      console.log('Error creating customer:', error);
    }
  };
  

  return (
    <div>
      <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Opportunities</h2>
          <div>
            {!createMode && (
              <button className="btn btn-primary" onClick={handleCreateClick} disabled={selectedOpportunities.length===1}>
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
                <label htmlFor="customer">Customer</label>
                <input
                  type="text"
                  className="form-control"
                  id="customer"
                  name="customer"
                  value={formData.customer || ''}
                  onChange={handleFormChange}
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
                >
                  <option value="">-- Select Status --</option>
                  <option value="OPEN">OPEN</option>
                  <option value="NEED_ANALYSIS">NEED_ANALYSIS</option>
                  <option value="PROPOSAL">PROPOSAL</option>
                  <option value="NEGOTIATION">NEGOTIATION</option>
                  <option value="UPSELL">UPSELL</option>
                  {selectedOpportunities.length===1&&<option value="CLOSED_WIN">CLOSED_WIN</option>}
                  {selectedOpportunities.length===1&&<option value="CLOSED_LOSS">CLOSED_LOSS</option>}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="value">Value</label>
                <input
                  type="text"
                  className="form-control"
                  id="value"
                  name="value"
                  value={formData.value}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="closeDate">Close Date</label>
                <br />
                <DatePicker
                  className="form-control"
                  id="closeDate"
                  name="closeDate"
                  placeholderText="MM/DD/YYYY"
                  selected={formData.closeDate ? new Date(formData.closeDate) : null}
                  onChange={handleDateChange}
                  dateFormat="MM/dd/yyyy"
                />
              </div>
              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea
                  className="form-control"
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleFormChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                {createMode ? 'Create' : 'Update'}
              </button>
            </form>
          </div>
         ) : viewOpportunity ? (
          
            <div className="view-overlay">
              <div className="view-content">
                <button className="btn btn-primary mb-3" onClick={handleViewClose}>
                  Close
                </button>
                <div>
                  <h3>Opportunity Details</h3>
                  <p>ID: {viewOpportunity.id}</p>
                  <p>Name: {viewOpportunity.name}</p>
                  <p>Customer ID: {viewOpportunity.customer && viewOpportunity.customer.id ? viewOpportunity.customer.id : 'N/A'}</p>
                  {viewOpportunity.customer && viewOpportunity.customer.id && (
                  <>
                  <p className="customer-details-label">Customer Name: {viewOpportunity.customer.name}</p>
                  <p className="customer-details-label">Customer Email: {viewOpportunity.customer.email}</p>
                  <p className="customer-details-label">Customer Phone: {viewOpportunity.customer.phone}</p>
                  <p className="customer-details-label">Customer Address: {viewOpportunity.customer.address}</p>
                  </>
                  )}
                  <p>Status: {viewOpportunity.status}</p>
                  <p>Close Date: {viewOpportunity.closeDate ? new Date(viewOpportunity.closeDate).toLocaleDateString('en-US') : 'N/A'}</p>
                  <p>Notes: {viewOpportunity.notes}</p>  
                </div>
              </div>
            </div>
          ) : (
          
          
          <div>
            <div className="mb-3">
              {selectedOpportunities.length > 0 && (
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
                      {selectedOpportunities.length===1&&<button className="dropdown-item" onClick={handleEditSelected}>
                        Edit
                      </button>}
                      {selectedOpportunities.length===1&&<button className="dropdown-item" onClick={handleViewSelected}>
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
                      checked={selectedOpportunities.length === opportunities.length}
                      onChange={() => {
                        if (selectedOpportunities.length === opportunities.length) {
                          setSelectedOpportunities([]);
                        } else {
                          const allOpportunityIds = opportunities.map((opp) => opp.id);
                          setSelectedOpportunities(allOpportunityIds);
                        }
                      }}
                    />
                  </th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Customer ID</th>
                  <th>Status</th>
                  <th>Value</th>
                  <th>Close Date</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {opportunities
                  .filter((opp) => {
                    const { id, customer, status } = opp;
                    const search = searchQuery.toLowerCase();
                    return (
                      id.toString().toLowerCase().includes(search) ||
                      (customer && customer.id.toString().toLowerCase().includes(search)) ||
                      status.toLowerCase().includes(search)
                    );
                  })
                  .map((opp) => (
                    <tr key={opp.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedOpportunities.includes(opp.id)}
                          onChange={() => handleCheckboxChange(opp.id)}
                        />
                      </td>
                      <td>{opp.id}</td>
                      <td>{opp.name}</td>
                      <td>{opp.customer && opp.customer.id ? opp.customer.id : 'N/A'}</td>
                      <td>{opp.status}</td>
                      <td>{opp.value}</td>
                      <td>{new Date(opp.closeDate).toLocaleDateString('en-US')}</td>
                      <td>{opp.notes}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            </div>
          
      {showCustomerForm && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>Create Customer</h3>
            <form onSubmit={handleCreateCustomerFormSubmit}>
              <div className="form-group">
                <label htmlFor="customerName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="customerName"
                  name="customerName"
                  value={(opportunities.filter((opportunity)=>opportunity.id===selectedOpportunities[0]))[0].name}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="customerEmail"
                  name="customerEmail"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerPhone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="customerPhone"
                  name="customerPhone"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerAddress">Address</label>
                <textarea
                  className="form-control"
                  id="customerAddress"
                  name="customerAddress"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>

              <button
                className="btn btn-primary mt-3 ms-2"
                onClick={() => setShowCustomerForm(false)}
              >
                Back
              </button>
            </form>
            </div>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);
}