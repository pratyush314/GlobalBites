import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { resetPassword } = useUserStore();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState<string>("");
  const [isLoading, setisLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setisLoading(true);
      await resetPassword(token!, newPassword);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form
        onSubmit={handleChangePassword}
        className="flex flex-col gap-5 md:border md:p-8 w-full max-w-md rounded-lg mx-4"
      >
        <div className="flex flex-col gap-3 text-center">
          <h1 className="font-extraboldbold text-2xl">Reset Password</h1>
          <p className="text-sm text-gray-600">
            Enter your new password to reset old one
          </p>
          <div className="relative">
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="pl-10 focus-visible:ring-1 focus-visible:border-0"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className="mt-2 bg-orange hover:bg-hoverOrange"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Changing ...</span>
              </div>
            ) : (
              "Change Password"
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

export default ResetPassword;
