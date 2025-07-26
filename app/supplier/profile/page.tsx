"use client"

import { cn } from "@/lib/utils"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ShoppingCart, ArrowLeft, Upload, FileText, CheckCircle, Star, User, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface KYCDocument {
  id: string
  name: string
  type: string
  status: "pending" | "approved" | "rejected"
  uploadDate: string
  file?: File
}

interface Rating {
  id: string
  vendorName: string
  rating: number
  review: string
  date: string
  orderId: string
}

export default function SupplierProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    businessName: "",
    gstNumber: "",
    description: "",
  })
  const [kycDocuments, setKycDocuments] = useState<KYCDocument[]>([])
  const [ratings, setRatings] = useState<Rating[]>([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!user || user.role !== "supplier") {
      router.push("/login")
      return
    }

    // Initialize profile with user data
    setProfile({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      address: "",
      businessName: "",
      gstNumber: "",
      description: "",
    })

    // Mock KYC documents
    setKycDocuments([
      {
        id: "1",
        name: "Aadhar Card",
        type: "identity",
        status: "approved",
        uploadDate: "2024-01-05",
      },
      {
        id: "2",
        name: "GST Certificate",
        type: "business",
        status: "pending",
        uploadDate: "2024-01-10",
      },
      {
        id: "3",
        name: "Bank Statement",
        type: "financial",
        status: "rejected",
        uploadDate: "2024-01-08",
      },
    ])

    // Mock ratings
    setRatings([
      {
        id: "1",
        vendorName: "Raj Kumar",
        rating: 5,
        review: "Excellent quality rice, delivered on time!",
        date: "2024-01-10",
        orderId: "ORD001",
      },
      {
        id: "2",
        vendorName: "Priya Devi",
        rating: 4,
        review: "Good quality vegetables, will order again.",
        date: "2024-01-08",
        orderId: "ORD002",
      },
      {
        id: "3",
        vendorName: "Amit Singh",
        rating: 5,
        review: "Fresh spices with great aroma. Highly recommended!",
        date: "2024-01-06",
        orderId: "ORD003",
      },
      {
        id: "4",
        vendorName: "Sunita Sharma",
        rating: 4,
        review: "Timely delivery and good packaging.",
        date: "2024-01-04",
        orderId: "ORD004",
      },
    ])
  }, [user, router])

  const handleProfileUpdate = () => {
    toast({
      title: "Profile updated!",
      description: "Your profile information has been saved successfully.",
    })
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload JPG, PNG, or PDF files only.",
        variant: "destructive",
      })
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload files smaller than 5MB.",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    // Simulate upload
    setTimeout(() => {
      const newDoc: KYCDocument = {
        id: Date.now().toString(),
        name: file.name,
        type: docType,
        status: "pending",
        uploadDate: new Date().toISOString().split("T")[0],
        file,
      }

      setKycDocuments((prev) => [...prev, newDoc])
      setUploading(false)

      toast({
        title: "Document uploaded!",
        description: "Your document has been uploaded and is under review.",
      })
    }, 2000)
  }

  const getKYCProgress = () => {
    const approvedDocs = kycDocuments.filter((doc) => doc.status === "approved").length
    const totalRequiredDocs = 3 // Aadhar, GST, Bank Statement
    return (approvedDocs / totalRequiredDocs) * 100
  }

  const getAverageRating = () => {
    if (ratings.length === 0) return 0
    const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0)
    return (sum / ratings.length).toFixed(1)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "pending":
        return "secondary"
      case "rejected":
        return "destructive"
      default:
        return "secondary"
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link href="/supplier/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Supplier Profile</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your business details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      placeholder="Your business name"
                      value={profile.businessName}
                      onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your complete business address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input
                    id="gstNumber"
                    placeholder="Enter your GST number"
                    value={profile.gstNumber}
                    onChange={(e) => setProfile({ ...profile, gstNumber: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your business and products"
                    value={profile.description}
                    onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <Button onClick={handleProfileUpdate} className="w-full">
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            {/* KYC Documents */}
            <Card>
              <CardHeader>
                <CardTitle>KYC Documents</CardTitle>
                <CardDescription>Upload required documents for verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Verification Progress</span>
                    <span className="text-sm text-gray-600">{Math.round(getKYCProgress())}% Complete</span>
                  </div>
                  <Progress value={getKYCProgress()} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Aadhar Card Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <h4 className="font-medium mb-2">Aadhar Card</h4>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, "identity")}
                      className="hidden"
                      id="aadhar-upload"
                    />
                    <Label htmlFor="aadhar-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm" disabled={uploading}>
                        <Upload className="w-4 h-4 mr-2" />
                        {uploading ? "Uploading..." : "Upload"}
                      </Button>
                    </Label>
                  </div>

                  {/* GST Certificate Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <h4 className="font-medium mb-2">GST Certificate</h4>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, "business")}
                      className="hidden"
                      id="gst-upload"
                    />
                    <Label htmlFor="gst-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm" disabled={uploading}>
                        <Upload className="w-4 h-4 mr-2" />
                        {uploading ? "Uploading..." : "Upload"}
                      </Button>
                    </Label>
                  </div>

                  {/* Bank Statement Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <h4 className="font-medium mb-2">Bank Statement</h4>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, "financial")}
                      className="hidden"
                      id="bank-upload"
                    />
                    <Label htmlFor="bank-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm" disabled={uploading}>
                        <Upload className="w-4 h-4 mr-2" />
                        {uploading ? "Uploading..." : "Upload"}
                      </Button>
                    </Label>
                  </div>
                </div>

                {/* Uploaded Documents List */}
                <div className="space-y-2">
                  <h4 className="font-medium">Uploaded Documents</h4>
                  {kycDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-600">Uploaded on {doc.uploadDate}</p>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(doc.status) as any}>
                        {doc.status === "approved" && <CheckCircle className="w-3 h-3 mr-1" />}
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  <p className="text-gray-600">Supplier</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>Mumbai, India</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ratings & Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Ratings & Reviews</CardTitle>
                <CardDescription>What vendors say about you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold">{getAverageRating()}</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-5 h-5",
                          i < Math.floor(Number(getAverageRating())) ? "text-yellow-400 fill-current" : "text-gray-300",
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Based on {ratings.length} reviews</p>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {ratings.map((rating) => (
                    <div key={rating.id} className="border-b pb-3 last:border-b-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm">{rating.vendorName}</span>
                        <div className="flex">
                          {[...Array(rating.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{rating.review}</p>
                      <p className="text-xs text-gray-500">{rating.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
