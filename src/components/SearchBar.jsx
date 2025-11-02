import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // 👈 import Link

function SearchBar({ onResults }) {
  const [title, setTitle] = useState("");
  const API_URL = "https://omdbapi.com/?apikey=be157541&s=";

  useEffect(() => {
    if (!title.trim()) {
      onResults([]);
      return;
    }

    const controller = new AbortController();
    const url = `${API_URL}${title}`;
    console.log("Fetching OMDb URL:", url);

    (async () => {
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (data.Response === "True" && data.Search) {
          onResults(data.Search);
        } else {
          onResults([]);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("OMDb fetch failed:", err);
        }
      }
    })();

    return () => controller.abort();
  }, [title]);

  return (
    <div className="topnav">
      <div className="brand">🎬 CineScope</div>

      <nav className="nav-links">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/about">About</Link>
        <Link className="nav-link" to="/contact">Contact</Link>
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      </nav>

      <div className="search-wrap">
        <span className="search-icon">⌕</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search movies…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
