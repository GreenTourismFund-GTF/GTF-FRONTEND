import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Key, User } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';

const PasswordResetRequest = () =>
{
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleResetRequest = () =>
    {
        // Implement your password reset request logic here
        console.log('Requesting password reset for:', email);
        navigate('/password-reset');
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
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className="text-sm text-gray-500">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full flex-col gap-4">
                        <Button
                            className="w-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-200 font-medium text-sm shadow-sm"
                            onClick={handleResetRequest}
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

export default PasswordResetRequest;