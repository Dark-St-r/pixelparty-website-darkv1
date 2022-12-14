import { useRecoilState } from "recoil";
import { NearUtils } from "../../bc/js/near-util";
import { sellState } from "../../utils/store";
import { useState } from "react";
import { Pixboard } from "../../bc/js/pixboard";
import {
  framesOnSaleState,
  yourFramesState,
  spinnerState,
  pixelpartyState
} from "../../utils/store";
import { toast } from 'react-toastify';

const SellModal = () => {
  const [sellModal, setSellModal] = useRecoilState(sellState);
  const [price, setPrice] = useState(20);
  const [spinnerModal, setSpinnerModal] = useRecoilState(spinnerState);
  const [pixelpartyBoard, setPixelpartyBoard] = useRecoilState(pixelpartyState);
  const [framesOnSale, setFramesOnSale] = useRecoilState(framesOnSaleState);
  const [yourFrames, setYourFrames] = useRecoilState(yourFramesState);

  async function offerFrame() {
    if (price < 4) {
      //TODO visible notification
      setPrice(4);
      console.log(price + " near is too few");
    } else {
      setSpinnerModal({ showModal: true });

      try {
        await NearUtils.offerFrame(sellModal.frameId, price);
      }
      catch (e) {
        toast.error(e.toString().split(',')[0], {
          position: "top-center",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        setSellModal({ showModal: false });
        setSpinnerModal({ showModal: false });

        return;
      }
      setTimeout(async () => {

        await Pixboard.refreshPixelboard(
          setPixelpartyBoard,
          setFramesOnSale,
          framesOnSale.sortAttribute,
          setYourFrames
        );
        setSellModal({ showModal: false });
        setSpinnerModal({ showModal: false });
      }, 5000);


    }
  }

  function checkPrice(_price) {
    if (isNaN(Number(_price))) {
    } else {
      setPrice(_price);
    }
  }

  return (
    <div className="fixed flex items-center justify-center w-screen h-screen">
      <div
        className="fixed w-screen h-screen blur"
        style={{
          filter: "blur(5px)",
          background: "rgba(0, 0, 0, 0.75)",
        }}
      ></div>
      <div className="fixed flex flex-row rounded-md shadow-xl bg-theme-normal">
        <div className="p-6">
          <span className="mb-2 text-2xl font-semibold text-white ">
            For how much Near do you want to offer Frame #
            {sellModal.frameId + 1}?
          </span>
          <br />
          <span className="font-semibold text-gray-400 text-md">
            Afterwards the frame is put on the marketplace and can be bought by
            other users. <br />
            If you decide to keep the frame before it got sold, you can put the
            frame off the marketplace at any time.
            <div className="flex items-center justify-center mt-4">
              <input
                type="text"
                name="nearprice"
                value={price}
                id="price"
                placeholder="Amount"
                style={{ float: "right" }}
                onChange={(event) => checkPrice(event.target.value)}
                required
                className="px-3 py-2 mb-6 text-black placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </div>
          </span>
          <div className="flex flex-row justify-between w-full px-4">
            <button
              onClick={() => setSellModal({ showModal: false })}
              className="flex flex-row justify-center h-auto py-2 -ml-5 font-semibold transition duration-200 border border-solid rounded-md shadow-xl hover:opacity-80 focus:outline-none border-theme-light w-28 text-theme-dark bg-theme-light"
            >
              <svg
                className="w-6 h-6 mr-2"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.2 0H24.8C26.4443 0 28.0213 0.653212 29.1841 1.81594C30.3468 2.97866 31 4.55566 31 6.2V24.8C31 26.4443 30.3468 28.0213 29.1841 29.1841C28.0213 30.3468 26.4443 31 24.8 31H6.2C4.55566 31 2.97866 30.3468 1.81594 29.1841C0.653212 28.0213 0 26.4443 0 24.8V6.2C0 4.55566 0.653212 2.97866 1.81594 1.81594C2.97866 0.653212 4.55566 0 6.2 0ZM6.2 3.1C5.37783 3.1 4.58933 3.42661 4.00797 4.00797C3.42661 4.58933 3.1 5.37783 3.1 6.2V24.8C3.1 25.6222 3.42661 26.4107 4.00797 26.992C4.58933 27.5734 5.37783 27.9 6.2 27.9H24.8C25.6222 27.9 26.4107 27.5734 26.992 26.992C27.5734 26.4107 27.9 25.6222 27.9 24.8V6.2C27.9 5.37783 27.5734 4.58933 26.992 4.00797C26.4107 3.42661 25.6222 3.1 24.8 3.1H6.2ZM17.6917 15.5L22.0766 19.8834C22.3675 20.1742 22.5309 20.5687 22.5309 20.98C22.5309 21.3913 22.3675 21.7858 22.0766 22.0766C21.7858 22.3675 21.3913 22.5309 20.98 22.5309C20.5687 22.5309 20.1742 22.3675 19.8834 22.0766L15.5 17.6917L11.1166 22.0766C10.8258 22.3675 10.4313 22.5309 10.02 22.5309C9.60866 22.5309 9.21419 22.3675 8.92335 22.0766C8.63251 21.7858 8.46911 21.3913 8.46911 20.98C8.46911 20.7764 8.50923 20.5747 8.58716 20.3865C8.6651 20.1984 8.77934 20.0274 8.92335 19.8834L13.3083 15.5L8.92335 11.1166C8.63251 10.8258 8.46911 10.4313 8.46911 10.02C8.46911 9.81631 8.50923 9.61465 8.58716 9.42649C8.6651 9.23833 8.77934 9.06736 8.92335 8.92335C9.06736 8.77934 9.23833 8.6651 9.42649 8.58716C9.61465 8.50923 9.81631 8.46911 10.02 8.46911C10.4313 8.46911 10.8258 8.63251 11.1166 8.92335L15.5 13.3083L19.8834 8.92335C20.1742 8.63251 20.5687 8.46911 20.98 8.46911C21.3913 8.46911 21.7858 8.63251 22.0766 8.92335C22.3675 9.21419 22.5309 9.60866 22.5309 10.02C22.5309 10.4313 22.3675 10.8258 22.0766 11.1166L17.6917 15.5Z"
                  fill="currentColor"
                />
              </svg>
              Cancel
            </button>
            <button
              onClick={() => offerFrame()}
              className="flex flex-row justify-between w-24 h-auto px-4 py-2 font-semibold transition duration-200 border border-solid rounded-md shadow-xl hover:opacity-80 focus:outline-none border-theme-light text-theme-white bg-theme-blue"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.433 7.418C8.588 7.315 8.779 7.222 9 7.151V8.849C8.79973 8.78623 8.60896 8.6964 8.433 8.582C8.07 8.34 8 8.114 8 8C8 7.886 8.07 7.66 8.433 7.418Z"
                  fill="white"
                />
                <path
                  d="M11 12.849V11.151C11.22 11.222 11.412 11.315 11.567 11.418C11.931 11.661 12 11.886 12 12C12 12.114 11.93 12.34 11.567 12.582C11.391 12.6964 11.2003 12.7862 11 12.849Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18ZM11 5C11 4.73478 10.8946 4.48043 10.7071 4.29289C10.5196 4.10536 10.2652 4 10 4C9.73478 4 9.48043 4.10536 9.29289 4.29289C9.10536 4.48043 9 4.73478 9 5V5.092C8.40268 5.19833 7.83276 5.42344 7.324 5.754C6.602 6.234 6 7.009 6 8C6 8.99 6.602 9.765 7.324 10.246C7.804 10.566 8.378 10.791 9 10.908V12.849C8.609 12.722 8.32 12.532 8.157 12.345C8.0724 12.2412 7.96782 12.1554 7.84945 12.0928C7.73107 12.0302 7.60133 11.992 7.46791 11.9804C7.33449 11.9689 7.20012 11.9843 7.07276 12.0257C6.9454 12.0671 6.82765 12.1336 6.72649 12.2214C6.62534 12.3091 6.54284 12.4163 6.48389 12.5365C6.42494 12.6568 6.39075 12.7876 6.38334 12.9214C6.37592 13.0551 6.39544 13.1889 6.44073 13.3149C6.48602 13.441 6.55617 13.5566 6.647 13.655C7.209 14.304 8.06 14.731 9 14.908V15C9 15.2652 9.10536 15.5196 9.29289 15.7071C9.48043 15.8946 9.73478 16 10 16C10.2652 16 10.5196 15.8946 10.7071 15.7071C10.8946 15.5196 11 15.2652 11 15V14.908C11.5973 14.8017 12.1672 14.5766 12.676 14.246C13.398 13.766 14 12.991 14 12C14 11.01 13.398 10.235 12.676 9.754C12.1672 9.42344 11.5973 9.19833 11 9.092V7.151C11.391 7.278 11.68 7.468 11.843 7.655C11.9284 7.75631 12.0331 7.83965 12.1509 7.90016C12.2688 7.96067 12.3975 7.99716 12.5296 8.00749C12.6617 8.01783 12.7945 8.00182 12.9204 7.96038C13.0462 7.91894 13.1626 7.85291 13.2627 7.76612C13.3628 7.67932 13.4447 7.5735 13.5035 7.4548C13.5624 7.33609 13.5971 7.20688 13.6056 7.07465C13.6141 6.94243 13.5962 6.80984 13.553 6.68458C13.5098 6.55932 13.4422 6.44389 13.354 6.345C12.791 5.696 11.941 5.269 11 5.092V5Z"
                  fill="white"
                />
              </svg>
              Sell
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellModal;
