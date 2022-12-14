import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, UploadIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { useRecoilState } from "recoil";
import { roadmapState } from "../../utils/store";

const timeline = [
  {
    id: 7,
    target: "History of the last 30 traded frames",
    href: "#",
    date: "soon",
    datetime: "2020-09-20",
    icon: UploadIcon,
    iconBackground: "bg-gray-400",
  },
  {
    id: 6,
    target: "Weekly pixeltoken-rewards & egg-reward on every frame purchase",
    href: "#",
    date: "live",
    datetime: "2020-09-20",
    icon: CheckIcon,
    iconBackground: "bg-green-400",
  },
  {
    id: 5,
    target: "Frames show details on mouseover & UI Improvements",
    href: "#",
    date: "live",
    datetime: "2020-09-20",
    icon: CheckIcon,
    iconBackground: "bg-green-400",
  },
  {
    id: 4,
    target: "Frame owners can add a custom text message to the frame",
    href: "#",
    date: "live",
    datetime: "2020-09-22",
    icon: CheckIcon,
    iconBackground: "bg-green-500",
  },
  {
    id: 3,
    target:
      "Frame owners can add a co-author to the frame, whom is able to draw on the frame",
    href: "#",
    date: "live",
    datetime: "2020-09-28",
    icon: CheckIcon,
    iconBackground: "bg-green-500",
  },
  {
    id: 2,
    target: "Frames can be sorted by # or price",
    href: "#",
    date: "live",
    datetime: "2020-09-30",
    icon: CheckIcon,
    iconBackground: "bg-green-500",
  },
  {
    id: 1,
    target: "Stable release",
    href: "#",
    date: "live",
    datetime: "2020-10-04",
    icon: CheckIcon,
    iconBackground: "bg-green-500",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RoadmapModal = () => {
  const [roadmapModal, setRoadmapModal] = useRecoilState(roadmapState);
  const closeModal = async () => {
    setRoadmapModal(false);
  };

  return (
    <Transition.Root show={roadmapModal} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-10 overflow-y-auto"
        open={roadmapModal}
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
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform rounded-lg shadow-xl bg-theme-normal sm:my-8 sm:align-middle lg:px-24 lg:py-12 md:w-1/2 sm:w-full sm:p-6">
              <div className="flow-root">
                <h2 className="text-3xl font-extrabold text-center text-white sm:text-5xl">
                  Roadmap
                </h2>
                <p className="mt-3 mb-10 font-serif text-lg leading-6 text-center text-gray-200">
                  Stay tuned for more updates
                </p>
                <ul className="">
                  {timeline.map((event, eventIdx) => (
                    <li key={eventIdx}>
                      <div className="relative pb-8">
                        {eventIdx !== timeline.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={classNames(
                                event.iconBackground,
                                "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                              )}
                            >
                              <event.icon
                                className="w-5 h-5 text-white"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="min-w-0 pl-4 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm font-medium text-gray-200">
                                <a href={event.href} className=""></a>
                                {event.target}
                              </p>
                            </div>
                            <div className="text-sm font-medium text-right text-gray-300 whitespace-nowrap">
                              <time dateTime={event.datetime}>
                                {event.date}
                              </time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default RoadmapModal;
