"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

interface ValidatedInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  showPasswordToggle?: boolean;
  showValidationIcon?: boolean;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

export function ValidatedInput({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  error,
  showPasswordToggle = false,
  showValidationIcon = false,
  suggestions = [],
  onSuggestionClick,
}: ValidatedInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputType = showPasswordToggle && showPassword ? "text" : type;
  const hasError = !!error;
  const isValid = !hasError && value.length > 0;

  return (
    <div className="relative w-full">
      <Label htmlFor={id} className="text-gray-700 font-medium">
        {label}
      </Label>

      {/* Input field container */}
      <div className="relative mt-2">
        <Input
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setShowSuggestions(suggestions.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className={`h-12 ${
            showPasswordToggle
              ? "pr-12"
              : showValidationIcon && value.length > 0
              ? "pr-10"
              : ""
          } ${
            hasError
              ? "border-red-500 focus:border-red-500"
              : isValid
              ? "border-green-500 focus:border-green-500"
              : "border-gray-300"
          }`}
        />

        {/* ✅ Validation icon (check or error) */}
        {showValidationIcon && value.length > 0 && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {hasError ? (
              <XCircle className="h-5 w-5 text-red-500" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
          </div>
        )}

        {/* 👁 Password visibility toggle */}
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors z-10"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {/* ❌ Error message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {/* 🧠 Suggestions dropdown (e.g. autocomplete) */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onSuggestionClick?.(suggestion)}
              className="w-full px-3 py-2 text-left hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
