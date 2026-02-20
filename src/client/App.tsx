import { useState } from 'react';
import './App.css';
import Faqs from './components/Faqs/Faqs';
import SearchBar from './components/Searchbar/SearchBar';
import TrustCenter from './components/TrustCenter/TrustCenter';
import MultiSelect from './components/Searchbar/MultiSelect';

export default function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleFilterChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  return (
    <div className="trustFaqs_page">
      <MultiSelect onFilterChange={handleFilterChange} />

      <div className="trustFaqs_grid">
        <section className="trustFaqs_col" aria-label="Trust Center">
          <TrustCenter selectedCategories={selectedCategories} />
        </section>
        <section className="trustFaqs_col" aria-label="FAQs">
          <Faqs selectedCategories={selectedCategories} />
        </section>
      </div>
    </div>
  );
}
