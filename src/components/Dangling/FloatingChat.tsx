import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Minimize2, Send, User, Bot, Loader } from 'lucide-react';
import { GPT } from '../../config/config';

interface Message
{
    id: string;
    type: 'user' | 'bot';
    content: string;
    timestamp: Date;
}

interface FloatingChatProps
{
    brandColor?: string;
    position?: 'bottom-right' | 'bottom-left';
    companyName?: string;
    greeting?: string;
    placeholder?: string;
}

const FloatingChat: React.FC<FloatingChatProps> = ({
    brandColor = '#10B981',
    position = 'bottom-right',
    companyName = 'GTF Support',
    greeting = 'Hello! How can we help you today?',
    placeholder = 'Type your message here...'
}) =>
{
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'bot',
            content: greeting,
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() =>
    {
        scrollToBottom();
    }, [messages, isOpen]);

    const scrollToBottom = () =>
    {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };


    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: inputValue.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue('');
        setIsTyping(true);

        try
        {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GPT}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: inputValue.trim() }]
                })
            });

            if (!response.ok)
            {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            // Check for the existence of data.choices and data.choices[0].message.content
            if (data.choices && data.choices[0] && data.choices[0].message.content)
            {
                const botMessage = data.choices[0].message.content;

                const botResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    type: 'bot',
                    content: botMessage,
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, botResponse]);
            } else
            {
                throw new Error("No content in response from GPT");
            }
        } catch (error)
        {
            console.error("Error fetching GPT response:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'bot',
                content: "I'm sorry, there was an error processing your message.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally
        {
            setIsTyping(false);
        }
    };



    const handleKeyPress = (e: React.KeyboardEvent) =>
    {
        if (e.key === 'Enter' && !e.shiftKey)
        {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const toggleChat = () =>
    {
        setIsOpen(!isOpen);
        setIsMinimized(false);
        setTimeout(() =>
        {
            inputRef.current?.focus();
        }, 100);
    };

    const positionClasses = position === 'bottom-right'
        ? 'right-6 sm:right-8'
        : 'left-6 sm:left-8';

    return (
        <>
            {/* Floating Button with bounce animation */}
            <button
                onClick={toggleChat}
                style={{ backgroundColor: brandColor }}
                className={`fixed z-50 bottom-6 sm:bottom-8 ${positionClasses} w-14 h-14 rounded-full drop-shadow-lg flex justify-center 
        items-center text-white hover:scale-110 hover:drop-shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-offset-white focus:ring-green-500 animate-bounce-slow`}
                aria-label="Open chat"
            >
                {isOpen ? (
                    <X className="w-6 h-6 animate-in fade-in" />
                ) : (
                    <MessageCircle className="w-6 h-6 animate-in fade-in" />
                )}
            </button>

            {/* Chat Window with improved positioning */}
            {isOpen && (
                <div
                    className={`fixed z-50 ${positionClasses} bottom-24 sm:bottom-28 w-[90vw] sm:w-[400px] 
          bg-white rounded-2xl shadow-2xl transform transition-all duration-300 
          ${isMinimized ? 'h-[60px]' : 'max-h-[80vh] h-[480px]'}`}
                    ref={chatContainerRef}
                    style={{
                        maxHeight: 'calc(100vh - 120px)',
                        bottom: 'calc(4rem + 56px)'
                    }}
                >
                    {/* Header */}
                    <div
                        style={{ backgroundColor: brandColor }}
                        className="flex items-center justify-between p-4 rounded-t-2xl text-white"
                    >
                        <div className="flex items-center space-x-2">
                            <Bot className="w-6 h-6" />
                            <span className="font-semibold">{companyName}</span>
                        </div>
                        <button
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="p-1 hover:bg-white/20 rounded-full border border-purple-600 transition-colors"
                            aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
                        >
                            <Minimize2 className="w-5 h-5 text-green-600 hover:text-white" />
                        </button>
                    </div>

                    {!isMinimized && (
                        <>
                            {/* Messages Container with dynamic height */}
                            <div className="flex-1 p-4 overflow-y-auto bg-gray-50" style={{ height: 'calc(100% - 120px)' }}>
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex items-start space-x-2 mb-4 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                                            }`}
                                    >
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center 
                      ${message.type === 'user' ? 'bg-green-100' : 'bg-gray-100'}`}
                                        >
                                            {message.type === 'user' ? (
                                                <User className="w-5 h-5 text-green-600" />
                                            ) : (
                                                <Bot className="w-5 h-5 text-gray-600" />
                                            )}
                                        </div>
                                        <div
                                            className={`max-w-[75%] rounded-2xl px-4 py-2 ${message.type === 'user'
                                                ? 'bg-green-500 text-white'
                                                : 'bg-white shadow-sm'
                                                }`}
                                        >
                                            {message.content}
                                            <div
                                                className={`text-xs mt-1 ${message.type === 'user' ? 'text-green-100' : 'text-gray-400'
                                                    }`}
                                            >
                                                {message.timestamp.toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex items-center space-x-2">
                                        <Bot className="w-8 h-8 p-2 bg-gray-100 rounded-full" />
                                        <div className="bg-white rounded-full px-4 py-2 shadow-sm">
                                            <Loader className="w-4 h-4 animate-spin text-gray-400" />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Form */}
                            <form onSubmit={handleSubmit} className="p-4 bg-white rounded-b-2xl border-t">
                                <div className="relative">
                                    <textarea
                                        ref={inputRef}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder={placeholder}
                                        className="w-full pl-4 pr-12 py-3 bg-gray-50 rounded-xl resize-none focus:outline-none 
                    focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                                        rows={1}
                                        style={{ maxHeight: '120px' }}
                                    />
                                    <button
                                        type="submit"
                                        disabled={!inputValue.trim()}
                                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full 
                    transition-all duration-200 ${inputValue.trim()
                                                ? 'text-green-500 hover:bg-green-50'
                                                : 'text-gray-300'
                                            }`}
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default FloatingChat;