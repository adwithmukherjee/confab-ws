import { CircularProgress } from "@material-ui/core";

const Loading = () => {
  return (
    <div
      className="landing-container-1"
      style={{
        position: "absolute",
      }}
    >
      <CircularProgress size={100} />
    </div>
  );
};

export default Loading;
