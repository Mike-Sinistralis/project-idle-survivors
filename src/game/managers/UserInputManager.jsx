import { useUserInput } from 'game/managers/hooks/useUserInput';

function UserInputManager() {
  useUserInput();

  return false;
}

export default UserInputManager;
