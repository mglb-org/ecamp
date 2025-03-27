import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useState } from "react";
export default function PointCounts() {
    const { token, user } = useAuth();
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const fetchPoints = async () => {
            const response = await fetch(`https://70e5-49-147-157-181.ngrok-free.app/api/points/${user?.id}/my-points`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const { data } = await response.json();
            setPoints(data.reduce((acc: number, curr: any) => 
                curr.category !== 'penalty' ? acc + 1 : acc
            , 0));
        };
        fetchPoints();
    }, [user]);

    return (
        <View style={styles.statItem}>
            <Text style={styles.statNumber}>{points}</Text>
            <Text style={styles.statLabel}>Points Earned</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
