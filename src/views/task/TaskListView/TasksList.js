import React, { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import TaskCard from './TaskCard';
import usePagination from './Pagination';
import { useStylesIndex } from 'src/common/useStyles';

export default function TasksList(props) {
  const classes = useStylesIndex();
  let [page, setPage] = useState(1);
  const PER_PAGE = 6;
  const data = props.tasks;
  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  useEffect(() => {
    setPage(1);
    _DATA.jump(1);
  }, [props.date, props.search]);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <Container maxWidth={false}>
      <Box mt={3}>
        <Grid container spacing={3}>
          {_DATA.currentData().length > 0 ? (
            _DATA.currentData().map(task => (
              <Grid item key={task._id} lg={4} md={6} xs={12}>
                <TaskCard className={classes.taskCard} taskProp={task} date={props.date} />
              </Grid>
            ))
          ) : (
            <h1>Nema takvih zadataka</h1>
          )}
        </Grid>
      </Box>
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Box>
    </Container>
  );
}
