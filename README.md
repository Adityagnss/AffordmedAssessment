# Technical Assessment Solutions

This repository contains solutions for two technical assessment problems:

## 1. Social Media Analytics Frontend

A React-based web application that provides real-time analytics for a social media platform. Located in the `/social-media-analytics` directory.

### Features
- Top Users Page: Shows top 5 users with highest post count
- Trending Posts Page: Displays posts with maximum comments
- Feed Page: Real-time feed with newest posts first

### Tech Stack
- React with TypeScript
- Material UI
- React Router
- Axios for API calls

### Running the Application
```bash
cd social-media-analytics
npm install
npm start
```

The application will be available at http://localhost:3000

## 2. Average Calculator Microservice

A REST API microservice that calculates averages for different types of numbers using a sliding window approach. Located in the `/average-calculator` directory.

### Features
- REST API endpoint `/numbers/{numberid}`
- Support for prime (p), fibonacci (f), even (e), and random (r) numbers
- Configurable window size
- Sub-500ms response time
- Unique number storage with sliding window

### Tech Stack
- Node.js with TypeScript
- Express
- Axios for API calls

### Running the Service
```bash
cd average-calculator
npm install
npm start
```

The service will be available at http://localhost:9876
# AffordmedAssessment
