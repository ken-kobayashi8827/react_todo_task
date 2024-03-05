import { Timestamp } from 'firebase/firestore';

export type convertTodoType = {
  id: number;
  title: string;
  status: number;
  detail: string;
  createdAt: string | null;
};

export type TodoType = {
  id: number;
  documentId: string;
  title: string;
  status: number;
  detail: string;
  createdAt: string | null;
};
export type AddTodoType = (inputTitle: string, inputDetail: string) => void;
export type DeleteTodoType = (documentId: string) => void;
export type EditTodoType = (
  documentId: string,
  editTitle: string,
  editDetail: string
) => void;
export type ChangeStatusType = (documentId: string, status: number) => void;
export type SetFilterStatus = (newSelect: number) => void;
export type Options = {
  label: string;
  value: number;
};
