import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import hero_1 from '../../assets/hero/hero_1.avif';
import hero_3 from '../../assets/hero/hero_3.avif';
import hero_4 from '../../assets/hero/hero_4.avif';


import
{
    Calendar,
    MapPin,
    Users,
    Trophy,
    ExternalLink,
    ChevronLeft,
    Share2
} from 'lucide-react';
import
{
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../components/ui/dialog';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { ProjectData, WalletInfo } from '../../lib/types';


// Wallet provider interfaces
declare global
{
    interface Window
    {
        BitcoinProvider?: {
            connect: () => Promise<string[]>;
            requestAccounts: () => Promise<string[]>;
            getAccounts: () => Promise<string[]>;
            getNetwork: () => Promise<string>;
            signMessage: (message: string, address: string) => Promise<{ publicKey: string; signature: string }>;
            sendBitcoin: (address: string, amount: number) => Promise<{ txId: string }>;
        };
        near?: {
            connect: () => Promise<void>;
            getAccountId: () => Promise<string>;
            sendMoney: (receiverId: string, amount: string) => Promise<any>;
        };
        lethalProvider?: {
            connect: () => Promise<{ address: string }>;
            sendTransaction: (params: { to: string; value: string }) => Promise<{ hash: string }>;
        };
    }
}

const projectData: ProjectData = {
    id: 1,
    title: "Wildlife Sanctuary Project",
    description: "Supporting local conservation efforts and sustainable tourism practices in the heart of African wildlife reserves.",
    longDescription: `Our Wildlife Sanctuary Project aims to create a sustainable ecosystem where wildlife conservation meets responsible tourism. This innovative approach ensures both the preservation of endangered species and the economic development of local communities.

The project encompasses:
- Protected habitat creation for endangered species
- Anti-poaching initiatives and monitoring systems
- Community-based tourism development
- Educational programs for local schools
- Scientific research facilities`,
    category: "Environment",
    goal: 50000,
    raised: 37500,
    location: "Kenya, East Africa",
    duration: "12 months",
    impact: "high",
    tags: ["conservation", "wildlife", "sustainability", "tourism"],
    team: [
        { name: "Dr. Sarah Johnson", role: "Project Lead" },
        { name: "James Kimani", role: "Local Operations Manager" },
        { name: "Dr. Michael Chen", role: "Wildlife Expert" }
    ],
    milestones: [
        { title: "Land Security", status: "completed" },
        { title: "Infrastructure Setup", status: "in-progress" },
        { title: "Community Training", status: "upcoming" },
        { title: "Tourism Program Launch", status: "upcoming" }
    ],
    wallets: {
        bitcoin: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        near: "project.near",
        lethal: "0x1234567890123456789012345678901234567890"
    },
    supporters: 128,
    images: [
        hero_1, hero_3, hero_4
    ]
};

const MultiProjectDetailPage: React.FC = () =>
{
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [connectedWallets, setConnectedWallets] = useState<WalletInfo[]>([]);
    const [showPaymentSuccess, setShowPaymentSuccess] = useState<boolean>(false);
    const [raised, setRaised] = useState<number>(projectData.raised);
    const [selectedWallet, setSelectedWallet] = useState<string>("");

    useEffect(() =>
    {
        console.log('projectData.images.length:', projectData.images.length);
        const interval = setInterval(() =>
        {
            setCurrentImageIndex((current) =>
                current === projectData.images.length - 1 ? 0 : current + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [projectData.images.length]);



    const connectXverseWallet = async (): Promise<void> =>
    {
        try
        {
            if (window.BitcoinProvider)
            {
                const accounts = await window.BitcoinProvider.connect();
                if (accounts && accounts.length > 0)
                {
                    setConnectedWallets(prev => [...prev, {
                        name: 'Xverse',
                        type: 'bitcoin',
                        address: accounts[0]
                    }]);
                }
            } else
            {
                window.open('https://www.xverse.app/', '_blank');
            }
        } catch (error)
        {
            console.error('Error connecting Xverse wallet:', error);
        }
    };

    const connectNearWallet = async (): Promise<void> =>
    {
        try
        {
            if (window.near)
            {
                await window.near.connect();
                const accountId = await window.near.getAccountId();
                setConnectedWallets(prev => [...prev, {
                    name: 'NEAR',
                    type: 'near',
                    address: accountId
                }]);
            } else
            {
                window.open('https://wallet.near.org/', '_blank');
            }
        } catch (error)
        {
            console.error('Error connecting NEAR wallet:', error);
        }
    };

    const connectLethalWallet = async (): Promise<void> =>
    {
        try
        {
            if (window.lethalProvider)
            {
                const { address } = await window.lethalProvider.connect();
                setConnectedWallets(prev => [...prev, {
                    name: 'Lethal',
                    type: 'lethal',
                    address
                }]);
            } else
            {
                window.open('https://lethal.app/', '_blank');
            }
        } catch (error)
        {
            console.error('Error connecting Lethal wallet:', error);
        }
    };

    const handlePayment = async (amount: number): Promise<void> =>
    {
        const selectedWalletInfo = connectedWallets.find(w => w.name === selectedWallet);
        if (!selectedWalletInfo) return;

        try
        {
            let txResult;
            switch (selectedWalletInfo.type)
            {
                case 'bitcoin':
                    if (window.BitcoinProvider)
                    {
                        const btcAmount = amount / 40000; // Assuming 1 BTC = $40,000
                        const satoshis = Math.floor(btcAmount * 100000000);
                        txResult = await window.BitcoinProvider.sendBitcoin(
                            projectData.wallets.bitcoin,
                            satoshis
                        );
                    }
                    break;

                case 'near':
                    if (window.near)
                    {
                        const nearAmount = (amount / 3).toString(); // Assuming 1 NEAR = $3
                        txResult = await window.near.sendMoney(
                            projectData.wallets.near,
                            nearAmount
                        );
                    }
                    break;

                case 'lethal':
                    if (window.lethalProvider)
                    {
                        txResult = await window.lethalProvider.sendTransaction({
                            to: projectData.wallets.lethal,
                            value: amount.toString()
                        });
                    }
                    break;
            }

            if (txResult)
            {
                setShowPaymentSuccess(true);
                setRaised(prev => prev + amount);
            }
        } catch (error)
        {
            console.error('Error processing payment:', error);
        }
    };

    const renderWalletSelection = () => (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Select Wallet</h3>
            <div className="grid grid-cols-1 gap-3">
                <Button
                    variant="outline"
                    onClick={connectXverseWallet}
                    disabled={connectedWallets.some(w => w.name === 'Xverse')}
                >
                    Connect Xverse Wallet
                </Button>
                <Button
                    variant="outline"
                    onClick={connectNearWallet}
                    disabled={connectedWallets.some(w => w.name === 'NEAR')}
                >
                    Connect NEAR Wallet
                </Button>
                <Button
                    variant="outline"
                    onClick={connectLethalWallet}
                    disabled={connectedWallets.some(w => w.name === 'Lethal')}
                >
                    Connect Lethal Wallet
                </Button>
            </div>
        </div>
    );

    // Update the funding section in the sidebar
    const renderFundingOptions = () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">
                    Fund This Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Support this Project</DialogTitle>
                    <DialogDescription>
                        Select your wallet and contribution amount
                    </DialogDescription>
                </DialogHeader>

                {connectedWallets.length > 0 ? (
                    <div className="space-y-6">
                        <select
                            className="w-full p-2 border rounded"
                            value={selectedWallet}
                            onChange={(e) => setSelectedWallet(e.target.value)}
                        >
                            <option value="">Select a wallet</option>
                            {connectedWallets.map(wallet => (
                                <option key={wallet.name} value={wallet.name}>
                                    {wallet.name} - {wallet.address.slice(0, 6)}...
                                </option>
                            ))}
                        </select>

                        {selectedWallet && (
                            <div className="grid grid-cols-2 gap-4">
                                {[100, 500, 1000, 5000].map((amount) => (
                                    <Button
                                        key={amount}
                                        variant="outline"
                                        onClick={() => handlePayment(amount)}
                                    >
                                        ${amount}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    renderWalletSelection()
                )}
            </DialogContent>
        </Dialog>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}

            <div className="relative bg-gradient-to-r from-green-900 to-emerald-950 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
                    <Button
                        variant="ghost"
                        className="sm:text-green-700 text-white/90 bg-transparent sm:bg-white/90 text-xs sm:text-sm transition-colors p-1 sm:p-2 duration-200 absolute top-4 left-4 sm:left-8"
                        onClick={() => window.history.back()}
                    >
                        <ChevronLeft className="mr-0 h-1 w-1" />
                        Back to Projects
                    </Button>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto pt-4"
                    >
                        <Badge className="inline-block text-green-800 bg-white prose hover:text-white backdrop-blur-sm transition-colors duration-200 text-lg font-semibold tracking-wider px-4 py-1">
                            {projectData.category}
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-5 mb-4">
                            {projectData.title}
                        </h1>
                        <p className="text-base sm:text-lg text-green-50/90 max-w-2xl mx-auto leading-relaxed">
                            {projectData.description}
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="relative aspect-video">
                                    {projectData.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'
                                                }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`Project ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                    <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                                        {projectData.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentImageIndex === index
                                                    ? 'bg-white w-4'
                                                    : 'bg-white/50 hover:bg-white/70'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Project Details */}
                        <Card>
                            <CardContent className="p-6 space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">About the Project</h2>
                                    <p className="text-gray-600 whitespace-pre-line">
                                        {projectData.longDescription}
                                    </p>
                                </div>

                                {/* Key Metrics */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <Users className="mx-auto h-6 w-6 text-green-600 mb-2" />
                                        <div className="text-sm text-gray-600">Supporters</div>
                                        <div className="font-bold">{projectData.supporters}</div>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <MapPin className="mx-auto h-6 w-6 text-green-600 mb-2" />
                                        <div className="text-sm text-gray-600">Location</div>
                                        <div className="font-bold">{projectData.location}</div>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <Calendar className="mx-auto h-6 w-6 text-green-600 mb-2" />
                                        <div className="text-sm text-gray-600">Duration</div>
                                        <div className="font-bold">{projectData.duration}</div>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <Trophy className="mx-auto h-6 w-6 text-green-600 mb-2" />
                                        <div className="text-sm text-gray-600">Impact</div>
                                        <div className="font-bold capitalize">{projectData.impact}</div>
                                    </div>
                                </div>

                                {/* Team */}
                                <div>
                                    <h3 className="text-xl font-bold mb-4">Project Team</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {projectData.team.map((member, index) => (
                                            <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                                <div className="font-medium">{member.name}</div>
                                                <div className="text-sm text-gray-600">{member.role}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Milestones */}
                                <div>
                                    <h3 className="text-xl font-bold mb-4">Project Milestones</h3>
                                    <div className="space-y-4">
                                        {projectData.milestones.map((milestone, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                            >
                                                <span>{milestone.title}</span>
                                                <Badge
                                                    variant={
                                                        milestone.status === 'completed'
                                                            ? 'default'
                                                            : milestone.status === 'in-progress'
                                                                ? 'destructive'
                                                                : 'secondary'
                                                    }
                                                >
                                                    {milestone.status}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="space-y-6">
                        <Card className="sticky top-6">
                            <CardContent className="p-6 space-y-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-2xl font-bold text-green-600">
                                            ${raised.toLocaleString()}
                                        </span>
                                        <span className="text-gray-600">
                                            raised of ${projectData.goal.toLocaleString()}
                                        </span>
                                    </div>
                                    <Progress
                                        value={(raised / projectData.goal) * 100}
                                        className="h-2 bg-gray-200"
                                    />
                                    <div className="mt-2 text-sm text-gray-600">
                                        {projectData.supporters} supporters
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {renderFundingOptions()}
                                    <Button variant="outline" className="w-full">
                                        <Share2 className="mr-2 h-4 w-4" />
                                        Share Project
                                    </Button>
                                </div>
                                {/* Project Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {projectData.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {showPaymentSuccess && (
                <Alert className="fixed bottom-4 right-4 max-w-md bg-green-50 border-green-200">
                    <AlertDescription className="text-green-800">
                        Thank you for your contribution! Your transaction is being processed.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
};

export default MultiProjectDetailPage;