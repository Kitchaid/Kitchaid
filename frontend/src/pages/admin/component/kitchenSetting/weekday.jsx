import React, { useState } from 'react';

const WeekdaySelector = () => {
  const [weekdays, setWeekdays] = useState([
    { name: 'Måndag', chosen: false },
    { name: 'Tisdag', chosen: false },
    { name: 'Onsdag', chosen: false },
    { name: 'Torsdag', chosen: false },
    { name: 'Fredag', chosen: false },
    { name: 'Lördag', chosen: false },
    { name: 'Söndag', chosen: false },
  ]);

  const [chosenWeekdays, setChosenWeekdays] = useState([]);

  const toggleSelection = (index) => {
    const updatedWeekdays = [...weekdays];
    updatedWeekdays[index].chosen = !updatedWeekdays[index].chosen;

    setWeekdays(updatedWeekdays);

    if (updatedWeekdays[index].chosen) {
      setChosenWeekdays([...chosenWeekdays, updatedWeekdays[index]]);
    } else {
      const filteredChosenWeekdays = chosenWeekdays.filter(
        (day) => day.name !== updatedWeekdays[index].name
      );
      setChosenWeekdays(filteredChosenWeekdays);
    }
  };

  return (
    <div>
      <h2>Choose Weekdays</h2>
      <ul>
        {weekdays.map((day, index) => (
          <li
            key={index}
            style={{ cursor: 'pointer', textDecoration: day.chosen ? 'line-through' : 'none' }}
            onClick={() => toggleSelection(index)}
          >
            {day.name}
          </li>
        ))}
      </ul>
      <h3>Chosen Weekdays:</h3>
      <ul>
        {chosenWeekdays.map((day, index) => (
          <li key={index}>{day.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default WeekdaySelector;
