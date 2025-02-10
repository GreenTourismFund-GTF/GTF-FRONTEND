import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Key } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';

const PasswordReset = () =>
{
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handlePasswordReset = () =>
    {
        // Implement your password reset logic here
        console.log('Resetting password:', { newPassword, confirmPassword });
        navigate('/login');
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-800 to-slate-900">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>
                        <div className="flex items-center space-x-2">
                            <Key className="h-6 w-6 text-green-500" />
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
                        <div className="relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
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
                            onClick={handlePasswordReset}
                        >
                            Reset Password
                        </Button>
                        <Link to="/login" className="text-sm text-center rounded-lg bg-gray-100 p-2 w-[30%] text-green-800 hover:text-green-600 ml-4">
                            Back to Login
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default PasswordReset;