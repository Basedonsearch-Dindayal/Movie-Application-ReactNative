# React Native Movie Application

A modern, feature-rich React Native movie application built with Expo Router that allows users to browse trending, top-rated, and upcoming movies using The Movie Database (TMDb) API.

## Features

- 🎬 Browse trending movies of the day
- ⭐ View top-rated movies
- 🎥 Discover upcoming releases
- 🔍 Search for movies
- 📱 View detailed movie information
- 👥 Explore cast details
- 🌙 Dark mode interface
- 📲 Cross-platform (iOS, Android, Web)

## Screenshots

*Add your app screenshots here*

## Tech Stack

- **React Native** (v0.81.5) - Mobile framework
- **Expo** (~v54.0.25) - Development platform
- **Expo Router** (~v6.0.15) - File-based routing
- **React** (v19.1.0) - UI library
- **TMDb API** - Movie data provider

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) app on your mobile device (for testing)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd React-Native-Movie-Application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure TMDb API**
   
   - Visit [The Movie Database (TMDb)](https://www.themoviedb.org/) and create an account
   - Go to Settings > API and generate an API key
   - Copy your API Read Access Token
   - Open `constants/index.js` and add your credentials:
   
   ```javascript
   export const apiKey = 'your-api-key-here'
   export const readToken = 'your-read-access-token-here'
   ```

## Running the Application

### Start the development server
```bash
npm start
```

### Run on Android
```bash
npm run android
```

### Run on iOS
```bash
npm run ios
```

### Run on Web
```bash
npm run web
```

## Project Structure

```
React-Native-Movie-Application/
├── api/
│   └── moviedb.js           # TMDb API integration
├── app/
│   ├── index.jsx            # App entry point
│   ├── search.jsx           # Search screen route
│   ├── actor/
│   │   └── [id].jsx         # Dynamic actor detail route
│   └── movie/
│       └── [id].jsx         # Dynamic movie detail route
├── assets/                  # Images and static files
├── components/
│   ├── Error.jsx            # Error display component
│   ├── Loading.jsx          # Loading indicator component
│   ├── MovieCard.jsx        # Individual movie card
│   ├── MovieList.jsx        # Movie list display
│   └── TrendingMovies.jsx   # Trending movies carousel
├── constants/
│   └── index.js             # API keys and constants
├── screens/
│   ├── CastScreen.jsx       # Cast details screen
│   ├── HomeScreen.jsx       # Main home screen
│   ├── MovieScreen.jsx      # Movie details screen
│   └── SearchScreen.jsx     # Search functionality screen
├── app.json                 # Expo configuration
├── package.json             # Project dependencies
└── README.md
```

## API Integration

This app uses [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api) to fetch movie data. The following endpoints are implemented:

- **Trending Movies**: `/trending/movie/day`
- **Top Rated Movies**: `/movie/popular`
- **Upcoming Movies**: `/movie/upcoming`
- **Movie Details**: `/movie/{id}`
- **Movie Cast**: `/movie/{id}/credits`
- **Search Movies**: `/search/movie`
- **Actor Details**: `/person/{id}`

## Key Components

### HomeScreen
The main landing screen displaying trending, top-rated, and upcoming movies in organized sections.

### SearchScreen
Allows users to search for movies by title with real-time results.

### MovieScreen
Displays detailed information about a selected movie including overview, release date, runtime, and cast.

### CastScreen
Shows detailed information about actors including biography and filmography.

## Configuration

### App Configuration (`app.json`)
- App name: project1
- Version: 1.0.0
- Orientation: Portrait
- UI Style: Dark mode
- Platforms: iOS, Android, Web

## Dependencies

Core dependencies include:
- `expo` - Expo SDK
- `expo-router` - File-based navigation
- `react-native-safe-area-context` - Safe area handling
- `react-native-screens` - Native navigation primitives
- `@expo/vector-icons` - Icon library
- `expo-status-bar` - Status bar component

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Troubleshooting

### Common Issues

**API not working**
- Ensure you've added your TMDb API credentials in `constants/index.js`
- Check that your API key is valid and active

**App won't start**
- Clear the cache: `npm start --reset-cache`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

**Build errors**
- Ensure all dependencies are installed correctly
- Check that your Node.js version is compatible (v14+)

## Acknowledgments

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the movie data API
- [Expo](https://expo.dev/) for the excellent development platform
- [React Native](https://reactnative.dev/) community

## Contact

For questions or support, please open an issue in the repository.

---

**Note**: This application is for educational purposes. Make sure to comply with TMDb's [terms of use](https://www.themoviedb.org/terms-of-use) when using their API.
