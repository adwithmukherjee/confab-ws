import loadGoogleScript from "./loadGoogleScript";
import keys from "../keys";

const loadGapiClient = (window) => {
  // window.onGoogleScriptLoad = () => {
  const _gapi = window.gapi;

  _gapi.load("client:auth2", () => {
    console.log("loaded client");

    console.log("init");
    _gapi.client.init(keys.GAPI_CLIENT);

    //_gapi.client.load("auth2", "v2");

    //console.log(window.gapi.auth2.getAuthInstance());
  });
  // };
  // loadGoogleScript();
};

export default loadGapiClient;
