import React from "react";
import { useParams } from "react-router";
import { Navbar } from "../../Navbar/Navbar";
import { useGetTaskById } from "../../../api/task/useGetTaskById";
import { Loader } from "../../common/Loader";

export const TaskDetailsPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();

  const { loading, error, data } = useGetTaskById(taskId);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <>{error}</>;
  }

  if (!data) {
    return <>Task not found</>;
  }

  return (
    <Navbar data={data} />
  );
};