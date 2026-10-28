const API_URL = "http://localhost:8080/api/v1/employees";

// GET ALL
export const getEmployees = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  return response.json();
};

// CREATE
export const createEmployee = async (employee) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(employee)
  });

  if (!response.ok) {
    throw new Error("Failed to create employee");
  }

  return response.json();
};

// UPDATE
export const updateEmployee = async (id, employee) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(employee)
  });

  if (!response.ok) {
    throw new Error("Failed to update employee");
  }

  return response.json();
};

// DELETE
export const deleteEmployee = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }

  return true;
};