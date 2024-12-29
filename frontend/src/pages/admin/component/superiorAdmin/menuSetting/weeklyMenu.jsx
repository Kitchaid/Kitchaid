import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { createWeeklyMenu,fetchWeeklyMenus} from '../../../../../hooks/admin/menuTemplate';


const WeeklyMenuPage = () => {
  const queryClient = useQueryClient();
  const [newMenu, setNewMenu] = useState({ weekOfYear: '', menu: {} });

  // Query to fetch all weekly menus
  // const { data: weeklyMenu, isLoading } = useQuery('weeklyMenu', fetchWeeklyMenu);
  const { data: weeklyMenus, isLoading } = useQuery('weeklyMenus', fetchWeeklyMenus);
console.log(weeklyMenus)
  // Mutation to create a new weekly menu
  const createMutation = useMutation(createWeeklyMenu, {
    onSuccess: () => {
      queryClient.invalidateQueries('weeklyMenu');  // Refetch weekly menus after creation
    },
  });

  // Mutation to delete a weekly menu
  // const deleteMutation = useMutation(deleteWeeklyMenu, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('weeklyMenu');  // Refetch weekly menus after deletion
  //   },
  // });

  // Handle form submission for creating a new weekly menu
  const handleCreateMenu = (e) => {
    e.preventDefault();
    createMutation.mutate(newMenu);
  };

  // Handle delete button click
  // const handleDeleteMenu = (id) => {
  //   deleteMutation.mutate(id);
  // };

  if (isLoading) return <div>Loading menus...</div>;

  return (
    <div>
      <h1>Weekly Menus</h1>

      {/* List all weekly menus */}
        {weeklyMenus.WeeklyMenu?.map((menu) => {
          console.log(menu)
          return<>
          <h3 key={menu._id}>
            Week {menu.templateName}
            {menu.group}
            {menu.menu?.monday}
            {/* <button onClick={() => handleDeleteMenu(menu._id)}>Delete</button> */}
          </h3></>
        })}

      {/* Form to create a new weekly menu */}
      <h2>Create New Weekly Menu</h2>
      <form onSubmit={handleCreateMenu}>
        <label>
          Week of the Year:
          <input
            type="number"
            value={newMenu.weekOfYear}
            onChange={(e) => setNewMenu({ ...newMenu, weekOfYear: e.target.value })}
          />
        </label>

        {/* For simplicity, we're only capturing the week number. */}
        {/* You can extend this form to include the full menu structure for each day of the week */}
        
        <button type="submit">Create Menu</button>
      </form>
    </div>
  );
};

export default WeeklyMenuPage;
