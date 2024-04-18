import { Priority } from '../types/priority';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const colors = {
  [Priority.Low]: { color: 'orange' },
  [Priority.Minor]: { color: 'blue' },
  [Priority.High]: { color: 'red' },
};

export const PRIORITY_ICONS = {
  [Priority.Low]: (
    <KeyboardDoubleArrowDownIcon sx={colors[Priority.Low]} fontSize='small' />
  ),
  [Priority.Minor]: (
    <KeyboardArrowUpIcon sx={colors[Priority.Minor]} fontSize='small' />
  ),
  [Priority.High]: (
    <KeyboardDoubleArrowUpIcon sx={colors[Priority.High]} fontSize='small' />
  ),
};
