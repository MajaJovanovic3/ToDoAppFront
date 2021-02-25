import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';
import Page from 'src/components/Page';
import TasksList from './TasksList';
import { Toolbar } from './Toolbar';
import { loadTasks } from 'src/redux/actions/taskActions';
import { useStylesIndex } from 'src/common/useStyles';

export const TaskPage = () => {
  const classes = useStylesIndex();
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [date, setDate] = useState(new Date());
  const [search, setSearch] = useState(null);

  useEffect(() => {
    dispatch(loadTasks(date));
  }, [date]);

  useEffect(() => {
    if (search!=null && tasks.length > 0)
      setDisplayedTasks(
        tasks.filter(
          task => task.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        )
      );
  }, [search]);

  return (
    <Page className={classes.root} title="Tasks">
      <Container maxWidth={false}>
        <Toolbar setDate={setDate} setSearch={setSearch} />
        {search != null && search != '' ? (
          displayedTasks.length > 0 ? (
            <TasksList tasks={displayedTasks} date={date} search={search} />
          ) : (
            <h1>Nema zadataka po datoj pretrazi</h1>
          )
        ) : tasks.length > 0 ? (
          <TasksList tasks={tasks} date={date} search={search} />
        ) : (
          <h1>Nemate zadataka</h1>
        )}
      </Container>
    </Page>
  );
};

function mapStateToProps(state) {
  return {
    tasks: state
  };
}

export default connect(mapStateToProps, { loadTasks })(TaskPage);
