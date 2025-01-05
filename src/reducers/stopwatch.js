export default (state = { startTime: null, counter: null, records: [] }, action) => {
  switch (action.type) {
    case 'START':
      return { startTime: new Date() };

    case 'PAUSE':
      return { counter: null };

    case 'RESUME':
      return { startTime: new Date() };

    case 'RESET':
      return { startTime: null, counter: null, records: [] };

    case 'LAP':
      return { records: [...state.records, action.newRecord] };
  }
}