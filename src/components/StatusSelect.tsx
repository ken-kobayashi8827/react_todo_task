import { Select } from '@chakra-ui/react';
import { useState } from 'react';

const TYPE_STATUS = {
  INCOMPLETE: 0,
  PROGRESS: 1,
  COMPLETE: 2,
} as const;

type Options = {
  label: string;
  value: number;
};

const options: Options[] = [
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
  todoStatus: number;
};

const StatusSelect = ({ todoStatus }: Props) => {
  const [currentSelected, setCurrentSelected] = useState<number>(todoStatus);

  const changeSelect = (newSelect: number): void => {
    setCurrentSelected(newSelect);
  };

  // TODO ステータス変更処理追加

  return (
    <Select
      bg='white'
      w='25%'
      value={currentSelected}
      onChange={(e) => changeSelect(parseInt(e.target.value))}
    >
      {options.map((option) => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default StatusSelect;
