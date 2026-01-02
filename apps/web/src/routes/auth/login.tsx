import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { useSignIn } from "@/api/auth/hooks";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const { mutateAsync: signIn, isPending } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        setError("");
        await signIn(value);
        navigate({ to: "/app/dashboard" });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Invalid credentials";
        setError(errorMessage);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-5">
      <div className="w-full max-w-md border-4 border-black bg-white p-12">
        <h1 className="mb-12 text-center text-6xl font-bold uppercase leading-none tracking-tighter">Login</h1>

        {error && (
          <div className="mb-8 border-4 border-black bg-white p-4">
            <p className="font-mono text-sm font-bold uppercase">{error}</p>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="email">
            {(field) => (
              <div className="mb-6">
                <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  placeholder="admin@demo.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="w-full border-4 border-black bg-white px-4 py-4 font-mono font-bold outline-none focus:bg-lime-400"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <div className="mb-8">
                <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider">Password</label>
                <div className="flex border-4 border-black bg-white">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="flex-1 bg-transparent px-4 py-4 font-mono font-bold outline-none focus:bg-lime-400"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="border-l-4 border-black px-4 font-mono font-bold uppercase transition-all hover:bg-lime-400">
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            )}
          </form.Field>

          <button
            type="submit"
            disabled={isPending}
            className="mb-6 w-full border-4 border-black bg-lime-400 py-4 font-bold uppercase tracking-tight transition-all hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
