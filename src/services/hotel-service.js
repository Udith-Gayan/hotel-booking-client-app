import ContractService from './contract-service';


// const xrpl = require('xrpl');
// const { XrplApi } = require('./xrpl-helpers/xrpl-api');
// const { XrplAccount } = require('./xrpl-helpers/xrpl-account');

const fundWalletAddress = process.env.REACT_APP_HOTEL_FUNDING_SEED_ACCOUNT_ADDRESS;
const fundWalletSecret = process.env.REACT_APP_HOTEL_FUNDING_SEED_ACCOUNT_SECRET;
const contractWalletAddress = process.env.REACT_APP_CONTRACT_WALLET_ADDRESS;

const xrpl = window.xrpl;

export default class HotelService {

    static instance = HotelService.instance || new HotelService();

    #walletServer = 'wss://hooks-testnet-v2.xrpl-labs.com';
    // #walletServer = 'wss://xls20-sandbox.rippletest.net:51233';

    #xrplApi = null;
    userWallet = {
        address: null,
        secret: null,
        balance: null,
        publicKey: null,
        privateKey: null
    }
    #registrationURI = 'URIRegistration';

    #xrplClient = null;
    contractService = ContractService.instance;
    #hotelId = 0;

    constructor() {
        // this.#xrplApi = new XrplApi(this.#walletServer);
        this.#xrplClient = new xrpl.Client(this.#walletServer);
    }

