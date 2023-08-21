import {
  AnnotationIcon,
  CashIcon,
  CurrencyDollarIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selector, useRecoilState, useRecoilValue } from "recoil";
import { ColorPalette } from "../bc/js/colorpicker";
import { StorageManager } from "../bc/js/localstorage";
import { NearUtils } from "../bc/js/near-util";
import { Pixboard } from "../bc/js/pixboard";
import BuyModal from "../components/common/BuyModal";
import HistoryModal from "../components/common/HistoryModal";
import CancelModal from "../components/common/CancelModal";
import IntroModal from "../components/common/IntroModal";
import Modal from "../components/common/Modal";
import SellModal from "../components/common/SellModal";
import Spinner from "../components/common/Spinner";
import Sidebar from "../components/sidebar/Sidebar";
import {
  buyState,
  cancelState,
  drawboardState,
  framesOnSaleState,
  hoverState,
  introState,
  pixelpartyState,
  sellState,
  spinnerState,
  yourFramesState,
} from "../utils/store";

const ppSelector = selector({
  key: "pixelpartyGetter", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const resp = get(pixelpartyState);
    if (resp.framedata != null) {
      Pixboard.RenderPixboard(resp.framedata);
      Pixboard.PixboardDataArray = resp.framedata;

      let base64PngData = Pixboard.PixboardCanvas.toDataURL();
      const pixboard = Pixboard.PixboardRef;
      pixboard.style.background = "url(" + base64PngData + ")";
    }
    return "";
  },
});

export default function Home() {
  const canvasRef = useRef();
  const pixboardRef = useRef();

  const [isBuyModal, setBuyModal] = useRecoilState(buyState);
  const [drawboardModal, setDrawboard] = useRecoilState(drawboardState);
  const [sellModal, setSellModal] = useRecoilState(sellState);
  const [introModal, setIntroModal] = useRecoilState(introState);
  const [hoverFrame, setHoverFrame] = useRecoilState(hoverState);
  const [cancelModal, setCancelModal] = useRecoilState(cancelState);
  const [pixelpartyBoard, setPixelpartyBoard] = useRecoilState(pixelpartyState);
  const [framesOnSale, setFramesOnSale] = useRecoilState(framesOnSaleState);
  const [yourFrames, setYourFrames] = useRecoilState(yourFramesState);
  const [spinnerModal, setSpinnerModal] = useRecoilState(spinnerState);

  useRecoilValue(ppSelector);
  const [FrameTooltip, setFrameTooltip] = useState(-1);

  const toggleTooltip = (index) => {
    index === FrameTooltip ? setFrameTooltip(-1) : setFrameTooltip(index);
  };

  function filterContractOwner(owner) {
    if (owner == "pixelparty.chloe.testnet") {
      return "";
    } else {
      return owner;
    }
  }

  useEffect(() => {
    ColorPalette.init();
    Pixboard.PixboardCanvas = canvasRef.current;
    Pixboard.PixboardRef = pixboardRef.current;

    Pixboard.refreshPixelboard(
      setPixelpartyBoard,
      setFramesOnSale,
      framesOnSale.sortAttribute,
      setYourFrames
    );
  }, []);

  return (
    <div className="flex h-screen overflow-x-hidden bg-theme-darker">
      <ToastContainer />
      <Head>
        <title>Pixelparty</title>
        <meta name="viewport" content="width=1500, initial-scale=1" />
      </Head>
      {/* <!-- Static sidebar for desktop --> */}
      <Sidebar />
      {/* <!-- Main column --> */}
      <canvas
        ref={canvasRef}
        id="pixboard-canvas"
        className="block"
        style={{ width: "500px", height: "500px", display: "none" }}
      ></canvas>
      <div
        ref={pixboardRef}
        id="pixboard-wrapper"
        style={{
          height: "800px",
          width: "1200px",
          minWidth: "1200px",
          marginTop: "30px",
          backgroundColor: "#123456",
        }}
        className={
          "p-0 m-auto " + (pixelpartyBoard.loading ? "animate-pulse" : "")
        }
      >
        {pixelpartyBoard.framedata?.map((frame, index) => (
          <div
            key={index}
            onClick={() => toggleTooltip(index)}
            style={{ height: "40px", width: "40px" }}
            className={
              "float-left text-white group z-12 has-tooltip frame" +
              (hoverFrame == index ? " hoverFrame" : "") +
              (FrameTooltip === index ? "" : "")
            }
          >
            <div className="absolute z-30 flex flex-col invisible h-auto mt-8 ml-5 transform -translate-x-1/2 border-2 rounded shadow-xl cursor-default bg-theme-darker tooltip w-max border-opacity-10 border-theme-white tooltip-content">
              <div className="flex p-2 border-b shadow-sm rounded-t-md border-opacity-10 border-theme-white">
                <div className="relative flex items-center flex-grow focus-within:z-10">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <UsersIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="block w-full pl-10 border-gray-300 rounded-none bg-theme-darker focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md sm:text-sm">
                    #{index + 1}{" "}
                    {filterContractOwner(pixelpartyBoard.metadata[index].owner)}
                  </div>
                </div>
              </div>
              {pixelpartyBoard.metadata[index].message && (
                <div className="flex p-2 rounded-md shadow-sm">
                  <div className="relative flex items-center flex-grow focus-within:z-10">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <AnnotationIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="block w-full pl-10 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md sm:text-sm">
                      {pixelpartyBoard.metadata[index].message || ""}
                    </div>
                  </div>
                </div>
              )}
              {pixelpartyBoard.metadata[index].price > 3 && NearUtils.accountId != "" && NearUtils.accountId != pixelpartyBoard.metadata[index].owner && (
                <div className="flex p-2 rounded-md shadow-sm">
                  <div className="relative flex items-center flex-grow mr-6 focus-within:z-10">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <CashIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="block w-full pl-10 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md sm:text-sm">
                      {pixelpartyBoard.metadata[index].price}N
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setBuyModal({
                        showModal: true,
                        price: pixelpartyBoard.metadata[index].price,
                        frameId: index,
                      });
                    }}
                    className="relative inline-flex items-center px-3 py-1 -ml-px space-x-2 font-sans text-sm font-bold border border-gray-900 rounded-md text-theme-darker bg-theme-orange hover:opacity-80 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <span>BUY</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {drawboardModal.showModal && <Modal />}
      {/* <Modal /> */}
      {isBuyModal.showModal && <BuyModal />}
      {sellModal.showModal && <SellModal />}
      {/* {introModal && <IntroModal />} */}
      <IntroModal />
      <HistoryModal />
      {cancelModal.showModal && <CancelModal />}
      {spinnerModal.showModal && <Spinner />}
    </div>
  );
}

function decodeFrameData() {
  // console.log(Pixboard.PixboardDataArray);
  for (let i = 0; i < Pixboard.PixboardDataArray.length; i++) {
    // console.log(JSON.parse(StorageManager.decompress(Pixboard.PixboardDataArray[i])));
    Pixboard.PixboardDataArray[i] = JSON.parse(
      StorageManager.decompressB64(Pixboard.PixboardDataArray[i])
    );
  }
}
