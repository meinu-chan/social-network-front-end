import { CircularProgress, List, ListItemText, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { appLinks } from '../../router/routes';
import { UserData } from '../../types/User';
import ListItems from './ListItems';
import clsx from 'clsx';
import { useAppContext } from '../../store';

interface IProps {
  data?: UserData[];
  open: boolean;
  isLoading: boolean;
  closeList: () => void;
}

const useStyle = makeStyles((theme: Theme) => ({
  list: {
    zIndex: '1',
    width: '100%',
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  listLoadNotFound: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10% 0 !important',
  },
}));

function DropDownList({ data, open, isLoading, closeList }: IProps) {
  const classes = useStyle();
  const navigate = useNavigate();
  const {
    state: {
      user: { _id: myId },
    },
  } = useAppContext();

  const handleClick = (_id: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    closeList();
    navigate(`${appLinks.index.link}${_id}`);
  };

  return (
    <>
      {open && (
        <>
          <List
            className={clsx(classes.list, {
              [classes.listLoadNotFound]: isLoading || !data?.length,
            })}
            sx={{ position: 'absolute' }}
          >
            {(isLoading && <CircularProgress />) ||
              (!isLoading && data && !data.length && (
                <ListItemText
                  primary={
                    <Typography align="center" variant="h5">
                      {'Users not found'}
                    </Typography>
                  }
                />
              )) ||
              (!isLoading &&
                data &&
                data.length &&
                data.map((v) =>
                  myId !== v._id ? (
                    <ListItems
                      key={v.fullName + v._id}
                      {...v}
                      handleSelect={handleClick.bind(null, v._id)}
                    />
                  ) : (
                    <></>
                  )
                ))}
          </List>
        </>
      )}
    </>
  );
}

export default DropDownList;
