import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="hero">
        <h1>Embark on a Journey of Discovery through Nature's Marvels!</h1>
        <p>
          Create Lasting Memories as You Embark on a Journey that Nurtures Your
          Mind, Body, and Soul.
        </p>
        <NavLink to="/articles">
          <button className="hero-explore-button">Explore</button>
        </NavLink>
      </div>
    </div>
  );
};

export default LandingPage;
