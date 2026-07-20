import { useState, type FormEvent, type ChangeEvent } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  password: string;
  confirmPassword: string;
  address: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  acceptTerms: boolean;
}

type FormErrors = Record<keyof FormData, string>;

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  password: "",
  confirmPassword: "",
  address: "",
  country: "",
  state: "",
  city: "",
  pincode: "",
  acceptTerms: false,
};

const initialErrors: FormErrors = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  password: "",
  confirmPassword: "",
  address: "",
  country: "",
  state: "",
  city: "",
  pincode: "",
  acceptTerms: "",
};

// Shared Tailwind classes so every input looks consistent
const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";
const inputErrorClass =
  "w-full rounded-md border border-red-400 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500";
const labelClass = "mb-1 block text-sm font-medium text-gray-700";
const errorClass = "mt-1 text-xs text-red-600";

function App() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = { ...initialErrors };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else if (new Date(formData.dob) > new Date()) {
      newErrors.dob = "Date of birth cannot be in the future";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.country) {
      newErrors.country = "Please select a country";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be exactly 6 digits";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(false);

    const isValid = validateForm();
    if (!isValid) return;

    console.log("Form Submitted", formData);
    setSubmitted(true);
    setFormData(initialFormData);
    setErrors(initialErrors);
  };

  return (<>
   
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-md sm:p-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          Registration Form
        </h1>

        {submitted && (
          <div className="mb-6 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700">
            Registration successful!
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* First / Last name */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className={labelClass}>
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                placeholder="First name"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? inputErrorClass : inputClass}
              />
              {errors.firstName && (
                <p className={errorClass}>{errors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className={labelClass}>
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                placeholder="Last name"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? inputErrorClass : inputClass}
              />
              {errors.lastName && (
                <p className={errorClass}>{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email / Phone */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? inputErrorClass : inputClass}
              />
              {errors.email && <p className={errorClass}>{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                placeholder="Phone number"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? inputErrorClass : inputClass}
              />
              {errors.phone && <p className={errorClass}>{errors.phone}</p>}
            </div>
          </div>

          {/* DOB / Gender */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="dob" className={labelClass}>
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className={errors.dob ? inputErrorClass : inputClass}
              />
              {errors.dob && <p className={errorClass}>{errors.dob}</p>}
            </div>

            <div>
              <span className={labelClass}>Gender</span>
              <div className="flex items-center gap-4 pt-1">
                {["Male", "Female", "Other"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-1.5 text-sm text-gray-700"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    {option}
                  </label>
                ))}
              </div>
              {errors.gender && <p className={errorClass}>{errors.gender}</p>}
            </div>
          </div>

          {/* Password / Confirm Password */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? inputErrorClass : inputClass}
              />
              {errors.password && (
                <p className={errorClass}>{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={
                  errors.confirmPassword ? inputErrorClass : inputClass
                }
              />
              {errors.confirmPassword && (
                <p className={errorClass}>{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className={labelClass}>
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              rows={3}
              className={errors.address ? inputErrorClass : inputClass}
            />
            {errors.address && <p className={errorClass}>{errors.address}</p>}
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className={labelClass}>
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={errors.country ? inputErrorClass : inputClass}
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
            </select>
            {errors.country && <p className={errorClass}>{errors.country}</p>}
          </div>

          {/* State / City / Pincode */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div>
              <label htmlFor="state" className={labelClass}>
                State
              </label>
              <input
                id="state"
                name="state"
                placeholder="State"
                type="text"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? inputErrorClass : inputClass}
              />
              {errors.state && <p className={errorClass}>{errors.state}</p>}
            </div>

            <div>
              <label htmlFor="city" className={labelClass}>
                City
              </label>
              <input
                id="city"
                name="city"
                placeholder="City"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? inputErrorClass : inputClass}
              />
              {errors.city && <p className={errorClass}>{errors.city}</p>}
            </div>

            <div>
              <label htmlFor="pincode" className={labelClass}>
                Pincode
              </label>
              <input
                id="pincode"
                name="pincode"
                placeholder="Pincode"
                type="text"
                inputMode="numeric"
                value={formData.pincode}
                onChange={handleChange}
                className={errors.pincode ? inputErrorClass : inputClass}
              />
              {errors.pincode && (
                <p className={errorClass}>{errors.pincode}</p>
              )}
            </div>
          </div>

          {/* Accept Terms */}
          <div>
            <label
              htmlFor="acceptTerms"
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              I accept the terms and conditions
            </label>
            {errors.acceptTerms && (
              <p className={errorClass}>{errors.acceptTerms}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  </>);
}

export default App;