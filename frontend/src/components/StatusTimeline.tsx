import type { IStatus } from "../types"
import StatusUpdateItem from "./StatusUpdateItem"

interface StatusTimelineProps {
  statusUpdates: IStatus[]
}

const StatusTimeline = ({ statusUpdates }: StatusTimelineProps) => {
  const sortedUpdates = [...statusUpdates].sort((a, b) => {
    const dateA = new Date(a.createdAt || "").getTime()
    const dateB = new Date(b.createdAt || "").getTime()
    return dateB - dateA
  })

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Shipment Status Timeline
      </h2>

      <div className="relative">
        <div className="absolute left-8 md:left-1/2 top-0 h-full w-0.5 bg-gray-200"></div>

        <div className="flex flex-col gap-8">
          {sortedUpdates.map((status, index) => (
            <div
              key={status._id}
              className={`relative flex items-start ${
                index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="absolute left-8 md:left-1/2 top-6 transform -translate-x-1/2 z-10">
                <div className="w-4 h-4 rounded-full bg-white border-2 border-gray-300"></div>
              </div>

              <div
                className={`w-full pl-16 md:pl-0 md:w-[calc(50%-20px)] ${
                  index % 2 === 0 ? "md:pr-10" : "md:pl-10"
                }`}
              >
                <StatusUpdateItem status={status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatusTimeline
