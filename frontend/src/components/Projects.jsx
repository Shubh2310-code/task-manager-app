import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/projects', { name, description });
      setName('');
      setDescription('');
      fetchProjects();
    } catch (err) {
      alert('Failed to create project');
    }
  };

  if (!user) return <div>Please login</div>;

  return (
    <div>
      <h1>Projects</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Project Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Create Project</button>
      </form>
      <ul>
        {projects.map(project => (
          <li key={project._id}>{project.name} - {project.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;