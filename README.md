# Gymshark Packing Calculator

This project calculates the minimum number of packs required to fulfill customer orders based on item quantities.

## About

This project consists of a frontend and a backend component.

- Frontend: The frontend is a React TypeScript application hosted on Netlify. It allows users to input order quantities and view the pack breakdown for Gymshark products.
Live Demo: [Gymshark Packing Calculator - Frontend](https://gymsharkpackingcalculcator.netlify.app/)

- Backend: The backend is a Golang application utilising the Gin framework and is hosted on Railway. It provides the API endpoint for calculating pack breakdowns based on order quantities.
API Endpoint: `https://packingchallenge-production.up.railway.app/calculatePacks/{item-number}`

## Features

- Input an order quantity and view the pack breakdown for Gymshark products.
- API endpoint to calculate and retrieve pack breakdowns.

## Technologies Used

- Frontend: React, TypeScript, Vite, Styled-Components, Axios
- Backend: Golang, Gin

## Usage

### Frontend

1. Visit the live demo: [Gymshark Packing Calculator - Frontend](https://gymsharkpackingcalculcator.netlify.app/)
2. Enter the desired order quantity and click "Calculate" to view the pack breakdown.

### Backend

1. Send a GET request to the API endpoint to calculate pack breakdowns


## Development

To run the frontend locally:

1. Clone this repository.
2. Navigate to the `client` directory.
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

To run the backend locally:

1. Clone this repository.
2. Navigate to the `server/src` directory.
3. Run the Golang application: `go run main.go` and will be live on port `3000`
