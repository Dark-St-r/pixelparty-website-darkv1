import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { NearUtils } from "../../bc/js/near-util";
import {
  buyState,
  cancelState,
  drawboardState,
  framesOnSaleState,
  hoverState,
  introState,
  historyState,
  sellState,
  yourFramesState,
} from "../../utils/store";
import { Drawboard } from "../../bc/js/drawboard";
import {
  Container,
  Frames,
  Logo,
  NavigationButtons,
  Profile,
  SidebarContainer,
} from "./Sidebar.styled";
import { setupModal } from "@near-wallet-selector/modal-ui";
import "@near-wallet-selector/modal-ui/styles.css";


const Sidebar = () => {
  const [isBuyModal, setBuyModal] = useRecoilState(buyState);
  const [sellModal, setSellModal] = useRecoilState(sellState);
  const [SignedIn, setSignedIn] = useState({
    logged: false
  });
  const [drawboardModal, setDrawboard] = useRecoilState(drawboardState);
  const [introModal, setIntroModal] = useRecoilState(introState);
  const [hoverFrame, setHoverFrame] = useRecoilState(hoverState);
  const [cancelModal, setCancelModal] = useRecoilState(cancelState);
  const [historyModal, setHistoryModal] = useRecoilState(historyState);

  const [yourFrames, setYourFrames] = useRecoilState(yourFramesState);
  const [framesOnSale, setFramesOnSale] = useRecoilState(framesOnSaleState);

  const [loginModal, setLoginModal] = useState(null);
  useEffect(async () => {
    await NearUtils.initContract(setSignedIn, setYourFrames);


    const modal = setupModal(NearUtils.selectorInstance, {
      contractId: "pixelparty.chloe.testnet"
    });

    setLoginModal(modal);

  }, []);

  function openDrawboard(frameId) {
    Drawboard.activeFrame = frameId;
    setDrawboard({ frameId: frameId, showModal: true });
  }
  function login() {
    loginModal.show();
  }

  async function logout() {
    NearUtils.logout();
  }

  function pad(num, size) {
    var s = "00000" + num;
    return s.substr(s.length - size);
  }

  function sortFramesOnSale() {
    let sorted = [];
    let attribute = "";
    if (framesOnSale.sortAttribute == "frameId") {
      sorted = [...framesOnSale.frames].sort((a, b) => {
        return a.price - b.price;
      });
      attribute = "price";
    } else {
      sorted = [...framesOnSale.frames].sort((a, b) => {
        return a.frameId - b.frameId;
      });
      attribute = "frameId";
    }
    setFramesOnSale({ frames: sorted, sortAttribute: attribute });
  }

  return (
    <div className="flex flex-shrink-0">
      <Container>
        {/* NEAR Pixelparty */}
        <Logo>
          <img className="w-auto h-8" src="/PixelLogo.svg" />
          <span className="pt-3 font-sans text-3xl font-bold text-white">
            ixelparty
          </span>
        </Logo>

        {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
        <SidebarContainer className="scrollbar">
          {/* <!-- User account dropdown --> */}
          <Profile>
            {SignedIn.logged && (
              <div className="flex flex-col items-center justify-center w-full">
                <span className="mb-2 font-sans text-sm font-medium truncate text-theme-white">
                  {NearUtils.accountId}
                </span>
                <button
                  type="button"
                  className="group transition duration-200 w-1/2 bg-theme-normal rounded-md px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-theme-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded="true"
                  onClick={logout}
                >
                  <span className="flex items-center justify-between w-full">
                    <span className="flex items-center justify-between min-w-0 space-x-3">
                      <span className="flex-1 min-w-0">
                        <span className="font-serif text-sm font-medium truncate text-theme-white">
                          Logout
                        </span>
                      </span>
                    </span>
                    {/* <!-- Heroicon name: solid/selector --> */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 mt-1 transition duration-200 text-theme-white group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 15 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M8.22222 9.66667V10.3889C8.22222 10.9635 7.99395 11.5146 7.58762 11.921C7.18129 12.3273 6.63019 12.5556 6.05556 12.5556H3.16667C2.59203 12.5556 2.04093 12.3273 1.6346 11.921C1.22827 11.5146 1 10.9635 1 10.3889V3.16667C1 2.59203 1.22827 2.04093 1.6346 1.6346C2.04093 1.22827 2.59203 1 3.16667 1H6.05556C6.63019 1 7.18129 1.22827 7.58762 1.6346C7.99395 2.04093 8.22222 2.59203 8.22222 3.16667V3.88889M11.1111 9.66667L14 6.77778L11.1111 9.66667ZM14 6.77778L11.1111 3.88889L14 6.77778ZM14 6.77778H3.88889H14Z"
                        stroke="currentColor"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            )}
            {!SignedIn.logged && (
              <div className="flex items-center justify-center w-full">
                <button
                  type="button"
                  className="group transition duration-200 w-1/2 bg-theme-normal rounded-md px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-theme-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded="true"
                  onClick={login}
                >
                  <span className="flex items-center justify-between w-full">
                    <span className="flex items-center justify-between min-w-0 space-x-3">
                      <span className="flex-1 min-w-0">
                        <span className="font-serif text-sm font-medium truncate text-theme-white">
                          Login
                        </span>
                      </span>
                    </span>
                    {/* <!-- Heroicon name: solid/selector --> */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 mt-1 transition duration-200 text-theme-white group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 15 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M8.22222 9.66667V10.3889C8.22222 10.9635 7.99395 11.5146 7.58762 11.921C7.18129 12.3273 6.63019 12.5556 6.05556 12.5556H3.16667C2.59203 12.5556 2.04093 12.3273 1.6346 11.921C1.22827 11.5146 1 10.9635 1 10.3889V3.16667C1 2.59203 1.22827 2.04093 1.6346 1.6346C2.04093 1.22827 2.59203 1 3.16667 1H6.05556C6.63019 1 7.18129 1.22827 7.58762 1.6346C7.99395 2.04093 8.22222 2.59203 8.22222 3.16667V3.88889M11.1111 9.66667L14 6.77778L11.1111 9.66667ZM14 6.77778L11.1111 3.88889L14 6.77778ZM14 6.77778H3.88889H14Z"
                        stroke="currentColor"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            )}
          </Profile>

          {/* <!-- Navigation --> */}
          <nav className="px-3 mt-6">
            <NavigationButtons>
              {/* <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-700 hover:text-gray-900 hover:bg-gray-50" --> */}
              <a
                href="#"
                className="flex items-center px-2 py-2 font-serif text-sm font-medium text-gray-400 transition duration-200 rounded-md hover:text-gray-500 bg-theme-darker group"
                onClick={() => {
                  setIntroModal(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-3 text-gray-400"
                >
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path
                    fillRule="evenodd"
                    d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Intro / Rules
              </a>
              <a
                href="#"
                onClick={() => {
                  setHistoryModal(true);
                }}
                className="flex items-center px-2 py-2 font-serif text-sm font-medium text-gray-400 transition duration-200 rounded-md hover:text-gray-500 bg-theme-darker group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-3 text-gray-400"
                >
                  <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z" />
                  <path
                    fillRule="evenodd"
                    d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Trade History
              </a>
              <a
                href="https://discord.com/invite/xFAAa8Db6f"
                target="_blank"
                className="flex items-center px-2 py-2 font-serif text-sm font-medium text-gray-400 transition duration-200 rounded-md hover:text-gray-500 bg-theme-darker group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-3 text-gray-400"
                >
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path
                    fillRule="evenodd"
                    d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Discord / Support
              </a>
            </NavigationButtons>
            <Frames>
              {/* <!-- Secondary navigation --> */}
              <h3
                className="flex flex-row px-3 font-serif text-xs font-semibold tracking-wider text-gray-500 uppercase"
                id="teams-headline"
              >
                Your frames
                <div className="relative flex items-center justify-center w-8 h-8 ml-4 -mt-2 border-2 rounded-full animate-pulse border-theme-light">
                  {yourFrames.length}
                </div>
              </h3>
              <div
                className="mt-1 space-y-1"
                role="group"
                aria-labelledby="teams-headline"
              >
                <div
                  className="flex flex-col h-auto px-4 py-6 my-2 space-y-2 font-sans text-sm font-medium text-gray-700 rounded-md cursor-default group hover:text-gray-900 bg-theme-darker"
                  onMouseLeave={() => {
                    setHoverFrame(-1);
                  }}
                >
                  {yourFrames.map((frame, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between w-full h-8 mr-2 rounded-sm bg-theme-dark"
                      onMouseEnter={() => {
                        setHoverFrame(frame.frameId);
                      }}
                    >
                      <span className="px-2 font-bold text-center rounded-sm text-md text-theme-white border-theme-normal frame-number">
                        #{pad(frame.frameId + 1, 3)}
                      </span>
                      <div className="flex">
                        {(frame.price < 4 ||
                          frame.coauthor == NearUtils.accountId) && (
                            <button
                              className="w-auto h-8 px-2 font-bold text-center uppercase transition duration-200 bg-green-400 rounded-l-md focus:outline-none hover:opacity-80 text-md text-theme-darker"
                              onClick={() => {
                                openDrawboard(frame.frameId);
                              }}
                            >
                              Edit
                            </button>
                          )}
                        {frame.price < 4 &&
                          frame.coauthor != NearUtils.accountId && (
                            <button
                              className="w-auto h-8 px-2 font-bold text-center uppercase transition duration-200 rounded-r-md focus:outline-none hover:opacity-80 text-md text-theme-darker bg-theme-blue"
                              onClick={() => {
                                setSellModal({
                                  showModal: true,
                                  frameId: frame.frameId,
                                });
                              }}
                            >
                              Sell
                            </button>
                          )}
                        {frame.price >= 4 &&
                          frame.coauthor != NearUtils.accountId && (
                            <span className="px-2 font-bold text-center text-md text-theme-white">
                              {frame.price}N
                            </span>
                          )}
                        {frame.price >= 4 &&
                          frame.coauthor != NearUtils.accountId && (
                            <button
                              className="w-auto h-8 px-2 font-bold text-center uppercase transition duration-200 bg-gray-500 focus:outline-none hover:opacity-80 hover:text-theme-white text-md text-theme-darker"
                              onClick={() => {
                                setCancelModal({
                                  showModal: true,
                                  frameId: frame.frameId,
                                });
                              }}
                            >
                              Cancel
                            </button>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Frames>
            <Frames>
              {/* <!-- Secondary navigation --> */}
              <h3
                className="flex flex-row px-3 font-serif text-xs font-semibold tracking-wider text-gray-500 uppercase"
                id="teams-headline"
              >
                On sale
                <div className="relative flex items-center justify-center w-8 h-8 ml-4 -mt-2 border-2 rounded-full animate-pulse border-theme-light">
                  {framesOnSale.frames.length}
                </div>
                <div
                  className="relative flex items-center justify-center w-8 h-8 ml-4 -mt-2 border-2 rounded-full border-theme-light"
                  onClick={() => {
                    sortFramesOnSale();
                  }}
                  style={{ float: "right" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="-4 -4 32 32"
                    stroke="currentColor"
                    style={{ cursor: "pointer" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>
              </h3>
              <div
                className="mt-1 space-y-1"
                role="group"
                aria-labelledby="teams-headline"
              >
                <div
                  className="flex flex-col justify-center h-auto px-4 py-4 my-2 space-y-2 font-sans text-sm font-medium text-gray-700 rounded-md cursor-default group hover:text-gray-900 bg-theme-darker"
                  onMouseLeave={() => {
                    setHoverFrame(-1);
                  }}
                >
                  {framesOnSale.frames.map((frame, index) => (
                    <div
                      key={index}
                      className="flex flex-row"
                      onMouseEnter={() => {
                        setHoverFrame(frame.frameId);
                      }}
                    >
                      <div className="flex items-center justify-between w-1/3 h-8 border-r-4 rounded-sm border-theme-darker bg-theme-dark">
                        <span className="px-2 font-bold text-center text-md text-theme-white">
                          #{pad(frame.frameId + 1, 3)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between w-2/3 h-8 mr-2 rounded-sm bg-theme-dark">
                        <span className="px-2 font-bold text-center text-md text-theme-white">
                          {frame.price}N
                        </span>
                      </div>
                      {SignedIn.logged && (
                        <button
                          onClick={() => {
                            setBuyModal({
                              showModal: true,
                              price: frame.price,
                              frameId: frame.frameId,
                            });
                          }}
                          className="w-auto h-8 px-2 font-bold text-center uppercase transition duration-200 rounded-sm focus:outline-none text-md hover:opacity-80 text-theme-darker bg-theme-orange"
                        >
                          BUY
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Frames>
          </nav>
        </SidebarContainer>
      </Container>
    </div>
  );
};

export default Sidebar;
