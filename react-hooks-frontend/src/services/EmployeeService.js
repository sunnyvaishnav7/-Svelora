// import axios from "axios";

// const Employee_BASE_REST_API_URL = 'http://localhost:8080/api/v1/employees';

// class EmployeeService {

//     getAllEmployees() {
//         return axios.get(Employee_BASE_REST_API_URL)
//     }

//     createEmployee(employee){
//         return axios.post(Employee_BASE_REST_API_URL,employee)
//     }

//     getEmployeeById(employeeId){
//         return axios.get(Employee_BASE_REST_API_URL + '/' + employeeId)
//     }

//      updateEmployee(employeeId, employee){
//         return axios.put(EMPLOYEE_BASE_REST_API_URL + '/' +employeeId, employee);
//     }

//     deleteEmployee(employeeId){
//         return axios.delete(EMPLOYEE_BASE_REST_API_URL + '/' + employeeId);
//     }


// }

// export default new EmployeeService();

// services/EmployeeService.js - FIXED VERSION
import axios from "axios";

// Fixed: Consistent variable naming
const EMPLOYEE_BASE_REST_API_URL = 'http://localhost:8080/api/v1/employees';

// Add axios interceptors for better error handling and request/response logging
axios.interceptors.request.use(
    (config) => {
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        console.log('API Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('Response Error:', error.response?.status, error.response?.data || error.message);
        return Promise.reject(error);
    }
);

class EmployeeService {

    // Get all employees
    getAllEmployees() {
        return axios.get(EMPLOYEE_BASE_REST_API_URL);
    }

    // Create a new employee
    createEmployee(employee) {
        // Add validation for required fields
        if (!employee || !employee.firstName || !employee.lastName || !employee.emailId) {
            return Promise.reject(new Error('Missing required employee fields'));
        }
        return axios.post(EMPLOYEE_BASE_REST_API_URL, employee);
    }

    // Get employee by ID
    getEmployeeById(employeeId) {
        if (!employeeId) {
            return Promise.reject(new Error('Employee ID is required'));
        }
        return axios.get(`${EMPLOYEE_BASE_REST_API_URL}/${employeeId}`);
    }

    // Fixed: Use correct variable name (was using undefined EMPLOYEE_BASE_REST_API_URL)
    updateEmployee(employeeId, employee) {
        if (!employeeId) {
            return Promise.reject(new Error('Employee ID is required'));
        }
        if (!employee || !employee.firstName || !employee.lastName || !employee.emailId) {
            return Promise.reject(new Error('Missing required employee fields'));
        }
        return axios.put(`${EMPLOYEE_BASE_REST_API_URL}/${employeeId}`, employee);
    }

    // Delete employee by ID
    deleteEmployee(employeeId) {
        if (!employeeId) {
            return Promise.reject(new Error('Employee ID is required'));
        }
        return axios.delete(`${EMPLOYEE_BASE_REST_API_URL}/${employeeId}`);
    }

    // Additional utility methods for better functionality

    // Search employees by name or email
    searchEmployees(searchTerm) {
        return axios.get(`${EMPLOYEE_BASE_REST_API_URL}/search?q=${encodeURIComponent(searchTerm)}`);
    }

    // Get employees with pagination
    getEmployeesWithPagination(page = 0, size = 10) {
        return axios.get(`${EMPLOYEE_BASE_REST_API_URL}?page=${page}&size=${size}`);
    }

    // Validate employee data before sending to server
    validateEmployee(employee) {
        const errors = [];

        if (!employee) {
            errors.push('Employee data is required');
            return errors;
        }

        if (!employee.firstName || employee.firstName.trim().length === 0) {
            errors.push('First name is required');
        } else if (employee.firstName.trim().length > 50) {
            errors.push('First name must be less than 50 characters');
        }

        if (!employee.lastName || employee.lastName.trim().length === 0) {
            errors.push('Last name is required');
        } else if (employee.lastName.trim().length > 50) {
            errors.push('Last name must be less than 50 characters');
        }

        if (!employee.emailId || employee.emailId.trim().length === 0) {
            errors.push('Email is required');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(employee.emailId.trim())) {
                errors.push('Email format is invalid');
            } else if (employee.emailId.trim().length > 100) {
                errors.push('Email must be less than 100 characters');
            }
        }

        return errors;
    }

    // Check if employee exists
    employeeExists(employeeId) {
        return this.getEmployeeById(employeeId)
            .then(() => true)
            .catch(() => false);
    }

    // Bulk operations
    createMultipleEmployees(employees) {
        if (!Array.isArray(employees) || employees.length === 0) {
            return Promise.reject(new Error('Invalid employees array'));
        }

        // Validate all employees first
        const allErrors = [];
        employees.forEach((employee, index) => {
            const errors = this.validateEmployee(employee);
            if (errors.length > 0) {
                allErrors.push(`Employee ${index + 1}: ${errors.join(', ')}`);
            }
        });

        if (allErrors.length > 0) {
            return Promise.reject(new Error(allErrors.join('; ')));
        }

        return axios.post(`${EMPLOYEE_BASE_REST_API_URL}/bulk`, employees);
    }

    // Delete multiple employees
    deleteMultipleEmployees(employeeIds) {
        if (!Array.isArray(employeeIds) || employeeIds.length === 0) {
            return Promise.reject(new Error('Invalid employee IDs array'));
        }
        return axios.delete(`${EMPLOYEE_BASE_REST_API_URL}/bulk`, { data: { ids: employeeIds } });
    }
}

export default new EmployeeService();

// Alternative export for named imports
export { EmployeeService };