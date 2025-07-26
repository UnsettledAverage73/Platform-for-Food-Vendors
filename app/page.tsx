import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Users, TrendingUp, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">BazarBuddy</h1>
          </div>
          <div className="space-x-4">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Empowering India's Street Food
            <span className="text-orange-500"> Vendors</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with trusted suppliers, source quality raw materials at affordable prices, and grow your street food
            business with BazarBuddy's digital platform.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild>
              <Link href="/register?role=vendor">I'm a Vendor</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register?role=supplier">I'm a Supplier</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose BazarBuddy?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <ShoppingCart className="w-10 h-10 text-orange-500 mb-2" />
                <CardTitle>Easy Ordering</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Browse products, compare prices, and place orders with just a few clicks.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-10 h-10 text-green-500 mb-2" />
                <CardTitle>Trusted Suppliers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All suppliers are verified with KYC documentation and customer ratings.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="w-10 h-10 text-blue-500 mb-2" />
                <CardTitle>Best Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Compare prices across suppliers and get the best deals for your business.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-10 h-10 text-purple-500 mb-2" />
                <CardTitle>Group Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Team up with other vendors for bulk orders and better pricing.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
          <p className="text-xl mb-8 opacity-90">Join thousands of vendors and suppliers already using BazarBuddy</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold">BazarBuddy</span>
          </div>
          <p className="text-gray-400">Digitally empowering Indian street food vendors since 2024</p>
        </div>
      </footer>
    </div>
  )
}
