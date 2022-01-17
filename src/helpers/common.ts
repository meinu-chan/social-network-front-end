const scrollToTop = (behavior: ScrollBehavior = 'auto') => {
  window.scrollTo({ behavior, top: 0 });
};

export { scrollToTop };
