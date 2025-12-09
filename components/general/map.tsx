import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
const Map = () => {
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};

export default Map;
