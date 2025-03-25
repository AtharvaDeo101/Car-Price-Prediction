import { NextResponse } from "next/server"

// This would connect to a database in a real application
// For this example, we'll use the same in-memory store from the main inventory route
// In a real app, you would import a database client or use a shared data store

// Placeholder for our inventory data (this would be a database in a real app)
let inventory = [
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

// GET a specific inventory item
export async function GET(request, { params }) {
  const id = Number.parseInt(params.id)

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 })
  }

  const item = inventory.find((item) => item.id === id)

  if (!item) {
    return NextResponse.json({ error: "Inventory item not found" }, { status: 404 })
  }

  return NextResponse.json(item)
}

// PUT (update) a specific inventory item
export async function PUT(request, { params }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 })
    }

    const itemIndex = inventory.findIndex((item) => item.id === id)

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Inventory item not found" }, { status: 404 })
    }

    const data = await request.json()

    // Update the item
    inventory[itemIndex] = {
      ...inventory[itemIndex],
      ...data,
      id, // Ensure ID doesn't change
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    return NextResponse.json(inventory[itemIndex])
  } catch (error) {
    console.error("Error updating inventory item:", error)
    return NextResponse.json({ error: "Failed to update inventory item" }, { status: 500 })
  }
}

// DELETE a specific inventory item
export async function DELETE(request, { params }) {
  const id = Number.parseInt(params.id)

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 })
  }

  const itemIndex = inventory.findIndex((item) => item.id === id)

  if (itemIndex === -1) {
    return NextResponse.json({ error: "Inventory item not found" }, { status: 404 })
  }

  // Remove the item
  const deletedItem = inventory[itemIndex]
  inventory = inventory.filter((item) => item.id !== id)

  return NextResponse.json({
    message: "Inventory item deleted successfully",
    deletedItem,
  })
}

