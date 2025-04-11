// Global state
let flights = [];
let currentFilters = {
    direction: '',
    status: '',
    search: ''
};

// Fetch flights from the server
async function fetchFlights() {
    try {
        const response = await fetch('/api/flights');
        console.log('Fetch response:', response);
        flights = await response.json();
        console.log('Fetched flights:', flights);
        renderFlights();
    } catch (error) {
        console.error('Error fetching flights:', error);
        alert('Failed to load flights');
    }
}

// Render flights to the table
function renderFlights() {
    const tbody = document.getElementById('flightsTableBody');
    const filteredFlights = filterFlights();
    
    tbody.innerHTML = filteredFlights.map(flight => `
        <tr class="hover:bg-gray-50 border-b border-gray-200">
            <td class="px-6 py-4">
                <div class="font-medium text-gray-900">${flight.flightNumber}</div>
                <div class="text-sm text-gray-500">${flight.airline}</div>
            </td>
            <td class="px-6 py-4">
                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${flight.direction === 'A' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'}">
                    ${flight.direction === 'A' ? 'Arrival' : 'Departure'}
                </span>
            </td>
            <td class="px-6 py-4">
                <div class="font-medium text-gray-900">${flight.airport}</div>
                <div class="text-sm font-mono text-gray-500">${flight.airportCode}</div>
            </td>
            <td class="px-6 py-4">
                <div class="font-medium">${formatDateTime(flight.scheduledTime)}</div>
                ${flight.estimatedTime ? 
                    `<div class="text-sm text-amber-600">Est: ${formatDateTime(flight.estimatedTime)}</div>` : 
                    ''}
            </td>
            <td class="px-6 py-4">
                <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(flight.status)}">
                    ${flight.status}
                </span>
            </td>
            <td class="px-6 py-4">
                ${flight.direction === 'A' ? 
                    `<div class="font-medium">Belt: ${flight.belt || '-'}</div>` :
                    `<div class="font-medium">Gate: ${flight.gate || '-'}</div>`
                }
            </td>
            <td class="px-6 py-4 text-right">
                <button onclick="editFlight(${flight.id})" class="text-indigo-600 hover:text-indigo-900 mr-4">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteFlight(${flight.id})" class="text-red-600 hover:text-red-900">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Filter flights based on current filters
function filterFlights() {
    return flights.filter(flight => {
        const matchesDirection = !currentFilters.direction || flight.direction === currentFilters.direction;
        const matchesStatus = !currentFilters.status || flight.status === currentFilters.status;
        const matchesSearch = !currentFilters.search || 
            flight.flightNumber.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
            flight.airline.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
            flight.airport.toLowerCase().includes(currentFilters.search.toLowerCase());
        
        return matchesDirection && matchesStatus && matchesSearch;
    });
}

// Apply filters
function applyFilters() {
    currentFilters = {
        direction: document.getElementById('directionFilter').value,
        status: document.getElementById('statusFilter').value,
        search: document.getElementById('searchInput').value
    };
    renderFlights();
}

// Format date and time
function formatDateTime(dateString) {
    return new Date(dateString).toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

// Get status color class
function getStatusColor(status) {
    const colors = {
        'Schedule': 'bg-blue-100 text-blue-800',
        'Landed': 'bg-green-100 text-green-800',
        'Departed': 'bg-purple-100 text-purple-800',
        'Delayed': 'bg-yellow-100 text-yellow-800',
        'Cancelled': 'bg-red-100 text-red-800',
        'Boarding': 'bg-indigo-100 text-indigo-800',
        'In Flight': 'bg-cyan-100 text-cyan-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

// Modal functions
// Store airline flight number patterns
const airlineFlightPatterns = {
    'American Airlines': ['AA', 'AAL'],
    'United Airlines': ['UA', 'UAL'],
    'Delta Airlines': ['DL', 'DAL'],
    'Southwest Airlines': ['WN', 'SWA'],
    'Alaska Airlines': ['AS', 'ASA'],
    'JetBlue Airways': ['B6', 'JBU'],
    'Spirit Airlines': ['NK', 'NKS'],
    'Frontier Airlines': ['F9', 'FFT'],
    'Hawaiian Airlines': ['HA', 'HAL'],
    'Air Canada': ['AC', 'ACA'],
    'Lufthansa': ['LH', 'DLH']
};

// Setup flight number suggestions based on airline
function setupFlightNumberSuggestions(initialAirline = '') {
    console.log('Setting up flight number suggestions for:', initialAirline);
    const airlineInput = document.getElementById('airline');
    const flightNumberInput = document.getElementById('flightNumber');
    
function updateFlightNumberSuggestions(airline) {
    console.log('Updating flight number suggestions for airline:', airline);
        const patterns = airlineFlightPatterns[airline];
        
        if (patterns) {
            let datalist = document.getElementById('flightNumberSuggestions');
            if (!datalist) {
                datalist = document.createElement('datalist');
                datalist.id = 'flightNumberSuggestions';
                flightNumberInput.parentNode.appendChild(datalist);
                flightNumberInput.setAttribute('list', 'flightNumberSuggestions');
            }
            
            datalist.innerHTML = patterns.map(prefix => {
                const examples = [];
                for (let i = 1; i <= 3; i++) {
                    const number = Math.floor(Math.random() * 999) + 1;
                    examples.push(`<option value="${prefix}${number.toString().padStart(3, '0')}">`);
                }
                return examples.join('');
            }).join('');
        } else {
            const datalist = document.getElementById('flightNumberSuggestions');
            if (datalist) {
                datalist.remove();
                flightNumberInput.removeAttribute('list');
            }
        }
    }

    // Add event listener for airline input
    airlineInput.addEventListener('input', function() {
        updateFlightNumberSuggestions(this.value);
    });

    // If initial airline is provided and valid, show suggestions
    if (initialAirline && initialAirline in airlineFlightPatterns) {
        updateFlightNumberSuggestions(initialAirline);
    }
}

function openAddFlightModal() {
    document.getElementById('modalTitle').textContent = 'Add New Flight';
    document.getElementById('flightId').value = '';
    document.getElementById('flightForm').reset();
    document.getElementById('flightModal').classList.remove('hidden');
    
    setupFlightNumberSuggestions();
}

function closeModal() {
    document.getElementById('flightModal').classList.add('hidden');
}

async function editFlight(id) {
    const flight = flights.find(f => f.id === id);
    if (!flight) return;

    document.getElementById('modalTitle').textContent = 'Edit Flight';
    document.getElementById('flightId').value = flight.id;
    document.getElementById('flightNumber').value = flight.flightNumber;
    document.getElementById('airline').value = flight.airline;
    document.getElementById('direction').value = flight.direction;
    document.getElementById('airport').value = flight.airport;
    document.getElementById('airportCode').value = flight.airportCode;
    document.getElementById('scheduledTime').value = flight.scheduledTime.slice(0, 16);
    document.getElementById('status').value = flight.status;

    document.getElementById('flightModal').classList.remove('hidden');
    
    // Setup flight number suggestions with the current airline
    setupFlightNumberSuggestions(flight.airline);
}

async function deleteFlight(id) {
    if (!confirm('Are you sure you want to delete this flight?')) return;

    try {
        const response = await fetch(`/api/flights/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to delete flight');
        
        flights = flights.filter(f => f.id !== id);
        renderFlights();
    } catch (error) {
        console.error('Error deleting flight:', error);
        alert('Failed to delete flight');
    }
}

