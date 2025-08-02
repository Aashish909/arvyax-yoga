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
Access to XMLHttpRequest has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

Follow these steps:

1. **Verify Environment Variables**:
   - Make sure `FRONTEND_URL` is correctly set in your backend environment variables on Vercel
   - The value should exactly match your frontend URL (e.g., `https://your-frontend.vercel.app`)
   - No trailing slashes should be included

2. **Check Backend CORS Configuration**:
   - Ensure the backend's CORS configuration is correctly set up to allow requests from your frontend domain
   - The origin in the CORS configuration should match your frontend URL

3. **Redeploy Backend**:
   - After making changes to environment variables, redeploy your backend to apply the changes

4. **Check Network Requests**:
   - Use browser developer tools to inspect network requests and verify the correct headers are being sent

### Other Common Issues

- Check the Vercel deployment logs for any errors
- Verify that all environment variables are correctly set
- Ensure your MongoDB Atlas IP whitelist allows connections from Vercel's servers