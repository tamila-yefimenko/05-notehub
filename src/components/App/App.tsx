import { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <button>Create note +</button>
      </header>
    </div>
  );
}

export default App;
