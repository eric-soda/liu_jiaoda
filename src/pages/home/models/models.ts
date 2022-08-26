import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface MenuItemType {
  title: string;
  key: string;
  children?: MenuItemType[];
}

export interface IndexModelState {
  name: string;
  menuArr: MenuItemType[];
  title: string;
}

export interface IndexModelType {
  namespace: 'index';
  state: IndexModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<IndexModelState>;
    changeTitle: Reducer;
    changeTitle2: Reducer;
    changeMenu: Reducer;

    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}

const IndexModel: IndexModelType = {
  namespace: 'index',

  state: {
    name: '',
    menuArr: [
      {
        title: 'title1',
        key: '/home/title1',
      },
      {
        title: 'title2',
        key: '/home/title2',
        children: [
          {
            title: 'title2-1',
            key: '/home/title2-1',
          },
          {
            title: 'title2-2',
            key: '/home/title2-2',
          },
        ],
      },
    ],
    title: '',
  },

  effects: {
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeTitle(state, action) {
      for (let i = 0; i < state.menuArr.length; i++) {
        if (state.menuArr[i].key === action.pathname) {
          return {
            ...state,
            title: state.menuArr[i].title,
          };
        } else {
          if (state.menuArr[i].children) {
            for (let j = 0; j < state.menuArr[i].children.length; j++) {
              if (state.menuArr[i].children[j].key === action.pathname) {
                return {
                  ...state,
                  title: state.menuArr[i].children[j].title,
                };
              }
            }
          }
        }
      }

      return state;
    },
    changeTitle2(state, action) {
      return {
        ...state,
        title: action.title,
      };
    },
    changeMenu(state, action) {
      for (let i = 0; i < state.menuArr.length; i++) {
        if (state.menuArr[i].key === action.pathname) {
          state.menuArr[i].title = state.title;
          return JSON.parse(JSON.stringify(state));
        } else {
          if (state.menuArr[i].children) {
            for (let j = 0; j < state.menuArr[i].children.length; j++) {
              if (state.menuArr[i].children[j].key === action.pathname) {
                state.menuArr[i].children[j].title = state.title;
                return JSON.parse(JSON.stringify(state));
              }
            }
          }
        }
      }

      return state;
    },
  
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        dispatch({ type: 'changeTitle', pathname });
      });
    },
  },
};

export default IndexModel;
