// components/AudioPlayer.tsx
import { Ionicons } from "@expo/vector-icons";
import {
  Slider,
  Text,
  TouchableOpacity,
  View,
} from "@react-native-community/slider"; // or use your preferred slider
import { Audio } from "expo-av";
import { useEffect, useState } from "react";

// export default function Player({ audioUrl }: { audioUrl: string }) {

export default function Player() {
  const [audioUrl, setAudioUrl] = useState("https://freesound.org/s/841332/");
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioUrl }, // can be remote URL or local require()
      { shouldPlay: false },
      onPlaybackStatusUpdate
    );
    setSound(sound);

    const status = await sound.getStatusAsync();
    if (status.isLoaded) {
      setDuration(status.durationMillis ?? 0);
    }
  }

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setIsPlaying(status.isPlaying);

      if (status.didJustFinish) {
        setIsPlaying(false);
        setPosition(0);
      }
    }
  };

  useEffect(() => {
    loadSound();
    return () => {
      sound?.unloadAsync();
    };
  }, [audioUrl]);

  const togglePlayPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const seek = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={{ padding: 20, backgroundColor: "#f0f0f0", borderRadius: 16 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={togglePlayPause}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={50}
            color="#4a6baf"
          />
        </TouchableOpacity>
      </View>

      <Slider
        style={{ width: "100%", marginTop: 20 }}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={seek}
        minimumTrackTintColor="#4a6baf"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#4a6baf"
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 8,
        }}
      >
        <Text>{formatTime(position)}</Text>
        <Text>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}
