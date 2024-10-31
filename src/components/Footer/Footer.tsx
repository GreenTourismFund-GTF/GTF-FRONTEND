

const Footer = () =>
{
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center cursor-pointer">
                            <span className="font-black text-3xl tracking-tight">
                                <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">G</span>
                                <span className="relative">T</span>
                                <span className="relative">F</span>
                            </span>
                            <div className="ml-1 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        </div>
                        <p className="text-gray-400">Investing in nature for a sustainable future.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/projects" className="text-gray-400 hover:text-white transition-colors">Projects</a></li>
                            <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                            <li><a href="/community" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                            <li><a href="/admin" className="text-gray-400 hover:text-white transition-colors">Admin</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Discord</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Telegram</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 GreenTourismFund. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer