// App.js - FIXED VERSION
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';
import HomePage from './components/HomePage';
import About from './components/About';
import ContactUs from './components/Contactus';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import StartFreeTrial from './components/StartFreeTrial';
import FloatingChatbot from './components/FloatingChatbot';
import PaymentComponent from './components/PaymentComponent';
import EmployeeChatBox from './components/EmployeeChatBox';
import HrDashboard from './components/HrDashboard';
import EmpDashboard from './components/EmpDashboard';

// Helper function to check if user is logged in
const isLoggedIn = () => {
  // Replace this with your actual authentication logic
  // For example: return localStorage.getItem('authToken') !== null;
  // or check your authentication context/state
  return localStorage.getItem('isLoggedIn') === 'true';
};

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/login' element={<LoginComponent />} />
            <Route path='/register' element={<RegisterComponent />} />
            <Route path='/freetrial' element={<StartFreeTrial />} />
            <Route path='/chatbox' element={< EmployeeChatBox /> } />
            <Route path='/profile' element={< EmpDashboard />} />
            
            <Route path='/payment' element={< PaymentComponent />} />
            
            {/* <Route path="/employee" element={isLoggedIn() ? <ListEmployeeComponent /> : <Navigate to="/login" />} /> */}
            
            <Route path='/employee' element={<ListEmployeeComponent />} />

            <Route path='/peformence' element={<HrDashboard />} />

            {/* <Route 
              path="/employees" 
              element={isLoggedIn() ? <ListEmployeeComponent /> : <Navigate to="/login" />} 
            /> */}
            <Route 
              path="/add-employee" 
              element={isLoggedIn() ? <AddEmployeeComponent /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/edit-employee/:id" 
              element={isLoggedIn() ? <AddEmployeeComponent /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
        <FooterComponent />
        
      </Router>
      <FloatingChatbot />
    </div>
  );
}

export default App;