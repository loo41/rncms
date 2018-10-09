module.exports = {
  apps : [{
      name: "rncms",
      script: "./app.js",
      watch: false,
      instance_var: "INSTANCE_ID",
      log_file: __dirname + "/log/log.log",
      out_file: __dirname + "/log/output.log",
      error_file: "/log/error.log"
   }]
}