import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import autosize from 'autosize';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Email = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const textareaRef = useRef(null);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleAttachmentChange = (e) => {
    setAttachments([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('body', body);
    for (let i = 0; i < attachments.length; i++) {
      formData.append('attachments', attachments[i]);
    }

    axios
      .post('http://localhost:8080/crm/send', formData)
      .then((response) => {
        console.log(response.data); // Handle the response from the backend
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    setIsEmailSent(true);
    notifyEmailSent();
  };

  useEffect(() => {
    autosize(textareaRef.current); // Initialize autosize library on textarea
  }, []);

  const notifyEmailSent = () => {
    toast.success('Email sent successfully!', {
      position: 'bottom-right',
      autoClose: 3000, // Notification will automatically close after 3 seconds
      hideProgressBar: true,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          className="form-control"
          value={subject}
          onChange={handleSubjectChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="body">Compose email:</label>
        <textarea
          id="body"
          className="form-control"
          value={body}
          onChange={handleBodyChange}
          required
          ref={textareaRef}
        />
      </div>

      <div className="form-group">
        <label htmlFor="attachments">Attachments:</label>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="attachments"
            onChange={handleAttachmentChange}
            multiple
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary">Send Email</button>
      {isEmailSent}
      <ToastContainer />
    </form>
  );
};

export default Email;
