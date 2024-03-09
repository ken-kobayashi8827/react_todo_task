import { Timestamp } from 'firebase/firestore';

export type convertTodoType = {
  id: number;
  title: string;
  status: number;
  detail: string;
  endDate: Date;
  createdAt: string | null;
  updatedAt: string | null;
};

export type TodoType = {
  id: number;
  documentId: string;
  title: string;
  status: number;
  detail: string;
  endDate: Date;
  createdAt: string | null;
  updatedAt: string | null;
};
export type AddTodoType = (
  inputTitle: string,
  inputDetail: string,
  date: Date
) => void;
export type DeleteTodoType = (documentId: string) => void;
export type EditTodoType = (
  documentId: string,
  editTitle: string,
  editDetail: string,
  endDate: Date
) => void;
export type ChangeStatusType = (documentId: string, status: number) => void;
export type SetFilterStatus = (newSelect: number) => void;
export type SetFilterEndDate = (selectedDate: Date) => void;
export type Options = {
  label: string;
  value: number;
};
