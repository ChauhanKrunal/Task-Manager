import React, { Component } from "react";
import Modal from "./Modal";
import axios from "axios";

class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewCompleted: false,
            todoList: [],
            modal: false,
            activeItem: {
                title: "",
                description: "",
                completed: false,
            },
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        axios
            .get("http://localhost:8000/api/todos/")
            .then((res) => this.setState({ todoList: res.data }))
            .catch((err) => console.log(err));
    };

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    handleSubmit = (item) => {
        this.toggle();
        if (item.id) {
            axios
                .put(`http://localhost:8000/api/todos/${item.id}/`, item)
                .then((res) => this.refreshList());
            return;
        }
        axios
            .post("http://localhost:8000/api/todos/", item)
            .then((res) => this.refreshList());

        alert("Create a task");
    };

    handleDelete = (item) => {
        axios
            .delete(`http://localhost:8000/api/todos/${item.id}/`)
            .then((res) => this.refreshList());
        alert("Delete task");
    };

    createItem = () => {
        const item = { title: "", description: "", completed: false };

        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    editItem = (item) => {
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    displayCompleted = (status) => {
        if (status) {
            return this.setState({ viewCompleted: true });
        }

        return this.setState({ viewCompleted: false });
    };

    renderTabList = () => {
        return ( <
            div className = "nav nav-tabs"
            style = {
                { paddingBottom: "inherit" }
            } >
            <
            span style = {
                {
                    backgroundColor: "greenyellow",
                    cursor: "pointer",
                    borderRadius: "14px",
                    marginRight: "14px",
                }
            }
            className = { this.state.viewCompleted ? "nav-link active" : "nav-link" }
            onClick = {
                () => this.displayCompleted(true)
            } >
            Complete <
            /span> <
            span style = {
                {
                    backgroundColor: "cyan",
                    cursor: "pointer",
                    borderRadius: "14px",
                }
            }
            className = { this.state.viewCompleted ? "nav-link" : "nav-link active" }
            onClick = {
                () => this.displayCompleted(false)
            } >
            Incomplete <
            /span> < /
            div >
        );
    };

    renderItems = () => {
        const { viewCompleted } = this.state;
        const newItems = this.state.todoList.filter(
            (item) => item.completed === viewCompleted
        );

        return newItems.map((item) => ( <
            li key = { item.id }
            className = "list-group-item d-flex justify-content-between align-items-center" >
            <
            span className = { `todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }` }
            title = { item.title } > { item.title } <
            /span> <
            span >
            <
            button className = "btn btn-secondary mr-2"
            onClick = {
                () => this.editItem(item)
            } >
            Edit <
            /button> <
            button className = "btn btn-danger"
            onClick = {
                () => this.handleDelete(item)
            } >
            Delete <
            /button> < /
            span > <
            /li>
        ));
    };

    render() {
        return ( <
            main className = "container" >
            <
            h1 className = "text-black text-uppercase text-center my-4"
            style = {
                {
                    fontFamily: "fantasy",
                    fontStyle: "italic",
                    color: "chocolate",
                }
            } >
            TASK MANAGER < /
            h1 > <
            div className = "row" >
            <
            div className = "col-md-6 col-sm-10 mx-auto p-0" >
            <
            div className = "card p-3" >
            <
            div className = "mb-4"
            style = {
                { marginRight: "auto" }
            } >
            <
            button className = "btn btn-warning align-items:left"
            style = {
                { backgroundColor: "lightcoral" }
            }
            onClick = { this.createItem } >
            Add task <
            /button> < /
            div > { this.renderTabList() } <
            ul className = "list-group list-group-flush" > { this.renderItems() } <
            /ul> < /
            div > <
            /div> < /
            div > {
                this.state.modal ? ( <
                    Modal activeItem = { this.state.activeItem }
                    toggle = { this.toggle }
                    onSave = { this.handleSubmit }
                    />
                ) : null
            } <
            /main>
        );
    }
}

export default TaskList;