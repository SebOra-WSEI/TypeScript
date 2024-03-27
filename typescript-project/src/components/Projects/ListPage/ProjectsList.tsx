import React from "react";
import { Box, Divider, IconButton, List, ListItem, ListItemText, Tooltip } from "@mui/material";
import { ProjectModel } from "../../../types/project";
import { projectPageStyles } from "../../../styles/projectsPage";
import DeleteIcon from '@mui/icons-material/Delete';
import { removeProject } from "../../../utils/removeProject";
import { Link } from "react-router-dom";
import { routeBuilder } from "../../../routes/routes";

interface ProjectsListProps {
  projects: ProjectModel[]
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  if (!projects.length) {
    return (
      <Box sx={projectPageStyles.wrapper}>
        <p>There are no projects yet</p>
        <CreateProjectLink />
      </Box>
    )
  }

  return (
    <>
      <List sx={projectPageStyles.wrapper}>
        {projects.map((p) => (
          <div key={p.id}>
            <ListItem style={{ minWidth: '25rem' }}>
              <ListItemText
                primary={p.name}
                secondary={p.description}
                sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
              />
              <Tooltip title="Remove" onClick={() => removeProject(p.id)}>
                <IconButton edge="end">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider variant="inset" />
          </div>
        ))}
        <Divider sx={{ marginTop: '2rem' }} />
        <CreateProjectLink />
      </List>
    </>
  )
};

const CreateProjectLink: React.FC = () => (
  <Link to={routeBuilder.addProject}>Crete new project</Link>
);