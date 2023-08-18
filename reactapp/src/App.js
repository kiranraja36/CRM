import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Customers from './pages/Customers/Customers';
import Sales from './pages/Sales/Sales';
import Analytics from './pages/Analytics/Analytics';
import Tasks from './pages/Tasks/Tasks';
import Tickets from './pages/Tickets/Tickets';
import SideBar from './components/SideBar';
import Emails from './pages/Emails/Email';
import Opportunities from './pages/Opportunities/Opportunities';
import Leads from './pages/Leads/Leads';
import SmsForm from './pages/SmsForm';


function App() {
 
  return (
 
   <Router>
    <SideBar>
    <Routes>
      <Route path="/" element={<Analytics/>}/> 
      <Route path="/customers" element={<Customers/>}/>
      <Route path="/sales" element={<Sales/>}/>
      <Route path="/tasks" element={<Tasks/>}/>
      <Route path="/tickets" element={<Tickets/>}/>
      <Route path="/emails" element={<Emails/>}/>
      <Route path="/opportunities" element={<Opportunities/>}/>
      <Route path="/leads" element={<Leads/>}/>
      <Route path="/sms" element={<SmsForm/>}/>
      <Route path="*" element={<>not found</>}/>
    </Routes>
    </SideBar>
   </Router>
  );
}

export default App;
