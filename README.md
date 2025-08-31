# React Hiring Platform — Plus

## Overview

React Hiring Platform is a modern, lightweight job board application built with React and Vite. It allows users to post, edit, delete, search, and sort job listings, with all data stored locally in the browser using localStorage. The app features a clean dark-themed UI and supports CSV export for job data.

## Features

- **Post Jobs:** Add new job listings with details such as title, company, salary, location, job type, and tags.
- **Edit & Delete:** Update or remove existing job postings easily.
- **Search & Filter:** Instantly search jobs by title, company, location, type, or tags. Filter and sort jobs by most recent, highest salary, or lowest salary.
- **Tags:** Add multiple tags to jobs for quick filtering (e.g., "react", "senior").
- **CSV Export:** Download all job listings as a CSV file for external use.
- **LocalStorage Persistence:** All data is saved in your browser, so jobs remain after refresh or browser restart.
- **Responsive UI:** Works well on desktop and mobile devices.

## Technologies Used

- React 18
- Vite
- LocalStorage API
- Modern CSS (dark theme)


## Automatic Deployment

This project uses an automatic deployment workflow powered by GitHub Actions. Every time you push changes to the repository, the app is built and deployed to GitHub Pages. No manual deployment steps are required.

You can view the live app at: [https://ehteshamulhaque123.github.io/react-hiring-platform-app/](https://ehteshamulhaque123.github.io/react-hiring-platform-app/)

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm

### Installation
1. Clone the repository:
	```bash
	git clone https://github.com/Ehteshamulhaque123/react-hiring-platform-app.git
	cd react-hiring-platform-app
	```
2. Install dependencies:
	```bash
	npm install
	```
3. Start the development server:
	```bash
	npm run dev
	```
4. Open the local URL printed in the terminal (usually http://localhost:5173).

### Build for Production
```bash
npm run build
npm run preview
```

## Folder Structure

- `src/App.jsx` — Main application component
- `src/useLocalStorage.js` — Custom hook for localStorage persistence
- `src/styles.css` — App styles (dark theme)
- `src/main.jsx` — Entry point
- `index.html` — HTML template

## How It Works

1. **Job Posting:** Fill out the form and click "Post Job". Required fields: Job title and Company.
2. **Edit/Delete:** Use the "Edit" or "Delete" buttons on each job listing.
3. **Search/Sort:** Use the search bar and sort dropdown to filter jobs.
4. **CSV Export:** Click "Export CSV" to download all jobs.
5. **Persistence:** All jobs are saved in your browser's localStorage.

## Screenshots

> ![App Screenshot](screenshot.png)

## License

MIT
