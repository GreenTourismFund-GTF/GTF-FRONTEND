import { useState } from 'react';
import { X, Link, CheckCircle } from 'lucide-react';
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

interface ShareModalProps
{
    projectId: number;
    title: string;
    onClose: () => void;
}

export const ShareModal = ({ projectId, title, onClose }: ShareModalProps) =>
{
    const [showCopyConfirmation, setShowCopyConfirmation] = useState(false);
    const shareUrl = `https://yourwebsite.com/projects/${projectId}`;

    const shareButtons = [
        {
            name: 'Facebook',
            icon: FaFacebook,
            color: 'bg-blue-600 hover:bg-blue-700',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        },
        {
            name: 'Twitter',
            icon: FaTwitter,
            color: 'bg-sky-500 hover:bg-sky-600',
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
        },
        {
            name: 'LinkedIn',
            icon: FaLinkedin,
            color: 'bg-blue-700 hover:bg-blue-800',
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        },
    ];

    const handleCopyLink = async () =>
    {
        try
        {
            await navigator.clipboard.writeText(shareUrl);
            setShowCopyConfirmation(true);
            setTimeout(() => setShowCopyConfirmation(false), 2000);
        } catch (err)
        {
            console.error('Failed to copy:', err);
        }
    };

    const handleShare = (url: string) =>
    {
        window.open(url, '_blank', 'width=600,height=400');
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="h-5 w-5" />
                </button>

                <h3 className="text-xl font-semibold mb-4">Share Project</h3>

                <div className="space-y-4">
                    {/* Social Share Buttons */}
                    <div className="grid grid-cols-3 gap-3">
                        {shareButtons.map((button) => (
                            <button
                                key={button.name}
                                onClick={() => handleShare(button.url)}
                                className={`${button.color} text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200`}
                            >
                                <button.icon className="h-5 w-5" />
                                <span className="text-sm">{button.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Copy Link Section */}
                    <div className="mt-4">
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <input
                                type="text"
                                value={shareUrl}
                                readOnly
                                className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
                            />
                            <button
                                onClick={handleCopyLink}
                                className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                            >
                                {showCopyConfirmation ? (
                                    <>
                                        <CheckCircle className="h-4 w-4" />
                                        <span className="text-sm">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Link className="h-4 w-4" />
                                        <span className="text-sm">Copy</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};