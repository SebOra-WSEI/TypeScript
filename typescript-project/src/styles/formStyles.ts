import { commonStyles } from './commonStyles';

const inputFieldBasicStyles = {
  ...commonStyles.inputMovedToEnd,
  alignItems: 'center',
};

export const formStyles = {
  formControl: {
    marginTop: '1.5rem',
    width: '9rem',
  },
  gridContainer: {
    width: '60rem',
  },
  centeredHeader: {
    display: 'flex',
    justifyContent: 'center',
  },
  titleText: {
    width: '20rem',
  },
  reporterField: inputFieldBasicStyles,
  descriptionField: {
    marginTop: '4rem',
  },
  statusField: {
    ...inputFieldBasicStyles,
    marginTop: '1.3rem',
    paddingRight: '0.6rem',
  },
  selectorField: commonStyles.inputMovedToEnd,
  assignedToField: {
    ...inputFieldBasicStyles,
    marginTop: '1.3rem',
    paddingRight: '0.2rem',
  },
  priorityField: {
    ...inputFieldBasicStyles,
    marginTop: '1.3rem',
  },
  menuItem: {
    marginLeft: '0.5rem',
  },
};
