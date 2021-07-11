import "bootstrap/dist/css/bootstrap.css";

import "./App.css";
import TaskList from "./components/TaskList";

function App() {
    return ( <
        div style = {
            { backgroundColor: "gray" }
        }
        className = "App" >
        <
        TaskList / >
        <
        /div>
    );
}

export default App;