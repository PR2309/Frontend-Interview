import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlog } from '../apis/blogs';
import { Plus, X } from 'lucide-react';

const CreateBlogForm = ({ isDark }: { isDark: boolean }) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setTitle('');
      setDescription('');
      setContent('');
      setImageUrl('');
      setCategories([]);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBlog = {
      title,
      description,
      content,
      category: categories,
      date: new Date().toISOString(),
      coverImage: imageUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
    };

    mutation.mutate(newBlog);
  };

  return (
    <div className="flex flex-col h-full">
      <div className={`mb-5 pb-5 border-b transition-colors ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
        <h3 className={`text-2xl font-bold transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Publish New Article</h3>
        <p className={`text-sm mt-1 transition-colors ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Share your insights with the community</p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-2">
        <div>
          <label className={`block text-sm font-semibold mb-2 transition-colors ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Title</label>
          <input
            type="text"
            placeholder="Enter article title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'}`}
            required
          />
        </div>
        
        <div>
          <label className={`block text-sm font-semibold mb-2 transition-colors ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Description</label>
          <textarea
            placeholder="Brief summary of your article..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none h-16 ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'}`}
            required
          />
        </div>
        
        <div>
          <label className={`block text-sm font-semibold mb-2 transition-colors ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Cover Image URL <span className={`text-xs font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>(Optional)</span></label>
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'}`}
          />
          {imageUrl && (
            <div className="mt-2 text-xs flex gap-2 items-start">
              <div className={`px-2 py-1 rounded transition ${isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'}`}>✓ Image URL preview will show on blog card</div>
            </div>
          )}
        </div>
        
        <div>
          <label className={`block text-sm font-semibold mb-2 transition-colors ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Categories</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Add a category..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`flex-1 px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'}`}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (category) {
                    setCategories([...categories, category]);
                    setCategory('');
                  }
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (category) {
                  setCategories([...categories, category]);
                  setCategory('');
                }
              }}
              className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium text-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, idx) => (
                <span key={idx} className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full transition ${isDark ? 'bg-indigo-500/30 text-indigo-200' : 'bg-indigo-100 text-indigo-700'}`}>
                  {cat}
                  <button
                    type="button"
                    onClick={() => setCategories(categories.filter((_, i) => i !== idx))}
                    className="hover:opacity-75 transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <label className={`block text-sm font-semibold mb-2 transition-colors ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Content</label>
          <textarea
            placeholder="Write your full article content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none h-24 ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'}`}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm transition mt-4"
        >
          {mutation.isPending ? 'Publishing...' : 'Publish Article'}
        </button>
      </form>
    </div>
  );
};

export default CreateBlogForm;