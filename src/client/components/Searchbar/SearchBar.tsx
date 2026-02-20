import './SearchBar.css';

import MultiSelect from './MultiSelect';
// REVIEW: Entire file is dead code - onFilterChange throws, input unwired, never rendered

const SearchBar = () => {
  return (
    <div className="searchbar">
      <input
        type="text"
        id="s"
        placeholder="Search for keywords and filter info from the FAQ and Trust Control..."
      />
      <MultiSelect
        onFilterChange={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
};

export default SearchBar;
