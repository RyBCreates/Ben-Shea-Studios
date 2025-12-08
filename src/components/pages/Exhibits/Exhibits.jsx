import { useState } from "react";

import { mockExhibit } from "../../../utils/mockData/mockExhibits";
import { mockShows } from "../../../utils/mockData/mockShows";

import ExhibitCard from "../../ExhibitCard/ExhibitCard";

import "./Exhibits.css";

function Exhibits() {
  const [upcomingShows, setUpcomingShows] = useState([]);

  return (
    <section className="exhibits">
      <div className="exhibits__hero">
        <h2 className="exhibits__title">Exhibits</h2>
        <p className="exhibits__subtitle">
          Explore current and upcoming exhibits featuring a diverse range of
          artwork.
        </p>
      </div>
      <ul className="exhibits__list">
        {mockExhibit.map((exhibit) => (
          <ExhibitCard exhibit={exhibit} key={exhibit._id} variant="default" />
        ))}
      </ul>
      <h3 className="exhibits__section-title">Upcoming Shows</h3>
      {upcomingShows.length > 0 ? (
        <>
          {mockShows.map((show) => {
            // <UpcomingShowCard />
          })}
        </>
      ) : (
        <p className="exhibits__no-shows">
          Currently, there are no shows coming up, check back again later!
        </p>
      )}
    </section>
  );
}

export default Exhibits;
