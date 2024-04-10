import { Priority } from "../types/priority";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const priorityIcons = {
  [Priority.Low]: (
    <KeyboardDoubleArrowDownIcon sx={{ color: 'orange' }} fontSize='small' />
  ),
  [Priority.Minor]: (
    <KeyboardArrowUpIcon sx={{ color: 'blue' }} fontSize='small' />
  ),
  [Priority.High]: (
    <KeyboardDoubleArrowUpIcon sx={{ color: 'red' }} fontSize='small' />
  ),
};