const API_BASE_URL = "http://localhost:3000"; // e.g., Express or Django backend

export async function loginUser(email, password) {
    console.log("Attempting login with:", email, password);
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data;
}

export async function registerUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {  "Content-Type": "application/json", },
    body: JSON.stringify({ userName, email, password ,country}),
  });
}
