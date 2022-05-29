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
  subscriptions: {
    name: 'User subscriptions',
    link: '/:userId/subscriptions',
  },
  subscribers: {
    name: 'User subscribers',
    link: '/:userId/subscribers',
  },
};

export { appLinks };
