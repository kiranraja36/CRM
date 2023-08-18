import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';

const Navbar = ({ name, searchQuery, onSearchChange }) => {
  const [todayTasks, setTodayTasks] = useState([]);
  const [todayTickets, setTodayTickets] = useState([]);
  const [tasks, setTasks]=useState(true);
  const TICKET_BASE_REST_API_URL = 'http://localhost:8080/crm/ticket';
  const TASK_BASE_REST_API_URL = 'http://localhost:8080/crm/task';

  useEffect(()=>{
    getAllTasks();
    getAllTickets();
  },[tasks])

  useEffect(()=>{
    console.log(todayTasks);
  },[todayTasks])

  const getAllTasks = async () => {
    try {
      const response = await axios.get(TASK_BASE_REST_API_URL);
      setTodayTasks(response.data.filter((task)=>task.dueDate.slice(0,10)===new Date().toISOString().slice(0,10)));
    } catch (error) {
      console.log('Error retrieving tasks:', error);
    }
  };

  const getAllTickets = async () => {
    try {
      const response = await axios.get(TICKET_BASE_REST_API_URL);
      setTodayTickets(response.data.filter((ticket)=>ticket.status==="OPEN"));
    } catch (error) {
      console.log('Error retrieving tickets:', error);
    }
  };

  const taskClicked = () => {
    setTasks(true);
  }

  const ticketClicked = () => {
    setTasks(false);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">{name} DASHBOARD</a>
        <form className="form-inline">
          <div className="input-group">
            <DropdownButton  title={<FontAwesomeIcon icon={faBell}/>} drop="down-centered">
              <div className="notif-container">
                <div style={{ width:'100%',display:'flex', flexDirection:'row'}}>
                  <div className={`notif-category ${tasks?'active':''}`} onClick={taskClicked}>Tasks due</div>
                  <div className={`notif-category ${tasks?'':'active'}`}onClick={ticketClicked}>Tickets unassigned</div>
                </div>
                {tasks===true?(todayTasks.length>0)?(
                  <div style={{width:'100%'}}>
                    <table>
                      <thead>
                        <tr>
                        <th>ID</th>
                        <th>Task Name</th>
                        <th>Assigned to</th>
                        </tr>
                      </thead>
                      <tbody>
                        {todayTasks.map((task)=>
                          <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.name}</td>
                            <td>{task.assignedTo.id}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                ):(<div className='no-data-div'>No data</div>):(todayTickets.length>0)?<div style={{width:'100%'}}>
                  <table>
                      <thead>
                        <tr>
                        <th>ID</th>
                        <th>Ticket Subject</th>
                        <th>Customer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {todayTickets.map((ticket)=>
                          <tr key={ticket.id}>
                            <td>{ticket.id}</td>
                            <td>{ticket.subject}</td>
                            <td>{ticket.customer.id}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>:<div className='no-data-div'>No data</div>}
              </div>
            </DropdownButton>
            <input
              className="form-control"
              type="search"
              placeholder="Type here to search"
              aria-label="Search"
              value={searchQuery}
              onChange={onSearchChange}
              style={{ width: '444px', marginRight: '5px', marginLeft: '5px',borderRadius:'4px' }}
            />
            
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;