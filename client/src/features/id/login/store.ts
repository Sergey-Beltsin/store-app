import { createEvent, createStore } from 'effector';

import { ILoginErrors, ILoginStore } from '@/features/id/login/store.types';
import { useStore } from 'effector-react';

export const handleLoginEmail = createEvent<string>();
export const handleLoginPassword = createEvent<string>();
export const handleLoginErrors = createEvent<ILoginErrors>();

const $login = createStore<ILoginStore>({
  email: '',
  password: '',
  errors: {
    email: '',
    password: '',
  },
})
  .on(handleLoginEmail, (state, email) => ({ ...state, email }))
  .on(handleLoginPassword, (state, password) => ({ ...state, password }))
  .on(handleLoginErrors, (state, errors) => ({ ...state, errors }));

export const useLoginStore = () => useStore($login);
