import { testOtp } from "@/actions/auth/testotp";

export default function TestOtpPage() {
  return (
    <form action={testOtp}>
      <button type="submit">
        Generate OTP
      </button>
    </form>
  );
}