# waiter app
This is a waiter application for managing table reservations in a restaurant. It allows you to view table statuses, edit reservations and manage table data with full CRUD operations.

Project view: https://waiter-app-i6cc.onrender.com/

## Description

The app provides:

- view all tables with their current status
- view or edit individual table
- create new tables
- delete tables as needed.

The application consists of subpages:
- `/` – Home subpage displaying all tables with their current status.
- `/table/:id` – Table subpages to view or edit individual tables.
- `/table/add` – Add Table subpage to create new table.

For tables with status "Busy", a field for the bill amount is displayed.

The application uses React Router for navigation and React + Redux for state management.

Forms are validated by React Hook Form. 

## Technologies Used

- **Frontend:** React, React Router, Redux, Redux Thunk, React Hook Form, Bootstrap, React Bootstrap, Sass, JSON server
- **Testing:** Jest, React Testing Library (@testing-library/jest-dom, @testing-library/user-event)

## Configuration

To install dependencies, run:

`npm install`


Start the frontend:

`npm start`


Build app for production with:

`npm run build`

This builds the app to the build folder. It bundles React in production mode, optimizes for best performance, minifies the code, and includes hashed filenames. Your app is ready to be deployed.

## Testing

Launch the test runner in interactive watch mode:

 `npm test`

## License

MIT License

## Author

Monika Grzanek