import React from 'react';
import { Breadcrumbs, Link } from '@mui/material';
import { routeBuilder } from '../../../routes/routes';
import { useParams } from 'react-router';

interface BreadcrumbProps {
  link: string;
  text: string;
}

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

const Breadcrumb: React.FC<BreadcrumbProps> = ({ link, text }) => (
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
