"use client";
import { registerAction } from "@/actions/authActions";
import { SubmitButton } from "@/components/common/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
const Register = () => {
  const initState = {
    status: 0,
    message: "",
    errors: {},
  };
  const [state, formAction] = useActionState(registerAction, initState);

  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
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
        <span className="text-red-500">{state.errors?.name}</span>
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
        <span className="text-red-500">{state.errors?.confirm_password}</span>
      </div>
      <div className="mt-4">
        <SubmitButton />
      </div>
    </form>
  );
};

export default Register;
