module.exports = {
  dev: {
    app: {
      port: process.env.PORT || 9001
    },
    db: {
      address: "bolt://localhost",
      user: "neo4j",
      password: process.env.PASSWORD
    }
  }
}
