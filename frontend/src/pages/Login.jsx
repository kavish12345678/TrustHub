import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import {
  AuthLayout,
  AuthCard,
  PasswordInput,
  SocialAuthButtons,
  Checkbox,
} from "../components/auth";
import { Input, Spinner, useToast } from "../components/ui";
import { useAuthForm } from "../hooks/useAuthForm";
import { validateLogin } from "../utils/validation";
import { authService } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    values,
    errors,
    submitting,
    shake,
    handleChange,
    handleBlur,
    handleSubmit,
    fieldError,
  } = useAuthForm({
    initialValues: {
      email: authService.getRememberedEmail(),
      password: "",
      remember: Boolean(authService.getRememberedEmail()),
    },
    validate: validateLogin,
    onSubmit: async (formValues) => {
      const result = await authService.login({
        email: formValues.email,
        password: formValues.password,
        remember: formValues.remember,
      });
      toast.success("Welcome back to TrustHub.", "Signed in");
      navigate("/dashboard", { replace: true });
      return result;
    },
  });

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to verify documents and manage on-chain proofs."
    >
      <AuthCard shake={shake}>
        <SocialAuthButtons mode="login" />

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            or email
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <AnimatePresence>
            {errors.form ? (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300"
                role="alert"
              >
                {errors.form}
              </motion.div>
            ) : null}
          </AnimatePresence>

          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="you@company.com"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={fieldError("email")}
          />

          <PasswordInput
            name="password"
            label="Password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={fieldError("password")}
          />

          <div className="flex items-center justify-between gap-3 pt-1">
            <Checkbox
              name="remember"
              checked={values.remember}
              onChange={handleChange}
              label="Remember me"
            />
            <button
              type="button"
              className="text-sm font-medium text-th-blue-bright transition hover:text-white"
              onClick={() =>
                toast.info(
                  "Password reset will be available once the API is connected.",
                  "Forgot password"
                )
              }
            >
              Forgot password?
            </button>
          </div>

          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={submitting ? undefined : { scale: 1.02 }}
            whileTap={submitting ? undefined : { scale: 0.98 }}
            className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-th-blue via-[#6366f1] to-th-purple px-5 py-3.5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(99,102,241,0.4)] transition hover:shadow-[0_0_44px_rgba(139,92,246,0.55)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Spinner size="sm" />
                Signing in…
              </>
            ) : (
              <>
                Log in
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </>
            )}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-th-blue-bright transition hover:text-white"
          >
            Create one
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}

export default Login;
