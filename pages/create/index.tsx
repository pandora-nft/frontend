import Link from "next/link";
import { useState } from "react";

//todo receive chain and single or multiple as props
//# to do => mode => fixed price , bids(add minimum bids) , oversoldable(max ticket is not min),
//todo single/multiple lootbox
//interaction with contract

// declare global {
//   interface Window {
//     ethereum?: any;
//   }
// }
const Create = () => {
  const [image, setImage] = useState(Array());
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage([...image, URL.createObjectURL(img)]);
    }
  };

  return (
    <div className="w-0.8 p-16 grid justify-items-center ">
      <div className="grid pl-16 w-full justify-items-start ">
        <h2 className="text-[42px] font-bold">Create Single LootBox on Ethereum</h2>
      </div>

      <div className="grid pl-16 pt-8 justify-items-start rounded-lg  w-full ">
        <div className="h-24 lg:w-2/5 shadow-xl bg-gray-50">
          connected to Ethereum
          <img className="w-6" src="/chain/Ethereum.png"></img>
          <span>address:</span>
        </div>
      </div>

      {/* Form */}
      <div className="grid pl-16 pt-8 justify-items-start rounded-lg  w-full ">
        <div className="w-3/4">
          <form className="w-full max-w-lg">
            <label className="inline-block mb-2 text-[24px] font-bold">
              Upload Image (jpg,png,svg,jpeg)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-full border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7 ">
                  {image.length !== 0 ? (
                    <div>
                      <img className="w-36 h-36" src={image[image.length - 1]} />
                    </div>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="pt-1 text-m tracking-wider text-gray-400 group-hover:text-gray-600">
                        Select a photo
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  name="myImage"
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                  className="opacity-0"
                />
              </label>
            </div>

            <div className="grid xl:grid-cols-2 xl:gap-6 pt-6">
              <div className="relative z-0 w-full pb-2 group">
                <label
                  htmlFor="message"
                  className="block text-m font-medium text-gray-900 dark:text-gray-400"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
            </div>
            <div className="grid-row xl:grid-cols-2 xl:gap-6 pt-6">
              <label
                htmlFor="message"
                className="block mb-4 text-m font-medium text-gray-900 dark:text-gray-400"
              >
                Description
              </label>
              <textarea
                id="message"
                className="block p-2.5 w-full text-m text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="add description"
              ></textarea>
            </div>
            <div className="grid pt-6 xl:grid-cols-2 xl:gap-6">
              <div className="relative z-0 w-full pb-2 group">
                <label
                  htmlFor="message"
                  className="block text-m font-medium text-gray-900 dark:text-gray-400"
                >
                  Ticket Price
                </label>
                <input
                  type="text"
                  name="floating_last_name"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <div className=" pr-5 pt-2 font-light font-sm text-gray-800">Service Fee 2%</div>
              </div>
            </div>
            <div className="grid pt-6 xl:grid-cols-2 xl:gap-6">
              <div className="relative z-0 w-full pb-2 group">
                <label
                  htmlFor="message"
                  className="block text-m font-medium text-gray-900 dark:text-gray-400"
                >
                  Minimum Ticket
                </label>
                <input
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  name="floating_phone"
                  id="floating_phone"
                  className="block py-2.5 px-0 w-full text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
            </div>
            <div className="grid pt-6 xl:grid-cols-2 xl:gap-6">
              <div className="relative z-0 w-full pb-2 group">
                <label
                  htmlFor="message"
                  className="block text-m font-medium text-gray-900 dark:text-gray-400"
                >
                  Expiration Date
                </label>
                <input
                  type="text"
                  name="floating_company"
                  id="floating_company"
                  className="block py-2.5 px-0 w-full text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
            </div>
            <fieldset className="pt-4">
              <legend className="sr-only">Checkbox variants</legend>
              <div className="flex items-center mb-4">
                <input
                  id="checkbox-2"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <div>
                  <label
                    htmlFor="checkbox-2"
                    className="ml-2 text-m font-medium text-gray-900 dark:text-gray-300 "
                  >
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
                      terms and conditions
                    </a>
                  </label>
                </div>
              </div>

              <div className="flex items-center ">
                <div>
                  <input
                    id="checkbox-3"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="checkbox-3"
                    className="ml-2 text-m font-medium text-gray-900 dark:text-gray-300"
                  >
                    I am 13 years or older
                  </label>
                </div>
              </div>
              <Link href={"/whitepaper"} replace>
                <a className=" pr-5 font-light text-gray-500">How it work</a>
              </Link>
            </fieldset>
            <div></div>
            <button
              type="submit"
              className="text-white pt-4 mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-m w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* show uploaded pic */}
      {image.map((item, i) => (
        <div
          key={i}
          className="rounded-xl w-36 h-36 mx-auto mt-16 mb-10 bg-gradient-to-r p-[6px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
        >
          <div
            key={i}
            className="flex flex-col justify-between h-full bg-white text-white rounded-lg"
          >
            <div key={i} className="rounded-lg  h-full w-full relative cursor-pointer ">
              <div
                key={i}
                className="absolute inset-0 bg-red opacity-25 rounded-lg shadow-2xl"
              ></div>
              <div
                key={i}
                className="absolute inset-0 transform  hover:scale-90 transition duration-300"
              >
                <div key={i} className="h-full w-full bg-white rounded-lg shadow-2xl">
                  <img key={i} className="w-full h-full rounded-lg" src={item} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Create;
