const initialRole = {
  main: {
    role: "", //stato del role dello user, si riempira' quando un utente si registra
  },
};

const roleReducer = (state = initialRole, action) => {
  switch (action.type) {
    case "SET_ROLE":
      return {
        ...state,
        main: {
          ...state.main,
          role: action.payload,
        },
      };

    default:
      return state;
  }
};
export default roleReducer;
