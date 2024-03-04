import { Input, Button, VStack, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import type { AddTodoType } from './Todo';

type Props = {
  addTodo: AddTodoType;
};

const TodoInput = ({ addTodo }: Props) => {
  const [todoInput, setTodoInput] = useState<string>('');
  const [todoDetailInput, setTodoDetailInput] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addTodo(todoInput, todoDetailInput);
    setTodoInput('');
    setTodoDetailInput('');
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
        <Button type='submit' w='100%' colorScheme='teal'>
          追加
        </Button>
      </VStack>
    </form>
  );
};

export default TodoInput;
