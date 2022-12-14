import BN from 'bn.js';
import { connect, Contract, keyStores, WalletConnection, utils } from 'near-api-js'

export class NearUtils {
    static nearConfig = null;
    // Initialize contract & set global variables

    static pixContract = null;
    static walletConnection = null;
    static accountId = "";
    static initDone = false;
    static userFrames = [];
    static framesOnSale = [];
    static NETWORK = process.env.NEAR_NETWORK || 'mainnet'
    static DEFAULT_FUNC_CALL_GAS = new BN('50000000000000');
    static HEAVY_FUNC_CALL_GAS = new BN('200000000000000');
    static CROSS_FUNC_CALL_GAS = new BN('200000000000000');

    static initVars() {
        if (NearUtils.NETWORK == 'mainnet') {
            NearUtils.nearConfig = {

                networkId: 'mainnet',
                nodeUrl: 'https://rpc.mainnet.near.org',
                contractName: 'pixelparty.near',
                walletUrl: 'https://wallet.near.org',
                helperUrl: 'https://helper.mainnet.near.org',
                explorerUrl: 'https://explorer.mainnet.near.org',
            };

        } else {
            NearUtils.nearConfig = {

                networkId: 'default',
                nodeUrl: 'https://rpc.testnet.near.org',
                contractName: 'p500.testnet',
                walletUrl: 'https://wallet.testnet.near.org',
                helperUrl: 'https://helper.testnet.near.org',
            };
        }
    }

    static async initContract(setSignedIn, setYourFrames) {
        if (NearUtils.initDone) {
            return;
        }
        NearUtils.initDone = true;
        NearUtils.initVars();
        // Initialize connection to the NEAR testnet
        const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, NearUtils.nearConfig));

        // Initializing Wallet based Account. It can work with NEAR testnet wallet that
        // is hosted at https://wallet.testnet.near.org
        let walletCon = new WalletConnection(near);
        NearUtils.walletConnection = walletCon;

        // Getting the Account ID. If still unauthorized, it's just empty string
        NearUtils.accountId = walletCon.getAccountId();
        //console.log(NearUtils.accountId);
        // Initializing our contract APIs by contract name and configuration
        NearUtils.pixContract = await new Contract(NearUtils.walletConnection.account(), NearUtils.nearConfig.contractName, {
            // View methods are read only. They don't modify the state, but usually return some value.
            viewMethods: ['getHistory'],
            // Change methods can modify the state. But you don't receive the returned value when called.
            changeMethods: ['editFrame', 'buyFrame', 'offerFrame', 'cancelOffer', 'changeMessage', 'changeCoauthor', 'editFrameimage'],
        });

        if (walletCon.isSignedIn()) {

            const pxb = await (await near.account()).viewFunction("pixeltoken.near", "custom_balance_of", { account_id: walletCon.getAccountId() });
            setSignedIn({ logged: true, pixeltoken: pxb.pixeltoken, egg_common: pxb.egg_common, egg_rare: pxb.egg_rare, egg_epic: pxb.egg_epic, egg_legendary: pxb.egg_legendary });
        }
    }

    static logout() {
        NearUtils.walletConnection.signOut()
        // reload page
        window.location.replace(window.location.origin + window.location.pathname)
    }

    static login() {
        NearUtils.walletConnection.requestSignIn(NearUtils.nearConfig.contractName, "Near Pixelparty");
    }

    static async getHistory() {
        const resp = await NearUtils.walletConnection.account().viewFunction("pixelparty.near", "getHistory");
        return resp;
    }

    static buyFrame(frameId, nearAmount) {
        const amount = utils.format.parseNearAmount(nearAmount.toString());
        NearUtils.walletConnection.account().functionCall(NearUtils.nearConfig.contractName, 'buyFrame', { frameId: frameId }, NearUtils.CROSS_FUNC_CALL_GAS, amount);
    }

    static async offerFrame(frameId, nearAmount) {
        nearAmount = Number(nearAmount) + 1;
        //const amount = utils.format.parseNearAmount(nearAmount.toString());
        await NearUtils.walletConnection.account().functionCall(NearUtils.nearConfig.contractName, 'offerFrame', { frameId: frameId, price: nearAmount }, NearUtils.DEFAULT_FUNC_CALL_GAS);
    }

    static async cancelOffer(frameId) {
        await NearUtils.walletConnection.account().functionCall(NearUtils.nearConfig.contractName, 'cancelOffer', { frameId: frameId }, NearUtils.DEFAULT_FUNC_CALL_GAS);
    }

    static async changeMessage(frameId) {
        await NearUtils.walletConnection.account().functionCall(NearUtils.nearConfig.contractName, 'changeMessage', { frameId: frameId }, NearUtils.DEFAULT_FUNC_CALL_GAS);
    }

    static async changeCoauthor(frameId) {
        await NearUtils.walletConnection.account().functionCall(NearUtils.nearConfig.contractName, 'changeCoauthor', { frameId: frameId }, NearUtils.DEFAULT_FUNC_CALL_GAS);
    }

    static async getFrameDataView() {

        const resp = await NearUtils.walletConnection.account().viewFunction("pixelparty.near", "load_frames", { start: 0, end: 50 });
        console.log(resp);
        return resp;
    }
}