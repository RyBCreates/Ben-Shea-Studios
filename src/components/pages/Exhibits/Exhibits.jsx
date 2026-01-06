import { useState, useEffect } from "react";
import { fetchExhibits } from "../../../utils/api/index"; // your backend API call
import ExhibitCard from "../../ExhibitCard/ExhibitCard";
import "./Exhibits.css";

function Exhibits({ artItems }) {
  const [exhibits, setExhibits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch exhibits from backend
  useEffect(() => {
    fetchExhibits()
      .then((data) => setExhibits(data))
      .catch((err) => {
        console.error("Error fetching exhibits:", err);
        setError("Failed to load exhibits. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="exhibits">
      <div className="exhibits__hero">
        <h2 className="exhibits__title">Exhibits</h2>
        <p className="exhibits__subtitle">
          Explore current and upcoming exhibits featuring a diverse range of
          artwork.
        </p>
      </div>

      {loading && <p>Loading exhibits...</p>}
      {error && <p className="exhibits__error">{error}</p>}

      {!loading && !error && (
        <ul className="exhibits__list">
          {exhibits.map((exhibit) => (
            <ExhibitCard
              exhibit={exhibit}
              key={exhibit._id}
              variant="default"
              artItems={artItems} // if needed
            />
          ))}
        </ul>
      )}

      <h3 className="exhibits__section-title">Upcoming Shows</h3>
      {/* TODO: Replace mockShows with backend data if available */}
      <p className="exhibits__no-shows">
        Currently, there are no shows coming up, check back again later!
      </p>
    </section>
  );
}

export default Exhibits;
