import React from "react";
import EncryptedStorage from "react-native-encrypted-storage";


type AuthState = {
  isLoading: boolean;
  isSignedIn: boolean;
  userToken: null | string;
  passcodeHash: null | string;
};

interface AuthInstance extends AuthState {
  signUp: (username: string, passcode: string) => Promise<void>;
  signOut: () => Promise<void>;
  setLock: (passcode: string) => Promise<void>;
  unlock: (passcode: string) => boolean;
  lock: () => void;
};

const AuthContext = React.createContext<undefined | AuthInstance>(undefined);

type AuthProps = {
  children: React.ReactNode;
};

export class AuthProvider extends React.Component<AuthProps> {
  public state: AuthState = {
    isLoading: true,
    isSignedIn: false,
    userToken: null,
    passcodeHash: null
  };

  public componentDidMount(): void {
    const bootstrapAsync = async (): Promise<void> => {
      const passcodeHash = await EncryptedStorage.getItem("passcodeHash");
      const userToken = await EncryptedStorage.getItem("userToken");
      
      this.setState({ 
        isLoading: false,
        isSignedIn: false,
        passcodeHash,
        userToken
      });
    };

    bootstrapAsync();
  }

  public async signUp(username: string, password: string): Promise<void> {
    const userToken: string = "dummy" + username + password;
    await EncryptedStorage.setItem("userToken", userToken);
    this.setState({ userToken });
  }

  public async signOut(): Promise<void> {
    await EncryptedStorage.clear();
    this.setState({ isSignedIn: false, userToken: null, passcodeHash: null });
  }
  
  public async setLock(passcode: string): Promise<void> {
    const passcodeHash: string = "H(" + passcode + ")";
    await EncryptedStorage.setItem("passcode", passcodeHash);
    this.setState({ isSignedIn: true, passcodeHash });
  }

  public unlock(passcode: string): boolean {
    const passcodeHash: string = "H(" + passcode + ")";
    if (passcodeHash === this.state.passcodeHash) {
      this.setState({ isSignedIn: true, passcodeHash });
      return true;
    }
    return false;
  }

  public lock(): void {
    this.setState({ isSignedIn: false });
  }

  public render(): JSX.Element {
    return (
      <AuthContext.Provider value={{
        ...this.state,
        signUp: this.signUp.bind(this),
        signOut: this.signOut.bind(this),
        setLock: this.setLock.bind(this),
        unlock: this.unlock.bind(this),
        lock: this.lock.bind(this),
      }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export const useAuth = (): AuthInstance => React.useContext(AuthContext)!;