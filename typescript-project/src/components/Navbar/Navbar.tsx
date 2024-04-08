import {
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { ProjectModel } from '../../types/project';
import { NavbarMenu } from './NavbarMenu';
import { EditProjectFormModal } from '../Project/Edit/Modal/EditProjectFormModal';
import { SnackbarAlert } from '../common/SnackbarAlert';
import { SeverityOption } from '../../types/severity';

interface NavbarProps {
  project: ProjectModel;
}

export const Navbar: React.FC<NavbarProps> = ({ project }) => {
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState<boolean>(false);
  const [severityText, setSeverityText] = useState<string>('');
  const [severity, setSeverity] = useState<SeverityOption | undefined>(
    undefined
  );

  const { name, description, id } = project ?? {};

  const handleEditProjectOnOpen = (): void =>
    setIsEditProjectModalOpen(true);

  const handleEditProjectOnClose = (): void =>
    setIsEditProjectModalOpen(false);

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 2 }}>
            {name}
          </Typography>
          <Typography variant='inherit' sx={{ flexGrow: 1 }}>
            {description}
          </Typography>
          <NavbarMenu
            projectId={id}
            handleEditProjectOnOpen={handleEditProjectOnOpen}
          />
        </Toolbar>
      </AppBar>
      {/* 
      -------
      -------
      -------
      CREATE STORAGE MODAL
      -------
      -------
      -------
      */}
      <EditProjectFormModal
        isOpen={isEditProjectModalOpen}
        onClose={handleEditProjectOnClose}
        project={project}
        setSeverity={setSeverity}
        setSeverityText={setSeverityText}
      />
      <SnackbarAlert
        setSeverity={setSeverity}
        severity={severity}
        text={severityText}
      />
    </>
  );
};
