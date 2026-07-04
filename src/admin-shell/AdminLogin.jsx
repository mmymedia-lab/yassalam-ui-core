import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Lock, User, Loader2 } from 'lucide-react';
import { useToast } from '../shell/use-toast.jsx';

/**
 * Admin login page posting { username, password } to a PHP login endpoint.
 * Expects response shape: { success, token, user }.
 *
 * @param {object} props
 * @param {object} props.apiClient - Axios instance (required), e.g. from createApiClient().
 * @param {string} [props.loginEndpoint='/login.php'] - Endpoint path relative to apiClient baseURL.
 * @param {string} [props.brandTitle='Admin Panel'] - Heading text.
 * @param {string} [props.brandSubtitle='Silakan login untuk mengelola website'] - Subheading text.
 * @param {string} [props.redirectPath='/admin/dashboard'] - Where to go after successful login.
 * @param {string} [props.userStorageKey='admin_user'] - localStorage key for the user object.
 * @param {string} [props.tokenStorageKey='admin_token'] - localStorage key for the auth token.
 * @param {string} [props.footerText] - Optional copyright line below the card.
 */
const AdminLogin = ({
  apiClient,
  loginEndpoint = '/login.php',
  brandTitle = 'Admin Panel',
  brandSubtitle = 'Silakan login untuk mengelola website',
  redirectPath = '/admin/dashboard',
  userStorageKey = 'admin_user',
  tokenStorageKey = 'admin_token',
  footerText,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiClient.post(loginEndpoint, {
        username,
        password
      });

      if (response.data.success) {
        localStorage.setItem(tokenStorageKey, response.data.token);
        localStorage.setItem(userStorageKey, JSON.stringify(response.data.user));

        toast({
          title: "Selamat Datang!",
          description: "Berhasil masuk ke Dashboard Admin.",
        });

        setTimeout(() => navigate(redirectPath), 1000);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Terjadi kesalahan koneksi atau server.";
      toast({
        title: "Login Gagal",
        description: errorMsg,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="bg-green-800 w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-green-900/20">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{brandTitle}</h1>
          <p className="text-slate-400">{brandSubtitle}</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-slate-300 font-medium mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-white focus:border-green-800 focus:ring-1 focus:ring-green-800 outline-none transition-all"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-white focus:border-green-800 focus:ring-1 focus:ring-green-800 outline-none transition-all"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-800 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              {isLoading ? 'Memproses...' : 'Masuk Sekarang'}
            </button>
          </form>
        </div>

        {/* Footer */}
        {footerText && (
          <p className="text-center mt-8 text-slate-500 text-sm">
            {footerText}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
