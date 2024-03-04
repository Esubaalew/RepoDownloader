import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card, Title } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatDistanceToNow, parseISO } from 'date-fns';

const formatDate = (dateString) => {
    const date = parseISO(dateString);
    const now = new Date();
    const distance = formatDistanceToNow(date, { addSuffix: true });
    return distance;
};

const formatNumber = (number) => {
    if (number >= 1000 && number < 1000000) {
        return (number / 1000).toFixed(1) + 'K';
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else {
        return number.toString();
    }
};

const SearchResultItem = ({ item, onCloseModal, onDownloadProgress }) => {
    const { name, description, language, stargazers_count, updated_at } = item;
    const [downloadProgress, setDownloadProgress] = useState(0);

    const handleDownload = () => {
        // Simulating download progress
        const interval = setInterval(() => {
            if (downloadProgress < 100) {
                setDownloadProgress((prevProgress) => prevProgress + 10);
            } else {
                clearInterval(interval);
            }
        }, 500);

     
        onDownloadProgress && onDownloadProgress(downloadProgress);
    };

    return (
        <Card style={styles.resultCard}>
            <Card.Content>
                <Title style={styles.resultTitle}>{name}</Title>
                {description && <Text>{description}</Text>}
                <View style={styles.detailsContainer}>
                    {language && (
                        <View style={styles.detailsItem}>
                            <Icon name="circle" size={12} color="#888" style={styles.languageIcon} />
                            <Text style={styles.detailsText}>{language}</Text>
                        </View>
                    )}
                    {stargazers_count && (
                        <View style={styles.detailsItem}>
                            <Icon name="star" size={12} color="#888" style={styles.starIcon} />
                            <Text style={styles.detailsText}>{formatNumber(stargazers_count)}</Text>
                        </View>
                    )}
                    {updated_at && (
                        <View style={styles.detailsItem}>
                            <Icon name="calendar" size={12} color="#888" style={styles.calendarIcon} />
                            <Text style={styles.detailsText}>{formatDate(updated_at)}</Text>
                        </View>
                    )}
                </View>
                <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
                    <Text style={styles.downloadButtonText}>
                        {downloadProgress < 100 ? `Download (${downloadProgress}%)` : 'Downloaded'}
                    </Text>
                </TouchableOpacity>
                {downloadProgress < 100 && (
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, { width: `${downloadProgress}%` }]} />
                    </View>
                )}
                <TouchableOpacity style={styles.closeButton} onPress={onCloseModal}>
                    <Icon name="close" size={24} color="#888" />
                </TouchableOpacity>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    resultCard: {
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
    },
    resultTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    detailsContainer: {
        flexDirection: 'row',
        marginTop: 8,
    },
    detailsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    languageIcon: {
        marginRight: 4,
    },
    starIcon: {
        marginRight: 4,
    },
    calendarIcon: {
        marginRight: 4,
    },
    detailsText: {
        fontSize: 12,
        color: '#888',
    },
    downloadButton: {
        marginTop: 8,
        backgroundColor: '#888',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
        alignItems: 'center',
    },
    downloadButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: '#eee',
        borderRadius: 4,
        marginTop: 8,
    },
    progressBar: {
        height: 6,
        backgroundColor: '#888',
        borderRadius: 4,
    },
    closeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
});

export default SearchResultItem;
