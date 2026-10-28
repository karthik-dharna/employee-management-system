import { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import SearchBar from "./components/SearchBar";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee as deleteEmployeeApi
} from "./services/employeeService";

function App() {
  const [editId, setEditId] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  const [employees, setEmployees] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formError, setFormError] = useState("");

  const [departmentFilter, setDepartmentFilter] = useState("ALL");

  // =========================
  // GET ALL EMPLOYEES
  // =========================

  useEffect(() => {
    getEmployees()
      .then((data) => {
        setEmployees(data);
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setError(
          "Unable to load employees. Please check the server."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // =========================
  // SEARCH + DEPARTMENT FILTER
  // =========================

  const filteredEmployees = employees.filter((employee) => {
    const employeeName = employee.name
      ? employee.name.toLowerCase()
      : "";

    const employeeDepartment = employee.department
      ? employee.department.toLowerCase()
      : "";

    const searchText = search.toLowerCase();

    const matchesSearch =
      employeeName.includes(searchText) ||
      employeeDepartment.includes(searchText);

    const matchesDepartment =
      departmentFilter === "ALL" ||
      employeeDepartment === departmentFilter.toLowerCase();

    return matchesSearch && matchesDepartment;
  });

  // =========================
  // DASHBOARD STATISTICS
  // =========================

  const totalEmployees = employees.length;

  const itEmployees = employees.filter(
    (employee) =>
      employee.department &&
      employee.department.toLowerCase() === "it"
  ).length;

  const hrEmployees = employees.filter(
    (employee) =>
      employee.department &&
      employee.department.toLowerCase() === "hr"
  ).length;

  const averageSalary =
    employees.length > 0
      ? employees.reduce(
          (total, employee) =>
            total + Number(employee.salary),
          0
        ) / employees.length
      : 0;

  // =========================
  // ADD / UPDATE EMPLOYEE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");

    // NAME VALIDATION
    if (name.trim() === "") {
      setFormError("Please enter employee name");
      return;
    }

    // EMAIL VALIDATION
    if (email.trim() === "") {
      setFormError("Please enter employee email");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setFormError("Please enter a valid email address");
      return;
    }

    // DEPARTMENT VALIDATION
    if (department.trim() === "") {
      setFormError("Please select a department");
      return;
    }

    // SALARY VALIDATION
    if (Number(salary) <= 0) {
      setFormError("Salary must be greater than 0");
      return;
    }

    const employee = {
      name: name.trim(),
      email: email.trim(),
      department: department,
      salary: Number(salary)
    };

    try {
      if (editId === null) {
        // CREATE
        await createEmployee(employee);

        alert("Employee added successfully!");
      } else {
        // UPDATE
        await updateEmployee(editId, employee);

        alert("Employee updated successfully!");
      }

      // CLEAR FORM
      setName("");
      setEmail("");
      setDepartment("");
      setSalary("");
      setEditId(null);
      setFormError("");

      // REFRESH EMPLOYEES
      const updatedEmployees = await getEmployees();

      setEmployees(updatedEmployees);
    } catch (error) {
      console.error("Error processing employee:", error);

      setFormError(
        "Error processing employee. Please try again."
      );
    }
  };

  // =========================
  // EDIT EMPLOYEE
  // =========================

  const editEmployee = (employee) => {
    setEditId(employee.id);

    setName(employee.name);
    setEmail(employee.email);
    setDepartment(employee.department);
    setSalary(employee.salary);

    setFormError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // =========================
  // CANCEL EDIT
  // =========================

  const cancelEdit = () => {
    setEditId(null);

    setName("");
    setEmail("");
    setDepartment("");
    setSalary("");

    setFormError("");
  };

  // =========================
  // DELETE EMPLOYEE
  // =========================

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteEmployeeApi(id);

      alert("Employee deleted successfully!");

      setEmployees((currentEmployees) =>
        currentEmployees.filter(
          (employee) => employee.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Error deleting employee:",
        error
      );

      alert("Error deleting employee");
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <>
      <Navbar />

      <div className="container">

        <h1>Employee Management System</h1>

        {/* DASHBOARD */}

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h3>Total Employees</h3>
            <p>{totalEmployees}</p>
          </div>

          <div className="dashboard-card">
            <h3>IT Employees</h3>
            <p>{itEmployees}</p>
          </div>

          <div className="dashboard-card">
            <h3>HR Employees</h3>
            <p>{hrEmployees}</p>
          </div>

          <div className="dashboard-card">
            <h3>Average Salary</h3>
            <p>
              ₹{averageSalary.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </p>
          </div>

        </div>

        {/* EMPLOYEE FORM */}

        <div className="form-container">

          <EmployeeForm
            editId={editId}
            name={name}
            email={email}
            department={department}
            salary={salary}

            setName={setName}
            setEmail={setEmail}
            setDepartment={setDepartment}
            setSalary={setSalary}

            handleSubmit={handleSubmit}
            cancelEdit={cancelEdit}

            formError={formError}
          />

        </div>

        {/* EMPLOYEE LIST */}

        <h2>Employee List</h2>

        {loading && (
          <p>Loading employees...</p>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {/* SEARCH + FILTER */}

        <SearchBar
          search={search}
          setSearch={setSearch}
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
        />

        {/* TABLE */}

        <EmployeeTable
          employees={filteredEmployees}
          editEmployee={editEmployee}
          deleteEmployee={deleteEmployee}
        />

      </div>
    </>
  );
}

export default App;