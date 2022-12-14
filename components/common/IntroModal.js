import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { useRecoilState } from "recoil";
import { introState } from "../../utils/store";

const IntroModal = () => {
  const [introModal, setIntroModal] = useRecoilState(introState);
  let messageRef = useRef();

  return (
    <Transition.Root show={introModal} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={messageRef}
        static
        className="fixed inset-0 z-10 overflow-y-auto"
        open={introModal}
        onClose={() => setIntroModal(false)}
      >
        <div
          ref={messageRef}
          className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-90" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-full overflow-hidden text-left align-bottom transition-all transform rounded-lg sm:my-8 sm:align-middle md:w-1/2">
              <div className="relative py-16">
                <div
                  className="absolute inset-x-0 top-0 hidden h-1/2 lg:block"
                  aria-hidden="true"
                />

                <div className="mx-auto bg-theme-normal max-w-7xl lg:bg-transparent lg:px-8">
                  <div className="lg:grid lg:grid-cols-12">
                    <div className="relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-16 lg:bg-transparent">
                      <div
                        className="absolute inset-x-0 h-1/2 lg:hidden"
                        aria-hidden="true"
                      />
                      <div className="max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
                        <div className="aspect-w-10 aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1">
                          <img
                            className="object-cover object-center bg-gray-900 shadow-2xl rounded-3xl"
                            src="/roadmap.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative py-5 bg-theme-normal lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-3xl lg:grid lg:grid-cols-10 lg:items-center">
                      <div
                        className="absolute inset-0 hidden overflow-hidden rounded-3xl lg:block"
                        aria-hidden="true"
                      >
                        <svg
                          className="absolute transform opacity-10 bottom-full left-full translate-y-1/3 -translate-x-2/3 xl:bottom-auto xl:top-0 xl:translate-y-0"
                          width={404}
                          height={384}
                          fill="none"
                          viewBox="0 0 404 384"
                          aria-hidden="true"
                        >
                          <defs>
                            <pattern
                              id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                              x={0}
                              y={0}
                              width={20}
                              height={20}
                              patternUnits="userSpaceOnUse"
                            >
                              <rect
                                x={0}
                                y={0}
                                width={4}
                                height={4}
                                className="text-gray-500"
                                fill="currentColor"
                              />
                            </pattern>
                          </defs>
                          <rect
                            width={404}
                            height={384}
                            fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                          />
                        </svg>
                        <svg
                          className="absolute transform opacity-10 animation-pulse top-full -translate-y-1/3 -translate-x-1/3 xl:-translate-y-1/2"
                          width={404}
                          height={384}
                          fill="none"
                          viewBox="0 0 404 384"
                          aria-hidden="true"
                        >
                          <defs>
                            <pattern
                              id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                              x={0}
                              y={0}
                              width={20}
                              height={20}
                              patternUnits="userSpaceOnUse"
                            >
                              <rect
                                x={0}
                                y={0}
                                width={4}
                                height={4}
                                className="text-gray-500"
                                fill="currentColor"
                              />
                            </pattern>
                          </defs>
                          <rect
                            width={404}
                            height={384}
                            fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                          />
                        </svg>
                      </div>
                      <div className="relative max-w-md px-4 py-12 mx-auto space-y-2 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 lg:col-start-4 lg:col-span-6">
                        <p className="text-lg font-semibold text-gray-200">
                          What is PixelParty?
                        </p>
                        <p className="text-sm text-gray-300">
                          PixelParty is an NFT Frame showcase built on the NEAR
                          Protocol with a total supply of 600 tokens.
                          <br /> Each token you own, allows you to draw on a
                          20x20px frame. You could buy several connected frames
                          to draw a larger frame.
                          <br />
                        </p>
                        <p className="text-lg font-semibold text-gray-200">
                          How can I participate?
                        </p>
                        <p className="text-sm text-gray-300">
                          Connect with your wallet, pick one of the available
                          frames. Hovering over the buy button will highlight
                          the frame on the Pixelparty board. <br />
                          Your frames are located in the sidebar where you can
                          draw, edit or list them on the marketplace with your
                          asking price.
                        </p>

                        <p className="text-sm text-gray-300">
                          - Sexual, racist or violent drawings are forbidden.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default IntroModal;
