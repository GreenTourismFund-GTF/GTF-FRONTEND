import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import
{
    Calendar,
    MapPin,
    Users,
    Trophy,
    Wallet,
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

interface TeamMember
{
    name: string;
    role: string;
}

interface Milestone
{
    title: string;
    status: 'completed' | 'in-progress' | 'upcoming';
}

interface ProjectData
{
    id: number;
    title: string;
    description: string;
    longDescription: string;
    category: string;
    goal: number;
    raised: number;
    location: string;
    duration: string;
    impact: string;
    tags: string[];
    team: TeamMember[];
    milestones: Milestone[];
    projectWallet: string;
    supporters: number;
    images: string[];
}

// Mock project data
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
    projectWallet: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    supporters: 128,
    images: [
        "/api/placeholder/800/400",
        "/api/placeholder/800/400",
        "/api/placeholder/800/400"
    ]
};

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
    }
}

const ProjectDetailPage: React.FC = () =>
{
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [walletConnected, setWalletConnected] = useState<boolean>(false);
    const [showPaymentSuccess, setShowPaymentSuccess] = useState<boolean>(false);
    const [raised, setRaised] = useState<number>(projectData.raised);
    const [isConnecting, setIsConnecting] = useState<boolean>(false);
    const [connectedAddress, setConnectedAddress] = useState<string>("");

    const connectWallet = async (): Promise<void> =>
    {
        setIsConnecting(true);
        try
        {
            // Check if Xverse wallet is installed
            if (window.BitcoinProvider)
            {
                // Request account access
                const accounts = await window.BitcoinProvider.connect();
                if (accounts && accounts.length > 0)
                {
                    setConnectedAddress(accounts[0]);
                    setWalletConnected(true);
                }
            } else
            {
                alert('Please install Xverse wallet to make contributions!');
            }
        } catch (error)
        {
            console.error('Error connecting wallet:', error);
        }
        setIsConnecting(false);
    };

    const handlePayment = async (amount: number): Promise<void> =>
    {
        try
        {
            if (!window.BitcoinProvider) throw new Error('No Xverse wallet found');

            // Convert USD amount to satoshis (assuming 1 BTC = $40,000 USD for this example)
            const btcAmount = amount / 40000;
            const satoshis = Math.floor(btcAmount * 100000000);

            // Request payment
            const result = await window.BitcoinProvider.sendBitcoin(
                projectData.projectWallet,
                satoshis
            );

            if (result.txId)
            {
                setShowPaymentSuccess(true);
                setRaised(prev => prev + amount);
            }
        } catch (error)
        {
            console.error('Error processing payment:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-green-600 to-emerald-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Button
                        variant="ghost"
                        className="text-white mb-6"
                        onClick={() => window.history.back()}
                    >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Projects
                    </Button>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-white"
                    >
                        <Badge className="mb-4 bg-white/20">{projectData.category}</Badge>
                        <h1 className="text-4xl font-bold mb-4">{projectData.title}</h1>
                        <p className="text-xl text-green-100 max-w-2xl">
                            {projectData.description}
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery */}
                        <Card>
                            <CardContent className="p-0">
                                <div className="relative aspect-video">
                                    <img
                                        src={projectData.images[currentImageIndex]}
                                        alt="Project"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-4 right-4 flex gap-2">
                                        {projectData.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`w-3 h-3 rounded-full ${currentImageIndex === index
                                                    ? 'bg-white'
                                                    : 'bg-white/50'
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

                    {/* Funding Sidebar */}
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

                                {/* Update the wallet connection button text */}
                                <div className="space-y-4">
                                    {!walletConnected ? (
                                        <Button
                                            className="w-full"
                                            onClick={connectWallet}
                                            disabled={isConnecting}
                                        >
                                            <Wallet className="mr-2 h-4 w-4" />
                                            {isConnecting ? 'Connecting...' : 'Connect Xverse Wallet'}
                                        </Button>
                                    ) : (
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
                                                        Choose an amount to contribute (in USD)
                                                    </DialogDescription>
                                                </DialogHeader>
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
                                            </DialogContent>
                                        </Dialog>
                                    )}

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
    )
}

export default ProjectDetailPage;


