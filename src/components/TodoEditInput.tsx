import { Input, Textarea, FormControl, Button } from '@chakra-ui/react';
import { useState } from 'react';
import type { EditTodoType } from '../types';

type Props = {
  title: string;
  detail: string;
  documentId: string;
  editTodo: EditTodoType;
  handleEdit: () => void;
};

const TodoEditInput = ({
  title,
  detail,
  documentId,
  editTodo,
  handleEdit,
}: Props) => {
  const [editTitle, setEditTitle] = useState<string>('');
  const [editDetail, setEditDetail] = useState<string>('');

  const handleCompleteEdit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    editTodo(documentId, editTitle, editDetail);
    handleEdit();
  };

  return (
    <form onSubmit={handleCompleteEdit}>
      <FormControl pt='2'>
        <Input
          fontSize='xl'
          fontWeight='bold'
          borderColor='black'
          mb='2'
          type='text'
          defaultValue={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setEditTitle(e.target.value)
          }
        />
        <Textarea
          borderColor='black'
          fontSize='lg'
          defaultValue={detail}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
            setEditDetail(e.target.value)
          }
        />
        <Button type='submit' w='100%' mt='2' colorScheme='teal'>
          編集完了
        </Button>
      </FormControl>
    </form>
  );
};

export default TodoEditInput;
