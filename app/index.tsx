import { Text, View, Pressable, ImageBackground, Dimensions, ScrollView } from "react-native";
import { router } from 'expo-router';
import { useState, useRef } from 'react';

const { width } = Dimensions.get('window');

const slides = [
  {
    title: "Welcome to eCampaign",
    description: "Your all-in-one digital platform for managing political campaigns",
    image: require('../assets/images/slide1.png'),
  },
  {
    title: "Organize Events",
    description: "Plan and manage rallies, town halls, and campaign events effortlessly",
    image: require('../assets/images/slide2.webp'),
  },
  {
    title: "Track Progress",
    description: "Monitor campaign metrics and voter engagement in real-time",
    image: require('../assets/images/slide3.png'),
  },
  {
    title: "Team Collaboration",
    description: "Connect and coordinate with your campaign team seamlessly",
    image: require('../assets/images/slide4.png'),
  },
  {
    title: "Ready to Win",
    description: "Start your journey to a successful campaign today",
    image: require('../assets/images/slide5.jpg'),
  },
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <View key={index} style={{ width, height: '100%' }}>
            <ImageBackground
              source={slide.image}
              resizeMode="cover"
              style={{ flex: 1 }}
            >
              <View style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                justifyContent: 'flex-end',
                padding: 20,
                paddingBottom: 100,
              }}>
                <Text style={{
                  fontSize: 32,
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: 12,
                }}>
                  {slide.title}
                </Text>
                <Text style={{
                  fontSize: 18,
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 24,
                }}>
                  {slide.description}
                </Text>
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={{
        position: 'absolute',
        bottom: 80,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        gap: 8,
      }}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
            }}
          />
        ))}
      </View>

      {/* Get Started Button */}
      <View style={{
        position: 'absolute',
        bottom: 20,
        width: '100%',
        paddingHorizontal: 20,
      }}>
        <Pressable
          onPress={() => router.push('/auth')}
          style={({ pressed }) => ({
            backgroundColor: 'white',
            paddingVertical: 16,
            borderRadius: 12,
            opacity: pressed ? 0.9 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          })}
        >
          <Text style={{
            color: '#1a2a6c',
            fontSize: 16,
            fontWeight: '600',
            textAlign: 'center',
          }}>
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Skip'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
