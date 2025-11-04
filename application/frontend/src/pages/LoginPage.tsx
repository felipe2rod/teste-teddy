import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '../auth/auth.service';
import { useAuthContext } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const schema = z.object({
  login: z.string().min(6, 'Mínimo de 6 caracteres'),
  password: z.string().min(6, 'Mínimo de 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError('');
    setLoading(true);
    try {
      const response = await login(data);
      setUser(response.user);
      navigate('/');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
        <h1 className="font-inter text-2xl text-center mb-6">Olá, seja bem-vindo!</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Login</label>
            <input
              type="login"
              {...register('login')}
              className="font-inter w-full border border-[#D9D9D9] rounded-xs px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu login:"
            />
            {errors.login && (
              <p className="text-sm text-red-500 mt-1">{errors.login.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              {...register('password')}
              className="font-inter w-full border border-[#D9D9D9] rounded-xs px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center mt-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#EC6724] text-white font-semibold py-2 rounded-xs transition disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
