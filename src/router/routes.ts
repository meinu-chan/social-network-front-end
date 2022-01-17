interface IAppLink {
  name: string;
  link: string;
}

interface IAppLinks {
  [key: string]: IAppLink;
}

const appLinks: IAppLinks = {
  index: {
    name: 'Main Page',
    link: '/',
  },
  auth: {
    name: 'Auth Page',
    link: '/auth',
  },
  signUp2: {
    name: 'Sign Up Step  2',
    link: '/auth/sign-up-2',
  },
};

export { appLinks };
