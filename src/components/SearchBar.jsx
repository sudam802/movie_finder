import { useEffect, useState } from "react";

function SearchBar({onResults}) {
  const [title, setTitle] = useState("");

  // .env at project root:
  // VITE_API_URL=https://www.omdbapi.com
  // VITE_MOVIE_API_KEY=be157541
  const API_URL = 'https://omdbapi.com/?apikey=be157541&s=';

  useEffect(() => {
    if (!title.trim()) {
      onResults([]); // clear results if input empty
      return;
    }
    if (!title.trim()) return; // don't call API on empty value

    const controller = new AbortController();

    // Choose ONE: search many by title (s=) OR exact title (t=)
    const url = `${API_URL}${title}`;
    console.log("Fetching OMDb URL:", url); // <-- your log

    (async () => {
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        console.log("OMDb result:", data); 
        
         if (data.Response === "True" && data.Search) {
          onResults(data.Search); // 👈 send results to Home
        } else {
          onResults([]); // no results
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("OMDb fetch failed:", err);
        }
      }
    })();

    return () => controller.abort();
  });

  return (
    <div className="topnav">
      <div className="brand">🎬 CineScope</div>

      <nav className="nav-links">
        <a className="nav-link active" href="#home">Home</a>
        <a className="nav-link" href="#about">About</a>
        <a className="nav-link" href="#contact">Contact</a>
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
