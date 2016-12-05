import React from 'react';
import $ from 'jquery';
import AddForm from './AddForm';
import TaskList from './TaskList';

class Main extends React.Component {

    constructor() {
        super();
        this.state = {
             showModal: false,
             tasks: [
                        {id: 0, name: "Default1", priority: "HIGH"},
                        {id: 1, name: "Default2", priority: "LOW"},
                        {id: 2, name: "Default3", priority: "DEFAULT"}
                    ]
        };

        this.updateTasks = this.updateTasks.bind(this);
        this.onDeleteTask = this.onDeleteTask.bind(this);
        this.onAddTask = this.onAddTask.bind(this);
    }

    componentDidMount() {
         this.updateTasks();
    }

    updateTasks() {
        $.get("/tasks", (data) => {
             this.setState({tasks: data})
        });
    }

    onAddTask(name, priority) {
        $.ajax({
                type: "POST",
                url: "/tasks/add",
                data: {name: name, priority: priority},
                success: () => this.updateTasks(),
                error: () => this.updateTasks()
        });
    }

    onDeleteTask(id) {
         $.post("/tasks/delete/" + id, null, () => this.updateTasks());
    }

  render() {
    return (
      <div>
        <h2> My tasks </h2>
        <AddForm onAddTask={this.onAddTask} />

        <TaskList tasks={this.state.tasks} onDelete={this.onDeleteTask} />

      </div>
    );
  }
}

export default Main;