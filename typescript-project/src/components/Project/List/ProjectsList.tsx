import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
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
import { useRemoveProject } from '../../../api/project/useRemoveProject';
import { FormModal } from '../Modal/FormModal';
import { SeverityOption } from '../../../types/severity';
import { SnackbarAlert } from '../../common/SnackbarAlert';

interface ProjectsListProps {
  projects: ProjectModel[];
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [severityText, setSeverityText] = useState<string>('');
  const [severity, setSeverity] = useState<SeverityOption | undefined>(
    undefined
  );

  const handleOnOpen = (): void => setIsModalOpen(true);
  const handleOnClose = () => setIsModalOpen(false);

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
    <>
      <Box sx={projectPageStyles.wrapper}>
        {!projects.length ? (
          <p>There are no projects yet</p>
        ) : (
          <List sx={projectPageStyles.wrapper}>
            {projects.map((p) => (
              <div key={p.id}>
                <ListItem style={projectPageStyles.listItem}>
                  <ListItemText
                    primary={p.name}
                    secondary={p.description}
                    sx={projectPageStyles.listItemText}
                  />
                  <Tooltip title='Remove' onClick={() => remove(p.id)}>
                    <IconButton edge='end'>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
                <Divider variant='inset' />
              </div>
            ))}
            <Divider sx={projectPageStyles.divider} />
          </List>
        )}
        <Button onClick={handleOnOpen}>Create new project</Button>
        <FormModal isOpen={isModalOpen} onClose={handleOnClose} />
      </Box>
      <SnackbarAlert
        setSeverity={setSeverity}
        severity={severity}
        text={severityText}
      />
    </>
  );
};
