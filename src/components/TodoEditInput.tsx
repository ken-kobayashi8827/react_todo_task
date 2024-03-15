import {
  Input,
  Textarea,
  FormControl,
  Button,
  Box,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import type { EditTodoType } from '../types';
import { ja } from 'date-fns/locale/ja';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.css';
import { useForm, SubmitHandler } from 'react-hook-form';

type Props = {
  title: string;
  detail: string;
  endDate: Date;
  documentId: string;
  editTodo: EditTodoType;
  handleEdit: () => void;
};

type Inputs = {
  title: string;
  detail: string;
};

registerLocale('ja', ja);

const TodoEditInput = ({
  title,
  detail,
  endDate,
  documentId,
  editTodo,
  handleEdit,
}: Props) => {
  const [editEndDate, setEditEndDate] = useState<Date>(new Date(endDate));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: { title: title, detail: detail },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    editTodo(documentId, data.title, data.detail, editEndDate);
    handleEdit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl pt='2'>
        <Input
          fontSize='xl'
          fontWeight='bold'
          borderColor='black'
          mb='2'
          type='text'
          {...register('title', { required: true })}
        />
        {errors.title && (
          <Text pl='2' color='red'>
            ※TODOの入力は必須です。
          </Text>
        )}
        <Textarea
          borderColor='black'
          fontSize='lg'
          {...register('detail', {
            maxLength: { value: 150, message: '150文字以内で入力してください' },
          })}
        />
        {errors.detail && (
          <Text pl='2' color='red'>
            {errors.detail.message}
          </Text>
        )}
        <Box>
          期日:{' '}
          <DatePicker
            locale='ja'
            selected={editEndDate}
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
