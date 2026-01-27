# Health Consultancy Platform

A comprehensive digital platform connecting patients with healthcare professionals for remote consultations, appointments, and health management.

## 🌟 Overview

Health Consultancy is a modern web application that enables patients to connect with doctors for virtual consultations, book appointments, and manage their health needs online. The platform provides a seamless experience for both patients and healthcare providers through real-time communication, video consultations, and comprehensive profile management.

## ✨ Key Features

### For Patients
- **User Registration & Authentication** - Secure login with Google OAuth integration
- **Doctor Search & Discovery** - Browse and find qualified healthcare professionals
- **Appointment Booking** - Schedule consultations with available doctors
- **Video Consultations** - Real-time video calls with healthcare providers using Agora SDK
- **Chat Messaging** - Direct messaging with doctors for quick consultations
- **Profile Management** - Manage personal health information and medical history
- **Daily Health Tips** - Access to health and wellness content
- **Help Center** - Support and assistance resources

### For Doctors
- **Professional Profile** - Create and manage professional profiles with certifications
- **Appointment Management** - View and manage patient appointments
- **Patient Communication** - Chat and video consultation capabilities
- **Dashboard** - Overview of appointments and patient interactions

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and development server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **Material-UI (MUI)** - React component library
- **Agora SDK** - Real-time video/audio communication
- **Axios** - HTTP client
- **EmailJS** - Email service integration
- **Google OAuth** - Authentication

### Development Tools
- **ESLint** - Code linting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18 or higher recommended)
- **npm** or **yarn** package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gedyzed/health-consultancy.git
   cd health-consultancy
   ```

2. **Navigate to the frontend directory**
   ```bash
   cd front-end
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `front-end` directory with the following variables:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   VITE_APP_KEY=your_app_key
   VITE_API_BASE_URL=your_backend_api_url
   VITE_AGORA_APP_ID=your_agora_app_id
   ```

## 💻 Running the Application

### Development Mode
```bash
cd front-end
npm run dev
```

The application will start on `http://localhost:5173` (or another port if 5173 is in use).

### Build for Production
```bash
cd front-end
npm run build
```

### Preview Production Build
```bash
cd front-end
npm run preview
```

### Lint Code
```bash
cd front-end
npm run lint
```

## 📁 Project Structure

```
health-consultancy/
├── front-end/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── app/             # Redux store configuration
│   │   ├── assets/          # Images, icons, and media
│   │   ├── components/      # Reusable React components
│   │   │   └── layouts/     # Layout components (Navbar, Footer)
│   │   ├── context/         # React context providers
│   │   ├── features/        # Redux slices and API logic
│   │   │   ├── appointmentBooking/
│   │   │   ├── auth/        # Authentication logic
│   │   │   ├── booking/
│   │   │   ├── chat/
│   │   │   ├── doctorChat/
│   │   │   ├── doctors/
│   │   │   ├── patient/
│   │   │   ├── patientChat/
│   │   │   ├── profile/
│   │   │   └── user/
│   │   ├── pages/           # Page components
│   │   │   ├── homepage/    # Landing page
│   │   │   ├── login/       # Login page
│   │   │   ├── register/    # Registration page
│   │   │   ├── patient/     # Patient dashboard and pages
│   │   │   ├── doctors/     # Doctor dashboard and pages
│   │   │   ├── booking/     # Appointment booking pages
│   │   │   └── videos/      # Video consultation pages
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Application entry point
│   ├── .env                 # Environment variables
│   ├── index.html           # HTML template
│   ├── package.json         # Dependencies and scripts
│   ├── vite.config.js       # Vite configuration
│   └── eslint.config.js     # ESLint configuration
└── README.md                # This file
```

## 🔑 Environment Variables

The application requires the following environment variables:

| Variable | Description |
|----------|-------------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service identifier for email functionality |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template identifier |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public API key |
| `VITE_APP_KEY` | Application key for Agora Chat |
| `VITE_API_BASE_URL` | Backend API base URL |
| `VITE_AGORA_APP_ID` | Agora application ID for video/audio calls |

