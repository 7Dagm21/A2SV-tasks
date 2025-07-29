export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  if (!email) {
    errors.push("Email is required");
  } else {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Please enter a valid email address");
    }
    if (email.length > 254) {
      errors.push("Email address is too long");
    }
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];
  if (!password) {
    errors.push("Password is required");
    return { isValid: false, errors };
  }

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/(?=.*\d)/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push(
      "Password must contain at least one special character (@$!%*?&)"
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateName = (name: string): ValidationResult => {
  const errors: string[] = [];
  const trimmedName = name.trim();

  if (!trimmedName) {
    errors.push("Full name is required");
  } else {
    if (trimmedName.length < 2) {
      errors.push("Name must be at least 2 characters long");
    }
    if (trimmedName.length > 50) {
      errors.push("Name must be less than 50 characters");
    }
    if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
      errors.push(
        "Name can only contain letters, spaces, hyphens, and apostrophes"
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const getPasswordStrength = (
  password: string
): {
  score: number;
  label: string;
  color: string;
  percentage: number;
} => {
  if (!password) {
    return { score: 0, label: "", color: "", percentage: 0 };
  }

  let score = 0;
  const checks = [
    password.length >= 8,
    /(?=.*[a-z])/.test(password),
    /(?=.*[A-Z])/.test(password),
    /(?=.*\d)/.test(password),
    /(?=.*[@$!%*?&])/.test(password),
  ];

  score = checks.filter(Boolean).length;

  if (password.length >= 12) score += 0.5;
  if (password.length >= 16) score += 0.5;

  const maxScore = 6;
  const percentage = Math.min((score / maxScore) * 100, 100);

  if (score <= 2) {
    return { score, label: "Weak", color: "text-red-500", percentage };
  }
  if (score <= 3) {
    return { score, label: "Fair", color: "text-yellow-500", percentage };
  }
  if (score <= 4) {
    return { score, label: "Good", color: "text-blue-500", percentage };
  }
  return { score, label: "Strong", color: "text-green-500", percentage };
};
