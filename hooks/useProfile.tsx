import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
    user: {
        profilePicture: string,
        firstName: string,
        surname: string,
        middleName: string,
        maternalSurname: string,
        sex: string,
        dateOfBirth: string,
        placeOfBirth: string,
        citizenship: string,
        civilStatus: string,
        spouseName: string,
        profession: string,
        occupation: string,
        residencePeriodPH: string,
        residencePeriodLocal: string,
        address: string,
        houseNumber: string,
        sitio: string,
        barangay: string,
        latitude: number,
        longitude: number,
        name: string,
        email: string,
        role: string,
        status: string,
        createdAt: string,
        updatedAt: string,
        lastLogin: string,
        lastActivity: string,
        phone: string,
        id: string
    }
}

interface ProfileState {
    profile: User | null;
    isLoading: boolean;
    error: Error | null;
}

interface ProfileContextType extends ProfileState {
    updateProfile: (newProfile: User) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<ProfileState>({
        profile: null,
        isLoading: true,
        error: null,
    });

    const updateProfile = async (newProfile: User) => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(newProfile));
            setState(prev => ({ ...prev, profile: newProfile }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error : new Error('Failed to update profile')
            }));
        }
    };

    useEffect(() => {
        const getStoredUser = async () => {
            try {
                const user = await AsyncStorage.getItem('user');
                setState(prev => ({
                    ...prev,
                    profile: user ? JSON.parse(user).user : null,
                    isLoading: false,
                }));
            } catch (error) {
                setState(prev => ({
                    ...prev,
                    error: error instanceof Error ? error : new Error('Failed to fetch profile'),
                    isLoading: false,
                }));
            }
        };

        getStoredUser();
    }, []);

    return (
        <ProfileContext.Provider value={{ ...state, updateProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};

export default useProfile;
