const STORAGE_KEY = 'admin_articles';

// Initialize with some sample articles if none exist
const initializeArticles = () => {
  const existingArticles = localStorage.getItem(STORAGE_KEY);
  if (!existingArticles) {
    const sampleArticles = [
      {
        id: '1',
        title: 'Getting Started with React',
        content: 'React is a popular JavaScript library for building user interfaces...',
        createdAt: new Date('2024-01-01').toISOString(),
        tags: ['react', 'javascript']
      },
      {
        id: '2',
        title: 'Mastering Tailwind CSS',
        content: 'Tailwind CSS is a utility-first CSS framework that can speed up your development...',
        createdAt: new Date('2024-01-02').toISOString(),
        tags: ['css', 'tailwind']
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleArticles));
    return sampleArticles;
  }
  return JSON.parse(existingArticles);
};

export const articlesService = {
  getAll: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return initializeArticles();
  },

  create: async (articleData) => {
    const articles = initializeArticles();
    const newArticle = {
      id: Date.now().toString(),
      ...articleData,
      createdAt: new Date().toISOString()
    };
    
    articles.push(newArticle);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    return newArticle;
  },

  delete: async (id) => {
    const articles = initializeArticles();
    const filteredArticles = articles.filter(article => article.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredArticles));
  },

  update: async (id, articleData) => {
    const articles = initializeArticles();
    const index = articles.findIndex(article => article.id === id);
    if (index === -1) throw new Error('Article not found');
    
    articles[index] = { ...articles[index], ...articleData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    return articles[index];
  }
}; 