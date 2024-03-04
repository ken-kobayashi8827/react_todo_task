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
} from 'firebase/firestore';

export type TodoType = {
  id: number;
  title: string;
  status: number;
  detail: string;
};

export type AddTodoType = (inputTitle: string, inputDetail: string) => void;

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
          title: data.title,
          status: data.status,
          detail: data.detail,
        });
      });
      setTodos([...todos, ...newTodos]);
    });
  }, []);

  // TODO追加
  const addTodo: AddTodoType = async (inputTitle, inputDetail) => {
    // const newTodo: TodoType[] = [
    //   ...todos,
    //   {
    //     id: todos.length + 1,
    //     title: inputTitle,
    //     status: 0,
    //     detail: inputDetail,
    //   },
    // ];
    // setTodos(newTodo);

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

  return (
    <>
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} />
    </>
  );
};

export default Todo;
