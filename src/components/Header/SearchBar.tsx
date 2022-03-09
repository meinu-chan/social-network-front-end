import { alpha, Box, InputBase, styled } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { getUserNonPaginatedUserList } from '../../api/userApi';
import useApiRequest from '../../hooks/userApiRequest';
import DropDownList from '../DropDownList';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function SearchBar() {
  const { requestFn: userApi, data, isLoading } = useApiRequest(getUserNonPaginatedUserList);
  const divElement = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divElement.current && !divElement.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [divElement]);

  const handleUserChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (!value) return setOpen(false);
    userApi({ args: value });
    setOpen(true);
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    if (!inputValue) return;

    setOpen(true);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Box ref={divElement}>
        <StyledInputBase placeholder="Search…" onChange={handleUserChange} onClick={handleClick} />
        <DropDownList
          data={data}
          open={open}
          isLoading={isLoading}
          closeList={() => setOpen(false)}
        />
      </Box>
    </Search>
  );
}

export default SearchBar;
