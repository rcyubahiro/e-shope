import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function ScrollButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Show scroll to top button when scrolled down 300px
      setShowScrollTop(scrollTop > 300);
      
      // Show scroll to bottom button when not at bottom
      setShowScrollBottom(scrollTop + clientHeight < scrollHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed right-6 bottom-6 flex flex-col gap-3 z-40">
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="bg-blue-900 hover:bg-blue-950 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-fade-in"
          title="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
      
      {showScrollBottom && (
        <button
          onClick={scrollToBottom}
          className="bg-blue-900 hover:bg-blue-950 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-fade-in"
          title="Scroll to bottom"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
