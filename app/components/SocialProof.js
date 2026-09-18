'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Shield, 
  Star, 
  GitFork, 
  GitCommit, 
  GitPullRequest,
  TrendingUp,
  Users,
  Calendar,
  GitBranch,
  AlertCircle
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Icon mapping for GitHub activity
const iconMap = {
  GitCommit: GitCommit,
  GitPullRequest: GitPullRequest,
  GitFork: GitFork,
  Star: Star,
  GitBranch: GitBranch,
  AlertCircle: AlertCircle
};

const stats = [
  {
    id: 'github',
    name: 'GitHub',
    icon: Github,
    color: 'from-gray-900 to-gray-800',
    metrics: [
      { label: 'Repositories', value: '50+' },
      { label: 'Contributions', value: '1.2k+' },
      { label: 'Stars Received', value: '100+' }
    ],
    link: 'https://github.com/lf32'
  },
  {
    id: 'hackerone',
    name: 'HackerOne',
    icon: Shield,
    color: 'from-green-600 to-green-700',
    metrics: [
      { label: 'Valid Reports', value: '20+' },
      { label: 'Programs', value: '15+' },
      { label: 'Impact', value: 'High' }
    ],
    link: 'https://hackerone.com/lf32?type=user'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'from-blue-600 to-blue-700',
    metrics: [
      { label: 'Connections', value: '500+' },
      { label: 'Endorsements', value: '50+' },
      { label: 'Recommendations', value: '10+' }
    ],
    link: 'https://linkedin.com/in/lf32'
  }
];

const recentActivity = [
  {
    type: 'commit',
    icon: GitCommit,
    color: 'text-green-500',
    text: 'Updated portfolio with new projects',
    time: '2 hours ago'
  },
  {
    type: 'star',
    icon: Star,
    color: 'text-yellow-500',
    text: 'Received a star on react-portfolio',
    time: '5 hours ago'
  },
  {
    type: 'fork',
    icon: GitFork,
    color: 'text-purple-500',
    text: 'Project forked by 3 developers',
    time: '1 day ago'
  },
  {
    type: 'pr',
    icon: GitPullRequest,
    color: 'text-blue-500',
    text: 'Merged PR in nextjs-starter',
    time: '2 days ago'
  }
];

const StatCard = ({ stat, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <a
        href={stat.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${stat.color} p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}>
          {/* Card Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-xl">{stat.name}</h3>
            </div>
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <TrendingUp className="w-5 h-5 text-white/80" />
            </motion.div>
          </div>

          {/* Metrics */}
          <div className="space-y-4">
            {stat.metrics.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                className="flex items-center justify-between"
              >
                <span className="text-white/80">{metric.label}</span>
                <span className="text-white font-semibold">{metric.value}</span>
              </motion.div>
            ))}
          </div>

          {/* Hover Effect */}
          <motion.div
            className="absolute inset-0 bg-white/5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </a>
    </motion.div>
  );
};

const ActivityCard = ({ activity, index }) => {
  const Icon = iconMap[activity.icon];
  const timeAgo = formatDistanceToNow(new Date(activity.time), { addSuffix: true });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex items-center space-x-4 p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-100 hover:bg-white/80 transition-all duration-300"
    >
      <div className={`w-10 h-10 rounded-full ${activity.color} bg-opacity-10 flex items-center justify-center`}>
        <Icon className={`w-5 h-5 ${activity.color}`} />
      </div>
      <div className="flex-1">
        <p className="text-gray-800 font-medium">{activity.text}</p>
        <p className="text-sm text-gray-500">{timeAgo}</p>
      </div>
    </motion.div>
  );
};

export default function SocialProof() {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/github');
        if (!response.ok) throw new Error('Failed to fetch GitHub data');
        const data = await response.json();
        setGithubData(data);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-20 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading social proof data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-20 flex items-center justify-center">
        <div className="text-red-500">Error loading social proof data. Please try again later.</div>
      </div>
    );
  }

  const stats = [
    {
      id: 'github',
      name: 'GitHub',
      icon: Github,
      color: 'from-gray-900 to-gray-800',
      metrics: [
        { label: 'Repositories', value: githubData?.user.public_repos || 0 },
        { label: 'Stars Received', value: githubData?.stats.totalStars || 0 },
        { label: 'Total Forks', value: githubData?.stats.totalForks || 0 }
      ],
      link: 'https://github.com/lf32'
    },
    {
      id: 'contributions',
      name: 'Contributions',
      icon: GitCommit,
      color: 'from-green-600 to-green-700',
      metrics: [
        { label: 'Commits', value: githubData?.contributions.commits || 0 },
        { label: 'Pull Requests', value: githubData?.contributions.prs || 0 },
        { label: 'Issues', value: githubData?.contributions.issues || 0 }
      ],
      link: 'https://github.com/lf32'
    },
    {
      id: 'community',
      name: 'Community',
      icon: Users,
      color: 'from-blue-600 to-blue-700',
      metrics: [
        { label: 'Followers', value: githubData?.user.followers || 0 },
        { label: 'Following', value: githubData?.user.following || 0 },
        { label: 'Forks Created', value: githubData?.contributions.forks || 0 }
      ],
      link: 'https://github.com/lf32'
    }
  ];

  return (
    <div className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Social Proof_</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track my contributions, achievements, and community engagement across various platforms
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>

        {/* Recent Activity */}
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Recent Activity</h3>
            <div className="flex items-center space-x-2 text-gray-500">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">Live Updates</span>
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {githubData?.recentActivity.map((activity, index) => (
                <ActivityCard
                  key={`${activity.type}-${activity.time}`}
                  activity={{
                    ...activity,
                    color: activity.type === 'commit' ? 'text-green-500' :
                           activity.type === 'pr' ? 'text-blue-500' :
                           activity.type === 'fork' ? 'text-purple-500' :
                           'text-yellow-500'
                  }}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Community Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-blue-500" />
                <h4 className="text-lg font-semibold text-gray-800">Community Impact</h4>
              </div>
              <p className="text-gray-600">
                Active contributor with {githubData?.user.followers || 0} followers and {githubData?.stats.totalStars || 0} stars received
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100"
            >
              <div className="flex items-center space-x-3 mb-4">
                <GitPullRequest className="w-6 h-6 text-green-500" />
                <h4 className="text-lg font-semibold text-gray-800">Open Source</h4>
              </div>
              <p className="text-gray-600">
                {githubData?.contributions.prs || 0} pull requests and {githubData?.contributions.issues || 0} issues contributed
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100"
            >
              <div className="flex items-center space-x-3 mb-4">
                <GitCommit className="w-6 h-6 text-purple-500" />
                <h4 className="text-lg font-semibold text-gray-800">Development</h4>
              </div>
              <p className="text-gray-600">
                {githubData?.contributions.commits || 0} commits across {githubData?.user.public_repos || 0} repositories
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 