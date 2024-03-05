import { TYPE_STATUS } from '../todoStatus';
import type { SetFilterStatus, Options } from '../types';
import { Select, Heading, Box } from '@chakra-ui/react';

const options: Options[] = [
  {
    label: '全て',
    value: 100, // TODO: 仮数値なので後で修正,
  },
  {
    label: '未完了',
    value: TYPE_STATUS.INCOMPLETE,
  },
  {
    label: '進行中',
    value: TYPE_STATUS.PROGRESS,
  },
  {
    label: '完了',
    value: TYPE_STATUS.COMPLETE,
  },
];

type Props = {
  filterStatus: number;
  setFilterStatus: SetFilterStatus;
};

const Filter = ({ filterStatus, setFilterStatus }: Props) => {
  const handleChangeSelect = (newSelect: number): void => {
    setFilterStatus(newSelect);
  };

  return (
    <Box mt='5' p='3' border='1px solid black'>
      <Heading as='h2' size='md' mb='3'>
        絞り込み
      </Heading>
      <Select
        bg='white'
        w='25%'
        value={filterStatus}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
          handleChangeSelect(parseInt(e.target.value))
        }
      >
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default Filter;
