import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';

const NoteForm = () => {
  const initialValues = {
    title: '',
    content: '',
    tag: 'work',
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
        ['work', 'personal', 'meeting', 'shopping', 'todo'],
        'Invalid value'
      )
      .required('Tag is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
      validationSchema={Schema}
    >
      <Form className={css.form}>
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
          <button type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            // disabled=false
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
