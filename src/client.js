const {createQuicSocket} = require("net");

const socket = createQuicSocket({endpoint: {port: 3304}});

(async ()=>{
    const client = await socket.connect({
        address: "localhost",
	    port: 3303,
	    alpn: "test",
        servername: "quic-test"
    });

    client.on("secure", console.log);
    console.log(client.authenticated);

    client.on("session", async (session) => {

        const bi = await session.openStream();
        bi.write('hi');
        bi.end('from client');

        session.on("stream", (stream) => {
            console.log('new stream!')
            stream.on("data", console.log);
            stream.on("end", console.log);
        })
    });
})();