import BN from 'bn.js';
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupDefaultWallets } from "@near-wallet-selector/default-wallets";
import { providers, utils, Account } from "near-api-js";


export class NearUtils {

    // Initialize contract & set global variables
    static walletConnection = null;
    static accountId = "";
    static initDone = false;
    static userFrames = [];
    static framesOnSale = [];
    static NETWORK = process.env.NEAR_NETWORK || 'mainnet'
    static DEFAULT_FUNC_CALL_GAS = new BN('50000000000000');
    static HEAVY_FUNC_CALL_GAS = new BN('200000000000000');
    static CROSS_FUNC_CALL_GAS = new BN('200000000000000');
    static selectorInstance = null;
    static provider = null;

    static async initContract(setSignedIn, setYourFrames) {
        if (this.initDone) {
            return;
        }
        this.initDone = true;

        this.selectorInstance = await setupWalletSelector({
            network: "mainnet",
            modules: [
                ...(await setupDefaultWallets()),
                setupNearWallet(),
                setupMyNearWallet(),
                setupSender(),
                setupHereWallet(),

            ],
        });

        const { network } = this.selectorInstance.options;
        this.provider = new providers.JsonRpcProvider({ url: network.nodeUrl });


        if (this.selectorInstance.isSignedIn()) {
            this.walletConnection = await this.selectorInstance.wallet();
            this.accountId = (await this.walletConnection.getAccounts())[0].accountId;
            setSignedIn({ logged: true });
        }
    }

    static logout() {
        this.walletConnection.signOut()
        // reload page
        window.location.replace(window.location.origin + window.location.pathname)
    }

    static async getHistory() {
        return await this.viewCall('getHistory');
    }

    static buyFrame(frameId, nearAmount) {
        const amount = utils.format.parseNearAmount(nearAmount.toString());
        NearUtils.sendTransaction('buyFrame', { frameId: frameId }, amount);
    }

    static async offerFrame(frameId, nearAmount) {
        nearAmount = Number(nearAmount) + 1;
        await NearUtils.sendTransaction('offerFrame', { frameId: frameId, price: nearAmount });
    }

    static async cancelOffer(frameId) {
        await NearUtils.sendTransaction('cancelOffer', { frameId: frameId });
    }

    static async editFrameimage(frameId, compressedData) {
        await NearUtils.sendTransaction('editFrameimage', { frameId: frameId, frameData: compressedData });
    }

    static async editFrame(frameId, compressedData, message, coauthor) {
        await NearUtils.sendTransaction('editFrame', { frameId: frameId, frameData: compressedData, message: message || "", coauthor: coauthor || "" });
    }

    static async sendTransaction(method, args, deposit) {
        await NearUtils.walletConnection.signAndSendTransaction({
            actions: [
                {
                    type: "FunctionCall",
                    params: {
                        methodName: method,
                        args: args,
                        gas: NearUtils.CROSS_FUNC_CALL_GAS,
                        deposit: deposit,
                    },
                },
            ],
        });
    }

    static async viewCall(method, args) {

        const account = new Account({ provider: this.provider });
        return await account.viewFunction(
            "pixelparty.near",
            method,
            args
        );

    }

}