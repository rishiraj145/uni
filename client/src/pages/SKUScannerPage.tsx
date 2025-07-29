import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, X, Trash2 } from "lucide-react";

interface Product {
  id: string;
  title: string;
  sku: string;
  image: string;
  totalQuantity: number;
  pickedQuantity: number;
  status: "GOOD" | "DAMAGED";
  vendor: string;
  mrp: number;
  mfgDate: string;
  isPicking?: boolean;
}

const initialProducts: Product[] = [
  {
    id: "1",
    title: "Nike Shoes-Red-Size10-Mens Revolution 6 Nn-Sports Shoes-Men Sneaker",
    sku: "SK238402-437493023012",
    image: "/api/placeholder/60/60",
    totalQuantity: 80,
    pickedQuantity: 0,
    status: "GOOD",
    vendor: "B02363940", 
    mrp: 10000,
    mfgDate: "12/03/23"
  },
  {
    id: "2", 
    title: "Nike Shoes-Blue-Size10-Mens Revolution 6 Nn-Sports Shoes-Men Sneaker",
    sku: "SK238402-437493023012",
    image: "/api/placeholder/60/60",
    totalQuantity: 50,
    pickedQuantity: 0,
    status: "GOOD",
    vendor: "B02363940",
    mrp: 10000,
    mfgDate: "12/03/23"
  },
  {
    id: "3",
    title: "Nike Shoes-Black-Size10-Mens Revolution 6 Nn-Sports Shoes-Men Sneaker", 
    sku: "SK238402-437493023012",
    image: "/api/placeholder/60/60",
    totalQuantity: 60,
    pickedQuantity: 0,
    status: "GOOD",
    vendor: "B02363940",
    mrp: 10000,
    mfgDate: "12/03/23"
  },
  {
    id: "4",
    title: "Nike Shoes-Yellow-Size10-Mens Revolution 6 Nn-Sports Shoes-Men Sneaker", 
    sku: "SK238402-437493023012",
    image: "/api/placeholder/60/60",
    totalQuantity: 20,
    pickedQuantity: 0,
    status: "GOOD",
    vendor: "B02363940",
    mrp: 10000,
    mfgDate: "12/03/23"
  }
];

