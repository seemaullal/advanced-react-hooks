import React from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return {status: 'pending', data: null, error: null};
    }
    case 'resolved': {
      return {status: 'resolved', data: action.data, error: null};
    }
    case 'rejected': {
      return {status: 'rejected', data: null, error: action.error};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export default function useAsync(initialState) {
  const componentIsMounted = React.useRef(false);

  React.useLayoutEffect(() => {
    componentIsMounted.current = true;
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  const run = React.useCallback(promise => {
    dispatch({type: 'pending'});
    promise
      .then(data => {
        if (componentIsMounted.current) {
          dispatch({type: 'resolved', data});
        }
      })
      .catch(error => {
        if (componentIsMounted.current) {
          dispatch({type: 'rejected', error});
        }
      });
  }, []);

  const [state, dispatch] = React.useReducer(reducer, {
    ...initialState,
    data: null,
    error: null,
  });
  return {...state, run};
}
