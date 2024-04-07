import React from 'react';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { ProjectModel } from '../../../types/project';
import { projectPageStyles } from '../../../styles/projectsPage';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeProject } from '../../../api/project/removeProject';
import { CreateProjectLink } from './CreateProjectLink';

interface ProjectsListProps {
  projects: ProjectModel[];
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  if (!projects.length) {
    return (
      <Box sx={projectPageStyles.wrapper}>
        <p>There are no projects yet</p>
        <CreateProjectLink />
      </Box>
    );
  }

  return (
    <>
      <List sx={projectPageStyles.wrapper}>
        {projects.map((p) => (
          <div key={p.id}>
            <ListItem style={projectPageStyles.listItem}>
              <ListItemText
                primary={p.name}
                secondary={p.description}
                sx={projectPageStyles.listItemText}
              />
              <Tooltip title='Remove' onClick={() => removeProject(p.id)}>
                <IconButton edge='end'>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider variant='inset' />
          </div>
        ))}
        <Divider sx={projectPageStyles.divider} />
        <CreateProjectLink />
      </List>
    </>
  );
};