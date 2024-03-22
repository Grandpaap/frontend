import Button from "@mui/material/Button";

const WelcomePage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        margin: "0",
        padding: "0",
      }}
    >
      {/* Buttons */}
      <div
        style={{
          flex: "3",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          marginTop: "20px",
        }}
      >
        {/* Adjusted marginTop here */}
        <Button
          variant="outlined"
          fullWidth
          style={{ height: "80%", fontSize: "40px" }}
          href="/group"
        >
          Group
        </Button>
        <Button
          variant="outlined"
          fullWidth
          style={{ height: "80%", fontSize: "40px" }}
          href="/message"
        >
          Mail
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;
