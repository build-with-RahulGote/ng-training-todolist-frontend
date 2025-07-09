
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
}
export default new TaskService();