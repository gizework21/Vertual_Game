const initialState = {
    bets: [],
  };
  
  const betReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_BET':
        return {
          ...state,
          bets: [...state.bets, action.payload],
        };
      case 'CLEAR_BETS':
        return {
          ...state,
          bets: [],
        };
      default:
        return state;
    }
  };
  
  export default betReducer;
  