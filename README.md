\`\`\`

\# Headstarter AI ChatSupport

Headstarter AI ChatSupport is an AI-powered chat support application designed to assist users with their queries. The application integrates with various authentication providers and offers a responsive chat interface.

\## Features

\- AI-powered chat support

\- Integration with GitHub and Google for authentication

\- Responsive design for both desktop and mobile devices

\- Feedback system for user interactions

\## Technologies

\- \*\*Next.js\*\* - React framework for server-side rendering

\- \*\*NextAuth.js\*\* - Authentication for Next.js

\- \*\*Material-UI\*\* - Component library for React

\- \*\*Tailwind CSS\*\* - Utility-first CSS framework

\- \*\*Vercel\*\* - Deployment platform

\- \*\*OpenRouter API\*\* - For AI interactions

\## Installation

To get started with the project locally, follow these steps:

1\. \*\*Clone the repository:\*\*

\`\`\`bash

git clone https://github.com/yuvrajbhardwaj/headstarter-chatsupport.git

\`\`\`

1\. Navigate to the project directory:

\`\`\`

cd headstarter-chatsupport

\`\`\`

2\. Install the dependencies:

\`\`\`

npm install

\`\`\`

Configuration

\-------------

Set up environment variables:

Create a \`.env.local\` file in the root of the project and add the following variables:

\`\`\`

NEXTAUTH\_SECRET=your\_nextauth\_secret

NEXTAUTH\_URL=http://localhost:3000

OPENROUTER\_API\_KEY=your\_openrouter\_api\_key

GITHUB\_ID=your\_github\_client\_id

GITHUB\_SECRET=your\_github\_client\_secret

GOOGLE\_ID=your\_google\_client\_id

GOOGLE\_SECRET=your\_google\_client\_secret

\`\`\`

Replace \`your\_nextauth\_secret\`, \`your\_openrouter\_api\_key\`, \`your\_github\_client\_id\`, \`your\_github\_client\_secret\`, \`your\_google\_client\_id\`, and \`your\_google\_client\_secret\` with your actual credentials.

Update OAuth Redirect URIs:

For Google and GitHub authentication, update the redirect URIs in your OAuth provider's console to:

\- Authorized JavaScript Origins: \`http://localhost:3000\` (for local development) and \`https://headstarter-chatsupport.vercel.app\` (for production)

\- Authorized Redirect URIs: \`http://localhost:3000/api/auth/callback/google\` and \`https://headstarter-chatsupport.vercel.app/api/auth/callback/google\` (for Google), and similarly for GitHub.

Usage

\-----

Start the development server:

\`\`\`

npm run dev

\`\`\`

Open your browser and navigate to:

\`\`\`

http://localhost:3000

\`\`\`

Deployment

\----------

To deploy your project to Vercel, follow these steps:

1\. Push your code to a GitHub repository.

2\. Go to Vercel and create a new project.

3\. Connect your GitHub repository to Vercel.

4\. Configure the environment variables in the Vercel dashboard.

5\. Deploy the project.

Vercel: The project is deployed at \`https://headstarter-chatsupport.vercel.app/\`.