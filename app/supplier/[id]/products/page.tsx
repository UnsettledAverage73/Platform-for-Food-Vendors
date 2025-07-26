"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Product {
  _id: string
  name: string
  category: string
  price: number
  unit: string
  stock: number
  description: string
}

export default function SupplierProductsPage() {
  const router = useRouter()
  const params = useParams()
  const supplierId = params?.id as string
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!supplierId) return
    const fetchProducts = async () => {
      setLoading(true)
      setError("")
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const token = localStorage.getItem("auth-token")
        const res = await fetch(`${API_URL}/api/suppliers/${supplierId}/products`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        })
        if (!res.ok) throw new Error("Failed to fetch products")
        const data = await res.json()
        setProducts(data)
      } catch (err: any) {
        setError(err.message || "Error fetching products")
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [supplierId])

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Supplier Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="mb-4">
            <Link href="/vendor/dashboard">Back to Dashboard</Link>
          </Button>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : products.length === 0 ? (
            <div>No products found for this supplier.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell>{product.unit}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 