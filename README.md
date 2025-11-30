/
├── App.jsx # Main entry point (Redux Provider, NavigationContainer)
├── index.js # (Standard React Native entry)
|
├── src/
│ ├── api/
│ │ ├── apiSlice.js # RTK Query base API definition (like the previous turn)
│ │ └── authApi.js # Specific API endpoints (e.g., login, profile)
│ |
│ ├── components/
│ │ ├── shared/
│ │ │ └── LoadingSpinner.jsx
│ │ └── ui/
│ │ └── Button.jsx
│ |
│ ├── navigation/
│ │ ├── RootNavigator.jsx # Main Stack Navigator (Auth, App)
│ │ ├── TabNavigator.jsx # Bottom Tab Navigator for main screens
│ │ └── NavigationTypes.ts # TypeScript types for navigation
│ |
│ ├── screens/ # The "Routes" equivalent
│ │ ├── Auth/ # Nested screens for authentication
│ │ │ └── SignInScreen.jsx
│ │ |
│ │ ├── Home/
│ │ │ ├── HomeScreen.jsx
│ │ │ └── PostDetailScreen.jsx
│ │ |
│ │ └── Settings/
│ │ ├── SettingsScreen.jsx
│ │ └── ProfileScreen.jsx
│ |
│ └── state/
│ ├── store.js # Redux store configuration
│ └── features/
│ └── userSlice.js # Redux slice for local state
│
└── package.json
