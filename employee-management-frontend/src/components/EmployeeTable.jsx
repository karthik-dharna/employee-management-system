function EmployeeTable({
  employees,
  editEmployee,
  deleteEmployee
}) {
  return (
    <div className="table-container">

      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {employees.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                No employees found
              </td>
            </tr>
          ) : (
            employees.map((employee) => (

              <tr key={employee.id}>

                <td>{employee.id}</td>

                <td>{employee.name}</td>

                <td>{employee.email}</td>

                <td>{employee.department}</td>

                <td>
                  ₹{Number(employee.salary).toLocaleString("en-IN")}
                </td>

                <td>

                  <button
                    className="edit-button"
                    onClick={() =>
                      editEmployee(employee)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteEmployee(employee.id)
                    }
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
  );
}

export default EmployeeTable;