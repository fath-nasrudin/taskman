const Project = require('../models/project');
const taskController = require('./task.controller');

const projectController = {
  addProject(projectData) {
    const { title } = projectData;
    const newProject = Project.create({ title });
    return newProject;
  },
  getProjects(filter) {
    const projects = Project.find(filter);
    return projects;
  },
  // delete
  deleteProject(projectId) {
    const removedProject = Project.remove(projectId);

    // delete all related task
    taskController.deleteMany({ project: { id: projectId } });
    return removedProject;
  },
};

module.exports = projectController;
