import React, { useState, useMemo } from 'react';
import './HrDashboard.css';
// import './NewFeatures.css'; // New CSS file for added features

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Ram',
      designation: 'Senior Developer',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      email: 'ram@techcorp.com',
      phone: '+91 9876543210',
      address: '123 Tech Street, Bangalore',
      joinDate: '2022-01-15',
      employeeId: 'TC001',
      department: 'Engineering',
      manager: 'Tech Lead',
      performance: [65, 75, 80, 85, 90, 88, 92],
      monthlyTasks: [
        { id: 1, task: 'Complete API Integration', status: 'completed', deadline: '2025-07-05' },
        { id: 2, task: 'Code Review for Module A', status: 'active', deadline: '2025-07-10' },
        { id: 3, task: 'Database Optimization', status: 'active', deadline: '2025-07-15' },
        { id: 4, task: 'Unit Testing Implementation', status: 'completed', deadline: '2025-07-08' },
        { id: 5, task: 'Performance Monitoring Setup', status: 'active', deadline: '2025-07-20' }
      ]
    },
    {
      id: 2,
      name: 'Shyam',
      designation: 'UI/UX Designer',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      email: 'shyam@techcorp.com',
      phone: '+91 9876543211',
      address: '456 Design Avenue, Mumbai',
      joinDate: '2022-03-20',
      employeeId: 'TC002',
      department: 'Design',
      manager: 'Design Head',
      performance: [70, 72, 78, 82, 85, 87, 89],
      monthlyTasks: [
        { id: 1, task: 'Design Dashboard Wireframes', status: 'completed', deadline: '2025-07-03' },
        { id: 2, task: 'Create User Flow Diagrams', status: 'active', deadline: '2025-07-12' },
        { id: 3, task: 'Prototype Mobile App', status: 'active', deadline: '2025-07-18' },
        { id: 4, task: 'Design System Updates', status: 'completed', deadline: '2025-07-06' },
        { id: 5, task: 'Client Presentation Design', status: 'active', deadline: '2025-07-22' }
      ]
    },
    {
      id: 3,
      name: 'Sunny',
      designation: 'Project Manager',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      email: 'sunny@techcorp.com',
      phone: '+91 9876543212',
      address: '789 Project Plaza, Delhi',
      joinDate: '2021-11-10',
      employeeId: 'TC003',
      department: 'Management',
      manager: 'VP Engineering',
      performance: [75, 78, 82, 85, 88, 90, 93],
      monthlyTasks: [
        { id: 1, task: 'Project Timeline Review', status: 'active', deadline: '2025-07-08' },
        { id: 2, task: 'Resource Allocation Planning', status: 'completed', deadline: '2025-07-04' },
        { id: 3, task: 'Client Communication Setup', status: 'active', deadline: '2025-07-14' },
        { id: 4, task: 'Sprint Retrospective', status: 'completed', deadline: '2025-07-07' },
        { id: 5, task: 'Team Performance Review', status: 'active', deadline: '2025-07-25' }
      ]
    }
  ]);

  // New state for added features
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Company Meeting', message: 'All hands meeting on Friday at 3 PM', date: '2025-07-02', priority: 'high' },
    { id: 2, title: 'New Policy Update', message: 'Remote work policy has been updated', date: '2025-07-01', priority: 'medium' }
  ]);

  const [meetings, setMeetings] = useState([
    { id: 1, title: 'Sprint Planning', date: '2025-07-05', time: '10:00', attendees: [1, 2], organizer: 'Tech Lead' },
    { id: 2, title: 'Design Review', date: '2025-07-08', time: '14:00', attendees: [2, 3], organizer: 'Design Head' }
  ]);

  const [feedback, setFeedback] = useState([
    { id: 1, employeeId: 1, feedback: 'Great performance on the API project', rating: 5, date: '2025-07-01', reviewer: 'Tech Lead' },
    { id: 2, employeeId: 2, feedback: 'Excellent design work, very creative', rating: 4, date: '2025-06-30', reviewer: 'Design Head' }
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [showMeetings, setShowMeetings] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showAddAnnouncement, setShowAddAnnouncement] = useState(false);
  const [showAddMeeting, setShowAddMeeting] = useState(false);
  const [showAddFeedback, setShowAddFeedback] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    designation: '',
    photo: '',
    email: '',
    phone: '',
    address: '',
    department: '',
    manager: ''
  });

  const [editEmployee, setEditEmployee] = useState({});
  
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    message: '',
    priority: 'medium'
  });

  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    attendees: [],
    organizer: ''
  });

  const [newFeedbackForm, setNewFeedbackForm] = useState({
    employeeId: '',
    feedback: '',
    rating: 5,
    reviewer: ''
  });

  // Filter and sort employees
  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      let aValue = sortBy === 'name' ? a.name : a.designation;
      let bValue = sortBy === 'name' ? b.name : b.designation;
      
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }, [employees, searchTerm, sortBy, sortOrder]);

  // Handle sorting
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Handle Info button click
  const handleInfoClick = (employee) => {
    setSelectedEmployee(employee);
    setShowInfo(true);
  };

  // Handle Edit button click
  const handleEditClick = (employee) => {
    setEditEmployee(employee);
    setShowEditForm(true);
  };

  // Handle Delete button click
  const handleDeleteClick = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== employeeId));
    }
  };

  // Handle Add Employee
  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.designation) {
      const newEmp = {
        id: Date.now(),
        name: newEmployee.name,
        designation: newEmployee.designation,
        photo: newEmployee.photo || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop&crop=face',
        email: newEmployee.email,
        phone: newEmployee.phone,
        address: newEmployee.address,
        joinDate: new Date().toISOString().split('T')[0],
        employeeId: `TC${String(employees.length + 1).padStart(3, '0')}`,
        department: newEmployee.department,
        manager: newEmployee.manager,
        performance: [60, 65, 70, 75, 80, 82, 85],
        monthlyTasks: [
          { id: 1, task: 'Onboarding Training', status: 'active', deadline: '2025-07-10' },
          { id: 2, task: 'Setup Development Environment', status: 'active', deadline: '2025-07-08' }
        ]
      };
      setEmployees([...employees, newEmp]);
      setNewEmployee({ name: '', designation: '', photo: '', email: '', phone: '', address: '', department: '', manager: '' });
      setShowAddForm(false);
    }
  };

  // Handle Edit Employee
  const handleEditEmployee = () => {
    setEmployees(employees.map(emp => 
      emp.id === editEmployee.id ? editEmployee : emp
    ));
    setShowEditForm(false);
    setEditEmployee({});
  };

  // Handle Add Announcement
  const handleAddAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.message) {
      const announcement = {
        id: Date.now(),
        ...newAnnouncement,
        date: new Date().toISOString().split('T')[0]
      };
      setAnnouncements([announcement, ...announcements]);
      setNewAnnouncement({ title: '', message: '', priority: 'medium' });
      setShowAddAnnouncement(false);
    }
  };

  // Handle Add Meeting
  const handleAddMeeting = () => {
    if (newMeeting.title && newMeeting.date && newMeeting.time) {
      const meeting = {
        id: Date.now(),
        ...newMeeting
      };
      setMeetings([...meetings, meeting]);
      setNewMeeting({ title: '', date: '', time: '', attendees: [], organizer: '' });
      setShowAddMeeting(false);
    }
  };

  // Handle Add Feedback
  const handleAddFeedbackSubmit = () => {
    if (newFeedbackForm.employeeId && newFeedbackForm.feedback && newFeedbackForm.reviewer) {
      const feedbackItem = {
        id: Date.now(),
        ...newFeedbackForm,
        date: new Date().toISOString().split('T')[0]
      };
      setFeedback([...feedback, feedbackItem]);
      setNewFeedbackForm({ employeeId: '', feedback: '', rating: 5, reviewer: '' });
      setShowAddFeedback(false);
    }
  };

  // Email Integration Functions
  const sendEmail = (employee, subject, body) => {
    const mailtoLink = `mailto:${employee.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  // Calendar Integration Functions
  const addToCalendar = (meeting) => {
    const startDate = new Date(`${meeting.date}T${meeting.time}`);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour meeting
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(meeting.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent('Meeting scheduled through Employee Dashboard')}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  // Close popups
  const closePopups = () => {
    setShowInfo(false);
    setShowAddForm(false);
    setShowEditForm(false);
    setShowAnnouncements(false);
    setShowMeetings(false);
    setShowFeedback(false);
    setShowAddAnnouncement(false);
    setShowAddMeeting(false);
    setShowAddFeedback(false);
    setSelectedEmployee(null);
    setEditEmployee({});
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
  };

  // Render Performance Graph
  const renderPerformanceGraph = (performance) => {
    const maxValue = Math.max(...performance);
    
    return (
      <div className="performance-chart-popup">
        <div className="chart-bars">
          {performance.map((value, index) => (
            <div key={index} className="bar-container">
              <div 
                className="bar" 
                style={{ 
                  height: `${(value / maxValue) * 120}px`,
                  backgroundColor: `hsl(${120 + (value * 2)}, 70%, 50%)`
                }}
              ></div>
              <span className="bar-label">Week {index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>TechCorp Solutions</h1>
        <p>Employee Management System</p>
      </header>

      {/* New Feature Buttons */}
      <div className="feature-buttons">
        <button className="feature-btn announcements-btn" onClick={() => setShowAnnouncements(true)}>
          📢 Announcements
        </button>
        <button className="feature-btn meetings-btn" onClick={() => setShowMeetings(true)}>
          📅 Meetings
        </button>
        <button className="feature-btn feedback-btn" onClick={() => setShowFeedback(true)}>
          💬 Feedback
        </button>
      </div>

      <div className="table-actions">
        <div className="search-sort-container">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name or designation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          
          {searchTerm && (
            <button className="clear-search-btn" onClick={clearSearch}>
              Clear
            </button>
          )}
        </div>

        <button className="add-employee-btn" onClick={() => setShowAddForm(true)}>
          + Add Employee
        </button>
      </div>

      <div className="table-container">
        <table className="employees-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th 
                className="sortable-header"
                onClick={() => handleSort('name')}
              >
                Name {getSortIcon('name')}
              </th>
              <th 
                className="sortable-header"
                onClick={() => handleSort('designation')}
              >
                Designation {getSortIcon('designation')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedEmployees.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-results">
                  {searchTerm ? `No employees found matching "${searchTerm}"` : 'No employees found'}
                </td>
              </tr>
            ) : (
              filteredAndSortedEmployees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td className="employee-name">
                    <img 
                      src={employee.photo} 
                      alt={employee.name}
                      className="employee-avatar-small"
                    />
                    {employee.name}
                  </td>
                  <td>{employee.designation}</td>
                  <td className="action-buttons">
                    <button 
                      className="info-btn"
                      onClick={() => handleInfoClick(employee)}
                    >
                      Info
                    </button>
                    <button 
                      className="edit-btn"
                      onClick={() => handleEditClick(employee)}
                    >
                      Edit
                    </button>
                    <button 
                      className="email-btn"
                      onClick={() => sendEmail(employee, 'Hello from TechCorp', 'Hi ' + employee.name + ',\n\nHope you are doing well.\n\nBest regards,\nTechCorp Team')}
                    >
                      📧
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteClick(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Employee Popup */}
      {showAddForm && (
        <div className="popup-overlay" onClick={closePopups}>
          <div className="popup-content add-form enhanced-form" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopups}>×</button>
            
            <div className="popup-header">
              <h2>Add New Employee</h2>
            </div>

            <div className="popup-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    placeholder="Enter employee name"
                  />
                </div>

                <div className="form-group">
                  <label>Designation *</label>
                  <input
                    type="text"
                    value={newEmployee.designation}
                    onChange={(e) => setNewEmployee({...newEmployee, designation: e.target.value})}
                    placeholder="Enter designation"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={newEmployee.address}
                  onChange={(e) => setNewEmployee({...newEmployee, address: e.target.value})}
                  placeholder="Enter address"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                    placeholder="Enter department"
                  />
                </div>

                <div className="form-group">
                  <label>Manager</label>
                  <input
                    type="text"
                    value={newEmployee.manager}
                    onChange={(e) => setNewEmployee({...newEmployee, manager: e.target.value})}
                    placeholder="Enter manager name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Photo URL (Optional)</label>
                <input
                  type="url"
                  value={newEmployee.photo}
                  onChange={(e) => setNewEmployee({...newEmployee, photo: e.target.value})}
                  placeholder="Enter photo URL"
                />
              </div>

              <div className="form-actions">
                <button className="save-btn" onClick={handleAddEmployee}>
                  Add Employee
                </button>
                <button className="cancel-btn" onClick={closePopups}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Popup */}
      {showEditForm && (
        <div className="popup-overlay" onClick={closePopups}>
          <div className="popup-content edit-form enhanced-form" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopups}>×</button>
            
            <div className="popup-header">
              <h2>Edit Employee</h2>
            </div>

            <div className="popup-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    value={editEmployee.name || ''}
                    onChange={(e) => setEditEmployee({...editEmployee, name: e.target.value})}
                    placeholder="Enter employee name"
                  />
                </div>

                <div className="form-group">
                  <label>Designation *</label>
                  <input
                    type="text"
                    value={editEmployee.designation || ''}
                    onChange={(e) => setEditEmployee({...editEmployee, designation: e.target.value})}
                    placeholder="Enter designation"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={editEmployee.email || ''}
                    onChange={(e) => setEditEmployee({...editEmployee, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={editEmployee.phone || ''}
                    onChange={(e) => setEditEmployee({...editEmployee, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={editEmployee.address || ''}
                  onChange={(e) => setEditEmployee({...editEmployee, address: e.target.value})}
                  placeholder="Enter address"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    value={editEmployee.department || ''}
                    onChange={(e) => setEditEmployee({...editEmployee, department: e.target.value})}
                    placeholder="Enter department"
                  />
                </div>

                <div className="form-group">
                  <label>Manager</label>
                  <input
                    type="text"
                    value={editEmployee.manager || ''}
                    onChange={(e) => setEditEmployee({...editEmployee, manager: e.target.value})}
                    placeholder="Enter manager name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Photo URL</label>
                <input
                  type="url"
                  value={editEmployee.photo || ''}
                  onChange={(e) => setEditEmployee({...editEmployee, photo: e.target.value})}
                  placeholder="Enter photo URL"
                />
              </div>

              <div className="form-actions">
                <button className="save-btn" onClick={handleEditEmployee}>
                  Update Employee
                </button>
                <button className="cancel-btn" onClick={closePopups}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employee Info Popup - Enhanced */}
      {showInfo && selectedEmployee && (
        <div className="popup-overlay" onClick={closePopups}>
          <div className="popup-content info-popup enhanced-info" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopups}>×</button>
            
            <div className="popup-header">
              <div className="employee-header-info">
                <img 
                  src={selectedEmployee.photo} 
                  alt={selectedEmployee.name}
                  className="employee-avatar-large"
                />
                <div>
                  <h2>{selectedEmployee.name}</h2>
                  <p className="popup-designation">{selectedEmployee.designation}</p>
                  <p className="employee-id">ID: {selectedEmployee.employeeId}</p>
                </div>
              </div>
            </div>

            <div className="popup-body">
              <div className="contact-info-section">
                <h3>Contact Information</h3>
                <div className="contact-grid">
                  <div className="contact-item">
                    <span className="contact-label">📧 Email:</span>
                    <span className="contact-value">{selectedEmployee.email}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">📞 Phone:</span>
                    <span className="contact-value">{selectedEmployee.phone}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">🏠 Address:</span>
                    <span className="contact-value">{selectedEmployee.address}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">🏢 Department:</span>
                    <span className="contact-value">{selectedEmployee.department}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">👤 Manager:</span>
                    <span className="contact-value">{selectedEmployee.manager}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">📅 Join Date:</span>
                    <span className="contact-value">{selectedEmployee.joinDate}</span>
                  </div>
                </div>
              </div>

              <div className="popup-section">
                <h3>Performance Graph</h3>
                {renderPerformanceGraph(selectedEmployee.performance)}
              </div>

              <div className="popup-section">
                <h3>This Month's Assigned Tasks</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table className="tasks-table">
                    <thead>
                      <tr>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Deadline</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEmployee.monthlyTasks.map((task) => (
                        <tr key={task.id}>
                          <td>{task.task}</td>
                          <td>
                            <span className={`status-badge ${task.status}`}>
                              {task.status}
                            </span>
                          </td>
                          <td>{task.deadline}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="task-summary">
                <div className="summary-card">
                  <h4>Total Tasks</h4>
                  <span className="summary-number">{selectedEmployee.monthlyTasks.length}</span>
                </div>
                <div className="summary-card">
                  <h4>Completed</h4>
                  <span className="summary-number completed">
                    {selectedEmployee.monthlyTasks.filter(task => task.status === 'completed').length}
                  </span>
                </div>
                <div className="summary-card">
                  <h4>Active</h4>
                  <span className="summary-number active">
                    {selectedEmployee.monthlyTasks.filter(task => task.status === 'active').length}
                  </span>
                </div>
              </div>

              <div className="employee-feedback-section">
                <h3>Recent Feedback</h3>
                <div className="feedback-list">
                  {feedback.filter(f => f.employeeId === selectedEmployee.id).map(f => (
                    <div key={f.id} className="feedback-item">
                      <div className="feedback-header">
                        <span className="feedback-reviewer">{f.reviewer}</span>
                        <span className="feedback-rating">{'⭐'.repeat(f.rating)}</span>
                      </div>
                      <p className="feedback-text">{f.feedback}</p>
                      <span className="feedback-date">{f.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Announcements Popup */}
      {showAnnouncements && (
        <div className="popup-overlay" onClick={closePopups}>
          <div className="popup-content announcements-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopups}>×</button>
            
            <div className="popup-header">
              <h2>📢 Company Announcements</h2>
              <button className="add-btn" onClick={() => setShowAddAnnouncement(true)}>
                + Add Announcement
              </button>
            </div>

            <div className="popup-body">
              <div className="announcements-list">
                {announcements.map(announcement => (
                  <div key={announcement.id} className={`announcement-item ${announcement.priority}`}>
                    <div className="announcement-header">
                      <h4>{announcement.title}</h4>
                      <span className={`priority-badge ${announcement.priority}`}>
                        {announcement.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="announcement-message">{announcement.message}</p>
                    <span className="announcement-date">{announcement.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Announcement Popup */}
      {showAddAnnouncement && (
        <div className="popup-overlay" onClick={closePopups}>
          <div className="popup-content add-announcement-form" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopups}>×</button>
            
            <div className="popup-header">
              <h2>Add New Announcement</h2>
            </div>

            <div className="popup-body">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  placeholder="Enter announcement title"
                />
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  value={newAnnouncement.message}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, message: e.target.value})}
                  placeholder="Enter announcement message"
                  rows="4"
                ></textarea>
              </div>

              <div className="form-group">
                <label>Priority</label>
                <select
                  value={newAnnouncement.priority}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="form-actions">
                <button className="save-btn" onClick={handleAddAnnouncement}>
                  Add Announcement
                </button>
                <button className="cancel-btn" onClick={closePopups}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Meetings Popup */}
      {showMeetings && (
        <div className="popup-overlay" onClick={closePopups}>
          <div className="popup-content meetings-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopups}>×</button>
            
            <div className="popup-header">
              <h2>📅 Scheduled Meetings</h2>
              <button className="add-btn" onClick={() => setShowAddMeeting(true)}>
                + Schedule Meeting
              </button>
            </div>

            <div className="popup-body">
              <div className="meetings-list">
                {meetings.map(meeting => (
                  <div key={meeting.id} className="meeting-item">
                    <div className="meeting-header">
                      <h4>{meeting.title}</h4>
                      <button 
                        className="calendar-btn"
                        onClick={() => addToCalendar(meeting)}
                        title="Add to Calendar"
                      >
                        📅
                      </button>
                    </div>
                    <div className="meeting-details">
                      <p><strong>Date:</strong> {meeting.date}</p>
                      <p><strong>Time:</strong> {meeting.time}</p>
                      <p><strong>Organizer:</strong> {meeting.organizer}</p>
                      <p><strong>Attendees:</strong> {
                        meeting.attendees.map(id => 
                          employees.find(emp => emp.id === id)?.name
                        ).filter(name => name).join(', ')
                      }</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Meeting Popup */}
      {showAddMeeting && (
        <div className="popup-overlay" onClick={closePopups}>
          <div className="popup-content add-meeting-form" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopups}>×</button>
            
            <div className="popup-header">
              <h2>Schedule New Meeting</h2>
            </div>

            <div className="popup-body">
              <div className="form-group">
                <label>Meeting Title *</label>
                <input
                  type="text"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                  placeholder="Enter meeting title"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Time *</label>
                  <input
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Organizer</label>
                <input
                  type="text"
                  value={newMeeting.organizer}
                  onChange={(e) => setNewMeeting({...newMeeting, organizer: e.target.value})}
                  placeholder="Enter organizer name"
                />
              </div>

              <div className="form-group">
                <label>Attendees</label>
                <div className="attendees-selection">
                  {employees.map(employee => (
                    <label key={employee.id} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newMeeting.attendees.includes(employee.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewMeeting({
                              ...newMeeting,
                              attendees: [...newMeeting.attendees, employee.id]
                            });
                          } else {
                            setNewMeeting({
                              ...newMeeting,
                              attendees: newMeeting.attendees.filter(id => id !== employee.id)
                            });
                          }
                        }}
                      />
                      {employee.name}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button className="save-btn" onClick={handleAddMeeting}>
                  Schedule Meeting
                </button>
                <button className="cancel-btn" onClick={closePopups}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Popup */}
      {showFeedback && (
        <div className="popup-overlay" onClick={closePopups}>
          <div className="popup-content feedback-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopups}>×</button>
            
            <div className="popup-header">
              <h2>💬 Employee Feedback</h2>
              <button className="add-btn" onClick={() => setShowAddFeedback(true)}>
                + Add Feedback
              </button>
            </div>

            <div className="popup-body">
              <div className="feedback-list">
                {feedback.map(f => {
                  const employee = employees.find(emp => emp.id === f.employeeId);
                  return (
                    <div key={f.id} className="feedback-item">
                      <div className="feedback-header">
                        <div className="employee-info">
                          <img 
                            src={employee?.photo} 
                            alt={employee?.name}
                            className="employee-avatar-tiny"
                          />
                          <span className="employee-name">{employee?.name}</span>
                        </div>
                        <div className="feedback-meta">
                          <span className="feedback-rating">{'⭐'.repeat(f.rating)}</span>
                          <span className="feedback-reviewer">by {f.reviewer}</span>
                        </div>
                      </div>
                      <p className="feedback-text">{f.feedback}</p>
                      <span className="feedback-date">{f.date}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Feedback Popup */}
      {showAddFeedback && (
        <div className="popup-overlay" onClick={closePopups}>
          <div className="popup-content add-feedback-form" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopups}>×</button>
            
            <div className="popup-header">
              <h2>Add Employee Feedback</h2>
            </div>

            <div className="popup-body">
              <div className="form-group">
                <label>Employee *</label>
                <select
                  value={newFeedbackForm.employeeId}
                  onChange={(e) => setNewFeedbackForm({...newFeedbackForm, employeeId: parseInt(e.target.value)})}
                >
                  <option value="">Select Employee</option>
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name} - {employee.designation}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Feedback *</label>
                <textarea
                  value={newFeedbackForm.feedback}
                  onChange={(e) => setNewFeedbackForm({...newFeedbackForm, feedback: e.target.value})}
                  placeholder="Enter your feedback"
                  rows="4"
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Rating *</label>
                  <select
                    value={newFeedbackForm.rating}
                    onChange={(e) => setNewFeedbackForm({...newFeedbackForm, rating: parseInt(e.target.value)})}
                  >
                    <option value={1}>⭐ (1 star)</option>
                    <option value={2}>⭐⭐ (2 stars)</option>
                    <option value={3}>⭐⭐⭐ (3 stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 stars)</option>
                    <option value={5}>⭐⭐⭐⭐⭐ (5 stars)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Reviewer Name *</label>
                  <input
                    type="text"
                    value={newFeedbackForm.reviewer}
                    onChange={(e) => setNewFeedbackForm({...newFeedbackForm, reviewer: e.target.value})}
                    placeholder="Enter reviewer name"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button className="save-btn" onClick={handleAddFeedbackSubmit}>
                  Add Feedback
                </button>
                <button className="cancel-btn" onClick={closePopups}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;