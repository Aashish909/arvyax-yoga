# Deploying the Yoga Sessions Application to Vercel

## Prerequisites

- A Vercel account
- Git repository with your project
- MongoDB Atlas account (for the database)

## Backend Deployment

1. **Create a MongoDB Atlas Cluster**
   - Sign up or log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Set up database access (username and password)
   - Set up network access (IP whitelist)
   - Get your MongoDB connection string

2. **Deploy Backend to Vercel**
   - Push your code to a Git repository
   - Log in to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Select the backend directory as the root directory
   - Add the following environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Your JWT secret key
     - `FRONTEND_URL`: Your frontend application URL (e.g., https://your-frontend.vercel.app)
   - Click "Deploy"
   - Once deployed, note the URL of your backend (e.g., `https://your-backend.vercel.app`)

## Frontend Deployment

1. **Update Environment Variables**
   - In your frontend `.env` file, update the `REACT_APP_BACKEND_URL` to your deployed backend URL:
     ```
     REACT_APP_BACKEND_URL=https://your-backend.vercel.app
     ```

2. **Deploy Frontend to Vercel**
   - Log in to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Select the frontend directory as the root directory
   - Add the following environment variables:
     - `REACT_APP_BACKEND_URL`: Your deployed backend URL
   - Click "Deploy"

## Verifying the Deployment

1. Once both the backend and frontend are deployed, visit your frontend URL
2. Test the application by registering a new user and creating a session
3. Verify that all features are working correctly

## Troubleshooting

### CORS Issues

If you encounter CORS errors like:
```
Access to XMLHttpRequest at 'https://your-backend.vercel.app/auth/login' from origin 'https://your-frontend.vercel.app' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

Follow these steps:

1. **Verify Environment Variables**:
   - Make sure `FRONTEND_URL` is correctly set in your backend environment variables on Vercel
   - The value should exactly match your frontend URL (e.g., `https://your-frontend.vercel.app`)
   - No trailing slashes should be included
   - Example: If your frontend is deployed at `https://arvyax-yoga-ygi2.vercel.app`, then set `FRONTEND_URL=https://arvyax-yoga-ygi2.vercel.app`

2. **Check Backend CORS Configuration**:
   - Ensure the backend's CORS configuration in `app.js` is correctly set up to allow requests from your frontend domain:
   ```javascript
   app.use(cors({
     origin: process.env.FRONTEND_URL || 'http://localhost:3000',
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization'],
     credentials: true
   }));
   ```
   - The `credentials: true` option is important for allowing cookies to be sent in cross-origin requests
   - The origin in the CORS configuration should match your frontend URL

3. **Update Frontend Environment**:
   - Make sure your frontend's `.env` file has the correct backend URL:
   ```
   REACT_APP_BACKEND_URL=https://your-backend.vercel.app
   ```
   - Example: If your backend is deployed at `https://arvyax-yoga.vercel.app`, then set `REACT_APP_BACKEND_URL=https://arvyax-yoga.vercel.app`

4. **Redeploy Backend**:
   - After making changes to environment variables, redeploy your backend to apply the changes
   - In Vercel, you can trigger a redeployment from the Deployments tab

5. **Check Network Requests**:
   - Use browser developer tools (F12 or right-click > Inspect) to inspect network requests
   - Look for OPTIONS preflight requests that might be failing
   - Verify the correct headers are being sent and received:
     - Request headers should include `Origin`
     - Response headers should include `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, and `Access-Control-Allow-Headers`
   - If you see a failed OPTIONS request, it indicates a CORS preflight issue
   - Check the response status code - a 204 No Content is expected for successful preflight requests

### Other Common Issues

- **Deployment Logs**: Check the Vercel deployment logs for any errors or warnings
- **Environment Variables**: Verify that all environment variables are correctly set in both frontend and backend deployments
- **MongoDB Connection**: Ensure your MongoDB Atlas IP whitelist allows connections from Vercel's servers (set to allow access from anywhere `0.0.0.0/0` for simplicity during development)
- **API Endpoints**: Make sure all API endpoints in your frontend code use the environment variable for the backend URL, not hardcoded URLs
- **Hardcoded URLs**: Check for hardcoded URLs in both frontend and backend code. In particular, make sure the CORS configuration in `app.js` is using the environment variable and not a hardcoded URL:
  ```javascript
  // INCORRECT - Hardcoded URL
  app.use(cors({
    origin: 'https://your-frontend.vercel.app',
    // ...
  }));
  
  // CORRECT - Using environment variable
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    // ...
  }));
  ```
- **Browser Cache**: Clear your browser cache if you're still experiencing issues after making changes
- **Vercel Build Settings**: Check that your build settings in Vercel are correctly configured for both frontend and backend
- **Node.js Version**: Ensure you're using a compatible Node.js version in your Vercel deployment settings