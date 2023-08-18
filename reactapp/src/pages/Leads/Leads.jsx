import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/NavBar/Navbar';
import './LeadPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



const LEAD_BASE_REST_API_URL = 'http://localhost:8080/crm/lead';

export default function LeadPage() {
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [createMode, setCreateMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    source: '',
    status: '',
    notes: '',
  });
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [viewLead, setViewLead] = useState(null);

  useEffect(() => {
    getAllLeads();
  }, []);

  const getAllLeads = async () => {
    try {
      const response = await axios.get(LEAD_BASE_REST_API_URL);
      setLeads(response.data);
    } catch (error) {
      console.log('Error retrieving leads:', error);
    }
  };

  const createLead = async () => {
    try {
      await axios.post(LEAD_BASE_REST_API_URL, formData);
      getAllLeads();
      setCreateMode(false);
      resetFormData();
    } catch (error) {
      console.log('Error creating lead:', error);
    }
  };

  const updateLead = async () => {
    try {
      const leadId = selectedLeads[0];
      await axios.put(`${LEAD_BASE_REST_API_URL}/${leadId}`, formData);
      getAllLeads();
      setCreateMode(false);
      resetFormData();
    } catch (error) {
      console.log('Error updating lead:', error);
    }
  };

  const deleteLead = async () => {
    try {
      await axios.delete(`${LEAD_BASE_REST_API_URL}/${selectedLeads[0]}`);
      getAllLeads();
      setSelectedLeads([]);
    } catch (error) {
      console.log('Error deleting lead:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateClick = () => {
    setCreateMode(true);
    resetFormData();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (selectedLeads.length === 1) {
      updateLead();
    } else {
      createLead();
    }
  };

  const handleBackClick = () => {
    setCreateMode(false);
    resetFormData();
  };

  const handleCheckboxChange = (leadId) => {
    const selectedIndex = selectedLeads.indexOf(leadId);
    if (selectedIndex > -1) {
      // Lead already selected, remove from the list
      setSelectedLeads(selectedLeads.filter((id) => id !== leadId));
    } else {
      // Lead not selected, add to the list
      setSelectedLeads([...selectedLeads, leadId]);
    }
  };

  const handleDeleteSelected = () => {
    deleteLead();
  };

  const handleEditSelected = () => {
    if (selectedLeads.length === 1) {
      setCreateMode(true);
      const selectedLead = leads.find((lead) => lead.id === selectedLeads[0]);
      setFormData(selectedLead);
    }
  };

  const resetFormData = () => {
    setFormData({
      id: '',
      name: '',
      email: '',
      phone: '',
      source: '',
      status: '',
      notes: '',
    });
  };

  const handleViewSelected = () => {
    if (selectedLeads.length === 1) {
      const selectedLead = leads.find((lead) => lead.id === selectedLeads[0]);
      setViewLead(selectedLead);
    }
  };

  const handleViewClose = () => {
    setViewLead(null);
  };

  return (
    <div>
      <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Leads</h2>
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
              {/* Lead form inputs */}
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
                <label htmlFor="source">Source</label>
                <select
                  className="form-control"
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleFormChange}
                >
                  <option value="">-- Select Source --</option>
                  <option value="Search Engine">Search Engine</option>
                  <option value="Links from other websites">Links from other websites</option>
                  <option value="Listing Websites">Listing Websites</option>
                  <option value="Cold Calls">Cold Calls</option>
                  <option value="Direct Mails">Direct Mails</option>
                  <option value="Advertisements">Advertisements</option>
                  <option value="Events">Events</option>
                  <option value="Referrals">Referrals</option>
                  <option value="Social Media">Social Media</option>
                </select>
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
                  <option value="CONTACT">CONTACT</option>
                  <option value="QUALIFIED">QUALIFIED</option>
                  <option value="DISQUALIFIED">DISQUALIFIED</option>
                </select>
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
        ) : viewLead ? (
          <div className="view-overlay">
            <div className="view-content">
              <button className="btn btn-primary mb-3" onClick={handleViewClose}>
                Close
              </button>
              <div>
                <h3>Lead Details</h3>
                <p>ID: {viewLead.id}</p>
                <p>Name: {viewLead.name}</p>
                <p>Email: {viewLead.email}</p>
                <p>Phone: {viewLead.phone}</p>
                <p>Source: {viewLead.source}</p>
                <p>Status: {viewLead.status}</p>
                <p>Notes: {viewLead.notes}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-3">
              {selectedLeads.length > 0 && (
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
                      checked={selectedLeads.length === leads.length}
                      onChange={() => {
                        if (selectedLeads.length === leads.length) {
                          setSelectedLeads([]);
                        } else {
                          const allLeadIds = leads.map((lead) => lead.id);
                          setSelectedLeads(allLeadIds);
                        }
                      }}
                    />
                  </th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {leads
                  .filter((lead) => {
                    const { id, name, status } = lead;
                    const search = searchQuery.toLowerCase();
                    return (
                      id.toString().toLowerCase().includes(search) ||
                      name.toLowerCase().includes(search) ||
                      status.toLowerCase().includes(search)
                    );
                  })
                  .map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedLeads.includes(lead.id)}
                          onChange={() => handleCheckboxChange(lead.id)}
                        />
                      </td>
                      <td>{lead.id}</td>
                      <td>{lead.name}</td>
                      <td>{lead.email}</td>
                      <td>{lead.phone}</td>
                      <td>{lead.source}</td>
                      <td>{lead.status}</td>
                      <td>{lead.notes}</td>
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