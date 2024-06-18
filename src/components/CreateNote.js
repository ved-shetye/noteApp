import { useState } from 'react';
import axios from 'axios';

const CreateNote = ({ fetchNotes }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = { title, content };
    await axios.post('http://localhost:5000/notes', newNote);
    setTitle('');
    setContent('');
    fetchNotes(); // Refresh notes list
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border rounded p-2 mb-2 w-full"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="border rounded p-2 mb-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white rounded p-2 w-full">
        Create Note
      </button>
    </form>
  );
};

export default CreateNote;