// Form submission
document.getElementById('flightForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form elements
    const flightId = document.getElementById('flightId').value;
    const flightNumber = document.getElementById('flightNumber').value.trim();
    const airline = document.getElementById('airline').value.trim();
    const direction = document.getElementById('direction').value;
    const airport = document.getElementById('airport').value.trim();
    const airportCode = document.getElementById('airportCode').value.trim();
    const scheduledTime = document.getElementById('scheduledTime').value;
    const status = document.getElementById('status').value;

    // Validate required fields
    if (!flightNumber || !airline || !direction || !airport || !airportCode || !scheduledTime || !status) {
        alert('Please fill in all required fields');
        return;
    }

    const flightData = {
        flightNumber: flightNumber,
        airline: airline,
        direction: direction,
        airport: airport,
        airportCode: airportCode,
        scheduledTime: scheduledTime,
        status: status
    };

    try {
        const url = flightId ? `/api/flights/${flightId}` : '/api/flights';
        const method = flightId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(flightData)
        });

        if (!response.ok) throw new Error('Failed to save flight');

        await fetchFlights();
        closeModal();
    } catch (error) {
        console.error('Error saving flight:', error);
        alert('Failed to save flight');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchFlights();
});

// Search input handler
document.getElementById('searchInput').addEventListener('input', (e) => {
    currentFilters.search = e.target.value;
    renderFlights();
});
