# Temaribet Frontend

## Overview

This repository hosts the frontend for **TTR Admin**, the administrative panel for managing the **Temaribet** tutoring platform. Temaribet is based in Addis Ababa, Ethiopia, and connects parents and students with highly qualified tutors. The admin panel is designed to streamline the management of tutors, students, and overall platform operations.

<!-- ### Homepage

Below is a screenshot of the homepage of Temaribet:

![Homepage Screenshot](./public/home_page_screenshot_2.png) -->

## Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Database**: [Firebase](https://firebase.google.com/)
- **State Management**: [Redux](https://redux.js.org/)

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
   cd tts
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
