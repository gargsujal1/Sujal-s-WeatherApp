import React from "react";

function DemoCities({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Mumbai",
    },
    {
      id: 2,
      title: "London",
    },
    {
      id: 3,
      title: "Paris",
    },
    {
      id: 4,
      title: "Detroit",
    },
  ];

  return (
    <div className="flex items-center justify-evenly my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-lg font-medium "
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default DemoCities;
