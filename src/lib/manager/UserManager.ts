import type { ElectronApi, User } from "@/interface/interface";

class CustomUserManager {
  async insertUser(user: User) {
    return await window.electronAPI?.insertUser?.(user);
  }

  async selectUser() {
    return await window.electronAPI?.selectUser?.();
  }
}

const UserManager = new CustomUserManager();
export default UserManager;
