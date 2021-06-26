import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  LogOut as LogOutIcon
} from 'react-feather';
import NavItem from './NavItem';

const itemsTask = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/tasks',
    icon: ShoppingBagIcon,
    title: 'Tasks'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Error'
  },
  {
    href: '/logout',
    icon: LogOutIcon,
    title: 'Logout'
  }
];

const itemsLogin = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/login',
    icon: LockIcon,
    title: 'Login'
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Register'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 0,
    height: 'calc(100% )'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const user = useSelector(state => state.user.user);
  const items = user != null ? itemsTask : itemsLogin;
  let admin;
  if (user != null) {
    admin = {
      avatar: '/user.png',
      jobTitle: '',
      name: user.username
    };
  } else
    admin = {
      avatar: '/static/images/maja.jpg',
      jobTitle: 'Developer',
      name: 'Maja Lukić'
    };
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <div
      style={{
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        right: '0px',
        left: '0px'
      }}
    >
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        style={{
          backgroundImage: "url('http://localhost:3000/navbar.jpg')",
          backgroundSize: 'auto'
        }}
      >
        <Box alignItems="center" display="flex" flexDirection="column" p={2}>
          <Avatar
            className={classes.avatar}
            component={RouterLink}
            src={admin.avatar}
            to="/app/account"
          />
          <div style={{ backgroundColor: 'rgba(171,210,250,255)' }}>
            <Typography style={{ color: 'rgba(0,34,106,255)', variant: 'h5' }}>
              {admin.name}
            </Typography>
            <Typography style={{ color: 'rgba(0,34,106,255)' }} variant="body2">
              {admin.jobTitle}
            </Typography>
          </div>
        </Box>
        <Divider />
        <Box p={2}>
          <List>
            {items.map(item => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </List>
        </Box>
      </Box>
    </div>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
