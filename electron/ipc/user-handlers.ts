import { ipcMain } from "electron";
import { insertUser, selectUser } from "../../database/ManageDatabase.ts";
import type { User } from "../../src/interface/interface";

export function registerUserHandlers() {
  //Inserisci Utente
  ipcMain.handle("user:create", async (_event, user: User) => {
    return insertUser(user);
  });

  //Selezione utente
  ipcMain.handle("user:select", async () => {
    return selectUser();
  });
}
