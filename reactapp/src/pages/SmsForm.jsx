import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

//import './SmsForm.css'

function SmsForm() {
  const [message, setMessage] = useState('');
  const [isSmsSent, setIsSmsSent] = useState(false);
  const sendSMS = () => {
   axios.post(`http://localhost:8080/smsapi`, {
      
      message: message
    })
    .then(response => {
      console.log(response.data);
      // Handle success
    })
    .catch(error => {
      console.error(error);
      // Handle error
    });
    setIsSmsSent(true);
    notifySmsSent();
  };
  const notifySmsSent = () => {
    toast.success('SMS sent successfully!', {
      position: 'bottom-right',
      autoClose: 3000, // Notification will automatically close after 3 seconds
      hideProgressBar: true,
    });
  };

  return (
    <div className="containers">
    <h1>Send SMS</h1>
   
   
    <div className="form-group">
      <label>Message:</label>
      <input
        type="text"
        className="form-control"
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
    </div>
    <button className="btn btn-primary" onClick={sendSMS}> Send SMS </button>
      {isSmsSent && <p>SMS sent successfully!</p>}
      <ToastContainer />
      <br></br>


      <Link className="btn btn-primary"to={"/customers"}>Back To Customer</Link>
    

    <br/>
   
  </div>
  );
}

export default SmsForm;
