import ChipComponent from './Component/ChipComponent';
import React from 'react';
const mockData = [
  'Nick Giannopoulos',
  'Sawant Anand',
  'Narayana Gamer',
  'Shivam Kumar',
  'Aman Kumar',
  'Anita Gros',
  'Marina Augustine',
  'Megan Smith',
];

function App() {
  return (
    <div className="App">
      <h1>Chip Component </h1>
      <h3>type these names to search </h3>
      <ul>
  {mockData.map(item => (
    <li key={item}>{item}</li>
  ))}
</ul>
      <ChipComponent items={mockData} />
    </div>
  );
}

export default App;
