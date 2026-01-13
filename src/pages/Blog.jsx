import { Calendar, User, ArrowRight, TrendingUp, Package, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips and Tricks for Smart Online Shopping",
      excerpt: "Discover expert strategies to make the most of your online shopping experience and save money while getting quality products.",
      author: "Navigant Credit Union",
      date: "Sept 24, 2023",
      category: "Shopping Tips",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "How to Spot Quality Products Online",
      excerpt: "Learn the essential indicators of product quality when shopping online, from reviews to product descriptions.",
      author: "Michael Chen",
      date: "January 5, 2026",
      category: "Buyer's Guide",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "The Future of E-Commerce in Africa",
      excerpt: "Explore emerging trends and technologies shaping the future of online shopping across the African continent.",
      author: "Amina Ndlovu",
      date: "January 2, 2026",
      category: "Industry Insights",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Protecting Your Data While Shopping Online",
      excerpt: "Essential security tips to keep your personal and financial information safe during online transactions.",
      author: "David Mugisha",
      date: "December 28, 2025",
      category: "Security",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop",
      readTime: "8 min read"
    },
    {
      id: 5,
      title: "Sustainable Shopping: Making Eco-Friendly Choices",
      excerpt: "How to incorporate sustainability into your online shopping habits and support environmentally responsible brands.",
      author: "Grace Uwase",
      date: "December 25, 2025",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop",
      readTime: "5 min read"
    },
    {
      id: 6,
      title: "Best Deals This Month: What to Buy Now",
      excerpt: "Our curated list of the hottest deals and must-have products available this month at unbeatable prices.",
      author: "John Kamau",
      date: "December 22, 2025",
      category: "Deals & Offers",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&auto=format&fit=crop",
      readTime: "4 min read"
    }
  ];

  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">E-Shop Blog</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Tips, insights, and news about online shopping, products, and e-commerce trends
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Post */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="h-64 md:h-auto">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="inline-block bg-blue-900 text-white px-3 py-1 rounded text-sm font-semibold mb-4 self-start">
                Featured Post
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{featuredPost.title}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" /> {featuredPost.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {featuredPost.date}
                </span>
                <span>{featuredPost.readTime}</span>
              </div>
              <a 
                href="https://navigantcu.org/10-tips-and-tricks-for-smart-shopping/#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-900 hover:bg-blue-950 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 self-start"
              >
                Read More <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button className="bg-blue-900 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-950 transition-colors">
            All Posts
          </button>
          <button className="bg-white text-gray-700 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors border border-gray-200">
            Shopping Tips
          </button>
          <button className="bg-white text-gray-700 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors border border-gray-200">
            Buyer's Guide
          </button>
          <button className="bg-white text-gray-700 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors border border-gray-200">
            Industry Insights
          </button>
          <button className="bg-white text-gray-700 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors border border-gray-200">
            Security
          </button>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {otherPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" /> {post.author}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </span>
                  <button className="text-blue-900 hover:text-blue-950 font-semibold text-sm flex items-center gap-1">
                    Read More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-blue-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated!</h2>
          <p className="text-xl text-gray-200 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to get the latest shopping tips, deals, and insights delivered to your inbox.
          </p>
          <form className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
