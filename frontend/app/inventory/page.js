"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Car, Plus, Search, Edit, Trash2, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function InventoryPage() {
  // Sample inventory data
  const [inventory, setInventory] = useState([
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: 2018,
      price: 15200,
      status: "available",
      fueltype: "gas",
      mileage: 45000,
      color: "Silver",
      lastUpdated: "2023-03-10",
    },
    {
      id: 2,
      make: "Honda",
      model: "Civic",
      year: 2020,
      price: 18500,
      status: "available",
      fueltype: "gas",
      mileage: 22000,
      color: "Blue",
      lastUpdated: "2023-03-12",
    },
    {
      id: 3,
      make: "Ford",
      model: "Mustang",
      year: 2017,
      price: 22800,
      status: "sold",
      fueltype: "gas",
      mileage: 35000,
      color: "Red",
      lastUpdated: "2023-02-28",
    },
    {
      id: 4,
      make: "Tesla",
      model: "Model 3",
      year: 2021,
      price: 42000,
      status: "available",
      fueltype: "electric",
      mileage: 12000,
      color: "White",
      lastUpdated: "2023-03-15",
    },
    {
      id: 5,
      make: "BMW",
      model: "3 Series",
      year: 2019,
      price: 32500,
      status: "maintenance",
      fueltype: "gas",
      mileage: 28000,
      color: "Black",
      lastUpdated: "2023-03-05",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCar, setNewCar] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    price: "",
    status: "available",
    fueltype: "gas",
    mileage: "",
    color: "",
  })

  const handleAddCar = () => {
    const id = inventory.length > 0 ? Math.max(...inventory.map((car) => car.id)) + 1 : 1
    const newCarWithId = {
      ...newCar,
      id,
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    setInventory([...inventory, newCarWithId])
    setIsAddDialogOpen(false)
    setNewCar({
      make: "",
      model: "",
      year: new Date().getFullYear(),
      price: "",
      status: "available",
      fueltype: "gas",
      mileage: "",
      color: "",
    })
  }

  const handleDeleteCar = (id) => {
    setInventory(inventory.filter((car) => car.id !== id))
  }

  const filteredInventory = inventory.filter((car) => {
    // Apply search filter
    const searchMatch =
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.year.toString().includes(searchTerm)

    // Apply status filter
    const statusMatch = statusFilter === "all" || car.status === statusFilter

    return searchMatch && statusMatch
  })

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "available", label: "Available" },
    { value: "sold", label: "Sold" },
    { value: "maintenance", label: "In Maintenance" },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Available</Badge>
      case "sold":
        return <Badge className="bg-blue-500">Sold</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-500">Maintenance</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Car Inventory</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Car
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Car</DialogTitle>
              <DialogDescription>Enter the details of the car you want to add to your inventory.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Input
                    id="make"
                    value={newCar.make}
                    onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
                    placeholder="e.g. Toyota"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={newCar.model}
                    onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                    placeholder="e.g. Camry"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={newCar.year}
                    onChange={(e) => setNewCar({ ...newCar, year: Number.parseInt(e.target.value) })}
                    placeholder="e.g. 2020"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newCar.price}
                    onChange={(e) => setNewCar({ ...newCar, price: Number.parseInt(e.target.value) })}
                    placeholder="e.g. 20000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newCar.status} onValueChange={(value) => setNewCar({ ...newCar, status: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                      <SelectItem value="maintenance">In Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fueltype">Fuel Type</Label>
                  <Select value={newCar.fueltype} onValueChange={(value) => setNewCar({ ...newCar, fueltype: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gas">Gas</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mileage">Mileage</Label>
                  <Input
                    id="mileage"
                    type="number"
                    value={newCar.mileage}
                    onChange={(e) => setNewCar({ ...newCar, mileage: Number.parseInt(e.target.value) })}
                    placeholder="e.g. 15000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    value={newCar.color}
                    onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
                    placeholder="e.g. Red"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCar}>Add Car</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Your Cars</CardTitle>
          <CardDescription>View, add, edit, or remove cars from your inventory.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by make, model, or year..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Car</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((car) => (
                    <TableRow key={car.id}>
                      <TableCell>
                        <div className="font-medium">
                          {car.make} {car.model}
                        </div>
                        <div className="text-sm text-gray-500">
                          {car.color}, {car.fueltype}, {car.mileage.toLocaleString()} miles
                        </div>
                      </TableCell>
                      <TableCell>{car.year}</TableCell>
                      <TableCell>${car.price.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(car.status)}</TableCell>
                      <TableCell>{car.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Car className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeleteCar(car.id)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No cars found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredInventory.length} of {inventory.length} cars
          </div>
          <Button variant="outline" asChild>
            <Link href="/predict">Predict New Car Price</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

