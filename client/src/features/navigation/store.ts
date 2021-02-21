import { createStore, createEvent } from 'effector';

import { INavigationStore } from '@/features/navigation/store.types';
import { useStore } from 'effector-react';

export const handleNavigationSearch = createEvent<string>();
export const handleNotification = createEvent<boolean>();

const $navigation = createStore<INavigationStore>({
  search: '',
  notification: false,
})
  .on(handleNavigationSearch, (state, search) => ({ ...state, search }))
  .on(handleNotification, (state, notification) => ({
    ...state,
    notification,
  }));

export const useNavigationStore = () => useStore($navigation);
