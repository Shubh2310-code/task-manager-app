import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [overdue, setOverdue] = useState([]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks/assigned');
      setTasks(res.data);
      const now = new Date();
      setOverdue(res.data.filter(task => task.dueDate && new Date(task.dueDate) < now && task.status !== 'completed'));
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <div>Please login</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>My Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.title} - {task.status}</li>
        ))}
      </ul>
      <h2>Overdue Tasks</h2>
      <ul>
        {overdue.map(task => (
          <li key={task._id}>{task.title} - Due: {new Date(task.dueDate).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;