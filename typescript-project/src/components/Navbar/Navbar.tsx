import { AppBar, Avatar, Breadcrumbs, IconButton, Link, Menu, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ProjectModel } from '../../types/project';
import { ProjectNavbarMenuItems } from './ProjectNavbarMenuItems';
import { StoryModel } from '../../types/story';
import SettingsIcon from '@mui/icons-material/Settings';
import { ContentType } from '../../types/contentType';
import { StoryNavbarMenuItems } from './StoryNavbarMenuItems';
import { routeBuilder } from '../../routes/routes';
import { useParams } from 'react-router';

interface NavbarProps {
  data: ProjectModel | StoryModel;
  handleEditProjectOnOpen: () => void;
  handleCreateStoryOnOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  data,
  handleCreateStoryOnOpen,
  handleEditProjectOnOpen,
}) => {
  const { projectId } = useParams<{ projectId: string }>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { name, description, type } = data ?? {};

  const handleIconClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleIconClose = (): void => setAnchorEl(null);

  return (
    <>
      <AppBar>
        <Toolbar>
          <Breadcrumbs sx={{ flexGrow: 1 }}>
            <Link href={routeBuilder.projects} fontSize='small' sx={{ color: '#fff' }}>
              Projects
            </Link>
            {type !== ContentType.Project && (
              <Link href={routeBuilder.stories(projectId)} fontSize='small' sx={{ color: '#fff' }}>
                Stories
              </Link>
            )}
          </Breadcrumbs>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            {name}
          </Typography>
          <Typography variant='inherit' sx={{ flexGrow: 1 }}>
            {description}
          </Typography>
          <IconButton size='small' onClick={handleIconClick}>
            <Avatar sx={{ background: 'inherit', marginLeft: 'auto' }}>
              <SettingsIcon />
            </Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleIconClose}>
            {type === ContentType.Project ? (
              <ProjectNavbarMenuItems
                handleEditProjectOnOpen={handleEditProjectOnOpen}
                handleCreateStoryOnOpen={handleCreateStoryOnOpen}
              />
            ) : (
              <StoryNavbarMenuItems />
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};
