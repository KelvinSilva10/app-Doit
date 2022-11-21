import { Box, Grid } from '@chakra-ui/react';
import { Card } from '../../components/Card';
import { SearchBox } from '../../components/Form/SearchBox';
import { Header } from '../../components/Header';
import { CardSkeleton } from '../../components/Skeleton/CardSkeleton';

interface iTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface iTaskListProps {
  loading: boolean;
  tasks: iTask[];
  handleClick: (task: iTask) => void;
}

// eslint-disable-next-line arrow-body-style
export const TaskLists = ({ loading, tasks, handleClick }: iTaskListProps) => {
  return (
    <Box>
      <Header />
      <SearchBox />
      <Grid
        w='100%'
        templateColumns='repeat(auto-fill, minmax(420px, 1fr))'
        gap={10}
        mt='8'
        padding='6'
      >
        {loading ? (
          <CardSkeleton repeatCount={9} />
        ) : (
          tasks.map((task) => <Card task={task} handleClick={handleClick} />)
        )}
      </Grid>
    </Box>
  );
};
