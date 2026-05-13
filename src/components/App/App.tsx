import { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteNote, fetchNotes } from '../../services/noteService';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [searchQuery, setSearchQuery] = useState<string>('');

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['query', searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
    enabled: searchQuery !== '',
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const handleChange = (query: string) => {
    if (!query.trim()) {
      toast.error('Please, enter your search query!');
    }
    setSearchQuery(query.trim().toLowerCase());
    setCurrentPage(1);
  };

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['query', searchQuery, currentPage],
      });

      return toast.success('Successfully deleted task');
    },
    onError: () => {
      return toast.error('Error');
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
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
      {data && <NoteList notes={data.notes} onDelete={handleDelete} />}
      {isLoading && <p>Loading</p>}
      {isError && <p>Error</p>}
      <Toaster />
    </div>
  );
}

export default App;
