const mode: string = "dev";
const baseUrlServerJson: string =
  mode === "dev" ? "http://localhost:3000/" : "http://productionurl.com";

export default baseUrlServerJson;
