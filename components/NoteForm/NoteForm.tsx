"use client";

import css from "./NoteForm.module.css";
import type { NoteCreate } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api"; 
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

interface NoteFormProps {
  onClose?: () => void;
}


type FormValues = {
  title: string;
  content: string;
  tag: "" | NoteCreate["tag"]; 
};

const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required("Title is required")
    .min(3, "Title must be 3 characters or more")
    .max(50, "Title must be 50 characters or less"),
  content: Yup.string()
    .trim()
    .notRequired()
    .max(500, "Content must be 500 characters or less"),
  tag: Yup.mixed<NoteCreate["tag"]>()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Please select a valid tag")
    .required("Tag is required"),
});


export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: (note: NoteCreate) => createNote(note),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["notes"] }); 
    if (onClose) onClose(); 
  },
});


  return (
    <Formik<FormValues>
      initialValues={{
        title: "",
        content: "",
        tag: "", 
      }}
      validationSchema={NoteSchema}
      onSubmit={(values, 
        { resetForm }: FormikHelpers<FormValues>) => {
          mutation.mutate(values as NoteCreate);
      resetForm();
      }}
    >
      {() => (
        <Form className={css.form}>
          <Field
            className={css.input}
            type="text"
            name="title"
            placeholder="Title"
          />
          <ErrorMessage name="title" component="div" className={css.error} />
          <Field
            as="textarea"
            className={css.textarea}
            name="content"
            placeholder="Content"
          />
          <ErrorMessage name="content" component="div" className={css.error} />
          <Field as="select" name="tag" className={css.select}>
            <option value="">Select tag</option>
            <option value="Todo">Todo</option>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="div" className={css.error} />

          <button className={css.submitButton} type="submit">
            Create Note
          </button>
          {onClose && (
          <button type="button" className={css.cancelButton} onClick={onClose}>
         Cancel
  </button>
)}
        </Form>
      )}
    </Formik>
  );
}
