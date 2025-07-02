// ListEmployeeComponent.js - FIXED VERSION
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = () => {
        setLoading(true);
        setError('');
        
        EmployeeService.getAllEmployees()
            .then((response) => {
                setEmployees(response.data || []);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                setError('Failed to load employees. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const deleteEmployee = (employeeId) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            EmployeeService.deleteEmployee(employeeId)
                .then((response) => {
                    getAllEmployees();
                })
                .catch(error => {
                    console.log(error);
                    setError('Failed to delete employee. Please try again.');
                });
        }
    };

    if (loading) {
        return (
            <div className="container">
                <div className="text-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading employees...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 className="text-center mb-4">List Employees</h2>
            
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Link to="/add-employee" className="btn btn-primary">
                    Add Employee
                </Link>
                
                {error && (
                    <div className="alert alert-danger mb-0" role="alert">
                        {error}
                    </div>
                )}
            </div>

            {employees.length === 0 ? (
                <div className="text-center">
                    <p>No employees found.</p>
                    <Link to="/add-employee" className="btn btn-primary">
                        Add First Employee
                    </Link>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Employee Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Id</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(employee => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.emailId}</td>
                                    <td>
                                        <Link 
                                            className="btn btn-info btn-sm me-2" 
                                            to={`/edit-employee/${employee.id}`}
                                        >
                                            Update
                                        </Link>
                                        <button 
                                            className="btn btn-danger btn-sm" 
                                            onClick={() => deleteEmployee(employee.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ListEmployeeComponent;