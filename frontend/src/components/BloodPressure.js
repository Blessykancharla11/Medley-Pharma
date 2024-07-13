import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BloodPressure = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/blood-pressure')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching blood pressure items:', error);
      });
  }, []);

  return (
    <div>
      <h2>Blood Pressure</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BloodPressure;
