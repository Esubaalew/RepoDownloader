import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar, TextInput, Text, Card, Title, Paragraph } from 'react-native-paper';
import { Octicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import SearchResultItem from '../Components/SearchResultItem';
import NoResults from '../Components/NoResults';

const ResultsScreen = ({ route }) => {
    const { searchText } = route.params;
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [expandedItem, setExpandedItem] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                setLoading(true);
                if (searchText.trim() !== '') {
                    const response = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(searchText)}`);
                    const data = await response.json();
                    setSearchResults(data.items || []);
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchText]);

    const handleSearchTextChange = (text) => {
        navigation.setParams({ searchText: text });
    };

    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            // Handle the case when there is no screen to go back to
            // For example, navigate to a specific screen or perform a different action
        }
    };

    const handleCardPress = (item) => {
        setExpandedItem(item);
    };

    const handleCloseModal = () => {
        setExpandedItem(null);
    };

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appBar}>
                <Appbar.BackAction onPress={handleGoBack} />
            </Appbar.Header>
            <View style={styles.searchContainer}>
                <Octicons name="search" size={24} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor="#888"
                    value={searchText}
                    onChangeText={handleSearchTextChange}
                />
                {loading && <ActivityIndicator size="small" color="#888" style={styles.activityIndicator} />}
            </View>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#888" />
                    <Text style={styles.loadingText}>Getting Repos...</Text>
                </View>
            ) : searchResults.length > 0 ? (
                <FlatList
                    data={searchResults}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleCardPress(item)}>
                            <Card style={styles.card}>
                                <Card.Content>
                                    <Title style={styles.resultTitle}>{item.name}</Title>
                                    {item.description && <Paragraph>{item.description}</Paragraph>}
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.resultList}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            ) : (
                <NoResults />
            )}
            <Modal
                isVisible={!!expandedItem}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                onBackdropPress={handleCloseModal}
                style={styles.modal}
            >
                <View style={styles.modalContent}>
                    {expandedItem && (
                        <SearchResultItem
                            item={expandedItem}
                            onCloseModal={handleCloseModal}
                            onDownloadProgress={(progress) => console.log('Download Progress:', progress)}
                        />
                    )}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appBar: {
        backgroundColor: '#24292e',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        borderRadius: 20,
        backgroundColor: '#fff',
        paddingLeft: 30,
    },
    activityIndicator: {
        position: 'absolute',
        right: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
    },
    resultList: {
        paddingVertical: 8,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
    },
    card: {
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
    },
    resultTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
        maxHeight: '80%',
    },
});

export default ResultsScreen;
