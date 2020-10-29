const {createQuicSocket} = require("net");
const fs = require("fs");

const cert = fs.readFileSync("./certs/cert.pem");
const key = fs.readFileSync("./certs/key.pem");

const socket = createQuicSocket({endpoint: {port: 3303}});

(async()=>{
    const socket = createQuicSocket({endpoint: {port: 3303}});
    await socket.listen({key, cert, alpn: "test"});
    socket.on("session", async (session) => {
        session.on("secure", console.log);

        session.on("stream", stream => {
            stream.end('hello world!')
            console.log('receive new stream')
        });

        const uniStream = await session.openStream({halfOpen: true});
        uniStream.write("Hello world");
        uniStream.end("from the server");
    });
    console.log("the sokcet is listening on port 3303");
})();