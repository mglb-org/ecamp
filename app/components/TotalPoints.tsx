import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function TotalPoints({ userId }: { userId: string }) {
    const [points, setPoints] = useState<number>(0);
    const { token } = useAuth();

    useEffect(() => {
        const fetchPoints = async () => {
            const response = await fetch(`https://70e5-49-147-157-181.ngrok-free.app/api/points/${userId}/my-points`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const { data } = await response.json();
            setPoints(data.reduce((acc: number, curr: any) => acc + curr.points, 0));
        };
        if (userId) {
            fetchPoints();
        }
    }, [userId]);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginRight: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="wallet" size={32} color="#FFD700" />
                <Text style={{ marginLeft: 4, fontWeight: '600', color: 'white', fontSize: 22 }}>{points.toLocaleString() || '0'}</Text>
            </View>
        </View>
    );
}
