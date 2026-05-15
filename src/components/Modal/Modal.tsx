import type { NewNote } from '../../types/note';
import NoteForm from '../NoteForm/NoteForm';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
  onClose: () => void;
  onCreate: (newNote: NewNote) => void;
}

const Modal = ({ onClose, onCreate }: ModalProps) => {
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={css.modal}>
        <NoteForm onClose={onClose} onCreate={onCreate} />
      </div>
    </div>,
    document.body
  );
};

export default Modal;
