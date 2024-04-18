import { Breadcrumbs, Link } from '@mui/material';
import React from 'react';
import { routeBuilder } from '../../../routes/routes';
import { ContentType } from '../../../types/contentType';
import { useParams } from 'react-router';

export const NavbarBreadcrumbs: React.FC<{ type: ContentType }> = ({ type }) => {
  const { projectId, storyId } = useParams<{
    projectId: string;
    storyId: string;
  }>();

  return (
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
