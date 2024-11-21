# BookHive

BookHive is a web application that helps users manage their book notes and impressions. Users can create collections of books and add detailed notes for each book they read, with real-time activity tracking.

## Features

- Google OAuth 2.0 Authentication
- Personal book collection management
- Note-taking functionality for each book
- Real-time activity tracking using Kafka
- Secure user data storage

## Authentication Setup

### Google OAuth 2.0 Configuration:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and OAuth 2.0
4. Go to Credentials → Create Credentials → OAuth Client ID
5. Configure the OAuth consent screen:
   - Add application name
   - Add authorized domains
   - Save the configuration
6. Create OAuth 2.0 Client ID:
   - Select "Web Application" as application type
   - Add authorized JavaScript origins: `http://localhost:3000`
   - Add authorized redirect URI: `http://localhost:3000/auth/google/callback`
7. Copy the generated Client ID and Client Secret to your .env file

## Event Streaming

BookHive uses Apache Kafka for real-time event streaming:
- Tracks book addition events
- Monitors note creation activities
- Provides real-time logging of user activities

## Tech Stack

- Node.js
- Express.js
- MongoDB
- EJS Templates
- Passport.js (Google OAuth)
- Apache Kafka
- Docker

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Kafka and Zookeeper using Docker Compose:
   ```bash
   docker-compose up -d
   ```



