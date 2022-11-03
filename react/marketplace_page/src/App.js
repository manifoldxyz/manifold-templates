import './App.css';

function App() {
  return (
    <div className="App">
      <div
        data-widget="m-connect"
        data-delay-auth="true"
        data-network={process.env.REACT_APP_NETWORK}
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
      </div>
      <div
        data-widget="m-layout-complete-listing"
        data-id={process.env.REACT_APP_MARKETPLACE_LISTING_ID}
        data-network={process.env.REACT_APP_NETWORK}
      />
    </div>
  );
}

export default App;
