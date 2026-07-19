import { FaGithub, FaGoogle } from "react-icons/fa";
import { useToast } from "../ui";

function SocialAuthButtons({ mode = "login" }) {
  const toast = useToast();
  const action = mode === "register" ? "Sign up" : "Continue";

  const handleSocial = (provider) => {
    toast.info(
      `${provider} ${mode} will be available once OAuth is connected.`,
      `${provider} — coming soon`
    );
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => handleSocial("Google")}
        className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-200 transition duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:shadow-[0_0_24px_rgba(59,130,246,0.12)]"
      >
        <FaGoogle className="text-[#ea4335] transition group-hover:scale-110" size={15} />
        {action} with Google
      </button>
      <button
        type="button"
        onClick={() => handleSocial("GitHub")}
        className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-200 transition duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:shadow-[0_0_24px_rgba(139,92,246,0.12)]"
      >
        <FaGithub className="transition group-hover:scale-110" size={16} />
        {action} with GitHub
      </button>
    </div>
  );
}

export default SocialAuthButtons;
