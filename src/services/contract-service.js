const HotPocket = require('hotpocket-js-client');


// async function clientApp() {

//     const userKeyPair = await HotPocket.generateKeys();

//     const pkhex = Buffer.from(userKeyPair.publicKey).toString('hex');
//     console.log('My public key is: ' + pkhex);

//     const client = await HotPocket.createClient(['wss://localhost:8081'], userKeyPair);

//     // Establish HotPocket connection.
//     if (!await client.connect()) {
//         console.log('Connection failed.');
//         return;
//     }

//     console.log('HotPocket Connected.');
// }

// clientApp();

export default class ContractService {
    // Provide singleton instance
    static instance = ContractService.instance || new ContractService();

    userKeyPair = null;
    client = null;
    isConnectionSucceeded = false;
    server = `wss://${process.env.CONTRACT_NODE_IP}:${process.env.CONTRACT_NODE_PORT}`

    async init() {
        if (this.userKeyPair == null)
            this.userKeyPair = await HotPocket.generateKeys();
        if (this.client == null) {
            this.client = await HotPocket.createClient([server], userKeyPair);
        }

        // This will get fired if HP server disconnects unexpectedly.
        this.client.on(HotPocket.events.disconnect, () => {
            console.log('Disconnected');
            isConnectionSucceeded = false;
        })

        // This will get fired as servers connects/disconnects.
        this.client.on(HotPocket.events.connectionChange, (server, action) => {
            console.log(server + " " + action);
        })

        // This will get fired when contract sends outputs.
        this.client.on(HotPocket.events.contractOutput, (r) => {
            r.outputs.forEach(o => {
                const outputLog = o.length <= 512 ? o : `[Big output (${o.length / 1024} KB)]`;
                console.log(`Output (ledger:${r.ledgerSeqNo})>> ${outputLog}`);
            });
        });

        this.client.on(HotPocket.events.healthEvent, (ev) => {
            console.log(ev);
        });

        if (!isConnectionSucceeded) {
            if (!await this.client.connect()) {
                console.log('Connection failed.');
                return false;
            }
            console.log('HotPocket Connected.');
            isConnectionSucceeded = true;
        }


        return true;

    }


    async requestHotelRegistration(hotelDataObject) {

        await this.#submitInputToContract(hotelDataObject);
    }


    #submitInputToContract(inp) {
        return new Promise((resolve, reject) => {

            this.client.submitContractInput(inp).then(input => {
                // console.log(input.hash);
                input.submissionStatus.then(s => {
                    if (s.status != "accepted"){
                        console.log(s.reason);
                        resolve(`Ledger_Rejection: ${s.reason}`);
                    }

                    resolve(`Ledger_accepted.`)
                });
            });
        });  
    }

    helloWorld() {
        console.log("Hello World... \(^_^)/ !!")
    }
}