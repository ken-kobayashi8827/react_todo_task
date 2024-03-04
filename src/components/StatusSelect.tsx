import { Select } from '@chakra-ui/react';
import type { ChangeStatusType } from './Todo';
import { useState } from 'react';
import { TYPE_STATUS } from '../todoStatus';

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
  changeStatus: ChangeStatusType;
  documentId: string;
};

const StatusSelect = ({ todoStatus, changeStatus, documentId }: Props) => {
  const [currentSelected, setCurrentSelected] = useState<number>(todoStatus);

  const handleChangeSelect = (newSelect: number): void => {
    changeStatus(documentId, newSelect);
    setCurrentSelected(newSelect);
  };

  return (
    <Select
      bg='white'
      w='25%'
      value={currentSelected}
      onChange={(e) => handleChangeSelect(parseInt(e.target.value))}
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
