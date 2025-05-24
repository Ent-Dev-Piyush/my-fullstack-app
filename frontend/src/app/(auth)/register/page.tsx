import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const register = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-slate-50">
      <div className="w-[550px] px-10 py-5 bg-white rounded-2xl shadow-md">
        <h1 className="text-3xl text-center md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
          Memory Quiz
        </h1>
        <h1 className="text-2xl font-bold mt-2">Register</h1>
        <p>Welcome to Memory Quiz</p>
        <form>
          <div className="mt-4">
            <Label htmlFor="name" className="mb-1">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name..."
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="email" className="mb-1">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email..."
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="password" className="mb-1">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password..."
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="password" className="mb-1">
              Confirm Password
            </Label>
            <Input
              id="cpassword"
              type="password"
              name="confirm_password"
              placeholder="Enter your password..."
            />
          </div>
          <div className="mt-4">
            <Button className="w-full">Submit</Button>
          </div>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <strong>
            <Link href="/login">Login</Link>
          </strong>
        </p>
      </div>
    </div>
  );
};

export default register;
