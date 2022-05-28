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
  login: {
    name: 'Login Page',
    link: '/login',
  },
  registration: {
    name: 'Registration Page',
    link: '/registration',
  },
  setting: {
    name: 'Setting Page',
    link: '/setting',
  },
  chat: {
    name: 'Chat Page',
    link: '/chat',
  },
  userFriends: {
    name: 'Friends Page',
    link: '/:userId/friends',
  },
};

export { appLinks };
