import { createEvent, createStore } from 'effector';

import {
  IRegisterErrors,
  IRegisterStore,
} from '@/features/id/register/store.types';
import { useStore } from 'effector-react';

export const handleRegisterEmail = createEvent<string>();
export const handleRegisterPassword = createEvent<string>();
export const handleRegisterErrors = createEvent<IRegisterErrors>();

const $register = createStore<IRegisterStore>({
  email: '',
  password: '',
  errors: {
    email: '',
    password: '',
  },
})
  .on(handleRegisterEmail, (state, email) => ({ ...state, email }))
  .on(handleRegisterPassword, (state, password) => ({ ...state, password }))
  .on(handleRegisterErrors, (state, errors) => ({ ...state, errors }));

export const useRegisterStore = () => useStore($register);
