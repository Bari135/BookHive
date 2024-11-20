# BookHive

BookHive is a web application that helps users manage their book notes and impressions. Users can create collections of books and add detailed notes for each book they read.

## Features

- Google OAuth 2.0 Authentication
- Personal book collection management
- Note-taking functionality for each book
- Secure user data storage

## Authentication

The application uses Google OAuth 2.0 for authentication, allowing users to:
- Sign in securely with their Google account
- Access their personal book collections
- Maintain session persistence

## Tech Stack

- Node.js
- Express.js
- MongoDB
- EJS Templates
- Passport.js (Google OAuth)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   ```
4. Set up Google OAuth 2.0:
   - Go to Google Cloud Console
   - Create a new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs

5. Start the application:
   ```bash
   npm start
   ```

## Running in Development

The application will be available at `http://localhost:3000`