    /**
     * Fund  thje seed wallet
     * @param {secret} accounts 
     */
    async fundSeedWallet(accounts = []) {
        console.log("Start funding");
        try {
            await this.#xrplClient.connect();


            for (const sc of accounts) {
                const _wallet = xrpl.Wallet.fromSeed(sc);
                console.log(_wallet)
                const prepared = await this.#xrplClient.autofill({
                    "TransactionType": "Payment",
                    "Account": _wallet.address,
                    "Amount": xrpl.xrpToDrops("9750"),
                    "Destination": fundWalletAddress
                });

                const signed = _wallet.sign(prepared);
                const tx = await this.#xrplClient.submitAndWait(signed.tx_blob);
                console.log("Transaction result:", tx.result.meta.TransactionResult)

            };


        } catch (error) {
            console.log(error);
            throw (error)

        } finally {
            await this.#xrplClient.disconnect();
        }

        console.log("Funding finished.");
    }

    /**
     * Return {walletAddress, walletSecret}
     */
    async createNewUserWallet() {
        if (this.userWallet.address == null || this.userWallet.secret == null) {
            try {
                // await this.#xrplApi.connect();
                await this.#xrplClient.connect();

                const new_wallet = xrpl.Wallet.generate();
                await this.#getFunded(new_wallet.address, 30);
                this.userWallet.balance = (await this.#xrplClient.getXrpBalance(new_wallet.address));
                this.userWallet.address = new_wallet.address;
                this.userWallet.secret = new_wallet.seed;
                this.userWallet.publicKey = new_wallet.publicKey;
                this.userWallet.privateKey = new_wallet.privateKey;
                console.log(new_wallet);
            } catch (error) {
                console.log(`Error in account creation: ${error}`);
                throw (`Error in account creation: ${error}`);
            } finally {
                this.#xrplClient.disconnect();
            }
        }
        return { walletAddress: this.userWallet.address, walletSecret: this.userWallet.secret };
    }


    async #getFunded(toAccountAddress, xrpAmount, fromAccountSecret = fundWalletSecret) {
        const _wallet = xrpl.Wallet.fromSeed(fromAccountSecret);
        const prepared = await this.#xrplClient.autofill({
            "TransactionType": "Payment",
            "Account": fundWalletAddress,
            "Amount": xrpl.xrpToDrops(xrpAmount.toString()),
            "Destination": toAccountAddress
        });

        const signed = _wallet.sign(prepared);
        const tx = await this.#xrplClient.submitAndWait(signed.tx_blob);
        console.log("Transaction result:", tx.result.meta.TransactionResult)
    }

    /**
     * Set Account from the seed entered when logging
     */
    async setUserWallet(seed, isHotel = false) {
        try {
            await this.#xrplClient.connect();


            const the_wallet = xrpl.Wallet.fromSeed(seed);
            this.userWallet.balance = (await this.#xrplClient.getXrpBalance(the_wallet.address));
            this.userWallet.address = the_wallet.address;
            this.userWallet.secret = the_wallet.seed;
            this.userWallet.publicKey = the_wallet.publicKey;
            this.userWallet.privateKey = the_wallet.privateKey;

            if (isHotel) {
                const msg = {
                    type: 'getHotels',
                    filters: {
                        HotelWalletAddress: this.userWallet.address
                    }
                }
                const result = await this.contractService.submitInputToContract(msg);
                if (result.hotels.length > 0) {
                    this.#hotelId = result.hotels[0].Id;
                }
            }
        } catch (error) {
            console.log(`Error in fetching account: ${error}`);
            throw (`Error in fetching account: ${error}`);
        } finally {
            this.#xrplClient.disconnect();
        }
    }

    /**
     * 
     * @param {hotelName: <>, location: <>, email: <>} hotelObj 
     * 
     * @returns  { "Hotel Registration Successful."}
     */
    async registerHotel(hotelObj) {
        const messageType = "hotelRegistration";
        const messageCommand = "hotelRegRequest";

        const submitObj = {
            type: messageType,
            command: messageCommand,
            data: {
                HotelWalletAddress: this.userWallet.address,
                Name: hotelObj.hotelName,
                Address: hotelObj.location,
                Email: hotelObj.email
            }
        }

        let result;
        try {
            result = await this.contractService.submitInputToContract(submitObj);
            // result: { {"rowId":4,"offerId":"266BF70C1E820CCD8597B99B1A31E682E7E883D4C0C2385CE71A3405C180DF79"} }
            this.#hotelId = result.rowId;
            result = await this.#acceptHotelRegistrationOffer(result);
        } catch (error) {
            throw (error)
        }

        return result;

    }

    async #acceptHotelRegistrationOffer(regObj) {
        const messageType = "hotelRegistration";
        const messageCommand = "hotelRegConfirm";
        let result;
        try {

            // Connect to xrpl to accept the offer
            await this.#xrplClient.connect();

            // const transactionBlob = {
            //     TransactionType: 'NFTokenAcceptOffer',
            //     Account: this.userWallet.address,
            //     NFTokenSellOffer: regObj.offerId,
            //     Memos: []
            // };

            const prepared = await this.#xrplClient.autofill(
                {
                    TransactionType: 'NFTokenAcceptOffer',
                    Account: this.userWallet.address,
                    NFTokenSellOffer: regObj.offerId,
                    Memos: []
                }
            );


            const wallet = xrpl.Wallet.fromSeed(this.userWallet.secret)
            const signed = wallet.sign(prepared);
            const tx = await this.#xrplClient.submitAndWait(signed.tx_blob);

            if (tx.result.meta.TransactionResult !== "tesSUCCESS") {
                throw ('Hotel Registration offer not accepted successfully.');
            }


            const submitObj = {
                type: messageType,
                command: messageCommand,
                data: {
                    hotelWalletAddress: this.userWallet.address,
                    rowId: regObj.rowId
                }
            }
            result = await this.contractService.submitInputToContract(submitObj);

        } catch (error) {
            throw (error);
        } finally {
            this.#xrplClient.disconnect();
        }

        return result;
        // result : "Hotel Registration Successful."
    }

    /**
     * Create a room by minting a token. InURI field, hotel NFTID is there
     * roomObj: {roomName: <>}
     * @Returns {rowId}
     */
    async createARoom(roomObj) {

        let result;
        try {
            await this.#xrplClient.connect();

            const _wallet = xrpl.Wallet.fromSeed(this.userWallet.secret);

            // Prepare minting URI
            const rNfts = await this.#getNfts(this.userWallet.address, this.#registrationURI, contractWalletAddress)
            let regNft;
            if (rNfts && rNfts.length > 0) {
                regNft = rNfts[0];
            }
            const regNftId = regNft.NFTokenID;
            const uniqueSuffix = new Date().getTime().toString();
            const new_uri = regNftId + uniqueSuffix;

            // Mint a new token for the room
            const prepared = await this.#xrplClient.autofill({
                "TransactionType": "NFTokenMint",
                "Account": this.userWallet.address,
                "NFTokenTaxon": 0,
                // "Amount": xrpl.xrpToDrops(xrpAmount.toString()),
                "URI": xrpl.convertStringToHex(new_uri),
                "Flags": 1,
                "Fee": "5"
            });

            const signed = _wallet.sign(prepared);
            const tx = await this.#xrplClient.submitAndWait(signed.tx_blob);
            console.log("Transaction result:", tx.result.meta.TransactionResult);

            // Get the token Id of the minted token
            let accNfts = await this.#getNfts(this.userWallet.address, new_uri, this.userWallet.address)
            const newTokenId = accNfts[0].NFTokenID;

            
            const messageType = "createRoom"
            const submitObj = {
                type: messageType,
                data: {
                    name: roomObj.roomName,
                    roomNftId: newTokenId,
                    hotelWalletAddress: this.userWallet.address
                }
            }
            result = await this.contractService.submitInputToContract(submitObj)


        } catch (error) {
            await this.#xrplClient.disconnect();
            throw (error);
        } finally {
            await this.#xrplClient.disconnect();
        }
        return result;
    }

    async #getNfts(walletAddress, uri = null, issuer = null) {
        let nftsRes = await this.#xrplClient.request({
            method: "account_nfts",
            account: walletAddress
        });
        console.log(nftsRes);

        if (uri != null) {
            nftsRes = nftsRes.result.account_nfts.filter(t => xrpl.convertHexToString(t.URI) == uri);
        }

        if (issuer != null) {
            nftsRes = nftsRes.result.account_nfts.filter(t => t.Issuer == issuer);
        }

        return nftsRes.result.account_nfts;
    }

    /**
     * 
     * @returns  { rooms: [ {nftId, roomName, id }, {...}]}
     */

    async getRoomsByHotel() {
        const messageType = 'getRoomsByHotel';
        let result;

        try {

            const submitObj = {
                type: messageType,
                data: {
                    hotelId: this.#hotelId
                }
            }

            result = await this.contractService.submitInputToContract(submitObj);


        } catch (error) {
            throw (error);
        }

        return result;
    }

    /**
     * 
     * @param {roomId, fromDate, toDate} bookObj 
     * @returns  {rowId}
     */
    async makeABooking(bookObj) {
        const messageType = "makeBooking";
        const submitObj = {
            type: messageType,
            data: {
                roomId: bookObj.roomId,
                fromDate: bookObj.fromDate,
                toDate: bookObj.toDate
            }
        }

        let result;
        try {
            result = await this.contractService.submitInputToContract(submitObj);
        } catch (error) {
            throw (error);
        }

        return result;
    }

    /**
     * 
     * @returns { bookings: [{  bookingId,
                                roomId,
                                hotelId,
                                customer,
                                fromDate,
                                toDate,
                                roomName,
                                hotelName,
                                hotelLocation,
                                email            }, { }, ...] }
     */
    async getMyBookings() {
        const messageType = "getAllBookingsByUser";
        const submitObj = {
            type: messageType
        }

        let result;
        try {
            result = await this.contractService.submitInputToContract(submitObj);
        } catch (error) {
            throw (error);
        }

        return result;
    }

    async getBookingsByRoom(roomId) {
        const messageType = 'getAllBookings'
        const submitObj = {
            type: messageType,
            filters: {
                roomId: roomId
            }
        };

        let result;
        try {
            result = await this.contractService.submitInputToContract(submitObj);
        } catch (error) {
            throw (error);
        }

        return result;
    }




}