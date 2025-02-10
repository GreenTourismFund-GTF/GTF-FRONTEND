import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';
import { Button } from '../../components/ui/button';

const LoginPage = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () =>
    {
        // Implement your login logic here
        console.log('Logging in with:', { email, password, rememberMe });
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-800 to-slate-900">
            <Card className="w-[95%] max-w-md">
                <CardHeader>
                    <CardTitle>
                        <div className="flex items-center space-x-2">
                            <User className="h-6 w-6 text-green-500" />
                            <span className="font-black text-2xl tracking-tight">
                                <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">G</span>
                                <span className="relative !text-slate-900">T</span>
                                <span className="relative !text-slate-900">F</span>
                            </span>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-3 -translate-y-1/2 bg-transparent hover:border-none focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <Checkbox
                                checked={rememberMe}
                                onCheckedChange={(checked) => setRememberMe(checked === true)}
                            >
                                Remember me
                            </Checkbox>
                            <Link to="/forgot-password" className="text-sm text-green-600 hover:!text-green-800">
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full flex-col gap-4">
                        <Button
                            className="w-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-200 font-medium text-sm shadow-sm"
                            onClick={handleLogin}
                        >
                            Sign in
                        </Button>
                        <Link to="/signup" className="text-sm text-slate-800 hover:!text-slate-900 ml-4">
                            Don't have an account yet? <span className='!text-green-600 hover:!text-green-500'>Sign up</span>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;