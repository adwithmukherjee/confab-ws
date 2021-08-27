import loadGoogleScript from "./loadGoogleScript";
import keys from "../keys";

const loadGapiClient = (window) => {
  window.onGoogleScriptLoad = () => {
    const _gapi = window.gapi;
    console.log(_gapi);

    _gapi.load("client", () => {
      console.log("loaded client");

      _gapi.client.init(keys.GAPI_CLIENT);

      // _gapi.client.load("auth2", () => console.log("loaded auth"));
    });
  };
  loadGoogleScript();
};

export default loadGapiClient;
