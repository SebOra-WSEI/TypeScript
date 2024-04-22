import { commonStyles } from './commonStyles';

export const formStyles = {
  formControl: {
    marginTop: '1.5rem',
    width: '9rem',
  },
  gridContainer: {
    width: '60rem',
  },
  header: commonStyles.header,
  titleText: {
    width: '20rem',
  },
  reporterField: {
    ...commonStyles.inputField,
    alignItems: 'center',
  },
  descriptionField: {
    marginTop: '4rem',
  },
  statusField: {
    ...commonStyles.inputField,
    alignItems: 'center',
    marginTop: '1.3rem',
    paddingRight: '0.6rem',
  },
  selectorField: commonStyles.inputField,
  assignedToField: {
    ...commonStyles.inputField,
    alignItems: 'center',
    marginTop: '1.3rem',
    paddingRight: '0.2rem',
  },
  priorityField: {
    ...commonStyles.inputField,
    alignItems: 'center',
    marginTop: '1.3rem',
  },
  menuItem: {
    marginLeft: '0.5rem',
  },
};
