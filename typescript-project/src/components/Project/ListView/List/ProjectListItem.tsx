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
import { useRemoveProject } from '../../../../queries/project/useRemoveProject';
import { ListItemHeader } from './ListItemHeader';

interface ProjectItemProps {
  project: ProjectModel;
}

export const ProjectListItem: React.FC<ProjectItemProps> = ({ project }) => {
  const history = useHistory();
  const { remove } = useRemoveProject();

  const handleOnSelect = (): void => {
    setToLocalStorage(SELECTED_PROJECT_ID, project.id);
    history.push(routeBuilder.stories(project.id));
  };

  const handleRemove = (): void => remove(project.id);

  return (
    <ListItem sx={projectPageStyles.listItem}>
      <ListItemText
        primary={<ListItemHeader field='Name' value={project.name} />}
        secondary={
          <ListItemHeader
            field='Description'
            value={project?.description ?? ''}
          />
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
