import { Input, Button, VStack, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import type { AddTodoType } from '../types';
import { ja } from 'date-fns/locale/ja';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.css';

type Props = {
  addTodo: AddTodoType;
};

const TodoInput = ({ addTodo }: Props) => {
  const [todoInput, setTodoInput] = useState<string>('');
  const [todoDetailInput, setTodoDetailInput] = useState<string>('');
  const [endDate, setEndDate] = useState<Date>(new Date());
  registerLocale('ja', ja);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addTodo(todoInput, todoDetailInput, endDate);
    setTodoInput('');
    setTodoDetailInput('');
    setEndDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack>
        <Input
          w='100%'
          type='text'
          placeholder='タスクを入力してください。'
          value={todoInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setTodoInput(e.target.value)
          }
        />
        <Textarea
          placeholder='タスクの詳細を入力してください。'
          value={todoDetailInput}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
            setTodoDetailInput(e.target.value)
          }
        />
        <DatePicker
          locale='ja'
          selected={endDate}
          dateFormat='yyyy/MM/dd'
          onChange={(selectedDate: Date): void => setEndDate(selectedDate)}
        />
        <Button type='submit' w='100%' colorScheme='teal'>
          追加
        </Button>
      </VStack>
    </form>
  );
};

export default TodoInput;
