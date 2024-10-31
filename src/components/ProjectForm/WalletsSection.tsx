// components/ProjectForm/WalletsSection.tsx

import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import {
    FormItem,
    FormLabel,
    FormControl,
} from '../../components/ui/form';
import { WalletsProps } from '../../lib/types';

export const WalletsSection: React.FC<WalletsProps> = ({
    wallets,
    onWalletsChange,
}) => {
    const handleWalletChange = (field: keyof typeof wallets, value: string) => {
        onWalletsChange({
            ...wallets,
            [field]: value,
        });
    };

    return (
        <Card>
            <CardHeader>
                <h2 className="text-xl font-semibold">Wallet Information</h2>
                <p className="text-sm text-gray-500">Add your wallet addresses to receive funding</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <FormItem>
                    <FormLabel>Bitcoin Wallet Address</FormLabel>
                    <FormControl>
                        <Input
                            value={wallets.bitcoin}
                            onChange={(e) => handleWalletChange('bitcoin', e.target.value)}
                            placeholder="Enter Bitcoin wallet address"
                            required
                        />
                    </FormControl>
                </FormItem>

                <FormItem>
                    <FormLabel>NEAR Wallet Address</FormLabel>
                    <FormControl>
                        <Input
                            value={wallets.near}
                            onChange={(e) => handleWalletChange('near', e.target.value)}
                            placeholder="Enter NEAR wallet address"
                            required
                        />
                    </FormControl>
                </FormItem>

                <FormItem>
                    <FormLabel>Lethal Wallet Address</FormLabel>
                    <FormControl>
                        <Input
                            value={wallets.lethal}
                            onChange={(e) => handleWalletChange('lethal', e.target.value)}
                            placeholder="Enter Lethal wallet address"
                            required
                        />
                    </FormControl>
                </FormItem>
            </CardContent>
        </Card>
    );
};