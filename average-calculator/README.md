# Average Calculator Microservice

A high-performance REST API microservice that calculates averages for different types of numbers using a sliding window implementation.

## Features

### API Endpoint
- Route: `/numbers/{numberid}`
- Supported number types:
  - `p`: Prime numbers
  - `f`: Fibonacci numbers
  - `e`: Even numbers
  - `r`: Random numbers

### Implementation Details
- Configurable window size (default: 10)
- Unique number storage with deduplication
- Sliding window implementation
- Sub-500ms response time guarantee
- Automatic error handling for slow responses

## Technical Implementation

### Architecture
- Express.js REST API
- TypeScript for type safety
- Efficient data structures for window management
- Axios for third-party API calls

### Performance Features
- Response timeout handling (500ms limit)
- Efficient number storage
- Quick average calculation
- Memory-efficient sliding window

## API Response Format

```json
{
    "windowPrevState": [],        // Previous state of the window
    "windowCurrState": [2, 4, 6], // Current state after new numbers
    "numbers": [2, 4, 6, 8],      // Numbers received from server
    "avg": 4.00                   // Average of current window
}
```

## Setup and Installation

1. Install dependencies:
```bash
npm install
```

2. Start the service:
```bash
npm start
```

The service will be available at http://localhost:9876

## Project Structure

```
src/
  └── index.ts    # Main application file with all implementations
```

## Dependencies

- Node.js 18+
- TypeScript 4
- Express 4
- Axios for API calls

## Testing

You can test the API using curl or Postman:

```bash
# Get even numbers
curl http://localhost:9876/numbers/e

# Get prime numbers
curl http://localhost:9876/numbers/p

# Get fibonacci numbers
curl http://localhost:9876/numbers/f

# Get random numbers
curl http://localhost:9876/numbers/r
```

## Best Practices

- TypeScript for type safety
- Error handling for all edge cases
- Performance optimization
- Clean code principles
- RESTful API design
- Proper HTTP status codes
- Comprehensive logging
