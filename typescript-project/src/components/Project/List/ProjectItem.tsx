import {
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Tooltip,
} from '@mui/material';
import React, { useEffect } from 'react';
import { projectPageStyles } from '../../../styles/projectsPage';
import DeleteIcon from '@mui/icons-material/Delete';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import { useRemoveProject } from '../../../api/project/useRemoveProject';
import { SeverityOption } from '../../../types/severity';
import { ProjectModel } from '../../../types/project';
import { useHistory } from 'react-router';
import { routeBuilder } from '../../../routes/routes';
import {
  SELECTED_PROJECT_ID,
  setToLocalStorage,
} from '../../../utils/localStorage';

interface ProjectItemProps {
  project: ProjectModel;
  setSeverity: (value: SeverityOption) => void;
  setSeverityText: (value: string) => void;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  setSeverity,
  setSeverityText,
}) => {
  const history = useHistory();
  const { error, message, remove } = useRemoveProject();

  useEffect(() => {
    if (error) {
      setSeverity(SeverityOption.Error);
      setSeverityText(error);
    }

    if (message) {
      setSeverity(SeverityOption.Success);
      setSeverityText(message);
    }
  }, [error, message]);

  const handleOnSelect = (): void => {
    setToLocalStorage(SELECTED_PROJECT_ID, project.id);
    history.push(routeBuilder.project(project.id));
  };

  return (
    <div key={project.id}>
      <ListItem style={projectPageStyles.listItem}>
        <ListItemText
          primary={project.name}
          secondary={project.description}
          sx={projectPageStyles.listItemText}
        />
        <Tooltip title='Select project' onClick={handleOnSelect}>
          <IconButton>
            <WhereToVoteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Remove' onClick={() => remove(project.id)}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItem>
      <Divider variant='inset' />
    </div>
  );
};
