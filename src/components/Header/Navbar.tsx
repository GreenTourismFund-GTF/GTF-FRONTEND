import { useState, useEffect } from 'react';
import { ExternalLink, Menu, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WalletInfo } from '../../lib/types';
import { Button } from '../ui/button';
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { DialogContent } from '@radix-ui/react-dialog';

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

const Navbar = () =>
{
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [connectedWallets, setConnectedWallets] = useState<WalletInfo[]>([]);
    const [selectedWallet, setSelectedWallet] = useState<string>("");


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

    const renderWalletSelection = () => (
        <div className="space-y-4 md:rounded-lg md:absolute md:top-16 md:right-0 md:bg-white p-2 bg-white md:p-4 md:w-[20rem]">
            <div className="grid grid-cols-1 gap-3">
                <p className='text-sm text-gray-500 text-center'>Select your preferred wallet</p>
                <Button
                    variant="outline"
                    onClick={connectXverseWallet}
                    disabled={connectedWallets.some(w => w.name === 'Xverse')}
                    className='md:w-full md:bg-white'
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
                <Button className="w-full mt-4 mb-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium text-sm shadow-sm">
                    Connect Wallet
                    <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className='hidden'>
                    <DialogTitle>Connect wallet</DialogTitle>
                    <DialogDescription>
                        Select your wallet
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
                    </div>
                ) : (
                    renderWalletSelection()
                )}
            </DialogContent>
        </Dialog>
    );

    // Handle mounting animation
    useEffect(() =>
    {
        setIsMounted(true);
    }, []);

    // Close menu when resizing to desktop view
    useEffect(() =>
    {
        const handleResize = () =>
        {
            if (window.innerWidth >= 768)
            {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuItems = [
        { label: 'Projects', href: '/projects' },
        { label: 'About', href: '/about' },
        { label: 'Community', href: '/community' },
        { label: 'Add Project', href: '/create' }
    ];

    return (
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    <div className="flex items-center space-x-6 md:space-x-32">
                        {/* Logo */}
                        <Link to="/">
                            <div className="flex items-center cursor-pointer">
                                <span className="font-black text-2xl md:text-3xl tracking-tight">
                                    <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">G</span>
                                    <span className="relative !text-black">T</span>
                                    <span className="relative !text-black">F</span>
                                </span>
                                <div className="ml-1 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                            </div>
                        </Link>

                        {/* Desktop Menu Items */}
                        <div className="hidden md:flex space-x-10">
                            {menuItems.map((item) => (
                                <Link key={item.label} to={item.href}>
                                    <button
                                        className="relative text-gray-600 hover:text-green-600 font-medium transition-colors duration-200 outline-none focus:outline-none group"
                                    >
                                        <span className="relative py-2">
                                            {item.label}
                                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                                        </span>
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">

                        <div className="hidden gap-3 md:flex md:relative">
                            <Link to="/login">
                                <Button className="w-full mt-4 mb-2 bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium text-sm shadow-sm">
                                    Login
                                    <User className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            {renderFundingOptions()}
                        </div>


                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none"
                            aria-label="Toggle menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? (
                                <X className="h-6 w-6 text-gray-600" />
                            ) : (
                                <Menu className="h-6 w-6 text-gray-600" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden fixed left-0 right-0 bg-white/95 backdrop-blur-lg transition-all duration-300 ease-in-out ${isMounted ? 'transform' : 'transform translate-y-[-10px] opacity-0'
                        } ${isOpen
                            ? 'opacity-100 translate-y-0 visible'
                            : 'opacity-0 translate-y-[-10px] invisible'
                        }`}
                    style={{
                        top: '64px', 
                        maxHeight: isOpen ? '100vh' : '0',
                        boxShadow: isOpen ? '0 4px 6px -1px rgb(0 0 0 / 0.1)' : 'none'
                    }}
                >
                    <div className="px-4 py-3 space-y-1">
                        {menuItems.map((item) => (
                            <Link key={item.label} to={item.href}>
                                <button
                                    className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors duration-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </button>
                            </Link>
                        ))}
                        <Button className="w-full mt-4 mb-4 bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium text-sm shadow-sm">
                            Login
                            <User className="ml-2 h-4 w-4" />
                        </Button>
                        {renderFundingOptions()}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;