
AuthApp - Next.js Authentication System

A modern, secure user authentication application built with Next.js 15, TypeScript, and Tailwind CSS. This application provides complete user registration, email verification, and sign-in functionality using the Akil Backend API.

🚀 Features

    - User Registration: Secure signup with email verification
    - Email Verification: OTP-based email verification system  
    - User Sign In: Secure login with JWT token management
    - Protected Dashboard: Authenticated user dashboard
    - Modern UI: Beautiful, responsive design with Tailwind CSS
    - Form Validation: Client-side validation with password strength indicator
    - Error Handling: Comprehensive error handling and user feedback
    - Session Management: Persistent authentication with NextAuth.js

🏗️ Tech Stack

    - Framework: Next.js 15 with App Router + TypeScript
    - Authentication: NextAuth.js v4 with Credentials Provider
    - Styling: Tailwind CSS 3
    - UI Components: Custom UI components with Radix UI patterns
    - State Management: NextAuth Session Management
    - Form Handling: React useState with custom validation
    - Icons: Lucide React
    - Backend API: Akil Backend (https://akil-backend.onrender.com/)

📁 Project Structure

    ├──Authentication-app/
       ├── app/                          # Next.js App Router pages
       │   ├── api/
       │   │   └── auth/nextauth-catchall/   # NextAuth.js API routes
       │   │       └── route.ts          # Authentication configuration
       │   ├── dashboard/               # Protected dashboard page
       │   │   └── page.tsx             # Dashboard UI (/dashboard)
       │   ├── login/                   # Sign in functionality
       │   │   ├── page.tsx             # Login page (/login)
       │   ├── signup/                  # User registration
       │   │   └── page.tsx             # Signup page (/signup)
       │   ├── verify-email/            # Email verification
       │   │   └── page.tsx             # OTP verification (/verify-email)
       │   ├── layout.tsx               # Root layout
       │   ├── providers.tsx
       │   ├── page.tsx                 # Homepage
       │   └── globals.css              # Global styles and Tailwind CSS
       │   ├──components/               # Reusable UI components
       │   |  ├── ui/                      # UI component library
       │   │  │   ├── button.tsx           # Button component
       │   │  │   ├── input.tsx            # Input component
       │   │  │   ├── label.tsx            # Label component
       │   │  │   ├── ValidateInput.tsx
       │   │  │   └── passwordStrength.tsx   # Password strength indicator
       │   ├──lib/                         # Utility functions
       │   │  ├── utils.ts                 # Tailwind class utilities (cn function)
       │   │  ├── auth.ts                  # NextAuth configuration
       │   │  └── validation.ts            # Form validation functions
       │   ├──types/                       # TypeScript type definitions
       │   │  └── next-auth.d.ts           # NextAuth type extensions
       │   ├──middleware.ts                # Route protection middleware
       │   ├──.env.local
       ├──README.md
       ├──.eslintrc.json
       ├──.gitignore
       ├──next-env.d.ts
       ├──next.config.js
       ├──package.json
       ├──postcss.config.js
       ├──tailwind.config.ts
       ├──tsconfig.json

🛠️ Installation & Setup

1. Clone the repository

       git clone https://github.com/7Dagm21/A2SV-tasks.git
       cd Authentication-app
   

2. Install dependencies
  
       npm install


3. Run the development server
   
       npm run dev
 

4. Open your browser
   Navigate to [http://localhost:3000](http://localhost:3000)


Authentication demo

![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/d89f693d5a8ba6923e613408e9a1b799ffa0d547/Authentication-app/auth%20demo.png)

Signup

![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/d89f693d5a8ba6923e613408e9a1b799ffa0d547/Authentication-app/signup.png)

Verify email

![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/d89f693d5a8ba6923e613408e9a1b799ffa0d547/Authentication-app/verify%20email.png)

Login

Example:
email:dagmawityoseph0@gmail.com
password:Dag@1234

![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/d89f693d5a8ba6923e613408e9a1b799ffa0d547/Authentication-app/login.png)

After login

![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/d89f693d5a8ba6923e613408e9a1b799ffa0d547/Authentication-app/after%20login.png)
