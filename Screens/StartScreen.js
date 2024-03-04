import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button, Text } from 'react-native-paper';
import { Octicons } from '@expo/vector-icons';

export default function StartScreen({ navigation }) {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        if (searchText.trim() !== '') {
            navigation.navigate('ResultsScreen', { searchText });
        }
    };

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Appbar.Header style={styles.appBar}>
                    <Octicons name="mark-github" size={32} color="#fff" style={styles.icon} />
                    <Text style={styles.appTitle}>Repo Downloader</Text>
                </Appbar.Header>
                <View style={styles.contentContainer}>
                    <View style={styles.searchContainer}>
                        <Octicons name="search" size={24} color="#888" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search..."
                            placeholderTextColor="#888"
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </View>
                    <Button
                        mode="contained"
                        style={styles.downloadButton}
                        onPress={handleSearch}
                        disabled={searchText.trim() === ''}
                    >
                        Search
                    </Button>
                </View>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appBar: {
        backgroundColor: '#24292e',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    icon: {
        marginRight: 8,
    },
    appTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 16,
        width: '100%',
        maxWidth: 400,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#888',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
    downloadButton: {
        borderRadius: 20,
    },
});

