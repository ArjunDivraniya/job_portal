import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const data = {
    applicationsTrends: [
        { date: 'Jan', applications: 30 },
        { date: 'Feb', applications: 45 },
        { date: 'Mar', applications: 25 },
        { date: 'Apr', applications: 60 }
    ],
    skillRelevance: [
        { name: 'JavaScript', value: 40 },
        { name: 'React', value: 30 },
        { name: 'Node.js', value: 20 },
        { name: 'MongoDB', value: 10 }
    ],
    industryDemand: [
        { industry: 'IT', openings: 120 },
        { industry: 'Finance', openings: 80 },
        { industry: 'Healthcare', openings: 60 }
    ],
    successRate: [
        { metric: 'Applications', value: 50 },
        { metric: 'Interview Calls', value: 30 },
        { metric: 'Offers', value: 20 }
    ]
};

const COLORS = ['#4CAF50', '#FFC107', '#2196F3', '#F44336'];

const AnalyticsDashboard = () => {
    return (
        <div className="flex justify-center items-center min-h-screen  p-5">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl">
                <h1 className="text-2xl font-bold text-center mb-6">📊 Analytics Dashboard</h1>
                <div className="grid grid-cols-2 gap-6">

                    {/* Job Application Trends */}
                    <div className="p-4 border rounded-md">
                        <h2 className="font-bold text-lg mb-2">📈 Job Application Trends</h2>
                        <LineChart width={300} height={200} data={data.applicationsTrends}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="applications" stroke="#4CAF50" />
                        </LineChart>
                    </div>

                    {/* Skill Relevance */}
                    <div className="p-4 border rounded-md">
                        <h2 className="font-bold text-lg mb-2">🎯 Skill Relevance</h2>
                        <PieChart width={300} height={200}>
                            <Pie data={data.skillRelevance} dataKey="value" nameKey="name" outerRadius={80} label>
                                {data.skillRelevance.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>

                    {/* Industry Demand */}
                    <div className="p-4 border rounded-md">
                        <h2 className="font-bold text-lg mb-2">🏢 Industry Demand</h2>
                        <BarChart width={300} height={200} data={data.industryDemand}>
                            <XAxis dataKey="industry" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="openings" fill="#673AB7" />
                        </BarChart>
                    </div>

                    {/* Success Rate */}
                    <div className="p-4 border rounded-md">
                        <h2 className="font-bold text-lg mb-2">✅ Success Rate</h2>
                        <RadarChart outerRadius={90} width={300} height={200} data={data.successRate}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="metric" />
                            <PolarRadiusAxis />
                            <Radar name="Success Rate" dataKey="value" stroke="#2196F3" fill="#2196F3" fillOpacity={0.6} />
                        </RadarChart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;