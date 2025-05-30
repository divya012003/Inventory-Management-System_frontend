import React from "react";
import Register from "./Register";

const Home = () => {
  return (
    <>
      <style>{`
        .home-container {
          max-width: 900px;
          margin: 4rem auto;
          padding: 0 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #1e40af;
          text-align: center;
        }
        .home-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .home-subtitle {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: #374151;
        }
        .cta-button {
          background-color: #1e40af;
          color: white;
          padding: 0.8rem 2rem;
          font-weight: 600;
          font-size: 1.1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }
        .cta-button:hover {
          background-color: #2563eb;
        }
      `}</style>

      <main className="home-container">
        <h1 className="home-title">Welcome to MyStore!</h1>
        <p className="home-subtitle">
          Your one-stop shop for the best products. Browse, wishlist, and add your favorites.
        </p>
        
       
        <Register/>
      </main>
    </>
  );
};

export default Home;
