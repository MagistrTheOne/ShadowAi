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
import { useRouter } from "next/navigation"; // <--- исправлено
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    try {
      // Используем await и промис
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: (err) => {
            // Подстраховка по типу ошибки
            const msg = err?.error?.message ?? "Unknown error";
            setError(msg);
          },
        }
      );
    } catch (e) {
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
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">Login to your account</p>
              </div>

              {/* Поля формы */}
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@exmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
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

              {/* Кнопка входа */}
              <Button type="submit" className="w-full">
                Login
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

              {/* Регистрация */}
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline underline-offset-4">
                  Sign up
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
