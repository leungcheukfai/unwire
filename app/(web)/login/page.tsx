import LoginForm from "~/components/web/ads/login-form";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center md:p-8 ">
      <div className="max-w-md w-full  rounded-xl space-y-8 bg-white  p-8 ounded-lg shadow">
        <h2 className="mt-6 text-center text-xl font-bold text-gray-800">
          Log in to your account
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}
