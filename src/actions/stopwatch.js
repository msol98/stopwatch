export const start = () => ({
  type: 'START'
});

export const pause = () => ({
  type: 'PAUSE'
});

export const resume = () => ({
  type: 'RESUME'
});

export const reset = () => ({
  type: 'RESET'
});

export const lap = (newRecord) => ({
  type: 'LAP',
  newRecord
});