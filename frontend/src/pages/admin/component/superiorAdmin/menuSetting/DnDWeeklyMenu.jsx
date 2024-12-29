// import React, { usecolumns,useEffect, useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { getMenu, } from '../../../../../hooks/menu/menu';
// import { getDishById } from "../../../../../hooks/plan/dailyMealIngredients";
// import {
//   CreateMenu,
//   UpdateMenu,
//   getPublicDishImages,
//   CreateMenuTemplate,
//   CreateWeeklyMenu,
//   getMenuTemplate,
//   getMenuTemplates,
//   getWeeklyMenu,
//   getWeeklyMenus
// } from "../../../../../hooks/admin/superiorAdmin";
// import { useQuery } from "react-query";
// import { toast } from "react-toastify";



// const onDragEnd = (result, columns, setColumns) => {
//   // let updatedLists = [...columns.lists];
//   if (!result.destination) return;
//   const { source, destination } = result;

//   if (source.droppableId !== destination.droppableId) {
//     const sourceColumn = columns[source.droppableId];
//     const destColumn = columns[destination.droppableId];
//     const sourceItems = [...sourceColumn.items];
//     const destItems = [...destColumn.items];
//     const [removed] = sourceItems.splice(source.index, 1);
//     destItems.splice(destination.index, 0, removed);
//     setColumns({
//       ...columns,
//       [source.droppableId]: {
//         ...sourceColumn,
//         items: sourceItems
//       },
//       [destination.droppableId]: {
//         ...destColumn,
//         items: destItems
//       }
//     });
//   } 
//   else {
//     const column = columns[source.droppableId];
//     const copiedItems = [...column.items];
//     const [removed] = copiedItems.splice(source.index, 1);
//     copiedItems.splice(destination.index, 0, removed);
//     setColumns({
//       ...columns,
//       [source.droppableId]: {
//         ...column,
//         items: copiedItems
//       },
//     });
//   }
// };

// function DnDWeeklyMenu() {
//   const { data: menuTemplates, error, isLoading } = useQuery("getMenuTemplates", getMenuTemplates);
//   const { data: menu, error: menuError, isLoading: getmenu } = useQuery("getMenu", getMenu);
//   const menudata = menu?.data[0]?.menu;
//   const menuData = {
//     BaseMeny: {
//       name: "Base meny",
//       items: menudata
//     },
//     VeckoMeny: {
//       name: "Vecko meny",
//       items: []
//     },
//     // lists: [],
//   };
//   const [columns, setColumns] = useState(menuData);
// useEffect(()=>{
//   setColumns(menuData)
// },[menudata])
//   // const menuLength= columns?.VeckoMeny?.items
//   // useEffect(()=>{
//   //     if(menuLength.length > 7)
//   //              {
//   //               toast('too many')
//   //              columns?.VeckoMeny?.items.shift();
//   //               }

//   // },[menuLength,columns?.VeckoMeny?.items])

//   return (
//     <div>
//       <span className="text-light">Vecko meny</span>
//       <div
//         className="d-flex justify-content-center"
//       >
//         <DragDropContext
//           onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
//         >
//           {Object.entries(columns).map(([columnId, column], index) => {
//             return (
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center"
//                 }}
//                 key={columnId}
//               >
//                 <span className="text-light">{column?.name}</span>
//                 <div style={{ margin: 8 }}>
//                   <Droppable droppableId={columnId} key={columnId}>
//                     {(provided, snapshot) => {
//                       return (
//                         <div
//                           className='overflow'
//                           {...provided.droppableProps}
//                           ref={provided.innerRef}
//                           style={{
//                             background: snapshot.isDraggingOver
//                               ? "lightblue"
//                               : "lightgrey",
//                             padding: 4,
//                             width: 300,
//                             minHeight: 500
//                           }}
//                         >
//                           {column?.items?.map((item, index) => {
//                             return (
//                               <Draggable
//                                 key={item?._id}
//                                 draggableId={item?._id}
//                                 index={index}
//                               >
//                                 {(provided, snapshot) => {
//                                   return (
//                                     <div
//                                       ref={provided.innerRef}
//                                       {...provided.draggableProps}
//                                       {...provided.dragHandleProps}
//                                       style={{
//                                         userSelect: "none",
//                                         padding: 16,
//                                         margin: "0 0 8px 0",
//                                         minHeight: "50px",
//                                         backgroundColor: snapshot.isDragging
//                                           ? "#263B4A"
//                                           : "#456C86",
//                                         color: "white",
//                                         ...provided.draggableProps.style
//                                       }}
//                                     >
//                                       {item.dishName}
//                                     </div>
//                                   );
//                                 }}
//                               </Draggable>
//                             );
//                           })}
//                           {provided.placeholder}
//                         </div>
//                       );
//                     }}
//                   </Droppable>
//                 </div>
//               </div>
//             );
//           })}
//         </DragDropContext>
//       </div>
//     </div>
//   );
// }

