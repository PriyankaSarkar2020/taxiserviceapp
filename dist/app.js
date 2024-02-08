"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
const mysql2_1 = __importDefault(require("mysql2"));
const app = (0, express_1.default)();
const port = 3000;
const db = mysql2_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taxi_service',
});
app.use(express_1.default.json());
// Request a Ride
app.post('/request-ride', (req, res) => {
    //console.log('Request Body:', req.body); 
    const { clientId, pickupLocation, dropOffLocation, proposedPrice } = req.body;
    // Perform validation and insert into the database
    db.query('INSERT INTO ride_requests (client_id, pickup_location, drop_off_location, proposed_price) VALUES (?, ?, ?, ?)', [clientId, pickupLocation, dropOffLocation, proposedPrice], (err) => {
        if (err) {
            //console.error('Error inserting ride requests:', err);
            return res.status(500).json({ error: 'Failed to request a ride' });
        }
        //console.log('inserted ride');
        res.json({ message: 'Ride requested successfully' });
    });
});
// View Ride Requests
app.get('/view-ride-requests', (req, res) => {
    // Fetch ride requests from the database
    db.query('SELECT * FROM ride_requests', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch ride requests' });
        }
        res.json({ rideRequests: results });
    });
});
// Make Bid on Ride
app.post('/make-bid', (req, res) => {
    const { fleetId, rideRequestId, bidAmount } = req.body;
    // Perform validation and insert bid into the database
    db.query('INSERT INTO bids (fleet_id, ride_request_id, bid_amount) VALUES (?, ?, ?)', [fleetId, rideRequestId, bidAmount], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to make a bid' });
        }
        res.json({ message: 'Bid placed successfully' });
    });
});
// View Bids on Ride
app.get('/view-bids/:rideRequestId', (req, res) => {
    const rideRequestId = req.params.rideRequestId;
    // Fetch bids for the specified ride request from the database
    db.query('SELECT * FROM bids WHERE ride_request_id = ?', [rideRequestId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch bids' });
        }
        res.json({ bids: results });
    });
});
// Accept Bid
app.post('/accept-bid', (req, res) => {
    const { rideRequestId, bidId } = req.body;
    // Perform validation and update the status in the database
    db.query('UPDATE ride_requests SET bid_accepted = ? WHERE id = ?', [bidId, rideRequestId], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to accept bid' });
        }
        res.json({ message: 'Bid accepted successfully' });
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
