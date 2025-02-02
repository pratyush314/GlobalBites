import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const { forgotPassword } = useUserStore();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setisLoading] = useState(false);
  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setisLoading(true);
      await forgotPassword(email);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form
        onSubmit={handleReset}
        className="flex flex-col gap-5 md:border md:p-8 w-full max-w-md rounded-lg mx-4"
      >
        <div className="flex flex-col gap-3 text-center">
          <h1 className="font-extraboldbold text-2xl">Forget Password</h1>
          <p className="text-sm text-gray-600">
            Enter your email address to reset your password
          </p>
          <div className="relative">
            <Input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="pl-10 focus-visible:ring-1 focus-visible:border-0"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className="mt-2 bg-orange hover:bg-hoverOrange"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending ...</span>
              </div>
            ) : (
              "Send reset password link"
            )}
          </Button>
          <span>
            Back to{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
