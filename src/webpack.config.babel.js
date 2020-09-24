import NpmAutoInstallWebpackPlugin from "npm-auto-install-webpack-plugin";
 
export default {
  plugins: [
    new UnusedFilesWebpackPlugin(options),
  ],
};