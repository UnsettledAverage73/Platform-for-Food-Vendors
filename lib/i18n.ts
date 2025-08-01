export const languages = {
  en: "English",
  hi: "हिंदी",
  mr: "मराठी",
  gu: "ગુજરાતી",
  ta: "தமிழ்",
  te: "తెలుగు",
  bn: "বাংলা",
  kn: "ಕನ್ನಡ",
  ml: "മലയാളം",
  pa: "ਪੰਜਾਬੀ",
} as const

export type Language = keyof typeof languages

export const translations = {
  en: {
    // Common
    common: {
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      back: "Back",
      next: "Next",
      submit: "Submit",
      close: "Close",
      yes: "Yes",
      no: "No",
      ok: "OK",
      error: "Error",
      success: "Success",
      warning: "Warning",
      info: "Information",
    },

    // Navigation
    nav: {
      dashboard: "Dashboard",
      orders: "Orders",
      cart: "Cart",
      profile: "Profile",
      logout: "Logout",
      login: "Login",
      register: "Register",
    },

    // Auth
    auth: {
      welcomeBack: "Welcome Back",
      signInToAccount: "Sign in to your account to continue",
      createAccount: "Create Account",
      joinBazarBuddy: "Join BazarBuddy and start your journey",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      fullName: "Full Name",
      phoneNumber: "Phone Number",
      iAm: "I am a:",
      streetFoodVendor: "Street Food Vendor",
      rawMaterialSupplier: "Raw Material Supplier",
      signIn: "Sign In",
      signUp: "Sign Up",
      signingIn: "Signing in...",
      creatingAccount: "Creating account...",
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: "Already have an account?",
      demoAccounts: "Demo Accounts:",
      vendor: "Vendor",
      supplier: "Supplier",
      enterEmail: "Enter your email",
      enterPassword: "Enter your password",
      createPassword: "Create a password",
      confirmYourPassword: "Confirm your password",
      enterFullName: "Enter your full name",
    },

    // Dashboard
    dashboard: {
      welcomeBack: "Welcome back",
      findTrustedSuppliers: "Find trusted suppliers for your street food business",
      manageProducts: "Manage your products and orders",
      searchSuppliers: "Search suppliers or products...",
      filterByCategory: "Filter by category",
      allCategories: "All Categories",
      vegetables: "Vegetables",
      fruits: "Fruits",
      spices: "Spices",
      riceGrains: "Rice & Grains",
      cookingOil: "Cooking Oil",
      rating: "Rating",
      price: "Price",
      deliveryTime: "Delivery Time",
      compare: "Compare",
      viewProducts: "View Products",
      verified: "Verified",
      categories: "Categories",
      products: "Products",
      avgPrice: "Avg Price",
      delivery: "Delivery",
      noSuppliersFound: "No suppliers found",
      adjustSearchCriteria: "Try adjusting your search or filter criteria",
    },

    // Cart
    cart: {
      shoppingCart: "Shopping Cart",
      cartItems: "Cart Items",
      reviewProducts: "Review your selected products",
      cartEmpty: "Your cart is empty",
      addProducts: "Add some products to get started",
      browseSuppliers: "Browse Suppliers",
      groupOrder: "Group Order",
      teamUpVendors: "Team up with other vendors for better pricing",
      joinActiveGroup: "Join Active Group",
      members: "members",
      deliveryDate: "Delivery Date",
      pickDate: "Pick a date",
      subtotal: "Subtotal",
      deliveryFee: "Delivery Fee",
      groupDiscount: "Group Discount",
      total: "Total",
      placeOrder: "Place Order",
      proceedToPayment: "Proceed to Payment",
      payment: "Payment",
      completePayment: "Complete your payment to place the order",
      totalAmount: "Total Amount",
      groupDiscountApplied: "Group discount applied",
      paymentMethod: "Payment Method",
      upiPayment: "UPI Payment",
      creditDebitCard: "Credit/Debit Card",
      upiId: "UPI ID",
      processingPayment: "Processing Payment...",
      pay: "Pay",
      paymentSuccessful: "Payment Successful!",
      orderPlaced: "Your order has been placed and sent to suppliers for confirmation.",
      redirectingToOrders: "Redirecting to orders page...",
    },

    // Orders
    orders: {
      myOrders: "My Orders",
      allOrders: "All Orders",
      pending: "Pending",
      confirmed: "Confirmed",
      shipped: "Shipped",
      delivered: "Delivered",
      rejected: "Rejected",
      order: "Order",
      groupOrder: "Group Order",
      orderedOn: "Ordered on",
      items: "Items",
      orderProgress: "Order Progress",
      complete: "Complete",
      orderPlaced: "Order Placed",
      orderConfirmed: "Order Confirmed",
      preparingOrder: "Preparing Order",
      outForDelivery: "Out for Delivery",
      rejectionReason: "Rejection Reason",
      yourRating: "Your Rating",
      deliveryDate: "Delivery Date",
      viewDetails: "View Details",
      rateReview: "Rate & Review",
      orderDetails: "Order Details",
      completeOrderInfo: "Complete order information",
      supplierInfo: "Supplier Information",
      orderItems: "Order Items",
      noOrdersFound: "No orders found",
      noOrdersYet: "You haven't placed any orders yet",
      noOrdersAtMoment: "No orders at the moment",
      rateSupplier: "Rate Supplier",
      shareExperience: "Share your experience with this supplier",
      reviewOptional: "Review (Optional)",
      shareExperienceText: "Share your experience with this supplier...",
      submitRating: "Submit Rating",
      ratingSubmitted: "Rating submitted!",
      thankYouFeedback: "Thank you for your feedback",
    },

    // Supplier Dashboard
    supplier: {
      supplierDashboard: "Supplier Dashboard",
      totalProducts: "Total Products",
      pendingOrders: "Pending Orders",
      totalRevenue: "Total Revenue",
      avgRating: "Avg Rating",
      myProducts: "My Products",
      manageProductCatalog: "Manage your product catalog",
      addProduct: "Add Product",
      addNewProduct: "Add New Product",
      addProductToCatalog: "Add a new product to your catalog",
      productName: "Product Name",
      category: "Category",
      unit: "Unit",
      stockQuantity: "Stock Quantity",
      description: "Description",
      productImage: "Product Image",
      clickToUpload: "Click to upload product image",
      fileTypes: "PNG, JPG, WebP up to 2MB",
      enterProductName: "Enter product name",
      selectCategory: "Select category",
      pricePerUnit: "Price per unit",
      selectUnit: "Select unit",
      availableQuantity: "Available quantity",
      productDescription: "Product description",
      kilogram: "Kilogram",
      gram: "Gram",
      piece: "Piece",
      liter: "Liter",
      product: "Product",
      stock: "Stock",
      actions: "Actions",
      recentOrders: "Recent Orders",
      manageIncomingOrders: "Manage incoming orders from vendors",
      accept: "Accept",
      reject: "Reject",
      rejectOrder: "Reject Order",
      provideRejectionReason: "Please provide a reason for rejecting this order",
      reasonForRejection: "Reason for rejection",
      explainRejection: "Please explain why you're rejecting this order...",
      rejectOrderBtn: "Reject Order",
      productAdded: "Product added successfully!",
      productAddedDesc: "Your product has been added to the catalog.",
      orderAccepted: "Order confirmed!",
      orderRejected: "Order rejected!",
      orderActionDesc: "Order has been",
      missingFields: "Missing required fields",
      fillAllFields: "Please fill in all required fields.",
      rejectionReasonRequired: "Rejection reason required",
      provideReason: "Please provide a reason for rejecting the order.",
      invalidFileType: "Invalid file type",
      uploadValidImages: "Please upload JPG, PNG, or WebP images only.",
      fileTooLarge: "File too large",
      uploadSmallerImages: "Please upload images smaller than 2MB.",
    },

    // Profile
    profile: {
      supplierProfile: "Supplier Profile",
      profileInfo: "Profile Information",
      updateBusinessDetails: "Update your business details and contact information",
      businessName: "Business Name",
      yourBusinessName: "Your business name",
      businessAddress: "Business Address",
      enterCompleteAddress: "Enter your complete business address",
      gstNumber: "GST Number",
      enterGstNumber: "Enter your GST number",
      businessDescription: "Business Description",
      describeYourBusiness: "Describe your business and products",
      updateProfile: "Update Profile",
      kycDocuments: "KYC Documents",
      uploadRequiredDocs: "Upload required documents for verification",
      verificationProgress: "Verification Progress",
      aadharCard: "Aadhar Card",
      gstCertificate: "GST Certificate",
      bankStatement: "Bank Statement",
      upload: "Upload",
      uploading: "Uploading...",
      uploadedDocuments: "Uploaded Documents",
      uploadedOn: "Uploaded on",
      approved: "Approved",
      profileSummary: "Profile Summary",
      ratingsReviews: "Ratings & Reviews",
      whatVendorsSay: "What vendors say about you",
      basedOnReviews: "Based on reviews",
      profileUpdated: "Profile updated!",
      profileSaved: "Your profile information has been saved successfully.",
      documentUploaded: "Document uploaded!",
      documentUnderReview: "Your document has been uploaded and is under review.",
      invalidDocType: "Invalid file type",
      uploadValidDocs: "Please upload JPG, PNG, or PDF files only.",
      docTooLarge: "File too large",
      uploadSmallerDocs: "Please upload files smaller than 5MB.",
    },

    // Notifications
    notifications: {
      loginSuccessful: "Login successful!",
      welcomeBack: "Welcome back to BazarBuddy",
      loginFailed: "Login failed",
      invalidCredentials: "Invalid email or password",
      registrationSuccessful: "Registration successful!",
      welcomeToBazarBuddy: "Welcome to BazarBuddy",
      registrationFailed: "Registration failed",
      tryAgain: "Please try again",
      somethingWentWrong: "Something went wrong. Please try again.",
      passwordMismatch: "Password mismatch",
      passwordsDontMatch: "Passwords do not match",
      passwordTooShort: "Password too short",
      passwordMinLength: "Password must be at least 6 characters",
      selectDeliveryDate: "Please select delivery date",
      chooseDeliveryDate: "Choose a delivery date to proceed with your order",
      cartIsEmpty: "Cart is empty",
      addItemsToCart: "Add some items to your cart before placing an order",
      upiIdRequired: "UPI ID required",
      enterUpiId: "Please enter your UPI ID",
      paymentSuccessful: "Payment successful!",
      orderPlacedSuccessfully: "Your order has been placed successfully",
      pleaseProvideRating: "Please provide a rating",
      selectStars: "Select at least 1 star to rate the supplier",
    },
  },

  hi: {
    // Common
    common: {
      loading: "लोड हो रहा है...",
      save: "सेव करें",
      cancel: "रद्द करें",
      delete: "डिलीट करें",
      edit: "एडिट करें",
      add: "जोड़ें",
      search: "खोजें",
      filter: "फिल्टर",
      sort: "सॉर्ट करें",
      back: "वापस",
      next: "आगे",
      submit: "सबमिट करें",
      close: "बंद करें",
      yes: "हाँ",
      no: "नहीं",
      ok: "ठीक है",
      error: "त्रुटि",
      success: "सफलता",
      warning: "चेतावनी",
      info: "जानकारी",
    },

    // Navigation
    nav: {
      dashboard: "डैशबोर्ड",
      orders: "ऑर्डर",
      cart: "कार्ट",
      profile: "प्रोफाइल",
      logout: "लॉगआउट",
      login: "लॉगिन",
      register: "रजिस्टर",
    },

    // Auth
    auth: {
      welcomeBack: "वापस स्वागत है",
      signInToAccount: "जारी रखने के लिए अपने खाते में साइन इन करें",
      createAccount: "खाता बनाएं",
      joinBazarBuddy: "BazarBuddy में शामिल हों और अपनी यात्रा शुरू करें",
      email: "ईमेल",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      fullName: "पूरा नाम",
      phoneNumber: "फोन नंबर",
      iAm: "मैं हूँ:",
      streetFoodVendor: "स्ट्रीट फूड विक्रेता",
      rawMaterialSupplier: "कच्चा माल आपूर्तिकर्ता",
      signIn: "साइन इन",
      signUp: "साइन अप",
      signingIn: "साइन इन हो रहा है...",
      creatingAccount: "खाता बनाया जा रहा है...",
      dontHaveAccount: "खाता नहीं है?",
      alreadyHaveAccount: "पहले से खाता है?",
      demoAccounts: "डेमो खाते:",
      vendor: "विक्रेता",
      supplier: "आपूर्तिकर्ता",
      enterEmail: "अपना ईमेल दर्ज करें",
      enterPassword: "अपना पासवर्ड दर्ज करें",
      createPassword: "पासवर्ड बनाएं",
      confirmYourPassword: "अपने पासवर्ड की पुष्टि करें",
      enterFullName: "अपना पूरा नाम दर्ज करें",
    },

    // Dashboard
    dashboard: {
      welcomeBack: "वापस स्वागत है",
      findTrustedSuppliers: "अपने स्ट्रीट फूड व्यवसाय के लिए विश्वसनीय आपूर्तिकर्ता खोजें",
      manageProducts: "अपने उत्पादों और ऑर्डर का प्रबंधन करें",
      searchSuppliers: "आपूर्तिकर्ता या उत्पाद खोजें...",
      filterByCategory: "श्रेणी के अनुसार फिल्टर करें",
      allCategories: "सभी श्रेणियां",
      vegetables: "सब्जियां",
      fruits: "फल",
      spices: "मसाले",
      riceGrains: "चावल और अनाज",
      cookingOil: "खाना पकाने का तेल",
      rating: "रेटिंग",
      price: "कीमत",
      deliveryTime: "डिलीवरी समय",
      compare: "तुलना करें",
      viewProducts: "उत्पाद देखें",
      verified: "सत्यापित",
      categories: "श्रेणियां",
      products: "उत्पाद",
      avgPrice: "औसत कीमत",
      delivery: "डिलीवरी",
      noSuppliersFound: "कोई आपूर्तिकर्ता नहीं मिला",
      adjustSearchCriteria: "अपनी खोज या फिल्टर मानदंड समायोजित करने का प्रयास करें",
    },

    // Cart
    cart: {
      shoppingCart: "शॉपिंग कार्ट",
      cartItems: "कार्ट आइटम",
      reviewProducts: "अपने चयनित उत्पादों की समीक्षा करें",
      cartEmpty: "आपका कार्ट खाली है",
      addProducts: "शुरू करने के लिए कुछ उत्पाद जोड़ें",
      browseSuppliers: "आपूर्तिकर्ता ब्राउज़ करें",
      groupOrder: "ग्रुप ऑर्डर",
      teamUpVendors: "बेहतर कीमत के लिए अन्य विक्रेताओं के साथ मिलें",
      joinActiveGroup: "सक्रिय ग्रुप में शामिल हों",
      members: "सदस्य",
      deliveryDate: "डिलीवरी की तारीख",
      pickDate: "तारीख चुनें",
      subtotal: "उप-योग",
      deliveryFee: "डिलीवरी शुल्क",
      groupDiscount: "ग्रुप छूट",
      total: "कुल",
      placeOrder: "ऑर्डर दें",
      proceedToPayment: "भुगतान के लिए आगे बढ़ें",
      payment: "भुगतान",
      completePayment: "ऑर्डर देने के लिए अपना भुगतान पूरा करें",
      totalAmount: "कुल राशि",
      groupDiscountApplied: "ग्रुप छूट लागू",
      paymentMethod: "भुगतान विधि",
      upiPayment: "UPI भुगतान",
      creditDebitCard: "क्रेडिट/डेबिट कार्ड",
      upiId: "UPI ID",
      processingPayment: "भुगतान प्रक्रिया में...",
      pay: "भुगतान करें",
      paymentSuccessful: "भुगतान सफल!",
      orderPlaced: "आपका ऑर्डर दिया गया है और पुष्टि के लिए आपूर्तिकर्ताओं को भेजा गया है।",
      redirectingToOrders: "ऑर्डर पेज पर रीडायरेक्ट हो रहा है...",
    },

    // Orders
    orders: {
      myOrders: "मेरे ऑर्डर",
      allOrders: "सभी ऑर्डर",
      pending: "लंबित",
      confirmed: "पुष्ट",
      shipped: "भेजा गया",
      delivered: "डिलीवर",
      rejected: "अस्वीकृत",
      order: "ऑर्डर",
      groupOrder: "ग्रुप ऑर्डर",
      orderedOn: "ऑर्डर दिया गया",
      items: "आइटम",
      orderProgress: "ऑर्डर प्रगति",
      complete: "पूर्ण",
      orderPlaced: "ऑर्डर दिया गया",
      orderConfirmed: "ऑर्डर पुष्ट",
      preparingOrder: "ऑर्डर तैयार हो रहा है",
      outForDelivery: "डिलीवरी के लिए निकला",
      rejectionReason: "अस्वीकृति का कारण",
      yourRating: "आपकी रेटिंग",
      deliveryDate: "डिलीवरी की तारीख",
      viewDetails: "विवरण देखें",
      rateReview: "रेट और रिव्यू",
      orderDetails: "ऑर्डर विवरण",
      completeOrderInfo: "पूर्ण ऑर्डर जानकारी",
      supplierInfo: "आपूर्तिकर्ता जानकारी",
      orderItems: "ऑर्डर आइटम",
      noOrdersFound: "कोई ऑर्डर नहीं मिला",
      noOrdersYet: "आपने अभी तक कोई ऑर्डर नहीं दिया है",
      noOrdersAtMoment: "इस समय कोई ऑर्डर नहीं",
      rateSupplier: "आपूर्तिकर्ता को रेट करें",
      shareExperience: "इस आपूर्तिकर्ता के साथ अपना अनुभव साझा करें",
      reviewOptional: "समीक्षा (वैकल्पिक)",
      shareExperienceText: "इस आपूर्तिकर्ता के साथ अपना अनुभव साझा करें...",
      submitRating: "रेटिंग सबमिट करें",
      ratingSubmitted: "रेटिंग सबमिट की गई!",
      thankYouFeedback: "आपकी प्रतिक्रिया के लिए धन्यवाद",
    },

    // Supplier Dashboard
    supplier: {
      supplierDashboard: "आपूर्तिकर्ता डैशबोर्ड",
      totalProducts: "कुल उत्पाद",
      pendingOrders: "लंबित ऑर्डर",
      totalRevenue: "कुल आय",
      avgRating: "औसत रेटिंग",
      myProducts: "मेरे उत्पाद",
      manageProductCatalog: "अपने उत्पाद कैटलॉग का प्रबंधन करें",
      addProduct: "उत्पाद जोड़ें",
      addNewProduct: "नया उत्पाद जोड़ें",
      addProductToCatalog: "अपने कैटलॉग में एक नया उत्पाद जोड़ें",
      productName: "उत्पाद का नाम",
      category: "श्रेणी",
      unit: "इकाई",
      stockQuantity: "स्टॉक मात्रा",
      description: "विवरण",
      productImage: "उत्पाद छवि",
      clickToUpload: "उत्पाद छवि अपलोड करने के लिए क्लिक करें",
      fileTypes: "PNG, JPG, WebP 2MB तक",
      enterProductName: "उत्पाद का नाम दर्ज करें",
      selectCategory: "श्रेणी चुनें",
      pricePerUnit: "प्रति इकाई कीमत",
      selectUnit: "इकाई चुनें",
      availableQuantity: "उपलब्ध मात्रा",
      productDescription: "उत्पाद विवरण",
      kilogram: "किलोग्राम",
      gram: "ग्राम",
      piece: "टुकड़ा",
      liter: "लीटर",
      product: "उत्पाद",
      stock: "स्टॉक",
      actions: "कार्य",
      recentOrders: "हाल के ऑर्डर",
      manageIncomingOrders: "विक्रेताओं से आने वाले ऑर्डर का प्रबंधन करें",
      accept: "स्वीकार करें",
      reject: "अस्वीकार करें",
      rejectOrder: "ऑर्डर अस्वीकार करें",
      provideRejectionReason: "कृपया इस ऑर्डर को अस्वीकार करने का कारण बताएं",
      reasonForRejection: "अस्वीकृति का कारण",
      explainRejection: "कृपया बताएं कि आप इस ऑर्डर को क्यों अस्वीकार कर रहे हैं...",
      rejectOrderBtn: "ऑर्डर अस्वीकार करें",
      productAdded: "उत्पाद सफलतापूर्वक जोड़ा गया!",
      productAddedDesc: "आपका उत्पाद कैटलॉग में जोड़ दिया गया है।",
      orderAccepted: "ऑर्डर पुष्ट!",
      orderRejected: "ऑर्डर अस्वीकृत!",
      orderActionDesc: "ऑर्डर किया गया है",
      missingFields: "आवश्यक फ़ील्ड गुम",
      fillAllFields: "कृपया सभी आवश्यक फ़ील्ड भरें।",
      rejectionReasonRequired: "अस्वीकृति कारण आवश्यक",
      provideReason: "कृपया ऑर्डर अस्वीकार करने का कारण बताएं।",
      invalidFileType: "अमान्य फ़ाइल प्रकार",
      uploadValidImages: "कृपया केवल JPG, PNG, या WebP छवियां अपलोड करें।",
      fileTooLarge: "फ़ाइल बहुत बड़ी",
      uploadSmallerImages: "कृपया 2MB से छोटी छवियां अपलोड करें।",
    },

    // Profile
    profile: {
      supplierProfile: "आपूर्तिकर्ता प्रोफाइल",
      profileInfo: "प्रोफाइल जानकारी",
      updateBusinessDetails: "अपने व्यवसाय विवरण और संपर्क जानकारी अपडेट करें",
      businessName: "व्यवसाय का नाम",
      yourBusinessName: "आपके व्यवसाय का नाम",
      businessAddress: "व्यवसाय का पता",
      enterCompleteAddress: "अपना पूरा व्यवसाय पता दर्ज करें",
      gstNumber: "GST नंबर",
      enterGstNumber: "अपना GST नंबर दर्ज करें",
      businessDescription: "व्यवसाय विवरण",
      describeYourBusiness: "अपने व्यवसाय और उत्पादों का वर्णन करें",
      updateProfile: "प्रोफाइल अपडेट करें",
      kycDocuments: "KYC दस्तावेज",
      uploadRequiredDocs: "सत्यापन के लिए आवश्यक दस्तावेज अपलोड करें",
      verificationProgress: "सत्यापन प्रगति",
      aadharCard: "आधार कार्ड",
      gstCertificate: "GST प्रमाणपत्र",
      bankStatement: "बैंक स्टेटमेंट",
      upload: "अपलोड",
      uploading: "अपलोड हो रहा है...",
      uploadedDocuments: "अपलोड किए गए दस्तावेज",
      uploadedOn: "अपलोड किया गया",
      approved: "अनुमोदित",
      profileSummary: "प्रोफाइल सारांश",
      ratingsReviews: "रेटिंग और समीक्षा",
      whatVendorsSay: "विक्रेता आपके बारे में क्या कहते हैं",
      basedOnReviews: "समीक्षाओं के आधार पर",
      profileUpdated: "प्रोफाइल अपडेट!",
      profileSaved: "आपकी प्रोफाइल जानकारी सफलतापूर्वक सेव हो गई है।",
      documentUploaded: "दस्तावेज अपलोड!",
      documentUnderReview: "आपका दस्तावेज अपलोड हो गया है और समीक्षाधीन है।",
      invalidDocType: "अमान्य फ़ाइल प्रकार",
      uploadValidDocs: "कृपया केवल JPG, PNG, या PDF फ़ाइलें अपलोड करें।",
      docTooLarge: "फ़ाइल बहुत बड़ी",
      uploadSmallerDocs: "कृपया 5MB से छोटी फ़ाइलें अपलोड करें।",
    },

    // Notifications
    notifications: {
      loginSuccessful: "लॉगिन सफल!",
      welcomeBack: "BazarBuddy में वापस स्वागत है",
      loginFailed: "लॉगिन असफल",
      invalidCredentials: "अमान्य ईमेल या पासवर्ड",
      registrationSuccessful: "पंजीकरण सफल!",
      welcomeToBazarBuddy: "BazarBuddy में आपका स्वागत है",
      registrationFailed: "पंजीकरण असफल",
      tryAgain: "कृपया पुनः प्रयास करें",
      somethingWentWrong: "कुछ गलत हुआ। कृपया पुनः प्रयास करें।",
      passwordMismatch: "पासवर्ड मेल नहीं खाता",
      passwordsDontMatch: "पासवर्ड मेल नहीं खाते",
      passwordTooShort: "पासवर्ड बहुत छोटा",
      passwordMinLength: "पासवर्ड कम से कम 6 अक्षर का होना चाहिए",
      selectDeliveryDate: "कृपया डिलीवरी की तारीख चुनें",
      chooseDeliveryDate: "अपने ऑर्डर के साथ आगे बढ़ने के लिए डिलीवरी की तारीख चुनें",
      cartIsEmpty: "कार्ट खाली है",
      addItemsToCart: "ऑर्डर देने से पहले अपने कार्ट में कुछ आइटम जोड़ें",
      upiIdRequired: "UPI ID आवश्यक",
      enterUpiId: "कृपया अपना UPI ID दर्ज करें",
      paymentSuccessful: "भुगतान सफल!",
      orderPlacedSuccessfully: "आपका ऑर्डर सफलतापूर्वक दिया गया है",
      pleaseProvideRating: "कृपया रेटिंग दें",
      selectStars: "आपूर्तिकर्ता को रेट करने के लिए कम से कम 1 स्टार चुनें",
    },
  },

  mr: {
    // Common
    common: {
      loading: "लोड होत आहे...",
      save: "सेव्ह करा",
      cancel: "रद्द करा",
      delete: "डिलीट करा",
      edit: "एडिट करा",
      add: "जोडा",
      search: "शोधा",
      filter: "फिल्टर",
      sort: "सॉर्ट करा",
      back: "मागे",
      next: "पुढे",
      submit: "सबमिट करा",
      close: "बंद करा",
      yes: "होय",
      no: "नाही",
      ok: "ठीक आहे",
      error: "त्रुटी",
      success: "यश",
      warning: "चेतावणी",
      info: "माहिती",
    },

    // Navigation
    nav: {
      dashboard: "डॅशबोर्ड",
      orders: "ऑर्डर",
      cart: "कार्ट",
      profile: "प्रोफाइल",
      logout: "लॉगआउट",
      login: "लॉगिन",
      register: "नोंदणी",
    },

    // Auth
    auth: {
      welcomeBack: "परत स्वागत",
      signInToAccount: "सुरू ठेवण्यासाठी आपल्या खात्यात साइन इन करा",
      createAccount: "खाते तयार करा",
      joinBazarBuddy: "BazarBuddy मध्ये सामील व्हा आणि आपला प्रवास सुरू करा",
      email: "ईमेल",
      password: "पासवर्ड",
      confirmPassword: "पासवर्डची पुष्टी करा",
      fullName: "पूर्ण नाव",
      phoneNumber: "फोन नंबर",
      iAm: "मी आहे:",
      streetFoodVendor: "स्ट्रीट फूड विक्रेता",
      rawMaterialSupplier: "कच्चा माल पुरवठादार",
      signIn: "साइन इन",
      signUp: "साइन अप",
      signingIn: "साइन इन होत आहे...",
      creatingAccount: "खाते तयार होत आहे...",
      dontHaveAccount: "खाते नाही?",
      alreadyHaveAccount: "आधीच खाते आहे?",
      demoAccounts: "डेमो खाती:",
      vendor: "विक्रेता",
      supplier: "पुरवठादार",
      enterEmail: "आपला ईमेल टाका",
      enterPassword: "आपला पासवर्ड टाका",
      createPassword: "पासवर्ड तयार करा",
      confirmYourPassword: "आपल्या पासवर्डची पुष्टी करा",
      enterFullName: "आपले पूर्ण नाव टाका",
    },

    // Dashboard
    dashboard: {
      welcomeBack: "परत स्वागत",
      findTrustedSuppliers: "आपल्या स्ट्रीट फूड व्यवसायासाठी विश्वसनीय पुरवठादार शोधा",
      manageProducts: "आपली उत्पादने आणि ऑर्डरचे व्यवस्थापन करा",
      searchSuppliers: "पुरवठादार किंवा उत्पादने शोधा...",
      filterByCategory: "श्रेणीनुसार फिल्टर करा",
      allCategories: "सर्व श्रेण्या",
      vegetables: "भाज्या",
      fruits: "फळे",
      spices: "मसाले",
      riceGrains: "तांदूळ आणि धान्य",
      cookingOil: "स्वयंपाकाचे तेल",
      rating: "रेटिंग",
      price: "किंमत",
      deliveryTime: "डिलिव्हरी वेळ",
      compare: "तुलना करा",
      viewProducts: "उत्पादने पहा",
      verified: "सत्यापित",
      categories: "श्रेण्या",
      products: "उत्पादने",
      avgPrice: "सरासरी किंमत",
      delivery: "डिलिव्हरी",
      noSuppliersFound: "कोणतेही पुरवठादार सापडले नाहीत",
      adjustSearchCriteria: "आपले शोध किंवा फिल्टर निकष समायोजित करण्याचा प्रयत्न करा",
    },

    // Cart
    cart: {
      shoppingCart: "शॉपिंग कार्ट",
      cartItems: "कार्ट आयटम",
      reviewProducts: "आपल्या निवडलेल्या उत्पादनांचे पुनरावलोकन करा",
      cartEmpty: "आपले कार्ट रिकामे आहे",
      addProducts: "सुरुवात करण्यासाठी काही उत्पादने जोडा",
      browseSuppliers: "पुरवठादार ब्राउझ करा",
      groupOrder: "ग्रुप ऑर्डर",
      teamUpVendors: "चांगल्या किंमतीसाठी इतर विक्रेत्यांसोबत जोडा",
      joinActiveGroup: "सक्रिय ग्रुपमध्ये सामील व्हा",
      members: "सदस्य",
      deliveryDate: "डिलिव्हरीची तारीख",
      pickDate: "तारीख निवडा",
      subtotal: "उप-एकूण",
      deliveryFee: "डिलिव्हरी शुल्क",
      groupDiscount: "ग्रुप सूट",
      total: "एकूण",
      placeOrder: "ऑर्डर द्या",
      proceedToPayment: "पेमेंटसाठी पुढे जा",
      payment: "पेमेंट",
      completePayment: "ऑर्डर देण्यासाठी आपले पेमेंट पूर्ण करा",
      totalAmount: "एकूण रक्कम",
      groupDiscountApplied: "ग्रुप सूट लागू",
      paymentMethod: "पेमेंट पद्धत",
      upiPayment: "UPI पेमेंट",
      creditDebitCard: "क्रेडिट/डेबिट कार्ड",
      upiId: "UPI ID",
      processingPayment: "पेमेंट प्रक्रिया सुरू आहे...",
      pay: "पेमेंट करा",
      paymentSuccessful: "पेमेंट यशस्वी!",
      orderPlaced: "आपला ऑर्डर दिला गेला आहे आणि पुष्टीसाठी पुरवठादारांना पाठवला गेला आहे.",
      redirectingToOrders: "ऑर्डर पेजवर रीडायरेक्ट होत आहे...",
    },

    // Orders
    orders: {
      myOrders: "माझे ऑर्डर",
      allOrders: "सर्व ऑर्डर",
      pending: "प्रलंबित",
      confirmed: "पुष्ट",
      shipped: "पाठवले",
      delivered: "डिलिव्हर",
      rejected: "नाकारले",
      order: "ऑर्डर",
      groupOrder: "ग्रुप ऑर्डर",
      orderedOn: "ऑर्डर दिले",
      items: "आयटम",
      orderProgress: "ऑर्डर प्रगती",
      complete: "पूर्ण",
      orderPlaced: "ऑर्डर दिले",
      orderConfirmed: "ऑर्डर पुष्ट",
      preparingOrder: "ऑर्डर तयार होत आहे",
      outForDelivery: "डिलिव्हरीसाठी निघाले",
      rejectionReason: "नाकारण्याचे कारण",
      yourRating: "आपली रेटिंग",
      deliveryDate: "डिलिव्हरीची तारीख",
      viewDetails: "तपशील पहा",
      rateReview: "रेट आणि रिव्ह्यू",
      orderDetails: "ऑर्डर तपशील",
      completeOrderInfo: "संपूर्ण ऑर्डर माहिती",
      supplierInfo: "पुरवठादार माहिती",
      orderItems: "ऑर्डर आयटम",
      noOrdersFound: "कोणतेही ऑर्डर सापडले नाहीत",
      noOrdersYet: "आपण अजून कोणतेही ऑर्डर दिले नाहीत",
      noOrdersAtMoment: "सध्या कोणतेही ऑर्डर नाहीत",
      rateSupplier: "पुरवठादाराला रेट करा",
      shareExperience: "या पुरवठादारासोबतचा आपला अनुभव शेअर करा",
      reviewOptional: "पुनरावलोकन (पर्यायी)",
      shareExperienceText: "या पुरवठादारासोबतचा आपला अनुभव शेअर करा...",
      submitRating: "रेटिंग सबमिट करा",
      ratingSubmitted: "रेटिंग सबमिट केली!",
      thankYouFeedback: "आपल्या प्रतिक्रियेसाठी धन्यवाद",
    },

    // Supplier Dashboard
    supplier: {
      supplierDashboard: "पुरवठादार डॅशबोर्ड",
      totalProducts: "एकूण उत्पादने",
      pendingOrders: "प्रलंबित ऑर्डर",
      totalRevenue: "एकूण उत्पन्न",
      avgRating: "सरासरी रेटिंग",
      myProducts: "माझी उत्पादने",
      manageProductCatalog: "आपल्या उत्पादन कॅटलॉगचे व्यवस्थापन करा",
      addProduct: "उत्पादन जोडा",
      addNewProduct: "नवीन उत्पादन जोडा",
      addProductToCatalog: "आपल्या कॅटलॉगमध्ये नवीन उत्पादन जोडा",
      productName: "उत्पादनाचे नाव",
      category: "श्रेणी",
      unit: "एकक",
      stockQuantity: "स्टॉक प्रमाण",
      description: "वर्णन",
      productImage: "उत्पादन प्रतिमा",
      clickToUpload: "उत्पादन प्रतिमा अपलोड करण्यासाठी क्लिक करा",
      fileTypes: "PNG, JPG, WebP 2MB पर्यंत",
      enterProductName: "उत्पादनाचे नाव टाका",
      selectCategory: "श्रेणी निवडा",
      pricePerUnit: "प्रति एकक किंमत",
      selectUnit: "एकक निवडा",
      availableQuantity: "उपलब्ध प्रमाण",
      productDescription: "उत्पादन वर्णन",
      kilogram: "किलोग्राम",
      gram: "ग्राम",
      piece: "तुकडा",
      liter: "लिटर",
      product: "उत्पादन",
      stock: "स्टॉक",
      actions: "कृती",
      recentOrders: "अलीकडील ऑर्डर",
      manageIncomingOrders: "विक्रेत्यांकडून येणाऱ्या ऑर्डरचे व्यवस्थापन करा",
      accept: "स्वीकार करा",
      reject: "नाकारा",
      rejectOrder: "ऑर्डर नाकारा",
      provideRejectionReason: "कृपया हे ऑर्डर नाकारण्याचे कारण द्या",
      reasonForRejection: "नाकारण्याचे कारण",
      explainRejection: "कृपया स्पष्ट करा की आपण हे ऑर्डर का नाकारत आहात...",
      rejectOrderBtn: "ऑर्डर नाकारा",
      productAdded: "उत्पादन यशस्वीरित्या जोडले!",
      productAddedDesc: "आपले उत्पादन कॅटलॉगमध्ये जोडले गेले आहे.",
      orderAccepted: "ऑर्डर पुष्ट!",
      orderRejected: "ऑर्डर नाकारले!",
      orderActionDesc: "ऑर्डर केले गेले आहे",
      missingFields: "आवश्यक फील्ड गहाळ",
      fillAllFields: "कृपया सर्व आवश्यक फील्ड भरा.",
      rejectionReasonRequired: "नाकारण्याचे कारण आवश्यक",
      provideReason: "कृपया ऑर्डर नाकारण्याचे कारण द्या.",
      invalidFileType: "अवैध फाइल प्रकार",
      uploadValidImages: "कृपया फक्त JPG, PNG, किंवा WebP प्रतिमा अपलोड करा.",
      fileTooLarge: "फाइल खूप मोठी",
      uploadSmallerImages: "कृपया 2MB पेक्षा लहान प्रतिमा अपलोड करा.",
    },

    // Profile
    profile: {
      supplierProfile: "पुरवठादार प्रोफाइल",
      profileInfo: "प्रोफाइल माहिती",
      updateBusinessDetails: "आपले व्यवसाय तपशील आणि संपर्क माहिती अपडेट करा",
      businessName: "व्यवसायाचे नाव",
      yourBusinessName: "आपल्या व्यवसायाचे नाव",
      businessAddress: "व्यवसायाचा पत्ता",
      enterCompleteAddress: "आपला संपूर्ण व्यवसाय पत्ता टाका",
      gstNumber: "GST नंबर",
      enterGstNumber: "आपला GST नंबर टाका",
      businessDescription: "व्यवसाय वर्णन",
      describeYourBusiness: "आपल्या व्यवसाय आणि उत्पादनांचे वर्णन करा",
      updateProfile: "प्रोफाइल अपडेट करा",
      kycDocuments: "KYC कागदपत्रे",
      uploadRequiredDocs: "सत्यापनासाठी आवश्यक कागदपत्रे अपलोड करा",
      verificationProgress: "सत्यापन प्रगती",
      aadharCard: "आधार कार्ड",
      gstCertificate: "GST प्रमाणपत्र",
      bankStatement: "बँक स्टेटमेंट",
      upload: "अपलोड",
      uploading: "अपलोड होत आहे...",
      uploadedDocuments: "अपलोड केलेली कागदपत्रे",
      uploadedOn: "अपलोड केले",
      approved: "मंजूर",
      profileSummary: "प्रोफाइल सारांश",
      ratingsReviews: "रेटिंग आणि पुनरावलोकने",
      whatVendorsSay: "विक्रेते आपल्याबद्दल काय म्हणतात",
      basedOnReviews: "पुनरावलोकनांवर आधारित",
      profileUpdated: "प्रोफाइल अपडेट!",
      profileSaved: "आपली प्रोफाइल माहिती यशस्वीरित्या सेव्ह झाली आहे.",
      documentUploaded: "कागदपत्र अपलोड!",
      documentUnderReview: "आपले कागदपत्र अपलोड झाले आहे आणि पुनरावलोकनाधीन आहे.",
      invalidDocType: "अवैध फाइल प्रकार",
      uploadValidDocs: "कृपया फक्त JPG, PNG, किंवा PDF फाइल अपलोड करा.",
      docTooLarge: "फाइल खूप मोठी",
      uploadSmallerDocs: "कृपया 5MB पेक्षा लहान फाइल अपलोड करा.",
    },

    // Notifications
    notifications: {
      loginSuccessful: "लॉगिन यशस्वी!",
      welcomeBack: "BazarBuddy मध्ये परत स्वागत",
      loginFailed: "लॉगिन अयशस्वी",
      invalidCredentials: "अवैध ईमेल किंवा पासवर्ड",
      registrationSuccessful: "नोंदणी यशस्वी!",
      welcomeToBazarBuddy: "BazarBuddy मध्ये आपले स्वागत",
      registrationFailed: "नोंदणी अयशस्वी",
      tryAgain: "कृपया पुन्हा प्रयत्न करा",
      somethingWentWrong: "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
      passwordMismatch: "पासवर्ड जुळत नाही",
      passwordsDontMatch: "पासवर्ड जुळत नाहीत",
      passwordTooShort: "पासवर्ड खूप लहान",
      passwordMinLength: "पासवर्ड किमान 6 अक्षरांचा असावा",
      selectDeliveryDate: "कृपया डिलिव्हरीची तारीख निवडा",
      chooseDeliveryDate: "आपल्या ऑर्डरसह पुढे जाण्यासाठी डिलिव्हरीची तारीख निवडा",
      cartIsEmpty: "कार्ट रिकामे आहे",
      addItemsToCart: "ऑर्डर देण्यापूर्वी आपल्या कार्टमध्ये काही आयटम जोडा",
      upiIdRequired: "UPI ID आवश्यक",
      enterUpiId: "कृपया आपला UPI ID टाका",
      paymentSuccessful: "पेमेंट यशस्वी!",
      orderPlacedSuccessfully: "आपला ऑर्डर यशस्वीरित्या दिला गेला आहे",
      pleaseProvideRating: "कृपया रेटिंग द्या",
      selectStars: "पुरवठादाराला रेट करण्यासाठी किमान 1 स्टार निवडा",
    },
  },
} as const

export type TranslationKey = keyof typeof translations.en
export type NestedTranslationKey<T> = T extends object
  ? { [K in keyof T]: T[K] extends object ? `${string & K}.${string & keyof T[K]}` : string & K }[keyof T]
  : never

export function getTranslation(language: Language, key: string): string {
  const keys = key.split(".")
  let value: any = translations[language]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
