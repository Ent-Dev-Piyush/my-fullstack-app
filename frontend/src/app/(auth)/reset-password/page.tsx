import ResetPassword from "@/components/auth/ResetPassword";

const resetPassword = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-slate-50">
      <div className="w-[550px] px-10 py-5 bg-white rounded-2xl shadow-md">
        <h1 className="text-3xl text-center md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
          Memory Quiz
        </h1>
        <h1 className="text-2xl font-bold mt-2">Reset Password</h1>
        <ResetPassword />
      </div>
    </div>
  );
};

export default resetPassword;
