import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
      style={{
        backgroundImage: "url('http://localhost:3000/aa.png')"
      }}
    >
      <Container
        maxWidth={false}
        style={{
          backgroundImage: "url('http://localhost:3000/info1.jpg')",
          backgroundSize: 'cover',
          paddingTop: '50px',
          paddingBottom: '220px'
        }}
      >
        <Grid item lg={8} md={8} xl={8} xs={8}>
          <p>
            Successful people are known to be great at practicing tips on time
            management. <br /> Chances are, if you want to be an extremely
            successful professional at your chosen field, you should also learn
            how to organize your day effectively. This app will help you with
            that.
          </p>
          <br />
          <p>
            Make a new to-do list every day, even if you're not a big list maker
            and only jot down the big projects, look at it every day and cross
            off what you've completed (or what you've deemed no longer
            relevant). Not only will this help keep you on top of your tasks,
            but it will also make you feel productive when you cross off that
            item after it's been completed. Make sure that you’re going to start
            your day with a purpose.
          </p>
        </Grid>
      </Container>

      <h1 style={{ color: 'rgba(0,34,106,255)', margin: '60px' }}>
        <i>Take complete control of your day!</i>
      </h1>
    </Page>
  );
};

export default Dashboard;
