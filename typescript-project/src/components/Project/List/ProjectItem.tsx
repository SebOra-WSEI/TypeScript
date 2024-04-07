import { Divider, IconButton, ListItem, ListItemText, Tooltip } from '@mui/material';
import React, { useEffect } from 'react';
import { projectPageStyles } from '../../../styles/projectsPage';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRemoveProject } from '../../../api/project/useRemoveProject';
import { SeverityOption } from '../../../types/severity';
import { ProjectModel } from '../../../types/project';

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
  const { error, message, remove } = useRemoveProject();

  useEffect(() => {
    if (error) {
      setSeverity(SeverityOption.Error);
      setSeverityText(error);
    };

    if (message) {
      setSeverity(SeverityOption.Success);
      setSeverityText(message);
    }
  }, [error, message])

  return (
    <div key={project.id}>
      <ListItem style={projectPageStyles.listItem}>
        <ListItemText
          primary={project.name}
          secondary={project.description}
          sx={projectPageStyles.listItemText}
        />
        <Tooltip title='Remove' onClick={() => remove(project.id)}>
          <IconButton edge='end'>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItem>
      <Divider variant='inset' />
    </div>
  );
};