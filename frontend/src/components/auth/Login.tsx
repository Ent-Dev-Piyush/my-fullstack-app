"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SubmitButton } from "../common/SubmitButton";
import { useActionState, useEffect } from "react";
import { loginAction } from "@/actions/authActions";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

const Login = () => {
  const initState = {
    status: 0,
    message: "",
    errors: {},
    data: {},
  };
  const [state, formAction] = useActionState(loginAction, initState);

  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
      signIn("credentials", {
        email: state.data?.email,
        password: state.data?.password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
    }
  }, [state]);
  return (
    <form action={formAction}>
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
        <span className="text-red-500">{state.errors?.email}</span>
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
        <span className="text-red-500">{state.errors?.password}</span>
        <div className="text-right font-bold mt-2">
          <Link href="/forget-password"> Forget Password ?</Link>
        </div>
      </div>
      <div className="mt-4">
        <SubmitButton />
      </div>
    </form>
  );
};

export default Login;
