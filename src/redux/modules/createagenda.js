const CHANGE_TITLE = 'sherpany/createagenda/CHANGE_TITLE';
const SWITCH_TAB = 'sherpany/createagenda/SWITCH_TAB';

const initialState = {
  title: '',
  activeTab: 'details'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_TITLE:
      return {
        ...state,
        title: action.payload
      };
    case SWITCH_TAB:
      return {
        ...state,
        activeTab: action.payload
      };
    default:
      return state;
  }
}

export function changeTitle(newTitle) {
  return {
    type: CHANGE_TITLE,
    payload: newTitle
  };
}

export function switchTab(tab) {
  return {
    type: SWITCH_TAB,
    payload: tab
  };
}
