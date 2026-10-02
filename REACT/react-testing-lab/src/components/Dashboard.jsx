import React from 'react';

function Chart({ number }) {
  return <div>Chart {number}</div>;
}

function Dashboard() {
  return (
    <div>
      <h1>Title</h1>

      {Array.from({ length: 10 }, (_, index) => (
        <Chart key={index} number={index + 1} />
      ))}
    </div>
  );
}

export default Dashboard;