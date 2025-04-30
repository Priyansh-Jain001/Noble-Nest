# NobleNest

NobleNest serves as a comprehensive online platform designed to facilitate the buying, selling, and renting of residential, commercial, and industrial properties. It typically features detailed listings of properties, inclusive of high-resolution images, and essential specifications such as size, location, price, and amenities. Additionally, it also provide search filters to help users refine their searches based on various criteria.

## Features of NobleNest

The Noble Nest is a robust real estate platform that integrates a wide array of advanced features to enhance user experience and streamline property transactions. Key functionalities include:

- Authentication: Secure user authentication through registration and login systems, enabling both buyers and sellers to manage their profiles, listings, and transactions efficiently.

- Search Functionality: An intuitive search engine that allows users to filter properties based on criteria such as location, price range, type, size, and amenities.

- Property Listings: Detailed listings showcasing properties for sale, rent, complete with descriptions, images, specifications, and contact details.

- Image Uploads: A seamless interface for sellers to upload high-quality images and virtual tours of properties, enhancing visual appeal and engagement. 

etc.

## Installation
Follow these steps to set up and run the project locally:

## #Pre-requisites
- Node.js (v16 or later)
- npm or yarn

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Priyansh-Jain001/Noble-Nest
   ```

2. **Install dependencies:**

   Using npm:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

3. **Run the development server:**

- Set up your MongoDB connection string in the .env file. Start the backend server:
    Using npm:
   ```bash
   node app1.js
   ```

   Or using yarn:
   ```bash
   yarn node app1.js
   ```

4. **Open in browser:**

   Open with Live Server. It will now run on localhost:8080/home.

## Scripts

- `npm install`: Intall the dependencies required for running the Node.js server.
- `node app1.js`: Start the server.

## Setting Up Database

### MongoDB Atlas Setup
Create a free MongoDB Atlas account. Create a new cluster and database. Secure your cluster by enabling authentication and creating a user. Obtain the connection string for your MongoDB database. Add the connection string to your backend project's .env file (api).