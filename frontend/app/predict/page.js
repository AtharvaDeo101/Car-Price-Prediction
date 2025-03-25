"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Car, Info, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PredictPage() {
  const [formData, setFormData] = useState({
    symboling: 0,
    fueltype: "gas",
    aspiration: "std",
    doornumber: "four",
    carbody: "sedan",
    drivewheel: "fwd",
    enginelocation: "front",
    wheelbase: 100,
    curbweight: 2500,
    enginetype: "ohc",
    cylindernumber: "four",
    enginesize: 130,
    fuelsystem: "mpfi",
    boreratio: 3.3,
    stroke: 3.2,
    compressionratio: 9.0,
    horsepower: 110,
    peakrpm: 5000,
    citympg: 25,
    highwaympg: 30,
  })

  const [prediction, setPrediction] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    handleChange(name, value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to prediction model
    try {
      // In a real app, you would send the data to your backend
      setTimeout(() => {
        // Mock prediction result
        const predictedPrice = Math.floor(10000 + Math.random() * 20000)
        setPrediction({
          price: predictedPrice,
          formattedPrice: `$${predictedPrice.toLocaleString()}`,
          confidence: 0.92,
          factors: [
            { name: "Engine Size", impact: "high", direction: "positive" },
            { name: "Horsepower", impact: "high", direction: "positive" },
            { name: "Fuel Efficiency", impact: "medium", direction: "positive" },
            { name: "Age", impact: "high", direction: "negative" },
          ],
        })
        setIsLoading(false)
      }, 2000)
    } catch (err) {
      console.error("Prediction failed:", err)
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setPrediction(null)
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Car Price Prediction</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="engine">Engine Details</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="basic" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Car Information</CardTitle>
                    <CardDescription>Enter the basic details about the car</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="symboling">Risk Factor (Symboling)</Label>
                        <Select
                          value={formData.symboling.toString()}
                          onValueChange={(value) => handleChange("symboling", Number.parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select risk factor" />
                          </SelectTrigger>
                          <SelectContent>
                            {[-3, -2, -1, 0, 1, 2, 3].map((value) => (
                              <SelectItem key={value} value={value.toString()}>
                                {value} ({value < 0 ? "Safe" : value > 0 ? "Risky" : "Neutral"})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fueltype">Fuel Type</Label>
                        <Select value={formData.fueltype} onValueChange={(value) => handleChange("fueltype", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select fuel type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gas">Gas</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="aspiration">Aspiration</Label>
                        <Select
                          value={formData.aspiration}
                          onValueChange={(value) => handleChange("aspiration", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select aspiration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="std">Standard</SelectItem>
                            <SelectItem value="turbo">Turbo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="doornumber">Number of Doors</Label>
                        <Select
                          value={formData.doornumber}
                          onValueChange={(value) => handleChange("doornumber", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select door number" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="two">Two</SelectItem>
                            <SelectItem value="four">Four</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="carbody">Car Body</Label>
                        <Select value={formData.carbody} onValueChange={(value) => handleChange("carbody", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select car body" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedan">Sedan</SelectItem>
                            <SelectItem value="hatchback">Hatchback</SelectItem>
                            <SelectItem value="wagon">Wagon</SelectItem>
                            <SelectItem value="hardtop">Hardtop</SelectItem>
                            <SelectItem value="convertible">Convertible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="drivewheel">Drive Wheel</Label>
                        <Select
                          value={formData.drivewheel}
                          onValueChange={(value) => handleChange("drivewheel", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select drive wheel" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fwd">Front Wheel Drive</SelectItem>
                            <SelectItem value="rwd">Rear Wheel Drive</SelectItem>
                            <SelectItem value="4wd">Four Wheel Drive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="enginelocation">Engine Location</Label>
                        <Select
                          value={formData.enginelocation}
                          onValueChange={(value) => handleChange("enginelocation", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select engine location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="front">Front</SelectItem>
                            <SelectItem value="rear">Rear</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="wheelbase">Wheelbase (inches)</Label>
                        <Input
                          id="wheelbase"
                          name="wheelbase"
                          type="number"
                          value={formData.wheelbase}
                          onChange={handleInputChange}
                          step="0.1"
                          min="80"
                          max="120"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="curbweight">Curb Weight (lbs)</Label>
                        <Input
                          id="curbweight"
                          name="curbweight"
                          type="number"
                          value={formData.curbweight}
                          onChange={handleInputChange}
                          step="10"
                          min="1500"
                          max="4000"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="engine" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Engine Specifications</CardTitle>
                    <CardDescription>Enter details about the car's engine</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="enginetype">Engine Type</Label>
                        <Select
                          value={formData.enginetype}
                          onValueChange={(value) => handleChange("enginetype", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select engine type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dohc">DOHC</SelectItem>
                            <SelectItem value="ohc">OHC</SelectItem>
                            <SelectItem value="ohcv">OHCV</SelectItem>
                            <SelectItem value="ohcf">OHCF</SelectItem>
                            <SelectItem value="l">L</SelectItem>
                            <SelectItem value="rotor">Rotor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cylindernumber">Number of Cylinders</Label>
                        <Select
                          value={formData.cylindernumber}
                          onValueChange={(value) => handleChange("cylindernumber", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select cylinder number" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="two">Two</SelectItem>
                            <SelectItem value="three">Three</SelectItem>
                            <SelectItem value="four">Four</SelectItem>
                            <SelectItem value="five">Five</SelectItem>
                            <SelectItem value="six">Six</SelectItem>
                            <SelectItem value="eight">Eight</SelectItem>
                            <SelectItem value="twelve">Twelve</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="enginesize">Engine Size (cubic inches)</Label>
                        <Input
                          id="enginesize"
                          name="enginesize"
                          type="number"
                          value={formData.enginesize}
                          onChange={handleInputChange}
                          min="60"
                          max="300"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fuelsystem">Fuel System</Label>
                        <Select
                          value={formData.fuelsystem}
                          onValueChange={(value) => handleChange("fuelsystem", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select fuel system" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mpfi">Multi-Point Fuel Injection</SelectItem>
                            <SelectItem value="2bbl">2-Barrel Carburetor</SelectItem>
                            <SelectItem value="1bbl">1-Barrel Carburetor</SelectItem>
                            <SelectItem value="4bbl">4-Barrel Carburetor</SelectItem>
                            <SelectItem value="idi">Indirect Injection</SelectItem>
                            <SelectItem value="spdi">SPDI</SelectItem>
                            <SelectItem value="spfi">SPFI</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="boreratio">Bore Ratio</Label>
                        <Input
                          id="boreratio"
                          name="boreratio"
                          type="number"
                          value={formData.boreratio}
                          onChange={handleInputChange}
                          step="0.1"
                          min="2.5"
                          max="4.0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stroke">Stroke</Label>
                        <Input
                          id="stroke"
                          name="stroke"
                          type="number"
                          value={formData.stroke}
                          onChange={handleInputChange}
                          step="0.1"
                          min="2.0"
                          max="4.0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="compressionratio">Compression Ratio</Label>
                        <Input
                          id="compressionratio"
                          name="compressionratio"
                          type="number"
                          value={formData.compressionratio}
                          onChange={handleInputChange}
                          step="0.1"
                          min="7.0"
                          max="23.0"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Enter the performance details of the car</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="horsepower">Horsepower</Label>
                        <Input
                          id="horsepower"
                          name="horsepower"
                          type="number"
                          value={formData.horsepower}
                          onChange={handleInputChange}
                          min="50"
                          max="300"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="peakrpm">Peak RPM</Label>
                        <Input
                          id="peakrpm"
                          name="peakrpm"
                          type="number"
                          value={formData.peakrpm}
                          onChange={handleInputChange}
                          min="4000"
                          max="7000"
                          step="100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="citympg">City MPG</Label>
                        <Input
                          id="citympg"
                          name="citympg"
                          type="number"
                          value={formData.citympg}
                          onChange={handleInputChange}
                          min="10"
                          max="50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="highwaympg">Highway MPG</Label>
                        <Input
                          id="highwaympg"
                          name="highwaympg"
                          type="number"
                          value={formData.highwaympg}
                          onChange={handleInputChange}
                          min="15"
                          max="55"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Calculating..." : "Predict Price"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </form>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Price Prediction</CardTitle>
              <CardDescription>Your estimated car value</CardDescription>
            </CardHeader>
            <CardContent>
              {prediction ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Estimated Value</div>
                    <div className="text-4xl font-bold text-green-600 flex items-center justify-center">
                      <DollarSign className="h-6 w-6" />
                      {prediction.formattedPrice}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Confidence: {Math.round(prediction.confidence * 100)}%
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Info className="h-4 w-4 mr-1" /> Key Factors
                    </h4>
                    <ul className="space-y-2">
                      {prediction.factors.map((factor, index) => (
                        <li key={index} className="flex items-center justify-between text-sm">
                          <span>{factor.name}</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              factor.impact === "high"
                                ? "bg-blue-100 text-blue-800"
                                : factor.impact === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {factor.impact} {factor.direction === "positive" ? "↑" : "↓"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Note</AlertTitle>
                    <AlertDescription>
                      This is an estimated value based on the provided information. Actual market value may vary.
                    </AlertDescription>
                  </Alert>

                  <Button variant="outline" className="w-full" onClick={resetForm}>
                    Reset
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <Car className="h-12 w-12 mx-auto text-gray-300" />
                  <p className="text-gray-500">
                    Fill out the form and click "Predict Price" to get an estimated value for your car.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

