import type { IStatus } from "../types"
import { CheckCircle, Clock, Package, Truck, MapPin } from "lucide-react"

interface StatusUpdateItemProps {
  status: IStatus
}

const StatusUpdateItem = ({ status }: StatusUpdateItemProps) => {
  // Get status type for styling and icon selection
  const getStatusType = (status: string): "created" | "transit" | "delivered" | "pending" => {
    const statusLower = status.toLowerCase()

    if (statusLower.includes("deliver")) {
      return "delivered"
    } else if (statusLower.includes("transit") || statusLower.includes("shipping")) {
      return "transit"
    } else if (statusLower.includes("creat")) {
      return "created"
    } else {
      return "pending"
    }
  }

  const statusType = getStatusType(status.status)

  const getStatusIcon = () => {
    switch (statusType) {
      case "delivered":
        return <CheckCircle className="w-5 h-5" />
      case "transit":
        return <Truck className="w-5 h-5" />
      case "created":
        return <Package className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  const getStatusClasses = () => {
    switch (statusType) {
      case "delivered":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-700",
          icon: "bg-green-100 text-green-600",
        }
      case "transit":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-700",
          icon: "bg-blue-100 text-blue-600",
        }
      case "created":
        return {
          bg: "bg-purple-50",
          border: "border-purple-200",
          text: "text-purple-700",
          icon: "bg-purple-100 text-purple-600",
        }
      default:
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-700",
          icon: "bg-amber-100 text-amber-600",
        }
    }
  }

  const classes = getStatusClasses()

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date))
  }

  return (
    <div
      className={`
        ${classes.bg} ${classes.border}
        border rounded-lg shadow-sm p-4
        transition-all duration-300 hover:shadow-md
        transform hover:-translate-y-1
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${classes.icon}`}>{getStatusIcon()}</div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <h3 className={`font-semibold ${classes.text}`}>{status.status}</h3>
            <time className="text-sm text-gray-500">{formatDate(status.createdAt as Date)}</time>
          </div>

          <p className="text-gray-600 mt-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            {status.location}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StatusUpdateItem
