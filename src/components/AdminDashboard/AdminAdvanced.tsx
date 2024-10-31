import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import
{
    BarChart3, Users, FolderKanban, Bell, Settings, ChevronLeft,
    ChevronRight, Search, Wallet, Circle, PlusCircle, Filter,
    ArrowUpRight, ArrowDownRight, MenuIcon,
    Check,
    AlertCircle,
    Edit,
    Trash2,
    UserPlus,
    X
} from 'lucide-react';
import
{
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, LineChart, Line, Legend
} from 'recharts';
import
{
    Card, CardContent, CardHeader, CardTitle, CardDescription
} from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import
{
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../ui/select';
import { Avatar } from '../ui/avatar';
import { Switch } from '../ui/switch';
import SettingsPanel from './SettingsPanel';

const mockUsers = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "Project Manager",
        status: "active",
        joinDate: "2024-01-15",
        avatar: "/api/placeholder/32/32"
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob@example.com",
        role: "Developer",
        status: "inactive",
        joinDate: "2024-02-20",
        avatar: "/api/placeholder/32/32"
    }
];

const mockFunding = [
    {
        id: 1,
        type: "Donation",
        amount: 5000,
        currency: "USD",
        status: "completed",
        date: "2024-10-29",
        donor: "John Doe"
    },
    {
        id: 2,
        type: "Grant",
        amount: 10000,
        currency: "USD",
        status: "pending",
        date: "2024-10-28",
        donor: "Tech Foundation"
    }
];

const mockNotifications = [
    {
        id: 1,
        title: "New Project Submission",
        message: "Wildlife Sanctuary Project has been submitted for review",
        type: "info",
        date: "2024-10-29",
        read: false
    },
    {
        id: 2,
        title: "Funding Goal Reached",
        message: "Clean Water Initiative has reached its funding goal",
        type: "success",
        date: "2024-10-28",
        read: true
    }
];

const mockSettings = [
    {
        id: 1,
        category: "Notifications",
        settings: [
            { id: "email_notif", label: "Email Notifications", enabled: true },
            { id: "push_notif", label: "Push Notifications", enabled: false }
        ]
    },
    {
        id: 2,
        category: "Security",
        settings: [
            { id: "two_factor", label: "Two-Factor Authentication", enabled: true },
            { id: "session_timeout", label: "Auto Session Timeout", enabled: true }
        ]
    }
];


const mockProjects = [
    {
        id: 1,
        title: "Wildlife Sanctuary Project",
        category: "Environment",
        raised: 37500,
        goal: 50000,
        status: "active",
        lastUpdate: "2024-10-25"
    },
    {
        id: 2,
        title: "Clean Water Initiative",
        category: "Health",
        raised: 25000,
        goal: 30000,
        status: "pending",
        lastUpdate: "2024-10-28"
    }
];

const mockTransactions = [
    {
        id: 1,
        project: "Wildlife Sanctuary Project",
        amount: 500,
        wallet: "bitcoin",
        date: "2024-10-29",
        status: "completed"
    },
    {
        id: 2,
        project: "Clean Water Initiative",
        amount: 1000,
        wallet: "near",
        date: "2024-10-28",
        status: "pending"
    }
];

const mockChartData = [
    { name: 'Jan', funding: 4000, projects: 24 },
    { name: 'Feb', funding: 3000, projects: 13 },
    { name: 'Mar', funding: 2000, projects: 18 },
    { name: 'Apr', funding: 2780, projects: 39 },
    { name: 'May', funding: 1890, projects: 48 },
    { name: 'Jun', funding: 2390, projects: 38 },
];


