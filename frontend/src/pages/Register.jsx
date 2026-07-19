import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import {
  AuthLayout,
  AuthCard,
  PasswordInput,
  PasswordStrength,
  SocialAuthButtons,
  Checkbox,
} from "../components/auth";
import { Input, Spinner, useToast } from "../components/ui";
import { useAuthForm } from "../hooks/useAuthForm";
import { validateRegister } from "../utils/validation";
import { authService } from "../services/authService";

function Register() {
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
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    validate: validateRegister,
    onSubmit: async (formValues) => {
      const result = await authService.register(formValues);
      toast.success("Your TrustHub account is ready.", "Account created");
      navigate("/dashboard", { replace: true });
      return result;
    },
  });

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start hashing documents and anchoring proofs on Ethereum."
    >
      <AuthCard shake={shake} className="sm:p-7">
        <SocialAuthButtons mode="register" />

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            or email
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
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

          <div className="grid gap-3.5 sm:grid-cols-2">
            <Input
              name="firstName"
              label="First Name"
              placeholder="Ada"
              autoComplete="given-name"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={fieldError("firstName")}
            />
            <Input
              name="lastName"
              label="Last Name"
              placeholder="Lovelace"
              autoComplete="family-name"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={fieldError("lastName")}
            />
          </div>

          <Input
            name="username"
            label="Username"
            placeholder="adalovelace"
            autoComplete="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={fieldError("username")}
          />

          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="ada@company.com"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={fieldError("email")}
          />

          <div>
            <PasswordInput
              name="password"
              label="Password"
              autoComplete="new-password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={fieldError("password")}
            />
            <PasswordStrength password={values.password} />
          </div>

          <PasswordInput
            name="confirmPassword"
            label="Confirm Password"
            autoComplete="new-password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={fieldError("confirmPassword")}
          />

          <div className="pt-1">
            <Checkbox
              name="agreeTerms"
              checked={values.agreeTerms}
              onChange={handleChange}
              onBlur={handleBlur}
              error={fieldError("agreeTerms")}
              label={
                <>
                  I agree to the{" "}
                  <button
                    type="button"
                    className="font-medium text-th-blue-bright hover:text-white"
                    onClick={(event) => {
                      event.preventDefault();
                      toast.info("Terms document coming soon.", "Terms of Service");
                    }}
                  >
                    Terms of Service
                  </button>
                </>
              }
            />
          </div>

          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={submitting ? undefined : { scale: 1.02 }}
            whileTap={submitting ? undefined : { scale: 0.98 }}
            className="group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-th-blue via-[#6366f1] to-th-purple px-5 py-3.5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(99,102,241,0.4)] transition hover:shadow-[0_0_44px_rgba(139,92,246,0.55)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Spinner size="sm" />
                Creating account…
              </>
            ) : (
              <>
                Create account
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </>
            )}
          </motion.button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-th-blue-bright transition hover:text-white"
          >
            Log in
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}

export default Register;
