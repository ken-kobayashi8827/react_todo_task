import type { TodoType, DeleteTodoType, ChangeStatusType } from './Todo';
import StatusSelect from './StatusSelect';
import { Box, VStack, Button } from '@chakra-ui/react';
import { TYPE_STATUS } from '../todoStatus';

type Props = {
  todos: TodoType[];
  deleteTodo: DeleteTodoType;
  changeStatus: ChangeStatusType;
};

const TodoList = ({ todos, deleteTodo, changeStatus }: Props) => {
  return (
    <VStack mt='5'>
      {todos
        .filter(
          (todo) =>
            todo.status !== TYPE_STATUS.DELETED &&
            todo.status !== TYPE_STATUS.COMPLETE
        )
        .map((todo) => {
          return (
            <Box key={todo.documentId} bg='yellow.200' w='100%'>
              {todo.title}
              <StatusSelect
                todoStatus={todo.status}
                changeStatus={changeStatus}
                documentId={todo.documentId}
              />
              {todo.detail}
              <Button
                w='15%'
                colorScheme='red'
                onClick={() => deleteTodo(todo.documentId)}
              >
                削除
              </Button>
            </Box>
          );
        })}
    </VStack>
  );
};

export default TodoList;
