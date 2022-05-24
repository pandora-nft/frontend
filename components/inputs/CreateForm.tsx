import Link from "next/link"
import { formDataType } from "types"
import { Dispatch, SetStateAction } from "react"
export const CreateForm = ({
  formData,
  setFormData,
}: {
  formData: formDataType
  setFormData: Dispatch<SetStateAction<formDataType>>
}) => {
  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-1 xl:gap-6 pt-6">
        <div className="relative z-0 w-full pb-2 group">
          <label
            htmlFor="message"
            className="block text-m font-medium text-gray-900 dark:text-gray-400"
          >
            Name
          </label>
          <input
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData?.name}
            type="text"
            name="floating_first_name"
            id="floating_first_name"
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
            Ticket Price
          </label>
          <input
            onChange={(e) => setFormData({ ...formData, ticketPrice: Number(e.target.value) })}
            value={formData?.ticketPrice}
            type="number"
            step=".001"
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
            Minimum Ticket Required
          </label>
          <input
            onChange={(e) =>
              setFormData({ ...formData, minimumTicketRequired: Number(e.target.value) })
            }
            value={formData?.minimumTicketRequired}
            type="number"
            min="0"
            max="500"
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
            Max ticket per wallet
          </label>
          <input
            onChange={(e) =>
              setFormData({ ...formData, maxTicketPerWallet: Number(e.target.value) })
            }
            value={formData?.maxTicketPerWallet}
            type="number"
            min="0"
            max="500"
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
            Expiration Period
          </label>

          <div className="relative inline-flex">
            <svg
              className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 412 232"
            >
              <path
                d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                fill="#648299"
                fillRule="nonzero"
              />
            </svg>
            <select
              onChange={(e) =>
                setFormData({
                  ...formData,
                  drawTimestamp: Number(e.target.value),
                })
              }
              value={formData?.drawTimestamp}
              className="border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
              required
            >
              <option disabled>Choose expiration period</option>
              <option value={60}>1 min</option>
              <option value={5 * 60}>5 mins</option>
              <option value={1 * 60 * 60}>1 hours</option>
              <option value={3 * 60 * 60}>3 hours</option>
              <option value={6 * 60 * 60}>6 hours</option>
              <option value={12 * 60 * 60}>12 hours</option>
              <option value={24 * 60 * 60}>1 day</option>
              <option value={72 * 60 * 60}>3 days</option>
              <option value={168 * 60 * 60}>7 days</option>
              <option value={336 * 60 * 60}>14 days</option>
            </select>
          </div>
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
            required
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
              required
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
    </>
  )
}
