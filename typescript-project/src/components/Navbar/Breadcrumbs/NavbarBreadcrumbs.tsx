import { Breadcrumbs, Link } from '@mui/material';
import React from 'react';
import { routeBuilder } from '../../../routes/routes';
import { DataType } from '../../../types/dataType';
import { useParams } from 'react-router';

export const NavbarBreadcrumbs: React.FC<{ type: DataType }> = ({
  type,
}) => {
  const { projectId, storyId } = useParams<{
    projectId: string;
    storyId: string;
  }>();

  return (
    <Breadcrumbs sx={styles.breadcrumbs}>
      <Breadcrumb link={routeBuilder.projects} text='Projects' />
      {type !== DataType.Project && (
        <Breadcrumb link={routeBuilder.stories(projectId)} text='Stories' />
      )}
      {type === DataType.Task && (
        <Breadcrumb
          link={routeBuilder.tasks(projectId, storyId)}
          text='Tasks'
        />
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
    color: '#fff'
  },
  color: {
    color: '#fff'
  }
}
