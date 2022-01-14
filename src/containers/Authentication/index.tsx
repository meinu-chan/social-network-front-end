import { Container, CssBaseline, Box } from '@mui/material';
import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

enum AuthType {
  signIn = 'Sign In',
  signUp = 'Sign Up',
}

enum UpdateUserStateBtnTxt {
  accountExist = 'I already have account.',
  newUser = "I don't have account.",
}

export interface IAuthProps {
  updateUserState: () => void;
  authType: AuthType;
  updateUserStateBtnTxt: UpdateUserStateBtnTxt;
}

function Authentication() {
  const [isNew, setIsNew] = React.useState(true);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isNew ? (
          <SignUp
            updateUserState={() => {
              setIsNew(false);
            }}
            updateUserStateBtnTxt={UpdateUserStateBtnTxt.accountExist}
            authType={AuthType.signUp}
          />
        ) : (
          <SignIn
            updateUserState={() => {
              setIsNew(true);
            }}
            updateUserStateBtnTxt={UpdateUserStateBtnTxt.newUser}
            authType={AuthType.signIn}
          />
        )}
      </Box>
    </Container>
  );
}

export default Authentication;
