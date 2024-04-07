import React from 'react';
import { useParams } from 'react-router';
import { useGetProjectById } from '../../../api/project/useGetProjectById';
import { Loader } from '../../common/Loader';
import { Navbar } from '../../common/Navbar';
import { StorageListView } from '../../Storage/List/StorageListView';

export const ProjectDetailsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const { loading, error, data } = useGetProjectById(projectId)

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <>
      <Navbar project={data} />
      <StorageListView />
    </>
  );
};