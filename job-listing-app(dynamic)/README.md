
Job Opportunities Application

A comprehensive job portal application built with Next.js, Redux Toolkit, and TypeScript that integrates with real-time API data. This application provides users with a seamless experience to browse job opportunities, view detailed job information, and manage application state efficiently through modern web technologies.

   Features

    • Real-time API Integration: Fetches live job data from Akil Backend API 
    • Advanced State Management: Redux Toolkit for centralized state handling
    • Dynamic Job Listings: Browse and sort job opportunities by relevance and date
    • Detailed Job Views: Comprehensive job information with company details
    • Responsive Design: Optimized for desktop, tablet, and mobile devices
    • Error Handling: Robust error boundaries with retry functionality
    • Loading States: Skeleton components for smooth user experience
    • Type Safety: Full TypeScript implementation throughout the application

   Tech Stack

    • Next.js 14: React framework with App Router for modern web development
    • Redux Toolkit: Efficient state management with built-in best practices
    • TypeScript: Type-safe development with enhanced developer experience
    • Tailwind CSS: Utility-first CSS framework for rapid UI development
    • React Redux: Official React bindings for Redux state management

   Getting Started

1. Clone repository

   
         git clone https://github.com/7Dagm21/A2SV-tasks.git

         cd job-listing-app(dynamic)

3.	Install dependencies

         npm install
  	
4.	Start development

         npm run dev

Project Structure

    job-listing-app(dynamic)/
    ├── app/
    │   ├── jobs/
    │   │   └── [id]/
    │   │       └── page.tsx          # Dynamic job detail pages
        ├── components/
    │       └── ui/
    │           ├── button.tsx        # Reusable button component
    │           ├── card.tsx          # Card layout components
    │           ├── badge.tsx         # Badge/tag components
    │           └── skeleton.tsx      # Loading skeleton components
    │   ├── layout.tsx                # Root layout with providers
    │   ├── page.tsx                  # Home page with job listings
    │   ├── StoreProvider.tsx         # Redux provider setup
    │   ├── loading.tsx               # Global loading component
    │   ├── error.tsx                 # Global error boundary
    │   ├── not-found.tsx             # 404 page component
    │   ├── styles/
    │   │   └── globals.css/          # Global styles and Tailwind imports        
    ├── lib/
    │   ├── features/
    │   │   └── opportunitySlice.ts   # Redux slice for job management
    │   ├── store.ts                  # Redux store configuration
    │   ├── hooks.ts                  # Typed Redux hooks
    │   └── utils.ts                  # Common utility functions
    ├── package.json                  # Project dependencies and scripts
    ├── tailwind.config.ts            # Tailwind CSS configuration
    ├── tailwind.config.js            # Tailwind CSS configuration
    ├── next.config.mjs               # Next.js configuration
    ├── tsconfig.json                 # TypeScript configuration
    └── README.md                     # Project documentation

   
Preview

Home Screen


![image alt]( https://github.com/7Dagm21/A2SV-tasks/blob/2c0ebd8341e0f5e73d8eecf3d6470bfb6c1c52e3/job-listing-app(dynamic)/home%20p.png)

![image alt]( https://github.com/7Dagm21/A2SV-tasks/blob/2c0ebd8341e0f5e73d8eecf3d6470bfb6c1c52e3/job-listing-app(dynamic)/home%20p2.png)

Description 

![image alt]( https://github.com/7Dagm21/A2SV-tasks/blob/2c0ebd8341e0f5e73d8eecf3d6470bfb6c1c52e3/job-listing-app(dynamic)/desc.png)









