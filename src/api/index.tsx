import { createContext } from 'react';
import { Api, User } from './Api';
import { MockApi } from './MockApi';

export type { Api, User };
export { MockApi };
export const ApiContext = createContext<Api>(new MockApi());
