import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  getDocs,
  collection,
  orderBy,
  query,
  addDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';

export type TodoType = {
  id: number;
  documentId: string;
  title: string;
  status: number;
  detail: string;
};

export type AddTodoType = (inputTitle: string, inputDetail: string) => void;
export type DeleteTodoType = (documentId: string) => void;
export type ChangeStatusType = (documentId: string, status: number) => void;

const Todo = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  // 初回マウント時にFirebaseからTodo取得
  useEffect(() => {
    // Cloud Firestoreデータベース内のコレクションtodosを参照
    const todosCollectionRef = collection(db, 'todos');
    // クエリ実行
    const q = query(todosCollectionRef, orderBy('id', 'desc'));
    getDocs(q).then((querySnapshot) => {
      const newTodos: TodoType[] = [];
      querySnapshot.docs.map((doc) => {
        const data = doc.data();
        newTodos.push({
          id: data.id,
          documentId: doc.id,
          title: data.title,
          status: data.status,
          detail: data.detail,
        });
      });
      setTodos((prev) => [...prev, ...newTodos]);

      console.log('Get TodoList');
    });
  }, []);

  // TODO追加
  const addTodo: AddTodoType = async (inputTitle, inputDetail) => {
    // Firebaseにデータ追加
    try {
      await addDoc(collection(db, 'todos'), {
        id: todos.length + 1,
        title: inputTitle,
        status: 0,
        detail: inputDetail,
      });
      console.log('Success adding Document');
    } catch (e) {
      console.error('Error adding document:', e);
    }
  };

  // TODO削除
  const deleteTodo: DeleteTodoType = async (documentId) => {
    // TODOのステータスを99に変更
    console.log('Delete Todo DocumentId:', documentId);
    const todoDocumentRef = doc(db, 'todos', documentId);
    await updateDoc(todoDocumentRef, {
      status: 99,
    });
    console.log('Complate Delete Todo DocumentId:', documentId);
  };

  // ステータス変更
  const changeStatus: ChangeStatusType = async (documentId, changedStatus) => {
    console.log('Change Todo DocumentId:', documentId);
    const todoDocumentRef = doc(db, 'todos', documentId);
    await updateDoc(todoDocumentRef, {
      status: changedStatus,
    });
    console.log(
      'Complate Change Todo DocumentId:',
      documentId,
      'Status:',
      changedStatus
    );
  };

  return (
    <>
      <TodoInput addTodo={addTodo} />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        changeStatus={changeStatus}
      />
    </>
  );
};

export default Todo;
