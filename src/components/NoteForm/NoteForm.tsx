import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';
import { useEffect } from 'react';
import type { NewNote, NoteTag } from '../../types/note';

interface NoteFormProps {
  onClose: () => void;
  onCreate: (newNote: NewNote) => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const NoteForm = ({ onClose, onCreate }: NoteFormProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const initialValues: FormValues = {
    title: '',
    content: '',
    tag: 'Work',
  };

  const Schema = Yup.object().shape({
    title: Yup.string()
      .min(2, 'Title must be at least 2 symbols')
      .max(30, 'Too long')
      .required('Title is required'),
    content: Yup.string()
      .min(2, 'Content must be at least 2 symbols')
      .max(60, 'Too long')
      .required('Content is required'),
    tag: Yup.string()
      .oneOf(
        ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'],
        'Invalid value'
      )
      .required('Tag is required'),
  });

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    onCreate({
      title: values.title,
      content: values.content,
      tag: values.tag,
    });
    actions.resetForm();

    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Schema}
    >
      <Form className={css.form} onClick={e => e.stopPropagation()}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
