"use client";
import { resetPasswordAction } from "@/actions/authActions";
import { SubmitButton } from "@/components/common/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
const ResetPassword = () => {
  const initState = {
    status: 0,
    message: "",
    errors: {},
  };
  const [state, formAction] = useActionState(resetPasswordAction, initState);
  const sParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
      setTimeout(() => {
        router.replace("/login");
      }, 1000);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <input type="hidden" name="token" value={sParams.get("token") ?? ""} />
      <div className="mt-4">
        <Label htmlFor="email" className="mb-1">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email..."
          readOnly
          value={sParams.get("email") ?? ""}
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

export default ResetPassword;
