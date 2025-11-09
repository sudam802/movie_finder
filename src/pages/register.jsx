import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import Select from "react-select";
import countryList from "react-select-country-list";
import "../styles/pages/register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // ✅ Memoize the list so it doesn’t rebuild on every render
  const options = useMemo(() => countryList().getData(), []);

  // ✅ Handle country selection
  const handleCountryChange = (selected) => {
    setCountry(selected.label); // selected.label = full country name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await registerUser(username, email, password, country);
      console.log("Registration success:", userData);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* ✅ Country dropdown using react-select-country-list */}
        <Select
          options={options}
          onChange={handleCountryChange}
          placeholder="Select your country"
          isSearchable
        />

        <button type="submit">Register</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
