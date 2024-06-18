import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import CreateNoteModal from './CreateNoteModal';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const fetchNotes = async () => {
    const response = await axios.get('http://localhost:5000/notes');
    setNotes(response.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setNotes(items);
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleEditSave = async () => {
    await axios.put(`http://localhost:5000/notes/${editingNote.id}`, {
      title: editTitle,
      content: editContent,
    });
    setEditingNote(null);
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/notes/${id}`);
    fetchNotes();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto">
      <button onClick={openModal} className="bg-blue-500 text-white rounded p-2 mb-4">
        Create Note
      </button>
      <CreateNoteModal isOpen={isModalOpen} onRequestClose={closeModal} fetchNotes={fetchNotes} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="notes">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {notes.map((note, index) => (
                <Draggable key={note.id} draggableId={note.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`relative bg-white shadow-md rounded-lg p-4 transition-all duration-300 ease-in-out transform ${
                        snapshot.isDragging ? 'scale-105' : ''
                      }`}
                      style={{ backgroundColor: getRandomColor() }}
                    >
                      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 hover:opacity-100">
                        <button onClick={() => handleEdit(note)} className="bg-yellow-500 text-white rounded p-1">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(note.id)} className="bg-red-500 text-white rounded p-1">
                          Delete
                        </button>
                      </div>
                      {editingNote && editingNote.id === note.id ? (
                        <div>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="border rounded p-2 mb-2 w-full"
                          />
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="border rounded p-2 mb-2 w-full"
                          />
                          <button onClick={handleEditSave} className="bg-blue-500 text-white rounded p-2 w-full">
                            Save
                          </button>
                        </div>
                      ) : (
                        <div>
                          <h2 className="font-bold text-lg">{note.title}</h2>
                          <p>{note.content}</p>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

const getRandomColor = () => {
  const colors = ['bg-red-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100', 'bg-pink-100'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default Notes;
