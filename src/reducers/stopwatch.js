export default (state = { startTime: null, records: [] }, action) => {
  switch (action.type) {
    case 'START':
      return { ...state, startTime: new Date() };

    case 'PAUSE':
      return { ...state, startTime: null };

    case 'RESUME':
      return { ...state, startTime: new Date() };

    case 'RESET':
      return { startTime: null, records: [] };

    case 'LAP':
      return { ...state, records: [...state.records, action.newRecord] };
  }
}