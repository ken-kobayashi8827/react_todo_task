import { useState } from 'react';
import { TYPE_STATUS } from '../todoStatus';
import type { SetFilterStatus, SetFilterEndDate, Options } from '../types';
import { Select, Heading, Box } from '@chakra-ui/react';
import { ja } from 'date-fns/locale/ja';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const options: Options[] = [
  {
    label: '全て',
    value: TYPE_STATUS.ALL,
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
  filterEndDate: Date;
  setFilterEndDate: SetFilterEndDate;
};

const Filter = ({
  filterStatus,
  setFilterStatus,
  filterEndDate,
  setFilterEndDate,
}: Props) => {
  registerLocale('ja', ja);

  const handleChangeSelect = (newSelect: number): void => {
    setFilterStatus(newSelect);
  };

  const handleChangeEndDate = (selectedDate: Date): void => {
    setFilterEndDate(selectedDate);
  };

  return (
    <Box mt='5' p='3' border='1px solid black'>
      <Heading as='h2' size='md' mb='3'>
        絞り込み
      </Heading>
      <Select
        bg='white'
        w='25%'
        mb='2'
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
      <DatePicker
        locale='ja'
        selected={filterEndDate}
        dateFormat='yyyy/MM/dd'
        onChange={(selectedDate: Date): void =>
          handleChangeEndDate(selectedDate)
        }
      />
    </Box>
  );
};

export default Filter;
