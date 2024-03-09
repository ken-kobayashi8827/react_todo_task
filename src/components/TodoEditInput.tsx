import { Input, Textarea, FormControl, Button, Box } from '@chakra-ui/react';
import { useState } from 'react';
import type { EditTodoType } from '../types';
import { ja } from 'date-fns/locale/ja';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.css';

type Props = {
  title: string;
  detail: string;
  endDate: Date;
  documentId: string;
  editTodo: EditTodoType;
  handleEdit: () => void;
};

const TodoEditInput = ({
  title,
  detail,
  endDate,
  documentId,
  editTodo,
  handleEdit,
}: Props) => {
  const [editTitle, setEditTitle] = useState<string>(title);
  const [editDetail, setEditDetail] = useState<string>(detail);
  const [editEndDate, setEditEndDate] = useState<Date>(new Date(endDate));
  registerLocale('ja', ja);

  const handleCompleteEdit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    editTodo(documentId, editTitle, editDetail, editEndDate);
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
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setEditTitle(e.target.value)
          }
        />
        <Textarea
          borderColor='black'
          fontSize='lg'
          value={detail}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
            setEditDetail(e.target.value)
          }
        />
        <Box>
          期日:{' '}
          <DatePicker
            locale='ja'
            selected={endDate}
            dateFormat='yyyy/MM/dd'
            onChange={(selectedDate: Date): void =>
              setEditEndDate(selectedDate)
            }
          />
        </Box>
        <Button type='submit' w='100%' mt='2' colorScheme='teal'>
          編集完了
        </Button>
      </FormControl>
    </form>
  );
};

export default TodoEditInput;
