import React, { useState , useEffect} from 'react';
import axios from "axios";
import Navbar from '../../components/NavBar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../Tasks/Tasks.css'

const SALES_URL="http://localhost:8080/crm/sale"

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [createMode, setCreateMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    customer:{
      id:''
    },
    opportunity: {
      id:''
    },
    amount: '',
    notes: '',
  });
  const [selectedSales, setSelectedSales] = useState([]);
  const [viewSale , setViewSale] = useState(null);

  useEffect(() => {
    getallsales()
  },[]);

const getallsales = async() =>{
  try {
    const response = await axios.get(SALES_URL);
    setSales(response.data);
  } catch (error) {
    console.log('Error retrieving Sales:', error);
  }
}

const createSale = async () => {
  try {
    await axios.post(SALES_URL, formData);
    getallsales();
    setCreateMode(false);
    resetFormData();
  } catch (error) {
    console.log('Error creating sale:', error);
  }
};

const updateSale = async () => {
  try {
    const saleId = selectedSales[0];
    await axios.put(`${SALES_URL}/${saleId}`, formData);
    getallsales();
    setCreateMode(false);
    resetFormData();
  } catch (error) {
    console.log('Error updating sale:', error);
  }
};

const deleteSale = async () => {
  try {
    await axios.delete(`${SALES_URL}/${selectedSales[0]}`);
    getallsales();
    setSelectedSales([]);
  } catch (error) {
    console.log('Error deleting sale:', error);
  }
};

const deleteSales = async () => {
  try {
    for(let id of selectedSales){
      await axios.delete(`${SALES_URL}/${id}`);
    }
    getallsales();
    setSelectedSales([]);
  } catch (error) {
    console.log('Error deleting sales:', error);
  }
};

const handleSearchChange = (e) => {
  setSearchQuery(e.target.value);
};

const handleFormChange = (e) => {
  if(e.target.name==='customer_id'){
    setFormData({
      ...formData,
      customer:{
        id:e.target.value
      }
    })
  }else if(e.target.name==='opportunity_id'){
    setFormData({
      ...formData,
      opportunity:{
        id:e.target.value
      }
    })
  }else(
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  }));
  
};

const handleCreateClick = () => {
  setCreateMode(true);
  resetFormData();
};

const resetFormData=()=>{
  setFormData({
    id: '',
    name: '',
    customer: {
      id:''
    },
    opportunity: {
      id:''
    },
    amount: '',
    notes: '',
  });
}

const handleFormSubmit = (e) => {
  e.preventDefault();
    if (selectedSales.length === 1) {
      updateSale();
    } else {
      createSale();
    }
}

const handleBackClick = () => {
  setCreateMode(false);
};

const handleCheckboxChange = (saleId) => {
  const selectedIndex = selectedSales.indexOf(saleId);
  if (selectedIndex > -1) {
    // Lead already selected, remove from the list
    setSelectedSales(selectedSales.filter((id) => id !== saleId));
  } else {
    // Lead not selected, add to the list
    setSelectedSales([...selectedSales, saleId]);
  }
};

const handleDeleteSelected = async() => {
  if(selectedSales===1){
    deleteSale();
  }else{
    deleteSales();
  }
  
};


const handleEditSelected = async () => {
  
    if (selectedSales.length === 1) {
      setCreateMode(true);
      const selectedSale = sales.find((sale) => sale.id === selectedSales[0]);
      setFormData(selectedSale);
    }
}

const handleViewSelected = async() => {
  if (selectedSales.length === 1) {
    const selectedSale = sales.find((sale) => sale.id === selectedSales[0]);
    setViewSale(selectedSale);
  }
};

const handleViewClose = () => {
  setViewSale(null);
};

return (
  <div>
    <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Sales History</h2>
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
              <label htmlFor="name">Customer_id</label>
              <input
                type="text"
                className="form-control"
                id="customer_id"
                name="customer_id"
                value={formData.customer.id}
                onChange={handleFormChange}
                required
              />
            </div>
           
            <div className="form-group">
              <label htmlFor="opportunity_id">Opportunity_id</label>
              <input
                type="text"
                className="form-control"
                id="opportunity_id"
                name="opportunity_id"
                value={formData.opportunity.id}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                className="form-control"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleFormChange}
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
      ) : viewSale ? (
        <div className="view-overlay">
          <div className="view-content">
            <button className="btn btn-primary mb-3" onClick={handleViewClose}>
              Close
            </button>
            <div>
              <h3>Sale Details</h3>
              <p>ID: {viewSale.id}</p>
              <p>Name: {viewSale.name}</p>
              Customer:<p style={{border: '2px solid grey', borderRadius:'10px', padding: '10px',margin:'15px'}}> 
                    <p>ID: {viewSale.customer.id}</p>
                    <p>Name: {viewSale.customer.name}</p>
                    <p>Email ID: {viewSale.customer.email}</p>
                    <p>Phone: {viewSale.customer.phone}</p>
                    <p>Address: {viewSale.customer.address}</p>
                </p>
                Opportunity:<p style={{border: '2px solid grey', borderRadius:'10px', padding: '10px',margin:'15px'}}> 
                    <p>ID: {viewSale.opportunity.id}</p>
                    <p>Name: {viewSale.opportunity.name}</p>
                    <p>Status: {viewSale.opportunity.status}</p>
                    <p>Value: {viewSale.opportunity.value}</p>
                    <p>notes: {viewSale.opportunity.notes}</p>
                </p>
              <p>Amount: {viewSale.amount}</p>
              <p>Date: {viewSale.date}</p>
              <p>Notes: {viewSale.notes}</p>

            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Table displaying sales */}
         <div className="mb-3">
            {selectedSales.length > 0 && (
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
                    {selectedSales.length===1&&<button className="dropdown-item" onClick={handleEditSelected}>
                      Edit
                    </button>}
                    {selectedSales.length===1&&<button className="dropdown-item" onClick={handleViewSelected}>
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
                    checked={selectedSales.length === sales.length}
                    onChange={() => {
                      if (selectedSales.length === sales.length) {
                        setSelectedSales([]);
                      } else {
                        const allSaleIds = sales.map((sale) => sale.id);
                        setSelectedSales(allSaleIds);
                      }
                    }}
                  />
                </th>
                <th>ID</th>
                <th>Name</th>
                <th>Customer_id</th>
                <th>Opportunity_id</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {sales
                .filter((sale) => {
                  const { id, name, amount } = sale;
                  const search = searchQuery.toLowerCase();
                  return (
                    id.toString().toLowerCase().includes(search) ||
                    name.toLowerCase().includes(search) ||
                    amount.toLowerCase().includes(search)
                  );
                })
                .map((sale) => (
                  <tr key={sale.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedSales.includes(sale.id)}
                        onChange={() => handleCheckboxChange(sale.id)}
                      />
                    </td>
                    <td>{sale.id}</td>
                    <td>{sale.name}</td>
                    <td>{sale.customer.id ? sale.customer.id : 'N/A'}</td>
                    <td>{sale.opportunity.id?sale.opportunity.id:'N/A'}</td>
                    <td>{sale.date}</td>
                    <td>{sale.amount}</td>
                    <td>{sale.notes}</td>
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

