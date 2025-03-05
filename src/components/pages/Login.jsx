
"use client";

import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const phoneSchema = z.object({
  phone: z.string().min(10, "Please enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const validateField = (name, value, schema) => {
    try {
      schema.shape[name].parse(value);
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [name]: error.issues[0].message }));
    }
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const schema = type === "email" ? emailSchema : phoneSchema;
    try {
      schema.parse(formData);
      console.log("Form submitted:", formData);
    } catch (error) {
      const formattedErrors = {};
      error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <div className="flex min-h-screen bg-mainbg">
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-md space-y-10">
          <h1 className="text-2xl font-semibold">Welcome back</h1>

          <Tabs defaultValue="email" className="w-full ">
            <TabsList  className="w-full space-x-8">
              <TabsTrigger
                value="email"
                variant="underline"
                className="relative px-1 pb-2 text-sm font-medium  data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:bottom-0 data-[state=active]:after:w-full data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-600"
              >
                Email
              </TabsTrigger>
              <TabsTrigger
                value="phone"
                variant="underline"
                className="relative px-1 pb-2 text-sm font-medium  data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:bottom-0 data-[state=active]:after:w-full data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-600"
              >
                Phone
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <form
                onSubmit={(e) => handleSubmit(e, "email")}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="block text-sm">
                    Email
                    <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }));
                      validateField("email", e.target.value, emailSchema);
                    }}
                    className={`w-full ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm">
                    Password
                    <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }));
                        validateField("password", e.target.value, emailSchema);
                      }}
                      className={`w-full pr-10 ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                <div className="text-right">
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary text-white"
                >
                  Login
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" className="w-full">
                    <img
                      src="https://www.google.com/favicon.ico"
                      alt="Google"
                      className="w-5 h-5"
                    />
                  </Button>
                  <Button type="button" variant="outline" className="w-full">
                    <img
                      src="https://www.facebook.com/favicon.ico"
                      alt="Facebook"
                      className="w-5 h-5"
                    />
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="phone">
              <form
                onSubmit={(e) => handleSubmit(e, "phone")}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="block text-sm">
                    Phone
                    <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }));
                      validateField("phone", e.target.value, phoneSchema);
                    }}
                    className={`w-full ${errors.phone ? "border-red-500" : ""}`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm">
                    Password
                    <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }));
                        validateField("password", e.target.value, phoneSchema);
                      }}
                      className={`w-full pr-10 ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                <div className="text-right">
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary  hover:bg-primary text-white"
                >
                  Login
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" className="w-full">
                    <img
                      src="https://www.google.com/favicon.ico"
                      alt="Google"
                      className="w-5 h-5"
                    />
                  </Button>
                  <Button type="button" variant="outline" className="w-full">
                    <img
                      src="https://www.facebook.com/favicon.ico"
                      alt="Facebook"
                      className="w-5 h-5"
                    />
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
           <Link href="/signup" className="text-primary hover:underline">Register</Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:block flex-1">
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/e2/98/7e/safe-reliable-responsible.jpg?w=1400&h=800&s=1"
          alt="Login visual"
          className="h-full w-full  object-cover"
        />
      </div>
    </div>
  );
}
