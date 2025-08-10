import { AuthProvider } from './context/AuthContext';
import { BudgetProvider } from './context/BudgetContext';
import { WalletProvider } from './context/WalletContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
       <BudgetProvider>
         <WalletProvider>
      <AppNavigator />
      </WalletProvider>
      </BudgetProvider>
    </AuthProvider>
  );
}