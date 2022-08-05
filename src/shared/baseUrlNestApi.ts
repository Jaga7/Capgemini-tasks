const mode: string = "dev";
const baseUrlNestApi =
  mode === "dev"
    ? "http://nestapi-env.eba-9kgvuxij.eu-central-1.elasticbeanstalk.com"
    : "http://productionurl.com";

export default baseUrlNestApi;
