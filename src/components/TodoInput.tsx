import { Input, Button, VStack, Textarea, Text } from '@chakra-ui/react';
import { useState } from 'react';
import type { AddTodoType } from '../types';
import { ja } from 'date-fns/locale/ja';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.css';
import { useForm, SubmitHandler } from 'react-hook-form';

type Props = {
  addTodo: AddTodoType;
};

type Inputs = {
  title: string;
  detail: string;
};

registerLocale('ja', ja);

const TodoInput = ({ addTodo }: Props) => {
  const [endDate, setEndDate] = useState<Date>(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    addTodo(data.title, data.detail, endDate);
    setEndDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack alignItems='left'>
        <Input
          w='100%'
          type='text'
          placeholder='タスクを入力してください。'
          {...register('title', { required: true })}
        />
        {errors.title && (
          <Text pl='2' color='red'>
            ※TODOの入力は必須です。
          </Text>
        )}
        <Textarea
          placeholder='タスクの詳細を入力してください。'
          {...register('detail', {
            maxLength: { value: 150, message: '150文字以内で入力してください' },
          })}
        />
        {errors.detail && (
          <Text pl='2' color='red'>
            {errors.detail.message}
          </Text>
        )}
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
