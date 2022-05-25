import { useEffect, useState } from 'react';
import { formatOnlineDate } from '../helpers/momentFormat';

export const useLastOnlineDate = (lastOnline: Date) => {
  const [wasOnline, setWasOnline] = useState(formatOnlineDate(lastOnline));
  const [interval, setInterval] = useState(60 * 1000);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWasOnline(formatOnlineDate(lastOnline));
      setInterval((intervalMs) => intervalMs * 5);
    }, interval);

    return () => clearTimeout(timer);
  }, [interval, lastOnline]);

  return wasOnline;
};
