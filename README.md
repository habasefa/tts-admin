# Temaribet Frontend

## Overview

This repository hosts the frontend for **TTR Admin**, the administrative panel for managing the **Temaribet** tutoring platform. Temaribet is based in Addis Ababa, Ethiopia, and connects parents and students with highly qualified tutors. The admin panel is designed to streamline the management of tutors, students, and overall platform operations.

<!-- ### Homepage

Below is a screenshot of the homepage of Temaribet:

![Homepage Screenshot](./public/home_page_screenshot_2.png) -->

## Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/) and [Next.js](https://nextjs.org/)
- **UI Framework**: [Material-UI](https://mui.com/) (`@mui/material`, `@mui/icons-material`, `@mui/lab`, `@mui/styles`)
- **State Management**: [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/), [React-Redux](https://react-redux.js.org/), [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Form Handling**: [Formik](https://formik.org/) and [Yup](https://github.com/jquense/yup)
- **Routing**: [React Router](https://reactrouter.com/) and [History](https://github.com/ReactTraining/history)
- **Charts**: [Chart.js](https://www.chartjs.org/) and [React-Chartjs-2](https://github.com/reactchartjs/react-chart.js)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [PostCSS](https://postcss.org/), [Emotion](https://emotion.sh/docs/introduction)
- **Utilities**: [date-fns](https://date-fns.org/), [moment](https://momentjs.com/), [uuid](https://github.com/uuidjs/uuid), [jwt-decode](https://github.com/jwt-decode/jwt-decode)
- **Development Tools**: [ESLint](https://eslint.org/), [NProgress](https://github.com/rstacruz/nprogress), [React Perfect Scrollbar](https://github.com/utsuboco/react-perfect-scrollbar)
- **Email Services**: [EmailJS](https://www.emailjs.com/)

---

## Project Structure

```plaintext
├── backend-utils/          # Backend utility functions
├── public/                 # Public assets
│   ├── index.html          # Main HTML file
│   ├── manifest.json       # Web app manifest
│   └── static/             # Static assets
├── README.md               # Documentation
├── redux/                  # Redux slices and store setup
│   ├── storage.js          # Storage configuration
│   ├── store.js            # Redux store setup
│   └── userSlice.js        # User slice
├── src/                    # Source code for the frontend application
│   ├── components/         # Reusable React components
│   ├── icons/              # Icon components
│   ├── pages/              # Main pages of the application
│   ├── styles/             # Styling files
│   ├── theme/              # Theme configuration
│   ├── utils/              # Utility functions
│   └── __mocks__/          # Mock data for testing
├── tailwind.config.js      # Tailwind CSS configuration
```

## Archetecture Diagram

```mermaid
graph TD;
    A[public/] --> B[Static assets like images and icons]
    A[redux/] --> C[Redux slices and store setup]
    A[styles/] --> D[Global and component-specific styles]
    A[themes/] --> E[Theme configuration for light/dark modes]
    A[utils/] --> F[Helper functions for Firebase, and formatting]
    A[views/] --> G[High-level views for different pages or workflows]
    G --> H[completeProfile/ - Complete profile page components and logic]
    A[README.md] --> I[Documentation]



flowchart TD
    public/ -->|Contains| Static_Assets[Static assets like images and icons]
    redux/ -->|Contains| Redux_Setup[Redux slices and store setup]
    styles/ -->|Contains| Styles[Global and component-specific styles]
    themes/ -->|Contains| Theme_Config[Theme configuration for light/dark modes]
    utils/ -->|Contains| Helper_Functions[Helper functions for Firebase, and formatting]
    views/ -->|Contains| High_Level_Views[High-level views for different pages or workflows]
    High_Level_Views -->|Contains| Complete_Profile[Complete profile page components and logic]
    README.md -->|Contains| Documentation

```

## Setup Instructions

### Prerequisites

- Install [Node.js](https://nodejs.org/) (v6 or later recommended).
- Install [npm](https://www.npmjs.com/).

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/habasefa/tts-admin.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd tts-admin
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the development server**:

   ```bash

   npm run dev
   ```

5. **Access the application**:
   The application will be accessible at [http://localhost:3000](http://localhost:3000).

```

```
