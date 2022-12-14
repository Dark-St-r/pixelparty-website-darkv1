import { atom } from "recoil";
const axios = require("axios").default;

export const buyState = atom({
  key: "buyState", // unique ID (with respect to other atoms/selectors)
  default: { frameId: null, price: null, showModal: false }, // default value (aka initial value)
});

export const sellState = atom({
  key: "sellState", // unique ID (with respect to other atoms/selectors)
  default: { frameId: null, showModal: false }, // default value (aka initial value)
});

export const cancelState = atom({
  key: "cancelState", // unique ID (with respect to other atoms/selectors)
  default: { frameId: null, showModal: false }, // default value (aka initial value)
});

export const drawboardState = atom({
  key: "drawboardState", // unique ID (with respect to other atoms/selectors)
  default: { showModal: false, frameId: -1 }, // default value (aka initial value)
});

export const myFramesState = atom({
  key: "myFramesState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const introState = atom({
  key: "introState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const roadmapState = atom({
  key: "roadmapState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const historyState = atom({
  key: "historyState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const hoverState = atom({
  key: "hoverState", // unique ID (with respect to other atoms/selectors)
  default: -1, // default value (aka initial value)
});

export const pixelpartyState = atom({
  key: "ppState", // unique ID (with respect to other atoms/selectors)
  default: { loading: true, framedata: null, metadata: null }, // default value (aka initial value)
});

export const framesOnSaleState = atom({
  key: "framesOnSaleState", // unique ID (with respect to other atoms/selectors)
  default: { frames: [], sortAttribute: "price" }, // default value (aka initial value)
});

export const yourFramesState = atom({
  key: "yourFramesState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const spinnerState = atom({
  key: "spinnerState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export async function getFrameData() {
  if (!window) {
    return;
  }
  const hostname = window.location.href.split("/").slice(0, 3).join("/");

  let resp = await axios.get(hostname + "/api/getFrameData");
  return resp;
}
