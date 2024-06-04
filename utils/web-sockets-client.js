var WebSocketClient = {
  socket: null,

  // Establish a WebSocket connection
  connect: function(url, protocols, callback, errorCallback) {
      this.socket = new WebSocket(url, protocols);
      var self = this; // Reference to maintain context

      this.socket.onopen = function(event) {
          console.log("WebSocket onopen event");
          if (callback) callback(event);
      };
      this.socket.onmessage = function(event) {
          console.log("WebSocket onmessage event");
          if (callback) callback(event.data);
      };
      this.socket.onerror = function(event) {
          console.log("WebSocket onerror event");
          if (errorCallback) errorCallback(event);
      };
      this.socket.onclose = function(event) {
          console.log("WebSocket onclose event");
          if (errorCallback) errorCallback(event);
      };
  },

  // Send a message over the WebSocket connection
  send: function(data) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        console.log("Sending message: " + data);
          this.socket.send(data);
      } else {
          console.error("WebSocket connection is not open");
      }
  },

  // Close the WebSocket connection
  close: function() {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        console.log("Closing WebSocket connection");
        this.socket.close();
      }
  },

  // Check if WebSocket connection is open
  check: function() {
      return this.socket && this.socket.readyState === WebSocket.OPEN;
  }
};