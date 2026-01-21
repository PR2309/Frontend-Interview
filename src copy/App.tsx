import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import BlogList from'./components/BlogList.tsx';
import BlogDetails from './components/BlogDetails.tsx'; 

function App() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <>
      <div className="body flex h-screen">
        {/* <aside className="sidebar w-1/3 border-r p-4 overflow-y-auto bg-white"> */}
        <aside className="flex-[1] border-r p-4 overflow-y-auto bg-white">
          <BlogList onSelect={setSelectedBlog}/>
        </aside>
        {/* <main className="mainBody w-2/3 p-6 overflow-y-auto bg-gray-50"> */}
        <main className="flex-[2] p-6 overflow-y-auto bg-gray-50">
          <BlogDetails blog={selectedBlog} />
        </main>
      </div>
    </>
  );
};

export default App;
