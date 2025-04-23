# Smart IPTV Viewer

A modern, cross-platform IPTV streaming application built with React Native and Expo. This app allows users to add and manage M3U playlists, browse channels by category, mark favorites, and enjoy a seamless streaming experience.

![Smart IPTV Viewer](https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?q=80&w=256&auto=format&fit=crop)

## Features

- **M3U/M3U8 Playlist Support**: Add and manage multiple IPTV playlists
- **Automatic Updates**: Periodically check for playlist updates in the background
- **Category Browsing**: Browse channels organized by categories
- **Favorites**: Mark and access your favorite channels quickly
- **Recently Watched**: Continue watching from where you left off
- **Search**: Find channels by name or category
- **Dark Mode**: Toggle between light and dark themes
- **Cross-Platform**: Works on iOS, Android, and web platforms

## Screenshots

(Screenshots would be here in a real README)

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JehadurRE/smart-iptv-viewer.git
   cd smart-iptv-viewer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Run on your device or emulator:
   - Scan the QR code with the Expo Go app
   - Press 'a' for Android emulator
   - Press 'i' for iOS simulator
   - Press 'w' for web browser

## Usage

### Adding a Playlist

1. Navigate to the Settings tab
2. Tap "Add" in the Playlists section
3. Enter a name for your playlist (optional)
4. Enter the URL of your M3U playlist
5. Tap "Add Playlist"

### Watching Channels

1. Browse channels on the Home or Channels tab
2. Tap on a channel to start watching
3. Use the player controls to play/pause, adjust volume, or go fullscreen
4. Tap the heart icon to add to favorites

### Managing Playlists

1. Go to the Settings tab
2. View all your added playlists
3. Tap the refresh icon to update a specific playlist
4. Tap the trash icon to remove a playlist

### Customizing Update Settings

1. Go to Settings > Update Settings
2. Choose how often the app should check for playlist updates
3. Manually update all playlists by tapping "Update Now"

## Technical Details

### Architecture

- **React Native**: Core framework for building the mobile app
- **Expo**: Development platform and toolchain
- **Expo Router**: File-based routing similar to Next.js
- **Zustand**: State management with persistence
- **AsyncStorage**: Local storage for playlists and preferences

### Key Components

- **M3U Parser**: Custom utility for parsing M3U playlist files
- **Background Fetch**: Periodic playlist update mechanism
- **Video Player**: Built with Expo AV for streaming support
- **Theme Provider**: Context-based theming system

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

**JehadurRE**  
CyArm  
🇧🇩 🇵🇸

- GitHub: [https://github.com/JehadurRE](https://github.com/JehadurRE)
- Website: [https://www.jehadurre.me](https://www.jehadurre.me)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This app does not provide any IPTV content. It is a player for M3U playlists that you provide. The developers are not responsible for the content accessed through this application. Please ensure you have the right to access any content you stream.

---

© 2025 JehadurRE@CyArm 🇧🇩 🇵🇸