const now = () => {
  const time = Date.now();
  const last = now.last || time;
  now.last = time > last ? time : last + 1;
  return now.last;
};

export const uniqueKey = () => now().toString(36);
