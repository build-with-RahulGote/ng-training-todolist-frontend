
import axios from "axios"

class TaskService{

    constructor()
    {
        this.Base_url="http://localhost:8080/api"
    }
    createTask(taskData)
    {
        return axios.post(`${this.Base_url}/task`,taskData);
    }

    getAllTasks() {
    return axios.get(`${this.Base_url}/tasks`);
  }

   updateTask(id, updatedTask) {
    return axios.put(`${this.Base_url}/task/${id}`, updatedTask);
  }

  deleteTask(id) {
    return axios.delete(`${this.Base_url}/task/${id}`);
  }

  searchTasks(keyword) {
  return axios.get(`${this.Base_url}/tasks/search?keyword=${encodeURIComponent(keyword)}`);
}

getPaginatedTasks(page, size) {
  return axios.get(`${this.Base_url}/tasks?page=${page}&size=${size}`);
}
}
export default new TaskService();