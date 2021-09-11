import isMobile from "react-device-detect";
import { Paper } from "@material-ui/core";
import QRCode from "qrcode.react";
import { useStyles } from "./Call";

interface QRCodeDisplayProps {
  channel: string;
}

const QRCodeDisplay = (props: QRCodeDisplayProps) => {
  const classes = useStyles();
  if (isMobile) {
    return <div />;
  } else {
    return (
      <div style={{ position: "fixed", bottom: 0, right: 0 }}>
        <div className={classes.qrCodeDisplayStyle}>
          <Paper elevation={3} className={classes.qrCodeStyle}>
            <QRCode
              style={{ width: "100%", height: "100%" }}
              value={window.location.href}
            />
          </Paper>
          <div
            style={{
              width: 120,
              textAlign: "center",
              fontSize: "10px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Scan to join this room on your phone!
          </div>
        </div>
      </div>
    );
  }
};

export default QRCodeDisplay;
