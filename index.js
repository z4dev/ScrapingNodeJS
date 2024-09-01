import express from 'express';
import session from 'express-session';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';
import expressLayouts from 'express-ejs-layouts';
import bodyParser from 'body-parser';
import loginRoutes from './routes/login.js';
import cpanelRoutes from './routes/cpanel.js';
import isAuthenticated from './middleware/auth.js';

const app = express(); // Initialize the Express application
const port = 3000;

// Get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

// Serve static files (like Bootstrap CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({
  secret: 'my_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true, sameSite: 'Strict' }
}));

// Set up CSRF protection middleware
app.use(csurf({ cookie: true }));

app.use(cors({
  origin: 'http://localhost:3000', // Adjust this based on your environment
  credentials: true,
}));

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Routes
app.use('/', loginRoutes); 
app.use('/', isAuthenticated, cpanelRoutes); 

// Custom error-handling middleware
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({
      error: 'Invalid CSRF token. Please refresh the page and try again.'
    });
  }
  console.error("stack" + err.stack);
  res.status(500).json({ error: 'An unexpected error occurred.' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
