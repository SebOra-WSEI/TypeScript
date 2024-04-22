import { Breadcrumbs, Link } from '@mui/material';
import React from 'react';
import { routeBuilder } from '../../../routes/routes';
import { useParams } from 'react-router';

export const NavbarBreadcrumbs: React.FC = () => {
  const { projectId, storyId } = useParams<{
    projectId: string;
    storyId: string;
  }>();

  return (
    <Breadcrumbs sx={styles.breadcrumbs}>
      {window.location.pathname !== routeBuilder.projects && (
        <Breadcrumb link={routeBuilder.projects} text='Projects' />
      )}
      {window.location.pathname === routeBuilder.tasks(projectId, storyId) && (
        <Breadcrumb link={routeBuilder.stories(projectId)} text='Stories' />
      )}
    </Breadcrumbs>
  );
};

const Breadcrumb: React.FC<{
  link: string;
  text: string;
}> = ({ link, text }) => (
  <Link href={link} fontSize='small' sx={styles.color}>
    {text}
  </Link>
);

const styles = {
  breadcrumbs: {
    flexGrow: 1,
    color: '#fff',
  },
  color: {
    color: '#fff',
  },
};
