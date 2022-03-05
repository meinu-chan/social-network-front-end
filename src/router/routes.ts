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
  setting: {
    name: 'Setting Page',
    link: '/setting',
  },
};

export { appLinks };