export function SKUScannerPage() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"pending" | "scanned">("pending");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showActionsModal, setShowActionsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showShelfEmptyAlert, setShowShelfEmptyAlert] = useState(false);

  const handleBack = () => {
    navigate("/shelf-detail/1");
  };

  const handleClose = () => {
    navigate("/b2b-packing");
  };

  const pendingProducts = products.filter(p => p.pickedQuantity < p.totalQuantity);
  const scannedProducts = products.filter(p => p.pickedQuantity > 0);
  const currentProducts = activeTab === "pending" ? pendingProducts : scannedProducts;

  const handleProductClick = (product: Product) => {
    if (activeTab === "pending" && product.pickedQuantity < product.totalQuantity && !product.isPicking) {
      setSelectedProduct(product);
      setProducts(prev => prev.map(p => 
        p.id === product.id ? { ...p, isPicking: true } : p
      ));
    } else if (activeTab === "scanned" && product.pickedQuantity > 0) {
      // Move item back to pending by reducing picked quantity by 1
      setProducts(prev => prev.map(p => {
        if (p.id === product.id) {
          const newPickedQuantity = Math.max(p.pickedQuantity - 1, 0);
          return { 
            ...p, 
            pickedQuantity: newPickedQuantity,
            isPicking: false
          };
        }
        return p;
      }));
    }
  };

  const handleQuantityClick = (product: Product) => {
    if (product.isPicking) {
      setSelectedProduct(product);
      setShowActionsModal(true);
    }
  };

  const pickOne = (productId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newPickedQuantity = Math.min(p.pickedQuantity + 1, p.totalQuantity);
        return { 
          ...p, 
          pickedQuantity: newPickedQuantity,
          isPicking: newPickedQuantity < p.totalQuantity
        };
      }
      return p;
    }));
    
    checkIfShelfEmpty();
  };

  const pickInBulk = (productId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { 
          ...p, 
          pickedQuantity: p.totalQuantity,
          isPicking: false
        };
      }
      return p;
    }));
    
    setShowActionsModal(false);
    checkIfShelfEmpty();
  };

  const markDamaged = (productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, status: "DAMAGED" as const, isPicking: false } : p
    ));
    setShowActionsModal(false);
  };

  const markNotFound = (productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, isPicking: false } : p
    ));
    setShowActionsModal(false);
  };

  const shortPick = (productId: string) => {
    // For now, just stop picking - could implement partial pick logic
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, isPicking: false } : p
    ));
    setShowActionsModal(false);
  };

  const checkIfShelfEmpty = () => {
    setTimeout(() => {
      const allPicked = products.every(p => p.pickedQuantity >= p.totalQuantity);
      if (allPicked) {
        setShowShelfEmptyAlert(true);
        setTimeout(() => {
          setShowShelfEmptyAlert(false);
          navigate("/shelf-detail/1");
        }, 2000);
      }
    }, 100);
  };

  const getShoeColor = (title: string) => {
    if (title.includes('Red')) return { start: '#dc2626', end: '#b91c1c' };
    if (title.includes('Blue')) return { start: '#2563eb', end: '#1d4ed8' };
    if (title.includes('Yellow')) return { start: '#eab308', end: '#ca8a04' };
    return { start: '#1f2937', end: '#111827' };
  };

  const ProductCard = ({ product }: { product: Product }) => {
    const pendingQty = product.totalQuantity - product.pickedQuantity;
    const colors = getShoeColor(product.title);
    
    return (
      <div 
        className={`bg-white rounded-lg border p-4 mb-3 transition-all ${
          product.isPicking 
            ? 'border-green-500 border-2 bg-green-50' 
            : activeTab === 'pending' && pendingQty > 0
            ? 'border-gray-200 hover:border-gray-300 cursor-pointer'
            : activeTab === 'scanned' && product.pickedQuantity > 0
            ? 'border-gray-200 hover:border-gray-300 cursor-pointer'
            : 'border-gray-200'
        }`}
        onClick={() => handleProductClick(product)}
      >
        {/* Status Badge and Quantity Button */}
        <div className="flex justify-between items-start mb-2">
          {product.isPicking && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
              • PICKING
            </span>
          )}
          <div className="flex-1"></div>
          {product.isPicking && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleQuantityClick(product);
              }}
              className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium hover:bg-blue-600"
            >
              {product.pickedQuantity + 1}/{product.totalQuantity}
            </button>
          )}
        </div>

        <div className="mb-2">
          <h3 className="text-sm font-medium text-gray-900 leading-tight mb-1">
            {product.title}
          </h3>
          <p className="text-xs text-gray-600">{product.sku}</p>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            <img 
              src={`data:image/svg+xml;base64,${btoa(`
                <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="shoeGrad${product.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:${colors.start};stop-opacity:1" />
                      <stop offset="100%" style="stop-color:${colors.end};stop-opacity:1" />
                    </linearGradient>
                  </defs>
                  <rect width="64" height="64" fill="#f8fafc"/>
                  <ellipse cx="32" cy="50" rx="28" ry="8" fill="#e2e8f0"/>
                  <path d="M8 40 Q8 35 12 32 Q16 28 24 26 Q32 24 40 26 Q48 28 52 32 Q56 35 56 40 L54 42 Q52 44 48 45 Q44 46 40 46 L24 46 Q20 46 16 45 Q12 44 10 42 Z" fill="url(#shoeGrad${product.id})"/>
                  <path d="M12 38 Q16 34 24 32 Q32 30 40 32 Q48 34 52 38" stroke="white" stroke-width="1" fill="none" opacity="0.3"/>
                  <circle cx="20" cy="38" r="1.5" fill="white" opacity="0.6"/>
                  <text x="32" y="18" text-anchor="middle" fill="#64748b" font-size="6" font-family="Arial, sans-serif" font-weight="bold">NIKE</text>
                </svg>
              `)}`}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <div>
              <span className="text-gray-500">Qty </span>
              <span className="font-medium">
                {activeTab === 'pending' ? pendingQty : product.pickedQuantity}
              </span>
              {activeTab === 'scanned' && (
                <span className="text-xs text-blue-600 ml-1">(click to unpick)</span>
              )}
            </div>
            <div className="text-right">
              <span className="text-gray-500">Vendor </span>
              <span className="font-medium">{product.vendor}</span>
            </div>
            
            <div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                product.status === 'GOOD' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {product.status}
              </span>
            </div>
            <div className="text-right">
              <span className="text-gray-500">MRP </span>
              <span className="font-medium">₹{product.mrp.toLocaleString()}</span>
            </div>
            
            <div className="col-span-2">
              <span className="text-gray-500">Mfg </span>
              <span className="font-medium">{product.mfgDate}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="p-1">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">TOTE_01</h1>
        </div>
        <button 
          onClick={handleClose}
          className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded"
        >
          CLOSE
        </button>
      </div>

      {/* Scanner Section */}
      <div className="bg-black text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Scan SKU Code</h2>
          <Trash2 className="w-5 h-5 text-gray-400" />
        </div>
        
        {/* Barcode Scanner Placeholder */}
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="bg-white rounded-lg p-2 flex items-center justify-center">
            <img 
              src={`data:image/svg+xml;base64,${btoa(`
                <svg width="320" height="100" xmlns="http://www.w3.org/2000/svg">
                  <rect width="320" height="100" fill="white"/>
                  <text x="160" y="20" text-anchor="middle" fill="black" font-size="10" font-family="Arial">MILWAUKEE</text>
                  <g transform="translate(20, 25)">
                    ${Array.from({length: 50}, (_, i) => `<rect x="${i * 6}" y="0" width="${Math.random() > 0.5 ? 2 : 1}" height="50" fill="black"/>`).join('')}
                  </g>
                  <text x="280" y="85" text-anchor="middle" fill="black" font-size="16" font-weight="bold" font-family="Arial">G</text>
                </svg>
              `)}`}
              alt="Barcode"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab("pending")}
            className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 ${
              activeTab === "pending"
                ? "text-blue-600 border-blue-600"
                : "text-gray-500 border-transparent"
            }`}
          >
            Pending ({pendingProducts.length})
          </button>
          <button
            onClick={() => setActiveTab("scanned")}
            className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 ${
              activeTab === "scanned"
                ? "text-blue-600 border-blue-600"
                : "text-gray-500 border-transparent"
            }`}
          >
            Scanned ({scannedProducts.length})
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="p-4 pb-20">
        {currentProducts.length > 0 ? (
          <div className="space-y-0">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {activeTab === "pending" ? "No pending items" : "No scanned items yet"}
            </p>
          </div>
        )}
      </div>

      {/* Actions Modal */}
      {showActionsModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-lg animate-slide-up">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">ACTIONS</h3>
              <button 
                onClick={() => setShowActionsModal(false)}
                className="p-1"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="p-0">
              <button
                onClick={() => pickInBulk(selectedProduct.id)}
                className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100"
              >
                Pick in Bulk
              </button>
              <button
                onClick={() => markDamaged(selectedProduct.id)}
                className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100"
              >
                Mark Damaged
              </button>
              <button
                onClick={() => markNotFound(selectedProduct.id)}
                className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100"
              >
                Mark Not Found
              </button>
              <button
                onClick={() => shortPick(selectedProduct.id)}
                className="w-full p-4 text-left hover:bg-gray-50"
              >
                Short Pick
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shelf Empty Alert */}
      {showShelfEmptyAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 m-4 text-center">
            <div className="text-green-600 text-4xl mb-2">✓</div>
            <h3 className="text-lg font-semibold mb-2">Shelf Emptied!</h3>
            <p className="text-gray-600">All items have been picked from this shelf.</p>
          </div>
        </div>
      )}

      {/* Auto-click functionality for single item pick */}
      {selectedProduct && selectedProduct.isPicking && !showActionsModal && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => pickOne(selectedProduct.id)}
            className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700"
          >
            Pick One
          </button>
        </div>
      )}
    </div>
  );
}