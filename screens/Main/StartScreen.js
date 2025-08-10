import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from './StartScreen.styles';

const StartScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/wallet.png')} style={styles.walletImage} />
      </View>
      <Text style={styles.title}>Save your money with Expense Tracker</Text>
      <Text style={styles.subtitle}>Save money! The more your money works for you, the less you have to work for money.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainTabs')}>
        <Text style={styles.buttonText}>Let&#39;s Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default StartScreen;