# Headstarter AI ChatSupport

## Overview

Headstarter AI ChatSupport is an interactive chat application powered by Next.js and various authentication providers. It allows users to communicate with an AI assistant and provides authentication via GitHub and Google.

## Features

- Real-time chat with an AI assistant
- Authentication with GitHub and Google
- Feedback system for messages
- Responsive design

## Technologies

- **Next.js** - React framework for server-side rendering
- **NextAuth.js** - Authentication for Next.js
- **Material-UI** - Component library for React
- **Tailwind CSS** - Utility-first CSS framework
- **Vercel** - Deployment platform
- **OpenRouter API** - For AI interactions

## Contributors

- [Aryan Bhardwaj](https://github.com/AryanBhardwaj789) - Project Lead

## Live Demo

You can check out the live demo of the application [here](https://headstarter-chatsupport.vercel.app/).

## Getting Started

To get a local copy up and running follow these simple steps.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/YuvrajBhardwaj1/AICS.git
    ```

2. Navigate to the project directory:

    ```bash
    cd AICS
    ```

3. Install the required packages:

    ```bash
    npm install
    ```

4. Create a `.env.local` file in the root directory of the project and add the following environment variables:

    ```env
    NEXTAUTH_SECRET=your_secret_here
    NEXTAUTH_URL=http://localhost:3000
    GITHUB_ID=your_github_client_id
    GITHUB_SECRET=your_github_client_secret
    GOOGLE_ID=your_google_client_id
    GOOGLE_SECRET=your_google_client_secret
    ```

5. Run the development server:

    ```bash
    npm run dev
    ```

6. Open your browser and visit `http://localhost:3000` to view the application.

## Configuration

Ensure you have configured the following OAuth providers:

## Deployment

To deploy the application to Vercel:

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and sign in with your GitHub account.
3. Import your GitHub repository.
4. Set up environment variables in the Vercel dashboard:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - `GITHUB_ID`
   - `GITHUB_SECRET`
   - `GOOGLE_ID`
   - `GOOGLE_SECRET`
5. Click "Deploy" and follow the instructions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Next.js for the React framework.
- Vercel for deployment.
- GitHub and Google for OAuth authentication.