// export default DnDWeeklyMenu;


import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  CreateWeeklyMenu,
  UpdateWeeklyMenu,
  // getMenuTemplate,
  getMenuTemplates,
  getWeeklyMenu,
  // getWeeklyMenus
} from "../../../../../hooks/admin/superiorAdmin";
import { getMenuForAdmin } from '../../../../../hooks/menu/menu'

const WeeklyMenuDnD = () => {
  const { data: weeklyMenuData, isLoading, isError } = useQuery('weeklyMenu', getWeeklyMenu);
  const [templateName, setTemplateName] = useState({
    _id: '63793934371bc9e6500f982d'
  });
  // const [templateId, setTemplateId] = useState('63793934371bc9e6500f982d');
  const { data: dishes } = useQuery(['getMenu', templateName], () => getMenuForAdmin(templateName));
  const { data: menuTemplates } = useQuery("getMenuTemplates", getMenuTemplates);
  // const { data: menuTemplate } = useQuery(["getMenuTemplate", templateId], () => getMenuTemplate(templateId), { enabled: !!templateId });

  const [menu, setMenu] = useState(dishes?.data[0]?.menu);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading menu data</div>;


  const handleChange = (e) => {
    e.preventDefault()
    const templateName = e.target.value;
    if (!templateName) { return <></> }
    // const selectedIndex = e.target.selectedIndex;
    // const selectedOptionData = menuTemplates?.data?.templates[selectedIndex - 1];
    // setTemplateId(selectedOptionData._id);
    setTemplateName(templateName);
  }
  // Save updated weekly menu
  const [weeklyMenu, setWeeklyMenu] = useState(weeklyMenuData?.menu || {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: []
  });
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    // If moving within the same list (a day's lunch), reorder the items
    if (source.droppableId === destination.droppableId) {
      const items = Array.from(weeklyMenu[destination.droppableId]);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setWeeklyMenu((prev) => ({ ...prev, [destination.droppableId]: items }));
    } else {
      // Move item from menu to a specific day
      const startList = Array.from(
        source.droppableId === 'menu' ? dishes : weeklyMenu[source.droppableId]
      );
      const [movedItem] = startList.splice(source.index, 1);
      const endList = Array.from(
        destination.droppableId === 'menu' ? dishes : weeklyMenu[destination.droppableId]
      );
      endList.splice(destination.index, 0, movedItem);

      setWeeklyMenu((prev) => ({
        ...prev,
        [destination.droppableId]: endList,
      }));
    }
  };
  const saveMenu = () => {
    const updatedMenuData = { ...weeklyMenuData, menu: weeklyMenu  };
    UpdateWeeklyMenu.mutate(updatedMenuData);
  };

  return (
    <div>
      <h2>Weekly Menu</h2>
      <button onClick={saveMenu}>Save Changes</button>

      <DragDropContext onDragEnd={onDragEnd}>
        {/* Main Dish Menu */}
        <Droppable droppableId="menu" direction="horizontal">
          {(provided) => (
            <div className="menu-container" {...provided.droppableProps} ref={provided.innerRef}>
              <h3>Menu</h3>
              {dishes.map((dish, index) => (
                <Draggable key={dish._id} draggableId={dish._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="menu-item"
                    >
                      {dish.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Weekly Menu for each day */}
        {Object.keys(weeklyMenu).map((day) => (
          <Droppable droppableId={day} key={day}>
            {(provided) => (
              <div className="day-menu" {...provided.droppableProps} ref={provided.innerRef}>
                <h4>{day}</h4>
                {weeklyMenu[day].map((dish, index) => (
                  <Draggable key={dish._id} draggableId={dish._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="menu-item"
                      >
                        {dish.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default WeeklyMenuDnD;
