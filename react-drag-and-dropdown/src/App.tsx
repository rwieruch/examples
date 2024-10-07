import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const INITIAL_LIST = [
  {
    id: "1",
    firstName: "Robin",
    lastName: "Wieruch",
  },
  {
    id: "2",
    firstName: "Aiden",
    lastName: "Kettel",
  },
  {
    id: "3",
    firstName: "Jannet",
    lastName: "Layn",
  },
];

const Item = ({ index, item, dragItemStyle = {}, children }) => (
  <Draggable index={index} draggableId={item.id}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        style={{
          // default item style
          padding: "8px 16px",
          // default drag style
          ...provided.draggableProps.style,
          // customized drag style
          ...(snapshot.isDragging ? dragItemStyle : {}),
        }}
      >
        {children(item, provided.dragHandleProps)}
      </div>
    )}
  </Draggable>
);

const List = ({ list, onDragEnd, dragListStyle = {}, ...props }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            ...(snapshot.isDraggingOver ? dragListStyle : {}),
          }}
        >
          {list.map((item, index) => (
            <Item key={item.id} index={index} item={item} {...props} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const App = () => {
  const [list, setList] = useState(INITIAL_LIST);

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;

    setList(reorder(list, source.index, destination.index));
  };

  return (
    <List
      list={list}
      onDragEnd={handleDragEnd}
      dragItemStyle={{
        background: "pink",
        borderRadius: "16px",
      }}
      dragListStyle={{
        background: "lightblue",
        borderRadius: "16px",
      }}
    >
      {(item, dragHandleProps) => (
        <>
          {item.firstName}&nbsp;
          {item.lastName}&nbsp;
          <span {...dragHandleProps}>#</span>
        </>
      )}
    </List>
  );
};

export default App;
