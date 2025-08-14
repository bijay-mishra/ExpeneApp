import { Feather } from '@expo/vector-icons';
import { useContext } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { LanguageContext } from '../../context/LanguageContext';
import styles from './LanguageScreen.styles';

const languageData = [
    { label: 'English', value: 'en', image: require('../../assets/images/us-flag.png') },
    { label: 'Nepali', value: 'ne', image: require('../../assets/images/nepal-flag.png') },
    { label: 'Italian', value: 'it', image: require('../../assets/images/italy-flag.png') },
];

const LanguageScreen = ({ navigation }) => {
    const { locale, setLanguage } = useContext(LanguageContext);
    const renderItem = item => {
        return (
            <View style={styles.dropdownItem}>
                <Image source={item.image} style={styles.flagIcon} />
                <Text style={styles.dropdownItemText}>{item.label}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Language</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.label}>Select your preferred language</Text>
                <Dropdown
                    style={styles.dropdown}
                    containerStyle={styles.dropdownContainer}
                    itemTextStyle={styles.dropdownItemText}
                    selectedTextStyle={styles.dropdownSelectedText}
                    data={languageData}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select language"
                    value={locale}
                    onChange={item => {
                        setLanguage(item.value);
                    }}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    );
};

export default LanguageScreen;