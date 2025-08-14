import { Feather } from '@expo/vector-icons';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

const ReportProblemScreen = ({ navigation }) => (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
                <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>Report a Problem</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: '#888' }}>Coming Soon</Text>
        </View>
    </SafeAreaView>
);

export default ReportProblemScreen;