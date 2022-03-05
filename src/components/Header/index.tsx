import React from 'react';
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Typography,
  Box,
  Tooltip,
  Avatar,
} from '@mui/material';
import { useAppContext } from '../../store';
import { makeStyles } from '@mui/styles';
import { useImageSrc } from '../../hooks/useImageSrc';
import { appLinks } from '../../router/routes';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

const useStyles = makeStyles((theme: Theme) => ({
  logoBox: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  logo: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
  },
  avatar: {
    maxWidth: '5%',
    height: '5%',
  },
  iconButton: {
    backgroundColor: `${theme.palette.background.paper} !important`,
    padding: '0 !important',
  },
  settingItem: {
    marginLeft: '6% !important',
  },
}));

const dropDownSettings = [
  {
    icon: <AccountCircleIcon />,
    field: 'My profile',
  },
  {
    icon: <SettingsOutlinedIcon />,
    field: 'Settings',
  },
  {
    icon: <LogoutIcon />,
    field: 'Log out',
  },
];

function Header() {
  const classes = useStyles();
  const { state } = useAppContext();
  const avatarSrc = useImageSrc(state.user.photo);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box className={classes.logoBox}>
          <Typography
            variant="h6"
            component="a"
            href={`${appLinks.index.link}${state.user._id}`}
            className={classes.logo}
          >
            {'Social Network'}
          </Typography>
        </Box>
        {state.isAuth && (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User profile">
              <IconButton onClick={handleMenu} className={classes.iconButton}>
                <Avatar alt={state.user.fullName} src={avatarSrc} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {dropDownSettings.map((setting, i) => (
                <MenuItem key={setting.field} onClick={handleClose}>
                  {setting.icon}
                  <Typography textAlign="center" className={classes.settingItem}>
                    {setting.field}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
