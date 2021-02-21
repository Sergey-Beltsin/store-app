import { createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';
import Cookies from 'js-cookie';

import { IAppStore } from '@/features/app/store.types';

export const handleTheme = createEvent<string>();

const handleThemeReducer = (state: IAppStore, theme: string) => {
  Cookies.set('theme', theme);
  return { ...state, theme };
};

export const $app = createStore<IAppStore>({
  theme: 'dark',
  user: null,
}).on(handleTheme, handleThemeReducer);

export const useAppStore = () => useStore($app);
