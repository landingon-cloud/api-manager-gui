

export const apierror = ( state = {}, action) => {
    switch (action.type) {
        case 'APIERROR':
          let errors = state.errors?state.errors:[];
          errors.push(action.error);
          return {...state, errors: errors };
        case 'APIERROR.CLEAR':
          return {...state, errors: [] };
        default:
          return state;
    }
}
