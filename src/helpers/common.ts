import { v4 as uuid } from 'uuid';

const scrollToTop = (behavior: ScrollBehavior = 'auto') => {
  window.scrollTo({ behavior, top: 0 });
};

const getFileWithUniqueName = (file: File): File =>
  new File([file], `${uuid()}.${file.name.split('.')[1]}`, { type: file.type });

export { scrollToTop, getFileWithUniqueName };
