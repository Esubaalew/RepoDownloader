import { View, StyleSheet, Image, Text } from 'react-native';
const NoResults = () => (
    <View style={styles.noResultsContainer}>
        <Image source={require('../assets/nosearchresult.png')} style={styles.noResultsImage} />
        <Text style={styles.noResultsText}>Your search did not match any repositories</Text>
    </View>
);


const styles = StyleSheet.create({
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResultsImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    noResultsText: {
        fontSize: 16,
    },
});
export default NoResults;