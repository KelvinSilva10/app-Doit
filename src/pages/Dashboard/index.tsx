import { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { useAuth } from '../../contexts/AuthContexts';
import { useTasks } from '../../contexts/TasksContexts';
import { ModalTaskDetail } from '../../components/Modal/ModalTaskDetail';

import { TaskLists } from './TaskLists';
import { FirstTask } from './FirstTask';
import { NotFound } from './NotFound';

interface iTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { tasks, loadTasks, notFound, taskNotFound } = useTasks();
  const { user, accessToken } = useAuth();

  const [selectedTask, setSelectedTask] = useState<iTask>({} as iTask);

  const {
    isOpen: isTaskDetailOpen,
    onOpen: onTaskDetailOpen,
    onClose: onTaskDetailClose,
  } = useDisclosure();

  const handleClick = (task: iTask) => {
    setSelectedTask(task);
    onTaskDetailOpen();
  };

  useEffect(() => {
    loadTasks(user.id, accessToken).then((_) => setLoading(false));
  }, []);

  if (notFound) {
    return (
      <NotFound
        isTaskDetailOpen={isTaskDetailOpen}
        onTaskDetailClose={onTaskDetailClose}
        selectedTask={selectedTask}
        taskNotFound={taskNotFound}
      />
    );
  }

  return (
    <>
      <ModalTaskDetail
        isOpen={isTaskDetailOpen}
        onClose={onTaskDetailClose}
        task={selectedTask}
      />
      {!loading && !tasks.length ? (
        <FirstTask />
      ) : (
        <TaskLists loading={loading} tasks={tasks} handleClick={handleClick} />
      )}
    </>
  );
};
