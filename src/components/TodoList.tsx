import type { TodoType } from './Todo';
import StatusSelect from './StatusSelect';
import { Box, VStack } from '@chakra-ui/react';

type Props = {
  todos: TodoType[];
};

const TodoList = ({ todos }: Props) => {
  return (
    <VStack mt='5'>
      {todos.map((todo) => {
        return (
          <Box key={todo.id} bg='yellow.200' w='100%'>
            {todo.title}
            <StatusSelect todoStatus={todo.status} />
            {todo.detail}
          </Box>
        );
      })}
    </VStack>
  );
};

export default TodoList;
