import React from "react";
import { Divider, IconButton, List, ListItem, ListItemText, Tooltip } from "@mui/material";
import { ProjectModel } from "../../types/project";
import { projectPageStyles } from "../../styles/projectsPage";
import DeleteIcon from '@mui/icons-material/Delete';

interface ProjectsListProps {
  projects: ProjectModel[]
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => (
  <List sx={projectPageStyles.list}>
    {projects.map((p) => (
      <div key={p.id}>
        <ListItem style={{ minWidth: '25rem' }}>
          <ListItemText
            primary={p.name}
            secondary={p.description}
            sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
          />
          <Tooltip title="Remove" onClick={() => console.log('removed')}>
            <IconButton edge="end">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    ))}
  </List >
);