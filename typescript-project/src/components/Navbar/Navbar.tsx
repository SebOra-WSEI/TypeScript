import {
  AppBar,
  Avatar,
  Breadcrumbs,
  IconButton,
  Link,
  Menu,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { PropsWithChildren, useState } from 'react';
import { ProjectModel } from '../../types/project';
import { StoryModel } from '../../types/story';
import SettingsIcon from '@mui/icons-material/Settings';
import { ContentType } from '../../types/contentType';
import { routeBuilder } from '../../routes/routes';
import { useParams } from 'react-router';
import { TaskModel } from '../../types/task';

interface NavbarProps extends PropsWithChildren {
  data: ProjectModel | StoryModel | TaskModel;
}

export const Navbar: React.FC<NavbarProps> = ({ data, children }) => {
  const { projectId, storyId } = useParams<{
    projectId: string;
    storyId: string
  }>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { name, description, type } = data ?? {};

  const handleIconClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleIconClose = (): void => setAnchorEl(null);
  console.log(type)
  return (
    <>
      <AppBar>
        <Toolbar>
          <Breadcrumbs sx={{ flexGrow: 1, color: '#fff' }}>
            <Breadcrumb link={routeBuilder.projects} text='Projects' />
            {type !== ContentType.Project && (
              <Breadcrumb
                link={routeBuilder.stories(projectId)}
                text='Stories'
              />
            )}
            {type === ContentType.Task && (
              <Breadcrumb
                link={routeBuilder.tasks(projectId, storyId)}
                text='Tasks'
              />
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
            {children}
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

const Breadcrumb: React.FC<{
  link: string;
  text: string;
}> = ({ link, text }) => (
  <Link href={link} fontSize='small' sx={{ color: '#fff' }}>
    {text}
  </Link>
);
