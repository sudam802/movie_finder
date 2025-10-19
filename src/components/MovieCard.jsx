/* eslint-disable react/prop-types */
function MovieCard({ title, year, imdbID, poster }) {
  return (
    <div className="movie-card">
      <img className="poster" src={poster !== "N/A" ? poster : "/placeholder-poster.png"} alt={title} />
      <div className="card-body">
        <div className="title">{title}</div>
        <div className="meta">Year • {year}</div>
        <div className="actions">
          <a href={`https://www.imdb.com/title/${imdbID}`} target="_blank" rel="noopener noreferrer" className="btn primary">
            View on IMDb
          </a>
        </div>
      </div>
    </div>
  );
}
export default MovieCard;
