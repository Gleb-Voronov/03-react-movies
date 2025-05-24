import { FormEvent } from 'react';
import styles from './SearchBar.module.css';
import { toast } from 'react-hot-toast';

interface SearchBarProps {
  action: (formData: FormData) => void;
}

const SearchBar = ({ action }: SearchBarProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const query = formData.get('query')?.toString().trim();

    if (!query) {
      toast.error('Please enter a search query.');
      return;
    }

    action(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="query"
        className={styles.input}
        placeholder="Search movies..."
        autoComplete="off"
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
