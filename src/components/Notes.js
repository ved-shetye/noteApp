import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

const Notes = () => {
  const [notes, setNotes] = useState([]);

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

  return (
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
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white shadow-md rounded-lg p-4"
                    style={{ backgroundColor: getRandomColor() }}
                  >
                    <h2 className="font-bold text-lg">{note.title}</h2>
                    <p>{note.content}</p>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const getRandomColor = () => {
  const colors = ['bg-red-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100', 'bg-pink-100'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default Notes;
