app.use("/api/auth", require("./routes/auth"));
app.use("/api/restaurants", require("./routes/restaurant"));
app.use("/api/drivers", require("./routes/driver"));
app.use("/api/orders", require("./routes/order"));
