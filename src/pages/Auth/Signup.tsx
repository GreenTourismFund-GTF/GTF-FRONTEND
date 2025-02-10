import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';

const SignupPage = () =>
{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignup = () =>
    {
        // Implement your signup logic here
        console.log('Signing up with:', { name, email, password, confirmPassword });
        navigate('/login');
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
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                        <div className="relative">
                            <Input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-3 -translate-y-1/2 bg-transparent hover:border-none focus:outline-none"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full flex-col gap-4">
                        <Button
                            className="w-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-200 font-medium text-sm shadow-sm"
                            onClick={handleSignup}
                        >
                            Sign up
                        </Button>
                        <Link to="/login" className="text-sm text-slate-800 hover:!text-slate-900 ml-4">
                            Already have an account?  <span className='!text-green-600 hover:!text-green-500'>Sign in</span>
                        </Link>

                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignupPage;