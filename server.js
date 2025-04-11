const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory storage for development without MySQL
let flights = [
  {
    id: 1,
    flightNumber: 'AA123',
    airline: 'American Airlines',
    direction: 'A',
    airport: 'Los Angeles International Airport',
    airportCode: 'LAX',
    scheduledTime: '2024-04-11T15:30',
    status: 'Schedule',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    flightNumber: 'UA456',
    airline: 'United Airlines',
    direction: 'D',
    airport: 'San Francisco International Airport',
    airportCode: 'SFO',
    scheduledTime: '2024-04-11T16:45',
    status: 'Departed',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    flightNumber: 'DL789',
    airline: 'Delta Airlines',
    direction: 'A',
    airport: 'John F. Kennedy International Airport',
    airportCode: 'JFK',
    scheduledTime: '2024-04-11T18:15',
    status: 'Delayed',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    flightNumber: 'WN234',
    airline: 'Southwest Airlines',
    direction: 'D',
    airport: 'Chicago O\'Hare International Airport',
    airportCode: 'ORD',
    scheduledTime: '2024-04-11T19:30',
    status: 'Schedule',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    flightNumber: 'AS567',
    airline: 'Alaska Airlines',
    direction: 'A',
    airport: 'Seattle-Tacoma International Airport',
    airportCode: 'SEA',
    scheduledTime: '2024-04-11T20:45',
    status: 'Landed',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    flightNumber: 'B6789',
    airline: 'JetBlue Airways',
    direction: 'D',
    airport: 'Boston Logan International Airport',
    airportCode: 'BOS',
    scheduledTime: '2024-04-11T21:15',
    status: 'Schedule',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 7,
    flightNumber: 'NK345',
    airline: 'Spirit Airlines',
    direction: 'A',
    airport: 'Miami International Airport',
    airportCode: 'MIA',
    scheduledTime: '2024-04-11T22:00',
    status: 'Delayed',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 8,
    flightNumber: 'F9123',
    airline: 'Frontier Airlines',
    direction: 'D',
    airport: 'Denver International Airport',
    airportCode: 'DEN',
    scheduledTime: '2024-04-11T23:30',
    status: 'Schedule',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 9,
    flightNumber: 'HA456',
    airline: 'Hawaiian Airlines',
    direction: 'A',
    airport: 'Honolulu International Airport',
    airportCode: 'HNL',
    scheduledTime: '2024-04-12T01:15',
    status: 'In Flight',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 10,
    flightNumber: 'AC789',
    airline: 'Air Canada',
    direction: 'D',
    airport: 'Toronto Pearson International Airport',
    airportCode: 'YYZ',
    scheduledTime: '2024-04-12T02:30',
    status: 'Boarding',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 11,
    flightNumber: 'LH234',
    airline: 'Lufthansa',
    direction: 'A',
    airport: 'Frankfurt Airport',
    airportCode: 'FRA',
    scheduledTime: '2024-04-12T03:45',
    status: 'Cancelled',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
let nextId = 12;

console.log('Running in development mode with in-memory storage');

// Routes
app.get('/api/flights', (req, res) => {
  res.json(flights);
});

app.post('/api/flights', (req, res) => {
  console.log('Received flight data:', req.body);
  const flight = { 
    id: nextId++, 
    flightNumber: req.body.flightNumber,
    airline: req.body.airline,
    direction: req.body.direction,
    airport: req.body.airport,
    airportCode: req.body.airportCode,
    scheduledTime: req.body.scheduledTime,
    status: req.body.status,
    createdAt: new Date(), 
    updatedAt: new Date() 
  };
  console.log('Created flight:', flight);
  flights.push(flight);
  res.json(flight);
});

app.put('/api/flights/:id', (req, res) => {
  const { id } = req.params;
  const index = flights.findIndex(f => f.id === parseInt(id));
  if (index === -1) {
    res.status(404).json({ error: 'Flight not found' });
    return;
  }
  flights[index] = { 
    ...flights[index], 
    ...req.body, 
    updatedAt: new Date() 
  };
  res.json(flights[index]);
});

app.delete('/api/flights/:id', (req, res) => {
  const { id } = req.params;
  const index = flights.findIndex(f => f.id === parseInt(id));
  if (index === -1) {
    res.status(404).json({ error: 'Flight not found' });
    return;
  }
  flights.splice(index, 1);
  res.json({ message: 'Flight deleted successfully' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
