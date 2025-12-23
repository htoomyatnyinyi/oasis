// // Polyfill for React Native environments if stuck on older RTK versions
// if (typeof DOMException === "undefined") {
//   global.DOMException = class DOMException extends Error {
//     static readonly INDEX_SIZE_ERR = 1;
//     static readonly DOMSTRING_SIZE_ERR = 2;
//     static readonly HIERARCHY_REQUEST_ERR = 3;
//     static readonly WRONG_DOCUMENT_ERR = 4;
//     static readonly INVALID_CHARACTER_ERR = 5;
//     static readonly NO_DATA_ALLOWED_ERR = 6;
//     static readonly NO_MODIFICATION_ALLOWED_ERR = 7;
//     static readonly NOT_FOUND_ERR = 8;
//     static readonly NOT_SUPPORTED_ERR = 9;
//     static readonly INUSE_ATTRIBUTE_ERR = 10;
//     static readonly INVALID_STATE_ERR = 11;
//     static readonly SYNTAX_ERR = 12;
//     static readonly INVALID_MODIFICATION_ERR = 13;
//     static readonly NAMESPACE_ERR = 14;
//     static readonly INVALID_ACCESS_ERR = 15;
//     static readonly VALIDATION_ERR = 16;
//     static readonly TYPE_MISMATCH_ERR = 17;
//     static readonly SECURITY_ERR = 18;
//     static readonly NETWORK_ERR = 19;
//     static readonly ABORT_ERR = 20;
//     static readonly URL_MISMATCH_ERR = 21;
//     static readonly QUOTA_EXCEEDED_ERR = 22;
//     static readonly TIMEOUT_ERR = 23;
//     static readonly INVALID_NODE_TYPE_ERR = 24;
//     static readonly DATA_CLONE_ERR = 25;

//     constructor(message, name = "DOMException") {
//       super(message);
//       this.name = name;
//     }
//   } as any;
// }

import store from "@/redux/store/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}></Stack.Screen>

        <Stack.Screen
          name="modal"
          options={{ headerShown: false }}></Stack.Screen>

        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}></Stack.Screen>
      </Stack>
    </Provider>
  );
}
