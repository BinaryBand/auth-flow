import React from "react";
import EncryptedStorage from "react-native-encrypted-storage";


type AuthState = {
  isLoading: boolean;
  isSignedIn: boolean;
  userToken: null | string;
};

interface AuthInstance extends AuthState {
  signUp: (passcode: string) => Promise<void>;
  signIn: (passcode: string) => Promise<boolean>;
  signOut: () => void;
  lockOut: () => void;
};

const AuthContext = React.createContext<undefined | AuthInstance>(undefined);

type AuthProps = {
  children: React.ReactNode;
};

export class AuthProvider extends React.Component<AuthProps> {
  public state: AuthState = {
    isLoading: true,
    isSignedIn: false,
    userToken: null
  };

  public componentDidMount(): void {
    const bootstrapAsync = async (): Promise<void> => {
      const userToken = await EncryptedStorage.getItem("userToken");
      this.setState({ isLoading: false, isSignedIn: false, userToken });
    };

    bootstrapAsync();
  }

  public async signUp(passcode: string): Promise<void> {
    const userToken: string = "dummy-auth-token";
    await EncryptedStorage.setItem("passcode", passcode);
    await EncryptedStorage.setItem("userToken", userToken);
    this.setState({ isSignedIn: true, userToken });
  }
  
  public async signIn(passcode: string): Promise<boolean> {
    const controlPasscode: string = (await EncryptedStorage.getItem("passcode"))!;

    if (passcode === controlPasscode) {
      this.setState({ isSignedIn: true });
      return true;
    }
    else {
      return false;
    }
  }

  public signOut(): void {
    this.setState({ isSignedIn: false, userToken: null })
  }

  public lockOut(): void {
    this.setState({ isSignedIn: false });
  }

  public render(): JSX.Element {
    return (
      <AuthContext.Provider value={{
        ...this.state,
        signUp: this.signUp.bind(this),
        signIn: this.signIn.bind(this),
        signOut: this.signOut.bind(this),
        lockOut: this.lockOut.bind(this)
      }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export const useAuth = (): AuthInstance => React.useContext(AuthContext)!;