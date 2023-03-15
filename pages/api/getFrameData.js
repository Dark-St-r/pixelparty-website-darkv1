import { StorageManager } from "../../bc/js/localstorage";
import { getAnonAccount } from "../../utils/blockchain";
const axios = require("axios").default;


import { utils } from "near-api-js";

const loadFrames = async (account, start, end) => {
  const result = await account.viewFunction("pixelparty.chloe.testnet", "load_frames", { start, end });
  return result;
};

export default async (req, res) => {
  const metadata = [];
  const data = [];

  const account = await getAnonAccount();
  const frames = await Promise.all(Array(10).fill().map(async (_, i) => {
    const start = i * 60;
    const end = start + 60;
    return await loadFrames(account, start, end);
  }));
  let i = 0;
  frames.forEach(element => {
    element.metadata.forEach(m => {
      metadata.push(m);
    });

    element.data.forEach(d => {
      try {

        let check = JSON.parse(StorageManager.decompressB64(d));

        if (check.length != 400) {
          throw "wrong pixel size";
        }
        check.forEach((element) => {
          if (element > 236) {
            throw "color undefined";
          }
          if (element < 0) {
            throw "color undefined";
          }
        });
        data.push(check);
      } catch (e) {
        console.log(e);
        data.push(JSON.parse(StorageManager.decompressB64("WzIzNCzfBN8E3wTfBN8E3wTfBN8E1AQxNjDJBN8s3wTOTN9U3wTWTN9U30zeBN9EzUzcVMwc30zRNNBY1GjfUNkE2CDfUN9Q31DfUN9Q31D/AUDXVNxQ2EjYVN9M/wD4/wCY3wTfTN8E31TfTN8E2VTfLN8E3wTfBN8E3wTJBF0=")));
      }
    });

  });


  res.statusCode = 200;
  res.send({ metadata, framedata: data });
};
