import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AddTransactionScreen from '../screens/Main/AddTransactionScreen';
import HomeScreen from '../screens/Main/HomeScreen';
import OverviewScreen from '../screens/Main/OverviewScreen';
import ProfileScreen from '../screens/Main/ProfileScreen';
import WalletScreen from '../screens/Main/WalletScreen';

const Tab = createBottomTabNavigator();
function CustomTabBar({ state, descriptors, navigation }) {
    return (
      <View style={styles.bottomTabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          
          if (route.name === 'Add') {
              return (
                  <TouchableOpacity key={index} style={styles.addButton} onPress={onPress}>
                      <Ionicons name="add" size={36} color="white" />
                  </TouchableOpacity>
              )
          }
  
          let iconName;
          const color = isFocused ? '#7846F6' : '#A9A9A9';
  
          if (route.name === 'Home') {
            iconName = isFocused ? 'home' : 'home-outline';
          } else if (route.name === 'Overview') {
            iconName = isFocused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Wallet') {
            iconName = isFocused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Profile') {
            iconName = isFocused ? 'person' : 'person-outline';
          }
  
          return (
            <TouchableOpacity key={index} accessibilityRole="button" accessibilityState={isFocused ? { selected: true } : {}} onPress={onPress} style={styles.tabItem}>
              <Ionicons name={iconName} size={26} color={color} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
}

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CustomTabBar {...props} />}
    >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Overview" component={OverviewScreen} />
        <Tab.Screen name="Add" component={AddTransactionScreen} />
         <Tab.Screen name="Wallet" component={WalletScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
    bottomTabBar: { height: 80, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingBottom: 10, },
    tabItem: { alignItems: 'center', justifyContent: 'center', flex: 1, },
    addButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#7846F6', justifyContent: 'center', alignItems: 'center', bottom: 25, shadowColor: '#7846F6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 8, },
});

export default MainTabNavigator;