const AdminAdvanced = () =>
{
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const sidebarItems = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'projects', label: 'Projects', icon: FolderKanban },
        { id: 'funding', label: 'Funding', icon: Wallet },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
    const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

    const renderOverview = () => (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <FolderKanban className="h-6 w-6 text-blue-600" />
                            </div>
                            <Badge variant="outline" className="bg-blue-50">
                                +12.5%
                            </Badge>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold">245</h3>
                            <p className="text-sm text-gray-500">Total Projects</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Wallet className="h-6 w-6 text-green-600" />
                            </div>
                            <Badge variant="outline" className="bg-green-50">
                                +8.2%
                            </Badge>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold">$1.2M</h3>
                            <p className="text-sm text-gray-500">Total Funded</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Users className="h-6 w-6 text-purple-600" />
                            </div>
                            <Badge variant="outline" className="bg-purple-50">
                                +15.8%
                            </Badge>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold">12.5K</h3>
                            <p className="text-sm text-gray-500">Total Users</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <ArrowUpRight className="h-6 w-6 text-orange-600" />
                            </div>
                            <Badge variant="outline" className="bg-orange-50">
                                +5.3%
                            </Badge>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold">89.2%</h3>
                            <p className="text-sm text-gray-500">Success Rate</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Funding Overview</CardTitle>
                        <CardDescription>Monthly funding and project trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={mockChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis yAxisId="left" />
                                    <YAxis yAxisId="right" orientation="right" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar yAxisId="left" dataKey="funding" fill="#3b82f6" name="Funding ($)" />
                                    <Bar yAxisId="right" dataKey="projects" fill="#10b981" name="Projects" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Success Metrics</CardTitle>
                        <CardDescription>Project completion and funding rates</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={mockChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="funding" stroke="#3b82f6" name="Funding Rate" />
                                    <Line type="monotone" dataKey="projects" stroke="#10b981" name="Success Rate" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest projects and transactions</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {mockTransactions.map(transaction => (
                            <div key={transaction.id} className="flex items-center justify-between border-b pb-4">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-2 rounded-full ${transaction.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                                        }`}>
                                        <Wallet className={`h-4 w-4 ${transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                                            }`} />
                                    </div>
                                    <div>
                                        <p className="font-medium">{transaction.project}</p>
                                        <p className="text-sm text-gray-500">{transaction.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">${transaction.amount}</p>
                                    <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                                        {transaction.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderProjects = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Input
                        placeholder="Search projects..."
                        className="w-64"
                        type="search"
                    />
                    <Select defaultValue="all">
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Project
                </Button>
            </div>

            <div className="grid gap-4">
                {mockProjects.map(project => (
                    <Card key={project.id}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium">{project.title}</h3>
                                    <p className="text-sm text-gray-500">{project.category}</p>
                                </div>
                                <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                                    {project.status}
                                </Badge>
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Progress</span>
                                    <span>{Math.round((project.raised / project.goal) * 100)}%</span>
                                </div>
                                <Progress value={(project.raised / project.goal) * 100} className="h-2" />
                            </div>
                            <div className="mt-4 flex justify-between text-sm text-gray-500">
                                <span>Last updated: {project.lastUpdate}</span>
                                <span>${project.raised.toLocaleString()} of ${project.goal.toLocaleString()}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );

    const renderFooter = () => (
        <footer className="bg-white border-t py-6 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="font-semibold mb-2">About</h3>
                        <p className="text-sm text-gray-600">Admin Advanced for managing projects and funding.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Quick Links</h3>
                        <ul className="space-y-1">
                            {sidebarItems.map(item => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => setSelectedTab(item.id)}
                                        className="text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Contact</h3>
                        <p className="text-sm text-gray-600">
                            Email: support@example.com<br />
                            Phone: (555) 123-4567
                        </p>
                    </div>
                </div>
                <div className="mt-6 pt-6 border-t text-center text-sm text-gray-600">
                    © 2024 Your Company. All rights reserved.
                </div>
            </div>
        </footer>
    );

    const renderUsers = () => (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                        placeholder="Search users..."
                        className="w-full sm:w-64"
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Select defaultValue="all">
                        <SelectTrigger className="w-full sm:w-32">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>Manage system users and their roles</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {mockUsers.map(user => (
                            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <img src={user.avatar} alt={user.name} />
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                                        {user.status}
                                    </Badge>
                                    <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderFunding = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Wallet className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold">$157,000</h3>
                            <p className="text-sm text-gray-500">Total Funding</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <ArrowUpRight className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold">45</h3>
                            <p className="text-sm text-gray-500">Active Donations</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Users className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold">1,250</h3>
                            <p className="text-sm text-gray-500">Total Donors</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Overview of recent funding activities</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {mockFunding.map(fund => (
                            <div key={fund.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-2 rounded-full ${fund.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                                        <Wallet className={`h-4 w-4 ${fund.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`} />
                                    </div>
                                    <div>
                                        <p className="font-medium">{fund.type}</p>
                                        <p className="text-sm text-gray-500">From: {fund.donor}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">${fund.amount.toLocaleString()}</p>
                                    <Badge variant={fund.status === 'completed' ? 'default' : 'secondary'}>
                                        {fund.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderNotifications = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Notifications</h3>
                <Button variant="outline">Mark all as read</Button>
            </div>

            <div className="space-y-4">
                {mockNotifications.map(notification => (
                    <Card key={notification.id} className={notification.read ? 'opacity-75' : ''}>
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-4">
                                    <div className={`p-2 rounded-full mt-1 ${notification.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
                                        }`}>
                                        {notification.type === 'success' ? (
                                            <Check className="h-4 w-4 text-green-600" />
                                        ) : (
                                            <AlertCircle className="h-4 w-4 text-blue-600" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium">{notification.title}</p>
                                        <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                                        <p className="text-xs text-gray-400 mt-2">{notification.date}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );

   


    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between">
                <h1 className="font-bold text-xl">Admin Panel</h1>
                <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
                    <MenuIcon className="h-6 w-6" />
                </Button>
            </div>

            {/* Sidebar - Desktop */}
            <div
                className={`hidden lg:block absolute mt-4 top-0 left-0 h-screen bg-white border-r transition-all duration-300 z-30
          ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}
            >
                <div className="p-4 border-b flex items-center justify-between">
                    <h1 className={`font-bold text-xl ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
                        Admin Panel
                    </h1>
                    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                        {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>
                </div>
                <nav className="p-4">
                    {sidebarItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedTab(item.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                ${selectedTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <item.icon className="h-5 w-5" />
                            {!isSidebarCollapsed && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Sidebar - Mobile */}
            <div
                className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300
          ${isMobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleMobileSidebar}
            >
                <div
                    className={`fixed top-0 left-0 h-full w-64 bg-white transform transition-transform duration-300
            ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="p-4 border-b">
                        <h1 className="font-bold text-xl">Admin Panel</h1>
                    </div>
                    <nav className="p-4">
                        {sidebarItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() =>
                                {
                                    setSelectedTab(item.id);
                                    toggleMobileSidebar();
                                }}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                  ${selectedTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:ml-64 lg:pl-0">
                {/* Top Bar */}
                <div className="bg-white border-b sticky top-0 z-20">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-xl font-semibold capitalize">{selectedTab}</h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="icon">
                                <Bell className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Settings className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-4 md:p-6">
                    <div className="flex-1 p-4 md:p-6">
                        {selectedTab === 'overview' && renderOverview()}
                        {selectedTab === 'projects' && renderProjects()}
                        {selectedTab === 'funding' && renderFunding()}
                        {selectedTab === 'users' && renderUsers()}
                        {selectedTab === 'notifications' && renderNotifications()}
                        {selectedTab === 'settings' && <SettingsPanel />}
                    </div>
                </div>


            </div>
        </div>
    );
};

export default AdminAdvanced;