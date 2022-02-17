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
};

export { appLinks };
