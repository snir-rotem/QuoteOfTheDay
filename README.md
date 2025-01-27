# Quote Fetching App

## Overview
This is a React-based application that fetches and displays quotes using the [FavQs API](https://favqs.com/) and a backend with MongoDB for storing quotes. The app allows users to:

- Select the number of quotes they want to fetch.
- Filter quotes by tags.
- Store the selected count and tags as URL search parameters for better shareability and bookmarking.
- Save and retrieve quotes from a MongoDB database via a backend API.

## Features
- **Quote Fetching**: Fetch quotes from FavQs API with dynamic filtering by tags and a customizable count.
- **Tag Management**: Load and display a list of available tags for filtering quotes.
- **Database Storage**: Save fetched quotes in a MongoDB database to avoid duplicates and enable offline access.
- **State Management**: Efficiently manage state and prevent infinite loops while updating search parameters.

## Project Structure
```
backend/
├── models/
│   ├── Quote.ts              // Mongoose model for quotes
│   ├── Tag.ts                // Mongoose model for tags
├── controllers/
│   ├── quoteController.ts    // controller for quotes API
│   ├── tagsController.ts    // controller for tags API
├── services/
│   ├── tagService.ts    // controller for quotes API
├── server.ts                 // Entry point for the backend server

src/
├── components/
│   ├── Header.tsx           // Header component for user inputs
│   ├── Content.tsx          // Displays fetched quotes
│   ├── TagSelector.tsx          // Displays autocomplete selector for tags
├── hooks/
│   ├── useQuotes.ts         // Custom hook to fetch quotes
│   ├── useTags.ts           // Custom hook to fetch tags
├── models/
│   ├── quote.ts 
├── App.tsx                  // Main application file
├── index.tsx                // Entry point of the app
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/quote-fetching-app.git
   cd quote-fetching-app
   ```

2. Install dependencies:
   ```bash
   npm install
   cd backend
   npm install
   ```

3. Set up MongoDB:
   - Install MongoDB if not already installed.
   - Start the MongoDB server.
   - Create a database named `quotes_db` (or any name you prefer).

4. Create environment files:
   - Backend `.env` file:
     ```env
     MONGO_URI=mongodb://localhost:27017/quotes_db
     FAVQS_API_KEY=your_api_key_here
     ```

5. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

6. Start the development server for the frontend:
   ```bash
   npm run dev
   ```

## Usage

1. Open the app in your browser (default URL: `http://localhost:5173`).
2. Use the header section to:
   - Set the number of quotes to fetch.
   - Select tags for filtering quotes.
3. Click "Refresh" to fetch quotes based on your selections.
4. Quotes fetched from the API are saved to the MongoDB database to prevent duplicates. When fetching quotes, the app first checks the database before making external API calls.

## Key Technical Details

### API Integration
- **FavQs API**: Quotes are fetched via a GET request to the FavQs API.
- **Dynamic Filtering**: Tags and count are dynamically added to the API request URL based on user input.

## Available Scripts

- `npm run dev`: Start the development server (frontend).
- `npm start`: Start the backend server.
- `npm run build`: Build the frontend app for production.
- `npm run preview`: Preview the production build.

## Dependencies
### Frontend:
- **React**: Frontend library for building user interfaces.
- **React Router DOM**: For managing URL search parameters.
- **Axios**: For making HTTP requests.

### Backend:
- **Express**: Web framework for Node.js.
- **Mongoose**: For MongoDB schema modeling and interaction.

## Environment Variables
Ensure the following environment variables are set:

### Backend:
```env
MONGO_URI=mongodb://localhost:27017/quotes_db
FAVQS_API_KEY=your_api_key_here
```

## Contributing
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of your changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

---

Happy coding!

