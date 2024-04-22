import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { formStyles } from '../../../styles/formStyles';
import { Priority } from '../../../types/priority';
import { PRIORITY_ICONS } from '../../../utils/priorityIcons';

type ExtendedGlobalType<T> = T & { priority: Priority }

interface PriorityInputProps<TX> {
  item: TX;
  setItem: (value: TX) => void;
  isLabelEnabled?: boolean
}

export function PriorityInput<T>({
  item,
  setItem,
  isLabelEnabled
}: PriorityInputProps<ExtendedGlobalType<T>>) {

  return (
    <FormControl sx={formStyles.prioritySelect} size='small' >
      {isLabelEnabled && (<InputLabel>Priority</InputLabel>)}
      <Select
        value={item.priority}
        {...(isLabelEnabled && {
          label: 'Priority'
        })}
        onChange={(evt) =>
          setItem({
            ...item,
            priority: evt.target.value as Priority,
          })
        }
      >
        {Object.values(Priority).map((p) => (
          <MenuItem key={p} value={p}>
            <span>{PRIORITY_ICONS[p]}</span>
            <span style={formStyles.menuItem}>{p}</span>
          </MenuItem>
        ))}
      </Select>
    </FormControl >
  );
}

