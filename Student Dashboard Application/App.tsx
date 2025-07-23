import React, { useState, useEffect } from "react";
import { AdminDashboard } from "./pages/AdminDashboard";
import { StaffDashboard } from "./pages/StaffDashboard";
import { StudentDashboard } from "./pages/StudentDashboard";
import { LoginPage } from "./pages/LoginPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { TwoFactorModal } from "./modals/TwoFactorModal";

export type UserRole = "admin" | "staff" | "student";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  permissions: string[];
  has2FA: boolean;
  avatar?: string;
  schoolId?: string;
}

// School configuration - can be customized
export const SCHOOL_CONFIG = {
  name: "ConnectOne",
  shortName: "RA",
  tagline: "Excellence in Education",
  colors: {
    primary: "navy",
    secondary: "maroon",
    accent: "gold",
  },
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [pendingUser, setPendingUser] = useState<User | null>(
    null,
  );

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuth = () => {
      const savedAuth = localStorage.getItem(
        "schoolDocumentAuth",
      );
      const savedUser = localStorage.getItem(
        "schoolDocumentUser",
      );

      if (savedAuth === "true" && savedUser) {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);

        // Check if user needs onboarding
        const onboardingCompleted = localStorage.getItem(
          `onboarding_${user.id}`,
        );
        if (!onboardingCompleted) {
          setShowOnboarding(true);
        }
      }
      setIsLoading(false);
    };

    // Simulate checking authentication
    setTimeout(checkAuth, 500);
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Demo users with different roles and school-specific data
    const demoUsers: Record<string, User> = {
      "admin@riverside.edu": {
        id: "1",
        email: "admin@riverside.edu",
        name: "Dr. Sarah Williams",
        role: "admin",
        permissions: [
          "read",
          "write",
          "delete",
          "audit",
          "manage_users",
          "backup_access",
          "system_settings",
        ],
        has2FA: true,
        avatar: "SW",
        schoolId: "ADM001",
      },
      "staff@riverside.edu": {
        id: "2",
        email: "staff@riverside.edu",
        name: "Prof. Michael Chen",
        role: "staff",
        department: "Computer Science Department",
        permissions: [
          "read",
          "write",
          "share",
          "upload",
          "department_admin",
        ],
        has2FA: true,
        avatar: "MC",
        schoolId: "STF042",
      },
      "student@riverside.edu": {
        id: "3",
        email: "student@riverside.edu",
        name: "Emily Johnson",
        role: "student",
        department: "Computer Science",
        permissions: ["read", "upload_assignments", "download"],
        has2FA: false,
        avatar: "EJ",
        schoolId: "STU2024001",
      },
    };

    const user = demoUsers[email];
    if (user && password === "password123") {
      // Check if user has 2FA enabled
      if (user.has2FA) {
        setPendingUser(user);
        setShow2FA(true);
      } else {
        completeLogin(user);
      }
    } else {
      alert(
        "Invalid credentials. Please use the demo credentials provided.",
      );
    }
  };

  const handle2FAComplete = (success: boolean) => {
    setShow2FA(false);
    if (success && pendingUser) {
      completeLogin(pendingUser);
    }
    setPendingUser(null);
  };

  const completeLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("schoolDocumentAuth", "true");
    localStorage.setItem(
      "schoolDocumentUser",
      JSON.stringify(user),
    );

    // Check if user needs onboarding
    const onboardingCompleted = localStorage.getItem(
      `onboarding_${user.id}`,
    );
    if (!onboardingCompleted) {
      setShowOnboarding(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("schoolDocumentAuth");
    localStorage.removeItem("schoolDocumentUser");
    setShowOnboarding(false);
  };

  const handleOnboardingComplete = () => {
    if (currentUser) {
      localStorage.setItem(
        `onboarding_${currentUser.id}`,
        "completed",
      );
      setShowOnboarding(false);
    }
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-navy-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-navy-600 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-white font-bold text-xl">
              {SCHOOL_CONFIG.shortName}
            </span>
          </div>
          <div className="w-12 h-12 border-4 border-navy-200 border-t-navy-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-navy-600">
            Loading {SCHOOL_CONFIG.name} Document System...
          </p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <LoginPage
          onLogin={handleLogin}
          schoolConfig={SCHOOL_CONFIG}
        />
        {show2FA && (
          <TwoFactorModal
            isOpen={show2FA}
            onClose={() => handle2FAComplete(false)}
            onVerify={() => handle2FAComplete(true)}
            userEmail={pendingUser?.email || ""}
          />
        )}
      </>
    );
  }

  // Show onboarding if user hasn't completed it
  if (showOnboarding) {
    return (
      <OnboardingPage
        user={currentUser!}
        onComplete={handleOnboardingComplete}
        schoolConfig={SCHOOL_CONFIG}
      />
    );
  }

  // Show role-specific dashboard if authenticated
  const renderDashboard = () => {
    switch (currentUser!.role) {
      case "admin":
        return (
          <AdminDashboard
            currentUser={currentUser!}
            onLogout={handleLogout}
            schoolConfig={SCHOOL_CONFIG}
          />
        );
      case "staff":
        return (
          <StaffDashboard
            currentUser={currentUser!}
            onLogout={handleLogout}
            schoolConfig={SCHOOL_CONFIG}
          />
        );
      case "student":
        return (
          <StudentDashboard
            currentUser={currentUser!}
            onLogout={handleLogout}
            schoolConfig={SCHOOL_CONFIG}
          />
        );
      default:
        return <div>Unknown user role</div>;
    }
  };

  return renderDashboard();
}