# URL Shortener MERN

A full-stack URL Shortener application built using the MERN stack.

## Features

* Create short URLs
* Redirect to original URLs
* Track click counts
* Copy shortened URLs
* URL validation
* REST APIs
* MongoDB Atlas integration

## Tech Stack

### Frontend

* React
* Axios
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Project Structure

```txt
backend/
frontend/
```

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

## Run Backend

```bash
cd backend
npm install
npm run dev
```

## API Endpoints

### Create Short URL

```http
POST /api/url
```

### Redirect URL

```http
GET /api/url/:shortCode
```

### Get URL Stats

```http
GET /api/url/stats/:shortCode
```
