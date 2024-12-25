# VoiceWatch Mobile

A mobile application for voice-based emergency detection and alert system.

## Features

- User authentication (Sign up/Sign in)
- Voice monitoring
- Emergency contact management
- Profile management
- Sensitivity settings
- Manual alert triggering

## Getting Started

### Prerequisites

- Node.js
- NativeScript CLI

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

For iOS:
```bash
ns run ios
```

For Android:
```bash
ns run android
```

## Project Structure

```
src/
├── components/
│   ├── screens/
│   │   ├── SplashScreen.tsx
│   │   ├── SignInScreen.tsx
│   │   ├── SignUpScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── LogoutModal.tsx
│   └── MainStack.tsx
└── app.ts
```

## Development

The project uses:
- React NativeScript for UI components
- React Navigation for screen navigation
- NativeScript Core features for native functionality