"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Схема с подтверждением пароля и проверкой совпадения
const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmedPassword: z.string().min(6, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    path: ["confirmedPassword"],
    message: "Passwords do not match",
  });

type FormData = z.infer<typeof formSchema>;

export const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmedPassword: "",
    },
  });

  const handleError = (err: any) => {
    const msg = err?.error?.message ?? "Unknown error";
    setError(msg);
  };

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      await authClient.signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: handleError,
        }
      );
    } catch {
      setError("Unexpected error");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <Card className="overflow-hidden p-0 max-w-4xl w-full">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8 flex flex-col gap-6">
              {/* Заголовок */}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-balance">Register to get started</p>
              </div>

              {/* Поля формы */}
              <div className="grid gap-3">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="At least 6 characters" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirmed Password */}
                <FormField
                  control={form.control}
                  name="confirmedPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Repeat your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Ошибка */}
              {!!error && (
                <Alert className="bg-destructive/10 border-none">
                  <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}

              {/* Кнопка регистрации */}
              <Button type="submit" className="w-full">
                Sign Up
              </Button>

              {/* Разделитель */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  or continue with
                </span>
              </div>

              {/* Соцкнопки */}
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => 
                  authClient.signIn.social({
                  provider: "google",
                  })
                }
                variant="outline" 
                type="button" 
                className="w-full">
                  Google
                </Button>
                <Button 
                 onClick={() => 
                  authClient.signIn.social({
                    provider: "github",
                  })
                }
                variant="outline" 
                type="button" 
                className="w-full">
                  Github
                </Button>
              </div>

              {/* Логин */}
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/sign-in" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </form>
          </Form>

          {/* Боковая панель */}
          <div className="hidden md:flex flex-col gap-y-4 items-center justify-center bg-radial from-green-700 to-green-900 relative">
            <img src="/logo.svg" alt="Image" className="h-[92px] w-[92px]" />
            <p className="text-2xl font-semibold text-white">Shadow.AI</p>
          </div>
        </CardContent>
      </Card>

      {/* Футер */}
      <div className="w-full flex justify-center mt-6 px-4">
        <div className="text-muted-foreground text-center text-xs text-balance max-w-4xl *:[a]:hover:hover:text-primary *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};
