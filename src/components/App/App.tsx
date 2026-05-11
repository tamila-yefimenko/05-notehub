import { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['query', searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
    enabled: searchQuery !== '',
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const handleChange = (query: string) => {
    if (!query.trim) {
      toast.error('Please, enter your search query!');
    }
    setSearchQuery(query.trim().toLowerCase());
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChange} />
        {totalPages > 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button>Create note +</button>
      </header>
      {data && <NoteList notes={data.notes} />}
      {isLoading && <p>Loading</p>}
      {isError && <p>Error</p>}
      <Toaster />
    </div>
  );
}

export default App;
