import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from "@/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function Dashboard() {
    const router = useRouter();

    const menuItems = [
        { title: 'My Profile', icon: 'person-outline', route: '/profile' },
        { title: 'Events', icon: 'calendar-outline', route: '/events' },
        { title: 'Points', icon: 'wallet-outline', route: '/points' },
        { title: 'Settings', icon: 'settings-outline', route: '/settings' },
    ];
    const { user } = useAuth(); 

    useEffect(() => {
        const getUserData = async () => {
            const userData = await AsyncStorage.getItem('user');
            console.log(userData);
        };
        getUserData();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 5, marginRight: 15 }}>
                    <Text style={styles.greeting}>Welcome back,</Text>
                    <Text style={styles.name}>Camper!</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginRight: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="wallet" size={32} color="#FFD700" />
                        <Text style={{ marginLeft: 4, fontWeight: '600', color: 'white', fontSize: 22 }}>2,450</Text>
                    </View>
                </View>
            </View>

            <View style={styles.menuGrid}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuItem}
                        onPress={() => router.push(item.route as any)}
                    >
                        <Ionicons name={item.icon as any} size={32} color="#4CAF50" />
                        <Text style={styles.menuText}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.quickStats}>
                <Text style={styles.statsTitle}>Quick Stats</Text>
                <View style={styles.statsGrid}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>5</Text>
                        <Text style={styles.statLabel}>Attended Events</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Points Earned</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
    },
    menuItem: {
        width: '45%',
        backgroundColor: 'white',
        margin: '2.5%',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    menuText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
    quickStats: {
        padding: 20,
    },
    statsTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 15,
        color: '#333',
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        width: '48%',
        alignItems: 'center',
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
}); 