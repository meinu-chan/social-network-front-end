const isValidPassword = (password: string) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[a-zA-Z\d!@#$%&*\S]{8,}$/.test(password);

const getTextWithoutSpaces = (string: string) => string.replace(/\s/g, '');

const isEmptyString = (string: string) => !getTextWithoutSpaces(string).length;

const isValidEmail = (email: string) => {
  const isMatchRegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  if (isMatchRegExp) {
    const localPart = email.split('@')[0];
    const domainPart = email.split('@')[1];

    if (localPart.length > 64) return false;
    return domainPart.length <= 255;
  }

  return false;
};

export { isValidEmail, isEmptyString, isValidPassword, getTextWithoutSpaces };
