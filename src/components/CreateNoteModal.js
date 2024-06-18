import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const CreateNoteModal = ({ isOpen, onRequestClose, fetchNotes }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = { title, content };
    await axios.post('http://localhost:5000/notes', newNote);
    setTitle('');
    setContent('');
    onRequestClose(); // Close the modal
    fetchNotes(); // Refresh notes list
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Create Note" className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto my-10">
      <h2 className="text-xl mb-4">Create Note</h2>
      <form onSubmit={handleSubmit}>
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
    </Modal>
  );
};

export default CreateNoteModal;
