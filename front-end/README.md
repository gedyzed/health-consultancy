# Health Consultancy - Frontend Application

A modern web application for health consultancy services that connects patients with healthcare professionals through video consultations, messaging, and appointment booking.

## 🚀 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4 + DaisyUI
- **UI Components**: Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Real-time Communication**: 
  - Agora RTC SDK (Video calls)
  - Agora Chat (Messaging)
- **Authentication**: Google OAuth
- **HTTP Client**: Axios
- **Date/Time**: Day.js with MUI Date Pickers
- **Email**: EmailJS
- **Icons**: FontAwesome, React Icons, Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- A modern web browser

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gedyzed/health-consultancy.git
   cd health-consultancy/front-end
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the frontend directory with the following variables:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   VITE_APP_KEY=your_agora_app_key
   VITE_API_BASE_URL=your_backend_api_url
   VITE_AGORA_APP_ID=your_agora_app_id
   ```

## 🚦 Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the app in development mode with hot module replacement (HMR).  
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### `npm run build`
Builds the app for production to the `dist` folder.  
The build is minified and optimized for best performance.

### `npm run preview`
Locally preview the production build.

### `npm run lint`
Runs ESLint to check for code quality issues.

## 📁 Project Structure

```
front-end/
├── public/              # Static assets
├── src/
│   ├── app/            # App-level configuration
│   ├── assets/         # Images, icons, and other assets
│   ├── components/     # Reusable components
│   │   ├── appointments/
│   │   ├── cards/
│   │   ├── chat/
│   │   ├── comments/
│   │   ├── layouts/
│   │   └── others/
│   ├── context/        # React context providers
│   ├── features/       # Redux slices and features
│   ├── pages/          # Page components
│   │   ├── homepage/
│   │   ├── login/
│   │   ├── register/
│   │   ├── patient/
│   │   ├── doctors/
│   │   ├── booking/
│   │   └── videos/
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── eslint.config.js    # ESLint configuration
├── package.json        # Dependencies and scripts
└── .env                # Environment variables (not in git)
```

## ✨ Features

### For Patients
- 👤 User registration and authentication (Email + Google OAuth)
- 🔍 Browse and search for doctors
- 📅 Book appointments with healthcare professionals
- 💬 Real-time chat with doctors
- 📹 Video consultation sessions
- 👨‍⚕️ View doctor profiles and specializations
- 📊 Access personal health dashboard

### For Doctors
- 👨‍⚕️ Professional profile management
- 📋 View and manage appointments
- 💬 Chat with patients
- 📹 Conduct video consultations
- 📝 Upload certifications and credentials
- 📊 Doctor dashboard with analytics

### General Features
- 🌐 Responsive design for all devices
- 🎨 Modern and intuitive UI
- 🔐 Secure authentication and authorization
- 📧 Email notifications via EmailJS
- 🌙 Theme support (light/dark mode)
- ⚡ Fast and optimized performance with Vite
- 📱 Mobile-friendly interface

## 🔑 Key Technologies Explained

### Agora Integration
The application uses Agora for real-time communication:
- **Agora RTC SDK**: Powers video consultations between patients and doctors
- **Agora Chat**: Enables text-based messaging

### State Management
- **Redux Toolkit**: Manages global application state including authentication, user profiles, and appointments

### Authentication
- Traditional email/password authentication
- Google OAuth integration for quick sign-in

## 🌐 Deployment

The application can be deployed to various platforms:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - Railway
   - etc.

Make sure to set up environment variables on your hosting platform.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is part of a health consultancy platform.

## 📞 Support

For support or questions, please use the contact form in the application or reach out through the Help Center.

---

Built with ❤️ using React and Vite
