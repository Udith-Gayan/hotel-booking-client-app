const nodeIp = process.env.REACT_APP_CONTRACT_NODE_IP;
const nodePort = process.env.REACT_APP_CONTRACT_NODE_PORT;
const HotPocket = window.HotPocket;

export default class ContractService {
    // Provide singleton instance
    static instance = ContractService.instance || new ContractService();

    userKeyPair = null;
    client = null;
    isConnectionSucceeded = false;
    server = `wss://${nodeIp}:${nodePort}`

    promiseMap = new Map();

    async init() {
        if (this.userKeyPair == null)
            console.log(1)
            this.userKeyPair = await HotPocket.generateKeys();
            console.log(2)
        if (this.client == null) {
            console.log(3)
            this.client = await HotPocket.createClient([this.server], this.userKeyPair);
            console.log(4)
        }

        // This will get fired if HP server disconnects unexpectedly.
        this.client.on(HotPocket.events.disconnect, () => {
            console.log('Disconnected');
            this.isConnectionSucceeded = false;
        })

        // This will get fired as servers connects/disconnects.
        this.client.on(HotPocket.events.connectionChange, (server, action) => {
            console.log(server + " " + action);
        })

        // This will get fired when contract sends outputs.
        this.client.on(HotPocket.events.contractOutput, (r) => {
            r.outputs.forEach(o => {
                // const outputLog = o.length <= 10000 ? o : `[Big output (${o.length / 1024} KB)]`;
                // console.log(`Output (ledger:${r.ledgerSeqNo})>> ${outputLog}`);
                console.log(o);

                const pId = o.promiseId;
                console.log(pId)
                if (o.error) {
                    this.promiseMap.get(pId).rejecter(o.error);
                } else {
                    this.promiseMap.get(pId).resolver(o.success);
                }

                this.promiseMap.delete(pId);
            });
        });

        this.client.on(HotPocket.events.healthEvent, (ev) => {
            console.log(ev);
        });

        if (!this.isConnectionSucceeded) {
            if (!await this.client.connect()) {
                console.log('Connection failed.');
                return false;
            }
            console.log('HotPocket Connected.');
            this.isConnectionSucceeded = true;
        }

        return true;
    }

    submitInputToContract(inp) {
        let resolver, rejecter;
        const promiseId = this.#getUniqueId();
        const inpString = JSON.stringify({ promiseId: promiseId, ...inp })

        this.client.submitContractInput(inpString).then(input => {
            // console.log(input.hash);
            input.submissionStatus.then(s => {
                if (s.status !== "accepted") {
                    console.log(`Ledger_Rejection: ${s.reason}`);
                    throw (`Ledger_Rejection: ${s.reason}`);
                }
            });
        });

        return new Promise((resolve, reject) => {
            resolver = resolve;
            rejecter = reject;
            this.promiseMap.set(promiseId, { resolver: resolver, rejecter: rejecter });
        });
    }

    #getUniqueId() {
        const typedArray = new Uint8Array(10);
        const randomValues = window.crypto.getRandomValues(typedArray);
        return randomValues.join('');
    }

    // #region Custom Domain calls

    async requestHotelRegistration(hotelDataObject) {
        return await this.submitInputToContract(hotelDataObject);     
    }

    async confirmHotelRegistration() {

    }

    // #endregion



}
