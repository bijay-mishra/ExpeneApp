import { Ionicons } from '@expo/vector-icons';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 70;
const SVG_HEIGHT = 90;

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Svg width={width} height={SVG_HEIGHT} viewBox={`0 0 ${width} ${SVG_HEIGHT}`} style={styles.svg}>
        <Path
          d={`M 0 20 Q ${width / 8} 20, ${width / 4} 20 L ${width * 0.35} 20 Q ${width / 2} -10, ${width * 0.65} 20 L ${width * 0.75} 20 Q ${width * 7 / 8} 20, ${width} 20 L ${width} ${SVG_HEIGHT} L 0 ${SVG_HEIGHT} Z`}
          fill="white"
          stroke="#eee"
          strokeWidth="1"
        />
      </Svg>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => alert('Add Expense')}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const iconName = 
            route.name === 'HomeTab' ? 'home-outline' :
            route.name === 'OverviewTab' ? 'stats-chart-outline' :
            route.name === 'WalletTab' ? 'wallet-outline' :
            'person-outline';

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

          if (route.name === "Add") {
              return <View key={route.key} style={styles.tabItem} />
          }

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.tabItem}
            >
              <Ionicons name={iconName} size={26} color={isFocused ? '#8A2BE2' : '#999'} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: SVG_HEIGHT,
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
    top: 0,
  },
  tabBar: {
    flexDirection: 'row',
    height: TAB_BAR_HEIGHT,
    paddingTop: 15, 
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    top: 5, 
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default CustomTabBar;