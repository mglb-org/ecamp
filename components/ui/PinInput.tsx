import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface PinInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  secure?: boolean;
}

export function PinInput({ 
  value, 
  onChange, 
  length = 6, 
  secure = false 
}: PinInputProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= length) {
      onChange(numericText);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          { 
            color: colors.text,
            borderColor: colors.border,
          }
        ]}
        value={value}
        onChangeText={handleChange}
        keyboardType="numeric"
        maxLength={length}
        secureTextEntry={secure}
        placeholder="Enter MPIN"
        placeholderTextColor={colors.tabIconDefault}
      />
      <View style={styles.dotsContainer}>
        {Array.from({ length }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index < value.length ? colors.tint : colors.border,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
}); 