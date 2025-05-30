"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../common/SubmitButton";
import { useActionState, useEffect } from "react";
import { forgetPasswordAction } from "@/actions/authActions";
import { toast } from "sonner";

const ForgetPassword = () => {
  const initState = {
    status: 0,
    message: "",
    errors: {},
  };
  const [state, formAction] = useActionState(forgetPasswordAction, initState);

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
        <SubmitButton />
      </div>
    </form>
  );
};

export default ForgetPassword;
