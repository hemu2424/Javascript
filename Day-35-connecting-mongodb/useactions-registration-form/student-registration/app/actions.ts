"use server";

export type FormState = {
  success: boolean;
  message: string;
  error: string;
};

export async function registerStudent(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name.trim()) {
    return {
      success: false,
      message: "",
      error: "Name is required",
    };
  }

  if (!email.trim()) {
    return {
      success: false,
      message: "",
      error: "Email is required",
    };
  }

  if (!email.includes("@")) {
    return {
      success: false,
      message: "",
      error: "Invalid email",
    };
  }

  return {
    success: true,
    message: "Student Registered",
    error: "",
  };
}