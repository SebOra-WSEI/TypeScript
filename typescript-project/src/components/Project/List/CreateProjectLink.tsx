import React from 'react';
import { routeBuilder } from '../../../routes/routes';
import { Link } from 'react-router-dom';

export const CreateProjectLink: React.FC = () => (
  <Link to={routeBuilder.addProject}>Crete new project</Link>
);
