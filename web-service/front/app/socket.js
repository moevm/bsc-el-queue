import io from "socket.io-client";

export const getSocketio = () => io('http://server-test.com');
