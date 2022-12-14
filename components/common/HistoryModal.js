import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, UploadIcon } from "@heroicons/react/solid";
import { Fragment, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { NearUtils } from "../../bc/js/near-util";
import { historyState } from "../../utils/store";

const RoadmapModal = () => {
  const [historyModal, setHistoryModal] = useRecoilState(historyState);
  let completeButtonRef = useRef(null);
  const [history, setHistory] = useState([]);
  const closeModal = async () => {
    setHistoryModal(false);
  };

  useEffect(async () => {
    setTimeout(async () => {
      setHistory(await NearUtils.getHistory());
    }, 3200);

  }, []);

  return (
    <Transition.Root show={historyModal} as={Fragment}>
      <Dialog
        as="div"
        static
        initialFocus={completeButtonRef}
        className="fixed inset-0 z-10 overflow-y-auto"
        open={historyModal}
        onClose={closeModal}
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform rounded-lg shadow-xl bg-theme-normal sm:my-8 sm:align-middle lg:px-24 lg:py-12 md:w-4/6 sm:w-full sm:p-6">
              <div className="">
                <h2 className="mb-2 text-3xl font-extrabold text-center text-white sm:text-5xl">
                  Recent transactions
                </h2>
                <div
                  className="px-6 py-4 whitespace-nowrap"
                  ref={completeButtonRef}
                ></div>

                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-900">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                              >
                                FrameId
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                              >
                                Seller
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                              >
                                Buyer
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                              >
                                Price
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {history.map((person, index) => (
                              <tr key={index}>
                                <td className="px-6 py-1 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        #{person.frameId + 1}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-1 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {person.seller}
                                  </div>
                                </td>
                                <td className="px-6 py-1 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {person.buyer}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-1 whitespace-nowrap"
                                  ref={completeButtonRef}
                                >
                                  <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                    {person.price} NEAR
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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

export default RoadmapModal;
