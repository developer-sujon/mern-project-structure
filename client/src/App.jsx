import cogoToast from "cogo-toast";

function App() {
  return (
    <div className="App">
      {cogoToast.info("This is an info message", {
        position: "top-center",
        heading: "Information",
      })}
    </div>
  );
}

export default App;
