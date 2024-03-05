import type {
  TodoType,
  DeleteTodoType,
  EditTodoType,
  ChangeStatusType,
} from '../types';
import StatusSelect from './StatusSelect';
import { Box, VStack, HStack, Button, Text, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import TodoEditInput from './TodoEditInput';
import { TYPE_STATUS } from '../todoStatus';

type Props = {
  todo: TodoType;
  deleteTodo: DeleteTodoType;
  editTodo: EditTodoType;
  changeStatus: ChangeStatusType;
};

const TodoItem = ({ todo, deleteTodo, editTodo, changeStatus }: Props) => {
  const [editModeTodo, setEditModeTodo] = useState<boolean>(false);

  const handleEdit = (): void => {
    setEditModeTodo((prev) => !prev);
  };

  const getBgColor = (status: number): string => {
    switch (status) {
      case TYPE_STATUS.INCOMPLETE:
        return 'gray.200';
      case TYPE_STATUS.PROGRESS:
        return 'blue.200';
      case TYPE_STATUS.COMPLETE:
        return 'red.200';
      default:
        return 'gray.200';
    }
  };

  return (
    <Box bg={getBgColor(todo.status)} w='100%' pb='3' pl='3' pr='3'>
      <VStack alignItems='start' mb='3'>
        {editModeTodo ? (
          <TodoEditInput
            title={todo.title}
            detail={todo.detail}
            documentId={todo.documentId}
            editTodo={editTodo}
            handleEdit={handleEdit}
          />
        ) : (
          <>
            <Heading
              fontSize='xl'
              fontWeight='bold'
              borderBottom='1px solid black'
              p='3'
              w='100%'
            >
              {todo.title}
            </Heading>
            <Text fontSize='lg' w='100%' pl='3'>
              {todo.detail}
            </Text>
          </>
        )}
      </VStack>
      <HStack>
        <StatusSelect
          todoStatus={todo.status}
          changeStatus={changeStatus}
          documentId={todo.documentId}
        />
        <Button
          w='15%'
          colorScheme='red'
          onClick={() => deleteTodo(todo.documentId)}
        >
          削除
        </Button>
        {!editModeTodo && (
          <Button w='15%' colorScheme='blue' onClick={() => handleEdit()}>
            編集
          </Button>
        )}
        <Text>{todo.createdAt}</Text>
      </HStack>
    </Box>
  );
};

export default TodoItem;
