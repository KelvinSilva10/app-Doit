/* eslint-disable consistent-return */
import { AxiosResponse } from 'axios';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { api } from '../services/api';

interface iTasksProviderProps {
  children: ReactNode;
}

interface iTask {
  id: string;
  title: string;
  description: string;
  userId: string;
  completed: boolean;
}

interface iTaskContextData {
  tasks: iTask[];
  createTask: (data: Omit<iTask, 'id'>, accessToken: string) => Promise<void>;
  loadTasks: (userId: string, accessToken: string) => Promise<void>;
  deleteTask: (taskId: string, accessToken: string) => Promise<void>;
  updateTask: (
    taskId: string,
    userId: string,
    accessToken: string
  ) => Promise<void>;
  searchTask: (taskTitle: string, accessToken: string) => Promise<void>;
  notFound: boolean;
  taskNotFound: string;
}

const TasksContext = createContext<iTaskContextData>({} as iTaskContextData);

export const useTasks = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error('useTasks must be used within an TasksProvider');
  }

  return context;
};

export const TasksProvider = ({ children }: iTasksProviderProps) => {
  const [tasks, setTasks] = useState<iTask[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [taskNotFound, setTaskNotFound] = useState('');

  const loadTasks = useCallback(async (userId: string, accessToken: string) => {
    try {
      const response = await api.get(`/tasks?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setTasks(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const createTask = useCallback(
    async (data: Omit<iTask, 'id'>, accessToken: string) => {
      api
        .post('/tasks', data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response: AxiosResponse<iTask>) => {
          setTasks((oldTasks) => [...oldTasks, response.data]);
        })
        .catch((err) => console.error(err));
    },
    []
  );

  const deleteTask = useCallback(
    async (taskId: string, accessToken: string) => {
      await api
        .delete(`/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((_) => {
          const filteredTasks = tasks.filter((task) => task.id !== taskId);
          setTasks(filteredTasks);
        })
        .catch((err) => console.log(err));
    },
    [tasks]
  );

  const updateTask = useCallback(
    async (taskId: string, userId: string, accessToken: string) => {
      await api
        .patch(
          `/tasks/${taskId}`,
          { completed: true, userId },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          const filteredTasks = tasks.filter((task) => task.id !== taskId);
          const task = tasks.find((taskfilter) => taskfilter.id === taskId);

          if (task) {
            task.completed = true;
            setTasks([...filteredTasks, task]);
          }
        })
        .catch((err) => console.log(err));
    },
    [tasks]
  );

  const searchTask = useCallback(
    async (taskTitle: string, accessToken: string) => {
      const response = await api.get(`/tasks?title_like=${taskTitle}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.data.length) {
        setTaskNotFound(taskTitle);
        setNotFound(true);
        return;
      }

      setNotFound(false);
      setTasks(response.data);
    },
    []
  );

  const memoizedValue = React.useMemo(
    () => ({
      createTask,
      tasks,
      loadTasks,
      deleteTask,
      updateTask,
      searchTask,
      notFound,
      taskNotFound,
    }),
    [tasks, notFound]
  );

  return (
    <TasksContext.Provider value={memoizedValue}>
      {children}
    </TasksContext.Provider>
  );
};
