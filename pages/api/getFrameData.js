import { StorageManager } from "../../bc/js/localstorage";
import { getAnonAccount } from "../../utils/blockchain";
const axios = require("axios").default;

const loadFrames = async (account, start, end) => {
  const resp = await account.viewFunction({
    contractId: "pixelparty.chloe.testnet",
    methodName: "load_frames",
    args: { start, end },
    gas: "300000000000000", // Increase the gas limit
  });
  return resp;
};

const getFramesInChunks = async (account, start_frame, end_frame, chunk_size) => {
  let all_frames = [];
  for (let i = start_frame; i < end_frame; i += chunk_size) {
    let chunk_start = i;
    let chunk_end = Math.min(i + chunk_size, end_frame);
    const frames = await loadFrames(account, chunk_start, chunk_end);
    all_frames = all_frames.concat(frames);
  }
  return all_frames;
};

export default async (req, res) => {
  const metadata = [];
  const data = [];

  const account = await getAnonAccount();
  const start_frame = 0;
  const end_frame = 600;
  const chunk_size = 60; // Adjust the chunk size as needed
  const frames = await getFramesInChunks(account, start_frame, end_frame, chunk_size);

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
