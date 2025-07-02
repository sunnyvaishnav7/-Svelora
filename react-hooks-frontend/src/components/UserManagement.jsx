import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8080/api';

const UserManagement = () => {
  // Auth state
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // User CRUD state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [crudMessage, setCrudMessage] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [userForm, setUserForm] = useState({ firstName: '', lastName: '', email: '', password: '' });

  // Auth handlers
  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthMessage('');
    const url = authMode === 'login' ? `${API_BASE}/auth/login` : `${API_BASE}/auth/register`;
    let body;
    if (authMode === 'login') {
      body = { email, password };
    } else {
      const [firstName, ...rest] = name.trim().split(' ');
      const lastName = rest.join(' ');
      body = { firstName, lastName, email, password };
    }
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      setAuthMessage(data.message);
      if (authMode === 'login' && data.message && data.message.toLowerCase().includes('success')) {
        setIsLoggedIn(true);
        fetchUsers();
      }
    } catch (err) {
      setAuthMessage('Error connecting to server.');
    }
  };

  // CRUD handlers
  const fetchUsers = async () => {
    setLoading(true);
    setCrudMessage('');
    try {
      const res = await fetch(`${API_BASE}/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setCrudMessage('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  const handleUserFormChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setCrudMessage('');
    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userForm)
      });
      if (res.ok) {
        setCrudMessage('User added!');
        setUserForm({ firstName: '', lastName: '', email: '', password: '' });
        fetchUsers();
      } else {
        setCrudMessage('Failed to add user.');
      }
    } catch {
      setCrudMessage('Failed to add user.');
    }
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setUserForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: ''
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setCrudMessage('');
    try {
      const res = await fetch(`${API_BASE}/users/${editUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userForm)
      });
      if (res.ok) {
        setCrudMessage('User updated!');
        setEditUser(null);
        setUserForm({ firstName: '', lastName: '', email: '', password: '' });
        fetchUsers();
      } else {
        setCrudMessage('Failed to update user.');
      }
    } catch {
      setCrudMessage('Failed to update user.');
    }
  };

  const handleDeleteUser = async (id) => {
    setCrudMessage('');
    try {
      const res = await fetch(`${API_BASE}/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCrudMessage('User deleted!');
        fetchUsers();
      } else {
        setCrudMessage('Failed to delete user.');
      }
    } catch {
      setCrudMessage('Failed to delete user.');
    }
  };

  // Fetch users after login
  useEffect(() => {
    if (isLoggedIn) fetchUsers();
  }, [isLoggedIn]);

  // UI
  if (!isLoggedIn) {
    return (
      <div className="user-mgmt-auth-container">
        <h2>{authMode === 'login' ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleAuth} className="user-mgmt-auth-form">
          {authMode === 'register' && (
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit">{authMode === 'login' ? 'Login' : 'Register'}</button>
          {authMessage && <div className="form-message">{authMessage}</div>}
        </form>
        <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="switch-auth-btn">
          {authMode === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
    );
  }

  return (
    <div className="user-mgmt-container">
      <h2>User Management</h2>
      <form onSubmit={editUser ? handleUpdateUser : handleAddUser} className="user-mgmt-form">
        <input name="firstName" placeholder="First Name" value={userForm.firstName} onChange={handleUserFormChange} required />
        <input name="lastName" placeholder="Last Name" value={userForm.lastName} onChange={handleUserFormChange} required />
        <input name="email" placeholder="Email" value={userForm.email} onChange={handleUserFormChange} required />
        <input name="password" placeholder="Password" type="password" value={userForm.password} onChange={handleUserFormChange} required={!editUser} />
        <button type="submit">{editUser ? 'Update User' : 'Add User'}</button>
        {editUser && <button type="button" onClick={() => { setEditUser(null); setUserForm({ firstName: '', lastName: '', email: '', password: '' }); }}>Cancel</button>}
      </form>
      {crudMessage && <div className="form-message">{crudMessage}</div>}
      <h3>User List</h3>
      {loading ? <div>Loading...</div> : (
        <table className="user-mgmt-table">
          <thead>
            <tr>
              <th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEditUser(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement; 