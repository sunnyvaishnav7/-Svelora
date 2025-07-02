// AddEmployeeComponent.js - FIXED VERSION
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const AddEmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    const { id } = useParams();

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!firstName.trim() || !lastName.trim() || !emailId.trim()) {
            setError('All fields are required');
            return;
        }

        setLoading(true);
        setError('');

        const employee = { firstName: firstName.trim(), lastName: lastName.trim(), emailId: emailId.trim() };

        if (id) {
            EmployeeService.updateEmployee(id, employee)
                .then((response) => {
                    navigate('/employees');
                })
                .catch(error => {
                    console.log(error);
                    setError('Failed to update employee. Please try again.');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            EmployeeService.createEmployee(employee)
                .then((response) => {
                    console.log(response.data);
                    navigate('/employees');
                })
                .catch(error => {
                    console.log(error);
                    setError('Failed to create employee. Please try again.');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        if (id) {
            setLoading(true);
            EmployeeService.getEmployeeById(id)
                .then((response) => {
                    setFirstName(response.data.firstName || '');
                    setLastName(response.data.lastName || '');
                    setEmailId(response.data.emailId || '');
                })
                .catch(error => {
                    console.log(error);
                    setError('Failed to load employee data.');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const title = () => {
        if (id) {
            return <h2 className="text-center">Update Employee</h2>;
        } else {
            return <h2 className="text-center">Add Employee</h2>;
        }
    };

    return (
        <div>
            <br /><br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        {title()}
                        <div className="card-body">
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            
                            <form onSubmit={saveOrUpdateEmployee}>
                                <div className="form-group mb-2">
                                    <label className="form-label">First Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter first name"
                                        name="firstName"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        disabled={loading}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Last Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter last name"
                                        name="lastName"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        disabled={loading}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Email Id:</label>
                                    <input
                                        type="email"
                                        placeholder="Enter email Id"
                                        name="emailId"
                                        className="form-control"
                                        value={emailId}
                                        onChange={(e) => setEmailId(e.target.value)}
                                        disabled={loading}
                                        required
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    className="btn btn-success me-2" 
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : 'Submit'}
                                </button>
                                
                                <Link 
                                    to="/employees" 
                                    className="btn btn-danger"
                                    style={{ pointerEvents: loading ? 'none' : 'auto' }}
                                >
                                    Cancel
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployeeComponent;