import { splice, sliceFileName, flattenAgenda } from 'helpers/polyfill';

const CHANGE_TITLE = 'sherpany/createagenda/CHANGE_TITLE';
const SWITCH_TAB = 'sherpany/createagenda/SWITCH_TAB';

const ADD_NEW_ITEM = 'sherpany/createagenda/ADD_NEW_ITEM';
const ADD_NEW_FILES = 'sherpany/createagenda/ADD_NEW_FILES';
const ADD_DOCUMENT_TO_AGENDA = 'sherpany/createagenda/ADD_DOCUMENT_TO_AGENDA';

const TOGGLE_SELECT = 'sherpany/createagenda/TOGGLE_SELECT';
const UNCHECK_ALL = 'sherpany/createagenda/UNCHECK_ALL';

const initialState = {
  title: '',
  activeTab: 'details',
  agendaList: [],
  files: [],
  firstCheck: {}
};

let lastItemID = 0;

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
    case ADD_NEW_ITEM:
      if (action.payload.isSubItem) {
        const lastItemIndex = state.agendaList.length - 1;
        const mainId = state.agendaList.length;
        const subId = state.agendaList[lastItemIndex].items.length + 1;
        const id = `${mainId}.${subId}`;
        const lastItem = {
          ...state.agendaList[lastItemIndex],
          items: [
            ...state.agendaList[lastItemIndex].items,
            {
              text: action.payload.item,
              label: `${id} - ${action.payload.item}`,
              id,
              mainId,
              subId,
              files: []
            }
          ]
        };
        return {
          ...state,
          agendaList: [
            ...(state.agendaList.slice(0, lastItemIndex)),
            lastItem
          ]
        };
      }
      const id = `${state.agendaList.length + 1}`;
      return {
        ...state,
        agendaList: [
          ...state.agendaList,
          {
            text: action.payload.item,
            label: `${id} - ${action.payload.item}`,
            items: [],
            id,
            mainId: id,
            subId: null,
            files: []
          }
        ]
      };
    case ADD_NEW_FILES:
      return {
        ...state,
        files: [
          ...state.files, ...action.payload
        ]
      };

    case TOGGLE_SELECT:
      const index = state.files.findIndex(file => file.id === action.payload);
      const file = { ...state.files[index], checked: !state.files[index].checked };
      const newFiles = splice(state.files, index, 1, file);
      const newCheckedFiles = newFiles.filter(newFile => newFile.checked);

      const isFirstChecked = state.files.filter(fileChecked => fileChecked.checked).length === 0;
      const isOnlyChecked = newCheckedFiles.length === 1;
      const nothingChecked = newCheckedFiles.length === 0;
      let firstCheck = { ...state.firstCheck };

      if (isFirstChecked) {
        firstCheck = {
          id: state.files[index].id,
          num: state.files[index].num,
          name: state.files[index].name
        };
      } else if (isOnlyChecked) {
        firstCheck = {
          id: newCheckedFiles[0].id,
          num: newCheckedFiles[0].num,
          name: newCheckedFiles[0].name
        };
      } else if (nothingChecked) {
        firstCheck = {};
      }
      return {
        ...state,
        files: newFiles,
        firstCheck
      };

    case ADD_DOCUMENT_TO_AGENDA:
      const checkedFiles = state.files.filter(agenda => agenda.checked);
      const flattenAgendaList = flattenAgenda(state.agendaList);
      const documentIndex = flattenAgendaList.findIndex(agenda => agenda.id === action.payload);
      const agenda = {
        ...flattenAgendaList[documentIndex],
        files: [...flattenAgendaList[documentIndex].files, ...checkedFiles.map(checkedFile => ({
          fileName: checkedFile.file.name,
          id: checkedFile.id
        }))] };
      let newAgendaList = [];
      if (!agenda.subId) {
        newAgendaList = [
          ...splice(state.agendaList, agenda.mainId - 1, 1, agenda)
        ];
      } else {
        let mainAgenda = state.agendaList[agenda.mainId - 1];
        mainAgenda = {
          ...mainAgenda,
          items: [
            ...splice(mainAgenda.items, agenda.subId - 1, 1, agenda)
          ]
        };
        newAgendaList = [
          ...splice(state.agendaList, agenda.mainId - 1, 1, mainAgenda)
        ];
      }
      return {
        ...state,
        agendaList: newAgendaList
      };

    case UNCHECK_ALL:
      return {
        ...state,
        files: state.files.map(uncheckedFile => ({ ...uncheckedFile, checked: false }))
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

export function addNewItem(item, isSubItem) {
  return {
    type: ADD_NEW_ITEM,
    payload: { item, isSubItem }
  };
}

export function addNewFiles(files) {
  const labeledFiles = files.map((file) => {
    lastItemID++;
    return { id: lastItemID, checked: false, file, ...sliceFileName(file.name) };
  });
  return {
    type: ADD_NEW_FILES,
    payload: labeledFiles
  };
}

export function toggleSelect(id) {
  return {
    type: TOGGLE_SELECT,
    payload: id
  };
}

export function addDocumentToAgenda(id) {
  return {
    type: ADD_DOCUMENT_TO_AGENDA,
    payload: id
  };
}

export function uncheckAll() {
  return {
    type: UNCHECK_ALL
  };
}
