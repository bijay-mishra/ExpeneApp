import { StyleSheet, Text, View } from 'react-native';

const StatsScreen = () => (
  <View style={styles.container}>
    <Text>Stats Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default StatsScreen;