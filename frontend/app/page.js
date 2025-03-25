import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Car, DollarSign, Database, BarChart } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">Predict Your Car's Value With Precision</h1>
              <p className="text-xl opacity-90">
                Our advanced machine learning model analyzes 20+ features to give you the most accurate price
                prediction.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                  <Link href="/login">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link href="#how-it-works">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Car Valuation"
                className="rounded-lg shadow-xl"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </header>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enter Car Details</h3>
              <p className="text-gray-600">
                Provide information about your car's specifications, features, and condition.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Our machine learning model analyzes your car against thousands of data points.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Your Valuation</h3>
              <p className="text-gray-600">Receive an accurate price prediction based on current market conditions.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/login">
                Try It Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Features</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center">
                <DollarSign size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Accurate Predictions</h3>
                <p className="text-gray-600">
                  Our model has been trained on thousands of car sales data points to provide highly accurate price
                  predictions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center">
                <Database size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Inventory Management</h3>
                <p className="text-gray-600">
                  Keep track of all your vehicles in one place with our comprehensive inventory system.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center">
                <Car size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Detailed Analysis</h3>
                <p className="text-gray-600">
                  Get insights into how different features affect your car's value with our detailed breakdown.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center">
                <BarChart size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Market Trends</h3>
                <p className="text-gray-600">
                  Stay updated with the latest market trends and how they impact car valuations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CarValue</h3>
              <p className="text-gray-400">The most accurate car price prediction tool powered by machine learning.</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="text-gray-400 hover:text-white">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/predict" className="text-gray-400 hover:text-white">
                    Predict Price
                  </Link>
                </li>
                <li>
                  <Link href="/inventory" className="text-gray-400 hover:text-white">
                    Inventory
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">
                Email: info@carvalue.com
                <br />
                Phone: (123) 456-7890
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CarValue. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

