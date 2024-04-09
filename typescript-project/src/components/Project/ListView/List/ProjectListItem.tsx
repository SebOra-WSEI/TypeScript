import { IconButton, ListItem, ListItemText, Tooltip } from '@mui/material';
import React from 'react';
import { projectPageStyles } from '../../../../styles/projectPageStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import { ProjectModel } from '../../../../types/project';
import { useHistory } from 'react-router';
import { routeBuilder } from '../../../../routes/routes';
import {
  SELECTED_PROJECT_ID,
  setToLocalStorage,
} from '../../../../utils/localStorage';

interface ProjectItemProps {
  project: ProjectModel;
  handleRemove: () => void;
}

export const ProjectListItem: React.FC<ProjectItemProps> = ({
  project,
  handleRemove,
}) => {
  const history = useHistory();

  const handleOnSelect = (): void => {
    setToLocalStorage(SELECTED_PROJECT_ID, project.id);
    history.push(routeBuilder.storages(project.id));
  };

  return (
    <ListItem sx={projectPageStyles.listItem}>
      <ListItemText
        primary={<Text field='Name' value={project.name} />}
        secondary={
          <Text field='Description' value={project?.description ?? ''} />
        }
      />
      <Tooltip title='Select project' onClick={handleOnSelect}>
        <IconButton>
          <WhereToVoteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Remove' onClick={handleRemove}>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
};

const Text: React.FC<{
  field: string;
  value: string;
}> = ({ field, value }) => (
  <span>
    <strong>{field}:</strong> {value}
  </span>
);
