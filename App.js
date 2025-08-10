import { MenuProvider } from 'react-native-popup-menu';
import { AuthProvider } from './context/AuthContext';
import { BudgetProvider } from './context/BudgetContext';
import { CurrencyProvider } from './context/CurrencyContext';
// import { LanguageProvider } from './context/LanguageContext';
import { NotificationProvider } from './context/NotificationContext';
import { WalletProvider } from './context/WalletContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <MenuProvider>
    <AuthProvider>
      <BudgetProvider>
        <WalletProvider>
          {/* <LanguageProvider> */}
            <CurrencyProvider>
              <NotificationProvider>
              <AppNavigator />
              </NotificationProvider>
            </CurrencyProvider>
          {/* </LanguageProvider> */}
        </WalletProvider>
      </BudgetProvider>
    </AuthProvider>
    </MenuProvider>
  );
}