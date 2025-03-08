// ecosystem.config.cjs
module.exports = {
  apps: [{
    name: "dream-backend",
    script: "./src/server.js",
    node_args: "--experimental-json-modules",
    env: {
      NODE_ENV: "production"
      // You can add your other environment variables here directly if needed
    }
  }]
}
