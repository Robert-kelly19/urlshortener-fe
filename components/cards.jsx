// src/components/Cards.jsx

import React from "react";

export default function Cards({ url }) {
  if (!url) return null;

  const {
    short = "N/A",
    long = "N/A",
    created,
    expires,
    click = 0,
  } = url;

  return (
    <div className="cards">
      <h1>
        Shortlink:{" "}
        <a href={short} target="_blank" rel="noopener noreferrer">
          {short}
        </a>
      </h1>
      <h4>LongLink: {long}</h4>
      <p>Date Created: {created ? new Date(created).toLocaleDateString() : "N/A"}</p>
      <p>Expiring Date: {expires ? new Date(expires).toLocaleDateString() : "N/A"}</p>
      <p>Number of Clicks: {click}</p>
    </div>
  );
}
