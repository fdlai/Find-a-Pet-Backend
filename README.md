# Find a Pet - Backend

This is the backend service for the **Find a Pet** application, responsible for managing pet data, handling user requests, and providing API endpoints for the frontend.

## Features

- RESTful API to manage pet listings
- Search functionality for pets by city name or ZIP code
- Data storage using MongoDB
- Integration with the [Find a Pet Frontend](https://github.com/fdlai/Find-a-Pet-Frontend)
- Uses **GeoNames API** for location-based pet searches

## Tech Stack

- **Server:** Node.js, Express
- **Database:** MongoDB (Mongoose ORM)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/fdlai/Find-a-Pet-Backend.git
   cd Find-a-Pet-Backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up your environment variables:  
   Create a `.env` file in the root directory and add the following variables:

   ```env
   GEONAMES_USERNAME=your_geonames_username
   ```

   ⚠ **Note:** This project requires a **GeoNames username** for location-based search.  
   You must [sign up for a free GeoNames account](http://www.geonames.org/login) and paste your username in the `.env` file.

4. Start the development server:

   ```sh
   npm start
   ```

## API Endpoints

All routes are prefixed with `/pets`.

### Pets

- **Create a new pet:**  
  `POST /pets/`  
  _Adds a new pet to the database._

- **Edit pet information:**  
  `PATCH /pets/:id`  
  _Updates an existing pet's details._

- **Find pets near a location (filtered search):**  
  `GET /pets/near`  
  _Returns pets near a specified location based on filtering criteria._

- **Get recently added pets:**  
  `GET /pets/recent`  
  _Retrieves the most recently added pets._

- **Get information on a specific pet by ID:**  
  `GET /pets/info/:id`  
  _Fetches detailed information about a specific pet._

- **General pet search with query parameters:**  
  `GET /pets/query`  
  _Finds pets based on various search filters._

## Connecting to the Frontend

This backend is designed to work with the [Find a Pet Frontend](https://github.com/fdlai/Find-a-Pet-Frontend). Follow the setup instructions in the frontend repository and configure API requests to point to the correct backend URL.

## Contributing

Contributions are welcome! Feel free to fork the repo and
