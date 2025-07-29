"use client"; 

import { getPasswordStrength } from "../../lib/validation";

// Props interface: expects a password string
interface PasswordStrengthProps {
  password: string;
}

// Component to visually display password strength & validation rules
export function PasswordStrength({ password }: PasswordStrengthProps) {
  // Don’t render anything if no password is typed yet
  if (!password) return null;

  // Get score, label, percentage, color etc. from utility function
  const strength = getPasswordStrength(password);

  // Define each requirement to check visually
  const requirements = [
    { test: password.length >= 8, label: "At least 8 characters" },
    { test: /(?=.*[a-z])/.test(password), label: "One lowercase letter" },
    { test: /(?=.*[A-Z])/.test(password), label: "One uppercase letter" },
    { test: /(?=.*\d)/.test(password), label: "One number" },
    { test: /(?=.*[@$!%*?&])/.test(password), label: "One special character" },
  ];

  return (
    <div className="mt-2">
      {/* Strength bar with color-coded feedback */}
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 transition-all duration-300 rounded-full ${
              strength.score <= 2
                ? "bg-red-500"
                : strength.score <= 3
                ? "bg-yellow-500"
                : strength.score <= 4
                ? "bg-blue-500"
                : "bg-green-500"
            }`}
            style={{ width: `${strength.percentage}%` }}
          />
        </div>
        <span className={`text-sm font-medium ${strength.color}`}>
          {strength.label}
        </span>
      </div>

      {/* List of requirements and whether they're met */}
      <div className="mt-2 text-xs text-gray-600">
        <p className="font-medium mb-1">Password requirements:</p>
        <ul className="space-y-1">
          {requirements.map((req, index) => (
            <li
              key={index}
              className={`flex items-center space-x-1 ${
                req.test ? "text-green-600" : "text-gray-400"
              }`}
            >
              <span>{req.test ? "✓" : "○"}</span>
              <span>{req.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
