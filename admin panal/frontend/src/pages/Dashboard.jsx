import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { articlesService } from '../services/articles.service';
import { useAuth } from '../context/AuthContext';
import {
  DocumentTextIcon,
  DocumentPlusIcon,
  ChartBarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalArticles: 0,
    recentArticles: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      const articles = await articlesService.getAll();
      setStats({
        totalArticles: articles.length,
        recentArticles: articles.slice(0, 3)
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl shadow-lg p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-primary-100">
            Here's what's happening with your content today
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100">
              <DocumentTextIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Articles</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalArticles}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <ChartBarIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Published</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalArticles}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Drafts</p>
              <p className="text-2xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow group">
          <Link to="/articles/new" className="flex items-center">
            <div className="p-3 rounded-full bg-white bg-opacity-20 group-hover:bg-opacity-30 transition-colors">
              <DocumentPlusIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-primary-100">Quick Action</p>
              <p className="text-lg font-semibold text-white">Create New Article</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Articles */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Recent Articles</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {stats.recentArticles.map((article) => (
            <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {article.content}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Link
                    to={`/articles/${article.id}/edit`}
                    className="text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-500">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {new Date(article.createdAt).toLocaleDateString()}
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 px-6 py-4">
          <Link
            to="/articles"
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            View all articles →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 