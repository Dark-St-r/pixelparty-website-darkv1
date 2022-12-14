import axios from 'axios';
import { BN } from 'bn.js';

const nearApi = require('near-api-js');

const rpcNode = "https://rpc.mainnet.near.org";
export async function callContract(contract, method, params) {
    try {
        const account = await GetAccount();

        return await account.functionCall(
            contract,
            method,
            params,
            new BN('200000000000000'),
            0);
    } catch (e) {
        console.log(e);
        return "";
    }
}


export async function GetAccount() {
    try {
        let private_key = process.env.N_KEY;
        private_key = private_key.replace('"', '');
        const account_id = process.env.N_ACCOUNT;
        const keyPair = nearApi.utils.KeyPair.fromString(private_key);
        const keyStore = new nearApi.keyStores.InMemoryKeyStore();
        keyStore.setKey("default", account_id, keyPair);

        const near = await nearApi.connect({
            networkId: "default",
            deps: { keyStore },
            masterAccount: account_id,
            nodeUrl: rpcNode
        });

        return await near.account(account_id);
    } catch (e) {
        console.log(e);
        return "";
    }
}


export async function viewFunction(recipient, method, params) {
    try {
        const nearRpc = new nearApi.providers.JsonRpcProvider(rpcNode);

        const account = new nearApi.Account({ provider: nearRpc });
        return await account.viewFunction(
            recipient,
            method,
            params
        );
    } catch (e) {
        console.log(e);
        throw "error";
    }
}