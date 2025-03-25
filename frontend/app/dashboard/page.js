import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, Database, BarChart4, TrendingUp, Clock } from "lucide-react"

export default function Dashboard() {
  // Sample data for the dashboard
  const recentPredictions = [
    { id: 1, car: "Toyota Camry", year: 2018, prediction: "$15,200", date: "2023-03-15" },
    { id: 2, car: "Honda Civic", year: 2020, prediction: "$18,500", date: "2023-03-14" },
    { id: 3, car: "Ford Mustang", year: 2017, prediction: "$22,800", date: "2023-03-12" },
  ]

  const stats = [
    { title: "Total Predictions", value: "24", icon: BarChart4, color: "bg-blue-100 text-blue-700" },
    { title: "Cars in Inventory", value: "12", icon: Database, color: "bg-green-100 text-green-700" },
    { title: "Average Value", value: "$18,450", icon: DollarSign, color: "bg-purple-100 text-purple-700" },
    { title: "Value Trend", value: "+2.4%", icon: TrendingUp, color: "bg-yellow-100 text-yellow-700" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild>
          <Link href="/predict">
            <DollarSign className="mr-2 h-4 w-4" /> New Prediction
          </Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Predictions</CardTitle>
          <CardDescription>Your latest car price predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Car</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Year</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Predicted Value</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentPredictions.map((prediction) => (
                  <tr key={prediction.id} className="border-b">
                    <td className="py-3 px-4">{prediction.car}</td>
                    <td className="py-3 px-4">{prediction.year}</td>
                    <td className="py-3 px-4 font-medium">{prediction.prediction}</td>
                    <td className="py-3 px-4 text-gray-500">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-gray-400" />
                        {prediction.date}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-blue-100 text-blue-700 rounded-full">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="font-medium">Predict Car Price</h3>
              <p className="text-sm text-gray-500">Get an accurate valuation for any car model</p>
              <Button asChild className="mt-2 w-full">
                <Link href="/predict">Start Prediction</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-green-100 text-green-700 rounded-full">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="font-medium">Manage Inventory</h3>
              <p className="text-sm text-gray-500">Add, edit, or remove cars from your inventory</p>
              <Button asChild variant="outline" className="mt-2 w-full">
                <Link href="/inventory">View Inventory</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-purple-100 text-purple-700 rounded-full">
                <BarChart4 className="h-6 w-6" />
              </div>
              <h3 className="font-medium">View Analytics</h3>
              <p className="text-sm text-gray-500">See detailed analytics about your predictions</p>
              <Button asChild variant="outline" className="mt-2 w-full">
                <Link href="/analytics">View Analytics</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

