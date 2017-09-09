import axios from 'axios'

const GET_DATA_SUCCESSFUL = "GET_DATA_SUCCESSFUL"


export const getDataAsync = (dep) => {
  return (dispatch, getState) => {
         axios.get('/data/departments/' + dep + ".json")
          .then(function (response) {
                dispatch({
                  type    : GET_DATA_SUCCESSFUL,
                  payload : response.data
                })
          })
          .catch(function (error) {
            console.log(error);
          });
     return getState().data
      }
}

const ACTION_HANDLERS = {
    [GET_DATA_SUCCESSFUL]    : (state, action) => action.payload
}

let initialState = null


export default function coursesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
