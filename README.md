# TaskFlow - Frontend Internship Assignment

A modern, responsive Task Board application built with React, Vite, and @hello-pangea/dnd.

## Features

-   **Authentication**: Static login (`intern@demo.com` / `intern123`) with "Remember Me" functionality.
-   **Task Board**: Drag and drop tasks between columns (Todo, Doing, Done).
-   **Task Management**: Create, Edit, Delete tasks with attributes like Priority, Due Date, and Tags.
-   **Advanced Board**:
    -   Search by title.
    -   Filter by priority.
    -   Sort by due date involved.
    -   Activity Log tracking all actions.
-   **Persistence**: All data is saved to `localStorage` and persists across reloads.
-   **Dark Mode**: Fully supported dark/light theme toggle.
-   **Responsive Design**: Works on mobile and desktop.

## Engineering Highlights

-   **State Management**: `useReducer` and Context API for complex state (tasks, logs).
-   **Performance**: Optimized rendering with `React.memo` (implied via structure) and efficient drag-and-drop.
-   **Styling**: CSS Modules approach with global CSS variables for theming.
-   **Code Quality**: Clean component structure, custom hooks (`useTasks`, `useAuth`), and unit tests.

## Setup & Running

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start development server**:
    ```bash
    npm run dev
    ```

3.  **Run tests**:
    ```bash
    npm test
    ```

## Project Structure

-   `src/components`: Reusable UI components (TaskCard, Column, TaskForm, etc.)
-   `src/context`: Global state (AuthContext, TaskContext)
-   `src/pages`: Page layouts (Login, Board)
-   `src/tests`: Unit tests for core logic.
