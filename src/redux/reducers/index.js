const initialRole = {
  main: {
    role: "",
  },
};

const roleReducer = (state = initialRole, action) => {
  switch (action.type) {
    case "SET_ROLE":
      return {
        ...state,
        main: {
          ...state.main,
          role: state.main.role + action.payload,
        },
      };

    default:
      return state;
  }
};
export default roleReducer;
