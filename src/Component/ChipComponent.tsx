import React, { useState } from 'react';
import './index.css';

interface Props {
  items: string[];
}

const ChipComponent: React.FC<Props> = ({ items }) => {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState(items);
  const [highlightedChip, setHighlightedChip] = useState(-1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSuggestions(items.filter(item => item.toLowerCase().includes(e.target.value.toLowerCase()) && !chips.includes(item)));
    setHighlightedChip(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && inputValue === '' && chips.length > 0) {
      if (highlightedChip === -1) {
        // Highlight the last chip
        setHighlightedChip(chips.length - 1);
      } else {
        // Remove the highlighted chip
        removeChip(chips[highlightedChip]);
        setHighlightedChip(-1);
      }
    }
  };

  const addChip = (item: string) => {
    setChips(prevChips => [...prevChips, item]);
    setInputValue('');
    setSuggestions(suggestions.filter(suggestion => suggestion !== item));
    setHighlightedChip(-1);
  };

  const removeChip = (chip: string) => {
    setChips(chips.filter(c => c !== chip));
    setSuggestions([...suggestions, chip]);
    setHighlightedChip(-1);
  };

  return (
    <div className="chip-component">
      <div className="chip-container">
        {chips.map((chip, index) => (
          <div
            className={`chip ${index === highlightedChip ? 'highlighted' : ''}`}
            key={chip}
          >
            {chip}
            <span className="close-icon" onClick={() => removeChip(chip)}>
              X
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type to search actors"
        className="input-field"
      />
      {inputValue && (
        <ul className="suggestions">
          {suggestions.map(item => (
          <li key={item} onClick={() => addChip(item)}>
               <img src={`https://robohash.org/${item}`} alt={item} className="robot-icon" /> 
          {item}
        </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChipComponent;
