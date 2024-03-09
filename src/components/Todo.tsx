import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import Filter from './Filter';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  DocumentData,
  SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';
import { TYPE_STATUS } from '../todoStatus';
import { VStack } from '@chakra-ui/react';
import type {
  TodoType,
  AddTodoType,
  DeleteTodoType,
  EditTodoType,
  ChangeStatusType,
  convertTodoType,
} from '../types';

const todoConverter = {
  toFirestore: (todo: TodoType) => {
    return {
      id: todo.id,
      title: todo.title,
      status: todo.status,
      detail: todo.detail,
      endDate: todo.endDate,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  },
  fromFirestore: (
    snapshot: DocumentData,
    options: SnapshotOptions
  ): convertTodoType => {
    const data = snapshot.data(options);

    return {
      id: data.id,
      title: data.title,
      status: data.status,
      detail: data.detail,
      endDate:
        data.endDate instanceof Timestamp
          ? data.endDate.toDate().toLocaleDateString()
          : null,
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toLocaleDateString()
          : null,
      updatedAt:
        data.updatedAt instanceof Timestamp
          ? data.updatedAt.toDate().toLocaleDateString()
          : null,
    };
  },
};

const Todo = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  //TODO: 仮数値100を指定しているので後で修正
  const [filterStatus, setFilterStatus] = useState<number>(100);
  const [filterEndDate, setFilterEndDate] = useState<Date>(new Date());

  // 初回マウント時にFirebaseからTodo取得
  useEffect(() => {
    // Cloud Firestoreデータベース内のコレクションtodosを参照
    const todosCollectionRef = collection(db, 'todos').withConverter(
      todoConverter
    );

    // クエリ実行
    const q = query(todosCollectionRef, orderBy('id', 'desc'));

    onSnapshot(q, (querySnapShot) => {
      const newTodos: TodoType[] = querySnapShot.docs.map((doc) => ({
        documentId: doc.id,
        ...doc.data(),
      }));
      setTodos(newTodos);
    });
  }, []);

  // 追加
  const addTodo: AddTodoType = async (inputTitle, inputDetail, endDate) => {
    // Firebaseにデータ追加
    try {
      await addDoc(collection(db, 'todos').withConverter(todoConverter), {
        id: todos.length + 1,
        title: inputTitle,
        status: 0,
        detail: inputDetail,
        endDate: endDate,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      });
      console.log('Success adding Document');
    } catch (e) {
      console.error('Error adding document:', e);
    }
  };

  // 削除
  const deleteTodo: DeleteTodoType = async (documentId) => {
    try {
      // ステータスを99に変更
      const todoDocumentRef = doc(db, 'todos', documentId).withConverter(
        todoConverter
      );
      await updateDoc(todoDocumentRef, {
        status: 99,
      });
      console.log('Complate Delete Todo DocumentId:', documentId);
    } catch (e) {
      console.error('Error deleting todo:', e);
    }
  };

  // ステータス変更
  const changeStatus: ChangeStatusType = async (documentId, changedStatus) => {
    try {
      const todoDocumentRef = doc(db, 'todos', documentId).withConverter(
        todoConverter
      );
      await updateDoc(todoDocumentRef, {
        status: changedStatus,
        updatedAt: Timestamp.fromDate(new Date()),
      });
      console.log('Complate Change Todo DocumentId:', documentId);
    } catch (e) {
      console.error('Error changing status:', e);
    }
  };

  // 編集
  const editTodo: EditTodoType = async (
    documentId,
    editTitle,
    editDetail,
    editEndDate
  ) => {
    try {
      const todoDocumentRef = doc(db, 'todos', documentId).withConverter(
        todoConverter
      );
      await updateDoc(todoDocumentRef, {
        title: editTitle,
        detail: editDetail,
        endDate: editEndDate,
        updatedAt: Timestamp.fromDate(new Date()),
      });
      console.log('Complate Change Todo DocumentId:', documentId);
    } catch (e) {
      console.error('Error editing todo:', e);
    }
  };

  // ステータスフィルタリング
  const statusFilteredTodos = (todo: TodoType) => {
    switch (filterStatus) {
      case TYPE_STATUS.INCOMPLETE:
        return todo.status === TYPE_STATUS.INCOMPLETE;
      case TYPE_STATUS.PROGRESS:
        return todo.status === TYPE_STATUS.PROGRESS;
      case TYPE_STATUS.COMPLETE:
        return todo.status === TYPE_STATUS.COMPLETE;
      default:
        return (
          todo.status !== TYPE_STATUS.DELETED &&
          todo.status !== TYPE_STATUS.COMPLETE
        );
    }
  };

  // 期限フィルタリング
  const dateFilteredTodos = (todo: TodoType) => {
    const todoEndDate = new Date(todo.endDate);
    return todoEndDate > filterEndDate;
  };

  return (
    <>
      <TodoInput addTodo={addTodo} />
      <Filter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterEndDate={filterEndDate}
        setFilterEndDate={setFilterEndDate}
      />
      <VStack mt='5'>
        {todos
          .filter((todo) => statusFilteredTodos(todo))
          .filter((todo) => dateFilteredTodos(todo))
          .map((todo) => (
            <TodoItem
              key={todo.documentId}
              todo={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              changeStatus={changeStatus}
            />
          ))}
      </VStack>
    </>
  );
};

export default Todo;
