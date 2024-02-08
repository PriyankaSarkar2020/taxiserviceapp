# Taxi Service Web App API

This API provides a unique bidding system for a taxi service, allowing clients to request rides with proposed prices, and fleets to view and place bids on these requests.

## Getting Started

Follow the steps below to set up and install the application.

### Prerequisites
- Postman and Database needs to be installed. Here, we have used MySQL database.
- Before running application, make sure to create the database and create tables.
- Need to install [Node.js](https://nodejs.org/). Make sure we have node js and npm installed in the terminal.
 Use the below command to check node version:
 node -v (Here, our version is v18.17.1)
- Create a new directory for our project and navigate to the terminal.
- Run npm init -y to initialize a package.json file.
- Install the necessary packages:
  npm install express typescript mysql2
- Create a tsconfig.json file for TypeScript configuration by running the command:
  tsc --init

- Here we have customised the tsconfig.json file.

# Steps on the coding for tasi-service app

- Added the port 3000, and the code for Request a Ride, View Ride Requests, Make Bid on Ride,
  View Bids on Ride, Accept Bid.
- We have created database and tables using the below command:

  CREATE DATABASE taxi_service;
  USE taxi_service;

  CREATE TABLE clients (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(15)
);

 CREATE TABLE fleets (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(15)
);

  CREATE TABLE ride_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id VARCHAR(50) NOT NULL,
  pickup_location VARCHAR(255) NOT NULL,
  drop_off_location VARCHAR(255) NOT NULL,
  proposed_price DECIMAL(10, 2) NOT NULL,
  bid_accepted INT DEFAULT NULL
);

CREATE TABLE bids (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fleet_id VARCHAR(50) NOT NULL,
  ride_request_id INT NOT NULL,
  bid_amount DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (ride_request_id) REFERENCES ride_requests(id)
);

# API Implementation

a) Request a Ride

Endpoint: POST /request-ride
Payload: { clientId, pickupLocation, dropOffLocation, proposedPrice }
Response: {  message: "Ride requested successfully" }

b) View Ride Requests

Endpoint: GET /view-ride-requests
Response: { rideRequests: [{"id": Number, "client_id": "String", "pickup_location": "String", "drop_off_location":"String", "proposed_price": Number, "bid_accepted": null}] }

c) Make Bid on Ride

Endpoint: POST /make-bid
Payload: {   "fleetId": "String",  "rideRequestId": Number,   "bidAmount": Number }
Response: { message: "Bid placed successfully" }

d) View Bids on Ride

Endpoint: GET /view-bids/<ride_request_id>
Response: { bids: ["bids": [{"id": Number, "fleet_id": "String", "ride_request_id": Number, "bid_amount": Number},] }

e) Accept Bid

Endpoint: POST /accept-bid
Payload: {   "rideRequestId": Number,  "bidId": Number }
Response: { message: "Bid accepted successfully" }

