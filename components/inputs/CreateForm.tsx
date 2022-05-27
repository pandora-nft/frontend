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
            className="block py-2.5 px-0 w-full text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
            className="block py-2.5 px-0 w-full text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
            className="block py-2.5 px-0 w-full text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
          <div className="relative inline-flex items-center">
            <input
              onChange={(e) => setFormData({ ...formData, drawDays: Number(e.target.value) })}
              value={formData?.drawDays}
              type="number"
              step="1"
              min="0"
              name="floating_last_name"
              id="floating_last_name"
              className="py-2.5 px-0 w-[50px] text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <span className="px-3 ">days</span>
            <input
              onChange={(e) => setFormData({ ...formData, drawHours: Number(e.target.value) })}
              value={formData?.drawHours}
              type="number"
              step="1"
              min="0"
              max="23"
              name="floating_last_name"
              id="floating_last_name"
              className="py-2.5 px-0 w-[50px] text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />

            <span className="px-3 ">hours</span>
            <input
              onChange={(e) => setFormData({ ...formData, drawMinutes: Number(e.target.value) })}
              value={formData?.drawMinutes}
              type="number"
              step="1"
              min="0"
              max="60"
              name="floating_last_name"
              id="floating_last_name"
              className="py-2.5 px-0 w-[50px] text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />

            <span className="px-3 ">minutes</span>
            <input
              onChange={(e) => setFormData({ ...formData, drawSeconds: Number(e.target.value) })}
              value={formData?.drawSeconds}
              type="number"
              step="1"
              min="0"
              max="60"
              name="floating_last_name"
              id="floating_last_name"
              className="py-2.5 px-0 w-[50px] text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />

            <span className="px-3 ">seconds</span>
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

        <Link href={"/whitepaper"} replace>
          <a className=" pr-5 font-light text-gray-500">How it work</a>
        </Link>
      </fieldset>
    </>
  )
}
