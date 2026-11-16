import { useUserContext } from './UserContextProvider';

export const useUser = () => {
  return useUserContext();
};

export default useUser;
