import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { Models, AppwriteException, ID } from "appwrite";
import { account } from "@/models/client/config";

export interface UserPrefs {
  reputation: number; // based on few factors/features of the app ex. upvotes/downvotes
  // other user preferences
}

// authentication variables & methods store for the web application
interface IAuthStore {
  session: Models.Session | null; //can be null if the user is not logged in.
  jwt: string | null; //can be null if the user is not logged in.
  user: Models.User<UserPrefs> | null; //can be null if the user is not logged in.
  hydrated: boolean; // A boolean indicating whether the authentication store has been hydrated with data from the server, will handled by zustand

  setHydrated(): void; // A method to set the hydrated flag to true.
  verifySession(): Promise<void>; // A method to verify asynchronously current user's session with the server. It returns a Promise that resolves when the verification is complete.
  createAccount(
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: AppwriteException | null }>;

  login(
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: AppwriteException | null }>;

  logout(): Promise<void>;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    // handle state updates in a safe and immutable manner. By using Immer, we can safely modify the state without overwriting the existing state data. //?state updates By creating new states
    immer((set) => ({
      session: null,
      jwt: null,
      user: null,
      hydrated: false,

      setHydrated() {
        set({ hydrated: true });
      },

      async verifySession() {
        try {
          const session = await account.getSession("current");
          set({ session });
        } catch (error) {
          console.log(error);
        }
      },

      async createAccount(name: string, email: string, password: string) {
        console.log("createAccount", name, email, password);
        try {
          const response = await account.create(
            ID.unique(),
            email,
            password,
            name
          );
          console.log("response", response);
          return { success: true };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async login(email: string, password: string) {
        try {
          const session = await account.createEmailPasswordSession(
            email,
            password
          );

          console.log("session login Auth ", session);

          const [user, { jwt }] = await Promise.all([
            account.get<UserPrefs>(),
            account.createJWT(),
          ]);

          console.log("user login Auth ", user);

          if (!user.prefs?.reputation)
            await account.updatePrefs<UserPrefs>({ reputation: 0 });

          set({ session, user, jwt });

          return { success: true };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async logout() {
        try {
          await account.deleteSessions();
          set({ session: null, user: null, jwt: null });
        } catch (error) {
          console.log(error);
        }
      },
    })),
    {
      name: "auth",
      //handle rehydration to update the state or perform any necessary actions after the storage has been successfully rehydrated.
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated(); // if error is falsy the method is called on the state object
        };
      },
    }
  )
);
