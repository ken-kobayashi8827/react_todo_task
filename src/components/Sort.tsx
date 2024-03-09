import {
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
} from '@chakra-ui/react';

type Props = {
  sort: string;
  setSort: (sort: string) => void;
};

type RadioValue = {
  label: string;
  value: string;
};

const RADIO_VALUES: RadioValue[] = [
  { label: 'ID', value: 'id' },
  { label: '期日', value: 'endDate' },
];

const Sort = ({ sort, setSort }: Props) => {
  const changeRadioBtn = (value: string): void => {
    setSort(value);
  };

  return (
    <FormControl mt='5'>
      <FormLabel>ソート</FormLabel>
      <RadioGroup defaultValue={sort} onChange={changeRadioBtn}>
        <HStack spacing='24px'>
          {RADIO_VALUES.map((radioValue) => (
            <Radio key={radioValue.value} value={radioValue.value}>
              {radioValue.label}
            </Radio>
          ))}
        </HStack>
      </RadioGroup>
    </FormControl>
  );
};

export default Sort;
