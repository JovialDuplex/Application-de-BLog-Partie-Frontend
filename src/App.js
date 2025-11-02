
import "bootstrap/dist/css/bootstrap.css";

import Form from "./components/form/form"
function App() {

  return (
      <div style={{background: "var(--bs-gray-800)"}} className="vw-100 vh-100 px-2 d-flex align-items-center flex-column justify-content-center">
          <h1> Traitement du formulaire </h1>
          <Form />
      </div>
  );
}

export default App;
