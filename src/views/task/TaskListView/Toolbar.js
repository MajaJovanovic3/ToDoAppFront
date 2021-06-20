import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import DateFnsUtils from '@date-io/date-fns';
import { Search as SearchIcon } from 'react-feather';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ModalTask from './ModalTask';
import { useStylesToolbar } from 'src/common/useStyles';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';

export const Toolbar = (props, { className, ...rest }) => {
  const classes = useStylesToolbar();
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = searchTerm => {
    props.setSearch(searchTerm);
  };

  const handleDateChange = async date => {
    setSelectedDate(date);
    props.setSearch('');
    props.setDate(date);
    document.getElementById('search').value = '';
  };

  const props1 = {
    open: open,
    handleClickOpen: handleClickOpen,
    handleClose: handleClose,
    date: selectedDate,
    setSearch: props.setSearch
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            value={selectedDate}
            onChange={e => handleDateChange(e)}
            className={classes.exportButton}
          />
        </MuiPickersUtilsProvider>
        <Button color="primary" variant="contained" onClick={handleClickOpen}>
          Add task
        </Button>
      </Box>
      <Box mt={3}  >
        <Card className={classes.card}>
          <CardContent >
            <Box maxWidth={500} >
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                onChange={e => handleSearch(e.target.value)}
                placeholder="Search product"
                variant="outlined"
                id="search"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <ModalTask {...props1} />
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
