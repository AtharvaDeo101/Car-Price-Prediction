import { NextResponse } from "next/server"

// In a real application, this would connect to a database
// For this example, we'll use an in-memory store
const inventory = [
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
]

// GET all inventory items
export async function GET() {
  return NextResponse.json(inventory)
}

// POST a new inventory item
export async function POST(request) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = ["make", "model", "year", "price", "status", "fueltype"]

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Create new inventory item
    const newId = inventory.length > 0 ? Math.max(...inventory.map((item) => item.id)) + 1 : 1
    const newItem = {
      id: newId,
      ...data,
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    inventory.push(newItem)

    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    console.error("Error adding inventory item:", error)
    return NextResponse.json({ error: "Failed to add inventory item" }, { status: 500 })
  }
}

