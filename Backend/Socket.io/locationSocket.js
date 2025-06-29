module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("📡 Driver connected:", socket.id);

    socket.on("driverLocationUpdate", ({ driverId, coords }) => {
      console.log(`Driver ${driverId} moved to`, coords);
      // Broadcast to customer listening for this driver
      io.emit(`locationUpdate:${driverId}`, coords);
    });

    socket.on("disconnect", () => {
      console.log("🚫 Driver disconnected:", socket.id);
    });
  });
};
