export default (state = { startTime: null, }, action) => {
  switch (action.type) {
    case 'START':
      return { startTime: new Date() };

    case 'PAUSE':
      return;

    case 'RESUME':
      return { startTime: new Date() };

    case 'RESET':
      return { startTime: null };

    case 'LAP':
      return;
  }
}