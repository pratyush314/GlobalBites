import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignupInputState, userSignupSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyhole, Mail, Phone, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState<SignupInputState>({
    fullName: "",
    email: "",
    password: "",
    contact: "",
  });
  const [errors, setErrors] = useState<Partial<SignupInputState>>({});
  const { signup } = useUserStore();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const signUpSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setisLoading(true);
    const res = userSignupSchema.safeParse(input);
    if (!res.success) {
      const fieldErrors = res.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
      setisLoading(false);
      return;
    }
    setErrors({});
    try {
      await signup(input);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
    setisLoading(false);
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={signUpSubmitHandler}
        className="md:p-8 w-full max-w-md  md:border border-gray-200 rounded-lg mx-4"
      >
        <div className="mb-4 text-center">
          <h1 className="font-bold text-2xl">GlobalBites</h1>
        </div>
        <div className="flex flex-col gap-5">
          <div className="relative">
            <Input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={input.fullName}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-sm text-red-500">{errors.fullName}</span>
            )}
          </div>
          <div className="relative">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-sm text-red-500">{errors.email}</span>
            )}
          </div>
          <div className="relative">
            <Input
              type="password"
              name="password"
              className="pl-10 focus-visible:ring-1"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-sm text-red-500">{errors.password}</span>
            )}
          </div>
          <div className="relative">
            <Input
              type="text"
              name="contact"
              placeholder="Enter your contact number"
              value={input.contact}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <Phone className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-sm text-red-500">{errors.contact}</span>
            )}
          </div>
          <Button type="submit" className="bg-orange hover:bg-hoverOrange">
            {isLoading ? (
              <div className="flex items-center gap-3">
                <Loader2 className="animate-spin" />
                <span>Signing in ...</span>
              </div>
            ) : (
              "SignUp"
            )}
          </Button>
          <Separator />
          <p className="text-center">
            Already have an account ?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
