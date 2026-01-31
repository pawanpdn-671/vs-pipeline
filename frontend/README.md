# Visual Pipeline Editor

A React-based visual pipeline editor capable of creating, connecting, and managing various nodes (Input, LLM, Text, etc.) to form processing pipelines. This project features a React (React Flow) frontend and a Python (FastAPI) backend.

## Features

- **Visual Drag & Drop Interface**: Built with React Flow.
- **Custom Nodes**: Input, Output, Text, LLM, and more.
- **Real-time Pipeline Analysis**: Validates DAG structure.
- **Theming**: Dark and Light mode support.

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- Python (v3.8+ recommended)

### Installation & Running

#### 1. Frontend

The frontend is a React application found in the `frontend` directory.

```bash
cd frontend
# Install dependencies
npm install

# Start the development server
npm start
```

The application will run on [http://localhost:3000](http://localhost:3000).

#### 2. Backend

The backend is a FastAPI application found in the `backend` directory.

```bash
cd backend

# Install dependencies
# It is recommended to use a virtual environment
pip install fastapi uvicorn

# Start the backend server
uvicorn main:app --reload
```

The backend server will run on [http://127.0.0.1:8000](http://127.0.0.1:8000).

## Project Structure

- `frontend/src/components`: Reusable UI components.
- `frontend/src/components/nodes`: Custom node definitions for React Flow.
- `frontend/src/hooks`: Custom hooks (state management, generic logic).
- `frontend/src/store`: Zustand store for state management.
- `backend/main.py`: Main entry point for the FastAPI backend.
