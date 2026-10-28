function EmployeeForm({
  editId,
  name,
  email,
  department,
  salary,
  setName,
  setEmail,
  setDepartment,
  setSalary,
  handleSubmit,
  cancelEdit,
  formError
}) {
  return (
    <>
      <h2>
        {editId === null ? "Add Employee" : "Edit Employee"}
      </h2>

      <form onSubmit={handleSubmit}>

        <label>Name</label>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Department</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
        </select>

        <label>Salary</label>
        <input
          type="number"
          placeholder="Enter salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        {formError && (
          <p className="form-error">{formError}</p>
        )}

        <button type="submit">
          {editId === null ? "Add Employee" : "Update Employee"}
        </button>

        {editId !== null && (
          <button
            type="button"
            className="clear-button"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}

      </form>
    </>
  );
}

export default EmployeeForm;