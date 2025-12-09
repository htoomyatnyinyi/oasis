import { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

// Assuming you are using NativeWind or a similar Tailwind integration:

const Index = () => {
  // 1. Corrected typo: activeIndex
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Set a background color for the SafeAreaView for better visibility */}
      <View className="flex-1 bg-white">
        <Swiper
          ref={swiperRef}
          loop={true}
          autoplay={true}
          autoplayTimeout={2}
          // 2. Corrected/Improved Dot Styling: Inactive dots are light gray
          dot={<View className="w-4 h-1 mx-1 bg-gray-300 rounded-full" />}
          // Active dot is amber
          activeDot={
            <View className="w-4 h-1 mx-1 bg-amber-500 rounded-full" />
          }
          // Optional: Add some padding to the pagination area
          paginationStyle={{ bottom: 20 }}
          onIndexChanged={(index) => setActiveIndex(index)}
        >
          {/* Slide 1 */}
          <View className="flex-1 justify-center items-center p-8">
            <Text className="text-3xl font-bold mb-4">Hello!</Text>
            <Text className="text-lg text-center text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              cumque atque saepe id natus exercitationem voluptatibus, odit ab
              enim error. Ullam velit, atque assumenda eveniet possimus corporis
              porro ducimus vitae!
            </Text>
          </View>

          {/* Example of a Second Slide to test the swiper and dots */}
          <View className="flex-1 justify-center items-center p-8 bg-blue-50">
            <Text className="text-3xl font-bold mb-4 text-blue-800">
              Next Slide
            </Text>
            <Text className="text-lg text-center text-blue-600">
              This is the second slide. The dot indicator below should now be on
              the right and highlighted in amber.
            </Text>
          </View>
        </Swiper>

        {/* Example of using the activeIndex state (optional) */}
        <View className="p-4 items-center">
          <Text className="text-sm text-gray-500">
            Current Slide Index: {activeIndex}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Simple StyleSheet for the container view
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Index;
