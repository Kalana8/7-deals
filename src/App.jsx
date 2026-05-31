import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';
import {
  Home,
  Search,
  User,
  Tag,
  MapPin,
  Calendar,
  Copy,
  Check,
  ArrowRight,
  ThumbsUp,
  MessageSquare,
  Share2,
  Plus,
  TrendingUp,
  Menu,
  X,
  LogOut,
  Grid,
  Settings,
  ShoppingBag,
  Shield,
  Percent,
  ChevronDown,
  Info,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Bookmark,
  Rocket
} from 'lucide-react';

const PortalDropdown = ({
  anchorRef, isOpen, children, alignRight = false
}) => {
  const [coords, setCoords] = React.useState({
    top: 0, left: 0, right: 0, width: 0
  });

  React.useEffect(() => {
    if (isOpen && anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
        right: window.innerWidth - rect.right + window.scrollX,
        width: rect.width
      });
    }
  }, [isOpen, anchorRef]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      data-portal-dropdown="true"
      style={{
        position: 'absolute',
        top: coords.top,
        ...(alignRight
          ? { right: coords.right }
          : { left: coords.left }
        ),
        minWidth: Math.max(coords.width, 240),
        zIndex: 99999,
      }}
      className="bg-white border border-[#e8e8e8] 
          rounded-[10px] 
          shadow-[0_8px_24px_rgba(0,0,0,0.15)] p-1.5 
          text-left"
      onMouseDown={(e) => e.stopPropagation()}
    >
      {children}
    </div>,
    document.body
  );
};

// ==========================================
// DUMMY DATA DEFINITIONS (AUSTRALIAN MARKET)
// ==========================================

const DEMO_USERS = {
  regular: { email: 'user@demo.com', name: 'Matilda W.', location: 'Sydney, NSW', role: 'user', avatar: 'MW', color: 'bg-green-700', joined: 'May 2025' },
  consumer: { email: 'consumer@demo.com', name: 'OzTech Owner', role: 'consumer', avatar: 'OT', color: 'bg-emerald-600', joined: 'Jan 2024' },
  admin: { email: 'admin@demo.com', name: 'Admin', role: 'admin', avatar: 'AD', color: 'bg-brand-green', joined: 'Dec 2023' },
  moderator: { email: 'mod@demo.com', name: 'Moderator Tash', role: 'moderator', avatar: 'MT', color: 'bg-blue-600', joined: 'Apr 2024' }
};

const DUMMY_USERS_LIST = [
  { id: 'u1', name: 'Matilda W.', avatar: 'MW', color: 'bg-green-700', joined: 'May 2025', posts: 14, status: 'Active', location: 'Sydney, NSW' },
  { id: 'u2', name: 'BlakeyB', avatar: 'BB', color: 'bg-blue-600', joined: 'Jul 2024', posts: 8, status: 'Active', location: 'Melbourne, VIC' },
  { id: 'u3', name: 'TashFromPerth', avatar: 'TP', color: 'bg-purple-600', joined: 'Nov 2024', posts: 21, status: 'Active', location: 'Perth, WA' },
  { id: 'u4', name: 'Rohan J.', avatar: 'RJ', color: 'bg-amber-500', joined: 'Feb 2025', posts: 3, status: 'Suspended', location: 'Brisbane, QLD' },
  { id: 'u5', name: 'AussieDave', avatar: 'AD', color: 'bg-teal-600', joined: 'Jan 2025', posts: 19, status: 'Active', location: 'Adelaide, SA' }
];

const STORES = {
  'oztech-deals': {
    id: 'oztech-deals',
    name: 'OzTech Deals',
    tagline: "Sydney's best tech deals 🇦🇺",
    verified: true,
    joined: 'Jan 2024',
    logo: 'OT',
    logoBg: 'bg-slate-900',
    dealsCount: 8,
    location: 'Sydney, NSW',
    couponCode: 'OZTECH15',
    discountRate: 0.15,
    discountText: '15% OFF',
    products: [
      { id: 'p1', name: 'MacBook Air M3 13"', price: '$1,599.00 AUD', stock: 4, desc: "G'day! Save heaps on the latest M3 Apple silicon. Perfect arvo companion for work and study.", status: 'Low stock', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80' },
      { id: 'p2', name: 'Samsung Galaxy S24 256GB', price: '$1,249.00 AUD', stock: 24, desc: 'Tidy discount on Samsung flagship. Unleash AI features, it is heaps good!', status: 'In stock', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=300&q=80' },
      { id: 'p3', name: 'Sony WH-1000XM5 headphones', price: '$399.00 AUD', stock: 12, desc: 'Industry leading noise cancelling. Block out the train noise on the morning commute.', status: 'In stock', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80' },
      { id: 'p4', name: 'iPad Pro M4 11"', price: '$1,449.00 AUD', stock: 0, desc: 'Ultra thin design, tandem OLED screen. Out of stock at the minute, more coming next week.', status: 'Out', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=300&q=80' },
      { id: 'p5', name: 'DJI Mini 4 Pro drone', price: '$949.00 AUD', stock: 8, desc: 'Cracking lightweight drone. Shoot beautiful 4K footage of Aussie beaches.', status: 'In stock', image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=300&q=80' },
      { id: 'p6', name: 'GoPro Hero 12 Black', price: '$499.00 AUD', stock: 15, desc: 'Rugged design with hyper-smooth stabilization. Perfect for capturing your surf sessions.', status: 'In stock', image: 'https://images.unsplash.com/photo-1565849906662-68031fad2d8a?auto=format&fit=crop&w=300&q=80' },
      { id: 'p7', name: 'Garmin Forerunner 965', price: '$849.00 AUD', stock: 2, desc: 'Premium GPS running smartwatch with AMOLED display. Low stock, get in quick.', status: 'Low stock', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80' },
      { id: 'p8', name: 'Bose SoundLink Flex', price: '$189.00 AUD', stock: 32, desc: 'Waterproof Bluetooth speaker. Bring your tunes along to the weekend BBQ.', status: 'In stock', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=300&q=80' }
    ]
  },
  'aussie-bites': {
    id: 'aussie-bites',
    name: 'Aussie Bites Bakery',
    tagline: 'Freshly baked Aussie goodness 🥐',
    verified: true,
    joined: 'Mar 2024',
    logo: 'AB',
    logoBg: 'bg-amber-600',
    dealsCount: 6,
    location: 'Melbourne, VIC',
    couponCode: 'AUSSIEBITES',
    discountRate: 0.20,
    discountText: '20% OFF',
    products: [
      { id: 'p9', name: 'Lamingtons (6 Pack)', price: '$8.50 AUD', stock: 15, desc: 'Choc-dipped sponge coated in shredded coconut. Freshly baked every morning.', status: 'In stock', image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=300&q=80' },
      { id: 'p10', name: 'Anzac Biscuits (Dozen)', price: '$12.00 AUD', stock: 18, desc: 'Traditional golden syrup, rolled oats, and coconut biscuits. Golden and crunchy.', status: 'In stock', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=300&q=80' },
      { id: 'p11', name: 'Tim Tam Gift Box Edition', price: '$22.00 AUD', stock: 5, desc: 'A curated selection of double coat, dark choc, and chewy caramel Tim Tams.', status: 'In stock', image: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=300&q=80' },
      { id: 'p12', name: 'Gourmet Meat Pies (Dozen)', price: '$45.00 AUD', stock: 3, desc: 'Aussie classic beef and gravy pies, ready to bake. Low stock, snag some for the footy arvo!', status: 'Low stock', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80' },
      { id: 'p13', name: 'DIY Pavlova Kit', price: '$18.00 AUD', stock: 10, desc: 'Crispy meringue shell, whipping cream, and fresh passionfruit syrup. Just add strawberries.', status: 'In stock', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=300&q=80' },
      { id: 'p14', name: 'Vegemite Scrolls (6 Pack)', price: '$14.00 AUD', stock: 0, desc: 'Savory scroll packed with melted cheese and Vegemite. Out of stock, baking more tomorrow arvo.', status: 'Out', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80' }
    ]
  },
  'downunder-fashion': {
    id: 'downunder-fashion',
    name: 'DownUnder Fashion',
    tagline: 'Aussie style, Aussie prices 🦘',
    verified: false,
    joined: 'Sep 2024',
    logo: 'DF',
    logoBg: 'bg-rose-700',
    dealsCount: 10,
    location: 'Brisbane, QLD',
    couponCode: 'DOWNUNDER',
    discountRate: 0.25,
    discountText: '25% OFF',
    products: [
      { id: 'p15', name: 'Akubra Traveller Hat', price: '$249.00 AUD', stock: 40, desc: '100% rabbit fur felt, water resistant, packable memory design. Classic Aussie look.', status: 'In stock', image: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8?auto=format&fit=crop&w=300&q=80' },
      { id: 'p16', name: 'RM Williams Craftsman Boots', price: '$450.00 AUD', stock: 7, desc: 'Handcrafted leather chelsea boots. Legendarily durable, wears beautifully.', status: 'In stock', image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=300&q=80' },
      { id: 'p17', name: 'Rip Curl Dawn Patrol 3/2 Wetsuit', price: '$299.00 AUD', stock: 2, desc: 'High performance E5 neoprene. Stretch and comfort for year-round surfing.', status: 'Low stock', image: 'https://images.unsplash.com/photo-1582639590011-f5a8c20d4001?auto=format&fit=crop&w=300&q=80' },
      { id: 'p18', name: 'Billabong Boardshorts Pro', price: '$79.00 AUD', stock: 15, desc: 'Eco-conscious performance stretch fabrics. Quick dry, floral design.', status: 'In stock', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80' },
      { id: 'p19', name: 'Country Road Linen Dress', price: '$189.00 AUD', stock: 12, desc: 'Lightweight pure French linen. Relaxed fit for warm beach days.', status: 'In stock', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80' },
      { id: 'p20', name: 'Bonds Guyfront Underwear Pack (3)', price: '$35.00 AUD', stock: 50, desc: 'Comfy cotton stretch fabric. Signature Bonds elastic waistband.', status: 'In stock', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80' },
      { id: 'p21', name: 'Quiksilver Fleece Hoodie', price: '$89.00 AUD', stock: 0, desc: 'Cozy brushed fleece fabric. Kangaroo pouch pocket, screenprint graphics.', status: 'Out', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80' },
      { id: 'p22', name: 'Classic UGG Boots Short', price: '$159.00 AUD', stock: 22, desc: 'Genuine Australian twin-face sheepskin. Soft, warm, and cozy for winter mornings.', status: 'In stock', image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=300&q=80' },
      { id: 'p23', name: 'Birkenstocks AU Arizona', price: '$199.00 AUD', stock: 5, desc: 'Two-strap sandal with cork footbed. Comfortable everyday casual wear.', status: 'Low stock', image: 'https://images.unsplash.com/photo-1603487226258-2085ae445d98?auto=format&fit=crop&w=300&q=80' },
      { id: 'p24', name: 'Seafolly Halter Swimwear', price: '$129.00 AUD', stock: 14, desc: 'Premium stretch nylon fabric. Beautiful retro silhouette for the beach.', status: 'In stock', image: 'https://images.unsplash.com/photo-1501908731318-2e3c062c5b6c?auto=format&fit=crop&w=300&q=80' }
    ]
  }
};

const TICKER_PILLS_A = [
  { brand: "Woolworths", code: "WOOLIES10", discount: "10% OFF", expiryDays: 3 },
  { brand: "JB Hi-Fi", code: "JBHIFI20", discount: "$800 OFF", expiryDays: 1 },
  { brand: "The Iconic", code: "ICONIC15", discount: "15% OFF", expiryDays: 5 },
  { brand: "Chemist Warehouse", code: "CHEMMIE25", discount: "50% OFF", expiryDays: 2 },
  { brand: "Menulog", code: "MENULOG5", discount: "$10 OFF", expiryDays: 0 },
  { brand: "Hungry Jack's", code: "HJWHOPOP", discount: "$3 Whopper", expiryDays: 4 },
  { brand: "Qantas", code: "FLYQF50", discount: "$300 OFF", expiryDays: 7 },
  { brand: "Bunnings", code: "BUNNINGS30", discount: "$60 OFF", expiryDays: 3 },
  { brand: "Coles", code: "COLES24", discount: "50% OFF", expiryDays: 2 },
  { brand: "Dyson", code: "DYSON200", discount: "$200 OFF", expiryDays: 1 },
  { brand: "Kmart", code: "KMART15", discount: "15% OFF", expiryDays: 6 },
  { brand: "Cotton On", code: "COTTON50", discount: "25% OFF", expiryDays: 4 }
];

const TICKER_PILLS_B = [
  { brand: "Dan Murphy's", code: "DANM20", discount: "20% OFF", expiryDays: 5 },
  { brand: "Harvey Norman", code: "HARVEY30", discount: "$150 OFF", expiryDays: 2 },
  { brand: "Rebel Sport", code: "REBEL25", discount: "25% OFF", expiryDays: 3 },
  { brand: "Officeworks", code: "OFFICE15", discount: "15% OFF", expiryDays: 4 },
  { brand: "Petbarn", code: "PET20", discount: "20% OFF", expiryDays: 6 },
  { brand: "BCF", code: "BCF30", discount: "30% OFF", expiryDays: 3 },
  { brand: "SuperCheap", code: "AUTO15", discount: "15% OFF", expiryDays: 5 },
  { brand: "Flight Centre", code: "FLY200", discount: "$200 OFF", expiryDays: 7 },
  { brand: "Webjet", code: "WEB30", discount: "$30 OFF", expiryDays: 2 },
  { brand: "Boost Juice", code: "BOOST2", discount: "BOGO", expiryDays: 1 },
  { brand: "Grill'd", code: "GRILD10", discount: "$10 OFF", expiryDays: 3 },
  { brand: "Anaconda", code: "ANA25", discount: "25% OFF", expiryDays: 4 }
];

const BRAND_DOT_COLORS = {
  'Woolworths': '#007837',
  'JB Hi-Fi': '#FFD100',
  'The Iconic': '#000000',
  'Chemist Warehouse': '#E31837',
  'Menulog': '#FF8000',
  "Hungry Jack's": '#D62300',
  'Qantas': '#E40000',
  'Bunnings': '#D14F00',
  'Coles': '#E31837',
  'Dyson': '#C5003E',
  'Kmart': '#CC0000',
  'Cotton On': '#1a1a2e',
  "Dan Murphy's": '#6B0000',
  'Harvey Norman': '#CC0000',
  'Rebel Sport': '#000000',
  'Officeworks': '#CC0000',
  'Petbarn': '#005a9c',
  'BCF': '#005691',
  'SuperCheap': '#CC0000',
  'Flight Centre': '#D32F2F',
  'Webjet': '#E02020',
  'Boost Juice': '#78B82A',
  "Grill'd": '#E21836',
  'Anaconda': '#00529B',
  'default': '#047c1f'
};

const renderBrandDot = (brand) => {
  const dotColor = BRAND_DOT_COLORS[brand] || BRAND_DOT_COLORS['default'];
  if (brand === 'JB Hi-Fi') {
    return (
      <span className="w-2.5 h-2.5 rounded-full bg-[#FFD100] border border-black flex items-center justify-center shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
      </span>
    );
  }
  return (
    <span
      className="w-2.5 h-2.5 rounded-full shrink-0"
      style={{ backgroundColor: dotColor }}
    ></span>
  );
};

// 24 Deal Cards
const HERO_DEALS = [
  // ROW 1: Groceries, Tech, Fashion, Food, Travel
  { id: 'd1', brand: 'Woolworths', logo: 'WW', logoBg: 'bg-[#007837]', title: 'Half Price Cadbury Blocks & Kettle Chips', code: 'WOOLIES10', originalPrice: 6.00, salePrice: 3.00, discount: '50% OFF', expiry: 3, category: 'Groceries', state: 'National', image: 'https://picsum.photos/seed/supermarket/400/200', description: 'Weekly half price specials on selected Cadbury block chocolates and Kettle potato chips. Stock up for the weekend BBQ, mates!' },
  { id: 'd2', brand: 'JB Hi-Fi', logo: 'JB', logoBg: 'bg-[#FFD100] text-black', title: 'Samsung 65" QLED 4K Smart TV', code: 'JBHIFI20', originalPrice: 2499.00, salePrice: 1699.00, discount: '$800 OFF', saving: "Save $800", expiry: 1, expiryDays: 1, category: 'Tech', state: 'National', image: 'https://picsum.photos/seed/tv/800/500', description: 'Massive display markdown. Cinema quality for your living room.', featured: true, brandColor: "#1A1A2E", peopleGrabbed: 847, freeShipping: true },
  { id: 'd3', brand: 'The Iconic', logo: 'TI', logoBg: 'bg-black text-white', title: '15% Off Selected Autumn Denim & Jackets', code: 'ICONIC15', originalPrice: 150.00, salePrice: 127.50, discount: '15% OFF', expiry: 5, category: 'Fashion', state: 'National', image: 'https://picsum.photos/seed/fashion/400/200', description: 'Refresh your winter wardrobe with designer coats, boots, and classic rigid denim. Express shipping across Australia.' },
  { id: 'd4', brand: 'Chemist Warehouse', logo: 'CW', logoBg: 'bg-[#003B80] text-white', title: 'Swinburne Multivitamins Range 50% Off', code: 'CHEMMIE25', originalPrice: 40.00, salePrice: 20.00, discount: '50% OFF', expiry: 2, category: 'Health & Beauty', state: 'National', image: 'https://picsum.photos/seed/pharmacy/400/200', description: 'Top brand vitamins and wellness minerals at half price. Limit of 3 bottles per transaction.' },
  { id: 'd5', brand: 'Menulog', logo: 'ML', logoBg: 'bg-[#FF8000] text-white', title: '$10 Off All Orders Over $40', code: 'MENULOG5', originalPrice: 45.00, salePrice: 35.00, discount: '$10 OFF', expiry: 0, category: 'F&D', state: 'NSW', image: 'https://picsum.photos/seed/fooddelivery/400/200', description: 'Save on your weekend takeaway! Valid for NSW users only. Minimum spend of $40 applies.' },
  { id: 'd6', brand: 'Hungry Jack\'s', logo: 'HJ', logoBg: 'bg-[#E31837] text-white', title: 'Whopper Meal Voucher for $5.90', code: 'HJWHOPOP', originalPrice: 11.90, salePrice: 5.90, discount: '$6.00 OFF', expiry: 4, category: 'F&D', state: 'QLD', image: 'https://picsum.photos/seed/burger/400/200', description: 'Ripper value at Hungry Jack\'s. Get a classic flame-grilled Whopper, small chips, and drink for under six bucks.' },
  { id: 'd7', brand: 'Qantas', logo: 'QF', logoBg: 'bg-[#E31837] text-white', title: 'Return Flights Sydney to Bali — $299 pp', code: 'FLYQF50', originalPrice: 599.00, salePrice: 299.00, discount: '$300 OFF', saving: "Save $300", expiry: 3, expiryDays: 3, category: 'Travel', state: 'National', image: 'https://picsum.photos/seed/bali/800/500', description: 'Flash holiday deal. Pack your boardshorts, Bali is calling!', featured: true, brandColor: "#C62828", peopleGrabbed: 1203, freeShipping: false },
  { id: 'd8', brand: 'Bunnings Warehouse', logo: 'BW', logoBg: 'bg-[#002e5b] text-white', title: 'Ryobi ONE+ 18V Brushless Drill Kit', code: 'BUNNINGS30', originalPrice: 199.00, salePrice: 139.00, discount: '$60 OFF', expiry: 3, category: 'Home & Garden', state: 'National', image: 'https://picsum.photos/seed/hardware/400/200', description: 'Perfect tools upgrade for the weekend garage project. Drill, charger, and 4.0Ah battery included.' },
  { id: 'd9', brand: 'Coles', logo: 'CL', logoBg: 'bg-[#E31837] text-white', title: 'Half Price Coca-Cola 24-Packs', code: 'COLES24', originalPrice: 38.00, salePrice: 19.00, discount: '50% OFF', expiry: 2, category: 'Groceries', state: 'VIC', image: 'https://picsum.photos/seed/supermarket/400/200', description: 'Coles special buy: 24-packs of Coca-Cola cans at half price. Limit of 2 boxes per customer.' },
  { id: 'd10', brand: 'Dyson', logo: 'DY', logoBg: 'bg-purple-900 text-white', title: 'Dyson V15 Detect Vacuum — $200 OFF', code: 'DYSON200', originalPrice: 999.00, salePrice: 799.00, discount: '$200 OFF', saving: "Save $200", expiry: 2, expiryDays: 2, category: 'Home', state: 'National', image: 'https://picsum.photos/seed/vacuum/800/500', description: 'Upgrade to laser-guided Dyson V15. Absolute powerhouse suction.', featured: true, brandColor: "#1A237E", peopleGrabbed: 524, freeShipping: true },
  { id: 'd11', brand: 'Kmart', logo: 'KM', logoBg: 'bg-[#E31837] text-white', title: 'Retro Kettle & Toaster Appliance Bundle', code: 'KMART15', originalPrice: 45.00, salePrice: 30.00, discount: '$15 OFF', expiry: 6, category: 'Home & Garden', state: 'National', image: 'https://picsum.photos/seed/shopping/400/200', description: 'Stylish matching kitchen appliances. Give your kitchen counter a fresh retro look on the cheap.' },
  { id: 'd12', brand: 'Cotton On', logo: 'CO', logoBg: 'bg-[#3b2d2f] text-white', title: 'Buy 1 Get 1 50% Off Selected Knitwear', code: 'COTTON50', originalPrice: 80.00, salePrice: 60.00, discount: '25% OFF', expiry: 4, category: 'Fashion', state: 'VIC', image: 'https://picsum.photos/seed/clothing/400/200', description: 'Winter knitwear promo across jumpers, cardigans, and beanies. Mix and match styles.' },

  // ROW 2: Retailers & Outdoors
  { id: 'd13', brand: 'OzTech Deals', logo: 'OT', logoBg: 'bg-slate-900 text-white', title: 'Sony WH-1000XM5 headphones discount', code: 'OZTECH15', originalPrice: 399.00, salePrice: 339.15, discount: '15% OFF', expiry: 3, category: 'Tech', state: 'NSW', image: 'https://picsum.photos/seed/electronics/400/200', description: "G'day from OzTech! Crackin' 15% discount on top-tier Sony ANC headphones." },
  { id: 'd14', brand: 'Aussie Bites Bakery', logo: 'AB', logoBg: 'bg-amber-600 text-white', title: 'Fresh Gourmet Meat Pies (Dozen Pack)', code: 'AUSSIEBITES', originalPrice: 45.00, salePrice: 36.00, discount: '20% OFF', expiry: 1, category: 'F&D', state: 'VIC', image: 'https://picsum.photos/seed/fooddelivery/400/200', description: 'A dozen traditional meat pies, slow-cooked beef chuck filling. Perfect for family gatherings!' },
  { id: 'd15', brand: 'DownUnder Fashion', logo: 'DF', logoBg: 'bg-rose-700 text-white', title: 'RM Williams Craftsman Boots Markdown', code: 'DOWNUNDER', originalPrice: 450.00, salePrice: 399.00, discount: '$51 OFF', expiry: 10, category: 'Fashion', state: 'QLD', image: 'https://picsum.photos/seed/fashion/400/200', description: 'Rare savings on signature leather craftsman boots. Handcrafted in Australia.' },
  { id: 'd16', brand: 'David Jones', logo: 'DJ', logoBg: 'bg-black text-white', title: 'Designer Handbags Clearance — Save 25%', code: 'DJSAVE25', originalPrice: 400.00, salePrice: 300.00, discount: '25% OFF', expiry: 2, category: 'Fashion', state: 'NSW', image: 'https://picsum.photos/seed/shopping/400/200', description: 'Premium brands clearance in-store and online at David Jones. Selected styles only.' },
  { id: 'd17', brand: 'Myer', logo: 'MY', logoBg: 'bg-neutral-900 text-white', title: 'Sheridan Luxury Towel Sets 40% Off', code: 'MYERSHER', originalPrice: 120.00, salePrice: 72.00, discount: '40% OFF', expiry: 5, category: 'Home & Garden', state: 'National', image: 'https://picsum.photos/seed/furniture/400/200', description: 'Upgrade your bathroom linens with plush Sheridan cotton towel sets at Myer.' },
  { id: 'd18', brand: 'Dan Murphy\'s', logo: 'DM', logoBg: 'bg-[#183018] text-white', title: 'Asahi Super Dry Beer Carton $10 Off', code: 'DANMURPHYS', originalPrice: 62.00, salePrice: 52.00, discount: '$10 OFF', expiry: 3, category: 'F&D', state: 'National', image: 'https://picsum.photos/seed/wine/400/200', description: 'Carton of 24 bottles of Asahi beer. Pick up in-store or select contactless drive-through.' },
  { id: 'd19', brand: 'Uber Eats', logo: 'UE', logoBg: 'bg-black text-white', title: '$15 Off First 3 Local Grocery Deliveries', code: 'EATSGROCERY', originalPrice: 50.00, salePrice: 35.00, discount: '$15 OFF', expiry: 14, category: 'F&D', state: 'National', image: 'https://picsum.photos/seed/fooddelivery/400/200', description: 'Skip the supermarket queues and get your groceries delivered to your door in 30 mins.' },
  { id: 'd20', brand: 'Officeworks', logo: 'OW', logoBg: 'bg-[#E31837] text-white', title: 'Logitech MX Master 3S Mouse 20% Off', code: 'OFFICE20', originalPrice: 169.00, salePrice: 135.00, discount: '20% OFF', expiry: 7, category: 'Tech', state: 'National', image: 'https://picsum.photos/seed/electronics/400/200', description: 'Increase your workstation productivity. Ergonomic design with silent clicks.' },
  { id: 'd21', brand: 'Rebel Sport', logo: 'RS', logoBg: 'bg-black text-white', title: 'Under Armour Running Shoes 30% Off', code: 'REBEL30', originalPrice: 180.00, salePrice: 126.00, discount: '30% OFF', expiry: 4, category: 'Sports', state: 'WA', image: 'https://picsum.photos/seed/clothing/400/200', description: 'High-comfort runners for training and road runs. Available online and in WA stores.' },
  { id: 'd22', brand: 'BCF', logo: 'BC', logoBg: 'bg-[#004B87] text-white', title: 'Wanderer Double Dome Tent 40% Off', code: 'BCFTENT', originalPrice: 250.00, salePrice: 150.00, discount: '40% OFF', expiry: 8, category: 'Outdoors', state: 'QLD', image: 'https://picsum.photos/seed/hardware/400/200', description: 'Perfect camping tent for family getaways. High-grade weather resistance.' },
  { id: 'd23', brand: 'SuperCheap Auto', logo: 'SA', logoBg: 'bg-[#CC0000] text-white', title: 'Castrol Magnatec Engine Oil 5L 25% Off', code: 'SUPERCHEAP', originalPrice: 75.00, salePrice: 56.25, discount: '25% OFF', expiry: 5, category: 'Auto', state: 'National', image: 'https://picsum.photos/seed/hardware/400/200', description: 'Keep your motor purring. High quality synthetic engine oil.' },
  { id: 'd24', brand: 'Airbnb Australia', logo: 'AA', logoBg: 'bg-[#FF5A5F] text-white', title: 'Tasmanian Cozy Cabin Getaways $100 Off', code: 'AIRBNB100', originalPrice: 350.00, salePrice: 250.00, discount: '$100 OFF', expiry: 9, category: 'Travel', state: 'TAS', image: 'https://picsum.photos/seed/airplane/400/200', description: 'Book a peaceful winter weekend cabin in Tasmania. Minimum 2 nights stay.' }
];

// 12 Community Deals
const INITIAL_COMMUNITY_DEALS = [
  { id: 'cd1', user: 'OzBargainKing', avatar: 'OB', userColor: 'bg-green-700', title: 'Woolies half price chips this week - Kettle and Red Rock Deli', store: 'Woolworths', discount: '50%', upvotes: 94, comments: [{ user: 'BlakeyB', comment: 'Grabbed 4 packets from my local Woolies in St Kilda, heaps good!' }], time: '2 hours ago', category: 'Groceries', state: 'NSW', body: 'Red Rock Deli and Kettle chips are half price this week at Woolies. Checked my local at St Kilda and they have plenty of stock. Great time to stock up for the weekend!' },
  { id: 'cd2', user: 'NSWTechGuy', avatar: 'NT', userColor: 'bg-blue-500', title: 'JB Hi-Fi Samsung TV $400 off + extra coupon code active', store: 'JB Hi-Fi', discount: '$400 OFF', upvotes: 68, comments: [], time: '4 hours ago', category: 'Tech', state: 'NSW', body: 'Samsung 65" 4K Smart TV is marked down by $400. Use coupon code JBEXTRA50 at checkout for an additional $50 off. Click and collect is free.' },
  { id: 'cd3', user: 'MelbFoodie', avatar: 'MF', userColor: 'bg-amber-600', title: 'Guzman y Gomez BOGO burrito Tuesday - Brisbane stores', store: 'Guzman y Gomez', discount: 'BOGO', upvotes: 112, comments: [], time: '5 hours ago', category: 'F&D', state: 'QLD', body: 'Guzman y Gomez BOGO Burritos are back for Tuesday only at selected Brisbane outlets. Make sure to scan your GYG app to claim the buy-one-get-one-free offer.' },
  { id: 'cd4', user: 'TashFromPerth', avatar: 'TP', userColor: 'bg-purple-500', title: 'Chemist Warehouse 40% off Swisse vitamins and protein powders', store: 'Chemist Warehouse', discount: '40% OFF', upvotes: 49, comments: [], time: '1 day ago', category: 'Health & Beauty', state: 'WA', body: 'Huge range of Swisse vitamins, supplements, and protein powders are 40% off. Online order with free shipping over $50, or click and collect at Chemist Warehouse.' },
  { id: 'cd5', user: 'BrisbaneBargains', avatar: 'BB', userColor: 'bg-rose-500', title: 'Flight Centre $200 off Bali travel packages with code FLYQF50', store: 'Flight Centre', discount: '$200 OFF', upvotes: 38, comments: [], time: '1 day ago', category: 'Travel', state: 'QLD', body: 'Book Bali packages today with Flight Centre and get $200 off using coupon code FLYQF50. Valid for flights and accommodation booked together before the end of the month.' },
  { id: 'cd6', user: 'PerthSaver', avatar: 'PS', userColor: 'bg-teal-500', title: 'Bunnings garden tools & potting mix clearance - local warehouses', store: 'Bunnings', discount: 'Clearance', upvotes: 56, comments: [], time: '2 days ago', category: 'Home & Garden', state: 'WA', body: 'Spotted clearance prices on garden hand tools, soil mix, and select outdoor pots at Bunnings. Stock varies by store but definitely worth a look if you are near one.' },
  { id: 'cd7', user: 'AdelaideDealz', avatar: 'AD', userColor: 'bg-indigo-500', title: 'Woolworths 4c/L fuel voucher discount when spending $30', store: 'Woolworths', discount: '4c / Litre', upvotes: 27, comments: [], time: '2 days ago', category: 'Auto', state: 'SA', body: 'Get a 4c per litre fuel voucher when you spend $30 or more in a single transaction at Woolworths. Can be redeemed at participating Ampol or EG Ampol service stations.' },
  { id: 'cd8', user: 'AussieShopaholic', avatar: 'AS', userColor: 'bg-pink-500', title: 'Bonds underwear pack 40% discount at Myer online store', store: 'Myer', discount: '40% OFF', upvotes: 82, comments: [], time: '3 days ago', category: 'Fashion', state: 'VIC', body: 'Bonds mens and womens underwear packs are discounted by 40% on Myer online. Stackable with free shipping for Myer One members on orders over $99.' },
  { id: 'cd9', user: 'QLDMum', avatar: 'QM', userColor: 'bg-orange-500', title: 'Rip Curl wetsuits and rashies clearance sale at BCF QLD', store: 'BCF', discount: '30% OFF', upvotes: 19, comments: [], time: '3 days ago', category: 'Outdoors', state: 'QLD', body: 'Rip Curl springsuits, steamers, and rash vests are cleared out at BCF Queensland stores. Savings up to 30% off original retail price. Check online stock first.' },
  { id: 'cd10', user: 'VICFashionista', avatar: 'VF', userColor: 'bg-purple-600', title: 'McDonalds loose change menu update - $2 cheeseburgers', store: 'McDonald\'s', discount: '$2 Cheeseburger', upvotes: 41, comments: [], time: '4 days ago', category: 'F&D', state: 'VIC', body: 'McDonalds has updated their loose change menu items. Cheeseburgers are back to $2 on the app for a limited time. Good cheap snack option.' },
  { id: 'cd11', user: 'SAGardenGuru', avatar: 'SG', userColor: 'bg-emerald-600', title: 'Officeworks student discount on iPads & MacBooks active', store: 'Officeworks', discount: '10% OFF', upvotes: 33, comments: [], time: '4 days ago', category: 'Tech', state: 'SA', body: 'Officeworks has launched their Back to Uni deals. iPads, MacBooks, and select student tech accessories are discounted. Show your student card or sign up online.' },
  { id: 'cd12', user: 'WASurfer', avatar: 'WS', userColor: 'bg-sky-600', title: 'Qantas reward seats Sydney to Queenstown winter holidays', store: 'Qantas', discount: 'Reward seats', upvotes: 75, comments: [], time: '5 days ago', category: 'Travel', state: 'TAS', body: 'Qantas has opened up reward seats for Sydney to Queenstown route for winter holidays. Grab them before they are gone, great value for points!' }
];

const RETAILERS_LIST = [
  { name: 'Woolworths', logo: 'WW', logoBg: 'bg-[#007837] text-white', colorCode: '#007837' },
  { name: 'JB Hi-Fi', logo: 'JB', logoBg: 'bg-[#FFD100] text-black', colorCode: '#FFD100' },
  { name: 'Coles', logo: 'CL', logoBg: 'bg-[#E31837] text-white', colorCode: '#E31837' },
  { name: 'Chemist Warehouse', logo: 'CW', logoBg: 'bg-[#003B80] text-white', colorCode: '#003B80' },
  { name: 'Bunnings', logo: 'BW', logoBg: 'bg-[#002e5b] text-white', colorCode: '#002e5b' },
  { name: 'Kmart', logo: 'KM', logoBg: 'bg-[#E31837] text-white', colorCode: '#E31837' },
  { name: 'Cotton On', logo: 'CO', logoBg: 'bg-[#3b2d2f] text-white', colorCode: '#3b2d2f' },
  { name: 'Myer', logo: 'MY', logoBg: 'bg-neutral-900 text-white', colorCode: '#171717' },
  { name: 'The Iconic', logo: 'TI', logoBg: 'bg-black text-white', colorCode: '#000000' },
  { name: 'David Jones', logo: 'DJ', logoBg: 'bg-black text-white', colorCode: '#000000' },
  { name: 'Harvey Norman', logo: 'HN', logoBg: 'bg-red-950 text-white', colorCode: '#450a0a' },
  { name: 'Rebel Sport', logo: 'RS', logoBg: 'bg-black text-white', colorCode: '#000000' },
  { name: 'Dan Murphy\'s', logo: 'DM', logoBg: 'bg-[#183018] text-white', colorCode: '#183018' },
  { name: 'Uber Eats', logo: 'UE', logoBg: 'bg-black text-white', colorCode: '#000000' }
];

const BRAND_DARK_COLORS = {
  'Woolworths': '#005e2b',
  'JB Hi-Fi': '#a87e00',
  'The Iconic': '#1c1c1c',
  'Chemist Warehouse': '#00224d',
  'Menulog': '#b35900',
  'Hungry Jack\'s': '#9e1026',
  'Qantas': '#b3122c',
  'Bunnings Warehouse': '#001b36',
  'Coles': '#b3122c',
  'Dyson': '#3f0e63',
  'Kmart': '#b3122c',
  'Cotton On': '#241a1b',
  'OzTech Deals': '#0f172a',
  'Aussie Bites Bakery': '#8a470b',
  'DownUnder Fashion': '#8f1d2c',
  'David Jones': '#1c1c1c',
  'Myer': '#171717',
  'Dan Murphy\'s': '#0e1f0e',
  'Uber Eats': '#1c1c1c',
  'Officeworks': '#b3122c',
  'Rebel Sport': '#1c1c1c',
  'BCF': '#002d52',
  'SuperCheap Auto': '#990000',
  'Airbnb Australia': '#cc484d',
  'default': '#047c1f'
};

const TICKER_BRAND_COLORS = {
  'Woolworths': '#006B3C',
  'JB Hi-Fi': '#1A1A2E',
  'The Iconic': '#1a1a1a',
  'Chemist Warehouse': '#B71C1C',
  'Menulog': '#D84315',
  "Hungry Jack's": '#BF360C',
  'Qantas': '#C62828',
  'Bunnings': '#1B5E20',
  'Coles': '#880E4F',
  'Dyson': '#1A237E',
  'Kmart': '#B71C1C',
  'Cotton On': '#212121',
  "Dan Murphy's": '#4A148C',
  'Harvey Norman': '#E65100',
  'Rebel Sport': '#1C1C1C',
  'Officeworks': '#C62828',
  'Petbarn': '#1565C0',
  'BCF': '#0D47A1',
  'SuperCheap': '#F57F17',
  'Flight Centre': '#00695C',
  'Webjet': '#1565C0',
  'Boost Juice': '#AD1457',
  "Grill'd": '#33691E',
  'Anaconda': '#2E7D32',
  'David Jones': '#1A1A1A',
  'Myer': '#171717',
  'Uber Eats': '#000000'
};

const CATEGORY_NAMES = [
  'Tech', 'Auto', 'Fashion', 'F&D', 'Groceries',
  'Health & Beauty', 'Home & Garden', 'Outdoors', 'Pets',
  'Travel', 'Insurance', 'Finance', 'Rental', 'Sports'
];

const COMMUNITY_CATEGORY_EMOJIS = {
  'Tech': '💻',
  'Auto': '🚗',
  'Fashion': '👗',
  'F&D': '🍔',
  'Groceries': '🛒',
  'Health & Beauty': '💊',
  'Home & Garden': '🏠',
  'Outdoors': '🏕️',
  'Pets': '🐾',
  'Travel': '✈️',
  'Insurance': '🛡️',
  'Finance': '💰',
  'Rental': '🔑',
  'Sports': '⚽'
};

const COMMUNITY_ADS = [
  {
    id: 'ad1',
    title: 'Vegemite Clearance',
    sponsor: 'Woolworths',
    discount: 'Buy 1 Get 1 Free',
    image: 'https://picsum.photos/seed/vegemite-ad/400/500',
    link: '#store/woolworths',
    description: 'BOGO on all Vegemite jars this week at your local Woolies! 🇦🇺'
  },
  {
    id: 'ad2',
    title: 'Vintec Wine Chillers',
    sponsor: 'JB Hi-Fi',
    discount: 'Up to 30% Off',
    image: 'https://picsum.photos/seed/vintec-ad/400/500',
    link: '#store/jb-hi-fi',
    description: 'Keep your wines chilled to perfection this winter season.'
  },
  {
    id: 'ad3',
    title: 'Aussie Bites Bulk Box',
    sponsor: 'Coles',
    discount: '$4.50 Off Box',
    image: 'https://picsum.photos/seed/aussiebites-ad/400/500',
    link: '#store/coles',
    description: 'Spotted bulk box of organic Aussie Bites on special discount.'
  },
  {
    id: 'ad4',
    title: 'BCF Camping Sale',
    sponsor: 'BCF Store',
    discount: '40% Off Tents',
    image: 'https://picsum.photos/seed/bcf-ad/400/500',
    link: '#store/bcf',
    description: 'Get ready for your winter campout with premium gear.'
  }
];

const TIMEFRAME_OPTIONS = [
  'Last 24 Hours',
  'Last 48 Hours',
  'Last 7 Days',
  'Last 14 Days',
  'Last 21 Days',
  'Last 28 Days'
];

const FIXED_CATEGORIES = [
  { label: '💻 Tech', value: 'Tech' },
  { label: '🚗 Auto', value: 'Auto' },
  { label: '👗 Fashion', value: 'Fashion' },
  { label: '🍔 F&B', value: 'F&B' },
  { label: '🛒 Groceries', value: 'Groceries' },
  { label: '💊 Health & Beauty', value: 'Health & Beauty' },
  { label: '🏠 Home & Garden', value: 'Home & Garden' },
  { label: '🏕️ Outdoors', value: 'Outdoors' },
  { label: '🐾 Pets', value: 'Pets' },
  { label: '✈️ Travel', value: 'Travel' },
  { label: '🛡️ Insurance', value: 'Insurance' },
  { label: '💰 Finance', value: 'Finance' },
  { label: '🔑 Rental', value: 'Rental' },
  { label: '⚽ Sports', value: 'Sports' }
];

const AUSTRALIAN_SUBURBS = [
  { postcode: '2000', suburb: 'Sydney CBD', state: 'NSW' },
  { postcode: '2010', suburb: 'Surry Hills', state: 'NSW' },
  { postcode: '2020', suburb: 'Mascot', state: 'NSW' },
  { postcode: '2060', suburb: 'North Sydney', state: 'NSW' },
  { postcode: '2100', suburb: 'Manly', state: 'NSW' },
  { postcode: '2150', suburb: 'Parramatta', state: 'NSW' },
  { postcode: '2200', suburb: 'Bankstown', state: 'NSW' },
  { postcode: '3000', suburb: 'Melbourne CBD', state: 'VIC' },
  { postcode: '3004', suburb: 'South Yarra', state: 'VIC' },
  { postcode: '3051', suburb: 'North Melbourne', state: 'VIC' },
  { postcode: '3121', suburb: 'Richmond', state: 'VIC' },
  { postcode: '3182', suburb: 'St Kilda', state: 'VIC' },
  { postcode: '3205', suburb: 'South Melbourne', state: 'VIC' },
  { postcode: '4000', suburb: 'Brisbane CBD', state: 'QLD' },
  { postcode: '4101', suburb: 'West End', state: 'QLD' },
  { postcode: '4102', suburb: 'Woolloongabba', state: 'QLD' },
  { postcode: '4217', suburb: 'Surfers Paradise', state: 'QLD' },
  { postcode: '4350', suburb: 'Toowoomba', state: 'QLD' },
  { postcode: '6000', suburb: 'Perth CBD', state: 'WA' },
  { postcode: '6005', suburb: 'West Perth', state: 'WA' },
  { postcode: '6008', suburb: 'Subiaco', state: 'WA' },
  { postcode: '6100', suburb: 'Victoria Park', state: 'WA' },
  { postcode: '5000', suburb: 'Adelaide CBD', state: 'SA' },
  { postcode: '5031', suburb: 'Thebarton', state: 'SA' },
  { postcode: '5067', suburb: 'Norwood', state: 'SA' },
  { postcode: '7000', suburb: 'Hobart CBD', state: 'TAS' },
  { postcode: '7005', suburb: 'Sandy Bay', state: 'TAS' },
  { postcode: '2601', suburb: 'Canberra CBD', state: 'ACT' },
  { postcode: '2602', suburb: 'Dickson', state: 'ACT' },
  { postcode: '0800', suburb: 'Darwin CBD', state: 'NT' },
  { postcode: '0810', suburb: 'Casuarina', state: 'NT' },
];

const CATEGORY_BORDER_COLORS = {
  'F&D': '#D84315',
  'Tech': '#1565C0',
  'Fashion': '#AD1457',
  'Travel': '#00695C',
  'Health & Beauty': '#6A1B9A',
  'Home & Garden': '#2E7D32',
  'Outdoors': '#0D47A1',
  'Groceries': '#006B3C',
  'Pets': '#F57F17',
  'Auto': '#BF360C',
  'Insurance': '#00838F',
  'Finance': '#00695C',
  'Rental': '#EF6C00',
  'Sports': '#1A237E'
};

// ==========================================
// COUNTDOWN COMPONENTS
// ==========================================

const DetailCountdown = ({ expiryDays, isProduct }) => {
  if (isProduct) {
    return (
      <div className="bg-[#f0faf2] rounded-xl p-4 flex flex-col items-center justify-center border border-[#047c1f]/20 text-center space-y-1">
        <span className="text-xs text-[#047c1f] font-extrabold uppercase tracking-wider flex items-center gap-1.5 justify-center">
          <Check className="w-4 h-4 text-[#047c1f]" /> Verified Partner Product
        </span>
        <span className="font-display text-lg font-black text-[#047c1f]">
          In stock and ready to buy directly from partner
        </span>
      </div>
    );
  }

  const targetDateRef = React.useRef(null);
  if (!targetDateRef.current) {
    const target = new Date();
    const daysToAdd = expiryDays === 0 ? 0.5 : (expiryDays || 1);
    targetDateRef.current = target.getTime() + daysToAdd * 24 * 60 * 60 * 1000;
  }
  const [timeLeft, setTimeLeft] = React.useState(() => Math.max(0, targetDateRef.current - Date.now()));

  React.useEffect(() => {
    const timer = setInterval(() => {
      const remaining = Math.max(0, targetDateRef.current - Date.now());
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const isExpired = timeLeft <= 0;

  let timerColorClass = 'text-[#047c1f]'; // > 3 days
  let isUrgent = false;
  if (isExpired) {
    timerColorClass = 'text-[#B71C1C]';
  } else if (days < 1) { // < 24 hours
    timerColorClass = 'text-[#B71C1C]';
    isUrgent = true;
  } else if (days <= 3) { // 1–3 days
    timerColorClass = 'text-[#F57F17]';
  }

  return (
    <div className="bg-[#f5f5f5] rounded-xl p-4 flex flex-col items-center justify-center border border-[#e8e8e8] text-center space-y-1">
      <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">⏱ Campaign Countdown</span>
      <span className={`font-mono text-xl font-extrabold ${timerColorClass} ${isUrgent ? 'animate-pulse-fast' : ''}`}>
        {isExpired ? 'Deal Expired' : `${days}d ${hours}h ${minutes}m ${seconds}s remaining`}
      </span>
    </div>
  );
};

const DealCard = ({
  deal,
  idx,
  savedDeals,
  handleSaveDeal,
  handleGrabDeal,
  handleCopyCode,
  hideCoupon = false
}) => {
  const targetDateRef = React.useRef(null);
  if (!targetDateRef.current) {
    const target = new Date();
    const daysToAdd = deal.expiry === 0 ? 0.5 : (deal.expiry || 1);
    targetDateRef.current = target.getTime() + daysToAdd * 24 * 60 * 60 * 1000;
  }

  const [timeLeft, setTimeLeft] = React.useState(() => Math.max(0, targetDateRef.current - Date.now()));

  React.useEffect(() => {
    const timer = setInterval(() => {
      const remaining = Math.max(0, targetDateRef.current - Date.now());
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const isExpired = timeLeft <= 0;

  let timerColorClass = 'text-[#047c1f]'; // > 3 days
  let isUrgent = false;
  if (isExpired) {
    timerColorClass = 'text-red-600';
  } else if (days < 1) { // < 24 hours
    timerColorClass = 'text-red-600';
    isUrgent = true;
  } else if (days <= 3) { // 1–3 days
    timerColorClass = 'text-[#F57F17]';
  }

  return (
    <div
      onClick={() => {
        if (!isExpired) {
          window.location.hash = `#deal/${deal.id}`;
        }
      }}
      className={`bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_24px_rgba(4,124,31,0.12)] transition-all duration-300 border border-slate-200/50 flex flex-col justify-between group cursor-pointer ${isExpired ? 'opacity-50 pointer-events-none' : ''}`}
    >
      {/* Card Top Block / Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {isExpired ? (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-slate-600 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[8.5px] sm:text-[9px] font-bold flex items-center gap-1 shadow-md uppercase tracking-wider">
            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> EXPIRED
          </div>
        ) : deal.isProduct ? (
          <div className={`absolute top-2 left-2 sm:top-3 sm:left-3 z-10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[8.5px] sm:text-[9px] font-bold flex items-center gap-1.5 shadow-md uppercase tracking-wider ${deal.status === 'In stock'
            ? 'bg-emerald-600 text-white'
            : deal.status === 'Low stock'
              ? 'bg-amber-500 text-white'
              : 'bg-rose-600 text-white'
            }`}>
            <ShoppingBag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#fdc800]" /> {deal.status || 'IN STOCK'}
          </div>
        ) : (
          deal.expiry <= 2 && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-red-600 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[8.5px] sm:text-[9px] font-bold flex items-center gap-1 shadow-md uppercase tracking-wider animate-pulse">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> EXPIRING SOON
            </div>
          )
        )}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-[#047c1f] text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11.5px] font-black shadow-lg">
          {deal.discount}
        </div>
        <img
          src={deal.image}
          alt={deal.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Card Body / Details */}
      <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category Row */}
          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
            <div className={`w-5.5 h-5.5 sm:w-6.5 sm:h-6.5 rounded-[6px] ${deal.logoBg || 'bg-[#047c1f] text-white'} text-white flex items-center justify-center font-extrabold text-[9px] sm:text-[11px] shadow-sm shrink-0`}>
              {deal.logo}
            </div>
            <div className="text-left min-w-0">
              <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none m-0 truncate">{deal.brand}</p>
              <p className="text-[7.5px] sm:text-[8.5px] text-slate-400 font-bold mt-0.5 leading-none m-0 truncate">{deal.category} • {deal.state}</p>
            </div>
          </div>

          {/* Deal Title */}
          <h4 className="font-display text-[11px] sm:text-[12.5px] font-extrabold text-[#0d0d0d] leading-[1.3] group-hover:text-[#047c1f] transition-colors line-clamp-2 text-left mb-1 sm:mb-1.5">
            {deal.title}
          </h4>

          {/* Description & Terms */}
          {deal.description && (
            <p className="text-slate-500 text-[9.5px] sm:text-[10px] line-clamp-1 text-left leading-relaxed mb-0.5 font-medium">
              {deal.description}
            </p>
          )}
          <p className="text-[8px] sm:text-[8.5px] text-[#888] font-bold text-left mb-1.5 select-none leading-none">
            *T&Cs apply. Subject to availability.
          </p>
        </div>

        {/* Action Blocks */}
        <div className="space-y-2 pt-1.5 sm:pt-2.5 border-t border-slate-100 mt-auto">
          {/* Price & Code copy */}
          <div className="flex justify-between items-center gap-2">
            <div className="text-left">
              <span className="text-[9px] sm:text-[10px] text-slate-400 line-through block font-semibold leading-none">${deal.originalPrice.toFixed(2)}</span>
              <span className="font-display text-[13px] sm:text-[15px] font-extrabold text-[#047c1f] leading-none mt-1 block">
                ${deal.salePrice.toFixed(2)} <span className="text-[8px] sm:text-[9px] font-bold text-slate-500">AUD</span>
              </span>
            </div>

            {!hideCoupon && deal.code && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyCode(deal.code, e);
                }}
                className="bg-[#fdc800] hover:bg-[#e0b000] text-[#0d0d0d] font-bold font-mono text-[8.5px] sm:text-[9.5px] rounded-[6px] flex items-center gap-1 px-1.5 py-1 sm:px-2.5 sm:py-1 transition-colors cursor-pointer border-none shadow-sm font-sans"
                disabled={isExpired}
              >
                <span className="font-mono">{deal.code}</span> <Copy className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0d0d0d]" />
              </button>
            )}
          </div>

          {/* Countdown & grab buttons row */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSaveDeal(deal.id, e);
              }}
              className={`w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-lg border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${savedDeals.has(deal.id) ? 'bg-[#e6f2e8] border-[#047c1f]/30 text-[#047c1f]' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'}`}
              title="Save deal"
              disabled={isExpired}
            >
              <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleGrabDeal(deal, e);
              }}
              disabled={isExpired}
              className="flex-grow h-7.5 sm:h-8.5 font-extrabold text-[10px] sm:text-[11.5px] rounded-lg flex items-center justify-center gap-0.5 sm:gap-1 shadow-md shadow-[#047c1f]/10 transition-colors cursor-pointer bg-[#047c1f] hover:bg-[#036318] text-white"
            >
              Grab Deal <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>

          {/* Expiry display */}
          <div className="flex items-center justify-center bg-slate-50 border border-slate-100/50 rounded-[6px] py-0.5 px-1.5 gap-1 text-[8px] sm:text-[8.5px] font-semibold text-slate-400">
            {deal.isProduct ? (
              <span className="text-[#047c1f] font-bold flex items-center gap-1">
                <Check className="w-2.5 h-2.5 text-[#047c1f]" /> Verified Partner Product
              </span>
            ) : (
              <>
                <span>⏱ Expires:</span>
                <span className={`font-mono font-bold ${timerColorClass} ${isUrgent ? 'animate-pulse' : ''}`}>
                  {isExpired ? 'Expired' : `${days}d ${hours}h ${minutes}m ${seconds}s`}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TickerCard = ({ retailer, matchingDeal, handleCopyCode, idx, isDup }) => {
  const [btnHovered, setBtnHovered] = useState(false);
  const bgColor = matchingDeal?.brandColor || matchingDeal?.bg || TICKER_BRAND_COLORS[retailer.name] || '#047c1f';

  const handleClick = () => {
    const storeLinkMap = {
      'Woolworths': 'oztech-deals',
      'JB Hi-Fi': 'oztech-deals',
      'Coles': 'aussie-bites',
      'Chemist Warehouse': 'oztech-deals',
      'Bunnings': 'downunder-fashion'
    };
    const target = storeLinkMap[retailer.name] || 'oztech-deals';
    window.location.hash = `#store/${target}`;
  };

  return (
    <div
      key={`ticker2-${isDup ? 'dup' : 'orig'}-${retailer.name}-${idx}`}
      onClick={handleClick}
      className="w-[160px] sm:w-[220px] h-[140px] sm:h-[160px] p-3 sm:p-4 shrink-0 rounded-[8px] text-white flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer relative overflow-hidden select-none text-left"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-xs sm:text-sm text-white border-2 border-white shrink-0">
          {retailer.logo}
        </span>
        <span className="text-[13px] sm:text-[15px] font-bold text-white truncate leading-tight">
          {retailer.name}
        </span>
      </div>

      <div>
        <div className="text-[17px] sm:text-[22px] font-bold font-mono text-white leading-none tracking-tight">
          {matchingDeal.code}
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-[13px] sm:text-[16px] text-[#fdc800] font-extrabold">{matchingDeal.discount}</span>
          <span className="text-[11px] sm:text-[13px] text-white font-medium">${matchingDeal.salePrice.toFixed(0)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-white/10">
        <span className="text-[10px] sm:text-[12px] text-white/95 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Exp: {matchingDeal.expiry}d
        </span>

        <button
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            handleCopyCode(matchingDeal.code, e);
          }}
          className="px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-lg font-bold text-[11px] sm:text-[13px] transition-colors cursor-pointer border-0"
          style={{
            backgroundColor: btnHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
            color: btnHovered ? bgColor : '#ffffff'
          }}
        >
          COPY
        </button>
      </div>
    </div>
  );
};

// ==========================================
// CORE APP COMPONENT
// ==========================================

const BRAND_PILL_COLORS = {
  "Woolworths": { bg: "#006B3C", text: "white" },
  "JB Hi-Fi": { bg: "#1A1A2E", text: "white" },
  "The Iconic": { bg: "#1a1a1a", text: "white" },
  "Chemist Warehouse": { bg: "#B71C1C", text: "white" },
  "Menulog": { bg: "#D84315", text: "white" },
  "Hungry Jack's": { bg: "#BF360C", text: "white" },
  "Qantas": { bg: "#C62828", text: "white" },
  "Bunnings": { bg: "#1B5E20", text: "white" },
  "Coles": { bg: "#880E4F", text: "white" },
  "Dyson": { bg: "#1A237E", text: "white" },
  "Kmart": { bg: "#B71C1C", text: "white" },
  "Cotton On": { bg: "#212121", text: "white" },
  "Dan Murphy's": { bg: "#4A148C", text: "white" },
  "Harvey Norman": { bg: "#E65100", text: "white" },
  "Rebel Sport": { bg: "#1C1C1C", text: "white" },
  "Officeworks": { bg: "#C62828", text: "white" },
  "Petbarn": { bg: "#1565C0", text: "white" },
  "BCF": { bg: "#0D47A1", text: "white" },
  "SuperCheap": { bg: "#D84315", text: "white" },
  "Flight Centre": { bg: "#00695C", text: "white" },
  "Webjet": { bg: "#1565C0", text: "white" },
  "Boost Juice": { bg: "#AD1457", text: "white" },
  "Grill'd": { bg: "#33691E", text: "white" },
  "Anaconda": { bg: "#2E7D32", text: "white" },
};

const DEFAULT_PILL_COLOR = { bg: "#047c1f", text: "white" };

const TickerCountdown = ({ expiryTs }) => {
  const [timeLeft, setTimeLeft] = useState('')
  const [urgency, setUrgency] = useState('normal')

  useEffect(() => {
    const update = () => {
      const now = Date.now()
      const diff = expiryTs - now

      if (diff <= 0) {
        setTimeLeft('Expired')
        setUrgency('expired')
        return
      }

      const totalSeconds = Math.floor(diff / 1000)
      const days = Math.floor(totalSeconds / 86400)
      const hours = Math.floor((totalSeconds % 86400) / 3600)
      const mins = Math.floor((totalSeconds % 3600) / 60)
      const secs = totalSeconds % 60

      if (days >= 3) {
        setUrgency('normal')
        setTimeLeft(`${days}d ${hours}h`)
      } else if (days >= 1) {
        setUrgency('warning')
        setTimeLeft(`${days}d ${hours}h ${mins}m`)
      } else if (totalSeconds > 3600) {
        setUrgency('urgent')
        setTimeLeft(`${hours}h ${mins}m ${secs}s`)
      } else {
        setUrgency('critical')
        setTimeLeft(
          `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
        )
      }
    }

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [expiryTs])

  const styles = {
    normal: {
      bg: 'rgba(255,255,255,0.15)',
      color: 'rgba(255,255,255,0.8)',
      icon: '⏱'
    },
    warning: {
      bg: 'rgba(253,200,0,0.25)',
      color: '#fdc800',
      icon: '⚡'
    },
    urgent: {
      bg: 'rgba(255,100,0,0.25)',
      color: '#ff9944',
      icon: '🔥'
    },
    critical: {
      bg: 'rgba(220,30,30,0.3)',
      color: '#ff4444',
      icon: '🚨'
    },
    expired: {
      bg: 'rgba(100,100,100,0.3)',
      color: 'rgba(255,255,255,0.4)',
      icon: '✕'
    },
  }

  const s = styles[urgency]

  return (
    <span
      style={{
        backgroundColor: s.bg,
        color: s.color,
        padding: '2px 7px',
        borderRadius: '4px',
        fontSize: '10px',
        fontFamily: 'monospace',
        fontWeight: 700,
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        animation: urgency === 'critical'
          ? 'pulse 1s ease-in-out infinite'
          : 'none',
      }}
    >
      {s.icon} {timeLeft}
    </span>
  )
}

const CATEGORY_EMOJIS = {
  'All Categories': '🏷️',
  'F&D': '🍔',
  'Tech': '💻',
  'Fashion': '👗',
  'Travel': '✈️',
  'Health & Beauty': '💊',
  'Home & Garden': '🏠',
  'Outdoors': '🏕️',
  'Groceries': '🛒',
  'Pets': '🐾',
  'Auto': '🚗',
  'Insurance': '🛡️',
  'Finance': '💰',
  'Rental': '🔑',
  'Sports': '⚽'
};

const categoryOptions = [
  '🏷️ All Categories',
  'divider',
  '🍔 F&D',
  '💻 Tech',
  '👗 Fashion',
  '✈️ Travel',
  '💊 Health & Beauty',
  '🏠 Home & Garden',
  '🏕️ Outdoors',
  '🛒 Groceries',
  '🐾 Pets',
  '🚗 Auto',
  '🛡️ Insurance',
  '💰 Finance',
  '🔑 Rental',
  '⚽ Sports'
];

const discountOptions = [
  '💰 Any Discount',
  'divider',
  '🔥 10%+ OFF',
  '🔥 20%+ OFF',
  '🔥 30%+ OFF',
  '🔥 50%+ OFF',
  '💵 $10+ Saving',
  '💵 $50+ Saving',
  '💵 $100+ Saving',
  '💵 $200+ Saving'
];

const expiryOptions = [
  '⏰ Any Time',
  'divider',
  '🚨 Expiring Today',
  '⚡ Ends in 2 days',
  '📅 This Week',
  '📅 This Month',
  '♾️ No Expiry'
];

const sortOptions = [
  '🔥 Most Popular',
  '🆕 Newest First',
  '⏰ Expiring Soon',
  '💰 Biggest Discount',
  '💵 Highest Saving ($)',
  '👁 Most Viewed',
  '💬 Most Comments'
];

const ALL_CITIES = [
  "Sydney, NSW",
  "Melbourne, VIC",
  "Brisbane, QLD",
  "Perth, WA",
  "Adelaide, SA",
  "Gold Coast, QLD",
  "Newcastle, NSW",
  "Canberra, ACT",
  "Hobart, TAS",
  "Darwin, NT",
  "Sunshine Coast, QLD",
  "Wollongong, NSW",
  "Geelong, VIC",
  "Townsville, QLD",
  "Cairns, QLD"
];

const cleanOption = (opt) => {
  if (!opt) return opt;
  return opt.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '').trim();
};

const COMMUNITY_POST_IMAGES = {
  'cd1': 'https://picsum.photos/seed/woolies-chips/120/90',
  'cd2': 'https://picsum.photos/seed/samsung-tv/120/90',
  'cd3': 'https://picsum.photos/seed/burrito/120/90',
  'cd4': 'https://picsum.photos/seed/vitamins/120/90',
  'cd5': 'https://picsum.photos/seed/Bali-travel/120/90',
  'cd6': 'https://picsum.photos/seed/garden-tools/120/90',
  'cd7': 'https://picsum.photos/seed/fuel/120/90',
  'cd8': 'https://picsum.photos/seed/underwear/120/90',
  'cd9': 'https://picsum.photos/seed/wetsuit/120/90',
  'cd10': 'https://picsum.photos/seed/burger/120/90',
  'cd11': 'https://picsum.photos/seed/laptop/120/90',
  'cd12': 'https://picsum.photos/seed/airplane/120/90',
};

const getCommunityPostImage = (post) => {
  return COMMUNITY_POST_IMAGES[post.id]
    || `https://picsum.photos/seed/${post.store?.replace(/\s+/g, '-').toLowerCase() || post.id}/120/90`;
};

const mapProductToDeal = (p) => {
  const originalPriceVal = parseFloat(p.price?.replace(/[^0-9.]/g, '')) || 0;
  const salePriceVal = originalPriceVal * (1 - (p.store?.discountRate || 0));
  return {
    id: `prod-${p.id}`,
    brand: p.store?.name || '',
    logo: p.store?.logo || '',
    logoBg: p.store?.logoBg || 'bg-[#047c1f] text-white',
    title: p.name,
    code: p.store?.couponCode || '',
    originalPrice: originalPriceVal,
    salePrice: salePriceVal,
    discount: p.store?.discountText || `${Math.round((p.store?.discountRate || 0) * 100)}% OFF`,
    expiry: 7,
    expiryDays: 7,
    category: p.category || 'Tech',
    state: p.store?.location ? p.store.location.split(', ')[1] : 'National',
    regions: p.store?.location ? [p.store.location.split(', ')[1]] : ['All Australia'],
    image: p.image,
    description: p.desc,
    isProduct: true,
    stock: p.stock,
    status: p.status,
    rawProduct: p
  };
};

export default function App() {
  const [tickerPillsA, setTickerPillsA] = useState(TICKER_PILLS_A);
  const [tickerPillsB, setTickerPillsB] = useState(TICKER_PILLS_B);

  const PILL_EXPIRY_TIMESTAMPS = useMemo(() => {
    const map = {}
    const allPills = [...tickerPillsA, ...tickerPillsB]
    allPills.forEach(pill => {
      if (!map[pill.code]) {
        const d = new Date()
        d.setDate(d.getDate() + (pill.expiryDays ?? 3))
        d.setHours(23, 59, 59, 0)
        map[pill.code] = d.getTime()
      }
    })
    return map
  }, [tickerPillsA, tickerPillsB]);

  // --- Routing & Auth State ---
  const [currentRoute, setCurrentRoute] = useState('#home');
  const [currentUser, setCurrentUser] = useState(null); // null = Guest
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [redirectModalOpen, setRedirectModalOpen] = useState(false);
  const [redirectStoreName, setRedirectStoreName] = useState('');

  // --- Restock Alert & Sales Report Modals State ---
  const [restockModalOpen, setRestockModalOpen] = useState(false);
  const [salesReportModalOpen, setSalesReportModalOpen] = useState(false);
  const [restockSelectedProduct, setRestockSelectedProduct] = useState('linen');
  const [isRestockSending, setIsRestockSending] = useState(false);
  const [restockSuccess, setRestockSuccess] = useState(false);
  const [salesReportTimeframe, setSalesReportTimeframe] = useState('Last 30 Days');

  // --- Manage Coupon Ticker Modal States ---
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null); // null = add new
  const [editingCouponRow, setEditingCouponRow] = useState('A'); // 'A' or 'B'
  const [editingCouponIndex, setEditingCouponIndex] = useState(-1); // index inside the row
  const [couponFormBrand, setCouponFormBrand] = useState('');
  const [couponFormCode, setCouponFormCode] = useState('');
  const [couponFormDiscount, setCouponFormDiscount] = useState('');
  const [couponFormExpiryDays, setCouponFormExpiryDays] = useState(3);
  const [couponFormBg, setCouponFormBg] = useState('');

  // --- Featured Ads (Ticker Card) Modal States ---
  const [featuredAdModalOpen, setFeaturedAdModalOpen] = useState(false);
  const [editingFeaturedAd, setEditingFeaturedAd] = useState(null); // null = add new
  const [editingFeaturedAdIndex, setEditingFeaturedAdIndex] = useState(-1);
  const [featuredAdFormBrand, setFeaturedAdFormBrand] = useState('');
  const [featuredAdFormTitle, setFeaturedAdFormTitle] = useState('');
  const [featuredAdFormCode, setFeaturedAdFormCode] = useState('');
  const [featuredAdFormDiscount, setFeaturedAdFormDiscount] = useState('');
  const [featuredAdFormSalePrice, setFeaturedAdFormSalePrice] = useState(0);
  const [featuredAdFormOriginalPrice, setFeaturedAdFormOriginalPrice] = useState(0);
  const [featuredAdFormExpiry, setFeaturedAdFormExpiry] = useState(3);
  const [featuredAdFormBg, setFeaturedAdFormBg] = useState('');
  const [featuredAdFormCategory, setFeaturedAdFormCategory] = useState('Tech');
  const [featuredAdFormState, setFeaturedAdFormState] = useState('National');
  const [featuredAdFormImage, setFeaturedAdFormImage] = useState('');
  const [featuredAdFormDesc, setFeaturedAdFormDesc] = useState('');

  // --- Interface & Data State ---
  const [activeFilter, setActiveFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All Australia');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  // New Filter Section states
  const [selectedState, setSelectedState] = useState('All Australia');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedDiscount, setSelectedDiscount] = useState('Any Discount');
  const [selectedExpiry, setSelectedExpiry] = useState('Any Time');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const [showMobileProductFilters, setShowMobileProductFilters] = useState(false);

  const [detectedLocation, setDetectedLocation] = useState('Australia');
  const [locationDropOpen, setLocationDropOpen] = useState(false);
  const [mobileLocationDropOpen, setMobileLocationDropOpen] = useState(false);
  const [showSavedPanel, setShowSavedPanel] = useState(false);

  const stateDropRef = useRef(null);
  const cityDropRef = useRef(null);
  const categoryDropRef = useRef(null);
  const discountDropRef = useRef(null);
  const expiryDropRef = useRef(null);
  const sortDropRef = useRef(null);
  const locationNavRef = useRef(null);
  const mobileSuburbSearchRef = useRef(null);
  const savedNavRef = useRef(null);
  const suburbSearchRef = useRef(null);

  // --- Dynamic Operations ---
  const [communityDeals, setCommunityDeals] = useState(INITIAL_COMMUNITY_DEALS);
  const [upvotedPosts, setUpvotedPosts] = useState(new Set());
  const [savedDeals, setSavedDeals] = useState(new Set());

  const [communityPanelOpen, setCommunityPanelOpen] =
    useState(false);
  const [communitySort, setCommunitySort] =
    useState('hot');
  const [communityPostText, setCommunityPostText] =
    useState('');
  const [communityPostTitle, setCommunityPostTitle] =
    useState('');
  const [communityPostStore, setCommunityPostStore] =
    useState('');
  const [communityPostCategory, setCommunityPostCategory] =
    useState('Tech');
  const [communityPostLink, setCommunityPostLink] =
    useState('');
  const [expandedPost, setExpandedPost] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [communityView, setCommunityView] =
    useState('feed');
  const [communityCategoryFilter, setCommunityCategoryFilter] = useState('All');
  const [communitySearchQuery, setCommunitySearchQuery] = useState('');

  const [selectedSuburb, setSelectedSuburb] = useState(null);
  const [postcodeInput, setPostcodeInput] = useState('');

  // Retailer Dashboard state
  const [retailerTab, setRetailerTab] = useState('overview');
  // tabs: 'overview' | 'profile' | 'products' | 'deals' | 'featured' | 'stock'
  const [stockSearchQuery, setStockSearchQuery] = useState('');
  const [stockFilter, setStockFilter] = useState('All');

  const [retailerProducts, setRetailerProducts] = useState([
    {
      id: 'rp1',
      name: 'Sony WH-1000XM5 Headphones',
      price: 399.00,
      stock: 12,
      category: 'Tech',
      status: 'Active',
      image: null,
      imagePreview: 'https://picsum.photos/seed/headphones/400/300',
      desc: 'Industry leading noise cancelling headphones.',
      createdAt: '12 May 2025',
    },
    {
      id: 'rp2',
      name: 'MacBook Air M3 13"',
      price: 1599.00,
      stock: 4,
      category: 'Tech',
      status: 'Active',
      image: null,
      imagePreview: 'https://picsum.photos/seed/laptop/400/300',
      desc: 'Latest Apple silicon for work and study.',
      createdAt: '18 May 2025',
    },
    {
      id: 'rp3',
      name: 'iPad Pro M4 11"',
      price: 1249.00,
      stock: 8,
      category: 'Tech',
      status: 'Active',
      image: null,
      imagePreview: 'https://picsum.photos/seed/tablet/400/300',
      desc: 'Ultra thin design with OLED display.',
      createdAt: '20 May 2025',
    },
    {
      id: 'rp4',
      name: 'Sony Alpha 7 IV Camera',
      price: 2499.00,
      stock: 3,
      category: 'Tech',
      status: 'Active',
      image: null,
      imagePreview: 'https://picsum.photos/seed/camera/400/300',
      desc: 'Hybrid full-frame mirrorless camera.',
      createdAt: '22 May 2025',
    },
    {
      id: 'rp5',
      name: 'Dyson V15 Detect Vacuum',
      price: 999.00,
      stock: 15,
      category: 'Home',
      status: 'Active',
      image: null,
      imagePreview: 'https://picsum.photos/seed/vacuum/400/300',
      desc: 'Powerful intelligent cordless vacuum cleaner.',
      createdAt: '24 May 2025',
    },
    {
      id: 'rp6',
      name: 'Dell XPS 15 Laptop',
      price: 1899.00,
      stock: 5,
      category: 'Tech',
      status: 'Active',
      image: null,
      imagePreview: 'https://picsum.photos/seed/dellxps/400/300',
      desc: 'Stunning display with high performance processors.',
      createdAt: '25 May 2025',
    },
    {
      id: 'rp7',
      name: 'Bose QuietComfort Ultra',
      price: 349.00,
      stock: 20,
      category: 'Tech',
      status: 'Active',
      image: null,
      imagePreview: 'https://picsum.photos/seed/bose/400/300',
      desc: 'World-class noise cancellation headphones.',
      createdAt: '26 May 2025',
    },
    {
      id: 'rp8',
      name: 'Nintendo Switch OLED',
      price: 449.00,
      stock: 18,
      category: 'Tech',
      status: 'Active',
      image: null,
      imagePreview: 'https://picsum.photos/seed/switch/400/300',
      desc: 'Vibrant OLED screen console for gaming.',
      createdAt: '27 May 2025',
    },
    {
      id: 'rp9',
      name: 'Apple Watch Ultra 2',
      price: 899.00,
      stock: 6,
      category: 'Tech',
      status: 'Active',
      image: null,
      imagePreview: 'https://picsum.photos/seed/iwatch/400/300',
      desc: 'Ultimate sports watch with dual-frequency GPS.',
      createdAt: '28 May 2025',
    },
    {
      id: 'rp10',
      name: 'GoPro HERO12 Black',
      price: 499.00,
      stock: 10,
      category: 'Tech',
      status: 'Active',
      image: null,
      imagePreview: 'https://picsum.photos/seed/gopro/400/300',
      desc: 'Best-in-class image quality with HyperSmooth stabilization.',
      createdAt: '30 May 2025',
    }
  ]);

  const filteredStockProducts = useMemo(() => {
    return retailerProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(stockSearchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(stockSearchQuery.toLowerCase());

      const threshold = p.reorderThreshold || 5;
      const isOutOfStock = p.stock === 0;
      const isLowStock = p.stock > 0 && p.stock <= threshold;

      if (stockFilter === 'In Stock') {
        return matchesSearch && p.stock > threshold;
      }
      if (stockFilter === 'Low Stock') {
        return matchesSearch && isLowStock;
      }
      if (stockFilter === 'Out of Stock') {
        return matchesSearch && isOutOfStock;
      }
      return matchesSearch;
    });
  }, [retailerProducts, stockSearchQuery, stockFilter]);

  const [retailerDeals, setRetailerDeals] = useState([
    {
      id: 'rd1',
      title: 'Sony WH-1000XM5 headphones discount',
      code: 'OZTECH15',
      originalPrice: 399.00,
      salePrice: 339.15,
      discount: '15% OFF',
      category: 'Tech',
      state: 'NSW',
      expiry: 3,
      status: 'Active',
      views: 842,
      grabs: 127,
    },
  ]);

  const [featuredRequests, setFeaturedRequests] = useState([
    {
      id: 'fr1',
      dealTitle: 'Sony WH-1000XM5 headphones discount',
      requestedDate: '20 May 2025',
      status: 'Pending',
      message: 'Would love to feature this deal on the homepage banner.',
      budget: '$50 AUD',
    },
  ]);

  // Add product form state
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: 'Tech',
    desc: '',
    imagePreview: '',
  });

  // Add deal form state  
  const [showAddDeal, setShowAddDeal] = useState(false);
  const [newRetailerDeal, setNewRetailerDeal] = useState({
    title: '',
    code: '',
    originalPrice: '',
    salePrice: '',
    category: 'Tech',
    state: 'NSW',
    expiry: '7',
    desc: '',
  });

  // Featured request form state
  const [showFeaturedRequest, setShowFeaturedRequest] = useState(false);
  const [featuredRequestForm, setFeaturedRequestForm] = useState({
    dealTitle: '',
    message: '',
    budget: '',
    duration: '7 days',
  });

  // Retailer profile edit state
  const [editingProfile, setEditingProfile] = useState(false);
  const [retailerProfile, setRetailerProfile] = useState({
    storeName: 'OzTech Deals',
    tagline: "Sydney's best tech deals 🇦🇺",
    location: 'Sydney, NSW',
    phone: '+61 2 9000 0000',
    email: 'hello@oztech.com.au',
    website: 'www.oztech.com.au',
    abn: '12 345 678 901',
    category: 'Tech',
    description: 'OzTech Deals is Sydney\'s premier technology retailer, offering the best prices on the latest gadgets and electronics. We are a verified 7deals partner committed to bringing Aussies the best tech bargains.',
  });

  // Admin Dashboard state
  const [adminTab, setAdminTab] = useState('overview');
  // tabs: overview | users | moderators | banner | 
  //        featured | categories | deals | stock | notifications

  // Moderator Dashboard state
  const [moderatorTab, setModeratorTab] = useState('overview');
  // tabs: overview | flagged | community | coupons | banner
  const [moderatorSystemFilter, setModeratorSystemFilter] = useState(true);
  const [flaggedDeals, setFlaggedDeals] = useState([
    { id: 'fd1', title: 'Free iPhone 15 Pro Max at Woolworths - glitched code', reporter: 'OzBargainQueen', reason: 'Fake/Spam - Woolies does not sell iPhones', dealId: 'deal1', time: '10 mins ago', status: 'Pending' },
    { id: 'fd2', title: 'Harvey Norman 90% off all laptops and computers', reporter: 'BargainHunter42', reason: 'Expired / Misleading - only select laptops on sale', dealId: 'deal2', time: '40 mins ago', status: 'Pending' }
  ]);

  // Users (consumers) management
  const [adminUsers, setAdminUsers] = useState([
    {
      id: 'au1',
      name: 'OzTech Owner',
      email: 'consumer@demo.com',
      role: 'consumer',
      store: 'OzTech Deals',
      status: 'Active',
      joined: '01 Jan 2024',
      avatar: 'OT',
      color: 'bg-emerald-600',
      location: 'Sydney, NSW',
      dealsCount: 1,
      category: 'Tech',
      verified: true,
    },
    {
      id: 'au2',
      name: 'Aussie Bites Owner',
      email: 'bites@demo.com',
      role: 'consumer',
      store: 'Aussie Bites Bakery',
      status: 'Active',
      joined: '05 Mar 2024',
      avatar: 'AB',
      color: 'bg-amber-600',
      location: 'Melbourne, VIC',
      dealsCount: 6,
      category: 'F&D',
      verified: true,
    },
    {
      id: 'au3',
      name: 'DownUnder Owner',
      email: 'fashion@demo.com',
      role: 'consumer',
      store: 'DownUnder Fashion',
      status: 'Pending',
      joined: '10 Sep 2024',
      avatar: 'DF',
      color: 'bg-rose-600',
      location: 'Brisbane, QLD',
      dealsCount: 10,
      category: 'Fashion',
      verified: false,
    },
  ]);

  // Moderators management
  const [adminModerators, setAdminModerators] = useState([
    {
      id: 'am1',
      name: 'OzBargainKing',
      email: 'mod1@7deals.com.au',
      avatar: 'OB',
      color: 'bg-green-700',
      status: 'Active',
      joined: '01 Dec 2023',
      region: 'NSW',
      postsModerated: 142,
      permissions: ['approve_deals', 'remove_posts', 'warn_users'],
    },
    {
      id: 'am2',
      name: 'AussieShopaholic',
      email: 'mod2@7deals.com.au',
      avatar: 'AS',
      color: 'bg-pink-500',
      status: 'Active',
      joined: '15 Jan 2024',
      region: 'VIC',
      postsModerated: 89,
      permissions: ['approve_deals', 'remove_posts'],
    },
  ]);

  // Banner management
  const [adminBanners, setAdminBanners] = useState([
    {
      id: 'ab1',
      title: '🔥 247 new deals today — Updated for Aussie shoppers 🦘',
      type: 'announcement',
      status: 'Active',
      bgColor: '#0d0d0d',
      textColor: '#fdc800',
      link: '',
      startDate: '01 May 2025',
      endDate: '31 Dec 2025',
    },
    {
      id: 'ab2',
      title: '⭐ Top retailers updated',
      type: 'highlight',
      status: 'Active',
      bgColor: '#047c1f',
      textColor: '#ffffff',
      link: '#deals',
      startDate: '01 May 2025',
      endDate: '31 Dec 2025',
    },
  ]);

  // Category management
  const [adminCategories, setAdminCategories] = useState([
    { id: 'ac1', label: 'All Deals', value: 'All', emoji: '🏷️', active: true, dealCount: 24 },
    { id: 'ac2', label: 'F&D', value: 'F&D', emoji: '🍔', active: true, dealCount: 6 },
    { id: 'ac3', label: 'Tech', value: 'Tech', emoji: '💻', active: true, dealCount: 5 },
    { id: 'ac4', label: 'Fashion', value: 'Fashion', emoji: '👗', active: true, dealCount: 4 },
    { id: 'ac5', label: 'Travel', value: 'Travel', emoji: '✈️', active: true, dealCount: 3 },
    { id: 'ac6', label: 'Health & Beauty', value: 'Health & Beauty', emoji: '💊', active: true, dealCount: 2 },
    { id: 'ac7', label: 'Home & Garden', value: 'Home & Garden', emoji: '🏠', active: true, dealCount: 3 },
    { id: 'ac8', label: 'Outdoors', value: 'Outdoors', emoji: '🏕️', active: true, dealCount: 2 },
    { id: 'ac9', label: 'Groceries', value: 'Groceries', emoji: '🛒', active: true, dealCount: 2 },
    { id: 'ac10', label: 'Pets', value: 'Pets', emoji: '🐾', active: false, dealCount: 0 },
    { id: 'ac11', label: 'Auto', value: 'Auto', emoji: '🚗', active: true, dealCount: 2 },
    { id: 'ac13', label: 'Insurance', value: 'Insurance', emoji: '🛡️', active: true, dealCount: 0 },
    { id: 'ac14', label: 'Finance', value: 'Finance', emoji: '💰', active: true, dealCount: 0 },
    { id: 'ac15', label: 'Rental', value: 'Rental', emoji: '🔑', active: true, dealCount: 0 },
    { id: 'ac12', label: 'Sports', value: 'Sports', emoji: '⚽', active: true, dealCount: 1 },
  ]);

  // Notification state
  const [notifTarget, setNotifTarget] = useState('all');
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('info');
  const [sentNotifications, setSentNotifications] = useState([
    {
      id: 'sn1',
      title: 'New Feature: Suburb Filter',
      message: 'You can now filter deals by suburb and postcode!',
      target: 'all',
      type: 'info',
      sentAt: '20 May 2025',
      sentBy: 'Admin',
    },
    {
      id: 'sn2',
      title: 'Platform Maintenance Tonight',
      message: 'Brief maintenance window 11pm-12am AEST.',
      target: 'moderators',
      type: 'warning',
      sentAt: '18 May 2025',
      sentBy: 'Admin',
    },
  ]);

  // Form modals for admin
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddModerator, setShowAddModerator] = useState(false);
  const [showAddBanner, setShowAddBanner] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingModerator, setEditingModerator] = useState(null);

  // New user / moderator form
  const [newAdminUser, setNewAdminUser] = useState({
    name: '', email: '', store: '', category: 'Tech',
    location: 'Sydney, NSW', status: 'Pending',
  });
  const [newAdminModerator, setNewAdminModerator] = useState({
    name: '', email: '', region: 'NSW',
    permissions: ['approve_deals'],
  });
  const [newBanner, setNewBanner] = useState({
    title: '', type: 'announcement',
    bgColor: '#0d0d0d', textColor: '#fdc800',
    link: '', startDate: '', endDate: '',
  });
  const [newCategory, setNewCategory] = useState({
    label: '', emoji: '🏷️', value: '',
  });

  // --- Auth Modal Form Inputs ---
  const [authTab, setAuthTab] = useState('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authIsConsumer, setAuthIsConsumer] = useState(false);
  const [authBusinessName, setAuthBusinessName] = useState('');
  const [authBusinessCategory, setAuthBusinessCategory] = useState('Tech');
  const [authBusinessPhone, setAuthBusinessPhone] = useState('');

  // --- Add Product / Post Deal Form State ---
  const [newDealTitle, setNewDealTitle] = useState('');
  const [newDealCode, setNewDealCode] = useState('');
  const [newDealOrigPrice, setNewDealOrigPrice] = useState('');
  const [newDealDiscPrice, setNewDealDiscPrice] = useState('');
  const [newDealExpiry, setNewDealExpiry] = useState('');
  const [newDealCategory, setNewDealCategory] = useState('Tech');
  const [newDealState, setNewDealState] = useState('National');
  const [newDealDesc, setNewDealDesc] = useState('');

  // Admin state modifiers
  const [siteName, setSiteName] = useState('7deals');
  const [siteTagline, setSiteTagline] = useState("Australia's #1 community deals platform 🇦🇺");
  const [allDeals, setAllDeals] = useState(() =>
    HERO_DEALS.map((deal, idx) => {
      const regions = (!deal.state || deal.state === 'National') ? ['All Australia'] : [deal.state];
      const views = deal.views || (deal.peopleGrabbed ? deal.peopleGrabbed * 2 : (idx * 47) % 300 + 120);
      const commentsCount = deal.commentsCount || (idx * 13) % 15;
      return {
        ...deal,
        regions,
        views,
        commentsCount
      };
    })
  );

  // Profile Page Sub-Tabs
  const [profileTab, setProfileTab] = useState('saved'); // saved, posts
  const [trackingOrderId, setTrackingOrderId] = useState(null);

  // Store Page Sub-Tabs
  const [storeTab, setStoreTab] = useState('products'); // products, deals, about

  // Mobile Menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDashboardMenuOpen, setMobileDashboardMenuOpen] = useState(false);
  const [mobileAdminMenuOpen, setMobileAdminMenuOpen] = useState(false);

  // Selected deal for detail modal
  const [selectedDeal, setSelectedDeal] = useState(null);

  // Featured deal rotation index state (0, 1, 2)
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Time remaining countdown clock state
  const [timeRemaining, setTimeRemaining] = useState('');

  const [featuredTimeLeft, setFeaturedTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0, urgency: 'normal' });
  const [featuredCopied, setFeaturedCopied] = useState(false);
  const [activeSort, setActiveSort] = useState('Popular');
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % COMMUNITY_ADS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const [visibleDealsCount, setVisibleDealsCount] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 15;
  });

  const [activeMetric, setActiveMetric] = useState('deals'); // deals, retailers, moderators, spotlight

  // Timeframe states and refs for dashboard filters
  const merchantTimeframeRef = useRef(null);
  const adminTimeframeRef = useRef(null);
  const moderatorTimeframeRef = useRef(null);

  const [merchantTimeframe, setMerchantTimeframe] = useState('Last 28 Days');
  const [adminTimeframe, setAdminTimeframe] = useState('Last 28 Days');
  const [moderatorTimeframe, setModeratorTimeframe] = useState('Last 28 Days');

  // Shopping Cart & Checkout states
  const [cart, setCart] = useState([]);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [couponInputs, setCouponInputs] = useState({}); // storeId -> current text input
  const [appliedCoupons, setAppliedCoupons] = useState({}); // storeId -> applied coupon code
  const [purchaseHistory, setPurchaseHistory] = useState([
    {
      id: 'ORD-583920',
      date: '25 May 2026',
      items: [
        {
          product: { id: 'p1', name: 'MacBook Air M3 13"', price: '$1,599.00 AUD' },
          store: { id: 'oztech-deals', name: 'OzTech Deals' },
          quantity: 1
        }
      ],
      subtotal: 1599.00,
      discount: 239.85,
      total: 1359.15,
      status: 'Delivered',
      carrier: 'Australia Post',
      trackingNumber: 'AP-502938173',
      shipping: {
        fullName: 'Bruce Wayne',
        email: 'bruce@waynecorp.com.au',
        phone: '0412 345 678',
        address: '100 Batman Rd',
        suburb: 'Gotham',
        state: 'VIC',
        postcode: '3000'
      },
      timeline: [
        { title: 'Order Placed', desc: 'Order received and payment approved', time: '25 May, 09:12 AM', done: true },
        { title: 'Processing', desc: 'Packed and prepared at merchant warehouse', time: '25 May, 11:30 AM', done: true },
        { title: 'Shipped', desc: 'Handed over to Australia Post · Tracking ID: AP-502938173', time: '25 May, 03:45 PM', done: true },
        { title: 'Delivered', desc: 'Delivered at mailbox/front door · Signature on file', time: '26 May, 10:24 AM', done: true, active: true }
      ]
    }
  ]); // past orders list
  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    suburb: '',
    state: 'NSW',
    postcode: ''
  });
  const [checkoutStep, setCheckoutStep] = useState('shipping');
  const [shipToDifferent, setShipToDifferent] = useState(false);
  const [diffShippingForm, setDiffShippingForm] = useState({
    fullName: '',
    address: '',
    suburb: '',
    state: 'NSW',
    postcode: ''
  });
  const [paymentForm, setPaymentForm] = useState({
    cardholderName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  // Global Products states & aggregation
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [productStoreFilter, setProductStoreFilter] = useState('All');
  const [productSearchQuery, setProductSearchQuery] = useState('');

  const allProducts = useMemo(() => {
    return Object.values(STORES).flatMap(store => {
      let category = 'Tech';
      if (store.id === 'aussie-bites') category = 'F&D';
      if (store.id === 'downunder-fashion') category = 'Fashion';

      return store.products.map(p => ({
        ...p,
        category,
        store: {
          id: store.id,
          name: store.name,
          logo: store.logo,
          logoBg: store.logoBg,
          location: store.location,
          couponCode: store.couponCode,
          discountRate: store.discountRate,
          discountText: store.discountText
        }
      }));
    });
  }, []);

  const handleBuyNow = (product, store) => {
    if (!currentUser) {
      setLoginModalOpen(true);
      triggerToast('Please sign in to buy this product', 'warning');
      return;
    }

    // Add to cart if it isn't in cart yet
    setCart((prevCart) => {
      const exists = prevCart.some(item => item.product.id === product.id && item.store.id === store.id);
      if (!exists) {
        return [...prevCart, { product, store, quantity: 1 }];
      }
      return prevCart;
    });

    // Open checkout modal
    setCheckoutModalOpen(true);
    triggerToast(`Proceeding to checkout for ${product.name}!`, 'info');
  };

  // Cart operations
  const addToCart = (product, store) => {
    if (!currentUser) {
      setLoginModalOpen(true);
      triggerToast('Please sign in to add items to your cart', 'warning');
      return;
    }
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.product.id === product.id && item.store.id === store.id);
      if (existing) {
        triggerToast(`Increased quantity of ${product.name} in cart!`, 'success');
        return prevCart.map(item =>
          (item.product.id === product.id && item.store.id === store.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        triggerToast(`Added ${product.name} to cart!`, 'success');
        return [...prevCart, { product, store, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (productId, storeId, delta) => {
    setCart((prevCart) => {
      return prevCart.map(item => {
        if (item.product.id === productId && item.store.id === storeId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (productId, storeId) => {
    setCart((prevCart) => {
      return prevCart.filter(item => !(item.product.id === productId && item.store.id === storeId));
    });
    triggerToast('Item removed from cart', 'info');
  };

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const numericStr = priceStr.replace(/[$,\s]|AUD/gi, '');
    return parseFloat(numericStr) || 0;
  };

  // Group cart items by store to apply store-wise coupons
  const cartGroupedByStore = useMemo(() => {
    const groups = {};
    cart.forEach(item => {
      const storeId = item.store.id;
      if (!groups[storeId]) {
        groups[storeId] = {
          store: item.store,
          items: [],
          subtotal: 0,
          discount: 0,
          total: 0
        };
      }
      const price = parsePrice(item.product.price);
      const itemCost = price * item.quantity;
      groups[storeId].items.push({ ...item, unitPrice: price, totalCost: itemCost });
      groups[storeId].subtotal += itemCost;
    });

    // Apply store-wise coupons
    Object.keys(groups).forEach(storeId => {
      const group = groups[storeId];
      const appliedCode = appliedCoupons[storeId];

      let discountRate = 0;
      if (storeId === 'oztech-deals' && appliedCode === 'OZTECH15') {
        discountRate = 0.15;
      } else if (storeId === 'aussie-bites' && appliedCode === 'AUSSIEBITES') {
        discountRate = 0.20;
      } else if (storeId === 'downunder-fashion' && appliedCode === 'DOWNUNDER') {
        discountRate = 0.25;
      }

      group.discount = group.subtotal * discountRate;
      group.total = group.subtotal - group.discount;
    });

    return groups;
  }, [cart, appliedCoupons]);

  const cartTotals = useMemo(() => {
    let subtotal = 0;
    let discount = 0;
    let total = 0;
    Object.keys(cartGroupedByStore).forEach(storeId => {
      const g = cartGroupedByStore[storeId];
      subtotal += g.subtotal;
      discount += g.discount;
      total += g.total;
    });
    return { subtotal, discount, total };
  }, [cartGroupedByStore]);

  // Memoized dynamic dashboard metrics
  const merchantMetrics = useMemo(() => {
    const baseViews = 24892;
    const baseSales = 12450;
    const baseGrabs = retailerDeals.reduce((acc, d) => acc + (d.grabs || 0), 0);
    const baseActiveDeals = retailerDeals.filter(d => d.status === 'Active').length;

    switch (merchantTimeframe) {
      case 'Last 24 Hours':
        return {
          views: Math.round(baseViews * 0.033).toLocaleString(),
          sales: `$${Math.round(baseSales * 0.033).toLocaleString()}`,
          grabs: Math.round(baseGrabs * 0.033),
          activeDeals: baseActiveDeals,
          growthViews: '+1.5%',
          growthSales: '+0.5%',
          grabsStatus: 'Growing'
        };
      case 'Last 48 Hours':
        return {
          views: Math.round(baseViews * 0.066).toLocaleString(),
          sales: `$${Math.round(baseSales * 0.066).toLocaleString()}`,
          grabs: Math.round(baseGrabs * 0.066),
          activeDeals: baseActiveDeals,
          growthViews: '+2.8%',
          growthSales: '+1.4%',
          grabsStatus: 'Growing'
        };
      case 'Last 7 Days':
        return {
          views: Math.round(baseViews * 0.23).toLocaleString(),
          sales: `$${Math.round(baseSales * 0.23).toLocaleString()}`,
          grabs: Math.round(baseGrabs * 0.23),
          activeDeals: baseActiveDeals,
          growthViews: '+8.4%',
          growthSales: '+3.2%',
          grabsStatus: 'Stabilized'
        };
      case 'Last 14 Days':
        return {
          views: Math.round(baseViews * 0.46).toLocaleString(),
          sales: `$${Math.round(baseSales * 0.46).toLocaleString()}`,
          grabs: Math.round(baseGrabs * 0.46),
          activeDeals: baseActiveDeals,
          growthViews: '+9.8%',
          growthSales: '+5.4%',
          grabsStatus: 'Growing'
        };
      case 'Last 21 Days':
        return {
          views: Math.round(baseViews * 0.69).toLocaleString(),
          sales: `$${Math.round(baseSales * 0.69).toLocaleString()}`,
          grabs: Math.round(baseGrabs * 0.69),
          activeDeals: baseActiveDeals,
          growthViews: '+10.9%',
          growthSales: '+7.1%',
          grabsStatus: 'Growing'
        };
      case 'Last 28 Days':
      default:
        return {
          views: baseViews.toLocaleString(),
          sales: `$${baseSales.toLocaleString()}`,
          grabs: baseGrabs,
          activeDeals: baseActiveDeals,
          growthViews: '+12%',
          growthSales: '+8.4%',
          grabsStatus: 'Stabilized'
        };
    }
  }, [merchantTimeframe, retailerDeals]);

  const moderatorMetrics = useMemo(() => {
    const baseFlags = flaggedDeals.filter(d => d.status === 'Pending').length;
    const baseSpotlight = communityDeals.length;
    const baseCoupons = allDeals.length;
    const baseNotices = adminBanners.filter(b => b.status === 'Active').length;

    switch (moderatorTimeframe) {
      case 'Last 24 Hours':
        return {
          flags: Math.max(1, Math.round(baseFlags * 0.1)),
          spotlight: Math.max(1, Math.round(baseSpotlight * 0.08)),
          coupons: Math.max(2, Math.round(baseCoupons * 0.15)),
          notices: baseNotices
        };
      case 'Last 48 Hours':
        return {
          flags: Math.max(1, Math.round(baseFlags * 0.18)),
          spotlight: Math.max(1, Math.round(baseSpotlight * 0.15)),
          coupons: Math.max(2, Math.round(baseCoupons * 0.28)),
          notices: baseNotices
        };
      case 'Last 7 Days':
        return {
          flags: Math.max(1, Math.round(baseFlags * 0.45)),
          spotlight: Math.max(1, Math.round(baseSpotlight * 0.45)),
          coupons: Math.max(2, Math.round(baseCoupons * 0.5)),
          notices: baseNotices
        };
      case 'Last 14 Days':
        return {
          flags: Math.max(1, Math.round(baseFlags * 0.7)),
          spotlight: Math.max(1, Math.round(baseSpotlight * 0.7)),
          coupons: Math.max(2, Math.round(baseCoupons * 0.75)),
          notices: baseNotices
        };
      case 'Last 21 Days':
        return {
          flags: Math.max(1, Math.round(baseFlags * 0.85)),
          spotlight: Math.max(1, Math.round(baseSpotlight * 0.85)),
          coupons: Math.max(2, Math.round(baseCoupons * 0.9)),
          notices: baseNotices
        };
      case 'Last 28 Days':
      default:
        return {
          flags: baseFlags,
          spotlight: baseSpotlight,
          coupons: baseCoupons,
          notices: baseNotices
        };
    }
  }, [moderatorTimeframe, flaggedDeals, communityDeals, allDeals, adminBanners]);

  const adminMetrics = useMemo(() => {
    const baseDeals = allDeals.length;
    const baseRetailers = adminUsers.length;
    const baseModerators = adminModerators.length;
    const baseSpotlight = featuredRequests.length;

    switch (adminTimeframe) {
      case 'Last 24 Hours':
        return {
          deals: Math.max(1, Math.round(baseDeals * 0.08)),
          retailers: baseRetailers,
          moderators: baseModerators,
          spotlight: Math.max(0, Math.round(baseSpotlight * 0.1))
        };
      case 'Last 48 Hours':
        return {
          deals: Math.max(1, Math.round(baseDeals * 0.15)),
          retailers: baseRetailers,
          moderators: baseModerators,
          spotlight: Math.max(0, Math.round(baseSpotlight * 0.2))
        };
      case 'Last 7 Days':
        return {
          deals: Math.max(1, Math.round(baseDeals * 0.4)),
          retailers: baseRetailers,
          moderators: baseModerators,
          spotlight: Math.max(0, Math.round(baseSpotlight * 0.45))
        };
      case 'Last 14 Days':
        return {
          deals: Math.max(1, Math.round(baseDeals * 0.7)),
          retailers: baseRetailers,
          moderators: baseModerators,
          spotlight: Math.max(0, Math.round(baseSpotlight * 0.75))
        };
      case 'Last 21 Days':
        return {
          deals: Math.max(1, Math.round(baseDeals * 0.85)),
          retailers: baseRetailers,
          moderators: baseModerators,
          spotlight: Math.max(0, Math.round(baseSpotlight * 0.9))
        };
      case 'Last 28 Days':
      default:
        return {
          deals: baseDeals,
          retailers: baseRetailers,
          moderators: baseModerators,
          spotlight: baseSpotlight
        };
    }
  }, [adminTimeframe, allDeals, adminUsers, adminModerators, featuredRequests]);

  // Compute mock trend coordinates for admin dashboard multi-line chart
  const adminChartData = useMemo(() => {
    let labels = [];
    switch (adminTimeframe) {
      case 'Last 24 Hours':
        labels = ['24h ago', '18h ago', '12h ago', '6h ago', '3h ago', 'Now'];
        break;
      case 'Last 48 Hours':
        labels = ['48h ago', '36h ago', '24h ago', '18h ago', '12h ago', '6h ago', 'Now'];
        break;
      case 'Last 7 Days':
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        break;
      case 'Last 14 Days':
        labels = ['14d ago', '12d ago', '10d ago', '8d ago', '6d ago', '4d ago', '2d ago', 'Now'];
        break;
      case 'Last 21 Days':
        labels = ['21d ago', '18d ago', '15d ago', '12d ago', '9d ago', '6d ago', '3d ago', 'Now'];
        break;
      case 'Last 28 Days':
      default:
        labels = Array.from({ length: 28 }, (_, i) => String(i + 1));
        break;
    }

    const pointsCount = labels.length;
    const dMax = adminMetrics.deals;
    const rMax = adminMetrics.retailers;
    const mMax = adminMetrics.moderators;
    const sMax = adminMetrics.spotlight;

    const deals = Array.from({ length: pointsCount }, (_, i) => {
      const factor = (i + 1) / pointsCount;
      return Math.round(dMax * (0.4 + factor * 0.55 + Math.sin(i * 1.2) * 0.05));
    });

    const retailers = Array.from({ length: pointsCount }, (_, i) => {
      const factor = (i + 1) / pointsCount;
      return Math.round(rMax * (0.7 + factor * 0.28 + Math.cos(i * 0.8) * 0.02));
    });

    const moderators = Array.from({ length: pointsCount }, (_, i) => {
      const factor = (i + 1) / pointsCount;
      return Math.round(mMax * (0.8 + factor * 0.19 + Math.sin(i * 1.5) * 0.01));
    });

    const spotlights = Array.from({ length: pointsCount }, (_, i) => {
      const factor = (i + 1) / pointsCount;
      return Math.max(0, Math.round(sMax * (0.2 + factor * 0.75 + Math.sin(i * 2) * 0.05)));
    });

    deals[pointsCount - 1] = dMax;
    retailers[pointsCount - 1] = rMax;
    moderators[pointsCount - 1] = mMax;
    spotlights[pointsCount - 1] = sMax;

    return { labels, deals, retailers, moderators, spotlights };
  }, [adminTimeframe, adminMetrics]);

  useEffect(() => {
    setVisibleDealsCount(isMobile ? 20 : 15);
  }, [isMobile, activeFilter, stateFilter, searchQuery, activeSort, selectedState, selectedCity, selectedCategory, selectedDiscount, selectedExpiry, sortBy]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const isInsideFilterBar = e.target.closest('.filter-dropdown-container');
      const isInsidePortal = e.target.closest('[data-portal-dropdown]');
      const isInsideMobileSearch = mobileSuburbSearchRef.current?.contains(e.target);
      const isInsideLocationNav = locationNavRef.current?.contains(e.target);
      if (!isInsideFilterBar && !isInsidePortal && !isInsideMobileSearch && !isInsideLocationNav) {
        setOpenDropdown(null);
        setLocationDropOpen(false);
        setMobileLocationDropOpen(false);
        setShowSavedPanel(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);



  useEffect(() => {
    const featuredDeals = allDeals.filter(d => d.featured);
    const deal = featuredDeals[featuredIndex] || featuredDeals[0];
    if (!deal) return;

    const expiryDays = deal.expiryDays !== undefined ? deal.expiryDays : 1;
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + expiryDays);
    expiry.setHours(23, 59, 59, 0);
    const expiryTs = expiry.getTime();

    const update = () => {
      const diff = expiryTs - Date.now();
      if (diff <= 0) {
        setFeaturedTimeLeft({ d: 0, h: 0, m: 0, s: 0, urgency: 'expired' });
        return;
      }
      const total = Math.floor(diff / 1000);
      setFeaturedTimeLeft({
        d: Math.floor(total / 86400),
        h: Math.floor((total % 86400) / 3600),
        m: Math.floor((total % 3600) / 60),
        s: total % 60,
        urgency: total > 259200 ? 'normal'
          : total > 86400 ? 'warning'
            : total > 3600 ? 'urgent'
              : 'critical'
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [featuredIndex, allDeals]);

  // Auto scroll references
  const listRef1 = useRef(null);
  const listRef2 = useRef(null);

  // 8-Second featured deal rotation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Timezone AEST Live Countdown calculation (Target: 11:59:59 PM today local/AEST)
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      const diffMs = endOfDay - now;
      if (diffMs <= 0) {
        setTimeRemaining('Ends tonight AEST');
        return;
      }
      const hrs = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

      const hrStr = hrs.toString().padStart(2, '0');
      const minStr = mins.toString().padStart(2, '0');
      const secStr = secs.toString().padStart(2, '0');

      setTimeRemaining(`${hrStr}:${minStr}:${secStr} remaining`);
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation & ESC close for modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLoginModalOpen(false);
        setPostModalOpen(false);
        setRedirectModalOpen(false);
        setSelectedDeal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Hash-based routing handler
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      setMobileMenuOpen(false);

      // Check if hash matches detail or store pages
      if (hash.startsWith('#deal/')) {
        const dealId = hash.split('/')[1];
        let deal = allDeals.find(d => d.id === dealId);
        if (!deal) {
          const matchingProduct = allProducts.find(p => p.id === dealId || `prod-${p.id}` === dealId);
          if (matchingProduct) deal = mapProductToDeal(matchingProduct);
        }
        if (deal) setSelectedDeal(deal);
      } else {
        setSelectedDeal(null);
      }

      setIsLoading(true);
      setTimeout(() => {
        setCurrentRoute(hash);
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 600);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Trigger on startup
    const initialHash = window.location.hash || '#home';
    setCurrentRoute(initialHash);
    if (initialHash.startsWith('#deal/')) {
      const dealId = initialHash.split('/')[1];
      let deal = allDeals.find(d => d.id === dealId) || HERO_DEALS.find(d => d.id === dealId);
      if (!deal) {
        const matchingProduct = allProducts.find(p => p.id === dealId || `prod-${p.id}` === dealId);
        if (matchingProduct) deal = mapProductToDeal(matchingProduct);
      }
      if (deal) setSelectedDeal(deal);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [allDeals, allProducts]);

  // Toast System
  const triggerToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // One-click clipboard copy
  const handleCopyCode = (code, e) => {
    e?.stopPropagation();
    if (!currentUser) {
      setLoginModalOpen(true);
      triggerToast('Please sign in to grab this deal', 'warning');
      return;
    }
    navigator.clipboard.writeText(code).then(() => {
      triggerToast('✓ Code copied! Go get that bargain, mate! 🤙', 'success');
    }).catch(() => {
      triggerToast('Failed to copy code. Try copying manually.', 'error');
    });
  };

  // Auth Action verification gate
  const authGateAction = (actionCallback) => {
    if (!currentUser) {
      setLoginModalOpen(true);
      triggerToast('Please sign in to grab this deal', 'warning');
      return false;
    }
    actionCallback();
    return true;
  };

  // Simulated Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (authEmail === 'user@demo.com') {
      setCurrentUser(DEMO_USERS.regular);
      triggerToast('👋 Welcome back! Heaps of new deals waiting!');
      setLoginModalOpen(false);
    } else if (authEmail === 'consumer@demo.com') {
      setCurrentUser(DEMO_USERS.consumer);
      triggerToast('Welcome back, Owner! OzTech Deals dashboard unlocked. 🇦🇺');
      setLoginModalOpen(false);
    } else if (authEmail === 'admin@demo.com') {
      setCurrentUser(DEMO_USERS.admin);
      triggerToast('Administrator auth granted! Control panel unlocked.');
      setLoginModalOpen(false);
      window.location.hash = '#admin';
    } else if (authEmail === 'mod@demo.com') {
      setCurrentUser(DEMO_USERS.moderator);
      triggerToast('🛡️ Moderator auth granted! Control console unlocked.');
      setLoginModalOpen(false);
      window.location.hash = '#moderator';
    } else {
      triggerToast('Invalid demo credentials. Try: user@demo.com, consumer@demo.com, admin@demo.com, or mod@demo.com', 'error');
    }
  };

  // Simulated Registration
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword || !authName) {
      triggerToast('Please fill in all registration fields.', 'error');
      return;
    }

    if (authIsConsumer) {
      triggerToast("Consumer accounts need admin verification. We'll be in touch within 1 business day (AEST).", 'info');
    } else {
      const newRegUser = {
        email: authEmail,
        name: authName,
        role: 'user',
        avatar: authName.substring(0, 2).toUpperCase(),
        color: 'bg-green-700',
        joined: 'Just Now',
        location: 'Melbourne, VIC'
      };
      setCurrentUser(newRegUser);
      triggerToast(`Account created! Welcome, ${authName}! 🦘 Ready to find some ripper deals?`);
    }
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    triggerToast('Logged out of your session. G\'day, mate!');
    window.location.hash = '#home';
  };

  // Community upvoting simulation
  const handleUpvote = (postId, e) => {
    e?.stopPropagation();
    authGateAction(() => {
      if (upvotedPosts.has(postId)) {
        setUpvotedPosts((prev) => {
          const next = new Set(prev);
          next.delete(postId);
          return next;
        });
        setCommunityDeals((prev) =>
          prev.map((deal) => deal.id === postId ? { ...deal, upvotes: deal.upvotes - 1 } : deal)
        );
        triggerToast('Removed upvote.', 'info');
      } else {
        setUpvotedPosts((prev) => new Set(prev).add(postId));
        setCommunityDeals((prev) =>
          prev.map((deal) => deal.id === postId ? { ...deal, upvotes: deal.upvotes + 1 } : deal)
        );
        triggerToast('✓ Deal upvoted! Good stuff, mate! 👍');
      }
    });
  };

  // Saving a deal card to profile
  const handleSaveDeal = (dealId, e) => {
    e?.stopPropagation();
    authGateAction(() => {
      if (savedDeals.has(dealId)) {
        setSavedDeals((prev) => {
          const next = new Set(prev);
          next.delete(dealId);
          return next;
        });
        triggerToast('Removed deal from your saved list.', 'info');
      } else {
        setSavedDeals((prev) => new Set(prev).add(dealId));
        triggerToast('✓ Deal saved to your list!');
      }
    });
  };

  // Fixed category bar handler
  const handleCategoryClick = (categoryValue) => {
    setActiveFilter(categoryValue);
    setSelectedCategory(categoryValue === 'All' ? 'All Categories' : categoryValue);
    if (currentRoute !== '#home' && currentRoute !== '') {
      setCurrentRoute('#home');
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      document.getElementById('deals-grid-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const getFilteredCitiesList = () => {
    let list = ALL_CITIES;
    if (selectedState !== 'All Australia') {
      list = ALL_CITIES.filter(c => c.endsWith(selectedState));
    }
    if (citySearchQuery.trim() !== '') {
      const q = citySearchQuery.toLowerCase();
      list = list.filter(c => c.toLowerCase().includes(q));
    }
    return list;
  };

  const isAnyFilterActive =
    selectedState !== 'All Australia' ||
    selectedCity !== 'All Cities' ||
    selectedSuburb !== null ||
    selectedCategory !== 'All Categories' ||
    selectedDiscount !== 'Any Discount' ||
    selectedExpiry !== 'Any Time' ||
    sortBy !== 'Most Popular';

  const handleClearAll = () => {
    setSelectedState('All Australia');
    setSelectedCity('All Cities');
    setSelectedCategory('All Categories');
    setActiveFilter('All');
    setSelectedDiscount('Any Discount');
    setSelectedExpiry('Any Time');
    setSortBy('Most Popular');
    setOpenDropdown(null);
    setSelectedSuburb(null);
    setPostcodeInput('');
    triggerToast('✕ Filters cleared');
  };

  // Simulated redirect modal activation
  const handleGrabDeal = (dealOrName, e) => {
    e?.stopPropagation();
    authGateAction(() => {
      let dealName = dealOrName;
      if (dealOrName && typeof dealOrName === 'object') {
        dealName = dealOrName.brand;

        if (dealOrName.isProduct) {
          addToCart(dealOrName.rawProduct, dealOrName.rawProduct.store);
          setCurrentRoute('#profile');
          setProfileTab('cart');
          triggerToast(`Added ${dealOrName.title} to cart!`, 'success');
          return;
        }

        // Add to cart
        const storeId = dealOrName.brand.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const store = STORES[storeId] || {
          id: storeId,
          name: dealOrName.brand,
          logo: dealOrName.logo || 'DL',
          logoBg: dealOrName.logoBg || 'bg-[#047c1f]',
          couponCode: dealOrName.code,
          discountRate: 0.1,
          discountText: dealOrName.discount,
          products: []
        };

        const product = {
          id: dealOrName.id,
          name: dealOrName.title,
          price: `$${dealOrName.salePrice.toFixed(2)} AUD`,
          desc: dealOrName.description,
          stock: 10,
          status: 'In stock',
          image: dealOrName.image
        };

        addToCart(product, store);

        // Directly navigate to cart
        setCurrentRoute('#profile');
        setProfileTab('cart');
        triggerToast(`Added ${dealOrName.brand} deal to cart!`, 'success');
      } else {
        setRedirectStoreName(dealName);
        setRedirectModalOpen(true);
      }
    });
  };

  // Creating a new community deal post
  const handlePostDeal = (e) => {
    e.preventDefault();
    if (!newDealTitle) {
      triggerToast('Please provide a deal title.', 'error');
      return;
    }
    const newPost = {
      id: 'cd' + (communityDeals.length + 1),
      user: currentUser.name,
      avatar: currentUser.avatar,
      userColor: currentUser.color || 'bg-green-700',
      title: newDealTitle,
      store: newDealCode || 'Local Retailer',
      discount: newDealOrigPrice ? `$${(newDealOrigPrice - newDealDiscPrice).toFixed(0)} OFF` : 'Special Promo',
      upvotes: 1,
      comments: [],
      time: 'Just now',
      category: newDealCategory,
      state: newDealState
    };
    setCommunityDeals([newPost, ...communityDeals]);
    triggerToast('✓ Deal posted to the Aussie community! 🦘');
    setPostModalOpen(false);

    // Reset form
    setNewDealTitle('');
    setNewDealCode('');
    setNewDealOrigPrice('');
    setNewDealDiscPrice('');
    setNewDealDesc('');
  };

  // Handle manual featured deal navigation
  const nextFeatured = () => setFeaturedIndex((prev) => (prev + 1) % 3);
  const prevFeatured = () => setFeaturedIndex((prev) => (prev - 1 + 3) % 3);

  // Resolve active deals lists under filter criteria
  const getFilteredDeals = () => {
    const mappedProducts = allProducts.map(mapProductToDeal);
    const combined = [...allDeals, ...mappedProducts];
    let result = combined.filter(deal => {
      // 1. Category Filter
      const matchesCategory = selectedCategory === 'All Categories' || selectedCategory === 'All' || selectedCategory.includes(deal.category);

      // 2. Location Filter (State, City, AND Suburb/Postcode)
      let matchesLocation = true;

      if (selectedSuburb) {
        // Suburb-level filter: match by state only 
        // (postcode-level product data not available, 
        // so filter to state and show all state deals)
        matchesLocation = deal.regions && (
          deal.regions.includes(selectedSuburb.state) ||
          deal.regions.includes('All Australia')
        );
      } else {
        const cityState = selectedCity &&
          selectedCity !== 'All Cities'
          ? selectedCity.split(', ')[1]
          : null;
        const targetState = cityState || (
          selectedState !== 'All Australia'
            ? selectedState
            : null
        );
        if (targetState) {
          matchesLocation = deal.regions && (
            deal.regions.includes(targetState) ||
            deal.regions.includes('All Australia')
          );
        }
      }

      // 3. Discount Filter
      let matchesDiscount = true;
      if (selectedDiscount !== 'Any Discount') {
        const discountPct = deal.originalPrice ? Math.round(((deal.originalPrice - deal.salePrice) / deal.originalPrice) * 100) : 0;
        const savingAmount = deal.originalPrice - deal.salePrice;

        if (selectedDiscount === '10%+ OFF') matchesDiscount = discountPct >= 10;
        else if (selectedDiscount === '20%+ OFF') matchesDiscount = discountPct >= 20;
        else if (selectedDiscount === '30%+ OFF') matchesDiscount = discountPct >= 30;
        else if (selectedDiscount === '50%+ OFF') matchesDiscount = discountPct >= 50;
        else if (selectedDiscount === '$10+ Saving') matchesDiscount = savingAmount >= 10;
        else if (selectedDiscount === '$50+ Saving') matchesDiscount = savingAmount >= 50;
        else if (selectedDiscount === '$100+ Saving') matchesDiscount = savingAmount >= 100;
        else if (selectedDiscount === '$200+ Saving') matchesDiscount = savingAmount >= 200;
      }

      // 4. Expiry Filter
      let matchesExpiry = true;
      if (selectedExpiry !== 'Any Time') {
        const expDays = deal.expiryDays !== undefined ? deal.expiryDays : (deal.expiry !== undefined ? deal.expiry : 999);

        if (selectedExpiry === 'Expiring Today') matchesExpiry = expDays === 0;
        else if (selectedExpiry === 'Ends in 2 days') matchesExpiry = expDays <= 2;
        else if (selectedExpiry === 'This Week') matchesExpiry = expDays <= 7;
        else if (selectedExpiry === 'This Month') matchesExpiry = expDays <= 30;
        else if (selectedExpiry === 'No Expiry') matchesExpiry = expDays > 30;
      }

      // 5. Search query
      const matchesSearch = searchQuery === '' ||
        deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.brand.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesLocation && matchesDiscount && matchesExpiry && matchesSearch;
    });

    // Sort logic
    result.sort((a, b) => {
      const getNumId = (item) => parseInt(item.id.replace(/\D/g, '')) || 0;
      const getSavingVal = (item) => item.originalPrice - item.salePrice;
      const getDiscountPercent = (item) => item.originalPrice ? Math.round(((item.originalPrice - item.salePrice) / item.originalPrice) * 100) : 0;
      const getExpiryVal = (item) => item.expiryDays !== undefined ? item.expiryDays : (item.expiry !== undefined ? item.expiry : 999);

      switch (sortBy) {
        case 'Newest First':
          return getNumId(b) - getNumId(a);
        case 'Expiring Soon':
          return getExpiryVal(a) - getExpiryVal(b);
        case 'Biggest Discount':
          return getDiscountPercent(b) - getDiscountPercent(a);
        case 'Highest Saving ($)':
          return getSavingVal(b) - getSavingVal(a);
        case 'Most Viewed':
          return (b.views || 0) - (a.views || 0);
        case 'Most Comments':
          return (b.commentsCount || 0) - (a.commentsCount || 0);
        case 'Most Popular':
        default:
          return (b.views || 0) - (a.views || 0);
      }
    });

    return result;
  };

  const filteredDeals = getFilteredDeals();

  // Categories list
  const CATEGORIES = ['All', ...CATEGORY_NAMES];

  // Filtered and sorted community deals for the popup card
  const filteredAndSortedCommunityDeals = useMemo(() => {
    let result = [...communityDeals];

    // Filter by Category
    if (communityCategoryFilter && communityCategoryFilter !== 'All') {
      result = result.filter(post => post.category === communityCategoryFilter);
    }

    // Filter by Search Query
    if (communitySearchQuery.trim()) {
      const q = communitySearchQuery.toLowerCase();
      result = result.filter(post =>
        (post.title && post.title.toLowerCase().includes(q)) ||
        (post.body && post.body.toLowerCase().includes(q)) ||
        (post.store && post.store.toLowerCase().includes(q)) ||
        (post.user && post.user.toLowerCase().includes(q))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (communitySort === 'hot') {
        return (b.upvotes * 2 + b.comments.length) - (a.upvotes * 2 + a.comments.length);
      }
      if (communitySort === 'top') {
        return b.upvotes - a.upvotes;
      }
      // 'new' is default chronological order of communityDeals
      return 0;
    });

    return result;
  }, [communityDeals, communityCategoryFilter, communitySearchQuery, communitySort]);

  // State filter list
  const STATES = ['All Australia', 'NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];

  // Resolve featured items dynamically
  const featuredDealsList = allDeals.filter(d => d.featured);
  const activeFeatured = featuredDealsList[featuredIndex] || featuredDealsList[0];
  const getNumberBlockStyle = () => {
    const urgency = featuredTimeLeft.urgency;
    const baseStyle = {
      fontSize: '24px',
      fontWeight: 800,
      fontFamily: 'monospace',
      lineHeight: 1,
      minWidth: '40px',
      textAlign: 'center',
    };

    if (urgency === 'normal') {
      return {
        ...baseStyle,
        color: 'white',
      };
    } else if (urgency === 'warning') {
      return {
        ...baseStyle,
        color: '#fdc800',
      };
    } else if (urgency === 'urgent') {
      return {
        ...baseStyle,
        color: '#ff6b35',
        backgroundColor: 'rgba(255,107,53,0.2)',
        borderRadius: '4px',
        padding: '2px 4px',
      };
    } else if (urgency === 'critical') {
      return {
        ...baseStyle,
        color: '#ff4444',
        backgroundColor: 'rgba(255,68,68,0.2)',
        borderRadius: '4px',
        padding: '2px 4px',
        animation: 'timerPulse 0.8s ease-in-out infinite',
      };
    } else {
      return {
        ...baseStyle,
        color: 'rgba(255,255,255,0.4)',
      };
    }
  };

  const getLabelStyle = () => {
    return {
      fontSize: '9px',
      color: 'rgba(255,255,255,0.5)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      textAlign: 'center',
      marginTop: '2px',
    };
  };

  const getDividerStyle = () => {
    return {
      fontSize: '20px',
      fontWeight: 800,
      color: 'rgba(255,255,255,0.4)',
      paddingBottom: '8px',
    };
  };

  const handleFeaturedCopy = (e) => {
    e?.stopPropagation();
    if (!currentUser) {
      setLoginModalOpen(true);
      triggerToast('Please sign in to grab this deal', 'warning');
      return;
    }
    navigator.clipboard.writeText(activeFeatured.code).then(() => {
      triggerToast('✓ Code copied! Go get that bargain, mate! 🤙', 'success');
      setFeaturedCopied(true);
      setTimeout(() => setFeaturedCopied(false), 2000);
    }).catch(() => {
      triggerToast('Failed to copy code. Try copying manually.', 'error');
    });
  };

  const hotDealsList = allDeals.filter(d => !d.featured).slice(0, 3);

  const isConsumerDashboard = currentRoute === '#dashboard' && currentUser?.role === 'consumer';

  const isAdminDashboard = currentRoute === '#admin' && currentUser?.role === 'admin';

  const isModeratorDashboard = currentRoute === '#moderator' && currentUser?.role === 'moderator';

  return (
    <div className={`min-h-screen ${(isConsumerDashboard || isAdminDashboard || isModeratorDashboard)
      ? 'bg-[#f5f5f5] font-sans text-[#0d0d0d] pt-0'
      : 'bg-[#f5f5f5] font-sans text-[#0d0d0d] pt-[104px] sm:pt-[152px]'
      } flex flex-col relative overflow-x-hidden 
      selection:bg-[#e6f2e8] selection:text-[#047c1f]`}>

      {/* ==========================================
          ANNOUNCEMENT BAR (FIXED)
      ========================================== */}
      {!isConsumerDashboard && !isAdminDashboard && !isModeratorDashboard && (
        <div className={`fixed top-0 left-0 right-0 h-10 bg-[#0d0d0d] text-[#fdc800] text-xs px-4 hidden sm:flex items-center justify-between border-b border-[#e8e8e8]/20 z-[1001] select-none ${communityPanelOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-200`}>
          <div className="flex items-center gap-4 font-bold tracking-wide text-white">
            {adminBanners.filter(b => b.status === 'Active').map((b, idx) => (
              <span key={b.id} className={idx > 0 ? "hidden md:inline-flex items-center gap-1.5" : "flex items-center gap-1.5"}>
                <span className="text-[#fdc800] animate-pulse">●</span> {b.title}
              </span>
            ))}
            {adminBanners.filter(b => b.status === 'Active').length === 0 && (
              <>
                <span>🔥 <span className="text-[#fdc800] font-bold">247</span> new deals today — Updated for Aussie shoppers 🦘</span>
                <span className="hidden md:inline">⭐ <span className="text-[#fdc800] font-bold">Top retailers</span> updated</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            {currentUser && (
              <span className="text-white/80 font-medium">G'day, <strong className="text-white">{currentUser.name}</strong> 🤙</span>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
          HEADER & NAVBAR (FIXED)
      ========================================== */}
      {/* Mobile Navbar (visible only below sm:) */}
      {!isConsumerDashboard && !isAdminDashboard && !isModeratorDashboard && (
        <header className={`fixed left-0 right-0 top-0 h-[56px] z-[1000] bg-white border-b border-slate-200 shadow-sm flex sm:hidden items-center justify-between px-3 gap-2 select-none ${communityPanelOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-200`}>
          {/* Left: Logo */}
          <div className="flex items-center gap-1.5 shrink-0">
            <a href="#home" className="flex items-center gap-1 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-[#047c1f] flex items-center justify-center text-white font-display font-extrabold text-sm shadow shadow-[#047c1f]/20">
                <Tag className="w-3.5 h-3.5 text-[#fdc800]" />
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight text-[#0d0d0d]">
                7<span className="text-[#047c1f]">deals</span>
              </span>
            </a>
          </div>

          {/* Center: Postcode Search */}
          <div className="flex-1 relative max-w-xs" ref={mobileSuburbSearchRef}>
            <div className="relative flex items-center w-full">
              <input
                type="text"
                placeholder={selectedSuburb ? `${selectedSuburb.suburb} (${selectedSuburb.postcode})` : "Enter postcode..."}
                value={postcodeInput}
                onChange={(e) => {
                  setPostcodeInput(e.target.value);
                  if (e.target.value.length >= 2) {
                    setMobileLocationDropOpen(true);
                  } else {
                    setMobileLocationDropOpen(false);
                  }
                }}
                onFocus={() => {
                  if (postcodeInput.length >= 2) setMobileLocationDropOpen(true);
                }}
                className="w-full bg-white pl-3.5 pr-8 py-1.5 text-[11px] border border-slate-300 focus:border-[#047c1f] rounded-full focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-semibold"
              />
              <button
                onClick={() => {
                  if (postcodeInput) {
                    const q = postcodeInput.toLowerCase();
                    const match = AUSTRALIAN_SUBURBS.find(s =>
                      s.postcode.startsWith(q) ||
                      s.suburb.toLowerCase().includes(q)
                    );
                    if (match) {
                      setSelectedSuburb(match);
                      setSelectedState(match.state);
                      setStateFilter(match.state);
                      setSelectedCity(`${match.suburb}, ${match.state}`);
                      setDetectedLocation(`${match.suburb} ${match.postcode}`);
                      setPostcodeInput('');
                      setMobileLocationDropOpen(false);
                      triggerToast(`📍 Location: ${match.suburb} (${match.postcode})`);
                    }
                  }
                }}
                className="absolute right-1.5 p-1 text-[#047c1f] hover:text-[#035a16] border-none bg-transparent cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Suburb Suggestions Dropdown */}
            {mobileLocationDropOpen && postcodeInput.length >= 2 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#e8e8e8] rounded-xl shadow-xl z-[999] max-h-40 overflow-y-auto no-scrollbar">
                {(() => {
                  const q = postcodeInput.toLowerCase();
                  const matches = AUSTRALIAN_SUBURBS.filter(s =>
                    s.postcode.startsWith(q) ||
                    s.suburb.toLowerCase().includes(q)
                  ).slice(0, 5);

                  if (matches.length === 0) return (
                    <div className="px-3 py-2 text-[10px] text-slate-400 font-medium select-none text-left">
                      No suburbs found
                    </div>
                  );

                  return matches.map(s => (
                    <div
                      key={s.postcode}
                      onClick={() => {
                        setSelectedSuburb(s);
                        setSelectedState(s.state);
                        setStateFilter(s.state);
                        setSelectedCity(`${s.suburb}, ${s.state}`);
                        setDetectedLocation(`${s.suburb} ${s.postcode}`);
                        setPostcodeInput('');
                        setMobileLocationDropOpen(false);
                        triggerToast(`📍 Location: ${s.suburb} (${s.postcode})`);
                      }}
                      className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[#f0faf2] hover:text-[#047c1f] transition-colors font-semibold text-left"
                    >
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <div>
                          <span className="text-xs text-slate-700">{s.suburb}</span>
                          <span className="text-[10px] text-slate-400 ml-1">{s.state}, Australia</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1 rounded">{s.postcode}</span>
                    </div>
                  ));
                })()}
              </div>
            )}
          </div>

          {/* Right: Cart & Profile */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="relative">
              <button
                onClick={() => {
                  if (!currentUser) {
                    setLoginModalOpen(true);
                    triggerToast('Sign in to view your shopping cart', 'warning');
                    return;
                  }
                  setCurrentRoute('#profile');
                  setProfileTab('cart');
                  triggerToast('Opening shopping cart in your profile...', 'info');
                }}
                className="relative p-2 rounded-full border border-[#e8e8e8] bg-white hover:border-[#047c1f] transition-colors cursor-pointer flex items-center justify-center"
                title="Shopping Cart"
              >
                <span className="material-symbols-outlined text-[18px] text-slate-600 hover:text-[#047c1f] transition-colors leading-none">shopping_cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#047c1f] text-white text-[9px] font-bold flex items-center justify-center leading-none">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>

            {currentUser ? (
              <button
                onClick={() => {
                  setCurrentRoute('#profile');
                  setProfileTab('overview');
                }}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-[#e8e8e8] bg-white hover:border-[#047c1f]/50 transition-colors cursor-pointer"
              >
                <div className={`w-7 h-7 rounded-full ${currentUser.color || 'bg-[#047c1f]'} text-white flex items-center justify-center font-bold text-xs`}>
                  {currentUser.avatar}
                </div>
              </button>
            ) : (
              <button
                onClick={() => {
                  setAuthTab('login');
                  setLoginModalOpen(true);
                }}
                className="p-2 rounded-full border border-[#e8e8e8] bg-white hover:border-[#047c1f] text-slate-600 hover:text-[#047c1f] transition-colors cursor-pointer flex items-center justify-center"
                title="Sign In"
              >
                <User className="w-4 h-4" />
              </button>
            )}
          </div>
        </header>
      )}

      {/* Desktop Header & Navbar (visible starting from sm: breakpoint) */}
      {!isConsumerDashboard && !isAdminDashboard && !isModeratorDashboard && (
        <header className={`fixed left-0 right-0 top-10 h-16 z-[1000] bg-white border-b-2 border-[#047c1f] shadow-sm hidden sm:block ${communityPanelOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-200`}>
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-12 sm:h-16 flex items-center justify-between gap-3">

            {/* 1. Logo */}
            <a href="#home" className="flex items-center gap-2 group shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#047c1f] flex items-center justify-center text-white font-display font-extrabold text-lg sm:text-xl shadow-md shadow-[#047c1f]/20 group-hover:scale-105 transition-transform duration-200">
                <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-[#fdc800]" />
              </div>
              <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-[#0d0d0d] group-hover:opacity-90">
                7<span className="text-[#047c1f]">deals</span>
              </span>
            </a>



            {/* 2. Location filter — desktop only */}
            <div
              ref={locationNavRef}
              className="relative hidden md:flex items-center w-[200px] shrink-0"
            >
              <div className="relative w-full">
                <MapPin className="w-3.5 h-3.5 text-[#047c1f] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder={selectedSuburb ? `${selectedSuburb.suburb} (${selectedSuburb.postcode})` : "Postcode or suburb..."}
                  value={postcodeInput}
                  onChange={(e) => {
                    setPostcodeInput(e.target.value);
                    if (e.target.value.length >= 2) {
                      setLocationDropOpen(true);
                    } else {
                      setLocationDropOpen(false);
                    }
                  }}
                  onFocus={() => {
                    if (postcodeInput.length >= 2) setLocationDropOpen(true);
                  }}
                  className={`w-full bg-white hover:bg-slate-50/50 pl-8 pr-8 py-1.5 text-xs border border-[#e8e8e8] hover:border-[#047c1f] focus:border-[#047c1f] rounded-full focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-semibold ${selectedSuburb && !postcodeInput ? 'text-[#047c1f] placeholder-[#047c1f]' : 'text-slate-700 placeholder-slate-400'}`}
                />
                {(postcodeInput || selectedSuburb) && (
                  <button
                    onClick={() => {
                      setPostcodeInput('');
                      setSelectedSuburb(null);
                      setSelectedState('All Australia');
                      setStateFilter('All Australia');
                      setSelectedCity('All Cities');
                      setDetectedLocation('Australia');
                      setLocationDropOpen(false);
                      triggerToast('Location filter cleared', 'info');
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-200 text-slate-450 hover:text-red-500 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Portal dropdown showing suburb suggestions */}
              <PortalDropdown
                anchorRef={locationNavRef}
                isOpen={locationDropOpen && postcodeInput.length >= 2}
              >
                <div className="py-1 min-w-[200px]">
                  {(() => {
                    const q = postcodeInput.toLowerCase();
                    const matches = AUSTRALIAN_SUBURBS.filter(s =>
                      s.postcode.startsWith(q) ||
                      s.suburb.toLowerCase().includes(q)
                    ).slice(0, 6);

                    if (matches.length === 0) return (
                      <div className="px-3 py-2 text-[11px] text-slate-400 font-medium select-none">
                        No suburbs found
                      </div>
                    );

                    return matches.map(s => (
                      <div
                        key={s.postcode}
                        onClick={() => {
                          setSelectedSuburb(s);
                          setSelectedState(s.state);
                          setStateFilter(s.state);
                          setSelectedCity(`${s.suburb}, ${s.state}`);
                          setDetectedLocation(`${s.suburb} ${s.postcode}`);
                          setPostcodeInput('');
                          setLocationDropOpen(false);
                          triggerToast(`📍 Location: ${s.suburb} (${s.postcode})`);
                        }}
                        className="flex items-center justify-between px-2.5 py-2 
                        rounded-[6px] cursor-pointer hover:bg-[#f0faf2] 
                        hover:text-[#047c1f] transition-colors font-semibold"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <div>
                            <span className="text-[13px] text-slate-700">{s.suburb}</span>
                            <span className="text-[11px] text-slate-450 ml-1.5">{s.state}, Australia</span>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          {s.postcode}
                        </span>
                      </div>
                    ));
                  })()}
                </div>
              </PortalDropdown>
            </div>

            {/* 3. Search bar — desktop, flex-1 */}
            <div className="hidden md:flex flex-1 max-w-sm relative group">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400 group-focus-within:text-[#047c1f] transition-colors" />
              <input
                type="text"
                placeholder="Search Aussie deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 hover:bg-slate-200/60 focus:bg-white text-sm text-slate-900 pl-10 pr-4 py-2 rounded-full border border-transparent focus:border-[#047c1f] focus:outline-none focus:ring-2 focus:ring-[#047c1f]/25 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* 4. Right side group */}
            <div className="flex items-center gap-2 shrink-0">

              {/* Shopping Cart Icon */}
              <div className="relative">
                <button
                  onClick={() => {
                    if (!currentUser) {
                      setLoginModalOpen(true);
                      triggerToast('Sign in to view your shopping cart', 'warning');
                      return;
                    }
                    setCurrentRoute('#profile');
                    setProfileTab('cart');
                    triggerToast('Opening shopping cart in your profile...', 'info');
                  }}
                  className="relative p-2 rounded-full border border-[#e8e8e8] bg-white hover:border-[#047c1f] transition-colors cursor-pointer flex items-center justify-center"
                  title="Shopping Cart"
                >
                  <span className="material-symbols-outlined text-[18px] text-slate-600 hover:text-[#047c1f] transition-colors leading-none">shopping_cart</span>
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#047c1f] text-white text-[9px] font-bold flex items-center justify-center leading-none">
                      {cart.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </button>
              </div>

              {/* Saved items icon */}
              <div ref={savedNavRef} className="relative hidden sm:block">
                <button
                  onClick={() => {
                    if (!currentUser) {
                      setLoginModalOpen(true);
                      triggerToast(
                        'Sign in to view saved deals', 'warning'
                      );
                      return;
                    }
                    setShowSavedPanel(!showSavedPanel);
                  }}
                  className="relative p-2 rounded-full border border-[#e8e8e8] bg-white hover:border-[#047c1f] transition-colors cursor-pointer flex items-center justify-center"
                  title="Saved deals"
                >
                  <Bookmark className="w-4.5 h-4.5 text-slate-600 hover:text-[#047c1f] transition-colors" />

                  {/* Count badge */}
                  {savedDeals.size > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#047c1f] text-white text-[9px] font-bold flex items-center justify-center leading-none">
                      {savedDeals.size}
                    </span>
                  )}
                </button>

                {/* Saved deals mini panel */}
                <PortalDropdown
                  anchorRef={savedNavRef}
                  isOpen={showSavedPanel && currentUser !== null}
                >
                  <div className="w-[300px]">

                    {/* Header */}
                    <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
                      <span className="text-[13px] font-bold text-slate-800">
                        Saved Deals
                      </span>
                      <span className="text-[11px] font-bold text-[#047c1f]">
                        {savedDeals.size} saved
                      </span>
                    </div>

                    {/* Saved deals list */}
                    {savedDeals.size === 0 ? (
                      <div className="px-3 py-6 text-center">
                        <span className="text-[13px] text-slate-400 font-medium">
                          No saved deals yet
                        </span>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Tap the tag icon on any deal to save it
                        </p>
                      </div>
                    ) : (
                      <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                        {Array.from(savedDeals).map((dealId) => {
                          const deal = allDeals.find(
                            d => d.id === dealId
                          );
                          if (!deal) return null;
                          return (
                            <div
                              key={dealId}
                              className="flex items-center justify-between gap-2 px-3 py-2.5 hover:bg-slate-50 border-b border-slate-50 cursor-pointer"
                              onClick={() => {
                                window.location.hash =
                                  `#deal/${deal.id}`;
                                setShowSavedPanel(false);
                              }}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className={`w-7 h-7 rounded-lg ${deal.logoBg} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}>
                                  {deal.logo}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-[12px] font-bold text-slate-800 truncate">
                                    {deal.title}
                                  </p>
                                  <p className="text-[11px] text-[#047c1f] font-bold">
                                    ${deal.salePrice.toFixed(2)} AUD
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSaveDeal(deal.id, e);
                                }}
                                className="p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors shrink-0 cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Footer link */}
                    {savedDeals.size > 0 && (
                      <div className="px-3 py-2 border-t border-slate-100">
                        <a
                          href="#profile"
                          onClick={() => setShowSavedPanel(false)}
                          className="text-[12px] font-bold text-[#047c1f] hover:underline"
                        >
                          View all saved deals →
                        </a>
                      </div>
                    )}
                  </div>
                </PortalDropdown>
              </div>

              {/* Existing auth section — no changes */}
              {currentUser ? (
                <div className="hidden sm:flex items-center gap-2">

                  {/* Admin button if admin */}
                  {currentUser.role === 'admin' && (
                    <a
                      href="#admin"
                      className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#fff9e6] text-[#b38600] border border-[#fdc800]/40 hover:bg-[#fdc800]/10 transition-colors"
                    >
                      <Shield className="w-3.5 h-3.5" /> Admin Console
                    </a>
                  )}

                  {/* Consumer dashboard button if consumer */}
                  {currentUser.role === 'consumer' && (
                    <a
                      href="#dashboard"
                      className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#e6f2e8] text-[#047c1f] border border-[#047c1f]/20 hover:bg-[#047c1f]/10 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Merchant Hub
                    </a>
                  )}

                  {/* Moderator button if moderator */}
                  {currentUser.role === 'moderator' && (
                    <a
                      href="#moderator"
                      className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      <Shield className="w-3.5 h-3.5" /> Moderator Console
                    </a>
                  )}

                  {/* Profile menu dropdown */}
                  <div className="relative group/profile">
                    <button className="flex items-center gap-2 p-1 rounded-full border border-[#e8e8e8] bg-white hover:border-[#047c1f]/50 transition-colors cursor-pointer">
                      <div className={`w-8 h-8 rounded-full ${currentUser.color || 'bg-[#047c1f]'} text-white flex items-center justify-center font-bold text-sm`}>
                        {currentUser.avatar}
                      </div>
                      <span className="hidden md:inline text-sm font-semibold pr-2 text-slate-700">{currentUser.name}</span>
                    </button>

                    <div className="absolute right-0 top-full pt-2 hidden group-hover/profile:block w-56 bg-white border border-[#e8e8e8] rounded-2xl shadow-xl overflow-hidden z-50">
                      <div className="p-3 border-b border-[#e8e8e8] bg-slate-50/50">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Logged in as</p>
                        <p className="text-sm font-bold text-slate-800 truncate">{currentUser.name}</p>
                        <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                      </div>
                      <div className="p-2 flex flex-col gap-1 font-semibold">
                        <a href="#profile" className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-xl text-slate-700 text-sm transition-colors">
                          <User className="w-4 h-4 text-[#047c1f]" /> My Profile
                        </a>
                        {currentUser.role === 'consumer' && (
                          <a href="#dashboard" className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-xl text-slate-700 text-sm transition-colors">
                            <ShoppingBag className="w-4 h-4 text-[#047c1f]" /> Store Dashboard
                          </a>
                        )}
                        {currentUser.role === 'admin' && (
                          <a href="#admin" className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-xl text-slate-700 text-sm transition-colors">
                            <Shield className="w-4 h-4 text-[#047c1f]" /> Control Panel
                          </a>
                        )}
                        {currentUser.role === 'moderator' && (
                          <a href="#moderator" className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-xl text-slate-700 text-sm transition-colors">
                            <Shield className="w-4 h-4 text-[#047c1f]" /> Mod Dashboard
                          </a>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 p-2 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-xl text-sm text-left transition-colors cursor-pointer font-bold"
                        >
                          <LogOut className="w-4 h-4" /> Log Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => { setAuthTab('login'); setLoginModalOpen(true); }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#047c1f] hover:bg-slate-50 text-[#047c1f] font-bold text-sm transition-all duration-150 cursor-pointer"
                  >
                    <User className="w-4 h-4 text-[#047c1f]" /> Sign In
                  </button>
                  <button
                    onClick={() => { setAuthTab('register'); setLoginModalOpen(true); }}
                    className="flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-[#047c1f] hover:bg-[#035a16] text-white font-bold text-sm shadow-md shadow-[#047c1f]/10 transition-all duration-150 cursor-pointer"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile hamburger menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-11 h-11 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer border-none bg-transparent"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </header>
      )}

      {/* ==========================================
          FIXED CATEGORY BAR
      ========================================== */}
      <div
        className={`fixed top-[56px] sm:top-[104px] left-0 right-0 
          h-12 z-[999] bg-white border-b border-[#e8e8e8] 
          px-4 flex items-center justify-start lg:justify-center gap-1.5 overflow-x-auto 
          no-scrollbar flex-nowrap scroll-smooth ${(isConsumerDashboard || isAdminDashboard || isModeratorDashboard)
            ? 'hidden' : (communityPanelOpen ?
              'opacity-0 pointer-events-none' : 'opacity-100')} 
          transition-opacity duration-200`}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {FIXED_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategoryClick(cat.value)}
            className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-[20px] text-[10px] sm:text-xs whitespace-nowrap cursor-pointer transition-all duration-150 border-[1.5px] ${activeFilter === cat.value
              ? 'bg-[#047c1f] border-[#047c1f] text-white font-semibold shadow-sm'
              : 'bg-white border-[#e8e8e8] text-[#444] hover:bg-[#047c1f] hover:border-[#047c1f] hover:text-white hover:font-semibold'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Mobile nav drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/60 z-[996] transition-opacity duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-0 bg-white border-b border-[#e8e8e8] z-[997] p-4 pt-16 shadow-xl flex flex-col gap-4 animate-in slide-in-from-top duration-300 max-h-[85vh] overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>

          {/* 1. Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search Aussie deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 text-base pl-10 pr-4 py-2.5 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20"
            />
          </div>

          {/* 2. Suburb / Postcode search */}
          <div className="relative w-full">
            <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2.5">
              <MapPin className="w-4 h-4 text-[#047c1f]" />
              <input
                type="text"
                placeholder={selectedSuburb ? `${selectedSuburb.suburb} (${selectedSuburb.postcode})` : "Postcode or suburb..."}
                value={postcodeInput}
                onChange={(e) => setPostcodeInput(e.target.value)}
                className="bg-transparent border-none outline-none text-base font-medium text-slate-700 placeholder-slate-400 w-full"
                autoComplete="off"
              />
              {postcodeInput && (
                <button onClick={() => setPostcodeInput('')} className="text-slate-400 hover:text-slate-600 cursor-pointer border-none bg-transparent">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {postcodeInput.length >= 2 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#e8e8e8] rounded-xl shadow-xl z-[999] max-h-48 overflow-y-auto">
                {(() => {
                  const q = postcodeInput.toLowerCase();
                  const matches = AUSTRALIAN_SUBURBS.filter(s =>
                    s.postcode.startsWith(q) ||
                    s.suburb.toLowerCase().includes(q)
                  ).slice(0, 6);
                  if (matches.length === 0) return <div className="px-3 py-2 text-xs text-slate-400 font-medium select-none">No suburbs found</div>;
                  return matches.map(s => (
                    <div
                      key={s.postcode}
                      onClick={() => {
                        setSelectedSuburb(s);
                        setSelectedState(s.state);
                        setStateFilter(s.state);
                        setSelectedCity(`${s.suburb}, ${s.state}`);
                        setDetectedLocation(`${s.suburb} ${s.postcode}`);
                        setPostcodeInput('');
                        triggerToast(`📍 Location: ${s.suburb} (${s.postcode})`);
                      }}
                      className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-[#f0faf2] hover:text-[#047c1f] transition-colors font-semibold"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="text-sm text-slate-700">{s.suburb}, {s.state}, Australia</span>
                      </div>
                      <span className="text-xs font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{s.postcode}</span>
                    </div>
                  ));
                })()}
              </div>
            )}
          </div>

          {/* 3. State Selector */}
          <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-100 rounded-xl">
            <MapPin className="w-4 h-4 text-[#047c1f]" />
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setStateFilter(e.target.value);
                setDetectedLocation(
                  e.target.value === 'All Australia' ? 'Australia' : e.target.value
                );
              }}
              className="flex-1 bg-transparent text-base border-none focus:outline-none font-semibold text-slate-700 select-none"
            >
              <option value="All Australia">All Australia</option>
              <option value="NSW">NSW</option>
              <option value="VIC">VIC</option>
              <option value="QLD">QLD</option>
              <option value="WA">WA</option>
              <option value="SA">SA</option>
              <option value="TAS">TAS</option>
              <option value="ACT">ACT</option>
              <option value="NT">NT</option>
            </select>
          </div>

          {/* 4. Auth & User Status */}
          {currentUser ? (
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${currentUser.color || 'bg-[#047c1f]'} text-white flex items-center justify-center font-bold text-base`}>
                  {currentUser.avatar}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-800 leading-none">{currentUser.name}</p>
                  <p className="text-xs text-slate-500 mt-1.5 leading-none">{currentUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors border-none bg-transparent cursor-pointer font-sans"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setAuthTab('login');
                  setLoginModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full h-11 flex items-center justify-center rounded-xl border border-[#047c1f] hover:bg-slate-50 text-[#047c1f] font-bold text-sm transition-all duration-150 cursor-pointer bg-transparent"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthTab('register');
                  setLoginModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full h-11 flex items-center justify-center rounded-xl bg-[#047c1f] hover:bg-[#035a16] text-white font-bold text-sm shadow-md shadow-[#047c1f]/10 transition-all duration-150 cursor-pointer border-none"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* 5. Navigation Links */}
          <div className="flex flex-col gap-1 text-left border-t border-[#e8e8e8] pt-3">
            <p className="px-3 text-[10px] text-slate-400 font-extrabold tracking-wider uppercase mb-1">Navigation</p>
            {[
              { href: '#home', label: 'Home', Icon: Home },
              { href: '#deals', label: 'Trending Deals', Icon: Tag },
              { href: '#community', label: 'Aussie Community', Icon: MessageSquare },
              { href: '#profile', label: 'My Profile & Cart', Icon: User }
            ].map(link => {
              const isActive = currentRoute === link.href ||
                (link.href === '#home' && (currentRoute === '' || currentRoute === '#home' || !currentRoute));
              const LinkIcon = link.Icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-bold rounded-xl transition-all cursor-pointer ${isActive
                    ? 'bg-[#047c1f]/8 text-[#047c1f]'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#047c1f]'
                    }`}
                >
                  <LinkIcon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-[#047c1f]' : 'text-slate-400'
                    }`} />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

        </div>
      )}

      {/* Main page content area */}
      <main className={
        (isConsumerDashboard || isAdminDashboard || isModeratorDashboard)
          ? "flex-1 w-full"
          : "flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 sm:pb-6"}>

        {/* Skeleton route loaders */}
        {isLoading ? (
          <div className="w-full py-20 flex flex-col items-center justify-center min-h-[500px]">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-[#047c1f] rounded-full animate-spin"></div>
            <p className="mt-4 text-sm font-bold text-slate-500 animate-pulse">Fetching Australia's best bargains...</p>
          </div>
        ) : (
          <>
            {/* ================================================================= */}
            {/* PAGE 1: HOMEPAGE (#home) */}
            {/* ================================================================= */}
            {currentRoute === '#home' && (
              <div className="space-y-12 animate-in fade-in duration-300">

                {/* Double-Row Pill Ticker */}
                <div className="ticker-band-container relative w-screen left-[50%] right-[50%] -mx-[50vw] overflow-hidden bg-white border-t-3 border-[#047c1f] border-b border-[#e8e8e8] py-1.5 sm:py-2 flex flex-col gap-1.5 sm:gap-2">

                  {/* Left & Right Fade Gradient Overlays */}
                  <div className="absolute top-0 left-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                  {/* Row A: Scrolls Left */}
                  <div className="group relative overflow-hidden flex gap-4 sm:gap-8 py-1 select-none h-[34px] sm:h-[42px] items-center">
                    <div className="animate-scroll-55s flex gap-4 sm:gap-8 pr-4 sm:pr-8 items-center shrink-0">
                      {tickerPillsA.map((pill, idx) => (
                        <div
                          key={`pill-a-orig-${pill.brand}-${idx}`}
                          onClick={(e) => handleCopyCode(pill.code, e)}
                          className="flex items-center gap-1.5 px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full border transition-colors shadow-sm cursor-pointer whitespace-nowrap hover:brightness-110 hover:scale-[1.02]"
                          style={{
                            backgroundColor: pill.bg || (BRAND_PILL_COLORS[pill.brand] || DEFAULT_PILL_COLOR).bg,
                            borderColor: "rgba(255,255,255,0.2)",
                            opacity: Date.now() > PILL_EXPIRY_TIMESTAMPS[pill.code] ? 0.5 : 1,
                          }}
                        >
                          {renderBrandDot(pill.brand)}
                          <span className="font-bold text-[10px] sm:text-xs" style={{ color: "rgba(255,255,255,0.95)" }}>{pill.brand}</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[11px] font-mono font-bold bg-[#fdc800] text-black">
                            {pill.code}
                          </span>
                          <span className="font-bold text-[10px] sm:text-xs" style={{ color: "#fdc800" }}>{pill.discount}</span>
                          <TickerCountdown expiryTs={PILL_EXPIRY_TIMESTAMPS[pill.code]} />
                        </div>
                      ))}
                      {tickerPillsA.map((pill, idx) => (
                        <div
                          key={`pill-a-dup-${pill.brand}-${idx}`}
                          onClick={(e) => handleCopyCode(pill.code, e)}
                          className="flex items-center gap-1.5 px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full border transition-colors shadow-sm cursor-pointer whitespace-nowrap hover:brightness-110 hover:scale-[1.02]"
                          style={{
                            backgroundColor: pill.bg || (BRAND_PILL_COLORS[pill.brand] || DEFAULT_PILL_COLOR).bg,
                            borderColor: "rgba(255,255,255,0.2)",
                            opacity: Date.now() > PILL_EXPIRY_TIMESTAMPS[pill.code] ? 0.5 : 1,
                          }}
                        >
                          {renderBrandDot(pill.brand)}
                          <span className="font-bold text-[10px] sm:text-xs" style={{ color: "rgba(255,255,255,0.95)" }}>{pill.brand}</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[11px] font-mono font-bold bg-[#fdc800] text-black">
                            {pill.code}
                          </span>
                          <span className="font-bold text-[10px] sm:text-xs" style={{ color: "#fdc800" }}>{pill.discount}</span>
                          <TickerCountdown expiryTs={PILL_EXPIRY_TIMESTAMPS[pill.code]} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row B: Scrolls Right */}
                  <div className="group relative overflow-hidden flex gap-4 sm:gap-8 py-1 select-none h-[34px] sm:h-[42px] items-center">
                    <div className="animate-scroll-right-65s flex gap-4 sm:gap-8 pr-4 sm:pr-8 items-center shrink-0">
                      {tickerPillsB.map((pill, idx) => (
                        <div
                          key={`pill-b-orig-${pill.brand}-${idx}`}
                          onClick={(e) => handleCopyCode(pill.code, e)}
                          className="flex items-center gap-1.5 px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full border transition-colors shadow-sm cursor-pointer whitespace-nowrap hover:brightness-110 hover:scale-[1.02]"
                          style={{
                            backgroundColor: pill.bg || (BRAND_PILL_COLORS[pill.brand] || DEFAULT_PILL_COLOR).bg,
                            borderColor: "rgba(255,255,255,0.2)",
                            opacity: Date.now() > PILL_EXPIRY_TIMESTAMPS[pill.code] ? 0.5 : 1,
                          }}
                        >
                          {renderBrandDot(pill.brand)}
                          <span className="font-bold text-[10px] sm:text-xs" style={{ color: "rgba(255,255,255,0.95)" }}>{pill.brand}</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[11px] font-mono font-bold bg-[#fdc800] text-black">
                            {pill.code}
                          </span>
                          <span className="font-bold text-[10px] sm:text-xs" style={{ color: "#fdc800" }}>{pill.discount}</span>
                          <TickerCountdown expiryTs={PILL_EXPIRY_TIMESTAMPS[pill.code]} />
                        </div>
                      ))}
                      {tickerPillsB.map((pill, idx) => (
                        <div
                          key={`pill-b-dup-${pill.brand}-${idx}`}
                          onClick={(e) => handleCopyCode(pill.code, e)}
                          className="flex items-center gap-1.5 px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full border transition-colors shadow-sm cursor-pointer whitespace-nowrap hover:brightness-110 hover:scale-[1.02]"
                          style={{
                            backgroundColor: pill.bg || (BRAND_PILL_COLORS[pill.brand] || DEFAULT_PILL_COLOR).bg,
                            borderColor: "rgba(255,255,255,0.2)",
                            opacity: Date.now() > PILL_EXPIRY_TIMESTAMPS[pill.code] ? 0.5 : 1,
                          }}
                        >
                          {renderBrandDot(pill.brand)}
                          <span className="font-bold text-[10px] sm:text-xs" style={{ color: "rgba(255,255,255,0.95)" }}>{pill.brand}</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[11px] font-mono font-bold bg-[#fdc800] text-black">
                            {pill.code}
                          </span>
                          <span className="font-bold text-[10px] sm:text-xs" style={{ color: "#fdc800" }}>{pill.discount}</span>
                          <TickerCountdown expiryTs={PILL_EXPIRY_TIMESTAMPS[pill.code]} />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Redesigned Premium High-Impact Full-Width Featured Hero Card */}
                <div className="w-full flex flex-col justify-between mb-8">
                  <div className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl group bg-slate-950 min-h-[380px] sm:min-h-[440px] flex flex-col justify-end">

                    {/* 1. Image Container (Absolute Full Background) */}
                    <div className="absolute inset-0 w-full h-full z-0">
                      <img
                        src={activeFeatured.image}
                        alt={activeFeatured.title}
                        className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
                      />
                      {/* Dark gradient overlay for text contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    </div>

                    {/* In-image prev/next controls */}
                    <div className="absolute top-[16px] right-[16px] flex gap-1 bg-black/45 backdrop-blur-md rounded-full p-1 shadow-lg border border-white/10 z-20">
                      <button
                        onClick={prevFeatured}
                        className="w-11 h-11 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer border-none bg-transparent"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextFeatured}
                        className="w-11 h-11 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer border-none bg-transparent"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* 2. Content Overlay with Blur Bar */}
                    <div className="relative z-10 p-4 sm:p-8 md:p-10 w-full">

                      {/* Glassmorphic Blur Bar wrapper */}
                      <div className="w-full backdrop-blur-md bg-white/10 border border-white/20 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-7 shadow-2xl relative">

                        <div className="w-full">

                          {/* Main Text & CTAs */}
                          <div className="space-y-3 sm:space-y-4">

                            {/* Top Row: Badges & Expiry countdown */}
                            <div className="flex flex-wrap items-center gap-2 select-none">
                              <span className="bg-[#eb9d00] text-[#291800] px-3.5 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider">
                                ★ Featured {activeFeatured.category} Deal
                              </span>
                              <div className="flex items-center gap-1.5 bg-white/20 text-white px-3.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold">
                                <Clock className="w-3 h-3 text-white" />
                                <span>Ends in {String(featuredTimeLeft.d).padStart(2, '0')}d : {String(featuredTimeLeft.h).padStart(2, '0')}h : {String(featuredTimeLeft.m).padStart(2, '0')}m</span>
                              </div>
                            </div>

                            {/* Title & Description */}
                            <div>
                              <h2 className="text-white font-black text-lg sm:text-xl md:text-2xl lg:text-[28px] mb-2 leading-tight tracking-tight drop-shadow-md">
                                {activeFeatured.title}
                              </h2>
                              <p className="text-white/80 text-xs sm:text-sm mb-4 max-w-2xl font-medium drop-shadow leading-relaxed">
                                {activeFeatured.description}
                              </p>
                            </div>

                            {/* Interactive Pricing, Vouchers & CTAs */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">

                              {/* Price metrics */}
                              <div className="flex items-center justify-between sm:justify-start sm:flex-col text-left gap-2 sm:gap-0 shrink-0">
                                <span className="text-white/50 text-[9px] line-through font-bold leading-none block sm:hidden">Was ${activeFeatured.originalPrice.toFixed(2)}</span>
                                <div className="text-left">
                                  <span className="hidden sm:block text-white/50 text-[9px] line-through font-bold leading-none">${activeFeatured.originalPrice.toFixed(2)}</span>
                                  <span className="text-[#00c853] font-black text-xl sm:text-2xl leading-none mt-0.5 block">
                                    ${activeFeatured.salePrice.toFixed(2)} <span className="text-[10px] font-bold text-white/70">AUD</span>
                                  </span>
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2.5 w-full sm:w-auto">
                                {/* Voucher Container with T&Cs text below */}
                                <div className="flex flex-col gap-1 w-full sm:w-auto">
                                  {/* Code Copying Pill */}
                                  <div
                                    onClick={handleFeaturedCopy}
                                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-4 py-2 cursor-pointer transition-colors shadow-sm select-none min-h-[38px] sm:min-h-0 w-full sm:w-auto"
                                  >
                                    <span className="text-[9px] text-white/60 font-black uppercase">Voucher:</span>
                                    <span className="font-mono font-black text-xs sm:text-sm text-[#fdc800] tracking-wider">{activeFeatured.code}</span>
                                    <span className="text-[9px] text-[#00c853] font-bold ml-1 bg-[#00c853]/15 px-1.5 py-0.5 rounded-full">
                                      {featuredCopied ? "✓ Copied!" : "Copy"}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-white/50 font-medium select-none ml-1.5 text-center sm:text-left">
                                    *T&Cs apply
                                  </span>
                                </div>

                                {/* Grab Deal button */}
                                <button
                                  onClick={() => handleGrabDeal(activeFeatured)}
                                  className="bg-[#006e2a] hover:bg-[#00c853] text-white px-6 py-2 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-[#006e2a]/30 cursor-pointer border-none min-h-[38px] sm:min-h-0"
                                >
                                  <span>Grab Deal Now</span>
                                  <Rocket className="w-3.5 h-3.5 text-white" />
                                </button>
                              </div>
                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* SLIDE INDICATORS (below card) */}
                  <div className="flex justify-center gap-1.5 mt-4">
                    {featuredDealsList.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setFeaturedIndex(i)}
                        className="transition-all duration-300 ease-in-out cursor-pointer"
                        style={{
                          width: featuredIndex === i ? '24px' : '6px',
                          height: '6px',
                          borderRadius: featuredIndex === i ? '3px' : '50%',
                          backgroundColor: featuredIndex === i ? '#006e2a' : 'rgba(0,0,0,0.2)',
                          padding: 0,
                          border: 'none',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* ==========================================
                    PARTNER STORE CARDS ROW
                ========================================== */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.keys(STORES).map(key => {
                    const st = STORES[key];
                    return (
                      <div
                        key={key}
                        onClick={() => window.location.hash = `#store/${st.id}`}
                        className="h-[100px] shrink-0 p-4 rounded-[10px] flex items-center justify-between text-white transition-all duration-300 hover:scale-[1.03] hover:brightness-110 hover:shadow-[0_0_0_3px_rgba(4,124,31,0.3)] cursor-pointer shadow-sm"
                        style={{ backgroundColor: BRAND_DARK_COLORS[st.name] || BRAND_DARK_COLORS['default'] }}
                      >
                        <div className="flex items-center gap-3.5 text-left">
                          <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/10 text-white flex items-center justify-center font-display font-extrabold text-xl shadow-sm">
                            {st.logo}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-[15px] text-white truncate leading-tight">{st.name}</h4>
                            <p className="text-xs text-[#fdc800] font-semibold mt-0.5">View deals →</p>
                          </div>
                        </div>
                        <span className="bg-[#fdc800] text-black text-[10px] py-1 px-2.5 rounded-full font-bold uppercase tracking-wider shadow-sm">
                          Partner
                        </span>
                      </div>
                    );
                  })}
                </div> */}

                {/* ==========================================
                    LARGE CARD TICKER
                ========================================== */}
                <div className="relative w-screen left-[50%] right-[50%] -mx-[50vw] overflow-hidden py-6 border-y border-[#e8e8e8] bg-white">

                  {/* Ticker Row 2: Colorful Card Ticker */}
                  <div className="group relative overflow-hidden flex gap-4 py-1 select-none">

                    {/* Left & Right Fade Gradient Overlays */}
                    <div className="absolute top-0 left-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                    <div ref={listRef2} className="animate-scroll-55s flex gap-4 hover:[animation-play-state:paused] pr-4">
                      {/* Brand-colored cards ticker */}
                      {RETAILERS_LIST.map((retailer, idx) => {
                        const matchingDeal = allDeals.find(d => d.brand.toLowerCase() === retailer.name.toLowerCase()) || allDeals[idx % allDeals.length];
                        return (
                          <TickerCard
                            key={`ticker2-orig-${retailer.name}-${idx}`}
                            retailer={retailer}
                            matchingDeal={matchingDeal}
                            handleCopyCode={handleCopyCode}
                            idx={idx}
                            isDup={false}
                          />
                        );
                      })}
                      {/* Duplicated for seamless loops */}
                      {RETAILERS_LIST.map((retailer, idx) => {
                        const matchingDeal = allDeals.find(d => d.brand.toLowerCase() === retailer.name.toLowerCase()) || allDeals[idx % allDeals.length];
                        return (
                          <TickerCard
                            key={`ticker2-dup-${retailer.name}-${idx}`}
                            retailer={retailer}
                            matchingDeal={matchingDeal}
                            handleCopyCode={handleCopyCode}
                            idx={idx}
                            isDup={true}
                          />
                        );
                      })}
                    </div>
                  </div>

                </div>


                {/* ==========================================
                    EXPLORE DEALS & STATE FILTERS
                ========================================== */}
                <div id="deals-grid-section" className="space-y-6 scroll-mt-[160px]">

                  {/* Header details */}
                  <div className="flex flex-col gap-3 border-b border-[#e8e8e8] 
                    pb-4" style={{ marginBottom: '12px' }}>

                    {/* Top row: title + count */}
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-display font-extrabold 
                        text-[#0d0d0d]">🔥 Trending Deals</h2>
                      <span className="text-[13px] text-[#047c1f] font-semibold">
                        {filteredDeals.length} deals available
                      </span>
                    </div>

                    {/* Bottom row: postcode/suburb search — right aligned */}
                    <div className="hidden sm:flex items-center justify-end gap-2">

                      {/* Active suburb badge */}
                      {selectedSuburb && (
                        <div className="flex items-center gap-1.5 bg-[#e6f2e8] 
                          border border-[#047c1f]/30 text-[#047c1f] 
                          text-[12px] font-bold px-3 py-1.5 rounded-full">
                          <MapPin className="w-3.5 h-3.5 text-[#047c1f]" />
                          <span>{selectedSuburb.suburb}</span>
                          <span className="font-mono text-[11px] 
                            text-[#047c1f]/70">{selectedSuburb.postcode}</span>
                          <button
                            onClick={() => {
                              setSelectedSuburb(null);
                              setPostcodeInput('');
                            }}
                            className="ml-0.5 hover:text-red-500 
                              cursor-pointer font-black"
                          >
                            ✕
                          </button>
                        </div>
                      )}

                      {/* Postcode search input with live dropdown */}
                      <div className="relative" ref={suburbSearchRef}>
                        <div className="flex items-center gap-2 bg-white 
                          border border-[#e8e8e8] hover:border-[#047c1f] 
                          rounded-full px-3 py-1.5 transition-colors 
                          focus-within:border-[#047c1f] 
                          focus-within:ring-2 focus-within:ring-[#047c1f]/20">
                          <MapPin className="w-3.5 h-3.5 text-[#047c1f] shrink-0" />
                          <input
                            type="text"
                            placeholder="Filter by postcode or suburb..."
                            value={postcodeInput}
                            onChange={(e) => setPostcodeInput(e.target.value)}
                            className="bg-transparent border-none outline-none 
                              text-[12px] font-medium text-slate-700 
                              placeholder-slate-400 w-[200px]"
                            autoComplete="off"
                          />
                          {postcodeInput && (
                            <button
                              onClick={() => setPostcodeInput('')}
                              className="text-slate-400 hover:text-slate-600 
                                cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        {/* Use PortalDropdown so it renders above all cards */}
                        <PortalDropdown
                          anchorRef={suburbSearchRef}
                          isOpen={postcodeInput.length >= 2}
                          alignRight={true}
                        >
                          <div className="min-w-[240px]">
                            {(() => {
                              const q = postcodeInput.toLowerCase();
                              const matches = AUSTRALIAN_SUBURBS.filter(s =>
                                s.postcode.startsWith(q) ||
                                s.suburb.toLowerCase().includes(q)
                              ).slice(0, 6);

                              if (matches.length === 0) return (
                                <div className="px-3 py-2 text-[11px] 
                                  text-slate-400 font-medium">
                                  No suburbs found for "{postcodeInput}"
                                </div>
                              );

                              return matches.map(s => (
                                <div
                                  key={s.postcode}
                                  onClick={() => {
                                    setSelectedSuburb(s);
                                    setSelectedState(s.state);
                                    setStateFilter(s.state);
                                    setSelectedCity(`${s.suburb}, ${s.state}`);
                                    setDetectedLocation(
                                      `${s.suburb} ${s.postcode}`
                                    );
                                    setPostcodeInput('');
                                    triggerToast(
                                      `📍 Filtered: ${s.suburb} (${s.postcode})`
                                    );
                                  }}
                                  className="flex items-center justify-between 
                                    px-3 py-2 rounded-[6px] cursor-pointer 
                                    hover:bg-[#f0faf2] transition-colors group"
                                >
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-3 h-3 text-slate-400 
                                      group-hover:text-[#047c1f] shrink-0" />
                                    <div>
                                      <span className="text-[12px] font-semibold 
                                        text-slate-800 
                                        group-hover:text-[#047c1f]">
                                        {s.suburb}
                                      </span>
                                      <span className="text-[11px] 
                                        text-slate-400 ml-1">
                                        {s.state}, Australia
                                      </span>
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-mono 
                                    font-bold text-slate-500 bg-slate-100 
                                    px-1.5 py-0.5 rounded 
                                    group-hover:bg-[#047c1f]/10 
                                    group-hover:text-[#047c1f]">
                                    {s.postcode}
                                  </span>
                                </div>
                              ));
                            })()}
                          </div>
                        </PortalDropdown>
                      </div>
                    </div>
                  </div>

                  {/* Redesigned Filter Bar */}
                  <div className="filter-bar-container bg-white border border-[#e8e8e8] rounded-[12px] p-3 md:py-3 md:px-4 flex flex-col md:flex-row justify-end items-stretch md:items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-5 select-none relative z-50">

                    {/* RIGHT SIDE — DEAL FILTERS */}
                    <div className="flex-1 relative overflow-hidden md:overflow-visible">
                      {/* Mobile horizontal scroll end gradient fade indicator */}
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 md:hidden"></div>

                      <div className="flex items-center justify-start md:justify-end gap-2.5 overflow-x-auto no-scrollbar pb-1 md:pb-0 w-full md:w-auto flex-nowrap md:flex-wrap">
                        <span className="text-[12px] font-semibold text-[#888] whitespace-nowrap mr-1 select-none">
                          Filter Deals:
                        </span>


                        {/* Dropdown 4: Discount */}
                        <div ref={discountDropRef} className="relative filter-dropdown-container">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(openDropdown === 'discount' ? null : 'discount');
                            }}
                            className="flex items-center justify-between gap-1.5 bg-[#f5f5f5] border-[1.5px] rounded-[8px] px-2.5 py-1.5 md:px-3 md:py-2 text-[12px] md:text-[13px] font-medium text-[#0d0d0d] cursor-pointer transition-all duration-150 hover:border-[#047c1f] select-none min-w-[110px] md:min-w-[135px]"
                            style={{
                              boxShadow: openDropdown === 'discount' ? '0 0 0 3px rgba(4,124,31,0.1)' : 'none'
                            }}
                          >
                            <span>{selectedDiscount.includes('$') ? '💵' : (selectedDiscount.includes('OFF') ? '🔥' : '💰')}</span>
                            <span className="truncate">{selectedDiscount}</span>
                            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${openDropdown === 'discount' ? 'rotate-180' : ''}`} />
                          </button>

                          <PortalDropdown
                            anchorRef={discountDropRef}
                            isOpen={openDropdown === 'discount'}
                          >
                            {discountOptions.map((opt, oIdx) => {
                              if (opt === 'divider') return (
                                <div key={`disc-div-${oIdx}`}
                                  className="border-t border-[#e8e8e8] my-1" />
                              );
                              const cleanVal = cleanOption(opt);
                              const isSelected = selectedDiscount === cleanVal;
                              return (
                                <div
                                  key={opt}
                                  onClick={() => {
                                    setSelectedDiscount(cleanVal);
                                    setOpenDropdown(null);
                                  }}
                                  className={`px-2.5 py-2 rounded-[6px] text-[13px] cursor-pointer transition-colors duration-150 ${isSelected ? 'bg-[#047c1f] text-white font-semibold' : 'text-slate-700 hover:bg-[#f0faf2] hover:text-[#047c1f]'}`}
                                >
                                  {opt}
                                </div>
                              );
                            })}
                          </PortalDropdown>
                        </div>

                        {/* Dropdown 5: Expiry */}
                        <div ref={expiryDropRef} className="relative filter-dropdown-container">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(openDropdown === 'expiry' ? null : 'expiry');
                            }}
                            className="flex items-center justify-between gap-1.5 bg-[#f5f5f5] border-[1.5px] rounded-[8px] px-2.5 py-1.5 md:px-3 md:py-2 text-[12px] md:text-[13px] font-medium text-[#0d0d0d] cursor-pointer transition-all duration-150 hover:border-[#047c1f] select-none min-w-[100px] md:min-w-[125px]"
                            style={{
                              boxShadow: openDropdown === 'expiry' ? '0 0 0 3px rgba(4,124,31,0.1)' : 'none'
                            }}
                          >
                            <span>{selectedExpiry === 'Expiring Today' ? '🚨' : (selectedExpiry === 'Ends in 2 days' ? '⚡' : (selectedExpiry === 'No Expiry' ? '♾️' : (selectedExpiry === 'Any Time' ? '⏰' : '📅')))}</span>
                            <span className="truncate">{selectedExpiry}</span>
                            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${openDropdown === 'expiry' ? 'rotate-180' : ''}`} />
                          </button>

                          <PortalDropdown
                            anchorRef={expiryDropRef}
                            isOpen={openDropdown === 'expiry'}
                          >
                            {expiryOptions.map((opt, oIdx) => {
                              if (opt === 'divider') return (
                                <div key={`exp-div-${oIdx}`}
                                  className="border-t border-[#e8e8e8] my-1" />
                              );
                              const cleanVal = cleanOption(opt);
                              const isSelected = selectedExpiry === cleanVal;
                              return (
                                <div
                                  key={opt}
                                  onClick={() => {
                                    setSelectedExpiry(cleanVal);
                                    setOpenDropdown(null);
                                  }}
                                  className={`px-2.5 py-2 rounded-[6px] text-[13px] cursor-pointer transition-colors duration-150 ${isSelected ? 'bg-[#047c1f] text-white font-semibold' : 'text-slate-700 hover:bg-[#f0faf2] hover:text-[#047c1f]'}`}
                                >
                                  {opt}
                                </div>
                              );
                            })}
                          </PortalDropdown>
                        </div>

                        {/* Dropdown 6: Sort By */}
                        <div ref={sortDropRef} className="relative filter-dropdown-container">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(openDropdown === 'sort' ? null : 'sort');
                            }}
                            className="flex items-center justify-between gap-1.5 bg-[#047c1f] text-white rounded-[8px] px-2.5 py-1.5 md:px-3 md:py-2 text-[12px] md:text-[13px] font-semibold cursor-pointer transition-colors duration-150 hover:bg-[#035a16] select-none min-w-[115px] md:min-w-[140px] border-none"
                          >
                            <span>↕️</span>
                            <span className="truncate">Sort: {sortBy}</span>
                            <ChevronDown className="w-3.5 h-3.5 text-white/80 shrink-0" />
                          </button>

                          <PortalDropdown
                            anchorRef={sortDropRef}
                            isOpen={openDropdown === 'sort'}
                          >
                            {sortOptions.map((opt) => {
                              const cleanVal = cleanOption(opt);
                              const isSelected = sortBy === cleanVal;
                              return (
                                <div
                                  key={opt}
                                  onClick={() => {
                                    setSortBy(cleanVal);
                                    setOpenDropdown(null);
                                  }}
                                  className={`px-2.5 py-2 rounded-[6px] text-[13px] cursor-pointer transition-colors duration-150 ${isSelected ? 'bg-[#047c1f] text-white font-semibold' : 'text-slate-700 hover:bg-[#f0faf2] hover:text-[#047c1f]'}`}
                                >
                                  {opt}
                                </div>
                              );
                            })}
                          </PortalDropdown>
                        </div>

                        {/* Clear All button */}
                        {isAnyFilterActive && (
                          <button
                            onClick={handleClearAll}
                            className="px-2.5 py-1.5 md:px-3 md:py-2 rounded-[6px] border border-[#e0e0e0] bg-transparent text-[#888] hover:text-[#B71C1C] hover:border-[#B71C1C] text-[12px] font-medium transition-colors duration-150 cursor-pointer shrink-0"
                          >
                            ✕ Clear All
                          </button>
                        )}

                      </div>
                    </div>

                  </div>

                  {/* ACTIVE FILTER CHIPS ROW */}
                  {isAnyFilterActive && (
                    <div className="active-chips-row flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2 pb-1 border-b border-slate-100 relative z-40">
                      <div className="flex items-center gap-1.5 flex-wrap overflow-x-auto no-scrollbar pb-1 sm:pb-0 flex-nowrap sm:flex-wrap">

                        {/* Suburb/postcode chip */}
                        {selectedSuburb && (
                          <div className="flex items-center gap-1 bg-[#047c1f] 
                            text-white text-[11px] font-semibold px-2.5 py-0.5 
                            rounded-full shrink-0 select-none">
                            <MapPin className="w-3 h-3" />
                            <span>{selectedSuburb.suburb}</span>
                            <span className="font-mono opacity-80">
                              {selectedSuburb.postcode}
                            </span>
                            <button
                              onClick={() => setSelectedSuburb(null)}
                              className="ml-1 cursor-pointer hover:opacity-70 
                                font-bold"
                            >
                              ✕
                            </button>
                          </div>
                        )}

                        {/* Location chip */}
                        {(selectedState !== 'All Australia' || selectedCity !== 'All Cities') && (
                          <div className="flex items-center gap-1 bg-[#f0faf2] border border-[#047c1f] text-[#047c1f] text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 select-none">
                            <span>📍 {selectedCity !== 'All Cities' ? selectedCity : selectedState}</span>
                            <button
                              onClick={() => {
                                setSelectedState('All Australia');
                                setSelectedCity('All Cities');
                                setStateFilter('All Australia');
                              }}
                              className="ml-1 cursor-pointer hover:text-red-700 font-bold"
                            >
                              ✕
                            </button>
                          </div>
                        )}

                        {/* Category chip */}
                        {selectedCategory !== 'All Categories' && (
                          <div className="flex items-center gap-1 bg-[#f0faf2] border border-[#047c1f] text-[#047c1f] text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 select-none">
                            <span>🏷️ {selectedCategory}</span>
                            <button
                              onClick={() => {
                                setSelectedCategory('All Categories');
                                setActiveFilter('All');
                              }}
                              className="ml-1 cursor-pointer hover:text-red-700 font-bold"
                            >
                              ✕
                            </button>
                          </div>
                        )}

                        {/* Discount chip */}
                        {selectedDiscount !== 'Any Discount' && (
                          <div className="flex items-center gap-1 bg-[#f0faf2] border border-[#047c1f] text-[#047c1f] text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 select-none">
                            <span>{selectedDiscount.includes('$') ? '💵' : '🔥'} {selectedDiscount}</span>
                            <button
                              onClick={() => setSelectedDiscount('Any Discount')}
                              className="ml-1 cursor-pointer hover:text-red-700 font-bold"
                            >
                              ✕
                            </button>
                          </div>
                        )}

                        {/* Expiry chip */}
                        {selectedExpiry !== 'Any Time' && (
                          <div className="flex items-center gap-1 bg-[#f0faf2] border border-[#047c1f] text-[#047c1f] text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 select-none">
                            <span>⏰ {selectedExpiry}</span>
                            <button
                              onClick={() => setSelectedExpiry('Any Time')}
                              className="ml-1 cursor-pointer hover:text-red-700 font-bold"
                            >
                              ✕
                            </button>
                          </div>
                        )}

                      </div>

                      <div className="text-[12px] text-[#047c1f] font-semibold shrink-0">
                        Showing {filteredDeals.length} {filteredDeals.length === 1 ? 'deal' : 'deals'}
                      </div>
                    </div>
                  )}

                  {/* Filtered Deals Grid */}
                  {filteredDeals.length === 0 ? (
                    <div className="py-20 text-center space-y-3 bg-white border border-[#e8e8e8] rounded-3xl">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                        <Info className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-slate-800">No active offers found</h3>
                      <p className="text-sm text-slate-500 max-w-sm mx-auto">No Australian deals matched "{searchQuery}" under {selectedCategory} for {selectedCity !== 'All Cities' ? selectedCity : selectedState}. Reset your filters to explore.</p>
                      <button
                        onClick={handleClearAll}
                        className="text-xs font-bold text-[#047c1f] hover:underline cursor-pointer"
                      >
                        Reset filters & search
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="deals-grid-container grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 relative z-1">
                        {(isMobile ? filteredDeals.slice(0, 4) : filteredDeals.slice(0, visibleDealsCount).slice(0, 10)).map((deal, idx) => (
                          <DealCard
                            key={deal.id}
                            deal={deal}
                            idx={idx}
                            savedDeals={savedDeals}
                            handleSaveDeal={handleSaveDeal}
                            handleGrabDeal={handleGrabDeal}
                            handleCopyCode={handleCopyCode}
                            hideCoupon={true}
                          />
                        ))}

                        {!isMobile && filteredDeals.slice(0, visibleDealsCount).length > 10 && (
                          <div className="col-span-full my-4">
                            {/* Beautiful Premium Advertisement Banner */}
                            <div className="relative w-full rounded-[2rem] overflow-hidden shadow-xl bg-gradient-to-r from-slate-900 via-[#0c2214] to-slate-950 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-500/20 text-left">
                              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
                              <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>

                              <div className="space-y-3 z-10 flex-1">
                                <div className="flex items-center gap-2 select-none">
                                  <span className="bg-[#fdc800] text-black font-extrabold px-2.5 py-0.5 rounded text-[9.5px] uppercase tracking-wider">
                                    Sponsored
                                  </span>
                                  <span className="text-white/60 text-xs font-bold flex items-center gap-1">
                                    <Sparkles className="w-3.5 h-3.5 text-[#fdc800]" />
                                    Featured Partner Advertisement
                                  </span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                                  Telstra Ultra 5G Home Broadband
                                </h3>
                                <p className="text-white/70 text-sm max-w-xl font-medium leading-relaxed">
                                  Get 6 months of ultra-fast 5G broadband for half the price. Stream, work, and game on Australia's premium network with no contract lock-in!
                                </p>
                              </div>

                              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 z-10 w-full sm:w-auto">
                                <div className="text-center sm:text-right select-none w-full sm:w-auto">
                                  <span className="text-white/50 text-[10px] line-through font-bold block leading-none">$85.00/mo</span>
                                  <span className="text-[#00c853] font-black text-2xl leading-none mt-1.5 block">
                                    $42.50<span className="text-xs font-bold text-white/70">/mo</span>
                                  </span>
                                </div>
                                <a
                                  href="https://www.telstra.com.au"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-[#047c1f] hover:bg-[#00c853] text-white px-6 py-3 rounded-xl font-extrabold text-sm flex items-center gap-1.5 transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border-none text-center inline-flex items-center justify-center w-full sm:w-auto"
                                >
                                  <span>Claim Voucher</span>
                                  <ExternalLink className="w-4 h-4 ml-1.5" />
                                </a>
                              </div>
                            </div>
                          </div>
                        )}

                        {!isMobile && filteredDeals.slice(0, visibleDealsCount).slice(10).map((deal, idx) => (
                          <DealCard
                            key={deal.id}
                            deal={deal}
                            idx={idx + 10}
                            savedDeals={savedDeals}
                            handleSaveDeal={handleSaveDeal}
                            handleGrabDeal={handleGrabDeal}
                            handleCopyCode={handleCopyCode}
                            hideCoupon={true}
                          />
                        ))}
                      </div>
                      {!isMobile && filteredDeals.length > visibleDealsCount && (
                        <div className="flex justify-center mt-8">
                          <button
                            onClick={() => setVisibleDealsCount(prev => prev + 20)}
                            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#047c1f] to-[#035a16] text-white font-extrabold text-sm shadow-md shadow-[#047c1f]/20 hover:shadow-lg hover:shadow-[#047c1f]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer border-none flex items-center gap-2"
                          >
                            <span>See More Deals</span>
                            <span className="text-xs">▼</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>



              </div>
            )}

            {/* ================================================================= */}
            {/* PAGE 2: DEALS DIRECTORY (#deals) */}
            {/* ================================================================= */}
            {currentRoute === '#deals' && (
              <div className="space-y-5 sm:space-y-8 animate-in fade-in duration-300">
                <div className="space-y-1.5">
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">All Deals & Coupon Codes</h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">Search and filter active store promotions and voucher discounts</p>
                </div>

                {/* Filter Settings and state pill rows */}
                <div className="space-y-3.5 bg-white p-3.5 sm:p-5 border border-[#e8e8e8] rounded-2xl sm:rounded-3xl shadow-sm">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search deals, stores, brand codes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 text-xs sm:text-sm pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20"
                    />
                  </div>

                  {/* Category select row */}
                  <div className="flex items-center gap-1.5 pt-1 overflow-x-auto no-scrollbar flex-nowrap w-full">
                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-black uppercase px-1 sm:px-2 select-none shrink-0">Category:</span>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold border transition-colors cursor-pointer shrink-0 ${activeFilter === cat ? 'bg-[#047c1f] border-[#047c1f] text-white shadow-sm' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* State select row (Region scroll container) */}
                  <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 overflow-x-auto no-scrollbar flex-nowrap w-full">
                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-black uppercase px-1 sm:px-2 select-none shrink-0">Region:</span>
                    {STATES.map((st) => (
                      <button
                        key={st}
                        onClick={() => setStateFilter(st)}
                        className={`px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold border transition-colors cursor-pointer shrink-0 ${stateFilter === st ? 'bg-[#047c1f] border-[#047c1f] text-white shadow-sm' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'}`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
                  {filteredDeals.map((deal, idx) => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      idx={idx}
                      savedDeals={savedDeals}
                      handleSaveDeal={handleSaveDeal}
                      handleGrabDeal={handleGrabDeal}
                      handleCopyCode={handleCopyCode}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* PAGE 3: DEAL DETAIL VIEW (#deal/:id) */}
            {/* ================================================================= */}
            {currentRoute.startsWith('#deal/') && selectedDeal && (() => {
              const deal = selectedDeal;
              const matchingCommunityPost = communityDeals.find(c => c.store.toLowerCase().includes(deal.brand.toLowerCase()));
              const commentsList = matchingCommunityPost ? matchingCommunityPost.comments : [];

              return (
                <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
                  {/* Breadcrumbs */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold overflow-hidden max-w-full whitespace-nowrap select-none">
                    <a href="#home" className="hover:text-slate-800 shrink-0">Home</a>
                    <span className="shrink-0">/</span>
                    <a href="#deals" className="hover:text-slate-800 shrink-0">Deals</a>
                    <span className="shrink-0">/</span>
                    <span className="text-slate-700 font-extrabold truncate">{deal.title}</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

                    {/* Detail block */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 sm:p-8 space-y-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">

                        {/* Logo, Brand, and Category row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                          <div className="flex items-center gap-3">
                            <div className={`w-14 h-14 rounded-2xl ${deal.logoBg} text-white flex items-center justify-center font-black text-xl shadow-sm border border-[#e8e8e8]/10`}>
                              {deal.logo}
                            </div>
                            <div>
                              <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-tight">{deal.brand}</h3>
                              <span className="text-[11px] text-[#047c1f] font-extrabold flex items-center gap-1 mt-0.5">
                                <Check className="w-3.5 h-3.5" /> Verified partner store
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#e6f2e8] text-[#047c1f] border border-[#047c1f]/10">
                              {deal.category}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#fff9e6] text-amber-800 border border-amber-200/40 flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" /> {deal.state} Region
                            </span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-2.5">
                          <h1 className="text-xl sm:text-3xl font-display font-extrabold text-[#0d0d0d] leading-snug">
                            {deal.title}
                          </h1>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed">
                            {deal.description} This discount code is active and verified by the 7deals staff. Grab your bargain before the timer expires!
                          </p>
                        </div>

                        {/* Prices Voucher strip */}
                        <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl sm:rounded-2xl border border-dashed border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="text-center sm:text-left">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Sale Price (AUD)</p>
                            <div className="flex items-baseline gap-2 mt-1 justify-center sm:justify-start">
                              <span className="text-2xl sm:text-3xl font-display font-black text-[#047c1f]">${deal.salePrice.toFixed(2)} AUD</span>
                              <span className="text-sm text-slate-400 line-through font-semibold">${deal.originalPrice.toFixed(2)}</span>
                            </div>
                          </div>

                          <button
                            onClick={(e) => handleCopyCode(deal.code, e)}
                            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#fdc800] hover:bg-[#e6b800] active:scale-98 text-[#0d0d0d] font-mono font-black text-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md shadow-[#fdc800]/10 border border-[#e6b800]/30"
                          >
                            {deal.code} <Copy className="w-5 h-5" />
                          </button>
                        </div>

                        <DetailCountdown expiryDays={deal.expiry} isProduct={deal.isProduct} />

                        {/* Australian Terms and conditions */}
                        <div className="space-y-3 bg-slate-50/70 p-4 sm:p-5 rounded-xl border border-slate-200/50">
                          <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                            <Info className="w-4 h-4 text-slate-450" /> Voucher Information
                          </h4>
                          <ul className="list-disc pl-5 text-xs text-slate-500 space-y-2 font-medium">
                            <li>Valid at all official {deal.brand} outlets in Australia and web checkouts.</li>
                            <li>Terms & conditions of the merchant apply at points of sale.</li>
                            <li>Pricing structured in Australian Dollars (AUD).</li>
                            <li>Bargain code verified on 7deals. ABN placeholder apply on sales.</li>
                          </ul>
                        </div>

                        {/* Save & Grab actions */}
                        <div className="flex gap-3 pt-5 border-t border-slate-100">
                          <button
                            onClick={(e) => handleSaveDeal(deal.id, e)}
                            className={`px-5 py-3.5 rounded-xl border text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${savedDeals.has(deal.id) ? 'bg-[#e6f2e8] border-[#047c1f]/30 text-[#047c1f]' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'}`}
                          >
                            <Tag className="w-4 h-4" /> {savedDeals.has(deal.id) ? 'Saved' : 'Save Deal'}
                          </button>

                          <button
                            onClick={() => handleGrabDeal(deal)}
                            className="flex-1 px-6 py-3.5 rounded-xl bg-[#047c1f] hover:bg-[#035a16] text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-[#047c1f]/10"
                          >
                            Grab Deal & Check Out <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>

                      </div>

                      {/* Comments section */}
                      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 sm:p-8 space-y-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                        <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900">Community Comments ({commentsList.length})</h3>

                        {commentsList.length === 0 ? (
                          <div className="py-8 text-center text-slate-400 space-y-2">
                            <MessageSquare className="w-8 h-8 mx-auto stroke-1" />
                            <p className="text-sm font-bold text-slate-700">No discussions yet</p>
                            <p className="text-xs text-slate-400">Be the first to share your verification experience, mate!</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {commentsList.map((c, i) => (
                              <div key={i} className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/40 flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#047c1f]/10 text-[#047c1f] border border-[#047c1f]/20 flex items-center justify-center font-extrabold text-xs shrink-0">
                                  {c.user.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-800">{c.user}</span>
                                    <span className="text-[9px] bg-slate-200/50 text-slate-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider scale-90">Buyer</span>
                                  </div>
                                  <p className="text-sm text-slate-655 font-medium leading-relaxed">{c.comment}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="pt-4 border-t border-slate-100">
                          {currentUser ? (
                            <form onSubmit={(e) => {
                              e.preventDefault();
                              const input = e.target.elements.commentText;
                              if (!input.value) return;

                              if (matchingCommunityPost) {
                                matchingCommunityPost.comments.push({
                                  user: currentUser.name,
                                  comment: input.value
                                });
                                triggerToast('Comment submitted! Nice work.');
                              } else {
                                triggerToast('Comment system ready. Discussion loaded.', 'info');
                              }
                              input.value = '';
                            }} className="space-y-3">
                              <textarea
                                name="commentText"
                                placeholder="Comment on this deal... (Is it working? Store stock level?)"
                                className="w-full p-3.5 bg-slate-50 hover:bg-slate-100/50 focus:bg-white text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20 font-medium"
                                rows="3"
                              ></textarea>
                              <button
                                type="submit"
                                className="px-4.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[11px] sm:text-xs transition-colors cursor-pointer"
                              >
                                Post Comment
                              </button>
                            </form>
                          ) : (
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
                              <p className="text-sm text-slate-500 font-bold">Want to join the discussion?</p>
                              <button
                                onClick={() => { setAuthTab('login'); setLoginModalOpen(true); }}
                                className="mt-2 text-xs font-bold text-[#047c1f] hover:underline cursor-pointer"
                              >
                                Log in to post comment
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>

                    {/* Related deals sidebar */}
                    <div className="space-y-6">
                      <div className="bg-white rounded-2xl border border-slate-200/70 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                        <h3 className="font-display font-extrabold text-[#0d0d0d] text-lg">Related Vouchers</h3>

                        <div className="flex flex-col gap-3">
                          {allDeals.filter(d => d.category === deal.category && d.id !== deal.id).slice(0, 3).map(rel => (
                            <div
                              key={rel.id}
                              onClick={() => window.location.hash = `#deal/${rel.id}`}
                              className="p-3 rounded-xl border border-slate-150 hover:border-[#047c1f]/30 hover:shadow-sm bg-slate-50/40 hover:bg-white transition-all cursor-pointer flex gap-3 items-center"
                            >
                              <div className={`w-9 h-9 rounded-lg ${rel.logoBg} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                                {rel.logo}
                              </div>
                              <div className="min-w-0">
                                <p className="text-[9px] font-bold text-[#047c1f] uppercase">{rel.brand}</p>
                                <h4 className="text-xs font-bold text-slate-800 truncate">{rel.title}</h4>
                                <p className="text-xs font-extrabold text-slate-950 mt-0.5">${rel.salePrice.toFixed(2)} AUD</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })()}

            {/* ================================================================= */}
            {/* PAGE 4: COMMUNITY FEED (#community) */}
            {/* ================================================================= */}
            {currentRoute === '#community' && (
              <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e8e8e8] pb-4">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-display font-extrabold text-slate-900">Aussie Deal Community 🇦🇺</h2>
                    <p className="text-slate-500 font-medium">Real deals found by real Aussies. Upvote bargain items!</p>
                  </div>
                  <button
                    onClick={() => authGateAction(() => setPostModalOpen(true))}
                    className="px-5 py-2.5 rounded-full bg-[#047c1f] hover:bg-[#036318] text-white font-bold text-sm flex items-center gap-1.5 shadow-md shadow-[#047c1f]/10 transition-transform cursor-pointer"
                  >
                    <Plus className="w-4.5 h-4.5 text-[#fdc800]" /> Share Spotted Deal
                  </button>
                </div>

                {/* State filters row */}
                <div className="flex flex-wrap items-center gap-1 bg-white p-2 border border-[#e8e8e8] rounded-2xl shadow-sm">
                  <span className="text-[10px] text-slate-400 font-bold uppercase px-3">Filter by State:</span>
                  {STATES.map((st) => (
                    <button
                      key={`comm-state-${st}`}
                      onClick={() => setStateFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${stateFilter === st ? 'bg-[#047c1f] text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200/60 text-slate-600'}`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                {/* Feed posts list */}
                <div className="space-y-4">
                  {communityDeals
                    .filter(post => stateFilter === 'All Australia' || post.state === 'National' || post.state === stateFilter)
                    .map((post) => (
                      <div
                        key={post.id}
                        className="p-6 bg-white border border-[#e8e8e8] rounded-3xl shadow-sm space-y-4 flex flex-col sm:flex-row items-start gap-4 justify-between hover:border-slate-300 transition-colors"
                      >
                        {/* Info block */}
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full ${post.userColor} text-white font-bold text-xs flex items-center justify-center`}>
                              {post.avatar}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-extrabold text-slate-800">{post.user}</span>
                                <span className="text-[9px] bg-slate-100 text-slate-500 font-extrabold px-1.5 py-0.5 rounded border border-slate-200/50">
                                  {post.state}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400 font-semibold">{post.time} in <span className="text-[#047c1f] font-bold">{post.category}</span></p>
                            </div>
                          </div>

                          <h3 className="font-display font-bold text-slate-900 text-lg sm:text-xl leading-snug">
                            {post.title}
                          </h3>

                          <div className="flex flex-wrap items-center gap-2 font-bold text-xs">
                            <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200/50">
                              Retailer: {post.store}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-lg bg-[#fdc800] text-black border border-[#fdc800]/40">
                              Saving: {post.discount}
                            </span>
                          </div>
                        </div>

                        {/* Voting/Actions */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-4 shrink-0">
                          <button
                            onClick={(e) => handleUpvote(post.id, e)}
                            className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${upvotedPosts.has(post.id) ? 'bg-[#047c1f] border-[#047c1f] text-white shadow-sm' : 'bg-white hover:bg-slate-50 border-[#e8e8e8] text-slate-700'}`}
                          >
                            <ThumbsUp className="w-4 h-4" /> Upvote | {post.upvotes}
                          </button>
                          <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                            <MessageSquare className="w-4 h-4" /> {post.comments.length} comments
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* PAGE 4.5: BROWSE PRODUCTS (#products) */}
            {/* ================================================================= */}
            {currentRoute === '#products' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e8e8e8] pb-4">
                  <div className="space-y-1 text-left">
                    <h2 className="text-3xl font-display font-extrabold text-slate-900">Partner Store Products 🛒</h2>
                    <p className="text-slate-500 font-medium">Browse, search, and buy premium products directly from our trusted Australian retail partners.</p>
                  </div>
                </div>

                {/* Promo Banner / Coupon Codes Showcase */}
                <div className="bg-gradient-to-r from-[#047c1f]/5 to-[#047c1f]/10 border border-[#047c1f]/20 rounded-3xl p-6 relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#047c1f]/5 rounded-full blur-2xl"></div>
                  <div className="absolute -left-10 -top-10 w-40 h-40 bg-[#fdc800]/10 rounded-full blur-2xl"></div>
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#047c1f] mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">local_offer</span>
                    Active Store Coupons (Use at Checkout!)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.values(STORES).map(st => (
                      <div key={`coupon-card-${st.id}`} className="bg-white border border-[#e8e8e8] rounded-2xl p-4 flex flex-col justify-between hover:border-[#047c1f]/40 transition-colors shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`w-6 h-6 rounded text-white font-extrabold text-[10px] flex items-center justify-center ${st.logoBg}`}>
                            {st.logo}
                          </span>
                          <span className="text-xs font-bold text-slate-800">{st.name}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                          <span
                            className="font-mono bg-[#fdc800] text-black px-2 py-0.5 rounded text-xs font-black select-all cursor-pointer hover:opacity-90"
                            onClick={(e) => handleCopyCode(st.couponCode, e)}
                            title="Click to copy coupon code"
                          >
                            {st.couponCode}
                          </span>
                          <span className="text-xs font-bold text-[#047c1f]">{st.discountText} Off</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Filter and Listing Area */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Filters Sidebar */}
                  <div className="lg:col-span-1">
                    {/* Mobile Filter Toggle Button */}
                    <div className="lg:hidden flex items-center justify-between bg-white border border-[#e8e8e8] p-3 rounded-2xl shadow-sm mb-4">
                      <span className="text-sm font-bold text-slate-805">Filter Products</span>
                      <button
                        onClick={() => setShowMobileProductFilters(true)}
                        className="px-4 py-2 bg-[#047c1f] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border-none shadow-sm hover:bg-[#036318] active:scale-95 transition-transform"
                      >
                        <span className="material-symbols-outlined text-[16px]">filter_list</span>
                        <span>Configure Filters</span>
                      </button>
                    </div>

                    {/* Desktop Sidebar Container / Mobile Slide-up Bottom Sheet */}
                    <div className={`
                      fixed inset-0 bg-black/60 z-[2000] lg:relative lg:bg-transparent lg:z-auto lg:inset-auto lg:block
                      transition-opacity duration-300
                      ${showMobileProductFilters ? 'opacity-100 visible' : 'opacity-0 invisible lg:visible lg:opacity-100'}
                    `}
                      onClick={() => setShowMobileProductFilters(false)}
                    >
                      <div
                        className={`
                          absolute bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-6 space-y-5 max-h-[85vh] overflow-y-auto z-[2001]
                          lg:static lg:rounded-3xl lg:border lg:border-[#e8e8e8] lg:p-5 lg:shadow-sm lg:max-h-none lg:overflow-visible
                          transform transition-transform duration-300 shadow-[0_-8px_30px_rgba(0,0,0,0.15)] lg:shadow-sm lg:translate-y-0
                          ${showMobileProductFilters ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'}
                        `}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Drag Handle for Mobile Bottom Sheet */}
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-2 lg:hidden" onClick={() => setShowMobileProductFilters(false)}></div>

                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <h3 className="font-display font-extrabold text-slate-900 text-sm">Filter Products</h3>
                          <button
                            className="lg:hidden text-slate-405 hover:text-slate-605 font-black cursor-pointer text-sm"
                            onClick={() => setShowMobileProductFilters(false)}
                          >
                            ✕ Close
                          </button>
                        </div>

                        {/* Filter by Category */}
                        <div className="space-y-2 text-left">
                          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Category</label>
                          <div className="flex flex-col gap-1.5">
                            {['All', 'Tech', 'F&D', 'Fashion', 'Insurance', 'Finance', 'Rental', 'Sports'].map(cat => (
                              <button
                                key={`cat-filt-${cat}`}
                                onClick={() => {
                                  setProductCategoryFilter(cat);
                                  if (window.innerWidth < 1024) {
                                    setShowMobileProductFilters(false);
                                  }
                                }}
                                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${productCategoryFilter === cat
                                  ? 'bg-[#e6f2e8] text-[#047c1f]'
                                  : 'hover:bg-slate-50 text-slate-700'
                                  }`}
                              >
                                <span>{cat}</span>
                                {productCategoryFilter === cat && <span className="w-1.5 h-1.5 rounded-full bg-[#047c1f]"></span>}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Filter by Store */}
                        <div className="space-y-2 text-left">
                          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Store</label>
                          <div className="flex flex-col gap-1.5">
                            <button
                              onClick={() => {
                                setProductStoreFilter('All');
                                if (window.innerWidth < 1024) {
                                  setShowMobileProductFilters(false);
                                }
                              }}
                              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${productStoreFilter === 'All'
                                ? 'bg-[#e6f2e8] text-[#047c1f]'
                                : 'hover:bg-slate-50 text-slate-700'
                                }`}
                            >
                              <span>All Stores</span>
                              {productStoreFilter === 'All' && <span className="w-1.5 h-1.5 rounded-full bg-[#047c1f]"></span>}
                            </button>
                            {Object.values(STORES).map(st => (
                              <button
                                key={`store-filt-${st.id}`}
                                onClick={() => {
                                  setProductStoreFilter(st.id);
                                  if (window.innerWidth < 1024) {
                                    setShowMobileProductFilters(false);
                                  }
                                }}
                                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${productStoreFilter === st.id
                                  ? 'bg-[#e6f2e8] text-[#047c1f]'
                                  : 'hover:bg-slate-50 text-slate-700'
                                  }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className={`w-4 h-4 rounded text-white font-black text-[8px] flex items-center justify-center ${st.logoBg}`}>
                                    {st.logo}
                                  </span>
                                  <span>{st.name}</span>
                                </div>
                                {productStoreFilter === st.id && <span className="w-1.5 h-1.5 rounded-full bg-[#047c1f]"></span>}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Grid area */}
                  <div className="lg:col-span-3 space-y-6">
                    {/* Live Search and Product Counter */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white border border-[#e8e8e8] p-4 rounded-3xl shadow-sm">
                      <div className="relative flex-1 w-full">
                        <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search products by name or description..."
                          value={productSearchQuery}
                          onChange={(e) => setProductSearchQuery(e.target.value)}
                          className="w-full bg-slate-50 text-sm pl-10 pr-10 py-2 rounded-xl border border-transparent focus:bg-white focus:border-[#047c1f] focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-semibold"
                        />
                        {productSearchQuery && (
                          <button
                            onClick={() => setProductSearchQuery('')}
                            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Counter */}
                      {(() => {
                        const filtered = allProducts.filter(p => {
                          const matchesCat = productCategoryFilter === 'All' || p.category === productCategoryFilter;
                          const matchesStore = productStoreFilter === 'All' || p.store.id === productStoreFilter;
                          const matchesSearch = !productSearchQuery ||
                            p.name.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
                            p.desc.toLowerCase().includes(productSearchQuery.toLowerCase());
                          return matchesCat && matchesStore && matchesSearch;
                        });

                        return (
                          <span className="text-xs font-bold text-slate-500 whitespace-nowrap bg-slate-100 px-3 py-1.5 rounded-xl shrink-0">
                            {filtered.length} products found
                          </span>
                        );
                      })()}
                    </div>

                    {/* Products Grid */}
                    {(() => {
                      const filtered = allProducts.filter(p => {
                        const matchesCat = productCategoryFilter === 'All' || p.category === productCategoryFilter;
                        const matchesStore = productStoreFilter === 'All' || p.store.id === productStoreFilter;
                        const matchesSearch = !productSearchQuery ||
                          p.name.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
                          p.desc.toLowerCase().includes(productSearchQuery.toLowerCase());
                        return matchesCat && matchesStore && matchesSearch;
                      });

                      if (filtered.length === 0) {
                        return (
                          <div className="bg-white border border-[#e8e8e8] rounded-3xl p-12 text-center shadow-sm">
                            <span className="material-symbols-outlined text-[48px] text-slate-300">search_off</span>
                            <h3 className="font-display font-extrabold text-slate-800 text-lg mt-2">No Products Found</h3>
                            <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto font-medium">We couldn't find any products matching your category, store, or search term. Try adjusting your filters!</p>
                          </div>
                        );
                      }

                      return (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                          {filtered.map(p => {
                            // Category-based premium HSL gradient styles
                            let gradientStyle = 'from-violet-500/10 to-indigo-600/10 text-indigo-600';
                            let emoji = '💻';
                            if (p.category === 'F&D') {
                              gradientStyle = 'from-amber-500/10 to-orange-600/10 text-orange-600';
                              emoji = '🍔';
                            } else if (p.category === 'Fashion') {
                              gradientStyle = 'from-rose-500/10 to-pink-600/10 text-rose-600';
                              emoji = '👗';
                            } else if (p.category === 'Insurance') {
                              gradientStyle = 'from-cyan-500/10 to-teal-600/10 text-teal-600';
                              emoji = '🛡️';
                            } else if (p.category === 'Finance') {
                              gradientStyle = 'from-emerald-500/10 to-green-600/10 text-emerald-600';
                              emoji = '💰';
                            } else if (p.category === 'Rental') {
                              gradientStyle = 'from-orange-500/10 to-red-600/10 text-orange-600';
                              emoji = '🔑';
                            } else if (p.category === 'Sports') {
                              gradientStyle = 'from-blue-500/10 to-blue-600/10 text-blue-600';
                              emoji = '⚽';
                            }

                            return (
                              <div
                                key={`prod-catalog-${p.store.id}-${p.id}`}
                                className="bg-white border border-[#e8e8e8] hover:border-slate-350 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200 group transform hover:-translate-y-0.5 text-left"
                              >
                                {/* Header Image Area */}
                                <div className="h-40 bg-slate-100 overflow-hidden relative">
                                  {p.image ? (
                                    <img
                                      src={p.image}
                                      alt={p.name}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                  ) : (
                                    <div className={`w-full h-full bg-gradient-to-br ${gradientStyle} flex flex-col items-center justify-center font-display font-extrabold text-4xl select-none`}>
                                      <span className="transform group-hover:scale-110 transition-transform duration-300">{emoji}</span>
                                      <span className="text-[10px] font-mono tracking-widest uppercase font-extrabold mt-2 opacity-65">
                                        {p.category}
                                      </span>
                                    </div>
                                  )}

                                  {/* Store badge overlay */}
                                  <div className="absolute top-3 left-3">
                                    <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur shadow-sm px-2.5 py-1 rounded-full border border-slate-100">
                                      <span className={`w-3.5 h-3.5 rounded text-white font-black text-[7px] flex items-center justify-center ${p.store.logoBg}`}>
                                        {p.store.logo}
                                      </span>
                                      <span className="text-[9px] font-extrabold text-slate-800">{p.store.name}</span>
                                    </div>
                                  </div>

                                  {/* Stock Badge overlay */}
                                  <div className="absolute top-3 right-3">
                                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold shadow-sm ${p.status === 'In stock'
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                                      : p.status === 'Low stock'
                                        ? 'bg-amber-50 text-amber-700 border border-amber-250/60'
                                        : 'bg-rose-50 text-rose-700 border border-rose-250/60'
                                      }`}>
                                      {p.status}
                                    </span>
                                  </div>
                                </div>

                                {/* Body */}
                                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                  <div className="space-y-1.5 text-left">
                                    <h4 className="font-bold text-slate-900 text-base leading-tight group-hover:text-[#047c1f] transition-colors">{p.name}</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed font-semibold line-clamp-3">{p.desc}</p>
                                  </div>

                                  <div className="pt-3 border-t border-slate-100 space-y-3">
                                    <div className="flex justify-between items-baseline">
                                      <span className="text-[10px] text-slate-450 font-bold uppercase">Price</span>
                                      <span className="font-display font-extrabold text-lg text-slate-900">{p.price}</span>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="grid grid-cols-2 gap-2">
                                      {/* Add to Cart */}
                                      <button
                                        onClick={() => addToCart(p, p.store)}
                                        className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${p.stock > 0
                                          ? 'border border-[#e8e8e8] bg-white hover:border-[#047c1f] hover:text-[#047c1f] text-slate-700 shadow-sm'
                                          : 'bg-slate-100 text-slate-400 pointer-events-none'
                                          }`}
                                      >
                                        <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                                        <span>Add</span>
                                      </button>

                                      {/* Buy Now */}
                                      <button
                                        onClick={() => handleBuyNow(p, p.store)}
                                        className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer border-none ${p.stock > 0
                                          ? 'bg-[#047c1f] hover:bg-[#036318] text-white shadow-md shadow-[#047c1f]/10'
                                          : 'bg-slate-200 text-slate-400 pointer-events-none'
                                          }`}
                                      >
                                        <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                                        <span>Buy Now</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* PAGE 5: MERCHANT PARTNER PAGE (#store/:id) */}
            {/* ================================================================= */}
            {currentRoute.startsWith('#store/') && (() => {
              const storeId = currentRoute.split('/')[1];
              const store = STORES[storeId] || STORES['oztech-deals'];
              const storeDeals = allDeals.filter(d => d.brand.toLowerCase().includes(store.name.toLowerCase()));

              return (
                <div className="space-y-8 animate-in fade-in duration-300">

                  {/* Store Header Banner */}
                  <div className="bg-white border border-[#e8e8e8] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl ${store.logoBg} text-white flex items-center justify-center font-display font-extrabold text-2xl shadow-md shadow-black/5 shrink-0`}>
                        {store.logo}
                      </div>
                      <div className="space-y-1 text-left">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">{store.name}</h1>
                          {store.verified && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#e6f2e8] text-[#047c1f] border border-[#047c1f]/20">
                              ✓ Verified Partner 🇦🇺
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 font-medium">{store.tagline}</p>
                        <p className="text-xs text-slate-400 font-semibold">Store located in {store.location} · Joined {store.joined}</p>

                        {store.couponCode && (
                          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#fff9e6] border border-[#fdc800]/30 text-xs font-bold text-[#0d0d0d]">
                            <span className="material-symbols-outlined text-[16px] text-amber-500">local_offer</span>
                            <span>Store Code:</span>
                            <span
                              className="font-mono bg-[#fdc800] text-black px-1.5 py-0.5 rounded text-[11px] select-all cursor-pointer font-extrabold"
                              onClick={(e) => handleCopyCode(store.couponCode, e)}
                              title="Click to copy promo code"
                            >
                              {store.couponCode}
                            </span>
                            <span className="text-[#047c1f]">({store.discountText} off all products!)</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-[#e8e8e8] p-4 rounded-2xl text-center min-w-32 w-full md:w-auto">
                      <p className="text-xs text-slate-400 font-bold uppercase">Listed Deals</p>
                      <p className="text-2xl font-display font-extrabold text-[#0d0d0d] mt-1">{storeDeals.length}</p>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="border-b border-[#e8e8e8] flex gap-4 font-bold overflow-x-auto no-scrollbar flex-nowrap pb-1 sm:pb-0 select-none">
                    {['products', 'deals', 'about'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setStoreTab(tab)}
                        className={`px-4 py-2 border-b-2 text-sm transition-colors capitalize cursor-pointer whitespace-nowrap ${storeTab === tab ? 'border-[#047c1f] text-[#047c1f]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                      >
                        {tab === 'deals' ? 'Active Coupons' : tab}
                      </button>
                    ))}
                  </div>

                  {/* Products Grid tab */}
                  {storeTab === 'products' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {store.products.map((p) => (
                        <div key={p.id} className="bg-white border border-[#e8e8e8] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                          <div className="h-40 bg-slate-100 overflow-hidden relative">
                            {p.image ? (
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300 font-display font-bold text-2xl uppercase select-none">
                                [ {p.name.substring(0, 3)} ]
                              </div>
                            )}
                            <div className="absolute top-3 right-3">
                              <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold ${p.status === 'In stock' ? 'bg-[#e6f2e8] text-[#047c1f]' : p.status === 'Low stock' ? 'bg-[#fff9e6] text-[#b38600]' : 'bg-red-50 text-red-600'}`}>
                                {p.status}
                              </span>
                            </div>
                          </div>

                          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-1.5 text-left">
                              <h4 className="font-bold text-slate-900 text-base">{p.name}</h4>
                              <p className="text-xs text-slate-500 leading-relaxed font-semibold">{p.desc}</p>
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                              <span className="font-display font-extrabold text-lg text-slate-900">{p.price}</span>
                              <button
                                onClick={() => addToCart(p, store)}
                                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${p.stock > 0 ? 'bg-[#047c1f] hover:bg-[#036318] text-white shadow-sm' : 'bg-slate-200 text-slate-400 pointer-events-none'}`}
                              >
                                {p.stock > 0 ? (
                                  <>
                                    <span className="material-symbols-outlined text-[15px]">add_shopping_cart</span>
                                    <span>Add to Cart</span>
                                  </>
                                ) : (
                                  <span>Out of stock</span>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Deals tab */}
                  {storeTab === 'deals' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {storeDeals.map((deal) => (
                        <div key={deal.id} className="bg-white border border-[#e8e8e8] rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
                          <div className="space-y-2 text-left">
                            <span className="px-2.5 py-1 text-[9px] font-extrabold bg-[#e6f2e8] text-[#047c1f] rounded-full uppercase tracking-wider">{deal.category}</span>
                            <h4 className="font-bold text-slate-900 text-base pt-1 leading-snug">{deal.title}</h4>
                            {deal.description && (
                              <p className="text-xs text-slate-500 line-clamp-2 text-left leading-normal">
                                {deal.description}
                              </p>
                            )}
                          </div>

                          <div className="flex justify-between items-end pt-3 border-t border-slate-100">
                            <div>
                              <span className="text-[10px] line-through text-slate-400 block font-semibold">${deal.originalPrice.toFixed(2)}</span>
                              <span className="font-display font-extrabold text-[#047c1f] text-base">${deal.salePrice.toFixed(2)} AUD</span>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => handleCopyCode(deal.code, e)}
                                className="px-3 py-1.5 rounded-lg bg-[#fff9e6] hover:bg-[#fdc800]/15 text-[#0d0d0d] border border-[#fdc800]/30 font-mono font-bold text-xs"
                              >
                                {deal.code}
                              </button>
                              <button
                                onClick={() => handleGrabDeal(deal)}
                                className="px-3 py-1.5 rounded-lg bg-[#047c1f] hover:bg-[#035a16] text-white font-bold text-xs transition-colors cursor-pointer"
                              >
                                Grab
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* About tab */}
                  {storeTab === 'about' && (
                    <div className="bg-white border border-[#e8e8e8] rounded-3xl p-6 sm:p-8 space-y-4 max-w-3xl shadow-sm">
                      <h3 className="font-display font-extrabold text-[#0d0d0d] text-lg">Merchant Partnership Credentials</h3>
                      <p className="text-slate-600 text-sm leading-relaxed font-semibold">
                        This store is a verified business registered on the 7deals platform under Australian Business verification checks. All coupon promotions and pricing scales are calculated in Australian Dollars (AUD).
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-xs font-bold pt-4 border-t border-slate-100">
                        <div>
                          <p className="text-slate-400 uppercase tracking-wider text-[10px]">Merchant Location</p>
                          <p className="text-slate-800 mt-1">{store.location}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 uppercase tracking-wider text-[10px]">Verification ABN</p>
                          <p className="text-slate-800 mt-1">ABN: XX XXX XXX XXX</p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              );
            })()}

            {/* ================================================================= */}
            {/* PAGE 6: USER PROFILE FEED (#profile) */}
            {/* ================================================================= */}
            {currentRoute === '#profile' && (
              currentUser ? (
                <div className={`space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto ${profileTab === 'cart' && cart.length > 0 ? 'pb-20 lg:pb-0' : ''}`}>
                  <div className="bg-white border border-[#e8e8e8] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl ${currentUser.color || 'bg-[#047c1f]'} text-white flex items-center justify-center font-display font-bold text-2xl shadow-sm shrink-0`}>
                      {currentUser.avatar}
                    </div>
                    <div className="text-center sm:text-left">
                      <h2 className="text-2xl font-display font-extrabold text-slate-900">{currentUser.name}</h2>
                      <p className="text-xs text-[#047c1f] font-bold mt-1">Platform Member · Joined {currentUser.joined}</p>
                      <p className="text-[11px] text-slate-400 font-semibold mt-0.5">{currentUser.email}</p>
                    </div>
                  </div>

                  <div className="border-b border-[#e8e8e8] flex gap-4 font-bold overflow-x-auto no-scrollbar flex-nowrap pb-1 sm:pb-0 select-none">
                    <button
                      onClick={() => setProfileTab('saved')}
                      className={`px-4 py-2 border-b-2 text-sm transition-colors cursor-pointer whitespace-nowrap ${profileTab === 'saved' ? 'border-[#047c1f] text-[#047c1f]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    >
                      Saved Deals ({savedDeals.size})
                    </button>
                    <button
                      onClick={() => setProfileTab('posts')}
                      className={`px-4 py-2 border-b-2 text-sm transition-colors cursor-pointer whitespace-nowrap ${profileTab === 'posts' ? 'border-[#047c1f] text-[#047c1f]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    >
                      My Spots
                    </button>
                    <button
                      onClick={() => setProfileTab('cart')}
                      className={`px-4 py-2 border-b-2 text-sm transition-colors cursor-pointer whitespace-nowrap ${profileTab === 'cart' ? 'border-[#047c1f] text-[#047c1f]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    >
                      Shopping Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                    </button>
                    <button
                      onClick={() => setProfileTab('orders')}
                      className={`px-4 py-2 border-b-2 text-sm transition-colors cursor-pointer whitespace-nowrap ${profileTab === 'orders' ? 'border-[#047c1f] text-[#047c1f]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    >
                      Orders History ({purchaseHistory.length})
                    </button>
                  </div>

                  {/* Saved deals */}
                  {profileTab === 'saved' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {savedDeals.size === 0 ? (
                        <div className="col-span-full py-16 text-center text-slate-400 bg-white border border-[#e8e8e8] rounded-3xl">
                          <Tag className="w-12 h-12 mx-auto stroke-1 text-slate-300" />
                          <p className="text-sm font-bold mt-3">Your saved list is empty</p>
                          <p className="text-xs">Browse the homepage or All Deals list to save discount codes, mate!</p>
                        </div>
                      ) : (
                        Array.from(savedDeals).map((dealId) => {
                          const deal = allDeals.find(d => d.id === dealId);
                          if (!deal) return null;
                          return (
                            <div key={deal.id} className="bg-white border border-[#e8e8e8] rounded-3xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
                              <div className="space-y-2 text-left">
                                <span className="px-2.5 py-1 text-[9px] font-extrabold bg-[#e6f2e8] text-[#047c1f] rounded-full uppercase tracking-wider">{deal.category}</span>
                                <h4 className="font-bold text-slate-800 text-base leading-snug pt-1">{deal.title}</h4>
                                {deal.description && (
                                  <p className="text-xs text-slate-500 line-clamp-2 text-left leading-normal">
                                    {deal.description}
                                  </p>
                                )}
                              </div>
                              <div className="flex justify-between items-end pt-3 border-t border-slate-100">
                                <div>
                                  <span className="text-[10px] line-through text-slate-400 block font-semibold">${deal.originalPrice.toFixed(2)}</span>
                                  <span className="font-display font-extrabold text-[#047c1f] text-base">${deal.salePrice.toFixed(2)} AUD</span>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={(e) => handleCopyCode(deal.code, e)}
                                    className="px-3 py-1.5 rounded-lg bg-[#fff9e6] hover:bg-[#fdc800]/15 text-[#0d0d0d] border border-[#fdc800]/25 font-mono font-bold text-xs"
                                  >
                                    {deal.code}
                                  </button>
                                  <button
                                    onClick={(e) => handleSaveDeal(deal.id, e)}
                                    className="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600"
                                    title="Unsave"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}

                  {/* My spots */}
                  {profileTab === 'posts' && (
                    <div className="space-y-4">
                      {communityDeals.filter(p => p.user === currentUser.name).length === 0 ? (
                        <div className="py-16 text-center text-slate-400 bg-white border border-[#e8e8e8] rounded-3xl">
                          <MessageSquare className="w-12 h-12 mx-auto stroke-1 text-slate-300" />
                          <p className="text-sm font-bold mt-3">You haven't posted any community spotlights</p>
                          <p className="text-xs">Spotted an active store discount? Post it in our Community feed!</p>
                        </div>
                      ) : (
                        communityDeals.filter(p => p.user === currentUser.name).map((post) => (
                          <div key={post.id} className="p-5 bg-white border border-[#e8e8e8] rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                            <div>
                              <h3 className="font-bold text-slate-900 text-base">{post.title}</h3>
                              <p className="text-xs text-slate-400 mt-1 font-semibold">Spotted at {post.store} | Category: {post.category}</p>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#e6f2e8] text-[#047c1f] border border-[#047c1f]/20 self-start sm:self-auto shrink-0">
                              {post.upvotes} Upvotes
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* Shopping Cart tab */}
                  {profileTab === 'cart' && (
                    <div className="space-y-6">
                      {cart.length === 0 ? (
                        <div className="py-16 text-center text-slate-400 bg-white border border-[#e8e8e8] rounded-3xl">
                          <span className="material-symbols-outlined text-[48px] text-slate-300">shopping_cart</span>
                          <p className="text-sm font-bold mt-3">Your shopping cart is empty</p>
                          <p className="text-xs">Head over to the registered partner stores to add some products!</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                          {/* Left Panel: Store-wise Cart Items */}
                          <div className="lg:col-span-2 space-y-6">
                            {Object.keys(cartGroupedByStore).map((storeId) => {
                              const group = cartGroupedByStore[storeId];
                              return (
                                <div key={storeId} className="bg-white border border-[#e8e8e8] rounded-3xl p-6 shadow-sm space-y-4 text-left">
                                  {/* Store Header Info */}
                                  <div className="flex justify-between items-center border-b border-slate-100 pb-3 flex-wrap gap-2">
                                    <div className="flex items-center gap-2">
                                      <span className="material-symbols-outlined text-[#047c1f] text-lg">store</span>
                                      <h4 className="font-extrabold text-slate-800 text-sm">{group.store.name}</h4>
                                    </div>
                                  </div>

                                  {/* Store Items list */}
                                  <div className="space-y-4">
                                    {group.items.map((item) => (
                                      <div key={item.product.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-slate-100 last:border-none">
                                        <div className="flex items-center gap-3">
                                          {/* Product Image */}
                                          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 border border-slate-150 shrink-0 shadow-sm flex items-center justify-center">
                                            <img
                                              src={item.product.image || `https://picsum.photos/seed/${item.product.id}/150/150`}
                                              alt={item.product.name}
                                              className="w-full h-full object-cover"
                                            />
                                          </div>

                                          <div className="min-w-0 text-left">
                                            <p className="font-bold text-sm text-slate-800 truncate sm:max-w-xs">{item.product.name}</p>
                                            <p className="text-[11px] text-slate-400 font-semibold">{item.product.price} each</p>
                                            <p className="text-[10px] text-slate-500 font-semibold mt-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 inline-block">
                                              Includes GST: ${(item.unitPrice * item.quantity / 11).toFixed(2)} AUD
                                            </p>
                                          </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto mt-2 sm:mt-0 border-t border-slate-50 pt-2 sm:border-t-0 sm:pt-0">
                                          {/* Quantity Controls */}
                                          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                                            <button
                                              onClick={() => updateCartQuantity(item.product.id, storeId, -1)}
                                              className="px-2.5 py-1 text-slate-500 hover:bg-slate-150 rounded-l-lg hover:text-slate-800 transition-colors border-none bg-transparent cursor-pointer font-bold"
                                            >
                                              -
                                            </button>
                                            <span className="px-3 text-xs font-bold text-slate-700 select-none">
                                              {item.quantity}
                                            </span>
                                            <button
                                              onClick={() => updateCartQuantity(item.product.id, storeId, 1)}
                                              className="px-2.5 py-1 text-slate-500 hover:bg-slate-150 rounded-r-lg hover:text-slate-800 transition-colors border-none bg-transparent cursor-pointer font-bold"
                                            >
                                              +
                                            </button>
                                          </div>
                                          {/* Remove */}
                                          <button
                                            onClick={() => removeFromCart(item.product.id, storeId)}
                                            className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors border border-slate-100 sm:border-none bg-transparent cursor-pointer flex items-center justify-center"
                                          >
                                            <X className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>


                                </div>
                              );
                            })}
                          </div>

                          {/* Right Panel: Checkout Summary */}
                          <div className="hidden lg:block space-y-4">
                            <div className="bg-white border border-[#e8e8e8] rounded-3xl p-6 shadow-sm space-y-4 text-left">
                              <h4 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#047c1f]">receipt_long</span>
                                Order Summary
                              </h4>

                              <div className="space-y-2 text-xs font-semibold text-slate-600">
                                <div className="flex justify-between">
                                  <span>Subtotal</span>
                                  <span className="text-slate-800">${cartTotals.subtotal.toFixed(2)} AUD</span>
                                </div>
                                {cartTotals.discount > 0 && (
                                  <div className="flex justify-between text-[#047c1f]">
                                    <span>Discount (Store Promos)</span>
                                    <span>-${cartTotals.discount.toFixed(2)} AUD</span>
                                  </div>
                                )}
                                <div className="flex justify-between text-slate-650">
                                  <span>Shipping</span>
                                  <span className="text-[#047c1f] uppercase font-bold">FREE 🤙</span>
                                </div>
                                <div className="flex justify-between text-slate-450 text-[11px] font-medium border-t border-slate-100/50 pt-2 mt-1">
                                  <span>Includes GST (10%)</span>
                                  <span>${(cartTotals.total / 11).toFixed(2)} AUD</span>
                                </div>
                              </div>

                              <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline font-display font-extrabold text-slate-900">
                                <span className="text-sm">Total</span>
                                <span className="text-xl text-[#047c1f]">${cartTotals.total.toFixed(2)} AUD</span>
                              </div>

                              <button
                                onClick={() => setCheckoutModalOpen(true)}
                                className="w-full bg-[#047c1f] hover:bg-[#036318] text-white py-3.5 rounded-2xl text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer border-none flex items-center justify-center gap-2"
                              >
                                <span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
                                <span>Proceed to Checkout</span>
                              </button>
                            </div>
                          </div>

                          {/* Mobile Fixed Checkout Sticky Footer */}
                          <div className="lg:hidden fixed bottom-16 sm:bottom-0 left-0 right-0 bg-white border-t border-[#e8e8e8] py-3.5 px-5 flex items-center justify-between z-[990] shadow-[0_-8px_30px_rgba(0,0,0,0.1)]">
                            <div className="text-left select-none">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block leading-none">Total Amount</span>
                              <span className="font-display font-extrabold text-xl text-[#047c1f] mt-1.5 block leading-none">${cartTotals.total.toFixed(2)} AUD</span>
                            </div>
                            <button
                              onClick={() => setCheckoutModalOpen(true)}
                              className="bg-[#047c1f] hover:bg-[#036318] text-white px-6 py-3 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer border-none shrink-0"
                            >
                              <span className="material-symbols-outlined text-[16px]">shopping_cart_checkout</span>
                              <span>Checkout</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Purchase History tab */}
                  {profileTab === 'orders' && (
                    <div className="space-y-6">
                      {purchaseHistory.length === 0 ? (
                        <div className="py-16 text-center text-slate-400 bg-white border border-[#e8e8e8] rounded-3xl">
                          <span className="material-symbols-outlined text-[48px] text-slate-300">receipt</span>
                          <p className="text-sm font-bold mt-3">No orders placed yet</p>
                          <p className="text-xs font-semibold">Your completed purchases will show up here, mate!</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {purchaseHistory.map((order) => (
                            <div key={order.id} className="bg-white border border-[#e8e8e8] rounded-3xl p-6 shadow-sm space-y-4 text-left">
                              <div className="flex justify-between items-center border-b border-slate-100 pb-3 flex-wrap gap-2 text-xs font-bold">
                                <div>
                                  <span className="text-[#047c1f]">Order ID: {order.id}</span>
                                  <span className="text-slate-450 ml-3">{order.date}</span>
                                </div>
                                <span className="bg-[#e6f2e8] text-[#047c1f] px-2.5 py-0.5 rounded-full uppercase text-[10px] border border-[#047c1f]/20">
                                  {order.status}
                                </span>
                              </div>

                              <div className="space-y-2">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-xs font-semibold gap-3">
                                    <span className="text-slate-700 truncate min-w-0 flex-1">{item.product.name} (x{item.quantity})</span>
                                    <span className="text-slate-500 font-mono shrink-0">{item.product.price}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="border-t border-slate-100 pt-3 flex flex-col gap-3">
                                <div className="flex justify-between items-baseline font-bold text-xs text-slate-600">
                                  <div>
                                    {order.discount > 0 && (
                                      <p className="text-[#047c1f]">Discount Applied: -${order.discount.toFixed(2)} AUD</p>
                                    )}
                                  </div>
                                  <p className="text-sm text-slate-900 font-display font-extrabold">
                                    Total Paid: <span className="text-[#047c1f]">${order.total.toFixed(2)} AUD</span>
                                  </p>
                                </div>

                                <div className="flex justify-end pt-1">
                                  <button
                                    onClick={() => setTrackingOrderId(trackingOrderId === order.id ? null : order.id)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${trackingOrderId === order.id
                                      ? 'bg-[#047c1f] text-white shadow-sm'
                                      : 'bg-slate-50 hover:bg-[#e6f2e8]/40 border border-[#e8e8e8] text-slate-700 hover:text-[#047c1f] hover:border-[#047c1f]'
                                      }`}
                                  >
                                    <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                                    <span>{trackingOrderId === order.id ? 'Hide Tracking' : 'Track Order'}</span>
                                  </button>
                                </div>

                                {/* Tracking Details Expansion */}
                                {trackingOrderId === order.id && (
                                  <div className="mt-3 bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                                    <div className="flex justify-between items-center text-xs font-bold text-slate-650 border-b border-slate-200 pb-2">
                                      <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px] text-[#047c1f]">package_2</span>
                                        Carrier: {order.carrier || 'Australia Post'}
                                      </span>
                                      <span>Tracking ID: {order.trackingNumber || 'AP-Pending'}</span>
                                    </div>

                                    {order.shipping && (
                                      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs font-semibold text-slate-700 text-left shadow-sm">
                                        <p className="text-[10px] font-black text-[#047c1f] uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                                          <span className="material-symbols-outlined text-[15px]">local_shipping</span>
                                          Delivery Address & Contact
                                        </p>
                                        <div className="space-y-1">
                                          <p className="text-slate-800 font-bold flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[13px] text-slate-400">person</span>
                                            {order.shipping.fullName}
                                          </p>
                                          <p className="text-slate-650 flex flex-wrap items-center gap-x-2 gap-y-1">
                                            <span className="flex items-center gap-1">
                                              <span className="material-symbols-outlined text-[13px] text-slate-400">mail</span>
                                              {order.shipping.email}
                                            </span>
                                            <span className="text-slate-300 hidden sm:inline">·</span>
                                            <span className="flex items-center gap-1">
                                              <span className="material-symbols-outlined text-[13px] text-slate-400">call</span>
                                              {order.shipping.phone}
                                            </span>
                                          </p>
                                          <p className="text-slate-500 font-medium flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[13px] text-slate-400">home</span>
                                            {order.shipping.address}, {order.shipping.suburb}, {order.shipping.state} {order.shipping.postcode}
                                          </p>
                                        </div>
                                      </div>
                                    )}

                                    {/* Timeline steppers */}
                                    <div className="space-y-4 pl-4 relative before:absolute before:left-[22px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                                      {order.timeline && order.timeline.map((step, sIdx) => {
                                        const isDone = step.done;
                                        const isActive = step.active;
                                        return (
                                          <div key={sIdx} className="flex gap-4 relative">
                                            {/* Step Circle indicator */}
                                            <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center z-10 shrink-0 mt-1 transition-colors ${isDone
                                              ? 'bg-[#047c1f] border-[#047c1f] text-white'
                                              : 'bg-white border-slate-350 text-slate-350'
                                              }`}>
                                              {isDone && <span className="w-1 h-1 rounded-full bg-white"></span>}
                                            </div>

                                            {/* Text Content */}
                                            <div className="space-y-0.5 text-left">
                                              <p className={`text-xs font-extrabold transition-colors ${isDone ? 'text-slate-800' : 'text-slate-400'
                                                }`}>
                                                {step.title}
                                                {isActive && (
                                                  <span className="ml-2 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-[#047c1f]/10 text-[#047c1f] border border-[#047c1f]/20">
                                                    Current
                                                  </span>
                                                )}
                                              </p>
                                              <p className={`text-[11px] font-semibold ${isDone ? 'text-slate-500' : 'text-slate-400'
                                                }`}>{step.desc}</p>
                                              <p className="text-[10px] text-slate-400 font-bold">{step.time}</p>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              ) : (
                <div className="py-20 text-center space-y-4 bg-white border border-[#e8e8e8] rounded-3xl max-w-lg mx-auto">
                  <p className="text-slate-500 font-bold">Please sign in to view your profile dashboard.</p>
                  <button
                    onClick={() => { setAuthTab('login'); setLoginModalOpen(true); }}
                    className="px-5 py-2.5 rounded-full bg-[#047c1f] hover:bg-[#036318] text-white font-bold text-sm shadow-sm cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              )
            )}

            {/* ================================================================= */}
            {/* PAGE 7: RETAILER DASHBOARD (#dashboard) */}
            {/* ================================================================= */}
            {currentRoute === '#dashboard' && (
              currentUser?.role === 'consumer' ? (
                <div className="flex font-body bg-background text-on-surface min-h-screen relative w-full text-left">

                  {/* Sidebar Navigation */}
                  <aside className="hidden sm:flex h-screen w-64 fixed left-0 top-0 z-50 flex-col py-6 border-r border-outline-variant/20 bg-surface-container dark:bg-surface-container-low select-none">
                    <div className="px-6 mb-10 flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                        <span className="material-symbols-outlined">eco</span>
                      </div>
                      <div>
                        <h2 className="text-lg font-headline font-semibold text-on-surface">Admin Central</h2>
                        <p className="text-[10px] text-on-surface-variant tracking-wider uppercase">Organic Retailer</p>
                      </div>
                    </div>

                    <nav className="flex-1 space-y-1">
                      {[
                        { key: 'overview', label: 'Overview', icon: 'dashboard' },
                        { key: 'profile', label: 'Store Profile', icon: 'storefront' },
                        { key: 'products', label: 'Products', icon: 'inventory_2' },
                        { key: 'stock', label: 'Stock Monitor', icon: 'monitoring' },
                        { key: 'deals', label: 'Deals & Coupons', icon: 'local_offer' },
                        { key: 'featured', label: 'Featured Requests', icon: 'campaign' },
                      ].map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setRetailerTab(tab.key)}
                          className={`w-[calc(100%-1rem)] rounded-lg mx-2 my-1 px-4 py-2.5 flex items-center gap-3 transition-transform active:scale-95 text-left font-bold text-sm cursor-pointer border-none focus:outline-none focus:ring-0 ${retailerTab === tab.key
                            ? 'bg-primary text-white font-semibold shadow-sm'
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40 bg-transparent'
                            }`}
                        >
                          <span className="material-symbols-outlined">{tab.icon}</span>
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </nav>

                    <div className="px-4 mt-auto mb-6">
                      <button
                        onClick={() => {
                          setRetailerTab('products');
                          setShowAddProduct(true);
                        }}
                        className="w-full bg-primary text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm active:scale-95 cursor-pointer border-none"
                      >
                        <span className="material-symbols-outlined">add</span>
                        <span>Add New Product</span>
                      </button>
                    </div>

                    <div className="border-t border-outline-variant/20 pt-4">
                      <button
                        onClick={() => triggerToast('Opening partner help center...', 'info')}
                        className="w-[calc(100%-1rem)] text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40 rounded-lg mx-2 my-1 px-4 py-2.5 flex items-center gap-3 transition-all duration-200 text-left font-bold text-sm cursor-pointer border-none bg-transparent"
                      >
                        <span className="material-symbols-outlined">help_outline</span>
                        <span>Help Center</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-[calc(100%-1rem)] text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40 rounded-lg mx-2 my-1 px-4 py-2.5 flex items-center gap-3 transition-all duration-200 text-left font-bold text-sm cursor-pointer border-none bg-transparent"
                      >
                        <span className="material-symbols-outlined">logout</span>
                        <span>Log Out</span>
                      </button>
                    </div>
                  </aside>

                  {/* Mobile Navigation Sidebar Drawer (visible only on mobile) */}
                  {mobileDashboardMenuOpen && (
                    <div className="fixed inset-0 z-[1100] flex sm:hidden">
                      {/* Backdrop */}
                      <div
                        onClick={() => setMobileDashboardMenuOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                      />

                      {/* Drawer Content */}
                      <div className="relative flex w-full max-w-[280px] flex-col bg-surface-container py-6 px-4 shadow-2xl z-10 animate-in slide-in-from-left duration-300">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant/10">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                              <span className="material-symbols-outlined">eco</span>
                            </div>
                            <div>
                              <h2 className="text-base font-bold text-on-surface leading-tight">Admin Central</h2>
                              <p className="text-[9px] text-on-surface-variant uppercase tracking-wider font-semibold">Organic Retailer</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setMobileDashboardMenuOpen(false)}
                            className="p-1 rounded-full text-on-surface-variant hover:bg-surface-variant/40 transition-colors border-none bg-transparent cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                          </button>
                        </div>

                        {/* Navigation links */}
                        <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
                          {[
                            { key: 'overview', label: 'Overview', icon: 'dashboard' },
                            { key: 'profile', label: 'Store Profile', icon: 'storefront' },
                            { key: 'products', label: 'Products', icon: 'inventory_2' },
                            { key: 'stock', label: 'Stock Monitor', icon: 'monitoring' },
                            { key: 'deals', label: 'Deals & Coupons', icon: 'local_offer' },
                            { key: 'featured', label: 'Featured Requests', icon: 'campaign' },
                          ].map((tab) => (
                            <button
                              key={tab.key}
                              onClick={() => {
                                setRetailerTab(tab.key);
                                setMobileDashboardMenuOpen(false);
                              }}
                              className={`w-full rounded-xl px-4 py-3 flex items-center gap-3 transition-all active:scale-98 text-left font-bold text-sm cursor-pointer border-none ${retailerTab === tab.key
                                ? 'bg-[#047c1f] text-white shadow-sm shadow-[#047c1f]/20'
                                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40 bg-transparent'
                                }`}
                            >
                              <span className="material-symbols-outlined text-lg leading-none">{tab.icon}</span>
                              <span>{tab.label}</span>
                            </button>
                          ))}
                        </nav>

                        {/* Bottom Actions */}
                        <div className="mt-auto space-y-4 pt-4 border-t border-outline-variant/10">
                          <button
                            onClick={() => {
                              setRetailerTab('products');
                              setShowAddProduct(true);
                              setMobileDashboardMenuOpen(false);
                            }}
                            className="w-full bg-[#047c1f] hover:bg-[#036318] text-white font-extrabold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-sm active:scale-95 cursor-pointer border-none"
                          >
                            <span className="material-symbols-outlined text-lg">add</span>
                            <span>Add New Product</span>
                          </button>

                          <button
                            onClick={() => {
                              triggerToast('Opening partner help center...', 'info');
                              setMobileDashboardMenuOpen(false);
                            }}
                            className="w-full text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40 rounded-xl px-4 py-2.5 flex items-center gap-3 transition-all text-left font-bold text-sm cursor-pointer border-none bg-transparent"
                          >
                            <span className="material-symbols-outlined text-lg leading-none">help_outline</span>
                            <span>Help Center</span>
                          </button>

                          <button
                            onClick={() => {
                              handleLogout();
                              setMobileDashboardMenuOpen(false);
                            }}
                            className="w-full text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40 rounded-xl px-4 py-2.5 flex items-center gap-3 transition-all text-left font-bold text-sm cursor-pointer border-none bg-transparent"
                          >
                            <span className="material-symbols-outlined text-lg leading-none">logout</span>
                            <span>Log Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Main Content Area */}
                  <main className="w-full sm:ml-64 flex-1 min-h-screen flex flex-col bg-background pb-16 lg:pb-0">

                    {/* TopNavBar */}
                    <header className="w-full sticky top-0 z-40 bg-surface dark:bg-surface-dim flex justify-between items-center px-3 sm:px-8 py-3 sm:py-4 border-b border-outline-variant/30 shadow-sm">
                      <div className="flex items-center gap-2 sm:gap-8">
                        {/* Hamburger menu for mobile drawer */}
                        <button
                          onClick={() => setMobileDashboardMenuOpen(true)}
                          className="flex sm:hidden items-center justify-center p-1.5 text-on-surface-variant hover:bg-surface-variant/20 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[22px]">menu</span>
                        </button>
                        <h1 className="text-lg sm:text-xl font-headline font-bold text-primary truncate max-w-[120px] sm:max-w-none">{retailerProfile.storeName || 'Terra Retail'}</h1>
                        <div className="hidden sm:block relative w-80 group">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                          <input
                            type="text"
                            placeholder="Search analytics or products..."
                            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full focus:ring-2 focus:ring-primary/20 text-sm transition-all focus:outline-none text-on-surface placeholder:text-on-surface-variant/50"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-4">
                        <button
                          onClick={() => triggerToast('You have 3 new notifications', 'info')}
                          className="p-1.5 sm:p-2 text-on-surface-variant hover:bg-surface-variant/50 rounded-full transition-colors cursor-pointer relative border-none bg-transparent"
                        >
                          <span className="material-symbols-outlined text-[20px] sm:text-[24px]">notifications</span>
                          <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
                        </button>
                        <button
                          onClick={() => setRetailerTab('profile')}
                          className="p-1.5 sm:p-2 text-on-surface-variant hover:bg-surface-variant/50 rounded-full transition-colors cursor-pointer border-none bg-transparent"
                        >
                          <span className="material-symbols-outlined text-[20px] sm:text-[24px]">settings</span>
                        </button>
                        <div className="h-6 sm:h-8 w-[1px] bg-outline-variant/30 mx-1 sm:mx-2"></div>

                        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-surface-variant/30 p-1 sm:p-1.5 rounded-lg transition-colors" onClick={() => setRetailerTab('profile')}>
                          <div className="hidden sm:block text-right">
                            <p className="text-sm font-bold leading-none text-on-surface">{currentUser?.name || 'Matilda W.'}</p>
                            <p className="text-xs text-on-surface-variant">Store Owner</p>
                          </div>
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-white font-black text-xs sm:text-sm flex items-center justify-center border-2 border-primary-container uppercase select-none shadow-sm">
                            {currentUser?.avatar || 'OT'}
                          </div>
                        </div>
                      </div>
                    </header>


                    {/* Content Canvas */}
                    <section className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6 sm:space-y-8 flex-1">

                      {/* Page Header */}
                      <div className="flex justify-between items-start sm:items-end flex-col sm:flex-row gap-4 text-left">
                        <div>
                          <h2 className="text-xl sm:text-3xl font-headline font-bold text-on-surface">
                            {retailerTab === 'overview' ? 'Dashboard Overview' :
                              retailerTab === 'profile' ? 'Store Profile' :
                                retailerTab === 'products' ? 'Product Catalogue' :
                                  retailerTab === 'stock' ? 'Stock Monitor' :
                                    retailerTab === 'deals' ? 'Campaign Manager' :
                                      'Featured Requests'}
                          </h2>
                          <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-xl">
                            {retailerTab === 'overview' ? 'Real-time performance metrics for your organic marketplace.' :
                              retailerTab === 'profile' ? 'Manage your storefront brand settings, locations, and details.' :
                                retailerTab === 'products' ? 'Add, activate, and manage your inventory and items.' :
                                  retailerTab === 'stock' ? 'Monitor and manage stock levels, safety alerts, and reorder levels.' :
                                    retailerTab === 'deals' ? 'Create new customer promotions, voucher codes, and coupons.' :
                                      'Promote your listings by requesting premium dashboard real estate.'}
                          </p>
                        </div>
                        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto shrink-0 select-none">
                          <div className="relative flex-1 sm:flex-initial">
                            <button
                              ref={merchantTimeframeRef}
                              onClick={() => setOpenDropdown(openDropdown === 'merchantTimeframe' ? null : 'merchantTimeframe')}
                              className="w-full bg-surface-container-high px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-on-surface-variant flex items-center justify-center gap-1.5 hover:bg-surface-variant transition-all active:scale-95 cursor-pointer border border-slate-200/50"
                            >
                              <span className="material-symbols-outlined text-sm">calendar_today</span>
                              {merchantTimeframe}
                              <span className={`material-symbols-outlined text-xs transition-transform duration-150 ${openDropdown === 'merchantTimeframe' ? 'rotate-180' : ''}`}>expand_more</span>
                            </button>
                            <PortalDropdown anchorRef={merchantTimeframeRef} isOpen={openDropdown === 'merchantTimeframe'} alignRight>
                              <div className="py-1">
                                {TIMEFRAME_OPTIONS.map((opt) => (
                                  <button
                                    key={opt}
                                    onClick={() => {
                                      setMerchantTimeframe(opt);
                                      setOpenDropdown(null);
                                      triggerToast(`Reporting timeframe set to ${opt}`, 'info');
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-container-high rounded-md transition-colors flex items-center gap-2 border-none bg-transparent cursor-pointer font-semibold ${merchantTimeframe === opt ? 'text-primary bg-primary/5' : 'text-on-surface-variant'}`}
                                  >
                                    {merchantTimeframe === opt ? (
                                      <span className="material-symbols-outlined text-sm text-primary">check</span>
                                    ) : (
                                      <span className="w-4 h-4"></span>
                                    )}
                                    <span>{opt}</span>
                                  </button>
                                ))}
                              </div>
                            </PortalDropdown>
                          </div>
                          <button
                            onClick={() => triggerToast('Exporting dashboard report as PDF...', 'success')}
                            className="flex-1 sm:flex-initial bg-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-white flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity active:scale-95 cursor-pointer border-none"
                          >
                            <span className="material-symbols-outlined text-sm">download</span>
                            Export PDF
                          </button>
                        </div>
                      </div>

                      {/* ══════════════════════════════════════
                          TAB: OVERVIEW
                      ══════════════════════════════════════ */}
                      {retailerTab === 'overview' && (
                        <div className="space-y-8 animate-in fade-in duration-300">

                          {/* KPI Cards Grid */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {/* Store Views */}
                            <div className="bg-surface-container-low p-6 rounded-xl custom-shadow group hover:bg-white border border-primary/20 hover:border-primary transition-all duration-200 hover:-translate-y-0.5 text-left">
                              <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                  <span className="material-symbols-outlined">visibility</span>
                                </div>
                                <span className="text-xs font-bold text-primary flex items-center bg-primary/5 px-2 py-1 rounded">{merchantMetrics.growthViews}</span>
                              </div>
                              <h3 className="text-on-surface-variant text-sm font-semibold">Store Views</h3>
                              <p className="text-3xl font-headline font-bold text-on-surface mt-1">{merchantMetrics.views}</p>
                            </div>

                            {/* Active Deals */}
                            <div className="bg-surface-container-low p-6 rounded-xl custom-shadow group hover:bg-white border border-tertiary/30 hover:border-tertiary transition-all duration-200 hover:-translate-y-0.5 text-left">
                              <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-tertiary/10 rounded-lg text-tertiary">
                                  <span className="material-symbols-outlined">local_activity</span>
                                </div>
                                <span className="text-xs font-bold text-tertiary flex items-center bg-tertiary/5 px-2 py-1 rounded">Active</span>
                              </div>
                              <h3 className="text-on-surface-variant text-sm font-semibold">Active Deals</h3>
                              <p className="text-3xl font-headline font-bold text-on-surface mt-1">
                                {merchantMetrics.activeDeals}
                              </p>
                            </div>

                            {/* Total Grabs */}
                            <div className="bg-surface-container-low p-6 rounded-xl custom-shadow group hover:bg-white border border-tertiary/30 hover:border-tertiary transition-all duration-200 hover:-translate-y-0.5 text-left">
                              <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-tertiary/10 rounded-lg text-tertiary">
                                  <span className="material-symbols-outlined">shopping_cart_checkout</span>
                                </div>
                                <span className="text-xs font-bold text-on-surface-variant flex items-center bg-surface-variant/30 px-2 py-1 rounded">{merchantMetrics.grabsStatus}</span>
                              </div>
                              <h3 className="text-on-surface-variant text-sm font-semibold">Total Grabs</h3>
                              <p className="text-3xl font-headline font-bold text-on-surface mt-1">
                                {merchantMetrics.grabs}
                              </p>
                            </div>

                            {/* Total Sales */}
                            <div className="bg-surface-container-low p-6 rounded-xl custom-shadow group hover:bg-white border border-primary/20 hover:border-primary transition-all duration-200 hover:-translate-y-0.5 text-left">
                              <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                  <span className="material-symbols-outlined">payments</span>
                                </div>
                                <span className="text-xs font-bold text-primary flex items-center bg-primary/5 px-2 py-1 rounded">{merchantMetrics.growthSales}</span>
                              </div>
                              <h3 className="text-on-surface-variant text-sm font-semibold">Total Sales</h3>
                              <p className="text-3xl font-headline font-bold text-on-surface mt-1">{merchantMetrics.sales}</p>
                            </div>
                          </div>

                          {/* Bento Grid Analytics */}
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* Most Saved Items */}
                            <div className="bg-surface-container-low p-6 rounded-xl custom-shadow flex flex-col justify-between">
                              <div>
                                <h3 className="font-headline font-bold text-lg text-on-surface mb-4">Most Saved Items</h3>
                                <div className="space-y-4 max-h-[360px] overflow-y-auto no-scrollbar pr-1">
                                  {retailerProducts.slice(0, 10).map((p, idx) => {
                                    const saves = [842, 756, 612, 542, 489, 412, 385, 290, 241, 198];
                                    return (
                                      <div key={p.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-outline-variant/10 text-left">
                                        <div className="flex items-center gap-3 min-w-0">
                                          <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-[10px] font-bold text-primary shrink-0">{idx + 1}</span>
                                          <span className="font-semibold text-sm text-on-surface truncate">{p.name}</span>
                                        </div>
                                        <span className="text-xs font-bold text-primary shrink-0">{saves[idx] || 150} saves</span>
                                      </div>
                                    );
                                  })}
                                  {retailerProducts.length === 0 && (
                                    <p className="text-sm text-on-surface-variant/70 italic py-6">No products saved yet.</p>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => setRetailerTab('products')}
                                className="w-full mt-5 py-2.5 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity border-none cursor-pointer"
                              >
                                View Catalogue
                              </button>
                            </div>

                            {/* Notify back stock */}
                            <div className="bg-surface-container-low p-6 rounded-xl custom-shadow flex flex-col justify-between">
                              <div>
                                <h3 className="font-headline font-bold text-lg text-on-surface mb-4">Notify back stock</h3>
                                <div className="space-y-4 max-h-[360px] overflow-y-auto no-scrollbar pr-1">
                                  {[
                                    { key: 'linen', label: 'Organic Linen Bedding', waiting: 384 },
                                    { key: 'toothbrush', label: 'Bamboo Toothbrush Set', waiting: 192 },
                                    { key: 'bottles', label: 'Glass Spray Bottles', waiting: 95 },
                                    { key: 'wraps', label: 'Reusable Beeswax Wraps', waiting: 82 },
                                    { key: 'bento', label: 'Stainless Steel Bento Box', waiting: 74 },
                                    { key: 'mug', label: 'Ceramic Travel Coffee Mug', waiting: 67 },
                                    { key: 'tote', label: 'Organic Cotton Tote Bag', waiting: 58 },
                                    { key: 'laundry', label: 'Eco Laundry Detergent Sheets', waiting: 51 },
                                    { key: 'balls', label: 'Natural Wool Dryer Balls', waiting: 43 },
                                    { key: 'sponge', label: 'Biodegradable Sponge Pack', waiting: 39 }
                                  ].map(item => {
                                    return (
                                      <div key={item.key} className="flex items-center justify-between p-3 bg-white rounded-lg border border-outline-variant/10 text-left">
                                        <div className="flex flex-col text-left min-w-0">
                                          <span className="font-semibold text-sm text-on-surface truncate">{item.label}</span>
                                          <span className="text-[11px] text-on-surface-variant/70 mt-0.5">Restock request active</span>
                                        </div>
                                        <span className="text-xs font-bold bg-error/10 text-error px-2.5 py-1 rounded-full shrink-0">
                                          🔥 {item.waiting} waiting
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <button
                                onClick={() => setRestockModalOpen(true)}
                                className="w-full mt-5 py-2.5 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity border-none cursor-pointer"
                              >
                                Send Restock Alert
                              </button>
                            </div>

                            {/* Top Selling Products */}
                            <div className="bg-surface-container-low p-6 rounded-xl custom-shadow flex flex-col justify-between text-left">
                              <div>
                                <h3 className="font-headline font-bold text-lg text-on-surface mb-4">Top Selling</h3>
                                <div className="space-y-4 max-h-[360px] overflow-y-auto no-scrollbar pr-1">
                                  {[
                                    { id: 'ts1', name: 'Dyson V15 Detect Vacuum', sales: '1,482 sold' },
                                    { id: 'ts2', name: 'Apple iPad Pro M4', sales: '985 sold' },
                                    { id: 'ts3', name: 'Nintendo Switch OLED', sales: '723 sold' },
                                    { id: 'ts4', name: 'Sony WH-1000XM5 Headphones', sales: '642 sold' },
                                    { id: 'ts5', name: 'Patagonia Torrentshell Jacket', sales: '580 sold' },
                                    { id: 'ts6', name: 'Hydro Flask Wide Mouth Bottle', sales: '512 sold' },
                                    { id: 'ts7', name: 'Kindle Paperwhite 16GB', sales: '485 sold' },
                                    { id: 'ts8', name: 'Logitech MX Master 3S Mouse', sales: '412 sold' },
                                    { id: 'ts9', name: 'Anker 737 Power Bank', sales: '389 sold' },
                                    { id: 'ts10', name: 'Lululemon Align High-Rise Pant', sales: '340 sold' }
                                  ].map((p, idx) => (
                                    <div key={p.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-outline-variant/10 text-left">
                                      <div className="flex items-center gap-3 min-w-0">
                                        <span className="w-6 h-6 bg-[#fdc800]/10 rounded-full flex items-center justify-center text-[10px] font-bold text-[#c29600] shrink-0">{idx + 1}</span>
                                        <span className="font-semibold text-sm text-on-surface truncate">{p.name}</span>
                                      </div>
                                      <span className="text-xs font-bold text-primary shrink-0">{p.sales}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <button
                                onClick={() => setSalesReportModalOpen(true)}
                                className="w-full mt-5 py-2.5 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity border-none cursor-pointer"
                              >
                                View Sales Report
                              </button>
                            </div>
                          </div>

                        </div>
                      )}

                      {/* ══════════════════════════════════════
                          TAB: STORE PROFILE
                      ══════════════════════════════════════ */}
                      {retailerTab === 'profile' && (
                        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300 text-left">
                          <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm">

                            <div className="flex items-center justify-between mb-6">
                              <h3 className="font-headline font-bold text-xl text-on-surface">
                                🏪 Store Settings
                              </h3>
                              <button
                                onClick={() => setEditingProfile(!editingProfile)}
                                className={`px-5 py-2 rounded-full text-xs font-bold cursor-pointer transition-colors border-none ${editingProfile
                                  ? 'bg-surface-container text-on-surface hover:bg-surface-variant'
                                  : 'bg-primary text-white hover:opacity-90'
                                  }`}
                              >
                                {editingProfile ? '✕ Cancel' : '✏️ Edit Profile'}
                              </button>
                            </div>

                            {/* Store logo display */}
                            <div className="flex items-center gap-4 mb-6 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20">
                              <div className="w-20 h-20 rounded-2xl bg-primary text-white font-black text-2xl flex items-center justify-center border-2 border-primary-container shadow-md select-none uppercase">
                                {retailerProfile.storeName ? retailerProfile.storeName.split(' ').map(w => w[0]).join('') : 'OT'}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-on-surface">Store Logo & Branding</p>
                                <p className="text-xs text-on-surface-variant mt-0.5">
                                  Logo file is loaded dynamically from partner registries.
                                </p>
                                {editingProfile && (
                                  <button
                                    onClick={() => triggerToast('Logo uploads are available for Pro verified accounts!', 'info')}
                                    className="mt-2 text-xs font-bold text-primary bg-primary-container/20 border border-primary/20 px-3 py-1 rounded-full cursor-pointer hover:bg-primary-container/30 border-none"
                                  >
                                    Upload Logo
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              {[
                                { label: 'Store Name', field: 'storeName', placeholder: 'e.g. OzTech Deals' },
                                { label: 'Tagline', field: 'tagline', placeholder: 'Short catchy tagline' },
                                { label: 'Location', field: 'location', placeholder: 'e.g. Sydney, NSW' },
                                { label: 'Phone', field: 'phone', placeholder: '+61 2 0000 0000' },
                                { label: 'Email', field: 'email', placeholder: 'store@email.com.au' },
                                { label: 'Website', field: 'website', placeholder: 'www.yourstore.com.au' },
                                { label: 'ABN Reference', field: 'abn', placeholder: '12 345 678 901' },
                                { label: 'Primary Category', field: 'category', placeholder: 'e.g. Tech' },
                              ].map(({ label, field, placeholder }) => (
                                <div key={field} className="space-y-1.5 flex flex-col">
                                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                                    {label}
                                  </label>
                                  {editingProfile ? (
                                    <input
                                      type="text"
                                      placeholder={placeholder}
                                      value={retailerProfile[field] || ''}
                                      onChange={(e) => {
                                        setRetailerProfile(prev => ({
                                          ...prev,
                                          [field]: e.target.value
                                        }));
                                      }}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                  ) : (
                                    <p className="bg-surface-container-low/50 border border-outline-variant/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-on-surface leading-normal min-h-[42px] flex items-center">
                                      {retailerProfile[field] || <span className="text-on-surface-variant/40 italic">Not set</span>}
                                    </p>
                                  )}
                                </div>
                              ))}

                              <div className="sm:col-span-2 space-y-1.5 flex flex-col">
                                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                                  About the Store Description
                                </label>
                                {editingProfile ? (
                                  <textarea
                                    placeholder="Write a brief profile description about your store..."
                                    value={retailerProfile.description || ''}
                                    onChange={(e) => {
                                      setRetailerProfile(prev => ({
                                        ...prev,
                                        description: e.target.value
                                      }));
                                    }}
                                    rows={4}
                                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                                  />
                                ) : (
                                  <p className="bg-surface-container-low/50 border border-outline-variant/10 rounded-xl px-4 py-3 text-sm font-semibold text-on-surface leading-relaxed whitespace-pre-line min-h-[80px]">
                                    {retailerProfile.description || <span className="text-on-surface-variant/40 italic">No description added yet.</span>}
                                  </p>
                                )}
                              </div>
                            </div>

                            {editingProfile && (
                              <div className="flex gap-3 pt-6 mt-6 border-t border-outline-variant/20">
                                <button
                                  onClick={() => {
                                    setEditingProfile(false);
                                    triggerToast('✓ Store settings saved successfully!', 'success');
                                  }}
                                  className="bg-primary text-white font-bold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity cursor-pointer border-none"
                                >
                                  Save Configuration
                                </button>
                                <button
                                  onClick={() => setEditingProfile(false)}
                                  className="bg-surface-container text-on-surface border border-outline-variant/30 font-bold px-6 py-2.5 rounded-xl hover:bg-surface-variant transition-colors cursor-pointer border-none"
                                >
                                  Cancel Changes
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* ══════════════════════════════════════
                          TAB: PRODUCTS CATALOGUE
                      ══════════════════════════════════════ */}
                      {retailerTab === 'products' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">

                          {/* Top Actions panel */}
                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                              <h3 className="font-headline font-bold text-xl text-on-surface">📦 Product Catalog</h3>
                              <p className="text-xs text-on-surface-variant mt-0.5">{retailerProducts.length} items configured in inventory</p>
                            </div>
                            <button
                              onClick={() => setShowAddProduct(true)}
                              className="px-5 py-2.5 rounded-xl bg-primary hover:opacity-90 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-opacity border-none shadow-sm"
                            >
                              <span className="material-symbols-outlined text-sm">add</span>
                              Add Product
                            </button>
                          </div>

                          {/* Add Product Form Modal (Styled Sand/Green) */}
                          {showAddProduct && (
                            <div className="bg-white border-2 border-primary/30 rounded-2xl p-6 shadow-sm space-y-6 animate-in slide-in-from-top duration-300">
                              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                                <h4 className="font-headline font-bold text-lg text-on-surface">➕ Add New Product</h4>
                                <button
                                  onClick={() => {
                                    setShowAddProduct(false);
                                    setNewProduct({ name: '', price: '', stock: '', category: 'Tech', desc: '', imagePreview: '' });
                                  }}
                                  className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer border-none bg-transparent"
                                >
                                  <span className="material-symbols-outlined">close</span>
                                </button>
                              </div>

                              <div className="space-y-4">
                                {/* Image upload section */}
                                <div className="space-y-2 flex flex-col">
                                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Product Image</label>
                                  <div className="flex items-start gap-4">
                                    <div className="w-24 h-24 rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low flex items-center justify-center overflow-hidden shrink-0">
                                      {newProduct.imagePreview ? (
                                        <img src={newProduct.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                      ) : (
                                        <div className="text-center p-2 text-on-surface-variant/40">
                                          <span className="material-symbols-outlined text-2xl">photo_camera</span>
                                          <p className="text-[9px] font-bold mt-1">No Image</p>
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex-1 space-y-2 text-left">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        id="product-image-upload"
                                        className="hidden"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                              setNewProduct(prev => ({
                                                ...prev,
                                                imagePreview: reader.result,
                                              }));
                                            };
                                            reader.readAsDataURL(file);
                                          }
                                        }}
                                      />
                                      <label
                                        htmlFor="product-image-upload"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-variant/60 text-on-surface text-[12px] font-bold cursor-pointer transition-colors border border-outline-variant/30"
                                      >
                                        📁 Choose Image File
                                      </label>
                                      <p className="text-[10px] text-on-surface-variant/60">
                                        PNG, JPG, or WEBP. File size up to 5MB.
                                      </p>
                                      {newProduct.imagePreview && (
                                        <button
                                          onClick={() => setNewProduct(prev => ({ ...prev, imagePreview: '' }))}
                                          className="text-[11px] text-error font-bold hover:underline cursor-pointer border-none bg-transparent p-0 block mt-1"
                                        >
                                          Remove Image Preview
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="sm:col-span-2 space-y-1.5 flex flex-col">
                                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Product Name *</label>
                                    <input
                                      type="text"
                                      placeholder="e.g. Sony WH-1000XM5 Noise Cancelling Headphones"
                                      value={newProduct.name}
                                      onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-base font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                  </div>

                                  <div className="space-y-1.5 flex flex-col">
                                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Price (AUD) *</label>
                                    <input
                                      type="number"
                                      placeholder="0.00"
                                      value={newProduct.price}
                                      onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-base font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                  </div>

                                  <div className="space-y-1.5 flex flex-col">
                                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Stock Level Quantity *</label>
                                    <input
                                      type="number"
                                      placeholder="0"
                                      value={newProduct.stock}
                                      onChange={(e) => setNewProduct(prev => ({ ...prev, stock: e.target.value }))}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-base font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                  </div>

                                  <div className="sm:col-span-2 space-y-1.5 flex flex-col">
                                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Category</label>
                                    <select
                                      value={newProduct.category}
                                      onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-base font-semibold text-on-surface focus:outline-none focus:ring-2"
                                    >
                                      {CATEGORY_NAMES.map(c => (
                                        <option key={c}>{c}</option>
                                      ))}
                                    </select>
                                  </div>

                                  <div className="sm:col-span-2 space-y-1.5 flex flex-col">
                                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Description</label>
                                    <textarea
                                      placeholder="Describe your product specs, materials, and warranty information..."
                                      value={newProduct.desc}
                                      onChange={(e) => setNewProduct(prev => ({ ...prev, desc: e.target.value }))}
                                      rows={3}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-base font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-3 pt-4 border-t border-outline-variant/20">
                                <button
                                  onClick={() => {
                                    if (!newProduct.name || !newProduct.price) {
                                      triggerToast('Product name and pricing fields are required', 'error');
                                      return;
                                    }
                                    const product = {
                                      id: 'rp' + Date.now(),
                                      name: newProduct.name,
                                      price: parseFloat(newProduct.price) || 0,
                                      stock: parseInt(newProduct.stock) || 0,
                                      category: newProduct.category,
                                      desc: newProduct.desc,
                                      status: 'Active',
                                      image: null,
                                      imagePreview: newProduct.imagePreview || `https://picsum.photos/seed/${Date.now()}/400/300`,
                                      createdAt: new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }),
                                    };
                                    setRetailerProducts(prev => [product, ...prev]);
                                    setShowAddProduct(false);
                                    setNewProduct({ name: '', price: '', stock: '', category: 'Tech', desc: '', imagePreview: '' });
                                    triggerToast('✓ Product successfully listed in your catalogue!', 'success');
                                  }}
                                  className="px-6 py-2.5 rounded-xl bg-primary hover:opacity-90 text-white font-bold text-xs cursor-pointer border-none shadow-sm"
                                >
                                  Save Product Listing
                                </button>
                                <button
                                  onClick={() => {
                                    setShowAddProduct(false);
                                    setNewProduct({ name: '', price: '', stock: '', category: 'Tech', desc: '', imagePreview: '' });
                                  }}
                                  className="px-6 py-2.5 rounded-xl bg-surface-container hover:bg-surface-variant text-on-surface font-bold text-xs border border-outline-variant/30 cursor-pointer border-none"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Inventory List Cards */}
                          <div className="flex overflow-x-auto no-scrollbar pb-4 gap-4 w-full flex-nowrap lg:grid lg:grid-cols-3 lg:gap-6">
                            {retailerProducts.map(p => (
                              <div key={p.id} className="w-[260px] shrink-0 lg:w-auto lg:shrink bg-white border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between text-left">
                                <div>
                                  <div className="relative h-40 bg-surface-container overflow-hidden">
                                    <img src={p.imagePreview} alt={p.name} className="w-full h-full object-cover" />
                                    <div className="absolute top-2.5 right-2.5">
                                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border shadow-sm ${p.status === 'Active'
                                        ? 'bg-primary/10 text-primary border-primary/20'
                                        : 'bg-surface-variant text-on-surface-variant border-outline-variant/30'
                                        }`}>
                                        {p.status}
                                      </span>
                                    </div>
                                    <div className="absolute top-2.5 left-2.5">
                                      <span className="text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded-full">
                                        {p.category}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="p-5 space-y-2">
                                    <h4 className="font-bold text-[14px] text-on-surface leading-snug">{p.name}</h4>
                                    <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                                      {p.desc || 'No description provided.'}
                                    </p>
                                  </div>
                                </div>
                                <div className="p-5 pt-0 space-y-3">
                                  <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20">
                                    <div>
                                      <span className="text-lg font-black text-primary">${p.price.toFixed(2)}</span>
                                      <span className="text-xs text-on-surface-variant/60 ml-1">AUD</span>
                                    </div>
                                    <span className={`text-xs font-bold ${p.stock === 0 ? 'text-error' : 'text-on-surface-variant'}`}>
                                      {p.stock === 0 ? 'Out of Stock' : `${p.stock} units`}
                                    </span>
                                  </div>
                                  <div className="flex gap-2 pt-1.5">
                                    <button
                                      onClick={() => {
                                        setRetailerProducts(prev =>
                                          prev.map(prod =>
                                            prod.id === p.id
                                              ? { ...prod, status: prod.status === 'Active' ? 'Inactive' : 'Active' }
                                              : prod
                                          )
                                        );
                                        triggerToast(`Product status updated to ${p.status === 'Active' ? 'Inactive' : 'Active'}!`, 'success');
                                      }}
                                      className="flex-1 py-2 px-3 rounded-lg border border-outline-variant/30 hover:bg-surface-container-low text-[11px] font-bold text-on-surface cursor-pointer text-center bg-transparent"
                                    >
                                      {p.status === 'Active' ? '⏸ Deactivate' : '▶ Activate'}
                                    </button>
                                    <button
                                      onClick={() => {
                                        setRetailerProducts(prev => prev.filter(prod => prod.id !== p.id));
                                        triggerToast('✓ Product deleted from catalogue!', 'warning');
                                      }}
                                      className="py-2 px-3 rounded-lg border border-error/20 hover:bg-error-container/10 text-[11px] font-bold text-error cursor-pointer text-center bg-transparent"
                                    >
                                      ✕ Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {retailerProducts.length === 0 && (
                              <div className="col-span-full py-16 bg-white border border-outline-variant/30 rounded-2xl text-center text-on-surface-variant/60 font-bold shadow-sm">
                                <p className="text-sm">No items in your product inventory.</p>
                                <button
                                  onClick={() => setShowAddProduct(true)}
                                  className="mt-4 bg-primary text-white px-5 py-2 rounded-xl font-bold text-xs border-none cursor-pointer"
                                >
                                  + Create First Product
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* ══════════════════════════════════════
                          TAB: STOCK MONITOR
                      ══════════════════════════════════════ */}
                      {retailerTab === 'stock' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">

                          {/* Top Actions Panel */}
                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                              <h3 className="font-headline font-bold text-xl text-on-surface">📈 Stock Monitor & Inventory</h3>
                              <p className="text-xs text-on-surface-variant mt-0.5">Real-time tracking of item quantities, alerts, and valuation</p>
                            </div>
                            <button
                              onClick={() => {
                                const lowStockItems = retailerProducts.filter(p => p.stock > 0 && p.stock <= (p.reorderThreshold || 5));
                                if (lowStockItems.length > 0) {
                                  setRetailerProducts(prev => prev.map(p => {
                                    const threshold = p.reorderThreshold || 5;
                                    if (p.stock > 0 && p.stock <= threshold) {
                                      return { ...p, stock: p.stock + 30 };
                                    }
                                    return p;
                                  }));
                                  triggerToast(`Reordered +30 units for ${lowStockItems.length} low stock items!`, 'success');
                                } else {
                                  triggerToast('All active products have sufficient stock levels.', 'info');
                                }
                              }}
                              className="px-4 py-2.5 rounded-xl bg-primary hover:opacity-90 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-opacity border-none shadow-sm active:scale-95"
                            >
                              <span className="material-symbols-outlined text-sm">local_shipping</span>
                              Bulk Restock Low Items
                            </button>
                          </div>

                          {/* KPI Cards Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Card 1: Total Units */}
                            <div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                              <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                                <span className="material-symbols-outlined text-2xl">inventory_2</span>
                              </div>
                              <div className="min-w-0">
                                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Total Units</p>
                                <p className="text-2xl font-headline font-black text-on-surface mt-0.5 truncate">
                                  {retailerProducts.reduce((sum, p) => sum + p.stock, 0)} <span className="text-xs text-slate-500 font-sans font-semibold">in stock</span>
                                </p>
                              </div>
                            </div>

                            {/* Card 2: Inventory Value */}
                            <div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                              <div className="p-3 bg-tertiary/20 rounded-xl text-primary shrink-0">
                                <span className="material-symbols-outlined text-2xl">payments</span>
                              </div>
                              <div className="min-w-0">
                                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Stock Valuation</p>
                                <p className="text-2xl font-headline font-black text-on-surface mt-0.5 truncate">
                                  ${retailerProducts.reduce((sum, p) => sum + (p.stock * p.price), 0).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                              </div>
                            </div>

                            {/* Card 3: Low Stock Alerts */}
                            <div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                              <div className="p-3 bg-amber-50 rounded-xl text-amber-600 shrink-0">
                                <span className="material-symbols-outlined text-2xl">warning</span>
                              </div>
                              <div className="min-w-0">
                                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Low Stock Warnings</p>
                                <p className="text-2xl font-headline font-black text-amber-600 mt-0.5 truncate">
                                  {retailerProducts.filter(p => p.stock > 0 && p.stock <= (p.reorderThreshold || 5)).length} <span className="text-xs text-slate-500 font-sans font-semibold">items</span>
                                </p>
                              </div>
                            </div>

                            {/* Card 4: Out of Stock */}
                            <div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                              <div className="p-3 bg-red-50 rounded-xl text-error shrink-0">
                                <span className="material-symbols-outlined text-2xl">error_outline</span>
                              </div>
                              <div className="min-w-0">
                                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Out of Stock</p>
                                <p className="text-2xl font-headline font-black text-error mt-0.5 truncate">
                                  {retailerProducts.filter(p => p.stock === 0).length} <span className="text-xs text-slate-500 font-sans font-semibold">items</span>
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Filters and Search */}
                          <div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="relative w-full md:w-80 group">
                              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
                              <input
                                type="text"
                                placeholder="Search products in inventory..."
                                value={stockSearchQuery}
                                onChange={(e) => setStockSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 bg-surface-container-low border border-outline-variant/20 rounded-xl text-xs focus:ring-2 focus:ring-primary/20 transition-all focus:outline-none text-on-surface font-semibold placeholder:text-on-surface-variant/40"
                              />
                            </div>
                            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                              {['All', 'In Stock', 'Low Stock', 'Out of Stock'].map((filter) => {
                                const count = filter === 'All'
                                  ? retailerProducts.length
                                  : filter === 'In Stock'
                                    ? retailerProducts.filter(p => p.stock > (p.reorderThreshold || 5)).length
                                    : filter === 'Low Stock'
                                      ? retailerProducts.filter(p => p.stock > 0 && p.stock <= (p.reorderThreshold || 5)).length
                                      : retailerProducts.filter(p => p.stock === 0).length;

                                return (
                                  <button
                                    key={filter}
                                    onClick={() => setStockFilter(filter)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-none cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${stockFilter === filter
                                      ? 'bg-primary text-white shadow-sm'
                                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-variant/40'
                                      }`}
                                  >
                                    <span>{filter}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${stockFilter === filter ? 'bg-white/25 text-white' : 'bg-surface-variant text-on-surface-variant'
                                      }`}>{count}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Stock Listing */}
                          <div className="bg-white rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                              <table className="hidden md:table w-full text-xs text-left border-collapse">
                                <thead className="bg-surface-container-low border-b border-outline-variant/30">
                                  <tr>
                                    {['Product Details', 'Category', 'Price (AUD)', 'Stock Level', 'Status & Fill', 'Alert Limit', 'Actions'].map(h => (
                                      <th key={h} className="px-4 py-3.5 font-bold text-[10px] text-on-surface-variant uppercase tracking-wider">{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/20 font-semibold text-on-surface">
                                  {filteredStockProducts.map(p => {
                                    const threshold = p.reorderThreshold || 5;
                                    const isOutOfStock = p.stock === 0;
                                    const isLowStock = p.stock > 0 && p.stock <= threshold;
                                    const maxCapacity = 50;
                                    const percentage = Math.min(100, Math.round((p.stock / maxCapacity) * 100));

                                    let statusBadgeClass = 'bg-primary/10 text-primary border-primary/20';
                                    let statusText = 'Adequate Stock';
                                    let progressColor = 'bg-primary';

                                    if (isOutOfStock) {
                                      statusBadgeClass = 'bg-red-50 text-error border-red-100';
                                      statusText = 'Out of Stock';
                                      progressColor = 'bg-error';
                                    } else if (isLowStock) {
                                      statusBadgeClass = 'bg-amber-50 text-amber-600 border-amber-100';
                                      statusText = 'Low Stock';
                                      progressColor = 'bg-amber-500';
                                    }

                                    return (
                                      <tr key={p.id} className="hover:bg-surface-container-low/30 transition-colors align-middle">
                                        <td className="px-4 py-4">
                                          <div className="flex items-center gap-3">
                                            <img src={p.imagePreview} alt={p.name} className="w-10 h-10 object-cover rounded-lg border border-outline-variant/30 shrink-0 bg-surface-container" />
                                            <div className="max-w-[220px]">
                                              <p className="font-bold text-on-surface truncate">{p.name}</p>
                                              <p className="text-[10px] text-on-surface-variant font-medium mt-0.5 truncate">{p.desc || 'No description'}</p>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="px-4 py-4">
                                          <span className="bg-surface-container text-on-surface-variant text-[10px] px-2 py-0.5 rounded border border-outline-variant/20">
                                            {p.category}
                                          </span>
                                        </td>
                                        <td className="px-4 py-4 font-mono font-bold text-on-surface">
                                          ${p.price.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-4">
                                          <div className="flex items-center gap-2">
                                            <button
                                              onClick={() => {
                                                setRetailerProducts(prev => prev.map(x => x.id === p.id ? { ...x, stock: Math.max(0, x.stock - 1) } : x));
                                                triggerToast(`Reduced stock for ${p.name}`, 'info');
                                              }}
                                              className="w-7 h-7 rounded border border-outline-variant/60 hover:bg-surface-container text-on-surface-variant cursor-pointer flex items-center justify-center font-bold bg-white text-[14px]"
                                            >
                                              -
                                            </button>
                                            <span className="font-mono text-sm w-8 text-center">{p.stock}</span>
                                            <button
                                              onClick={() => {
                                                setRetailerProducts(prev => prev.map(x => x.id === p.id ? { ...x, stock: x.stock + 1 } : x));
                                                triggerToast(`Increased stock for ${p.name}`, 'success');
                                              }}
                                              className="w-7 h-7 rounded border border-outline-variant/60 hover:bg-surface-container text-on-surface-variant cursor-pointer flex items-center justify-center font-bold bg-white text-[14px]"
                                            >
                                              +
                                            </button>
                                          </div>
                                        </td>
                                        <td className="px-4 py-4">
                                          <div className="space-y-1.5 max-w-[150px]">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadgeClass}`}>
                                              {statusText}
                                            </span>
                                            <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                                              <div className={`h-full ${progressColor} transition-all duration-300`} style={{ width: `${percentage}%` }}></div>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="px-4 py-4">
                                          <div className="flex items-center gap-1.5">
                                            <span className="text-[10px] text-on-surface-variant font-medium">Alert if &lt;</span>
                                            <input
                                              type="number"
                                              value={threshold}
                                              onChange={(e) => {
                                                const val = Math.max(0, parseInt(e.target.value) || 0);
                                                setRetailerProducts(prev => prev.map(x => x.id === p.id ? { ...x, reorderThreshold: val } : x));
                                              }}
                                              className="w-12 px-1.5 py-0.5 border border-outline-variant/60 rounded bg-white text-center font-mono font-bold text-xs focus:ring-1 focus:ring-primary/20 outline-none"
                                            />
                                          </div>
                                        </td>
                                        <td className="px-4 py-4">
                                          <button
                                            onClick={() => {
                                              setRetailerProducts(prev => prev.map(x => x.id === p.id ? { ...x, stock: x.stock + 15 } : x));
                                              triggerToast(`Restocked +15 units for ${p.name}!`, 'success');
                                            }}
                                            className="px-2.5 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-bold cursor-pointer border border-primary/20 transition-colors flex items-center gap-1"
                                          >
                                            <span className="material-symbols-outlined text-[12px]">add_circle</span>
                                            Restock +15
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                  {filteredStockProducts.length === 0 && (
                                    <tr>
                                      <td colSpan={7} className="py-12 text-center text-on-surface-variant/50 font-bold italic">
                                        No inventory inventory products found matching filters.
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>

                              {/* Mobile Card Layout */}
                              <div className="block md:hidden divide-y divide-outline-variant/20 bg-white">
                                {filteredStockProducts.map(p => {
                                  const threshold = p.reorderThreshold || 5;
                                  const isOutOfStock = p.stock === 0;
                                  const isLowStock = p.stock > 0 && p.stock <= threshold;
                                  const maxCapacity = 50;
                                  const percentage = Math.min(100, Math.round((p.stock / maxCapacity) * 100));

                                  let statusBadgeClass = 'bg-primary/10 text-primary border-primary/20';
                                  let statusText = 'Adequate Stock';
                                  let progressColor = 'bg-primary';

                                  if (isOutOfStock) {
                                    statusBadgeClass = 'bg-red-50 text-error border-red-100';
                                    statusText = 'Out of Stock';
                                    progressColor = 'bg-error';
                                  } else if (isLowStock) {
                                    statusBadgeClass = 'bg-amber-50 text-amber-600 border-amber-100';
                                    statusText = 'Low Stock';
                                    progressColor = 'bg-amber-505';
                                  }

                                  return (
                                    <div key={p.id} className="p-4 space-y-4 text-left">
                                      <div className="flex items-center gap-3">
                                        <img src={p.imagePreview} alt={p.name} className="w-12 h-12 object-cover rounded-xl border border-outline-variant/30 shrink-0 bg-surface-container" />
                                        <div className="min-w-0 flex-1">
                                          <p className="font-bold text-on-surface text-sm truncate">{p.name}</p>
                                          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                                            <span className="bg-surface-container text-on-surface-variant text-[9px] font-bold px-2 py-0.5 rounded border border-outline-variant/20 uppercase tracking-wider">
                                              {p.category}
                                            </span>
                                            <span className="font-mono font-black text-xs text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                                              ${p.price.toFixed(2)}
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col justify-between space-y-1">
                                          <span className="text-[10px] text-slate-405 font-bold uppercase tracking-wider">Stock Status</span>
                                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border text-center ${statusBadgeClass} mt-1`}>
                                            {statusText}
                                          </span>
                                        </div>

                                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col justify-between">
                                          <span className="text-[10px] text-slate-405 font-bold uppercase tracking-wider block">Quantity</span>
                                          <div className="flex items-center justify-center gap-2 mt-1">
                                            <button
                                              onClick={() => {
                                                setRetailerProducts(prev => prev.map(x => x.id === p.id ? { ...x, stock: Math.max(0, x.stock - 1) } : x));
                                                triggerToast(`Reduced stock for ${p.name}`, 'info');
                                              }}
                                              className="w-6.5 h-6.5 rounded border border-outline-variant/60 hover:bg-surface-container text-on-surface-variant cursor-pointer flex items-center justify-center font-bold bg-white text-[12px]"
                                            >
                                              -
                                            </button>
                                            <span className="font-mono text-sm w-6 text-center font-black">{p.stock}</span>
                                            <button
                                              onClick={() => {
                                                setRetailerProducts(prev => prev.map(x => x.id === p.id ? { ...x, stock: x.stock + 1 } : x));
                                                triggerToast(`Increased stock for ${p.name}`, 'success');
                                              }}
                                              className="w-6.5 h-6.5 rounded border border-outline-variant/60 hover:bg-surface-container text-on-surface-variant cursor-pointer flex items-center justify-center font-bold bg-white text-[12px]"
                                            >
                                              +
                                            </button>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex items-center justify-between pt-2 border-t border-slate-100/50 text-xs">
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-[10px] text-slate-405 font-bold uppercase tracking-wider">Alert Threshold:</span>
                                          <input
                                            type="number"
                                            value={threshold}
                                            onChange={(e) => {
                                              const val = Math.max(0, parseInt(e.target.value) || 0);
                                              setRetailerProducts(prev => prev.map(x => x.id === p.id ? { ...x, reorderThreshold: val } : x));
                                            }}
                                            className="w-10 px-1 py-0.5 border border-outline-variant/60 rounded bg-white text-center font-mono font-bold text-[11px] outline-none"
                                          />
                                        </div>
                                        <button
                                          onClick={() => {
                                            setRetailerProducts(prev => prev.map(x => x.id === p.id ? { ...x, stock: x.stock + 15 } : x));
                                            triggerToast(`Restocked +15 units for ${p.name}!`, 'success');
                                          }}
                                          className="px-3 py-1.5 rounded-xl bg-primary text-white text-[10px] font-extrabold cursor-pointer border-none shadow-sm flex items-center gap-1 hover:opacity-90 active:scale-95"
                                        >
                                          <span className="material-symbols-outlined text-[12px]">add_circle</span>
                                          <span>Restock +15</span>
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                                {filteredStockProducts.length === 0 && (
                                  <div className="py-12 text-center text-on-surface-variant/50 font-bold italic text-xs">
                                    No inventory products found matching filters.
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ══════════════════════════════════════
                          TAB: DEALS & COUPONS
                      ══════════════════════════════════════ */}
                      {retailerTab === 'deals' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">
                          {/* Top Actions Panel */}
                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                              <h3 className="font-headline font-bold text-xl text-on-surface">🏷️ Campaign Manager</h3>
                              <p className="text-xs text-on-surface-variant mt-0.5">{retailerDeals.length} active coupons and promotional campaigns</p>
                            </div>
                            <button
                              onClick={() => setShowAddDeal(true)}
                              className="px-5 py-2.5 rounded-xl bg-primary hover:opacity-90 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-opacity border-none shadow-sm"
                            >
                              <span className="material-symbols-outlined text-sm">add</span>
                              Post a New Deal
                            </button>
                          </div>

                          {/* Add Deal Form Modal (Styled Sand/Green) */}
                          {showAddDeal && (
                            <div className="bg-white border-2 border-primary/30 rounded-2xl p-6 shadow-sm space-y-6 animate-in slide-in-from-top duration-300">
                              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                                <h4 className="font-headline font-bold text-lg text-on-surface">➕ Create Promotion Campaign</h4>
                                <button
                                  onClick={() => {
                                    setShowAddDeal(false);
                                    setNewRetailerDeal({ title: '', code: '', originalPrice: '', salePrice: '', category: 'Tech', state: 'NSW', expiry: '7', desc: '' });
                                  }}
                                  className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer border-none bg-transparent"
                                >
                                  <span className="material-symbols-outlined">close</span>
                                </button>
                              </div>

                              <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="sm:col-span-2 space-y-1.5 flex flex-col">
                                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Campaign Title *</label>
                                    <input
                                      type="text"
                                      placeholder="e.g. 20% Off Storewide Organic Honey & Oats"
                                      value={newRetailerDeal.title}
                                      onChange={(e) => setNewRetailerDeal(prev => ({ ...prev, title: e.target.value }))}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                  </div>

                                  <div className="space-y-1.5 flex flex-col">
                                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Promo Voucher Code (Uppercase)</label>
                                    <input
                                      type="text"
                                      placeholder="e.g. ECOHONEY20"
                                      value={newRetailerDeal.code}
                                      onChange={(e) => setNewRetailerDeal(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                  </div>

                                  <div className="space-y-1.5 flex flex-col">
                                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Category</label>
                                    <select
                                      value={newRetailerDeal.category}
                                      onChange={(e) => setNewRetailerDeal(prev => ({ ...prev, category: e.target.value }))}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                      {CATEGORY_NAMES.map(c => (
                                        <option key={c}>{c}</option>
                                      ))}
                                    </select>
                                  </div>

                                  <div className="space-y-1.5 flex flex-col">
                                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Original Price (AUD) *</label>
                                    <input
                                      type="number"
                                      placeholder="0.00"
                                      value={newRetailerDeal.originalPrice}
                                      onChange={(e) => setNewRetailerDeal(prev => ({ ...prev, originalPrice: e.target.value }))}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                  </div>

                                  <div className="space-y-1.5 flex flex-col">
                                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Sale Price (AUD) *</label>
                                    <input
                                      type="number"
                                      placeholder="0.00"
                                      value={newRetailerDeal.salePrice}
                                      onChange={(e) => setNewRetailerDeal(prev => ({ ...prev, salePrice: e.target.value }))}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                  </div>

                                  <div className="space-y-1.5 flex flex-col">
                                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Australian Region / State</label>
                                    <select
                                      value={newRetailerDeal.state}
                                      onChange={(e) => setNewRetailerDeal(prev => ({ ...prev, state: e.target.value }))}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                      {['National', 'NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'].map(s => (
                                        <option key={s}>{s}</option>
                                      ))}
                                    </select>
                                  </div>

                                  <div className="space-y-1.5 flex flex-col">
                                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Expiry Duration (Days)</label>
                                    <select
                                      value={newRetailerDeal.expiry}
                                      onChange={(e) => setNewRetailerDeal(prev => ({ ...prev, expiry: e.target.value }))}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                      {['1', '2', '3', '5', '7', '10', '14', '30'].map(d => (
                                        <option key={d} value={d}>{d} Days</option>
                                      ))}
                                    </select>
                                  </div>

                                  <div className="sm:col-span-2 space-y-1.5 flex flex-col">
                                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Campaign Description</label>
                                    <textarea
                                      placeholder="Provide details about the deal terms, active dates, and redemption criteria..."
                                      value={newRetailerDeal.desc}
                                      onChange={(e) => setNewRetailerDeal(prev => ({ ...prev, desc: e.target.value }))}
                                      rows={3}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-3 pt-4 border-t border-outline-variant/20">
                                <button
                                  onClick={() => {
                                    if (!newRetailerDeal.title || !newRetailerDeal.originalPrice || !newRetailerDeal.salePrice) {
                                      triggerToast('Campaign Title, Original Price and Sale Price are required fields.', 'error');
                                      return;
                                    }
                                    const original = parseFloat(newRetailerDeal.originalPrice) || 0;
                                    const sale = parseFloat(newRetailerDeal.salePrice) || 0;

                                    if (sale >= original) {
                                      triggerToast('Sale price must be lower than original price.', 'error');
                                      return;
                                    }

                                    const discountPercent = Math.round(((original - sale) / original) * 100);
                                    const discountStr = discountPercent > 0 ? `${discountPercent}% OFF` : 'SPECIAL';

                                    const dealId = 'rd' + Date.now();
                                    const deal = {
                                      id: dealId,
                                      title: newRetailerDeal.title,
                                      code: newRetailerDeal.code || 'SPECIAL',
                                      originalPrice: original,
                                      salePrice: sale,
                                      discount: discountStr,
                                      category: newRetailerDeal.category,
                                      state: newRetailerDeal.state,
                                      expiry: parseInt(newRetailerDeal.expiry) || 7,
                                      status: 'Active',
                                      views: 0,
                                      grabs: 0,
                                    };

                                    const globalDeal = {
                                      id: 'd' + Date.now(),
                                      brand: retailerProfile.storeName || 'OzTech Deals',
                                      logo: (retailerProfile.storeName || 'OzTech Deals').substring(0, 2).toUpperCase(),
                                      logoBg: 'bg-primary text-white font-headline',
                                      title: newRetailerDeal.title,
                                      code: newRetailerDeal.code || 'SPECIAL',
                                      originalPrice: original,
                                      salePrice: sale,
                                      discount: discountStr,
                                      expiry: parseInt(newRetailerDeal.expiry) || 7,
                                      category: newRetailerDeal.category,
                                      state: newRetailerDeal.state,
                                      image: `https://picsum.photos/seed/${Date.now()}/400/200`,
                                      description: newRetailerDeal.desc || 'A premium organic merchant deal from our partner stores.',
                                      regions: [newRetailerDeal.state],
                                      views: 0,
                                      commentsCount: 0,
                                    };

                                    setRetailerDeals(prev => [deal, ...prev]);
                                    setAllDeals(prev => [globalDeal, ...prev]);
                                    setShowAddDeal(false);
                                    setNewRetailerDeal({ title: '', code: '', originalPrice: '', salePrice: '', category: 'Tech', state: 'NSW', expiry: '7', desc: '' });
                                    triggerToast('✓ Campaign successfully published on 7deals community feed!', 'success');
                                  }}
                                  className="px-6 py-2.5 rounded-xl bg-primary hover:opacity-90 text-white font-bold text-xs cursor-pointer border-none shadow-sm"
                                >
                                  Publish Campaign
                                </button>
                                <button
                                  onClick={() => {
                                    setShowAddDeal(false);
                                    setNewRetailerDeal({ title: '', code: '', originalPrice: '', salePrice: '', category: 'Tech', state: 'NSW', expiry: '7', desc: '' });
                                  }}
                                  className="px-6 py-2.5 rounded-xl bg-surface-container hover:bg-surface-variant text-on-surface font-bold text-xs border border-outline-variant/30 cursor-pointer border-none"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Campaigns Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {retailerDeals.map(d => (
                              <div key={d.id} className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4 text-left relative overflow-hidden">
                                {/* Elegant side slash in Brand Color */}
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>

                                <div className="space-y-3 pl-2">
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-[10px] font-black uppercase tracking-wider bg-primary/10 text-primary px-2.5 py-0.5 rounded-full border border-primary/20">
                                      {d.category}
                                    </span>
                                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-sm ${d.status === 'Active' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-surface-variant text-on-surface-variant border-outline-variant/30'
                                      }`}>
                                      {d.status}
                                    </span>
                                  </div>

                                  <h4 className="font-headline font-bold text-base text-on-surface leading-snug">{d.title}</h4>

                                  {/* Pricing visual */}
                                  <div className="flex items-baseline gap-2 mt-1">
                                    <span className="text-xl font-black text-primary">${d.salePrice.toFixed(2)}</span>
                                    {d.originalPrice > 0 && (
                                      <span className="text-xs text-on-surface-variant/50 line-through">${d.originalPrice.toFixed(2)}</span>
                                    )}
                                    <span className="text-xs font-bold text-secondary ml-1 bg-secondary/10 px-2 py-0.5 rounded">
                                      {d.discount || 'Special'}
                                    </span>
                                  </div>

                                  {/* Code and Copy */}
                                  <div className="bg-surface-container border border-outline-variant/30 rounded-xl p-3 flex items-center justify-between gap-2 mt-3">
                                    <div className="text-left">
                                      <p className="text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-widest leading-none">Coupon Code</p>
                                      <p className="text-sm font-extrabold text-on-surface font-mono tracking-wide mt-1 select-all">{d.code}</p>
                                    </div>
                                    <button
                                      onClick={() => {
                                        navigator.clipboard.writeText(d.code);
                                        triggerToast('✓ Promo code copied to clipboard!', 'success');
                                      }}
                                      className="p-2 rounded-lg bg-white border border-outline-variant hover:bg-surface-container-low text-primary cursor-pointer transition-colors shadow-sm"
                                      title="Copy Coupon Code"
                                    >
                                      <span className="material-symbols-outlined text-sm">content_copy</span>
                                    </button>
                                  </div>
                                </div>

                                <div className="pt-4 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-4 pl-2 text-xs font-semibold text-on-surface-variant/80">
                                  <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                      <span className="material-symbols-outlined text-sm">visibility</span>
                                      {d.views || 0} views
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <span className="material-symbols-outlined text-sm">shopping_cart</span>
                                      {d.grabs || 0} grabs
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <span className="material-symbols-outlined text-sm">map</span>
                                      {d.state || 'National'}
                                    </span>
                                  </div>

                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => {
                                        setRetailerDeals(prev =>
                                          prev.map(deal =>
                                            deal.id === d.id
                                              ? { ...deal, status: deal.status === 'Active' ? 'Inactive' : 'Active' }
                                              : deal
                                          )
                                        );
                                        triggerToast(`Campaign status updated to ${d.status === 'Active' ? 'Inactive' : 'Active'}!`, 'success');
                                      }}
                                      className="px-3 py-1.5 rounded-lg border border-outline-variant hover:bg-surface-container text-[11px] font-bold text-on-surface cursor-pointer bg-transparent"
                                    >
                                      {d.status === 'Active' ? '⏸ Pause' : '▶ Resume'}
                                    </button>
                                    <button
                                      onClick={() => {
                                        setRetailerDeals(prev => prev.filter(deal => deal.id !== d.id));
                                        triggerToast('✓ Campaign deleted from active lists!', 'warning');
                                      }}
                                      className="px-3 py-1.5 rounded-lg border border-error/20 hover:bg-error-container/10 text-[11px] font-bold text-error cursor-pointer bg-transparent"
                                    >
                                      ✕ Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {retailerDeals.length === 0 && (
                              <div className="col-span-full py-16 bg-white border border-outline-variant/30 rounded-2xl text-center text-on-surface-variant/60 font-bold shadow-sm">
                                <p className="text-sm">No promotional campaigns created yet.</p>
                                <button
                                  onClick={() => setShowAddDeal(true)}
                                  className="mt-4 bg-primary text-white px-5 py-2 rounded-xl font-bold text-xs border-none cursor-pointer"
                                >
                                  + Launch First Campaign
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* ══════════════════════════════════════
                          TAB: FEATURED REQUESTS
                      ══════════════════════════════════════ */}
                      {retailerTab === 'featured' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">

                          {/* Top Actions Panel */}
                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                              <h3 className="font-headline font-bold text-xl text-on-surface">🚀 Spotlight Placements</h3>
                              <p className="text-xs text-on-surface-variant mt-0.5">Submit premium banner featuring requests to reach 10x buyers</p>
                            </div>
                            <button
                              onClick={() => {
                                if (retailerDeals.length === 0) {
                                  triggerToast('Create an active campaign before requesting spotlight placement!', 'warning');
                                  return;
                                }
                                setShowFeaturedRequest(true);
                              }}
                              className="px-5 py-2.5 rounded-xl bg-primary hover:opacity-90 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-opacity border-none shadow-sm"
                            >
                              <span className="material-symbols-outlined text-sm">campaign</span>
                              Request Feature Banner
                            </button>
                          </div>

                          {/* Add Featured Request Modal (Styled Sand/Green) */}
                          {showFeaturedRequest && (
                            <div className="bg-white border-2 border-primary/30 rounded-2xl p-6 shadow-sm space-y-6 animate-in slide-in-from-top duration-300">
                              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                                <h4 className="font-headline font-bold text-lg text-on-surface">📢 Request Homepage Spotlight Banner</h4>
                                <button
                                  onClick={() => {
                                    setShowFeaturedRequest(false);
                                    setFeaturedRequestForm({ dealTitle: '', message: '', budget: '', duration: '7 days' });
                                  }}
                                  className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer border-none bg-transparent"
                                >
                                  <span className="material-symbols-outlined">close</span>
                                </button>
                              </div>

                              <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="sm:col-span-2 space-y-1.5 flex flex-col">
                                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Select Promotional Deal *</label>
                                    <select
                                      value={featuredRequestForm.dealTitle || (retailerDeals[0]?.title || '')}
                                      onChange={(e) => setFeaturedRequestForm(prev => ({ ...prev, dealTitle: e.target.value }))}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                      {retailerDeals.map(d => (
                                        <option key={d.id} value={d.title}>{d.title} ({d.code})</option>
                                      ))}
                                    </select>
                                  </div>

                                  <div className="space-y-1.5 flex flex-col">
                                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Daily Promotion Budget (AUD) *</label>
                                    <input
                                      type="text"
                                      placeholder="e.g. 50"
                                      value={featuredRequestForm.budget}
                                      onChange={(e) => setFeaturedRequestForm(prev => ({ ...prev, budget: e.target.value }))}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                  </div>

                                  <div className="space-y-1.5 flex flex-col">
                                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Spotlight Duration</label>
                                    <select
                                      value={featuredRequestForm.duration}
                                      onChange={(e) => setFeaturedRequestForm(prev => ({ ...prev, duration: e.target.value }))}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2"
                                    >
                                      {['3 days', '7 days', '14 days', '30 days'].map(dur => (
                                        <option key={dur}>{dur}</option>
                                      ))}
                                    </select>
                                  </div>

                                  <div className="sm:col-span-2 space-y-1.5 flex flex-col">
                                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Pitch Message & Placement Preferences</label>
                                    <textarea
                                      placeholder="Tell our administrators why this deal should be featured, or any banner creative requests..."
                                      value={featuredRequestForm.message}
                                      onChange={(e) => setFeaturedRequestForm(prev => ({ ...prev, message: e.target.value }))}
                                      rows={3}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-3 pt-4 border-t border-outline-variant/20">
                                <button
                                  onClick={() => {
                                    if (!featuredRequestForm.budget) {
                                      triggerToast('Budget field is required for spotlight promotion.', 'error');
                                      return;
                                    }
                                    const defaultDeal = retailerDeals[0]?.title || '';
                                    const selectedTitle = featuredRequestForm.dealTitle || defaultDeal;

                                    const req = {
                                      id: 'fr' + Date.now(),
                                      dealTitle: selectedTitle,
                                      requestedDate: new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }),
                                      status: 'Pending',
                                      message: featuredRequestForm.message || 'Standard banner promotion request.',
                                      budget: featuredRequestForm.budget.startsWith('$') ? featuredRequestForm.budget : `$${featuredRequestForm.budget} AUD`,
                                      duration: featuredRequestForm.duration,
                                    };

                                    setFeaturedRequests(prev => [req, ...prev]);
                                    setShowFeaturedRequest(false);
                                    setFeaturedRequestForm({ dealTitle: '', message: '', budget: '', duration: '7 days' });
                                    triggerToast('✓ Spotlight feature request submitted for admin review!', 'success');
                                  }}
                                  className="px-6 py-2.5 rounded-xl bg-primary hover:opacity-90 text-white font-bold text-xs cursor-pointer border-none shadow-sm"
                                >
                                  Submit Request
                                </button>
                                <button
                                  onClick={() => {
                                    setShowFeaturedRequest(false);
                                    setFeaturedRequestForm({ dealTitle: '', message: '', budget: '', duration: '7 days' });
                                  }}
                                  className="px-6 py-2.5 rounded-xl bg-surface-container hover:bg-surface-variant text-on-surface font-bold text-xs border border-outline-variant/30 cursor-pointer border-none"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Spotlight Placement History */}
                          <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm space-y-4 text-left">
                            <div className="border-b border-outline-variant/20 pb-4">
                              <h4 className="font-headline font-bold text-lg text-on-surface">📈 Spotlight Submission Log</h4>
                              <p className="text-xs text-on-surface-variant mt-0.5">Track your requests for premium landing page banner advertising</p>
                            </div>

                            <div className="overflow-x-auto">
                              <table className="hidden md:table w-full text-xs font-semibold text-on-surface border-collapse text-left">
                                <thead>
                                  <tr className="border-b border-outline-variant text-[10px] uppercase text-on-surface-variant tracking-wider">
                                    <th className="py-3 px-4">Deal Title</th>
                                    <th className="py-3 px-4">Budget</th>
                                    <th className="py-3 px-4">Duration</th>
                                    <th className="py-3 px-4">Requested Date</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {featuredRequests.map(fr => (
                                    <tr key={fr.id} className="border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors">
                                      <td className="py-4 px-4 font-bold text-on-surface">{fr.dealTitle}</td>
                                      <td className="py-4 px-4 text-primary font-bold">{fr.budget}</td>
                                      <td className="py-4 px-4 font-bold">{fr.duration || '7 days'}</td>
                                      <td className="py-4 px-4 font-medium text-on-surface-variant/80">{fr.requestedDate}</td>
                                      <td className="py-4 px-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border tracking-wider shadow-sm ${fr.status === 'Approved'
                                          ? 'bg-primary/10 text-primary border-primary/20'
                                          : fr.status === 'Declined'
                                            ? 'bg-error/10 text-error border-error/20'
                                            : 'bg-surface-variant text-on-surface-variant border-outline-variant/30 animate-pulse'
                                          }`}>
                                          {fr.status === 'Approved' ? '✓ Approved' : fr.status === 'Declined' ? '✕ Declined' : '⏳ Pending'}
                                        </span>
                                      </td>
                                      <td className="py-4 px-4 text-right">
                                        <button
                                          onClick={() => {
                                            setFeaturedRequests(prev => prev.filter(r => r.id !== fr.id));
                                            triggerToast('✓ Spotlight request cancelled and removed!', 'warning');
                                          }}
                                          className="text-error font-bold hover:underline cursor-pointer border-none bg-transparent p-0"
                                        >
                                          Cancel Request
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                  {featuredRequests.length === 0 && (
                                    <tr>
                                      <td colSpan={6} className="py-8 text-center text-on-surface-variant/60 font-bold">
                                        No featured advertising requests logged.
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>

                              {/* Mobile Card Layout */}
                              <div className="block md:hidden divide-y divide-outline-variant/20 bg-white">
                                {featuredRequests.map(fr => (
                                  <div key={fr.id} className="p-4 space-y-3.5 text-left text-xs font-semibold">
                                    <div className="flex justify-between items-start gap-2">
                                      <h4 className="font-bold text-on-surface text-sm max-w-[200px]">{fr.dealTitle}</h4>
                                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase border tracking-wider shadow-sm ${fr.status === 'Approved'
                                        ? 'bg-primary/10 text-primary border-primary/20'
                                        : fr.status === 'Declined'
                                          ? 'bg-error/10 text-[#B71C1C] border-error/20'
                                          : 'bg-surface-variant text-on-surface-variant border-outline-variant/30 animate-pulse'
                                        }`}>
                                        {fr.status === 'Approved' ? '✓ Approved' : fr.status === 'Declined' ? '✕ Declined' : '⏳ Pending'}
                                      </span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 py-1 text-center font-bold text-[10px] text-slate-500">
                                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                                        <p className="text-[9px] text-slate-400 font-bold uppercase">Budget</p>
                                        <p className="text-[#047c1f] font-black text-xs mt-0.5">{fr.budget}</p>
                                      </div>
                                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                                        <p className="text-[9px] text-slate-400 font-bold uppercase">Duration</p>
                                        <p className="text-slate-800 font-black text-xs mt-0.5">{fr.duration || '7 days'}</p>
                                      </div>
                                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                                        <p className="text-[9px] text-slate-400 font-bold uppercase">Requested</p>
                                        <p className="text-slate-700 mt-0.5">{fr.requestedDate}</p>
                                      </div>
                                    </div>

                                    <div className="flex justify-end pt-1">
                                      <button
                                        onClick={() => {
                                          setFeaturedRequests(prev => prev.filter(r => r.id !== fr.id));
                                          triggerToast('✓ Spotlight request cancelled and removed!', 'warning');
                                        }}
                                        className="px-3.5 py-2 rounded-xl bg-error/10 text-error font-extrabold text-[10px] hover:bg-error hover:text-white transition-all cursor-pointer border-none"
                                      >
                                        Cancel Request
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                {featuredRequests.length === 0 && (
                                  <div className="py-8 text-center text-on-surface-variant/60 font-bold text-xs italic">
                                    No featured advertising requests logged.
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                        </div>
                      )}

                    </section>
                  </main>

                </div>
              ) : (
                <div className="py-20 text-center space-y-4 bg-white border border-[#e8e8e8] rounded-3xl max-w-lg mx-auto">
                  <p className="text-slate-500 font-bold">Please sign in to view your profile dashboard.</p>
                  <button
                    onClick={() => { setAuthTab('login'); setLoginModalOpen(true); }}
                    className="px-5 py-2.5 rounded-full bg-[#047c1f] hover:bg-[#036318] text-white font-bold text-sm shadow-sm cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              )
            )}

            {currentRoute === '#admin' && (
              currentUser?.role === 'admin' ? (
                <div className="flex font-body bg-background text-on-surface min-h-screen relative w-full text-left overflow-hidden animate-in fade-in duration-300">

                  {/* ── SIDEBAR ── */}
                  <aside className="hidden sm:flex h-screen w-64 fixed left-0 top-0 z-50 flex-col py-6 border-r border-outline-variant/20 bg-surface-container select-none">

                    {/* Logo */}
                    <div className="px-6 mb-8 flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
                      </div>
                      <div>
                        <h2 className="text-lg font-headline font-bold text-on-surface">7deals</h2>
                        <p className="text-[10px] text-on-surface-variant tracking-wider uppercase font-semibold">Admin Console</p>
                      </div>
                    </div>

                    {/* Nav items */}
                    <nav className="flex-1 space-y-1">
                      {[
                        { key: 'overview', label: 'Overview', icon: 'dashboard' },
                        { key: 'users', label: 'Partner Accounts', icon: 'store' },
                        { key: 'moderators', label: 'Moderators', icon: 'shield' },
                        { key: 'banner', label: 'Top Banner', icon: 'campaign' },
                        { key: 'featured', label: 'Featured Cards', icon: 'star' },
                        { key: 'categories', label: 'Categories', icon: 'sell' },
                        { key: 'deals', label: 'All Deals', icon: 'payments' },
                        { key: 'stock', label: 'Stock Manager', icon: 'inventory' },
                        { key: 'notifications', label: 'Notifications', icon: 'notifications' },
                      ].map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setAdminTab(tab.key)}
                          className={`w-[calc(100%-1rem)] rounded-lg mx-2 my-1 px-4 py-2.5 flex items-center gap-3 transition-transform active:scale-95 text-left font-bold text-sm cursor-pointer border-none focus:outline-none focus:ring-0 ${adminTab === tab.key
                            ? 'bg-primary text-white font-semibold shadow-sm'
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40 bg-transparent'
                            }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                          <span>{tab.label}</span>
                          {tab.key === 'users' && (
                            <span className="ml-auto bg-primary-container text-on-primary-container text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                              {adminUsers.length}
                            </span>
                          )}
                          {tab.key === 'moderators' && (
                            <span className="ml-auto bg-surface-container-high text-on-surface-variant text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                              {adminModerators.length}
                            </span>
                          )}
                        </button>
                      ))}
                    </nav>

                    {/* Footer */}
                    <div className="px-4 mt-auto mb-6 space-y-1">
                      <div className="border-t border-outline-variant/20 pt-4" />
                      <a
                        href="#home"
                        onClick={(e) => { e.preventDefault(); setCurrentRoute('#home'); }}
                        className="w-[calc(100%-1rem)] text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40 rounded-lg mx-2 my-1 px-4 py-2.5 flex items-center gap-3 transition-all duration-200 text-left font-bold text-sm cursor-pointer border-none bg-transparent decoration-none"
                      >
                        <span className="material-symbols-outlined text-[18px]">home</span>
                        <span>Back to Site</span>
                      </a>
                      <button
                        onClick={handleLogout}
                        className="w-[calc(100%-1rem)] text-error hover:bg-error/10 rounded-lg mx-2 my-1 px-4 py-2.5 flex items-center gap-3 transition-all duration-200 text-left font-bold text-sm cursor-pointer border-none bg-transparent"
                      >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        <span>Log Out</span>
                      </button>
                    </div>
                  </aside>

                  {/* Mobile Admin Navigation Sidebar Drawer (visible only on mobile) */}
                  {mobileAdminMenuOpen && (
                    <div className="fixed inset-0 z-[1100] flex sm:hidden">
                      {/* Backdrop */}
                      <div
                        onClick={() => setMobileAdminMenuOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                      />

                      {/* Drawer Content */}
                      <div className="relative flex w-full max-w-[280px] flex-col bg-surface-container py-6 px-4 shadow-2xl z-10 animate-in slide-in-from-left duration-300">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant/10">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                            </div>
                            <div>
                              <h2 className="text-base font-bold text-on-surface leading-tight">7deals</h2>
                              <p className="text-[9px] text-on-surface-variant uppercase tracking-wider font-semibold">Admin Console</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setMobileAdminMenuOpen(false)}
                            className="p-1 rounded-full text-on-surface-variant hover:bg-surface-variant/40 transition-colors border-none bg-transparent cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                          </button>
                        </div>

                        {/* Navigation links */}
                        <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
                          {[
                            { key: 'overview', label: 'Overview', icon: 'dashboard' },
                            { key: 'users', label: 'Partner Accounts', icon: 'store' },
                            { key: 'moderators', label: 'Moderators', icon: 'shield' },
                            { key: 'banner', label: 'Top Banner', icon: 'campaign' },
                            { key: 'featured', label: 'Featured Cards', icon: 'star' },
                            { key: 'categories', label: 'Categories', icon: 'sell' },
                            { key: 'deals', label: 'All Deals', icon: 'payments' },
                            { key: 'stock', label: 'Stock Manager', icon: 'inventory' },
                            { key: 'notifications', label: 'Notifications', icon: 'notifications' },
                          ].map((tab) => (
                            <button
                              key={tab.key}
                              onClick={() => {
                                setAdminTab(tab.key);
                                setMobileAdminMenuOpen(false);
                              }}
                              className={`w-full rounded-xl px-4 py-3 flex items-center justify-between transition-all active:scale-98 text-left font-bold text-sm cursor-pointer border-none ${adminTab === tab.key
                                ? 'bg-[#047c1f] text-white shadow-sm shadow-[#047c1f]/20'
                                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40 bg-transparent'
                                }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-lg leading-none">{tab.icon}</span>
                                <span>{tab.label}</span>
                              </div>
                              {tab.key === 'users' && (
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${adminTab === tab.key ? 'bg-white text-[#047c1f]' : 'bg-primary-container text-on-primary-container'}`}>
                                  {adminUsers.length}
                                </span>
                              )}
                              {tab.key === 'moderators' && (
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${adminTab === tab.key ? 'bg-white text-[#047c1f]' : 'bg-surface-container-high text-on-surface-variant'}`}>
                                  {adminModerators.length}
                                </span>
                              )}
                            </button>
                          ))}
                        </nav>

                        {/* Bottom Actions */}
                        <div className="mt-auto space-y-2 pt-4 border-t border-outline-variant/10">
                          <a
                            href="#home"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentRoute('#home');
                              setMobileAdminMenuOpen(false);
                            }}
                            className="w-full text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40 rounded-xl px-4 py-2.5 flex items-center gap-3 transition-all text-left font-bold text-sm cursor-pointer border-none bg-transparent decoration-none"
                          >
                            <span className="material-symbols-outlined text-lg leading-none">home</span>
                            <span>Back to Site</span>
                          </a>

                          <button
                            onClick={() => {
                              handleLogout();
                              setMobileAdminMenuOpen(false);
                            }}
                            className="w-full text-error hover:bg-error/10 rounded-xl px-4 py-2.5 flex items-center gap-3 transition-all text-left font-bold text-sm cursor-pointer border-none bg-transparent"
                          >
                            <span className="material-symbols-outlined text-lg leading-none">logout</span>
                            <span>Log Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <main className="w-full sm:ml-64 flex-1 min-h-screen flex flex-col bg-background overflow-y-auto pb-16 lg:pb-0">

                    {/* TopNavBar */}
                    <header className="w-full sticky top-0 z-40 bg-surface flex justify-between items-center px-3 sm:px-8 py-3 sm:py-4 border-b border-outline-variant/30 shadow-sm">
                      <div className="flex items-center gap-2 text-left">
                        {/* Hamburger menu for mobile drawer */}
                        <button
                          onClick={() => setMobileAdminMenuOpen(true)}
                          className="flex sm:hidden items-center justify-center p-1.5 text-on-surface-variant hover:bg-surface-variant/20 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[22px]">menu</span>
                        </button>
                        <div>
                          <h1 className="text-sm sm:text-xl font-headline font-bold text-primary flex items-center gap-1 sm:gap-2 truncate max-w-[150px] sm:max-w-none">
                            <span className="material-symbols-outlined text-base sm:text-2xl shrink-0">admin_panel_settings</span>
                            <span className="truncate">
                              {adminTab === 'overview' ? 'Overview' :
                                adminTab === 'users' ? 'Partners' :
                                  adminTab === 'moderators' ? 'Mods' :
                                    adminTab === 'banner' ? 'Banner' :
                                      adminTab === 'featured' ? 'Featured' :
                                        adminTab === 'categories' ? 'Categories' :
                                          adminTab === 'deals' ? 'All Deals' :
                                            adminTab === 'stock' ? 'Stock' :
                                              'Notifications'}
                            </span>
                          </h1>
                          <p className="hidden sm:block text-xs text-on-surface-variant mt-1 font-semibold">
                            7deals Admin Control Console · Active Administrator: {currentUser.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        <span className="inline-flex items-center gap-1 bg-[#fdc800] text-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full font-bold text-[9px] sm:text-[10px] uppercase tracking-wider select-none">
                          🔑 ADMIN
                        </span>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-white font-extrabold text-xs sm:text-sm flex items-center justify-center border-2 border-primary-container uppercase select-none shadow-sm">
                          {currentUser.avatar}
                        </div>
                      </div>
                    </header>

                    {/* Content canvas */}
                    <section className="p-4 sm:p-8 flex-1 space-y-6 max-w-7xl w-full mx-auto pb-24">

                      {/* 📊 OVERVIEW TAB */}
                      {adminTab === 'overview' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">

                          {/* Page Header */}
                          <div className="flex justify-between items-start sm:items-end flex-col sm:flex-row gap-4 text-left border-b border-outline-variant/10 pb-4">
                            <div>
                              <h2 className="text-xl sm:text-2xl font-headline font-bold text-on-surface">Overview Metrics</h2>
                              <p className="text-xs sm:text-sm text-on-surface-variant mt-1 font-semibold">
                                Platform-wide performance statistics and quick action console.
                              </p>
                            </div>
                            <div className="flex gap-3 w-full sm:w-auto shrink-0 select-none">
                              <div className="relative flex-1 sm:flex-initial">
                                <button
                                  ref={adminTimeframeRef}
                                  onClick={() => setOpenDropdown(openDropdown === 'adminTimeframe' ? null : 'adminTimeframe')}
                                  className="w-full sm:w-auto bg-surface-container-high px-4 py-2 rounded-lg text-sm font-semibold text-on-surface-variant flex items-center justify-between sm:justify-start gap-2 hover:bg-surface-variant transition-colors active:scale-95 cursor-pointer border-none"
                                >
                                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                                  {adminTimeframe}
                                  <span className={`material-symbols-outlined text-xs transition-transform duration-150 ${openDropdown === 'adminTimeframe' ? 'rotate-180' : ''}`}>expand_more</span>
                                </button>
                                <PortalDropdown anchorRef={adminTimeframeRef} isOpen={openDropdown === 'adminTimeframe'} alignRight>
                                  <div className="py-1">
                                    {TIMEFRAME_OPTIONS.map((opt) => (
                                      <button
                                        key={opt}
                                        onClick={() => {
                                          setAdminTimeframe(opt);
                                          setOpenDropdown(null);
                                          triggerToast(`Admin timeframe set to ${opt}`, 'info');
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-container-high rounded-md transition-colors flex items-center gap-2 border-none bg-transparent cursor-pointer font-semibold ${adminTimeframe === opt ? 'text-primary bg-primary/5' : 'text-on-surface-variant'}`}
                                      >
                                        {adminTimeframe === opt ? (
                                          <span className="material-symbols-outlined text-sm text-primary">check</span>
                                        ) : (
                                          <span className="w-4 h-4"></span>
                                        )}
                                        <span>{opt}</span>
                                      </button>
                                    ))}
                                  </div>
                                </PortalDropdown>
                              </div>
                            </div>
                          </div>

                          {/* KPI Cards Grid */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                              {
                                metricId: 'deals',
                                label: 'Marketplace Deals',
                                value: adminMetrics.deals,
                                icon: 'payments',
                                activeColor: 'border-[#047c1f] bg-[#e6f2e8]/20 ring-2 ring-[#047c1f]/20 shadow-md shadow-[#047c1f]/10',
                                iconColor: 'text-[#047c1f]',
                                hoverColor: 'hover:border-[#047c1f]/40 hover:shadow-[#047c1f]/10 hover:shadow-lg',
                                growth: '+12.4%',
                                growthColor: 'text-[#047c1f] bg-[#e6f2e8]',
                                sparkline: adminChartData.deals
                              },
                              {
                                metricId: 'retailers',
                                label: 'Active Retailers',
                                value: adminMetrics.retailers,
                                icon: 'store',
                                activeColor: 'border-[#fdc800] bg-[#fff9e6]/20 ring-2 ring-[#fdc800]/20 shadow-md shadow-[#fdc800]/10',
                                iconColor: 'text-[#fdc800]',
                                hoverColor: 'hover:border-[#fdc800]/40 hover:shadow-[#fdc800]/10 hover:shadow-lg',
                                growth: '+4.8%',
                                growthColor: 'text-amber-700 bg-[#fff9e6]',
                                sparkline: adminChartData.retailers
                              },
                              {
                                metricId: 'moderators',
                                label: 'Active Moderators',
                                value: adminMetrics.moderators,
                                icon: 'shield',
                                activeColor: 'border-[#003b80] bg-blue-50/20 ring-2 ring-[#003b80]/20 shadow-md shadow-blue-500/10',
                                iconColor: 'text-[#003b80]',
                                hoverColor: 'hover:border-[#003b80]/40 hover:shadow-blue-500/10 hover:shadow-lg',
                                growth: 'Stable',
                                growthColor: 'text-blue-700 bg-blue-50',
                                sparkline: adminChartData.moderators
                              },
                              {
                                metricId: 'spotlight',
                                label: 'Spotlight Requests',
                                value: adminMetrics.spotlight,
                                icon: 'star',
                                activeColor: 'border-[#8b5cf6] bg-purple-50/20 ring-2 ring-[#8b5cf6]/20 shadow-md shadow-purple-500/10',
                                iconColor: 'text-[#8b5cf6]',
                                hoverColor: 'hover:border-[#8b5cf6]/40 hover:shadow-purple-500/10 hover:shadow-lg',
                                growth: '+8.3%',
                                growthColor: 'text-purple-700 bg-purple-50',
                                sparkline: adminChartData.spotlights
                              },
                            ].map(stat => {
                              const isActive = activeMetric === stat.metricId;

                              // Compute normalized sparkline coordinates
                              const minVal = Math.min(...stat.sparkline);
                              const maxVal = Math.max(...stat.sparkline, minVal + 1);
                              const range = maxVal - minVal;
                              const w = 70;
                              const h = 28;
                              const points = stat.sparkline.map((v, i) => {
                                const x = (i / (stat.sparkline.length - 1)) * (w - 4) + 2;
                                const y = h - ((v - minVal) / range) * (h - 4) - 2;
                                return `${x.toFixed(1)},${y.toFixed(1)}`;
                              });
                              const pathD = `M ${points.join(' L ')}`;
                              const areaD = `${pathD} L ${(w - 2).toFixed(1)},${h.toFixed(1)} L 2,${h.toFixed(1)} Z`;

                              return (
                                <div
                                  key={stat.label}
                                  onClick={() => {
                                    setActiveMetric(stat.metricId);
                                    triggerToast(`Switched chart view to ${stat.label}`, 'info');
                                  }}
                                  className={`relative bg-surface-container-low p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 text-left cursor-pointer select-none overflow-hidden ${isActive ? stat.activeColor : `border-outline-variant/30 ${stat.hoverColor}`
                                    }`}
                                >
                                  {/* Sparkline background decoration */}
                                  <div className="absolute bottom-2 right-2 opacity-60 pointer-events-none select-none">
                                    <svg width={w} height={h} className="overflow-visible">
                                      <path d={areaD} fill={isActive ? 'currentColor' : 'rgba(0,0,0,0.02)'} className={`${isActive ? stat.iconColor : 'text-slate-200'} opacity-10`} />
                                      <path d={pathD} fill="none" stroke={isActive ? 'currentColor' : '#cbd5e1'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={isActive ? stat.iconColor : ''} />
                                    </svg>
                                  </div>

                                  <div className="flex justify-between items-center mb-1">
                                    <h3 className="text-on-surface-variant text-[10px] font-extrabold uppercase tracking-wider">{stat.label}</h3>
                                    <div className="p-1 bg-surface-container-high rounded-lg text-on-surface-variant transition-colors">
                                      <span className={`material-symbols-outlined text-[15px] transition-colors ${isActive ? stat.iconColor : 'text-on-surface-variant group-hover:text-primary'
                                        }`}>{stat.icon}</span>
                                    </div>
                                  </div>

                                  <div className="flex items-baseline gap-2 mt-1">
                                    <p className="text-xl font-extrabold text-on-surface">
                                      {stat.value}
                                    </p>
                                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full select-none ${stat.growthColor}`}>
                                      {stat.growth}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* 📈 Platform Growth Trends Dynamic SVG Graph */}
                          {(() => {
                            const pointsCount = adminChartData.labels.length;
                            const svgWidth = 600;
                            const svgHeight = 220;
                            const paddingLeft = 45;
                            const paddingRight = 20;
                            const paddingTop = 25;
                            const paddingBottom = 35;

                            // Mobile chart config dimensions
                            const mSvgWidth = 320;
                            const mSvgHeight = 150;
                            const mPaddingLeft = 25;
                            const mPaddingRight = 10;
                            const mPaddingTop = 15;
                            const mPaddingBottom = 20;
                            const mChartWidth = mSvgWidth - mPaddingLeft - mPaddingRight;
                            const mChartHeight = mSvgHeight - mPaddingTop - mPaddingBottom;
                            const mXStep = mChartWidth / (pointsCount - 1 || 1);

                            const chartWidth = svgWidth - paddingLeft - paddingRight;
                            const chartHeight = svgHeight - paddingTop - paddingBottom;

                            const xStep = chartWidth / (pointsCount - 1 || 1);

                            // Select color theme and data series based on activeMetric
                            let metricColor = '#047c1f';
                            let metricGrad = 'grad-deals';
                            let metricLabel = 'Marketplace Deals';
                            let activeData = adminChartData.deals;
                            let rawMax = Math.max(...adminChartData.deals, 1);

                            switch (activeMetric) {
                              case 'retailers':
                                metricColor = '#fdc800';
                                metricGrad = 'grad-retailers';
                                metricLabel = 'Active Retailers';
                                activeData = adminChartData.retailers;
                                rawMax = Math.max(...adminChartData.retailers, 1);
                                break;
                              case 'moderators':
                                metricColor = '#003b80';
                                metricGrad = 'grad-mods';
                                metricLabel = 'Active Moderators';
                                activeData = adminChartData.moderators;
                                rawMax = Math.max(...adminChartData.moderators, 1);
                                break;
                              case 'spotlight':
                                metricColor = '#8b5cf6';
                                metricGrad = 'grad-spotlights';
                                metricLabel = 'Spotlight Requests';
                                activeData = adminChartData.spotlights;
                                rawMax = Math.max(...adminChartData.spotlights, 1);
                                break;
                              case 'deals':
                              default:
                                metricColor = '#047c1f';
                                metricGrad = 'grad-deals';
                                metricLabel = 'Marketplace Deals';
                                activeData = adminChartData.deals;
                                rawMax = Math.max(...adminChartData.deals, 1);
                                break;
                            }

                            const chartMax = Math.max(rawMax, 4);
                            let activeGlowFilter = 'glow-deals';
                            if (activeMetric === 'retailers') activeGlowFilter = 'glow-retailers';
                            if (activeMetric === 'moderators') activeGlowFilter = 'glow-mods';
                            if (activeMetric === 'spotlight') activeGlowFilter = 'glow-spotlights';

                            // Compute coordinates
                            const coords = activeData.map((v, i) => ({
                              x: paddingLeft + i * xStep,
                              y: paddingTop + chartHeight - (v / chartMax) * chartHeight,
                              v
                            }));

                            // Compute mobile coordinates
                            const mCoords = activeData.map((v, i) => ({
                              x: mPaddingLeft + i * mXStep,
                              y: mPaddingTop + mChartHeight - (v / chartMax) * mChartHeight,
                              v
                            }));

                            // SVG line generation
                            const makePath = (coordsList) => coordsList.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ');
                            const makeAreaPath = (coordsList) => {
                              if (coordsList.length === 0) return '';
                              const linePath = makePath(coordsList);
                              const isMobile = coordsList === mCoords;
                              const bottomLimit = isMobile ? (mPaddingTop + mChartHeight) : (paddingTop + chartHeight);
                              return `${linePath} L ${coordsList[coordsList.length - 1].x.toFixed(1)} ${bottomLimit.toFixed(1)} L ${coordsList[0].x.toFixed(1)} ${bottomLimit.toFixed(1)} Z`;
                            };

                            const linePath = makePath(coords);
                            const areaPath = makeAreaPath(coords);

                            const mLinePath = makePath(mCoords);
                            const mAreaPath = makeAreaPath(mCoords);

                            // Custom generator for rounded top bar chart paths
                            const makeBarPath = (x, y, w, r, bottomY) => {
                              const h = bottomY - y;
                              if (h <= 0) return '';
                              const rad = Math.min(r, h, w / 2);
                              return `
                                M ${(x - w / 2).toFixed(1)} ${bottomY.toFixed(1)}
                                L ${(x - w / 2).toFixed(1)} ${(y + rad).toFixed(1)}
                                A ${rad.toFixed(1)} ${rad.toFixed(1)} 0 0 1 ${(x - w / 2 + rad).toFixed(1)} ${y.toFixed(1)}
                                L ${(x + w / 2 - rad).toFixed(1)} ${y.toFixed(1)}
                                A ${rad.toFixed(1)} ${rad.toFixed(1)} 0 0 1 ${(x + w / 2).toFixed(1)} ${(y + rad).toFixed(1)}
                                L ${(x + w / 2).toFixed(1)} ${bottomY.toFixed(1)}
                                Z
                              `;
                            };

                            return (
                              <div className="bg-white rounded-xl border border-outline-variant/30 p-5 custom-shadow space-y-4 text-left">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h3 className="text-sm font-headline font-bold text-on-surface">📊 Platform Activity: {metricLabel}</h3>
                                      <span className="text-[10px] text-slate-400 font-medium tracking-wide">(Click KPI Cards above to switch metrics)</span>
                                    </div>
                                    <p className="text-[11px] text-on-surface-variant font-medium">Real-time statistics trend for {metricLabel} over {adminTimeframe}</p>
                                  </div>


                                </div>

                                <div className="relative w-full overflow-hidden">
                                  {/* 🖥️ DESKTOP SVG CHART */}
                                  <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="hidden sm:block w-full h-auto overflow-visible select-none">
                                    {/* Grid Backdrop Pattern */}
                                    <rect x={paddingLeft} y={paddingTop} width={chartWidth} height={chartHeight} fill="url(#dotGrid)" rx="4" />

                                    {/* Grid Lines */}
                                    {[0, 25, 50, 75, 100].map((pct) => {
                                      const y = paddingTop + chartHeight - (pct / 100) * chartHeight;
                                      const absoluteVal = Math.round((chartMax * pct) / 100);
                                      return (
                                        <g key={pct}>
                                          <line
                                            x1={paddingLeft}
                                            y1={y}
                                            x2={svgWidth - paddingRight}
                                            y2={y}
                                            stroke="rgba(0, 0, 0, 0.05)"
                                            strokeDasharray="4,4"
                                            strokeWidth="1"
                                          />
                                          <text
                                            x={paddingLeft - 8}
                                            y={y + 3}
                                            textAnchor="end"
                                            className="text-[9px] font-bold fill-on-surface-variant/60"
                                          >
                                            {absoluteVal}
                                          </text>
                                        </g>
                                      );
                                    })}

                                    {/* Area path */}
                                    {areaPath && (
                                      <path
                                        d={areaPath}
                                        fill={`url(#${metricGrad})`}
                                        className="transition-all duration-300 animate-in fade-in"
                                      />
                                    )}
                                    {/* Line path */}
                                    {linePath && (
                                      <path
                                        d={linePath}
                                        fill="none"
                                        stroke={metricColor}
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        filter={`url(#${activeGlowFilter})`}
                                        className="transition-all duration-300"
                                      />
                                    )}
                                    {/* Dots */}
                                    {coords.map((c, i) => {
                                      if (pointsCount > 15 && i % 4 !== 0 && i !== pointsCount - 1) return null;
                                      return (
                                        <circle
                                          key={`d-${i}`}
                                          cx={c.x}
                                          cy={c.y}
                                          r={pointsCount > 15 ? 2.5 : 4}
                                          fill={metricColor}
                                          stroke="white"
                                          strokeWidth="2"
                                          className="transition-all duration-300 cursor-pointer"
                                        />
                                      );
                                    })}

                                    {/* Overlay Data Labels above points/bars */}
                                    {coords.map((c, i) => {
                                      if (pointsCount > 15 && i % 4 !== 0 && i !== pointsCount - 1) return null;
                                      return (
                                        <text
                                          key={`val-${i}`}
                                          x={c.x}
                                          y={c.y - 8}
                                          textAnchor="middle"
                                          className="text-[10px] font-black transition-all duration-300"
                                          style={{ fill: metricColor }}
                                        >
                                          {c.v}
                                        </text>
                                      );
                                    })}

                                    {/* X-axis Labels */}
                                    {adminChartData.labels.map((label, idx) => {
                                      const x = paddingLeft + idx * xStep;
                                      return (
                                        <text
                                          key={idx}
                                          x={x}
                                          y={svgHeight - 10}
                                          textAnchor="middle"
                                          className={`font-extrabold fill-slate-400 transition-all duration-300 ${pointsCount > 15 ? 'text-[8px]' : 'text-[9.5px]'}`}
                                        >
                                          {label}
                                        </text>
                                      );
                                    })}

                                    {/* Defs for gradients, patterns, and filters */}
                                    <defs>
                                      <pattern id="dotGrid" width="16" height="16" patternUnits="userSpaceOnUse">
                                        <circle cx="2" cy="2" r="1" fill="rgba(0, 0, 0, 0.04)" />
                                      </pattern>
                                      <filter id="glow-deals" x="-20%" y="-20%" width="140%" height="140%">
                                        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#047c1f" floodOpacity="0.22" />
                                      </filter>
                                      <filter id="glow-retailers" x="-20%" y="-20%" width="140%" height="140%">
                                        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#fdc800" floodOpacity="0.22" />
                                      </filter>
                                      <filter id="glow-mods" x="-20%" y="-20%" width="140%" height="140%">
                                        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#003b80" floodOpacity="0.22" />
                                      </filter>
                                      <filter id="glow-spotlights" x="-20%" y="-20%" width="140%" height="140%">
                                        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#8b5cf6" floodOpacity="0.22" />
                                      </filter>
                                      <linearGradient id="grad-deals" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#047c1f" stopOpacity="0.32" />
                                        <stop offset="100%" stopColor="#047c1f" stopOpacity="0.01" />
                                      </linearGradient>
                                      <linearGradient id="grad-retailers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#fdc800" stopOpacity="0.32" />
                                        <stop offset="100%" stopColor="#fdc800" stopOpacity="0.01" />
                                      </linearGradient>
                                      <linearGradient id="grad-mods" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#003b80" stopOpacity="0.32" />
                                        <stop offset="100%" stopColor="#003b80" stopOpacity="0.01" />
                                      </linearGradient>
                                      <linearGradient id="grad-spotlights" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.32" />
                                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.01" />
                                      </linearGradient>
                                    </defs>
                                  </svg>

                                  {/* 📱 MOBILE SVG CHART (Optimized for 320px–430px viewports) */}
                                  <svg viewBox={`0 0 ${mSvgWidth} ${mSvgHeight}`} className="block sm:hidden w-full h-auto overflow-visible select-none">
                                    {/* Grid Backdrop Pattern */}
                                    <rect x={mPaddingLeft} y={mPaddingTop} width={mChartWidth} height={mChartHeight} fill="url(#dotGridMobile)" rx="3" />

                                    {/* Simplified Horizontal Grid Lines (No Labels to fit screen) */}
                                    {[0, 33, 66, 100].map((pct) => {
                                      const y = mPaddingTop + mChartHeight - (pct / 100) * mChartHeight;
                                      return (
                                        <line
                                          key={`m-grid-${pct}`}
                                          x1={mPaddingLeft}
                                          y1={y}
                                          x2={mSvgWidth - mPaddingRight}
                                          y2={y}
                                          stroke="rgba(0, 0, 0, 0.04)"
                                          strokeDasharray="2,2"
                                          strokeWidth="0.75"
                                        />
                                      );
                                    })}

                                    {/* Area path */}
                                    {mAreaPath && (
                                      <path
                                        d={mAreaPath}
                                        fill={`url(#${metricGrad}Mobile)`}
                                        className="transition-all duration-300 animate-in fade-in"
                                      />
                                    )}
                                    {/* Line path */}
                                    {mLinePath && (
                                      <path
                                        d={mLinePath}
                                        fill="none"
                                        stroke={metricColor}
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        filter={`url(#${activeGlowFilter}Mobile)`}
                                        className="transition-all duration-300"
                                      />
                                    )}
                                    {/* Dots */}
                                    {mCoords.map((c, i) => {
                                      if (pointsCount > 15 && i % 4 !== 0 && i !== pointsCount - 1) return null;
                                      return (
                                        <circle
                                          key={`md-${i}`}
                                          cx={c.x}
                                          cy={c.y}
                                          r={pointsCount > 15 ? 1.5 : 2.5}
                                          fill={metricColor}
                                          stroke="white"
                                          strokeWidth="1.5"
                                          className="transition-all duration-300"
                                        />
                                      );
                                    })}

                                    {/* Scaled Value Labels */}
                                    {mCoords.map((c, i) => {
                                      if (pointsCount > 15 && i % 4 !== 0 && i !== pointsCount - 1) return null;
                                      return (
                                        <text
                                          key={`mval-${i}`}
                                          x={c.x}
                                          y={c.y - 5}
                                          textAnchor="middle"
                                          className="text-[8px] font-black transition-all duration-300"
                                          style={{ fill: metricColor }}
                                        >
                                          {c.v}
                                        </text>
                                      );
                                    })}

                                    {/* X-axis Labels (Scaled & centered) */}
                                    {adminChartData.labels.map((label, idx) => {
                                      if (pointsCount > 15 && idx % 2 !== 0 && idx !== pointsCount - 1) return null;
                                      const x = mPaddingLeft + idx * mXStep;
                                      return (
                                        <text
                                          key={`mlbl-${idx}`}
                                          x={x}
                                          y={mSvgHeight - 6}
                                          textAnchor="middle"
                                          className="text-[8px] font-bold fill-slate-400"
                                        >
                                          {label}
                                        </text>
                                      );
                                    })}

                                    {/* Defs for gradients, patterns, and filters */}
                                    <defs>
                                      <pattern id="dotGridMobile" width="10" height="10" patternUnits="userSpaceOnUse">
                                        <circle cx="1.5" cy="1.5" r="0.75" fill="rgba(0, 0, 0, 0.03)" />
                                      </pattern>
                                      <filter id="glow-dealsMobile" x="-20%" y="-20%" width="140%" height="140%">
                                        <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="#047c1f" floodOpacity="0.18" />
                                      </filter>
                                      <filter id="glow-retailersMobile" x="-20%" y="-20%" width="140%" height="140%">
                                        <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="#fdc800" floodOpacity="0.18" />
                                      </filter>
                                      <filter id="glow-modsMobile" x="-20%" y="-20%" width="140%" height="140%">
                                        <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="#003b80" floodOpacity="0.18" />
                                      </filter>
                                      <filter id="glow-spotlightsMobile" x="-20%" y="-20%" width="140%" height="140%">
                                        <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="#8b5cf6" floodOpacity="0.18" />
                                      </filter>
                                      <linearGradient id="grad-dealsMobile" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#047c1f" stopOpacity="0.25" />
                                        <stop offset="100%" stopColor="#047c1f" stopOpacity="0.01" />
                                      </linearGradient>
                                      <linearGradient id="grad-retailersMobile" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#fdc800" stopOpacity="0.25" />
                                        <stop offset="100%" stopColor="#fdc800" stopOpacity="0.01" />
                                      </linearGradient>
                                      <linearGradient id="grad-modsMobile" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#003b80" stopOpacity="0.25" />
                                        <stop offset="100%" stopColor="#003b80" stopOpacity="0.01" />
                                      </linearGradient>
                                      <linearGradient id="grad-spotlightsMobile" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.01" />
                                      </linearGradient>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            );
                          })()}
                          {/* Quick Actions Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                              { label: 'Add Partner', icon: 'store', action: () => { setAdminTab('users'); setShowAddUser(true); } },
                              { label: 'Add Moderator', icon: 'shield', action: () => { setAdminTab('moderators'); setShowAddModerator(true); } },
                              { label: 'Publish Banners', icon: 'campaign', action: () => { setAdminTab('banner'); setShowAddBanner(true); } },
                              { label: 'Feature Placements', icon: 'star', action: () => setAdminTab('featured') },
                              { label: 'Global Notifications', icon: 'notifications', action: () => setAdminTab('notifications') },
                              { label: 'Add Category', icon: 'sell', action: () => { setAdminTab('categories'); setShowAddCategory(true); } },
                            ].map(action => (
                              <button
                                key={action.label}
                                onClick={action.action}
                                className="flex items-center gap-3 p-4 rounded-xl border border-outline-variant/30 bg-surface-container-low hover:bg-surface-container-high hover:border-outline-variant/60 text-on-surface text-sm font-bold cursor-pointer transition-colors text-left"
                              >
                                <span className="material-symbols-outlined text-primary text-[22px]">{action.icon}</span>
                                <span>{action.label}</span>
                              </button>
                            ))}
                          </div>

                          {/* Dual Columns for Approvals & Placements */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* Pending Approvals */}
                            <div className="bg-white rounded-xl border border-outline-variant/30 p-6 custom-shadow space-y-4">
                              <h3 className="font-headline font-bold text-base text-on-surface border-b border-outline-variant/10 pb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">schedule</span> Pending Partner Registrations
                              </h3>
                              <div className="space-y-3">
                                {adminUsers.filter(u => u.status === 'Pending').map(u => (
                                  <div key={u.id} className="flex items-center justify-between p-3.5 bg-surface-container-low border border-outline-variant/20 rounded-xl">
                                    <div className="flex items-center gap-3">
                                      <div className={`w-9 h-9 rounded-full ${u.color} text-white font-extrabold text-xs flex items-center justify-center select-none uppercase`}>
                                        {u.avatar}
                                      </div>
                                      <div>
                                        <p className="text-xs font-bold text-on-surface leading-snug">{u.store}</p>
                                        <p className="text-[10px] text-on-surface-variant font-semibold leading-none mt-1">{u.email}</p>
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => {
                                          setAdminUsers(prev => prev.map(x => x.id === u.id ? { ...x, status: 'Active', verified: true } : x));
                                          triggerToast(`✓ Partner ${u.store} has been approved!`, 'success');
                                        }}
                                        className="px-3 py-1.5 rounded-lg bg-primary hover:opacity-90 text-white text-[11px] font-bold cursor-pointer border-none shadow-sm transition-opacity"
                                      >
                                        Approve
                                      </button>
                                      <button
                                        onClick={() => {
                                          setAdminUsers(prev => prev.map(x => x.id === u.id ? { ...x, status: 'Rejected' } : x));
                                          triggerToast(`Registration for ${u.store} rejected.`, 'warning');
                                        }}
                                        className="px-3 py-1.5 rounded-lg bg-error hover:opacity-90 text-white text-[11px] font-bold cursor-pointer border-none shadow-sm transition-opacity"
                                      >
                                        Reject
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                {adminUsers.filter(u => u.status === 'Pending').length === 0 && (
                                  <p className="text-xs text-on-surface-variant/70 font-semibold text-center py-6">
                                    ✓ No partner accounts awaiting approval.
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Featured Requests Approve Panel */}
                            <div className="bg-white rounded-xl border border-outline-variant/30 p-6 custom-shadow space-y-4">
                              <h3 className="font-headline font-bold text-base text-on-surface border-b border-outline-variant/10 pb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">star</span> Spotlight Feature Placements
                              </h3>
                              <div className="space-y-3">
                                {featuredRequests.filter(r => r.status === 'Pending').map(req => (
                                  <div key={req.id} className="flex items-center justify-between p-3.5 bg-surface-container-low border border-outline-variant/20 rounded-xl">
                                    <div className="min-w-0 flex-1 text-left">
                                      <p className="text-xs font-bold text-on-surface truncate leading-snug">{req.dealTitle}</p>
                                      <p className="text-[10px] text-on-surface-variant font-semibold mt-1">
                                        Budget: <span className="text-primary font-extrabold">{req.budget}</span> · Posted: {req.requestedDate}
                                      </p>
                                    </div>
                                    <div className="flex gap-2 ml-3 shrink-0">
                                      <button
                                        onClick={() => {
                                          setFeaturedRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: 'Approved' } : r));
                                          triggerToast('✓ Featured spotlight voucher request approved!', 'success');
                                        }}
                                        className="px-3 py-1.5 rounded-lg bg-primary hover:opacity-90 text-white text-[11px] font-bold cursor-pointer border-none shadow-sm transition-opacity"
                                      >
                                        Approve
                                      </button>
                                      <button
                                        onClick={() => {
                                          setFeaturedRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: 'Declined' } : r));
                                          triggerToast('Featured banner request declined.', 'warning');
                                        }}
                                        className="px-3 py-1.5 rounded-lg bg-error hover:opacity-90 text-white text-[11px] font-bold cursor-pointer border-none shadow-sm transition-opacity"
                                      >
                                        Decline
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                {featuredRequests.filter(r => r.status === 'Pending').length === 0 && (
                                  <p className="text-xs text-on-surface-variant/70 font-semibold text-center py-6">
                                    ✓ No banner promotion requests pending.
                                  </p>
                                )}
                              </div>
                            </div>

                          </div>
                        </div>
                      )}

                      {/* 🏪 CONSUMER ACCOUNTS TAB */}
                      {adminTab === 'users' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">

                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                              <h3 className="font-headline font-bold text-xl text-on-surface">Consumer & Retailer Accounts</h3>
                              <p className="text-xs text-on-surface-variant font-semibold mt-1">{adminUsers.length} verified organic marketplaces configured</p>
                            </div>
                            <button
                              onClick={() => setShowAddUser(true)}
                              className="px-5 py-2.5 rounded-xl bg-primary hover:opacity-90 text-white font-bold text-xs flex items-center gap-2 cursor-pointer border-none shadow-sm transition-opacity"
                            >
                              <span className="material-symbols-outlined text-sm">add</span> Add Partner Store
                            </button>
                          </div>

                          {/* Add User Modal */}
                          {showAddUser && (
                            <div className="bg-white border border-outline-variant/30 rounded-xl p-6 custom-shadow space-y-4 animate-in slide-in-from-top duration-200 text-left">
                              <div className="flex items-center justify-between border-b border-outline-variant/10 pb-3">
                                <h4 className="font-headline font-bold text-base text-on-surface flex items-center gap-2">
                                  <span className="material-symbols-outlined text-primary">add_business</span> Create Partner Store Account
                                </h4>
                                <button
                                  onClick={() => setShowAddUser(false)}
                                  className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant cursor-pointer border-none bg-transparent"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                  { label: 'Full Owner Name *', field: 'name', placeholder: 'e.g. Matilda Watson' },
                                  { label: 'Email Address *', field: 'email', placeholder: 'store@oztech.com.au' },
                                  { label: 'Marketplace Store Name *', field: 'store', placeholder: 'e.g. OzTech Warehouse' },
                                  { label: 'HQ Location', field: 'location', placeholder: 'Sydney, NSW' },
                                ].map(({ label, field, placeholder }) => (
                                  <div key={field} className="space-y-1">
                                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">{label}</label>
                                    <input
                                      type="text"
                                      placeholder={placeholder}
                                      value={newAdminUser[field]}
                                      onChange={e => setNewAdminUser(prev => ({ ...prev, [field]: e.target.value }))}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/40"
                                    />
                                  </div>
                                ))}
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">Sector Category</label>
                                  <select
                                    value={newAdminUser.category}
                                    onChange={e => setNewAdminUser(prev => ({ ...prev, category: e.target.value }))}
                                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 text-on-surface"
                                  >
                                    {CATEGORY_NAMES.map(c => (
                                      <option key={c}>{c}</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">Verification Status</label>
                                  <select
                                    value={newAdminUser.status}
                                    onChange={e => setNewAdminUser(prev => ({ ...prev, status: e.target.value }))}
                                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 text-on-surface"
                                  >
                                    {['Active', 'Pending', 'Suspended'].map(s => (
                                      <option key={s}>{s}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className="flex gap-3 pt-4 border-t border-outline-variant/10 justify-end">
                                <button
                                  onClick={() => {
                                    if (!newAdminUser.name || !newAdminUser.email || !newAdminUser.store) {
                                      triggerToast('Name, Email, and Store name fields are required.', 'error');
                                      return;
                                    }
                                    const initials = newAdminUser.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
                                    const userObj = {
                                      id: 'au' + Date.now(),
                                      ...newAdminUser,
                                      avatar: initials || 'ST',
                                      color: 'bg-[#047c1f]/80',
                                      joined: new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }),
                                      dealsCount: 0,
                                      verified: newAdminUser.status === 'Active',
                                      role: 'consumer',
                                    };
                                    setAdminUsers(prev => [userObj, ...prev]);
                                    setShowAddUser(false);
                                    setNewAdminUser({ name: '', email: '', store: '', category: 'Tech', location: 'Sydney, NSW', status: 'Pending' });
                                    triggerToast('✓ Partner account listed successfully!', 'success');
                                  }}
                                  className="px-5 py-2.5 rounded-xl bg-primary hover:opacity-90 text-white font-bold text-xs cursor-pointer border-none shadow-sm transition-opacity"
                                >
                                  Save Account
                                </button>
                                <button
                                  onClick={() => setShowAddUser(false)}
                                  className="px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-variant text-on-surface font-bold text-xs cursor-pointer border border-outline-variant/30 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Users Table Grid */}
                          <div className="bg-white rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden custom-shadow">
                            <div className="overflow-x-auto">
                              <table className="hidden md:table w-full text-xs text-left border-collapse">
                                <thead>
                                  <tr className="bg-surface-container-low border-b border-outline-variant/30 text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
                                    {['Store Name', 'Owner Details', 'Email', 'Market Sector', 'Location', 'Campaigns', 'Status', 'Actions'].map(h => (
                                      <th key={h} className="px-4 py-3 font-black text-[10px] text-on-surface-variant uppercase tracking-wider">{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/20 font-semibold text-on-surface-variant">
                                  {adminUsers.map(u => (
                                    <tr key={u.id} className="hover:bg-surface-container-low/50 transition-colors">
                                      <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-3">
                                          <div className={`w-8 h-8 rounded-full ${u.color || 'bg-slate-900'} text-white font-extrabold text-[10px] flex items-center justify-center shrink-0`}>
                                            {u.avatar}
                                          </div>
                                          <div>
                                            <p className="font-bold text-on-surface leading-snug">{u.store}</p>
                                            <p className="text-[9px] text-primary font-bold tracking-wide uppercase mt-0.5">{u.verified ? '✓ Verified Partner' : '⏳ Review Pending'}</p>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="px-4 py-3.5 text-on-surface">{u.name}</td>
                                      <td className="px-4 py-3.5 text-on-surface-variant font-mono text-[11px]">{u.email}</td>
                                      <td className="px-4 py-3.5">
                                        <span className="bg-surface-container text-on-surface-variant text-[9px] font-black px-2.5 py-1 rounded-lg border border-outline-variant/20 uppercase tracking-wide">
                                          {u.category}
                                        </span>
                                      </td>
                                      <td className="px-4 py-3.5 text-on-surface-variant text-[11px]">{u.location}</td>
                                      <td className="px-4 py-3.5 font-bold text-primary text-center">{u.dealsCount || 0} deals</td>
                                      <td className="px-4 py-3.5">
                                        <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full border tracking-wide uppercase ${u.status === 'Active' ? 'bg-primary/10 text-primary border-primary/20' :
                                          u.status === 'Pending' ? 'bg-amber-600/10 text-amber-600 border-amber-600/20' :
                                            'bg-error/10 text-error border-error/20'
                                          }`}>
                                          {u.status}
                                        </span>
                                      </td>
                                      <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-3 text-xs">
                                          {u.status === 'Pending' && (
                                            <button
                                              onClick={() => {
                                                setAdminUsers(prev => prev.map(x => x.id === u.id ? { ...x, status: 'Active', verified: true } : x));
                                                triggerToast(`✓ Registered partner ${u.store} approved!`, 'success');
                                              }}
                                              className="text-primary font-black hover:underline cursor-pointer border-none bg-transparent p-0"
                                            >
                                              Approve
                                            </button>
                                          )}
                                          <button
                                            onClick={() => {
                                              setAdminUsers(prev => prev.map(x => x.id === u.id ? { ...x, status: x.status === 'Active' ? 'Suspended' : 'Active' } : x));
                                              triggerToast(`Partner account status set to ${u.status === 'Active' ? 'Suspended' : 'Active'}`, 'info');
                                            }}
                                            className="text-on-surface-variant hover:text-on-surface font-bold hover:underline cursor-pointer border-none bg-transparent p-0"
                                          >
                                            {u.status === 'Active' ? 'Suspend' : 'Activate'}
                                          </button>
                                          <button
                                            onClick={() => {
                                              setAdminUsers(prev => prev.filter(x => x.id !== u.id));
                                              triggerToast(`Merchant account ${u.store} removed!`, 'warning');
                                            }}
                                            className="text-error hover:opacity-80 font-black hover:underline cursor-pointer border-none bg-transparent p-0"
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>

                              {/* Mobile Card Layout */}
                              <div className="block md:hidden divide-y divide-outline-variant/20 bg-white">
                                {adminUsers.map(u => (
                                  <div key={u.id} className="p-4 space-y-3.5 text-left text-xs font-semibold">
                                    <div className="flex justify-between items-start gap-2">
                                      <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-full ${u.color || 'bg-slate-900'} text-white font-extrabold text-[11px] flex items-center justify-center shrink-0`}>
                                          {u.avatar}
                                        </div>
                                        <div>
                                          <p className="font-bold text-on-surface text-sm leading-snug">{u.store}</p>
                                          <p className="text-[9px] text-primary font-bold tracking-wide uppercase mt-0.5">{u.verified ? '✓ Verified Partner' : '⏳ Review Pending'}</p>
                                        </div>
                                      </div>

                                      <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full border tracking-wide uppercase ${u.status === 'Active' ? 'bg-primary/10 text-primary border-primary/20' :
                                        u.status === 'Pending' ? 'bg-amber-600/10 text-amber-600 border-amber-600/20' :
                                          'bg-error/10 text-error border-error/20'
                                        }`}>
                                        {u.status}
                                      </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-1 text-slate-600">
                                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col justify-between">
                                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Owner Details</span>
                                        <p className="text-slate-800 text-xs font-bold mt-0.5">{u.name}</p>
                                        <p className="text-slate-550 font-mono text-[10px] truncate mt-0.5">{u.email}</p>
                                      </div>

                                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col justify-between">
                                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Market / Location</span>
                                        <p className="text-slate-850 font-bold text-xs mt-0.5 uppercase tracking-wide">{u.category}</p>
                                        <p className="text-slate-500 text-[10px] mt-0.5">{u.location}</p>
                                      </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-slate-100/50 text-xs">
                                      <span className="text-xs font-bold text-primary">{u.dealsCount || 0} deals active</span>

                                      <div className="flex items-center gap-3">
                                        {u.status === 'Pending' && (
                                          <button
                                            onClick={() => {
                                              setAdminUsers(prev => prev.map(x => x.id === u.id ? { ...x, status: 'Active', verified: true } : x));
                                              triggerToast(`✓ Registered partner ${u.store} approved!`, 'success');
                                            }}
                                            className="text-primary font-black hover:underline cursor-pointer border-none bg-transparent p-0"
                                          >
                                            Approve
                                          </button>
                                        )}
                                        <button
                                          onClick={() => {
                                            setAdminUsers(prev => prev.map(x => x.id === u.id ? { ...x, status: x.status === 'Active' ? 'Suspended' : 'Active' } : x));
                                            triggerToast(`Partner account status set to ${u.status === 'Active' ? 'Suspended' : 'Active'}`, 'info');
                                          }}
                                          className="text-on-surface-variant hover:text-on-surface font-bold hover:underline cursor-pointer border-none bg-transparent p-0"
                                        >
                                          {u.status === 'Active' ? 'Suspend' : 'Activate'}
                                        </button>
                                        <button
                                          onClick={() => {
                                            setAdminUsers(prev => prev.filter(x => x.id !== u.id));
                                            triggerToast(`Merchant account ${u.store} removed!`, 'warning');
                                          }}
                                          className="text-error hover:opacity-85 font-black hover:underline cursor-pointer border-none bg-transparent p-0"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                        </div>
                      )}

                      {/* 🛡️ MODERATORS TAB */}
                      {adminTab === 'moderators' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">

                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                              <h3 className="font-headline font-bold text-xl text-on-surface">Community Moderators</h3>
                              <p className="text-xs text-on-surface-variant font-semibold mt-1">{adminModerators.length} active moderators guarding platform spam</p>
                            </div>
                            <button
                              onClick={() => setShowAddModerator(true)}
                              className="px-5 py-2.5 rounded-xl bg-primary hover:opacity-90 text-white font-bold text-xs flex items-center gap-2 cursor-pointer border-none shadow-sm transition-opacity"
                            >
                              <span className="material-symbols-outlined text-sm">add</span> Add Platform Mod
                            </button>
                          </div>

                          {/* Add Moderator Modal */}
                          {showAddModerator && (
                            <div className="bg-white border border-outline-variant/30 rounded-xl p-6 custom-shadow space-y-4 animate-in slide-in-from-top duration-200 text-left">
                              <div className="flex items-center justify-between border-b border-outline-variant/10 pb-3">
                                <h4 className="font-headline font-bold text-base text-on-surface flex items-center gap-2">
                                  <span className="material-symbols-outlined text-primary">shield</span> Create System Moderator
                                </h4>
                                <button
                                  onClick={() => setShowAddModerator(false)}
                                  className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant cursor-pointer border-none bg-transparent"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                  { label: 'Moderator Username *', field: 'name', placeholder: 'e.g. AussieDealCop' },
                                  { label: 'Email address *', field: 'email', placeholder: 'mod@7deals.com.au' },
                                ].map(({ label, field, placeholder }) => (
                                  <div key={field} className="space-y-1">
                                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">{label}</label>
                                    <input
                                      type="text"
                                      placeholder={placeholder}
                                      value={newAdminModerator[field]}
                                      onChange={e => setNewAdminModerator(prev => ({ ...prev, [field]: e.target.value }))}
                                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/40"
                                    />
                                  </div>
                                ))}
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">Assigned Region</label>
                                  <select
                                    value={newAdminModerator.region}
                                    onChange={e => setNewAdminModerator(prev => ({ ...prev, region: e.target.value }))}
                                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 text-on-surface"
                                  >
                                    {['National', 'NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'].map(r => (
                                      <option key={r}>{r}</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">Permissions Checklist</label>
                                  <div className="space-y-2 bg-surface-container-low border border-outline-variant/30 rounded-xl p-3">
                                    {['approve_deals', 'remove_posts', 'warn_users', 'ban_users'].map(perm => (
                                      <label key={perm} className="flex items-center gap-2 text-[12px] font-semibold text-on-surface-variant cursor-pointer">
                                        <input
                                          type="checkbox"
                                          checked={newAdminModerator.permissions.includes(perm)}
                                          onChange={e => {
                                            setNewAdminModerator(prev => ({
                                              ...prev,
                                              permissions: e.target.checked
                                                ? [...prev.permissions, perm]
                                                : prev.permissions.filter(p => p !== perm)
                                            }));
                                          }}
                                          className="rounded text-primary focus:ring-0 cursor-pointer"
                                        />
                                        {perm.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                      </label>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-3 pt-4 border-t border-outline-variant/10 justify-end">
                                <button
                                  onClick={() => {
                                    if (!newAdminModerator.name || !newAdminModerator.email) {
                                      triggerToast('Moderator Name and Email are required.', 'error');
                                      return;
                                    }
                                    const modObj = {
                                      id: 'am' + Date.now(),
                                      ...newAdminModerator,
                                      avatar: newAdminModerator.name.substring(0, 2).toUpperCase(),
                                      color: 'bg-primary/80',
                                      status: 'Active',
                                      joined: new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }),
                                      postsModerated: 0,
                                    };
                                    setAdminModerators(prev => [modObj, ...prev]);
                                    setShowAddModerator(false);
                                    setNewAdminModerator({ name: '', email: '', region: 'NSW', permissions: ['approve_deals'] });
                                    triggerToast('✓ System moderator enrolled successfully!', 'success');
                                  }}
                                  className="px-5 py-2.5 rounded-xl bg-primary hover:opacity-90 text-white font-bold text-xs cursor-pointer border-none shadow-sm transition-opacity"
                                >
                                  Enroll Moderator
                                </button>
                                <button
                                  onClick={() => setShowAddModerator(false)}
                                  className="px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-variant text-on-surface font-bold text-xs cursor-pointer border border-outline-variant/30 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Moderators Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {adminModerators.map(m => (
                              <div key={m.id} className="bg-white border border-outline-variant/30 rounded-xl p-5 custom-shadow space-y-4 relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div className="space-y-3">
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className={`w-10 h-10 rounded-full ${m.color || 'bg-primary'} text-white font-extrabold text-sm flex items-center justify-center select-none uppercase`}>
                                        {m.avatar}
                                      </div>
                                      <div>
                                        <h4 className="font-bold text-on-surface leading-snug">{m.name}</h4>
                                        <p className="text-[10px] text-on-surface-variant font-semibold leading-none mt-1">{m.email}</p>
                                      </div>
                                    </div>
                                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant border border-outline-variant/20 uppercase tracking-wide">
                                      {m.region || 'National'}
                                    </span>
                                  </div>

                                  <div className="pt-2 border-t border-outline-variant/10 flex items-center justify-between text-xs font-semibold text-on-surface-variant">
                                    <span>Joined: {m.joined}</span>
                                    <span className="font-bold text-on-surface">{m.postsModerated} posts filtered</span>
                                  </div>

                                  {/* Permission Chips */}
                                  <div className="space-y-1 text-left">
                                    <p className="text-[9px] font-black uppercase tracking-wider text-on-surface-variant/70">Moderator Permissions</p>
                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                      {m.permissions.map(p => (
                                        <span key={p} className="text-[9.5px] font-black bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-md border border-outline-variant/20 capitalize">
                                          {p.replace('_', ' ')}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div className="pt-3 border-t border-outline-variant/10 flex justify-end gap-2 text-xs">
                                  <button
                                    onClick={() => {
                                      setAdminModerators(prev => prev.map(x => x.id === m.id ? { ...x, status: x.status === 'Active' ? 'Suspended' : 'Active' } : x));
                                      triggerToast(`Mod status updated to ${m.status === 'Active' ? 'Suspended' : 'Active'}`, 'info');
                                    }}
                                    className="px-3 py-1.5 rounded-lg border border-outline-variant/30 hover:bg-surface-container text-on-surface-variant font-bold cursor-pointer bg-transparent transition-colors"
                                  >
                                    {m.status === 'Active' ? '⏸ Deactivate' : '▶ Activate'}
                                  </button>
                                  <button
                                    onClick={() => {
                                      setAdminModerators(prev => prev.filter(x => x.id !== m.id));
                                      triggerToast(`Moderator credentials revoked!`, 'warning');
                                    }}
                                    className="px-3 py-1.5 rounded-lg border border-error/20 hover:bg-error/5 text-error font-black cursor-pointer bg-transparent transition-colors"
                                  >
                                    ✕ Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                        </div>
                      )}

                      {/* 📢 TOP BANNER TAB */}
                      {adminTab === 'banner' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">

                          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-outline-variant/20 pb-4">
                            <div>
                              <h3 className="font-black text-2xl text-on-surface font-headline">Top Announcement Banners</h3>
                              <p className="text-[12px] text-on-surface-variant font-medium mt-1">{adminBanners.length} billboard notices scheduled</p>
                            </div>
                            <button
                              onClick={() => setShowAddBanner(true)}
                              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-black text-[13px] flex items-center gap-2 cursor-pointer border-none shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                            >
                              <span className="material-symbols-outlined text-base">campaign</span>
                              Schedule Banner
                            </button>
                          </div>

                          {/* Add Banner Modal */}
                          {showAddBanner && (
                            <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-lg space-y-4 animate-in slide-in-from-top duration-200 text-left">
                              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                                <h4 className="font-black text-[15px] text-on-surface flex items-center gap-2">
                                  <span className="material-symbols-outlined text-primary text-lg">add_circle</span>
                                  Schedule Top Page Banner
                                </h4>
                                <button
                                  onClick={() => setShowAddBanner(false)}
                                  className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer border-none bg-transparent flex items-center justify-center transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-wider">Banner Headline Message *</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. 🔥 Flash Markdown Sale: Coles Voucher discount code codes inside! 🦘"
                                    value={newBanner.title}
                                    onChange={e => setNewBanner(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                  />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                  <div className="space-y-1">
                                    <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-wider">Type</label>
                                    <select
                                      value={newBanner.type}
                                      onChange={e => setNewBanner(prev => ({ ...prev, type: e.target.value }))}
                                      className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-3.5 py-2.5 text-[13px] font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    >
                                      <option value="announcement">Announcement (Ticker)</option>
                                      <option value="highlight">Highlight (Brand)</option>
                                    </select>
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-wider">Background Hex Color</label>
                                    <input
                                      type="color"
                                      value={newBanner.bgColor}
                                      onChange={e => setNewBanner(prev => ({ ...prev, bgColor: e.target.value }))}
                                      className="w-full h-[42px] bg-surface-container border border-outline-variant/30 rounded-xl px-1.5 py-1.5 cursor-pointer focus:outline-none transition-all"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-wider">Text Color</label>
                                    <input
                                      type="color"
                                      value={newBanner.textColor}
                                      onChange={e => setNewBanner(prev => ({ ...prev, textColor: e.target.value }))}
                                      className="w-full h-[42px] bg-surface-container border border-outline-variant/30 rounded-xl px-1.5 py-1.5 cursor-pointer focus:outline-none transition-all"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                  <div className="space-y-1">
                                    <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-wider">Redirect Link Route</label>
                                    <input
                                      type="text"
                                      placeholder="e.g. #deals"
                                      value={newBanner.link}
                                      onChange={e => setNewBanner(prev => ({ ...prev, link: e.target.value }))}
                                      className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-wider">Start Date</label>
                                    <input
                                      type="text"
                                      placeholder="e.g. 01 May 2025"
                                      value={newBanner.startDate}
                                      onChange={e => setNewBanner(prev => ({ ...prev, startDate: e.target.value }))}
                                      className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-wider">Expiry End Date</label>
                                    <input
                                      type="text"
                                      placeholder="e.g. 31 Dec 2025"
                                      value={newBanner.endDate}
                                      onChange={e => setNewBanner(prev => ({ ...prev, endDate: e.target.value }))}
                                      className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-3 pt-4 border-t border-outline-variant/20 justify-end">
                                <button
                                  onClick={() => setShowAddBanner(false)}
                                  className="px-6 py-2.5 rounded-xl border border-outline-variant hover:bg-surface-container text-on-surface font-bold text-[13px] cursor-pointer bg-transparent transition-all duration-150"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => {
                                    if (!newBanner.title) {
                                      triggerToast('Banner headline message title is required.', 'error');
                                      return;
                                    }
                                    const bannerObj = {
                                      id: 'ab' + Date.now(),
                                      ...newBanner,
                                      status: 'Active',
                                      startDate: newBanner.startDate || '01 May 2025',
                                      endDate: newBanner.endDate || '31 Dec 2025',
                                    };
                                    setAdminBanners(prev => [bannerObj, ...prev]);
                                    setShowAddBanner(false);
                                    setNewBanner({ title: '', type: 'announcement', bgColor: '#0d0d0d', textColor: '#fdc800', link: '', startDate: '', endDate: '' });
                                    triggerToast('✓ Page billboard announcement scheduled!', 'success');
                                  }}
                                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-black text-[13px] cursor-pointer border-none shadow-sm transition-all duration-150"
                                >
                                  Schedule Announcement
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Banners Index */}
                          <div className="space-y-4">
                            {adminBanners.map(b => (
                              <div key={b.id} className="bg-white border border-outline-variant/30 rounded-2xl p-5 shadow-sm space-y-4 text-left hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="bg-surface-container text-on-surface-variant text-[10px] font-black px-2.5 py-0.5 rounded border border-outline-variant/20 uppercase select-none">
                                      {b.type}
                                    </span>
                                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border select-none ${b.status === 'Active' ? 'bg-[#e6f2e8] text-[#047c1f] border-[#047c1f]/20' : 'bg-surface-container text-on-surface-variant/60 border-outline-variant/20'
                                      }`}>
                                      {b.status}
                                    </span>
                                  </div>
                                  <p className="text-xs font-bold text-on-surface-variant flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                                    Schedule: {b.startDate} - {b.endDate}
                                  </p>
                                </div>

                                {/* Banner Visual Preview */}
                                <div className="rounded-xl p-4 flex items-center justify-between gap-4 select-none font-bold border border-outline-variant/20 shadow-inner"
                                  style={{ backgroundColor: b.bgColor, color: b.textColor }}
                                >
                                  <p className="text-sm font-semibold truncate flex-1 font-body">{b.title}</p>
                                  {b.link && (
                                    <span className="text-[10px] uppercase font-black bg-white/20 px-2.5 py-1 rounded tracking-wider border border-white/10">
                                      Link: {b.link}
                                    </span>
                                  )}
                                </div>

                                <div className="pt-4 border-t border-outline-variant/20 flex justify-end gap-3 text-xs">
                                  <button
                                    onClick={() => {
                                      setAdminBanners(prev => prev.map(x => x.id === b.id ? { ...x, status: x.status === 'Active' ? 'Inactive' : 'Active' } : x));
                                      triggerToast(`Banner status updated to ${b.status === 'Active' ? 'Inactive' : 'Active'}`, 'info');
                                    }}
                                    className="px-3.5 py-2 rounded-lg border border-outline-variant/60 hover:bg-surface-container text-on-surface font-black cursor-pointer bg-transparent transition-all flex items-center gap-1.5"
                                  >
                                    <span className="material-symbols-outlined text-sm">{b.status === 'Active' ? 'pause_circle' : 'play_circle'}</span>
                                    {b.status === 'Active' ? 'Pause' : 'Resume'}
                                  </button>
                                  <button
                                    onClick={() => {
                                      setAdminBanners(prev => prev.filter(x => x.id !== b.id));
                                      triggerToast('Banner billboard schedule deleted!', 'warning');
                                    }}
                                    className="px-3.5 py-2 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 font-black cursor-pointer bg-transparent transition-all flex items-center gap-1.5"
                                  >
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                        </div>
                      )}

                      {/* ⭐ FEATURED PLACEMENTS TAB */}
                      {adminTab === 'featured' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">

                          <div className="border-b border-outline-variant/20 pb-4">
                            <h3 className="font-black text-2xl text-on-surface font-headline">Featured Card Placements</h3>
                            <p className="text-[12px] text-on-surface-variant font-medium mt-1">Approve or audit homepage advertisement spotlights</p>
                          </div>

                          <div className="bg-white rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                              <table className="hidden md:table w-full text-[13px] text-left border-collapse">
                                <thead className="bg-surface-container-low border-b border-outline-variant/30">
                                  <tr>
                                    {['Voucher Title', 'Advertising Budget', 'Spotlight Duration', 'Date Requested', 'Status', 'Pitch Details', 'Actions'].map(h => (
                                      <th key={h} className="px-4 py-3.5 font-black text-[11px] text-on-surface-variant uppercase tracking-wider">{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/20 font-semibold text-on-surface">
                                  {featuredRequests.map(r => (
                                    <tr key={r.id} className="hover:bg-surface-container-low/50 transition-colors">
                                      <td className="px-4 py-3.5 font-bold text-on-surface max-w-xs truncate">{r.dealTitle}</td>
                                      <td className="px-4 py-3.5 text-primary font-black">{r.budget}</td>
                                      <td className="px-4 py-3.5 font-bold">{r.duration || '7 days'}</td>
                                      <td className="px-4 py-3.5 font-semibold text-on-surface-variant text-[12px]">{r.requestedDate}</td>
                                      <td className="px-4 py-3.5">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black border tracking-wider uppercase select-none ${r.status === 'Approved' ? 'bg-primary/10 text-primary border-primary/20' :
                                          r.status === 'Declined' ? 'bg-red-50 text-red-600 border-red-200' :
                                            'bg-amber-50 text-amber-600 border-amber-200'
                                          }`}>
                                          {r.status}
                                        </span>
                                      </td>
                                      <td className="px-4 py-3.5 text-xs text-on-surface-variant font-medium max-w-xs truncate" title={r.message}>{r.message}</td>
                                      <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-2 text-xs">
                                          {r.status === 'Pending' && (
                                            <>
                                              <button
                                                onClick={() => {
                                                  setFeaturedRequests(prev => prev.map(x => x.id === r.id ? { ...x, status: 'Approved' } : x));
                                                  triggerToast('✓ Featured request approved!', 'success');
                                                }}
                                                className="px-2.5 py-1 rounded bg-[#e6f2e8] text-[#047c1f] hover:bg-[#d4edd9] font-black border border-[#047c1f]/20 cursor-pointer transition-colors text-[11px]"
                                              >
                                                Approve
                                              </button>
                                              <button
                                                onClick={() => {
                                                  setFeaturedRequests(prev => prev.map(x => x.id === r.id ? { ...x, status: 'Declined' } : x));
                                                  triggerToast('Featured request declined.', 'warning');
                                                }}
                                                className="px-2.5 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 font-black border border-red-200 cursor-pointer transition-colors text-[11px]"
                                              >
                                                Decline
                                              </button>
                                            </>
                                          )}
                                          <button
                                            onClick={() => {
                                              setFeaturedRequests(prev => prev.filter(x => x.id !== r.id));
                                              triggerToast('Featured banner request entry removed.', 'info');
                                            }}
                                            className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-variant text-on-surface font-bold border border-outline-variant/30 cursor-pointer transition-colors text-[11px]"
                                          >
                                            Delete Log
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                  {featuredRequests.length === 0 && (
                                    <tr>
                                      <td colSpan={7} className="py-8 text-center text-on-surface-variant/60 font-semibold">
                                        No landing page advertising requests found.
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>

                              {/* Mobile viewports card list stack */}
                              <div className="block md:hidden divide-y divide-outline-variant/20">
                                {featuredRequests.map(r => (
                                  <div key={r.id} className="p-4 space-y-3 font-semibold text-on-surface">
                                    <div className="flex justify-between items-start gap-2">
                                      <div>
                                        <p className="font-bold text-[13px] text-on-surface line-clamp-2">{r.dealTitle}</p>
                                        <p className="text-[10px] text-on-surface-variant font-medium mt-1">Requested: {r.requestedDate}</p>
                                      </div>
                                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black border tracking-wider uppercase select-none shrink-0 ${r.status === 'Approved' ? 'bg-primary/10 text-primary border-primary/20' :
                                        r.status === 'Declined' ? 'bg-red-50 text-red-600 border-red-200' :
                                          'bg-amber-50 text-amber-600 border-amber-200'
                                        }`}>
                                        {r.status}
                                      </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs border-t border-b border-outline-variant/10 py-2">
                                      <div>
                                        <span className="text-[9px] text-on-surface-variant uppercase tracking-wider block">Budget</span>
                                        <span className="text-primary font-black text-xs">{r.budget}</span>
                                      </div>
                                      <div>
                                        <span className="text-[9px] text-on-surface-variant uppercase tracking-wider block">Duration</span>
                                        <span className="font-bold text-xs">{r.duration || '7 days'}</span>
                                      </div>
                                    </div>
                                    {r.message && (
                                      <div className="text-xs bg-surface-container/50 p-2.5 rounded-lg border border-outline-variant/10">
                                        <span className="text-[9px] text-on-surface-variant uppercase tracking-wider block mb-1">Pitch Details</span>
                                        <p className="text-on-surface-variant font-medium leading-relaxed">{r.message}</p>
                                      </div>
                                    )}
                                    <div className="flex gap-2 pt-1">
                                      {r.status === 'Pending' && (
                                        <>
                                          <button
                                            onClick={() => {
                                              setFeaturedRequests(prev => prev.map(x => x.id === r.id ? { ...x, status: 'Approved' } : x));
                                              triggerToast('✓ Featured request approved!', 'success');
                                            }}
                                            className="flex-1 py-2 rounded-lg bg-[#e6f2e8] text-[#047c1f] hover:bg-[#d4edd9] font-black border border-[#047c1f]/20 cursor-pointer text-center text-xs transition-colors"
                                          >
                                            Approve
                                          </button>
                                          <button
                                            onClick={() => {
                                              setFeaturedRequests(prev => prev.map(x => x.id === r.id ? { ...x, status: 'Declined' } : x));
                                              triggerToast('Featured request declined.', 'warning');
                                            }}
                                            className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-black border border-red-200 cursor-pointer text-center text-xs transition-colors"
                                          >
                                            Decline
                                          </button>
                                        </>
                                      )}
                                      <button
                                        onClick={() => {
                                          setFeaturedRequests(prev => prev.filter(x => x.id !== r.id));
                                          triggerToast('Featured banner request entry removed.', 'info');
                                        }}
                                        className="flex-1 py-2 rounded-lg bg-surface-container hover:bg-surface-variant text-on-surface font-bold border border-outline-variant/30 cursor-pointer text-center text-xs transition-colors"
                                      >
                                        Delete Log
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                {featuredRequests.length === 0 && (
                                  <div className="py-8 text-center text-on-surface-variant/60 font-semibold text-xs">
                                    No landing page advertising requests found.
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                        </div>
                      )}

                      {/* 🏷️ CATEGORY MANAGER TAB */}
                      {adminTab === 'categories' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">

                          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-outline-variant/20 pb-4">
                            <div>
                              <h3 className="font-black text-2xl text-on-surface font-headline">Category & Taxonomy Manager</h3>
                              <p className="text-[12px] text-on-surface-variant font-medium mt-1">{adminCategories.length} category terms active in aggregation filters</p>
                            </div>
                            <button
                              onClick={() => setShowAddCategory(true)}
                              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-black text-[13px] flex items-center gap-2 cursor-pointer border-none shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                            >
                              <span className="material-symbols-outlined text-base">sell</span>
                              Create Category
                            </button>
                          </div>

                          {/* Add Category Modal */}
                          {showAddCategory && (
                            <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-lg space-y-4 animate-in slide-in-from-top duration-200 text-left">
                              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                                <h4 className="font-black text-[15px] text-on-surface flex items-center gap-2">
                                  <span className="material-symbols-outlined text-primary text-lg">add_box</span>
                                  Create Marketplace Category
                                </h4>
                                <button
                                  onClick={() => setShowAddCategory(false)}
                                  className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer border-none bg-transparent flex items-center justify-center transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-wider">Emoji Icon *</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. 🎒"
                                    value={newCategory.emoji}
                                    onChange={e => setNewCategory(prev => ({ ...prev, emoji: e.target.value }))}
                                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-3.5 py-2.5 text-[13px] font-bold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-wider">Display Label *</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. School Supplies"
                                    value={newCategory.label}
                                    onChange={e => setNewCategory(prev => ({ ...prev, label: e.target.value }))}
                                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-wider">Taxonomy Value Slug *</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. School"
                                    value={newCategory.value}
                                    onChange={e => setNewCategory(prev => ({ ...prev, value: e.target.value }))}
                                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                  />
                                </div>
                              </div>
                              <div className="flex gap-3 pt-4 border-t border-outline-variant/20 justify-end">
                                <button
                                  onClick={() => setShowAddCategory(false)}
                                  className="px-6 py-2.5 rounded-xl border border-outline-variant hover:bg-surface-container text-on-surface font-bold text-[13px] cursor-pointer bg-transparent transition-all duration-150"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => {
                                    if (!newCategory.label || !newCategory.value) {
                                      triggerToast('Category Display Label and Value slug fields are required.', 'error');
                                      return;
                                    }
                                    const catObj = {
                                      id: 'ac' + Date.now(),
                                      ...newCategory,
                                      active: true,
                                      dealCount: 0,
                                    };
                                    setAdminCategories(prev => [...prev, catObj]);
                                    setShowAddCategory(false);
                                    setNewCategory({ label: '', emoji: '🏷️', value: '' });
                                    triggerToast('✓ Marketplace category successfully catalogued!', 'success');
                                  }}
                                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-black text-[13px] cursor-pointer border-none shadow-sm transition-all duration-150"
                                >
                                  Save Category
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Categories Grid List */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {adminCategories.map(cat => (
                              <div key={cat.id} className="bg-white border border-outline-variant/30 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-2xl shrink-0 select-none">{cat.emoji}</span>
                                  <div className="truncate">
                                    <h4 className="font-bold text-on-surface leading-snug truncate">{cat.label}</h4>
                                    <p className="text-[10px] text-on-surface-variant font-bold tracking-wide leading-none mt-1">{cat.dealCount || 0} active listings</p>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-1.5 shrink-0">
                                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border uppercase select-none ${cat.active ? 'bg-primary/10 text-primary border-primary/20' : 'bg-surface-container text-on-surface-variant/60 border-outline-variant/10'
                                    }`}>
                                    {cat.active ? 'Active' : 'Paused'}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => {
                                        setAdminCategories(prev => prev.map(x => x.id === cat.id ? { ...x, active: !x.active } : x));
                                        triggerToast(`Category filter status updated!`, 'success');
                                      }}
                                      className="p-1 rounded hover:bg-surface-container text-on-surface-variant cursor-pointer border-none bg-transparent flex items-center justify-center transition-colors"
                                      title="Toggle filter visibility"
                                    >
                                      <span className="material-symbols-outlined text-sm">visibility</span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        setAdminCategories(prev => prev.filter(x => x.id !== cat.id));
                                        triggerToast('Category taxonomy term deleted!', 'warning');
                                      }}
                                      className="p-1 rounded hover:bg-red-50 text-red-500 cursor-pointer border-none bg-transparent flex items-center justify-center transition-colors"
                                      title="Delete category"
                                    >
                                      <span className="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                        </div>
                      )}

                      {/* 💰 ALL DEALS TAB */}
                      {adminTab === 'deals' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">

                          <div className="border-b border-outline-variant/20 pb-4">
                            <h3 className="font-black text-2xl text-on-surface font-headline">Marketplace Listings Auditing</h3>
                            <p className="text-[12px] text-on-surface-variant font-medium mt-1">{allDeals.length} active campaigns currently live in Australian feed</p>
                          </div>

                          <div className="bg-white rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                              <table className="hidden md:table w-full text-[13px] text-left border-collapse">
                                <thead className="bg-surface-container-low border-b border-outline-variant/30">
                                  <tr>
                                    {['Brand / Retailer', 'Deal Campaign Title', 'Category', 'State', 'Original Price', 'Sale Price', 'Discount Rate', 'Actions'].map(h => (
                                      <th key={h} className="px-4 py-3.5 font-black text-[11px] text-on-surface-variant uppercase tracking-wider">{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/20 font-semibold text-on-surface">
                                  {allDeals.map(d => (
                                    <tr key={d.id} className="hover:bg-surface-container-low/50 transition-colors">
                                      <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 rounded bg-on-surface text-white font-extrabold text-[9px] flex items-center justify-center select-none uppercase shrink-0">
                                            {d.logo || d.brand.substring(0, 2)}
                                          </div>
                                          <span className="font-bold text-on-surface">{d.brand}</span>
                                        </div>
                                      </td>
                                      <td className="px-4 py-3.5 max-w-xs truncate" title={d.title}>{d.title}</td>
                                      <td className="px-4 py-3.5">
                                        <span className="bg-surface-container text-on-surface-variant text-[10px] font-bold px-2 py-0.5 rounded border border-outline-variant/20 select-none">
                                          {d.category}
                                        </span>
                                      </td>
                                      <td className="px-4 py-3.5 font-bold text-on-surface-variant">{d.state || 'National'}</td>
                                      <td className="px-4 py-3.5 text-on-surface-variant/60 font-mono text-[12px]">${d.originalPrice ? d.originalPrice.toFixed(2) : '0.00'}</td>
                                      <td className="px-4 py-3.5 font-black text-on-surface font-mono text-[13.5px]">${d.salePrice ? d.salePrice.toFixed(2) : '0.00'}</td>
                                      <td className="px-4 py-3.5">
                                        <span className="text-[10px] font-black bg-secondary/10 text-secondary px-2.5 py-0.5 rounded border border-secondary/20 uppercase select-none">
                                          {d.discount || 'Special'}
                                        </span>
                                      </td>
                                      <td className="px-4 py-3.5 text-xs">
                                        <div className="flex items-center gap-3">
                                          <button
                                            onClick={() => {
                                              setAllDeals(prev => prev.filter(x => x.id !== d.id));
                                              triggerToast('✓ Deal listing flagged and removed from marketplace feed!', 'warning');
                                            }}
                                            className="px-2.5 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 font-black border border-red-200 cursor-pointer transition-colors text-[11px]"
                                          >
                                            ✕ Remove Listing
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>

                              {/* Mobile viewports card list stack */}
                              <div className="block md:hidden divide-y divide-outline-variant/20">
                                {allDeals.map(d => (
                                  <div key={d.id} className="p-4 space-y-3 font-semibold text-on-surface">
                                    <div className="flex justify-between items-start gap-2">
                                      <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded bg-on-surface text-white font-extrabold text-[9px] flex items-center justify-center select-none uppercase shrink-0">
                                          {d.logo || d.brand.substring(0, 2)}
                                        </div>
                                        <span className="font-bold text-on-surface text-sm">{d.brand}</span>
                                      </div>
                                      <span className="bg-surface-container text-on-surface-variant text-[10px] font-bold px-2 py-0.5 rounded border border-outline-variant/20 select-none">
                                        {d.category}
                                      </span>
                                    </div>
                                    <div>
                                      <p className="font-bold text-[13px] text-on-surface line-clamp-2">{d.title}</p>
                                      <p className="text-[10px] text-on-surface-variant font-medium mt-1">Region: {d.state || 'National'}</p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-xs border-t border-b border-outline-variant/10 py-2">
                                      <div>
                                        <span className="text-[9px] text-on-surface-variant uppercase tracking-wider block">Original</span>
                                        <span className="text-on-surface-variant/60 font-mono line-through">${d.originalPrice ? d.originalPrice.toFixed(2) : '0.00'}</span>
                                      </div>
                                      <div>
                                        <span className="text-[9px] text-on-surface-variant uppercase tracking-wider block">Sale Price</span>
                                        <span className="font-black text-on-surface font-mono">${d.salePrice ? d.salePrice.toFixed(2) : '0.00'}</span>
                                      </div>
                                      <div>
                                        <span className="text-[9px] text-on-surface-variant uppercase tracking-wider block">Discount</span>
                                        <span className="text-[9px] font-black bg-secondary/10 text-secondary px-1.5 py-0.5 rounded border border-secondary/20 uppercase tracking-tight block text-center truncate">
                                          {d.discount || 'Special'}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="pt-1">
                                      <button
                                        onClick={() => {
                                          setAllDeals(prev => prev.filter(x => x.id !== d.id));
                                          triggerToast('✓ Deal listing flagged and removed from marketplace feed!', 'warning');
                                        }}
                                        className="w-full py-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-black border border-red-200 cursor-pointer text-center text-xs transition-colors"
                                      >
                                        ✕ Remove Listing
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                {allDeals.length === 0 && (
                                  <div className="py-8 text-center text-on-surface-variant/60 font-semibold text-xs">
                                    No campaigns live in feed.
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                        </div>
                      )}

                      {/* 📦 STOCK MANAGER TAB */}
                      {adminTab === 'stock' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">

                          <div className="border-b border-outline-variant/20 pb-4">
                            <h3 className="font-black text-2xl text-on-surface font-headline">Platform Stock Inventory Registry</h3>
                            <p className="text-[12px] text-on-surface-variant font-medium mt-1">Audit and balance inventory quantities across all partner storefronts</p>
                          </div>

                          <div className="bg-white rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                              <table className="hidden md:table w-full text-[13px] text-left border-collapse">
                                <thead className="bg-surface-container-low border-b border-outline-variant/30">
                                  <tr>
                                    {['Inventory Product Name', 'Category', 'Listed Retailer', 'Pricing (AUD)', 'Current Stock Level', 'Actions'].map(h => (
                                      <th key={h} className="px-4 py-3.5 font-black text-[11px] text-on-surface-variant uppercase tracking-wider">{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/20 font-semibold text-on-surface">
                                  {retailerProducts.map(p => (
                                    <tr key={p.id} className="hover:bg-surface-container-low/50 transition-colors">
                                      <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-3">
                                          <img src={p.imagePreview} alt={p.name} className="w-9 h-9 object-cover rounded-lg border border-outline-variant/30 bg-surface-container shrink-0" />
                                          <span className="font-bold text-on-surface">{p.name}</span>
                                        </div>
                                      </td>
                                      <td className="px-4 py-3.5">
                                        <span className="bg-surface-container text-on-surface-variant text-[10px] font-bold px-2 py-0.5 rounded border border-outline-variant/20 select-none">
                                          {p.category}
                                        </span>
                                      </td>
                                      <td className="px-4 py-3.5 text-on-surface-variant font-bold">{retailerProfile.storeName || 'OzTech Deals'}</td>
                                      <td className="px-4 py-3.5 font-black text-primary font-mono">${p.price ? p.price.toFixed(2) : '0.00'}</td>
                                      <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-2">
                                          <span className={`text-xs font-black min-w-[50px] inline-block ${p.stock === 0 ? 'text-red-500' : 'text-on-surface'}`}>
                                            {p.stock === 0 ? 'Out of Stock' : `${p.stock} units`}
                                          </span>
                                          <button
                                            onClick={() => {
                                              setRetailerProducts(prev => prev.map(x => x.id === p.id ? { ...x, stock: Math.max(0, x.stock - 10) } : x));
                                              triggerToast('Stock reduced by 10 units', 'info');
                                            }}
                                            className="px-2 py-1 rounded border border-outline-variant/60 hover:bg-surface-container text-on-surface-variant cursor-pointer font-bold bg-white text-[11px] transition-colors"
                                            title="Reduce stock by 10"
                                          >
                                            -10
                                          </button>
                                          <button
                                            onClick={() => {
                                              setRetailerProducts(prev => prev.map(x => x.id === p.id ? { ...x, stock: x.stock + 10 } : x));
                                              triggerToast('Stock increased by 10 units', 'success');
                                            }}
                                            className="px-2 py-1 rounded border border-outline-variant/60 hover:bg-surface-container text-on-surface-variant cursor-pointer font-bold bg-white text-[11px] transition-colors"
                                            title="Increase stock by 10"
                                          >
                                            +10
                                          </button>
                                        </div>
                                      </td>
                                      <td className="px-4 py-3.5">
                                        <button
                                          onClick={() => {
                                            setRetailerProducts(prev => prev.filter(x => x.id !== p.id));
                                            triggerToast('✓ Inventory product entry deleted from database!', 'warning');
                                          }}
                                          className="px-2.5 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 font-black border border-red-200 cursor-pointer transition-colors text-[11px]"
                                        >
                                          ✕ Remove
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                  {retailerProducts.length === 0 && (
                                    <tr>
                                      <td colSpan={6} className="py-8 text-center text-on-surface-variant/60 font-semibold">
                                        No listed products registered in platform inventories.
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>

                              {/* Mobile viewports card list stack */}
                              <div className="block md:hidden divide-y divide-outline-variant/20">
                                {retailerProducts.map(p => (
                                  <div key={p.id} className="p-4 space-y-3 font-semibold text-on-surface">
                                    <div className="flex justify-between items-start gap-2">
                                      <div className="flex items-center gap-3">
                                        <img src={p.imagePreview} alt={p.name} className="w-10 h-10 object-cover rounded-lg border border-outline-variant/30 bg-surface-container shrink-0" />
                                        <div>
                                          <p className="font-bold text-sm text-on-surface line-clamp-2">{p.name}</p>
                                          <span className="bg-surface-container text-on-surface-variant text-[9px] font-bold px-1.5 py-0.5 rounded border border-outline-variant/10 select-none">
                                            {p.category}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-xs border-t border-b border-outline-variant/10 py-2">
                                      <div>
                                        <span className="text-[9px] text-on-surface-variant uppercase tracking-wider block">Retailer</span>
                                        <span className="font-bold text-on-surface-variant truncate block">{retailerProfile.storeName || 'OzTech Deals'}</span>
                                      </div>
                                      <div>
                                        <span className="text-[9px] text-on-surface-variant uppercase tracking-wider block">Price</span>
                                        <span className="font-black text-primary font-mono">${p.price ? p.price.toFixed(2) : '0.00'}</span>
                                      </div>
                                      <div>
                                        <span className="text-[9px] text-on-surface-variant uppercase tracking-wider block">Stock Level</span>
                                        <span className={`text-xs font-black block ${p.stock === 0 ? 'text-red-500' : 'text-on-surface'}`}>
                                          {p.stock === 0 ? 'Out of Stock' : `${p.stock} units`}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 pt-1">
                                      <button
                                        onClick={() => {
                                          setRetailerProducts(prev => prev.map(x => x.id === p.id ? { ...x, stock: Math.max(0, x.stock - 10) } : x));
                                          triggerToast('Stock reduced by 10 units', 'info');
                                        }}
                                        className="flex-1 py-2 rounded-lg border border-outline-variant/60 hover:bg-surface-container text-on-surface-variant cursor-pointer font-bold bg-white text-xs transition-colors text-center"
                                      >
                                        Reduce 10
                                      </button>
                                      <button
                                        onClick={() => {
                                          setRetailerProducts(prev => prev.map(x => x.id === p.id ? { ...x, stock: x.stock + 10 } : x));
                                          triggerToast('Stock increased by 10 units', 'success');
                                        }}
                                        className="flex-1 py-2 rounded-lg border border-primary/40 hover:bg-primary/5 text-primary cursor-pointer font-bold bg-white text-xs transition-colors text-center"
                                      >
                                        Add 10
                                      </button>
                                      <button
                                        onClick={() => {
                                          setRetailerProducts(prev => prev.filter(x => x.id !== p.id));
                                          triggerToast('✓ Inventory product entry deleted from database!', 'warning');
                                        }}
                                        className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-bold border border-red-200 cursor-pointer text-xs transition-colors text-center"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                {retailerProducts.length === 0 && (
                                  <div className="py-8 text-center text-on-surface-variant/60 font-semibold text-xs">
                                    No listed products registered in platform inventories.
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                        </div>
                      )}

                      {/* 🔔 SYSTEM NOTIFICATIONS TAB */}
                      {adminTab === 'notifications' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">

                          <div className="border-b border-outline-variant/20 pb-4">
                            <h3 className="font-black text-2xl text-on-surface font-headline">Push Alert Alerting System</h3>
                            <p className="text-[12px] text-on-surface-variant font-medium mt-1">Broadcast push updates, warning signals, or news feeds to platform cohorts</p>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* Broadcaster form */}
                            <div className="lg:col-span-1 bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm space-y-4 h-fit">
                              <h4 className="font-black text-[14px] text-on-surface border-b border-outline-variant/20 pb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-base">campaign</span>
                                Broadcast Composer
                              </h4>

                              <div className="space-y-1">
                                <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-wider">Target Audience Cohort</label>
                                <select
                                  value={notifTarget}
                                  onChange={e => setNotifTarget(e.target.value)}
                                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-3.5 py-2.5 text-[13px] font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                >
                                  <option value="all">Global Broadcast (All Users)</option>
                                  <option value="consumers">Active Consumers only</option>
                                  <option value="retailers">Merchant Stores only</option>
                                  <option value="moderators">System Moderators only</option>
                                </select>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-wider">Broadcast Headline *</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Server Maintenance Notice"
                                  value={notifTitle}
                                  onChange={e => setNotifTitle(e.target.value)}
                                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-wider">Notification Category Type</label>
                                <select
                                  value={notifType}
                                  onChange={e => setNotifType(e.target.value)}
                                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-3.5 py-2.5 text-[13px] font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                >
                                  <option value="info">💡 Information alert</option>
                                  <option value="warning">⚠️ Warning message</option>
                                  <option value="success">🎉 Success celebration</option>
                                  <option value="error">🚨 Critical error notice</option>
                                </select>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-wider">Detailed Broadcast Description</label>
                                <textarea
                                  placeholder="Write detailed push announcement content..."
                                  value={notifMessage}
                                  onChange={e => setNotifMessage(e.target.value)}
                                  rows={4}
                                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none animate-none"
                                />
                              </div>

                              <button
                                onClick={() => {
                                  if (!notifTitle || !notifMessage) {
                                    triggerToast('Alert Title and detailed Message are required fields.', 'error');
                                    return;
                                  }
                                  const alertObj = {
                                    id: 'sn' + Date.now(),
                                    title: notifTitle,
                                    message: notifMessage,
                                    target: notifTarget,
                                    type: notifType,
                                    sentAt: new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }),
                                    sentBy: 'Administrator',
                                  };
                                  setSentNotifications(prev => [alertObj, ...prev]);
                                  setNotifTitle('');
                                  setNotifMessage('');
                                  triggerToast('✓ Push announcement broadcasted across the system!', 'success');
                                }}
                                className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-black text-[13px] cursor-pointer border-none shadow-sm transition-all duration-150 mt-2 flex items-center justify-center gap-1.5"
                              >
                                <span className="material-symbols-outlined text-sm">send</span>
                                Dispatch Notification
                              </button>
                            </div>

                            {/* Dispatch logs */}
                            <div className="lg:col-span-2 bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm space-y-4">
                              <h4 className="font-black text-[14px] text-on-surface border-b border-outline-variant/20 pb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-base">receipt_long</span>
                                Broadcast Transmission Logs
                              </h4>
                              <div className="space-y-3">
                                {sentNotifications.map(sn => (
                                  <div key={sn.id} className="p-4 bg-surface-container-low border border-outline-variant/30 rounded-xl space-y-2 relative overflow-hidden">
                                    <div className="absolute top-0 bottom-0 left-0 w-1"
                                      style={{
                                        backgroundColor: sn.type === 'warning' ? '#d97706' :
                                          sn.type === 'error' ? '#dc2626' :
                                            sn.type === 'success' ? '#15803d' : '#2563eb'
                                      }}
                                    ></div>
                                    <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-bold pl-1">
                                      <span className="bg-surface-container text-on-surface-variant px-2.5 py-0.5 rounded border border-outline-variant/20 text-[9px] font-black uppercase tracking-wide select-none">
                                        Audience: {sn.target}
                                      </span>
                                      <p className="text-on-surface-variant/60 font-bold">{sn.sentAt} · by {sn.sentBy}</p>
                                    </div>
                                    <h5 className="text-[13.5px] font-black text-on-surface pl-1">{sn.title}</h5>
                                    <p className="text-xs text-on-surface-variant font-medium leading-relaxed pl-1">{sn.message}</p>
                                    <div className="flex justify-end pt-1">
                                      <button
                                        onClick={() => {
                                          setSentNotifications(prev => prev.filter(x => x.id !== sn.id));
                                          triggerToast('Alert deleted from history log.', 'info');
                                        }}
                                        className="text-red-600 hover:text-red-700 font-black hover:underline cursor-pointer border-none bg-transparent p-0 text-[11.5px] transition-colors flex items-center gap-1"
                                      >
                                        <span className="material-symbols-outlined text-xs">delete</span>
                                        Delete Log Entry
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                {sentNotifications.length === 0 && (
                                  <p className="text-xs text-on-surface-variant/60 font-semibold py-8 text-center">
                                    No previously sent notifications recorded.
                                  </p>
                                )}
                              </div>
                            </div>

                          </div>

                        </div>
                      )}

                    </section>
                  </main>

                  {/* Reusable MobileDashboardNav bottom navigation drawer */}
                  <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#e8e8e8] z-[990] flex items-center gap-1.5 px-3 overflow-x-auto no-scrollbar shadow-[0_-4px_20px_rgba(0,0,0,0.06)] select-none">
                    {[
                      { key: 'overview', label: 'Overview', icon: 'dashboard' },
                      { key: 'users', label: 'Store Accounts', icon: 'store' },
                      { key: 'moderators', label: 'Moderators', icon: 'shield' },
                      { key: 'banner', label: 'Top Banner', icon: 'campaign' },
                      { key: 'featured', label: 'Featured Cards', icon: 'star' },
                      { key: 'categories', label: 'Categories', icon: 'sell' },
                      { key: 'deals', label: 'All Deals', icon: 'payments' },
                      { key: 'stock', label: 'Stock Manager', icon: 'inventory' },
                      { key: 'notifications', label: 'Notifications', icon: 'notifications' },
                    ].map((tab) => {
                      const isActive = adminTab === tab.key;
                      return (
                        <button
                          key={tab.key}
                          onClick={() => setAdminTab(tab.key)}
                          className={`flex flex-col items-center justify-center min-w-[72px] h-full transition-colors cursor-pointer border-none bg-transparent ${isActive ? 'text-[#047c1f]' : 'text-slate-400'}`}
                        >
                          <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                          <span className="text-[10px] font-extrabold mt-0.5 whitespace-nowrap">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                </div>
              ) : (
                <div className="py-20 text-center space-y-4 bg-white border border-[#e8e8e8] rounded-3xl max-w-lg mx-auto">
                  <p className="text-slate-500 font-bold">Please sign in as Administrator to gain access.</p>
                  <button
                    onClick={() => { setAuthTab('login'); setLoginModalOpen(true); }}
                    className="px-5 py-2.5 rounded-full bg-[#047c1f] hover:bg-[#035a16] text-white font-bold text-sm transition-colors cursor-pointer"
                  >
                    Switch to Admin
                  </button>
                </div>
              )
            )}

            {/* ================================================================= */}
            {/* PAGE 9: MODERATOR DASHBOARD (#moderator) */}
            {/* ================================================================= */}
            {currentRoute === '#moderator' && (
              currentUser?.role === 'moderator' ? (
                <div className="flex font-body bg-background text-on-surface min-h-screen relative w-full text-left overflow-hidden animate-in fade-in duration-300">

                  {/* Sidebar Navigation */}
                  <aside className="hidden sm:flex h-screen w-64 fixed left-0 top-0 z-50 flex-col py-6 border-r border-outline-variant/20 bg-surface-container select-none">
                    <div className="px-6 mb-10 flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-[20px]">shield</span>
                      </div>
                      <div>
                        <h2 className="text-lg font-headline font-bold text-on-surface">Mod Central</h2>
                        <p className="text-[10px] text-on-surface-variant tracking-wider uppercase font-semibold">Moderator Hub</p>
                      </div>
                    </div>

                    <nav className="flex-1 space-y-1">
                      {[
                        { key: 'overview', label: 'Mod Overview', icon: 'dashboard' },
                        { key: 'flagged', label: 'Flagged Queue', icon: 'warning' },
                        { key: 'community', label: 'Manage coupons', icon: 'sell' },
                        { key: 'coupons', label: 'Featured ads', icon: 'ads_click' },
                        { key: 'banner', label: 'Billboard Notices', icon: 'campaign' },
                      ].map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setModeratorTab(tab.key)}
                          className={`w-[calc(100%-1rem)] rounded-lg mx-2 my-1 px-4 py-2.5 flex items-center gap-3 transition-transform active:scale-95 text-left font-bold text-sm cursor-pointer border-none focus:outline-none focus:ring-0 ${moderatorTab === tab.key
                            ? 'bg-primary text-white font-semibold shadow-sm'
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40 bg-transparent'
                            }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                          <span>{tab.label}</span>
                          {tab.key === 'flagged' && flaggedDeals.filter(d => d.status === 'Pending').length > 0 && (
                            <span className="ml-auto bg-error text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full animate-pulse">
                              {flaggedDeals.filter(d => d.status === 'Pending').length}
                            </span>
                          )}
                        </button>
                      ))}
                    </nav>

                    <div className="px-4 mt-auto mb-6">
                      <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 text-xs space-y-2.5">
                        <div className="flex justify-between items-center text-on-surface-variant">
                          <span className="font-semibold">Spam Shield:</span>
                          <span className={`font-bold px-1.5 py-0.5 rounded ${moderatorSystemFilter ? 'bg-[#047c1f]/10 text-[#047c1f]' : 'bg-error/10 text-error'}`}>
                            {moderatorSystemFilter ? 'STRICT' : 'LAX'}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setModeratorSystemFilter(!moderatorSystemFilter);
                            triggerToast(`Spam filter set to ${!moderatorSystemFilter ? 'Strict Rules' : 'Standard Rules'}!`, 'info');
                          }}
                          className="w-full py-2 bg-primary hover:bg-primary/90 text-white font-bold text-[11px] rounded-lg transition-colors border-none cursor-pointer"
                        >
                          Toggle Filter
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-outline-variant/20 pt-4">
                      <button
                        onClick={handleLogout}
                        className="w-[calc(100%-1rem)] text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40 rounded-lg mx-2 my-1 px-4 py-2.5 flex items-center gap-3 transition-all duration-200 text-left font-bold text-sm cursor-pointer border-none bg-transparent"
                      >
                        <span className="material-symbols-outlined">logout</span>
                        <span>Log Out</span>
                      </button>
                    </div>
                  </aside>

                  <main className="w-full sm:ml-64 flex-1 min-h-screen flex flex-col bg-background pb-16 lg:pb-0">

                    {/* TopNavBar */}
                    <header className="w-full sticky top-0 z-40 bg-surface flex justify-between items-center px-4 sm:px-8 py-3 sm:py-4 border-b border-outline-variant/30 shadow-sm">
                      <div className="flex items-center gap-8">
                        <h1 className="text-xl font-headline font-bold text-primary flex items-center gap-2">
                          <span className="material-symbols-outlined">shield</span> Moderator Console
                        </h1>
                        <div className="hidden sm:block relative w-80 group">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                          <input
                            type="text"
                            placeholder="Search complaints or bulletins..."
                            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full focus:ring-2 focus:ring-primary/20 text-sm transition-all focus:outline-none text-on-surface placeholder:text-on-surface-variant/50"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => triggerToast('You have 2 active reports', 'info')}
                          className="p-2 text-on-surface-variant hover:bg-surface-variant/50 rounded-full transition-colors cursor-pointer relative border-none bg-transparent"
                        >
                          <span className="material-symbols-outlined">notifications</span>
                          {flaggedDeals.filter(d => d.status === 'Pending').length > 0 && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
                          )}
                        </button>
                        <div className="h-8 w-[1px] bg-outline-variant/30 mx-2"></div>

                        <div className="flex items-center gap-3 cursor-pointer hover:bg-surface-variant/30 p-1.5 rounded-lg transition-colors">
                          <div className="text-right">
                            <p className="text-sm font-bold leading-none text-on-surface">{currentUser.name}</p>
                            <p className="text-xs text-on-surface-variant mt-1 font-semibold">Senior Moderator</p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-primary text-white font-extrabold text-sm flex items-center justify-center border-2 border-primary-container uppercase select-none">
                            {currentUser.avatar}
                          </div>
                        </div>
                      </div>
                    </header>

                    {/* Content Canvas */}
                    <section className="p-8 max-w-7xl w-full mx-auto space-y-8 flex-1 pb-24">

                      {/* Page Header */}
                      <div className="flex justify-between items-end flex-wrap gap-4 text-left">
                        <div>
                          <h2 className="text-3xl font-headline font-bold text-on-surface">
                            {moderatorTab === 'overview' ? 'Moderator Hub Overview' :
                              moderatorTab === 'flagged' ? 'Flagged Complaints Queue' :
                                moderatorTab === 'community' ? 'Manage coupons' :
                                  moderatorTab === 'coupons' ? 'Featured Ads Campaign Hub' :
                                    'Announcements Billboard'}
                          </h2>
                          <p className="text-on-surface-variant mt-1 font-semibold">
                            {moderatorTab === 'overview' ? 'Monitor platform complaints, active site coupon indices, and bulletins.' :
                              moderatorTab === 'flagged' ? 'User-reported promotions pending standard editorial review.' :
                                moderatorTab === 'community' ? 'Audit and manage the active live coupon ticker codes.' :
                                  moderatorTab === 'coupons' ? 'Manage and schedule premium brand featured ads.' :
                                    'Program the dynamic header ticker billboard announcements.'}
                          </p>
                        </div>
                        <div className="flex gap-3 shrink-0">
                          <div className="relative">
                            <button
                              ref={moderatorTimeframeRef}
                              onClick={() => setOpenDropdown(openDropdown === 'moderatorTimeframe' ? null : 'moderatorTimeframe')}
                              className="bg-surface-container-high px-4 py-2 rounded-lg text-sm font-semibold text-on-surface-variant flex items-center gap-2 hover:bg-surface-variant transition-colors active:scale-95 cursor-pointer border-none"
                            >
                              <span className="material-symbols-outlined text-sm">calendar_today</span>
                              {moderatorTimeframe}
                              <span className={`material-symbols-outlined text-xs transition-transform duration-150 ${openDropdown === 'moderatorTimeframe' ? 'rotate-180' : ''}`}>expand_more</span>
                            </button>
                            <PortalDropdown anchorRef={moderatorTimeframeRef} isOpen={openDropdown === 'moderatorTimeframe'} alignRight>
                              <div className="py-1">
                                {TIMEFRAME_OPTIONS.map((opt) => (
                                  <button
                                    key={opt}
                                    onClick={() => {
                                      setModeratorTimeframe(opt);
                                      setOpenDropdown(null);
                                      triggerToast(`Moderator timeframe set to ${opt}`, 'info');
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-container-high rounded-md transition-colors flex items-center gap-2 border-none bg-transparent cursor-pointer font-semibold ${moderatorTimeframe === opt ? 'text-primary bg-primary/5' : 'text-on-surface-variant'}`}
                                  >
                                    {moderatorTimeframe === opt ? (
                                      <span className="material-symbols-outlined text-sm text-primary">check</span>
                                    ) : (
                                      <span className="w-4 h-4"></span>
                                    )}
                                    <span>{opt}</span>
                                  </button>
                                ))}
                              </div>
                            </PortalDropdown>
                          </div>
                        </div>
                      </div>

                      {/* ══════════════════════════════════════
                          TAB: OVERVIEW
                      ══════════════════════════════════════ */}
                      {moderatorTab === 'overview' && (
                        <div className="space-y-8 animate-in fade-in duration-300">

                          {/* KPI Cards Grid */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {/* Active Flags */}
                            <div className="bg-surface-container-low p-6 rounded-xl custom-shadow group hover:bg-white border border-error/25 hover:border-error transition-all duration-200 hover:-translate-y-0.5 text-left">
                              <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-error/10 rounded-lg text-error">
                                  <span className="material-symbols-outlined">warning</span>
                                </div>
                                <span className="text-xs font-bold text-error flex items-center bg-error/5 px-2 py-1 rounded">Action Needed</span>
                              </div>
                              <h3 className="text-on-surface-variant text-sm font-semibold">Active Flags</h3>
                              <p className="text-3xl font-headline font-bold text-on-surface mt-1">
                                {moderatorMetrics.flags}
                              </p>
                            </div>

                            {/* Spotlight Posts */}
                            <div className="bg-surface-container-low p-6 rounded-xl custom-shadow group hover:bg-white border border-primary/20 hover:border-primary transition-all duration-200 hover:-translate-y-0.5 text-left">
                              <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                  <span className="material-symbols-outlined">chat</span>
                                </div>
                                <span className="text-xs font-bold text-primary flex items-center bg-primary/5 px-2 py-1 rounded">Spotlight Feed</span>
                              </div>
                              <h3 className="text-on-surface-variant text-sm font-semibold">Spotlight Posts</h3>
                              <p className="text-3xl font-headline font-bold text-on-surface mt-1">
                                {moderatorMetrics.spotlight}
                              </p>
                            </div>

                            {/* Active Coupons */}
                            <div className="bg-surface-container-low p-6 rounded-xl custom-shadow group hover:bg-white border border-tertiary/30 hover:border-tertiary transition-all duration-200 hover:-translate-y-0.5 text-left">
                              <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-tertiary/10 rounded-lg text-tertiary">
                                  <span className="material-symbols-outlined">local_offer</span>
                                </div>
                                <span className="text-xs font-bold text-tertiary flex items-center bg-tertiary/5 px-2 py-1 rounded">Main Grid</span>
                              </div>
                              <h3 className="text-on-surface-variant text-sm font-semibold">Active Coupons</h3>
                              <p className="text-3xl font-headline font-bold text-on-surface mt-1">
                                {moderatorMetrics.coupons}
                              </p>
                            </div>

                            {/* Dynamic Notices */}
                            <div className="bg-surface-container-low p-6 rounded-xl custom-shadow group hover:bg-white border border-primary/20 hover:border-primary transition-all duration-200 hover:-translate-y-0.5 text-left">
                              <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                  <span className="material-symbols-outlined">campaign</span>
                                </div>
                                <span className="text-xs font-bold text-primary flex items-center bg-primary/5 px-2 py-1 rounded">Billboard</span>
                              </div>
                              <h3 className="text-on-surface-variant text-sm font-semibold">Billboard Notices</h3>
                              <p className="text-3xl font-headline font-bold text-on-surface mt-1">
                                {moderatorMetrics.notices}
                              </p>
                            </div>
                          </div>

                          {/* Quick Controls & Logs */}
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            <div className="bg-white rounded-xl border border-outline-variant/30 p-6 custom-shadow space-y-4 col-span-2 text-left">
                              <h3 className="font-headline font-bold text-base text-on-surface border-b border-outline-variant/10 pb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">campaign</span> Billboard Notice Controller
                              </h3>
                              <p className="text-xs text-on-surface-variant leading-relaxed font-semibold">
                                Global senior moderator panel. Modifications to notices display instantly on the top announcement ticker of all pages.
                              </p>

                              <div className="space-y-4 pt-2">
                                {adminBanners.map(b => (
                                  <div key={b.id} className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/20 flex items-center justify-between gap-4">
                                    <div className="min-w-0">
                                      <p className="text-xs font-bold text-on-surface truncate">{b.title}</p>
                                      <p className="text-[10px] text-on-surface-variant mt-1 font-bold uppercase">{b.type} · Status: <span className={b.status === 'Active' ? 'text-primary font-bold' : 'text-on-surface-variant'}>{b.status}</span></p>
                                    </div>
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => {
                                          const newTitle = prompt('Enter new banner message:', b.title);
                                          if (newTitle) {
                                            setAdminBanners(prev => prev.map(x => x.id === b.id ? { ...x, title: newTitle } : x));
                                            triggerToast('✓ Dynamic Announcement Billboard updated!', 'success');
                                          }
                                        }}
                                        className="px-3 py-1.5 rounded-lg bg-primary hover:opacity-90 text-white font-bold text-[11px] cursor-pointer border-none"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => {
                                          const newStatus = b.status === 'Active' ? 'Inactive' : 'Active';
                                          setAdminBanners(prev => prev.map(x => x.id === b.id ? { ...x, status: newStatus } : x));
                                          triggerToast(`Banner is now ${newStatus}!`, 'info');
                                        }}
                                        className={`px-3 py-1.5 rounded-lg font-bold text-[11px] cursor-pointer border-none ${b.status === 'Active' ? 'bg-[#eb9d00] hover:opacity-90 text-white' : 'bg-primary hover:opacity-90 text-white'}`}
                                      >
                                        {b.status === 'Active' ? 'Disable' : 'Enable'}
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="bg-white rounded-xl border border-outline-variant/30 p-6 custom-shadow space-y-4 text-left">
                              <h3 className="font-headline font-bold text-base text-on-surface border-b border-outline-variant/10 pb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">security</span> Platform Spam Shield
                              </h3>
                              <div className="space-y-3 pt-2 text-xs">
                                <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/10">
                                  <span className="font-semibold text-on-surface-variant">Block profanity/curse words</span>
                                  <span className="text-[#047c1f] font-bold">ACTIVE</span>
                                </div>
                                <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/10">
                                  <span className="font-semibold text-on-surface-variant">Auto-flag repetitive links</span>
                                  <span className="text-[#047c1f] font-bold">ACTIVE</span>
                                </div>
                                <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/10">
                                  <span className="font-semibold text-on-surface-variant">Retailer duplicate control</span>
                                  <span className="text-on-surface-variant/60">INACTIVE</span>
                                </div>
                                <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/10">
                                  <span className="font-semibold text-on-surface-variant">Strict region validation</span>
                                  <span className="text-[#047c1f] font-bold">ACTIVE</span>
                                </div>
                              </div>
                              <button
                                onClick={() => triggerToast('Security policies successfully audited!', 'success')}
                                className="w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary font-bold rounded-xl transition-colors border-none cursor-pointer text-xs"
                              >
                                Re-sync Spam Settings
                              </button>
                            </div>

                          </div>
                        </div>
                      )}

                      {/* ══════════════════════════════════════
                          TAB: FLAGGED QUEUE
                      ══════════════════════════════════════ */}
                      {moderatorTab === 'flagged' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">
                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                              <h3 className="font-headline font-bold text-xl text-on-surface">Flagged Complaints Moderation Queue</h3>
                            </div>
                            <button
                              onClick={() => {
                                setFlaggedDeals(prev => prev.map(f => ({ ...f, status: 'Approved' })));
                                triggerToast('✓ Cleared flagged deals queue!', 'success');
                              }}
                              className="px-4 py-2.5 rounded-xl bg-primary hover:opacity-90 text-white font-bold text-xs cursor-pointer border-none shadow-sm transition-opacity"
                            >
                              Approve All Pending
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {flaggedDeals.filter(f => f.status === 'Pending').map(flag => (
                              <div key={flag.id} className="bg-white rounded-xl border border-outline-variant/30 p-5 custom-shadow space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow text-left">
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="px-2.5 py-1 bg-error/10 text-error border border-error/20 rounded-lg font-bold text-[10px] uppercase tracking-wide">
                                      Spam Reported
                                    </span>
                                    <span className="text-[10px] text-on-surface-variant/70 font-semibold">{flag.time}</span>
                                  </div>
                                  <h4 className="font-bold text-sm text-on-surface leading-snug pt-1">{flag.title}</h4>
                                  <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/20 text-xs">
                                    <p className="text-on-surface-variant/60 font-bold uppercase text-[9px] tracking-wider">Reporter Comment</p>
                                    <p className="font-bold text-on-surface mt-1">{flag.reporter} flagged this post:</p>
                                    <p className="text-on-surface-variant italic font-semibold mt-1">"{flag.reason}"</p>
                                  </div>
                                </div>

                                <div className="flex gap-2 pt-3 border-t border-outline-variant/10">
                                  <button
                                    onClick={() => {
                                      setFlaggedDeals(prev => prev.map(x => x.id === flag.id ? { ...x, status: 'Approved' } : x));
                                      triggerToast('✓ Deal approved and reports dismissed!', 'success');
                                    }}
                                    className="px-3.5 py-2.5 rounded-xl bg-primary hover:opacity-90 text-white font-bold text-xs flex-1 cursor-pointer border-none shadow-sm transition-opacity"
                                  >
                                    Approve Deal
                                  </button>
                                  <button
                                    onClick={() => {
                                      setFlaggedDeals(prev => prev.map(x => x.id === flag.id ? { ...x, status: 'Declined' } : x));
                                      setAllDeals(prev => prev.filter(d => d.title !== flag.title));
                                      triggerToast('✕ Spam deal deleted from platform!', 'warning');
                                    }}
                                    className="px-3.5 py-2.5 rounded-xl bg-error hover:opacity-90 text-white font-bold text-xs flex-1 cursor-pointer border-none shadow-sm transition-opacity"
                                  >
                                    Delete Spam
                                  </button>
                                </div>
                              </div>
                            ))}

                            {flaggedDeals.filter(f => f.status === 'Pending').length === 0 && (
                              <div className="col-span-full py-16 text-center text-on-surface-variant/70 bg-white border border-outline-variant/30 rounded-xl custom-shadow">
                                <span className="text-4xl block mb-2">🎉</span>
                                <p className="text-sm font-bold text-on-surface">Good on ya, mate! Flagged deals queue is clean!</p>
                                <p className="text-xs font-semibold mt-1">No active complaints or user dispute claims currently logged.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* ══════════════════════════════════════
                          TAB: MANAGE COUPONS (Active Ticker)
                      ══════════════════════════════════════ */}
                      {moderatorTab === 'community' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">
                          <div className="flex justify-between items-center flex-wrap gap-4 border-b border-outline-variant/20 pb-4">
                            <div>
                              <h3 className="font-headline font-bold text-xl text-on-surface">Manage Active Coupon Tickers</h3>
                              <p className="text-xs text-on-surface-variant mt-1 font-semibold">Add, edit, or remove coupons displayed in the scrolling home header.</p>
                            </div>
                            <button
                              onClick={() => {
                                setEditingCoupon(null);
                                setEditingCouponIndex(-1);
                                setEditingCouponRow('A');
                                setCouponFormBrand('');
                                setCouponFormCode('');
                                setCouponFormDiscount('');
                                setCouponFormExpiryDays(3);
                                setCouponFormBg('');
                                setCouponModalOpen(true);
                              }}
                              className="px-4 py-2 rounded-xl bg-[#047c1f] hover:bg-[#035a16] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#047c1f]/10 cursor-pointer border-none transition-colors"
                            >
                              <Plus className="w-4 h-4 text-[#fdc800]" /> Add Coupon Ticker
                            </button>
                          </div>

                          {/* Row A Section */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                              <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">Row A: Left-Scrolling Tickers ({tickerPillsA.length})</h4>
                            </div>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                              {tickerPillsA.map((pill, idx) => (
                                <div key={`mod-pill-a-${idx}`} className="p-4 bg-white border border-outline-variant/30 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-350 transition-colors">
                                  {/* Visual Preview styled exactly like the screenshot */}
                                  <div className="flex items-center">
                                    <div
                                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border shadow-sm select-none"
                                      style={{
                                        backgroundColor: pill.bg || (BRAND_PILL_COLORS[pill.brand] || DEFAULT_PILL_COLOR).bg,
                                        borderColor: "rgba(255,255,255,0.2)",
                                        opacity: Date.now() > PILL_EXPIRY_TIMESTAMPS[pill.code] ? 0.5 : 1,
                                      }}
                                    >
                                      {renderBrandDot(pill.brand)}
                                      <span className="font-bold text-xs" style={{ color: "rgba(255,255,255,0.95)" }}>{pill.brand}</span>
                                      <span className="px-1.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#fdc800] text-black">
                                        {pill.code}
                                      </span>
                                      <span className="font-bold text-xs" style={{ color: "#fdc800" }}>{pill.discount}</span>
                                      <TickerCountdown expiryTs={PILL_EXPIRY_TIMESTAMPS[pill.code]} />
                                    </div>
                                  </div>

                                  {/* Actions */}
                                  <div className="flex gap-2 shrink-0 md:justify-end">
                                    <button
                                      onClick={() => {
                                        setEditingCoupon(pill);
                                        setEditingCouponIndex(idx);
                                        setEditingCouponRow('A');
                                        setCouponFormBrand(pill.brand);
                                        setCouponFormCode(pill.code);
                                        setCouponFormDiscount(pill.discount);
                                        setCouponFormExpiryDays(pill.expiryDays || 3);
                                        setCouponFormBg(pill.bg || '');
                                        setCouponModalOpen(true);
                                      }}
                                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] cursor-pointer border-none transition-colors"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (confirm(`Remove ${pill.brand} (${pill.code}) ticker coupon?`)) {
                                          setTickerPillsA(prev => prev.filter((_, i) => i !== idx));
                                          triggerToast('✕ Ticker coupon removed.', 'warning');
                                        }
                                      }}
                                      className="px-3 py-1.5 rounded-lg bg-error/10 hover:bg-error/20 text-error font-bold text-[11px] cursor-pointer border-none transition-colors"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Row B Section */}
                          <div className="space-y-4 pt-4 border-t border-outline-variant/20">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                              <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">Row B: Right-Scrolling Tickers ({tickerPillsB.length})</h4>
                            </div>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                              {tickerPillsB.map((pill, idx) => (
                                <div key={`mod-pill-b-${idx}`} className="p-4 bg-white border border-outline-variant/30 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-350 transition-colors">
                                  {/* Visual Preview styled exactly like the screenshot */}
                                  <div className="flex items-center">
                                    <div
                                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border shadow-sm select-none"
                                      style={{
                                        backgroundColor: pill.bg || (BRAND_PILL_COLORS[pill.brand] || DEFAULT_PILL_COLOR).bg,
                                        borderColor: "rgba(255,255,255,0.2)",
                                        opacity: Date.now() > PILL_EXPIRY_TIMESTAMPS[pill.code] ? 0.5 : 1,
                                      }}
                                    >
                                      {renderBrandDot(pill.brand)}
                                      <span className="font-bold text-xs" style={{ color: "rgba(255,255,255,0.95)" }}>{pill.brand}</span>
                                      <span className="px-1.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#fdc800] text-black">
                                        {pill.code}
                                      </span>
                                      <span className="font-bold text-xs" style={{ color: "#fdc800" }}>{pill.discount}</span>
                                      <TickerCountdown expiryTs={PILL_EXPIRY_TIMESTAMPS[pill.code]} />
                                    </div>
                                  </div>

                                  {/* Actions */}
                                  <div className="flex gap-2 shrink-0 md:justify-end">
                                    <button
                                      onClick={() => {
                                        setEditingCoupon(pill);
                                        setEditingCouponIndex(idx);
                                        setEditingCouponRow('B');
                                        setCouponFormBrand(pill.brand);
                                        setCouponFormCode(pill.code);
                                        setCouponFormDiscount(pill.discount);
                                        setCouponFormExpiryDays(pill.expiryDays || 3);
                                        setCouponFormBg(pill.bg || '');
                                        setCouponModalOpen(true);
                                      }}
                                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] cursor-pointer border-none transition-colors"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (confirm(`Remove ${pill.brand} (${pill.code}) ticker coupon?`)) {
                                          setTickerPillsB(prev => prev.filter((_, i) => i !== idx));
                                          triggerToast('✕ Ticker coupon removed.', 'warning');
                                        }
                                      }}
                                      className="px-3 py-1.5 rounded-lg bg-error/10 hover:bg-error/20 text-error font-bold text-[11px] cursor-pointer border-none transition-colors"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      )}

                      {/* ══════════════════════════════════════
                          TAB: FEATURED ADS (allDeals)
                      ══════════════════════════════════════ */}
                      {moderatorTab === 'coupons' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">
                          <div className="flex justify-between items-center flex-wrap gap-4 border-b border-outline-variant/20 pb-4">
                            <div>
                              <h3 className="font-headline font-bold text-xl text-on-surface">Active Featured Ads Campaigns</h3>
                              <p className="text-xs text-on-surface-variant mt-1 font-semibold">Program the premium colorful cards running in the home screen marquee ticker.</p>
                            </div>
                            <button
                              onClick={() => {
                                setEditingFeaturedAd(null);
                                setEditingFeaturedAdIndex(-1);
                                setFeaturedAdFormBrand('');
                                setFeaturedAdFormTitle('');
                                setFeaturedAdFormCode('');
                                setFeaturedAdFormDiscount('');
                                setFeaturedAdFormSalePrice(0);
                                setFeaturedAdFormOriginalPrice(0);
                                setFeaturedAdFormExpiry(3);
                                setFeaturedAdFormBg('');
                                setFeaturedAdFormCategory('Tech');
                                setFeaturedAdFormState('National');
                                setFeaturedAdFormImage('https://picsum.photos/seed/ads/400/200');
                                setFeaturedAdFormDesc('');
                                setFeaturedAdModalOpen(true);
                              }}
                              className="px-4 py-2 rounded-xl bg-[#047c1f] hover:bg-[#035a16] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#047c1f]/10 cursor-pointer border-none transition-colors"
                            >
                              <Plus className="w-4 h-4 text-[#fdc800]" /> Add Featured Ad
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                            {allDeals.map((deal, idx) => {
                              const logoInitials = deal.logo || (deal.brand ? deal.brand.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'AD');
                              const cardBgColor = deal.brandColor || deal.bg || TICKER_BRAND_COLORS[deal.brand] || '#047c1f';
                              
                              return (
                                <div key={deal.id || idx} className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between p-4 space-y-4">
                                  {/* Featured Ad Card Preview exactly matching screenshot */}
                                  <div 
                                    className="w-full h-[140px] p-3 rounded-xl text-white flex flex-col justify-between relative overflow-hidden select-none text-left shadow-inner shrink-0"
                                    style={{ backgroundColor: cardBgColor }}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-xs text-white border-2 border-white shrink-0">
                                        {logoInitials}
                                      </span>
                                      <span className="text-[13px] font-bold text-white truncate leading-tight">
                                        {deal.brand || 'Brand'}
                                      </span>
                                    </div>

                                    <div>
                                      <div className="text-[18px] font-bold font-mono text-white leading-none tracking-tight">
                                        {deal.code || 'NO CODE'}
                                      </div>
                                      <div className="flex justify-between items-center mt-1">
                                        <span className="text-[13px] text-[#fdc800] font-extrabold">{deal.discount || 'Discount'}</span>
                                        <span className="text-[11px] text-white font-medium">${deal.salePrice ? deal.salePrice.toFixed(0) : '0'}</span>
                                      </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-2 border-t border-white/10">
                                      <span className="text-[10px] text-white/95 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                        Exp: {deal.expiry || deal.expiryDays || 3}d
                                      </span>

                                      <div className="bg-white/20 px-2 py-0.5 rounded text-[9px] font-bold tracking-wider">
                                        COPY
                                      </div>
                                    </div>
                                  </div>

                                  {/* Info and action panel */}
                                  <div className="space-y-2 flex-1 flex flex-col justify-between">
                                    <div className="text-xs text-left">
                                      <p className="font-bold text-slate-800 line-clamp-1">{deal.title}</p>
                                      <p className="text-[10px] text-slate-500 font-semibold mt-1">Category: {deal.category} • {deal.state}</p>
                                    </div>
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => {
                                          setEditingFeaturedAd(deal);
                                          setEditingFeaturedAdIndex(idx);
                                          setFeaturedAdFormBrand(deal.brand || '');
                                          setFeaturedAdFormTitle(deal.title || '');
                                          setFeaturedAdFormCode(deal.code || '');
                                          setFeaturedAdFormDiscount(deal.discount || '');
                                          setFeaturedAdFormSalePrice(deal.salePrice || 0);
                                          setFeaturedAdFormOriginalPrice(deal.originalPrice || 0);
                                          setFeaturedAdFormExpiry(deal.expiry || deal.expiryDays || 3);
                                          setFeaturedAdFormBg(deal.brandColor || deal.bg || '');
                                          setFeaturedAdFormCategory(deal.category || 'Tech');
                                          setFeaturedAdFormState(deal.state || 'National');
                                          setFeaturedAdFormImage(deal.image || 'https://picsum.photos/seed/ads/400/200');
                                          setFeaturedAdFormDesc(deal.description || '');
                                          setFeaturedAdModalOpen(true);
                                        }}
                                        className="flex-1 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-[11px] cursor-pointer border-none transition-colors text-center"
                                      >
                                        Edit Details
                                      </button>
                                      <button
                                        onClick={() => {
                                          if (confirm(`Delete featured ad campaign for ${deal.brand}?`)) {
                                            setAllDeals(prev => prev.filter((_, i) => i !== idx));
                                            triggerToast('✕ Campaign deleted.', 'warning');
                                          }
                                        }}
                                        className="py-1.5 px-3 rounded-xl bg-error/10 hover:bg-error/20 text-error font-black text-[11px] cursor-pointer border-none transition-colors"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* ══════════════════════════════════════
                          TAB: BILLBOARD NOTICES
                      ══════════════════════════════════════ */}
                      {moderatorTab === 'banner' && (
                        <div className="space-y-6 animate-in fade-in duration-300 text-left">
                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                              <h3 className="font-headline font-bold text-xl text-on-surface">📢 Announcements Billboard</h3>
                            </div>
                            <button
                              onClick={() => {
                                const newTitle = prompt('Enter headline banner notice text:');
                                if (newTitle) {
                                  const newBannerObj = {
                                    id: 'ab' + (adminBanners.length + 1),
                                    title: newTitle,
                                    type: 'announcement',
                                    status: 'Active',
                                    bgColor: '#0d0d0d',
                                    textColor: '#fdc800',
                                    link: '',
                                    startDate: 'Today',
                                    endDate: '31 Dec 2025'
                                  };
                                  setAdminBanners(prev => [...prev, newBannerObj]);
                                  triggerToast('✓ Billboard announcement scheduled!', 'success');
                                }
                              }}
                              className="px-4 py-2.5 rounded-xl bg-primary hover:opacity-90 text-white font-bold text-xs cursor-pointer border-none shadow-sm transition-opacity"
                            >
                              Add New Notice
                            </button>
                          </div>

                          <div className="space-y-4">
                            {adminBanners.map(b => (
                              <div key={b.id} className="bg-white border border-outline-variant/30 rounded-2xl p-5 custom-shadow space-y-4 text-left">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="bg-surface-container text-on-surface-variant text-[10px] font-black px-2.5 py-0.5 rounded border border-outline-variant/30 uppercase">
                                      {b.type}
                                    </span>
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${b.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-surface-container text-on-surface-variant'
                                      }`}>
                                      {b.status}
                                    </span>
                                  </div>
                                  <p className="text-xs font-semibold text-on-surface-variant">
                                    Schedule: {b.startDate} - {b.endDate}
                                  </p>
                                </div>

                                <div className="rounded-xl p-4 flex items-center justify-between gap-4 select-none font-bold"
                                  style={{ backgroundColor: b.bgColor, color: b.textColor }}
                                >
                                  <p className="text-sm font-semibold truncate flex-1">{b.title}</p>
                                  {b.link && (
                                    <span className="text-[10px] uppercase font-black bg-white/20 px-2 py-0.5 rounded tracking-wider">
                                      Link: {b.link}
                                    </span>
                                  )}
                                </div>

                                <div className="pt-3 border-t border-outline-variant/10 flex justify-end gap-2 text-xs">
                                  <button
                                    onClick={() => {
                                      const newStatus = b.status === 'Active' ? 'Inactive' : 'Active';
                                      setAdminBanners(prev => prev.map(x => x.id === b.id ? { ...x, status: newStatus } : x));
                                      triggerToast(`Banner status updated to ${newStatus}`, 'info');
                                    }}
                                    className={`px-3.5 py-2 rounded-xl font-bold text-xs cursor-pointer border-none transition-colors ${b.status === 'Active' ? 'bg-amber-600/10 hover:bg-amber-600/20 text-amber-600' : 'bg-primary/10 hover:bg-primary/20 text-primary'
                                      }`}
                                  >
                                    {b.status === 'Active' ? 'Deactivate' : 'Activate'}
                                  </button>
                                  <button
                                    onClick={() => {
                                      setAdminBanners(prev => prev.filter(x => x.id !== b.id));
                                      triggerToast('✕ Billboard notice dismissed.', 'warning');
                                    }}
                                    className="px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-variant text-on-surface font-bold text-xs cursor-pointer border-none transition-colors"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </section>
                  </main>

                  {/* Reusable MobileDashboardNav bottom navigation drawer */}
                  <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#e8e8e8] z-[990] flex items-center gap-1.5 px-3 overflow-x-auto no-scrollbar shadow-[0_-4px_20px_rgba(0,0,0,0.06)] select-none">
                    {[
                      { key: 'overview', label: 'Overview', icon: 'dashboard' },
                      { key: 'flagged', label: 'Flagged Queue', icon: 'warning' },
                      { key: 'community', label: 'Manage coupons', icon: 'sell' },
                      { key: 'coupons', label: 'Featured ads', icon: 'ads_click' },
                      { key: 'banner', label: 'Billboard Notices', icon: 'campaign' },
                    ].map((tab) => {
                      const isActive = moderatorTab === tab.key;
                      return (
                        <button
                          key={tab.key}
                          onClick={() => setModeratorTab(tab.key)}
                          className={`flex flex-col items-center justify-center min-w-[72px] h-full transition-colors cursor-pointer border-none bg-transparent ${isActive ? 'text-[#047c1f]' : 'text-slate-400'}`}
                        >
                          <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                          <span className="text-[10px] font-extrabold mt-0.5 whitespace-nowrap">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                </div>
              ) : (
                <div className="py-20 text-center space-y-4 bg-white border border-outline-variant/30 rounded-3xl max-w-lg mx-auto custom-shadow mt-12 text-left p-8">
                  <p className="text-on-surface-variant font-bold">Please sign in with moderator credentials to access this dashboard.</p>
                  <button
                    onClick={() => { setAuthTab('login'); setLoginModalOpen(true); }}
                    className="px-5 py-2.5 rounded-full bg-primary hover:opacity-90 text-white font-bold text-sm transition-colors cursor-pointer border-none shadow-sm"
                  >
                    Switch to Moderator
                  </button>
                </div>
              )
            )}
          </>
        )}

      </main>

      {/* ==========================================
          FOOTER COMPONENT
      ========================================== */}
      <footer className={`bg-[#047c1f] border-t 
        border-[#035a16] text-white/80 mt-16 font-semibold 
        ${(isConsumerDashboard || isAdminDashboard || isModeratorDashboard)
          ? 'hidden' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

          <div className="hidden sm:grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-display font-extrabold text-lg shadow-sm">
                  <Tag className="w-4.5 h-4.5 text-[#047c1f]" />
                </div>
                <span className="font-display font-extrabold text-xl tracking-tight text-black">
                  7<span className="text-white">deals</span>
                </span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                {siteTagline}. The ultimate community deals platform for shoppers and merchants in Australia.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white mb-3">Quick Links</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#home" className="hover:text-[#fdc800] hover:underline decoration-[#fdc800] decoration-2 underline-offset-4 transition-colors">Trending Deals</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white mb-3">Consumer Partners</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#store/oztech-deals" className="hover:text-[#fdc800] hover:underline decoration-[#fdc800] decoration-2 underline-offset-4 transition-colors">OzTech Deals</a></li>
                <li><a href="#store/aussie-bites" className="hover:text-[#fdc800] hover:underline decoration-[#fdc800] decoration-2 underline-offset-4 transition-colors">Aussie Bites Bakery</a></li>
                <li><a href="#store/downunder-fashion" className="hover:text-[#fdc800] hover:underline decoration-[#fdc800] decoration-2 underline-offset-4 transition-colors">DownUnder Fashion</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white mb-3">Weekly Bargains</h4>
              <p className="text-xs text-white/70">Subscribe for weekly trending coupon code updates</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email address..."
                  className="bg-white/15 border border-white/20 text-xs px-3 py-2 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#fdc800] w-full"
                />
                <button
                  onClick={() => triggerToast('Subscribed to newsletter list!')}
                  className="px-3.5 py-2 rounded-xl bg-[#fdc800] hover:bg-[#e0b000] text-black font-bold text-xs shrink-0 transition-colors cursor-pointer"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex pt-8 border-t border-white/10 flex-col sm:flex-row items-center justify-between text-xs text-white/65 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-center sm:text-left">
              <p>&copy; {new Date().getFullYear()} {siteName} Platform Prototype.</p>
              <span className="hidden sm:inline">|</span>
              <div className="flex items-center justify-center gap-1">
                <span>🇦🇺</span>
                <span className="inline-flex items-center gap-1 bg-[#fdc800] text-black px-2.5 py-0.5 rounded-full font-bold text-[10px] shadow-sm">
                  Proudly Australian
                </span>
                <span>·</span> ABN: XX XXX XXX XXX
              </div>
            </div>
            <div className="flex gap-4">
              <a href="#home" className="hover:text-[#fdc800] hover:underline decoration-[#fdc800] decoration-2 underline-offset-4 transition-colors">About</a>
              <a href="#home" className="hover:text-[#fdc800] hover:underline decoration-[#fdc800] decoration-2 underline-offset-4 transition-colors">Contact</a>
              <a href="#home" className="hover:text-[#fdc800] hover:underline decoration-[#fdc800] decoration-2 underline-offset-4 transition-colors">Terms & Conditions</a>
              <a href="#home" className="hover:text-[#fdc800] hover:underline decoration-[#fdc800] decoration-2 underline-offset-4 transition-colors">Privacy Policy</a>
            </div>
          </div>
          {/* Mobile Footer */}
          <div className="flex sm:hidden flex-col items-center justify-center py-4 text-xs text-white/60 gap-3 text-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-display font-extrabold text-lg shadow-sm">
                <Tag className="w-4.5 h-4.5 text-[#047c1f]" />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                7<span className="text-white font-black">deals</span>
              </span>
            </div>
            <p>&copy; {new Date().getFullYear()} {siteName} Platform Prototype.</p>
          </div>

        </div>
      </footer>

      {/* ==========================================
          MODALS & OVERLAYS CONTAINER
      ========================================== */}

      {/* Checkout & Payment Modal */}
      {checkoutModalOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => {
            if (!paymentLoading) {
              setCheckoutModalOpen(false);
              setPaymentSuccess(false);
              setCheckoutStep('shipping');
              setShipToDifferent(false);
            }
          }}
        >
          <div
            className="w-full max-w-md bg-white rounded-[8px] border border-[#e8e8e8] border-t-4 border-t-[#047c1f] p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={() => {
                if (!paymentLoading) {
                  setCheckoutModalOpen(false);
                  setPaymentSuccess(false);
                  setCheckoutStep('shipping');
                  setShipToDifferent(false);
                }
              }}
              className="absolute right-4 top-4 p-1.5 rounded-[8px] text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {paymentSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#e6f2e8] text-[#047c1f] flex items-center justify-center mx-auto shadow-sm">
                  <span className="material-symbols-outlined text-[36px]">check_circle</span>
                </div>
                <h3 className="text-2xl font-display font-extrabold text-slate-900">Payment Successful!</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed font-semibold">
                  G'day! Your payment was processed successfully. The order has been sent to our partner stores for shipping.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setCheckoutModalOpen(false);
                      setPaymentSuccess(false);
                      setCheckoutStep('shipping');
                      setShipToDifferent(false);
                    }}
                    className="w-full bg-[#047c1f] hover:bg-[#036318] text-white py-2.5 rounded-[8px] text-sm font-bold shadow-md transition-colors cursor-pointer border-none"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="text-left border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-display font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#047c1f]">security</span>
                    Secure Checkout {checkoutStep === 'payment' && <span className="text-[10px] bg-[#e6f2e8] text-[#047c1f] px-2.5 py-0.5 rounded-full font-sans font-bold">Step 2 of 2</span>}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                    {checkoutStep === 'shipping' ? 'Step 1: Review your order details and enter delivery address.' : 'Step 2: Enter card details to complete your payment.'}
                  </p>
                </div>

                {/* Items Summary list */}
                <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-[8px] max-h-32 overflow-y-auto space-y-1.5">
                  {cart.map((item) => (
                    <div key={`${item.store.id}-${item.product.id}`} className="flex justify-between items-center text-[11px] font-semibold text-slate-650">
                      <div className="min-w-0 pr-2 text-left">
                        <p className="text-slate-800 truncate">{item.product.name}</p>
                        <p className="text-[9px] text-slate-400 font-medium">Store: {item.store.name} · Qty: {item.quantity}</p>
                      </div>
                      <span className="text-slate-700 shrink-0">{item.product.price}</span>
                    </div>
                  ))}
                </div>

                {/* Totals Summary */}
                <div className="space-y-1 text-xs font-bold border-t border-b border-slate-150 py-2.5">
                  <div className="flex justify-between text-slate-600 font-semibold text-[11px]">
                    <span>Subtotal</span>
                    <span>${cartTotals.subtotal.toFixed(2)} AUD</span>
                  </div>
                  {cartTotals.discount > 0 && (
                    <div className="flex justify-between text-[#047c1f] text-[11px]">
                      <span>Discount (Store Promos)</span>
                      <span>-${cartTotals.discount.toFixed(2)} AUD</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-500 font-semibold text-[11px]">
                    <span>Includes GST (10%)</span>
                    <span>${(cartTotals.total / 11).toFixed(2)} AUD</span>
                  </div>
                  <div className="flex justify-between text-slate-900 text-base border-t border-slate-100 pt-2 font-display font-extrabold">
                    <span>Total Amount</span>
                    <span className="text-[#047c1f]">${cartTotals.total.toFixed(2)} AUD</span>
                  </div>
                </div>

                {/* Payment Fields Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (paymentLoading) return;
                    setPaymentLoading(true);

                    setTimeout(() => {
                      setPaymentLoading(false);
                      setPaymentSuccess(true);

                      const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
                      const orderDate = new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
                      const trackingNo = 'AP-' + Math.floor(100000000 + Math.random() * 900000000);
                      const newOrder = {
                        id: orderId,
                        date: orderDate,
                        items: [...cart],
                        subtotal: cartTotals.subtotal,
                        discount: cartTotals.discount,
                        total: cartTotals.total,
                        status: 'In Transit',
                        carrier: 'Australia Post',
                        trackingNumber: trackingNo,
                        shipping: shipToDifferent ? { ...diffShippingForm, email: shippingForm.email, phone: shippingForm.phone } : { ...shippingForm },
                        timeline: [
                          { title: 'Order Placed', desc: 'Order received and payment approved', time: 'Just now', done: true },
                          { title: 'Processing', desc: 'Packed and prepared at merchant warehouse', time: 'Expected in 1 day', done: false },
                          { title: 'Shipped', desc: `Handed over to Australia Post · Tracking ID: ${trackingNo}`, time: 'Expected in 2 days', done: false },
                          { title: 'Out for Delivery', desc: 'Arriving at your local delivery center', time: 'Expected in 3 days', done: false }
                        ]
                      };
                      setPurchaseHistory(prev => [newOrder, ...prev]);
                      setCart([]);
                      setAppliedCoupons({});
                      setPaymentForm({ cardholderName: '', cardNumber: '', expiry: '', cvv: '' });
                      setShippingForm({
                        fullName: '',
                        email: '',
                        phone: '',
                        address: '',
                        suburb: '',
                        state: 'NSW',
                        postcode: ''
                      });
                      setDiffShippingForm({
                        fullName: '',
                        address: '',
                        suburb: '',
                        state: 'NSW',
                        postcode: ''
                      });
                      setShipToDifferent(false);
                      setCheckoutStep('shipping');
                      triggerToast(`Payment processed successfully for ${orderId}!`, 'success');
                    }, 1500);
                  }}
                  className="space-y-4 text-left"
                >
                  {checkoutStep === 'shipping' ? (
                    <div className="space-y-4">
                      {/* Contact & Delivery Details Section */}
                      <div className="space-y-3 pb-3">
                        <p className="text-[10px] font-black text-[#047c1f] uppercase tracking-wider flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[15px]">local_shipping</span> Contact & Customer Details
                        </p>

                        <div className="space-y-0.5">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Jane Citizen"
                            value={shippingForm.fullName}
                            onChange={(e) => setShippingForm(prev => ({ ...prev, fullName: e.target.value }))}
                            className="w-full px-3 py-2 rounded-[6px] border border-slate-200 text-sm focus:border-[#047c1f] focus:outline-none focus:ring-1 focus:ring-[#047c1f]/20"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-0.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Email Address</label>
                            <input
                              type="email"
                              required
                              placeholder="jane@example.com"
                              value={shippingForm.email}
                              onChange={(e) => setShippingForm(prev => ({ ...prev, email: e.target.value }))}
                              className="w-full px-3 py-2 rounded-[6px] border border-slate-200 text-sm focus:border-[#047c1f] focus:outline-none focus:ring-1 focus:ring-[#047c1f]/20"
                            />
                          </div>
                          <div className="space-y-0.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Phone Number</label>
                            <input
                              type="tel"
                              required
                              placeholder="e.g. 0412 345 678"
                              value={shippingForm.phone}
                              onChange={(e) => setShippingForm(prev => ({ ...prev, phone: e.target.value }))}
                              className="w-full px-3 py-2 rounded-[6px] border border-slate-200 text-sm focus:border-[#047c1f] focus:outline-none focus:ring-1 focus:ring-[#047c1f]/20"
                            />
                          </div>
                        </div>

                        <div className="space-y-0.5 pt-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Billing / Home Address</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 123 George St"
                            value={shippingForm.address}
                            onChange={(e) => setShippingForm(prev => ({ ...prev, address: e.target.value }))}
                            className="w-full px-3 py-2 rounded-[6px] border border-slate-200 text-sm focus:border-[#047c1f] focus:outline-none focus:ring-1 focus:ring-[#047c1f]/20"
                          />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          <div className="col-span-2 sm:col-span-1 space-y-0.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Suburb</label>
                            <input
                              type="text"
                              required
                              placeholder="Sydney"
                              value={shippingForm.suburb}
                              onChange={(e) => setShippingForm(prev => ({ ...prev, suburb: e.target.value }))}
                              className="w-full px-2 py-2 rounded-[6px] border border-slate-200 text-sm focus:border-[#047c1f] focus:outline-none focus:ring-1 focus:ring-[#047c1f]/20"
                            />
                          </div>
                          <div className="space-y-0.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">State</label>
                            <select
                              value={shippingForm.state}
                              onChange={(e) => setShippingForm(prev => ({ ...prev, state: e.target.value }))}
                              className="w-full px-2 py-2 rounded-[6px] border border-slate-200 text-sm bg-white focus:border-[#047c1f] focus:outline-none focus:ring-1 focus:ring-[#047c1f]/20"
                            >
                              <option value="NSW">NSW</option>
                              <option value="VIC">VIC</option>
                              <option value="QLD">QLD</option>
                              <option value="WA">WA</option>
                              <option value="SA">SA</option>
                              <option value="TAS">TAS</option>
                              <option value="ACT">ACT</option>
                              <option value="NT">NT</option>
                            </select>
                          </div>
                          <div className="space-y-0.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Postcode</label>
                            <input
                              type="text"
                              required
                              pattern="\d{4}"
                              maxLength="4"
                              placeholder="2000"
                              value={shippingForm.postcode}
                              onChange={(e) => {
                                const val = e.target.value.replace(/[^0-9]/gi, '');
                                setShippingForm(prev => ({ ...prev, postcode: val }));
                              }}
                              className="w-full px-2 py-2 rounded-[6px] border border-slate-200 text-sm focus:border-[#047c1f] focus:outline-none focus:ring-1 focus:ring-[#047c1f]/20"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1 pb-1 border-t border-slate-100">
                        <input
                          type="checkbox"
                          id="shipToDifferent"
                          checked={shipToDifferent}
                          onChange={(e) => setShipToDifferent(e.target.checked)}
                          className="w-4 h-4 text-[#047c1f] border-slate-300 rounded focus:ring-[#047c1f]"
                        />
                        <label htmlFor="shipToDifferent" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                          Ship to a different address?
                        </label>
                      </div>

                      {shipToDifferent && (
                        <div className="space-y-3 pt-3 border-t border-slate-150 animate-in slide-in-from-top-2 duration-200">
                          <p className="text-[10px] font-black text-[#047c1f] uppercase tracking-wider flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[15px]">local_shipping</span> Separate Shipping Delivery Address
                          </p>

                          <div className="space-y-0.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Recipient's Full Name</label>
                            <input
                              type="text"
                              required={shipToDifferent}
                              placeholder="e.g. Recipient Name"
                              value={diffShippingForm.fullName}
                              onChange={(e) => setDiffShippingForm(prev => ({ ...prev, fullName: e.target.value }))}
                              className="w-full px-3 py-2 rounded-[6px] border border-slate-200 text-sm focus:border-[#047c1f] focus:outline-none focus:ring-1 focus:ring-[#047c1f]/20"
                            />
                          </div>

                          <div className="space-y-0.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Shipping Street Address</label>
                            <input
                              type="text"
                              required={shipToDifferent}
                              placeholder="e.g. 456 Delivery Rd"
                              value={diffShippingForm.address}
                              onChange={(e) => setDiffShippingForm(prev => ({ ...prev, address: e.target.value }))}
                              className="w-full px-3 py-2 rounded-[6px] border border-slate-200 text-sm focus:border-[#047c1f] focus:outline-none focus:ring-1 focus:ring-[#047c1f]/20"
                            />
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            <div className="col-span-2 sm:col-span-1 space-y-0.5">
                              <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Suburb</label>
                              <input
                                type="text"
                                required={shipToDifferent}
                                placeholder="Melbourne"
                                value={diffShippingForm.suburb}
                                onChange={(e) => setDiffShippingForm(prev => ({ ...prev, suburb: e.target.value }))}
                                className="w-full px-2 py-2 rounded-[6px] border border-slate-200 text-sm focus:border-[#047c1f] focus:outline-none focus:ring-1 focus:ring-[#047c1f]/20"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">State</label>
                              <select
                                value={diffShippingForm.state}
                                onChange={(e) => setDiffShippingForm(prev => ({ ...prev, state: e.target.value }))}
                                className="w-full px-2 py-2 rounded-[6px] border border-slate-200 text-sm bg-white focus:border-[#047c1f] focus:outline-none focus:ring-1 focus:ring-[#047c1f]/20"
                              >
                                <option value="NSW">NSW</option>
                                <option value="VIC">VIC</option>
                                <option value="QLD">QLD</option>
                                <option value="WA">WA</option>
                                <option value="SA">SA</option>
                                <option value="TAS">TAS</option>
                                <option value="ACT">ACT</option>
                                <option value="NT">NT</option>
                              </select>
                            </div>
                            <div className="space-y-0.5">
                              <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Postcode</label>
                              <input
                                type="text"
                                required={shipToDifferent}
                                pattern="\d{4}"
                                maxLength="4"
                                placeholder="3000"
                                value={diffShippingForm.postcode}
                                onChange={(e) => {
                                  const val = e.target.value.replace(/[^0-9]/gi, '');
                                  setDiffShippingForm(prev => ({ ...prev, postcode: val }));
                                }}
                                className="w-full px-2 py-2 rounded-[6px] border border-slate-200 text-sm focus:border-[#047c1f] focus:outline-none focus:ring-1 focus:ring-[#047c1f]/20"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          if (!shippingForm.fullName || !shippingForm.email || !shippingForm.phone || !shippingForm.address || !shippingForm.suburb || !shippingForm.postcode) {
                            triggerToast('Please fill out all required contact and billing details, mate!', 'warning');
                            return;
                          }
                          if (shipToDifferent) {
                            if (!diffShippingForm.fullName || !diffShippingForm.address || !diffShippingForm.suburb || !diffShippingForm.postcode) {
                              triggerToast('Please fill out all separate shipping address details!', 'warning');
                              return;
                            }
                          }
                          setCheckoutStep('payment');
                        }}
                        className="w-full bg-[#047c1f] hover:bg-[#036318] text-white py-2.5 rounded-[8px] font-bold text-sm shadow-md transition-colors cursor-pointer border-none flex items-center justify-center gap-2 mt-2"
                      >
                        <span>Next: Payment Details</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Payment Card Details Section */}
                      <div className="space-y-3">
                        <p className="text-[10px] font-black text-[#047c1f] uppercase tracking-wider flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[15px]">credit_card</span> Payment Details
                        </p>

                        <div className="space-y-0.5">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Cardholder Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. John Citizen"
                            value={paymentForm.cardholderName}
                            onChange={(e) => setPaymentForm(prev => ({ ...prev, cardholderName: e.target.value }))}
                            className="w-full px-3 py-2 rounded-[6px] border border-slate-200 text-sm focus:border-[#047c1f] focus:outline-none focus:ring-1 focus:ring-[#047c1f]/20"
                          />
                        </div>

                        <div className="space-y-0.5">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Card Number</label>
                          <input
                            type="text"
                            required
                            pattern="[0-9 ]{10,22}"
                            maxLength="19"
                            placeholder="xxxx xxxx xxxx xxxx"
                            value={paymentForm.cardNumber}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                              const matches = val.match(/\d{4,16}/g);
                              const match = (matches && matches[0]) || '';
                              const parts = [];
                              for (let i = 0, len = match.length; i < len; i += 4) {
                                parts.push(match.substring(i, i + 4));
                              }
                              const formatted = parts.length > 0 ? parts.join(' ') : val;
                              setPaymentForm(prev => ({ ...prev, cardNumber: formatted }));
                            }}
                            className="w-full px-3 py-2 rounded-[6px] border border-slate-200 text-sm focus:border-[#047c1f] focus:outline-none focus:ring-1 focus:ring-[#047c1f]/20"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-0.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Expiry Date</label>
                            <input
                              type="text"
                              required
                              maxLength="5"
                              placeholder="MM/YY"
                              value={paymentForm.expiry}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                                let formatted = val;
                                if (val.length >= 2) {
                                  formatted = val.substring(0, 2) + '/' + val.substring(2, 4);
                                }
                                setPaymentForm(prev => ({ ...prev, expiry: formatted }));
                              }}
                              className="w-full px-3 py-2 rounded-[6px] border border-slate-200 text-sm focus:border-[#047c1f] focus:outline-none focus:ring-1 focus:ring-[#047c1f]/20"
                            />
                          </div>
                          <div className="space-y-0.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">CVV</label>
                            <input
                              type="password"
                              required
                              maxLength="3"
                              placeholder="123"
                              value={paymentForm.cvv}
                              onChange={(e) => {
                                const val = e.target.value.replace(/[^0-9]/gi, '');
                                setPaymentForm(prev => ({ ...prev, cvv: val }));
                              }}
                              className="w-full px-3 py-2 rounded-[6px] border border-slate-200 text-sm focus:border-[#047c1f] focus:outline-none focus:ring-1 focus:ring-[#047c1f]/20"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => setCheckoutStep('shipping')}
                          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-[8px] font-bold text-sm transition-colors cursor-pointer border border-slate-200 flex items-center justify-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                          <span>Back</span>
                        </button>
                        <button
                          type="submit"
                          disabled={paymentLoading}
                          className="flex-[2] bg-[#047c1f] hover:bg-[#036318] text-white py-2.5 rounded-[8px] font-bold text-sm shadow-md transition-colors cursor-pointer border-none flex items-center justify-center gap-2"
                        >
                          {paymentLoading ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined text-xs">lock</span>
                              <span>Pay ${cartTotals.total.toFixed(2)} AUD</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 1. Simulated Authentication Modal */}
      {loginModalOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setLoginModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-[8px] border border-[#e8e8e8] border-t-4 border-t-[#047c1f] p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={() => setLoginModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-[8px] text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4 text-center">
              <h3 className="font-display font-extrabold text-2xl text-slate-900">Access {siteName}</h3>
              <div className="flex border-b border-[#e8e8e8] font-bold">
                <button
                  onClick={() => setAuthTab('login')}
                  className={`flex-1 pb-2 text-sm transition-colors border-b-2 ${authTab === 'login' ? 'border-[#047c1f] text-[#047c1f]' : 'border-transparent text-slate-400 hover:text-[#047c1f]'}`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthTab('register')}
                  className={`flex-1 pb-2 text-sm transition-colors border-b-2 ${authTab === 'register' ? 'border-[#047c1f] text-[#047c1f]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                  Create Account
                </button>
              </div>
            </div>

            {/* LOGIN FORM */}
            {authTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4 font-semibold">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Demo Account Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. user@demo.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white p-3 text-sm border border-[#e8e8e8] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white p-3 text-sm border border-[#e8e8e8] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-[8px] bg-[#047c1f] hover:bg-[#036318] text-white font-bold text-sm transition-colors shadow-md shadow-[#047c1f]/10 cursor-pointer"
                >
                  Sign In
                </button>

                <div className="bg-slate-50 p-3.5 rounded-[8px] border border-[#e8e8e8] space-y-1.5 text-xs text-slate-500">
                  <p className="font-extrabold text-slate-700 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-slate-400" /> Demo Logins to use:
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong className="text-[#047c1f]">user@demo.com</strong> / password (Regular)</li>
                    <li><strong className="text-emerald-600">consumer@demo.com</strong> / password (Consumer)</li>
                    <li><strong className="text-slate-900">admin@demo.com</strong> / password (Admin)</li>
                    <li><strong className="text-blue-600">mod@demo.com</strong> / password (Moderator)</li>
                  </ul>
                </div>
              </form>
            )}

            {/* REGISTER FORM */}
            {authTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4 font-semibold">
                <p className="text-xs text-slate-500 font-bold mb-2">
                  Join thousands of Aussie bargain hunters! 🇦🇺
                </p>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Matilda W."
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white p-3 text-sm border border-[#e8e8e8] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="matilda@gmail.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white p-3 text-sm border border-[#e8e8e8] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Choose password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white p-3 text-sm border border-[#e8e8e8] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20 transition-all"
                  />
                </div>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-650 cursor-pointer pt-1 select-none">
                  <input
                    type="checkbox"
                    checked={authIsConsumer}
                    onChange={(e) => setAuthIsConsumer(e.target.checked)}
                    className="rounded border-slate-350 text-[#047c1f] focus:ring-[#047c1f]/20 cursor-pointer w-4 h-4"
                  />
                  <span>Register as Store Merchant (Consumer Partner)</span>
                </label>

                {authIsConsumer && (
                  <div className="bg-[#fdc800]/10 p-4 rounded-[8px] border border-[#fdc800] space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
                    <p className="text-[10px] text-amber-700 font-bold bg-[#fff9e6] p-2 rounded border border-[#fdc800]/20">
                      Consumer accounts need admin verification. We'll be in touch within 1 business day (AEST).
                    </p>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Store / Business Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. DownUnder Style"
                        value={authBusinessName}
                        onChange={(e) => setAuthBusinessName(e.target.value)}
                        className="w-full bg-white p-2.5 text-xs border border-[#e8e8e8] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20 transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Business Category</label>
                      <select
                        value={authBusinessCategory}
                        onChange={(e) => setAuthBusinessCategory(e.target.value)}
                        className="w-full bg-white p-2.5 text-xs border border-[#e8e8e8] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20 transition-all"
                      >
                        {CATEGORY_NAMES.map(c => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-[8px] bg-[#047c1f] hover:bg-[#035a16] text-white font-bold text-sm shadow-md shadow-[#047c1f]/10 cursor-pointer"
                >
                  Create Demo Session
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* 2. Simulated External Checkout Redirection Modal */}
      {redirectModalOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setRedirectModalOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-[8px] border border-[#e8e8e8] p-5 sm:p-8 space-y-4 text-center shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="w-12 h-12 bg-[#e6f2e8] rounded-full flex items-center justify-center text-[#047c1f] mx-auto">
              <ShoppingBag className="w-6 h-6" />
            </div>

            <h3 className="font-display font-extrabold text-xl text-slate-950">Redirecting to Checkout</h3>

            <p className="text-sm text-slate-500 leading-relaxed font-semibold">
              We are routing you to the checkout terminal of <strong className="text-slate-800">{redirectStoreName}</strong>. Make sure to paste your copied promo code at the checkout step.
            </p>

            <div className="w-full bg-slate-100 h-1.5 rounded-[8px] overflow-hidden relative">
              <div className="bg-[#047c1f] h-full rounded-[8px] animate-[pulse_1.5s_infinite]" style={{ width: '60%' }}></div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setRedirectModalOpen(false)}
                className="flex-1 py-2.5 rounded-[8px] border border-[#e8e8e8] text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setRedirectModalOpen(false);
                  triggerToast('Redirection complete.', 'success');
                  setCurrentRoute('#profile');
                  setProfileTab('cart');
                }}
                className="flex-1 py-2.5 rounded-[8px] bg-[#047c1f] hover:bg-[#035a16] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Community Post Deal Modal */}
      {postModalOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setPostModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-[8px] border border-[#e8e8e8] p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={() => setPostModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-[8px] text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 text-left">
              <h3 className="font-display font-extrabold text-2xl text-slate-950">Aussie Deal Community 🇦🇺</h3>
              <p className="text-xs text-slate-500 font-bold">Real deals found by real Aussies</p>
            </div>

            <form onSubmit={handlePostDeal} className="space-y-4 font-semibold text-left">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Deal Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Half price chips at Woolies"
                  value={newDealTitle}
                  onChange={(e) => setNewDealTitle(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white p-3 text-sm border border-[#e8e8e8] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Store / Retailer Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Woolworths, JB Hi-Fi..."
                    value={newDealCode}
                    onChange={(e) => setNewDealCode(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white p-3 text-sm border border-[#e8e8e8] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                  <select
                    value={newDealCategory}
                    onChange={(e) => setNewDealCategory(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white p-3 text-sm border border-[#e8e8e8] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20 transition-all"
                  >
                    {CATEGORIES.slice(1).map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Link</label>
                  <input
                    type="text"
                    placeholder="Paste the deal link here, mate"
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white p-3 text-sm border border-[#e8e8e8] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Target State</label>
                  <select
                    value={newDealState}
                    onChange={(e) => setNewDealState(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white p-3 text-sm border border-[#e8e8e8] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20 transition-all"
                  >
                    <option>National</option>
                    <option>NSW</option>
                    <option>VIC</option>
                    <option>QLD</option>
                    <option>WA</option>
                    <option>SA</option>
                    <option>TAS</option>
                    <option>ACT</option>
                    <option>NT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Original Price (AUD)</label>
                  <input
                    type="number"
                    placeholder="e.g. 50"
                    value={newDealOrigPrice}
                    onChange={(e) => setNewDealOrigPrice(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white p-3 text-sm border border-[#e8e8e8] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Sale Price (AUD)</label>
                  <input
                    type="number"
                    placeholder="e.g. 25"
                    value={newDealDiscPrice}
                    onChange={(e) => setNewDealDiscPrice(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white p-3 text-sm border border-[#e8e8e8] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#047c1f]/20 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-[8px] bg-[#047c1f] hover:bg-[#035a16] text-white font-bold text-sm shadow-md shadow-[#047c1f]/10 transition-colors cursor-pointer"
              >
                Post to Aussie Feed
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- Manage Coupon Ticker Modal --- */}
      {couponModalOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setCouponModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#0d0d0d] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200 text-left text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setCouponModalOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors cursor-pointer border-none bg-transparent"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {/* Modal Title */}
            <div>
              <h3 className="font-headline font-black text-lg text-white">
                {editingCouponIndex === -1 ? 'Add New Coupon Ticker' : 'Edit Coupon Ticker'}
              </h3>
              <p className="text-[10px] text-white/50 tracking-wider uppercase font-bold mt-0.5">
                {editingCouponIndex === -1 ? 'Create dynamic marquee coupon' : 'Modify dynamic marquee coupon'}
              </p>
            </div>

            {/* Live Preview Card matching the screenshot */}
            <div className="space-y-2">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Live Visual Preview</span>
              <div className="bg-[#141414] border border-white/5 p-4 rounded-2xl flex items-center justify-center min-h-[60px]">
                <div
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border shadow-sm select-none transition-all duration-300"
                  style={{
                    backgroundColor: couponFormBg || (BRAND_PILL_COLORS[couponFormBrand] || DEFAULT_PILL_COLOR).bg,
                    borderColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  {renderBrandDot(couponFormBrand)}
                  <span className="font-bold text-xs" style={{ color: "rgba(255,255,255,0.95)" }}>
                    {couponFormBrand || 'Store Name'}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#fdc800] text-black">
                    {couponFormCode.toUpperCase() || 'CODE'}
                  </span>
                  <span className="font-bold text-xs" style={{ color: "#fdc800" }}>
                    {couponFormDiscount || 'Discount'}
                  </span>
                  <div className="flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded text-[10px] text-white/80 font-bold font-mono">
                    <span className="material-symbols-outlined text-[10px] leading-none text-amber-400">schedule</span>
                    <span>{couponFormExpiryDays}d</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!couponFormBrand.trim() || !couponFormCode.trim() || !couponFormDiscount.trim()) {
                  triggerToast('⚠️ Please fill in all fields!', 'warning');
                  return;
                }

                const updatedCoupon = {
                  brand: couponFormBrand.trim(),
                  code: couponFormCode.trim().toUpperCase(),
                  discount: couponFormDiscount.trim(),
                  expiryDays: parseInt(couponFormExpiryDays) || 3,
                  bg: couponFormBg.trim()
                };

                if (editingCouponIndex === -1) {
                  // Add new
                  if (editingCouponRow === 'A') {
                    setTickerPillsA(prev => [...prev, updatedCoupon]);
                  } else {
                    setTickerPillsB(prev => [...prev, updatedCoupon]);
                  }
                  triggerToast('✓ Dynamic coupon ticker created!', 'success');
                } else {
                  // Edit existing
                  if (editingCouponRow === 'A') {
                    setTickerPillsA(prev => prev.map((p, i) => i === editingCouponIndex ? updatedCoupon : p));
                  } else {
                    setTickerPillsB(prev => prev.map((p, i) => i === editingCouponIndex ? updatedCoupon : p));
                  }
                  triggerToast('✓ Coupon ticker changes saved!', 'success');
                }

                setCouponModalOpen(false);
              }}
              className="space-y-4"
            >
              {/* Brand Name Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-white/60 uppercase tracking-wider block">Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g., Woolworths, JB Hi-Fi"
                  value={couponFormBrand}
                  onChange={(e) => setCouponFormBrand(e.target.value)}
                  className="w-full bg-[#141414] text-white placeholder-white/30 p-3 text-xs border border-white/10 rounded-xl focus:outline-none focus:border-[#047c1f] focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-semibold"
                />
              </div>

              {/* Coupon Code Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-white/60 uppercase tracking-wider block">Coupon Code</label>
                <input
                  type="text"
                  placeholder="e.g., WOOLIES10"
                  value={couponFormCode}
                  onChange={(e) => setCouponFormCode(e.target.value)}
                  className="w-full bg-[#141414] text-white placeholder-white/30 p-3 text-xs border border-white/10 rounded-xl focus:outline-none focus:border-[#047c1f] focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-mono font-bold uppercase"
                />
              </div>

              {/* Discount Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-white/60 uppercase tracking-wider block">Discount Description</label>
                <input
                  type="text"
                  placeholder="e.g., 10% OFF, $800 OFF, BOGO"
                  value={couponFormDiscount}
                  onChange={(e) => setCouponFormDiscount(e.target.value)}
                  className="w-full bg-[#141414] text-white placeholder-white/30 p-3 text-xs border border-white/10 rounded-xl focus:outline-none focus:border-[#047c1f] focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-semibold"
                />
              </div>

              {/* Background Color picker & presets */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/60 uppercase tracking-wider block">Background Color</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Woolies Green', bg: '#006B3C' },
                    { name: 'Navy', bg: '#1A1A2E' },
                    { name: 'Charcoal', bg: '#1c1c1c' },
                    { name: 'Crimson', bg: '#B71C1C' },
                    { name: 'Royal Blue', bg: '#1565C0' },
                    { name: 'Orange', bg: '#D84315' },
                    { name: 'Purple', bg: '#4A148C' }
                  ].map((color) => {
                    const isSelected = couponFormBg === color.bg;
                    return (
                      <button
                        key={color.bg}
                        type="button"
                        onClick={() => setCouponFormBg(color.bg)}
                        title={color.name}
                        className="w-6 h-6 rounded-full cursor-pointer relative border border-white/20 hover:scale-105 active:scale-95 transition-transform"
                        style={{ backgroundColor: color.bg }}
                      >
                        {isSelected && (
                          <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                  {/* Reset back to brand default */}
                  <button
                    type="button"
                    onClick={() => setCouponFormBg('')}
                    className={`px-2.5 py-0.5 rounded-md text-[9px] font-bold cursor-pointer border hover:bg-white/10 transition-colors uppercase ${
                      couponFormBg === '' ? 'border-[#047c1f] text-[#047c1f]' : 'border-white/10 text-white/60'
                    }`}
                  >
                    Default
                  </button>
                </div>

                {/* Custom Color Input */}
                <div className="flex items-center gap-2 mt-1">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/20">
                    <input
                      type="color"
                      value={couponFormBg || '#000000'}
                      onChange={(e) => setCouponFormBg(e.target.value)}
                      className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer scale-150"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Custom Hex Code (e.g., #007837)"
                    value={couponFormBg}
                    onChange={(e) => setCouponFormBg(e.target.value)}
                    className="flex-1 bg-[#141414] text-white placeholder-white/30 p-2 text-xs border border-white/10 rounded-xl focus:outline-none focus:border-[#047c1f] focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-mono font-bold"
                  />
                </div>
              </div>

              {/* Grid of Expiry & Row choice */}
              <div className="grid grid-cols-2 gap-4">
                {/* Expiry Days Slider/Number */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-white/60 uppercase tracking-wider block">Expiry Days</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={couponFormExpiryDays}
                    onChange={(e) => setCouponFormExpiryDays(parseInt(e.target.value) || 1)}
                    className="w-full bg-[#141414] text-white p-3 text-xs border border-white/10 rounded-xl focus:outline-none focus:border-[#047c1f] focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-semibold"
                  />
                </div>

                {/* Target Row Selection */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-white/60 uppercase tracking-wider block">Ticker Row</label>
                  <select
                    value={editingCouponRow}
                    onChange={(e) => setEditingCouponRow(e.target.value)}
                    disabled={editingCouponIndex !== -1} // locked during edits
                    className="w-full bg-[#141414] text-white p-3 text-xs border border-white/10 rounded-xl focus:outline-none focus:border-[#047c1f] focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-semibold disabled:opacity-55"
                  >
                    <option value="A">Row A (Left)</option>
                    <option value="B">Row B (Right)</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 mt-2 rounded-xl bg-[#047c1f] hover:bg-[#035a16] text-white font-black text-xs shadow-md shadow-[#047c1f]/10 cursor-pointer border-none transition-colors uppercase tracking-wider animate-pulse hover:animate-none"
              >
                {editingCouponIndex === -1 ? '✓ Create Coupon Ticker' : '✓ Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- Manage Featured Ad Modal --- */}
      {featuredAdModalOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setFeaturedAdModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 animate-in zoom-in-95 duration-200 text-left text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setFeaturedAdModalOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors cursor-pointer border-none bg-transparent"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {/* Modal Title */}
            <div>
              <h3 className="font-headline font-black text-lg text-white">
                {editingFeaturedAdIndex === -1 ? 'Add New Featured Ad Campaign' : 'Edit Featured Ad Campaign'}
              </h3>
              <p className="text-[10px] text-white/50 tracking-wider uppercase font-bold mt-0.5">
                {editingFeaturedAdIndex === -1 ? 'Program premium colorful ticker card' : 'Modify premium colorful ticker card'}
              </p>
            </div>

            {/* Live Preview Card matching the screenshot style */}
            <div className="space-y-2">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Live Visual Card Preview</span>
              <div className="bg-[#141414] border border-white/5 p-6 rounded-2xl flex items-center justify-center min-h-[160px]">
                <div
                  className="w-[200px] h-[140px] p-3 rounded-xl text-white flex flex-col justify-between relative overflow-hidden select-none text-left shadow-inner transition-all duration-300 shrink-0"
                  style={{
                    backgroundColor: featuredAdFormBg || TICKER_BRAND_COLORS[featuredAdFormBrand] || '#047c1f'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-xs text-white border-2 border-white shrink-0">
                      {featuredAdFormBrand ? featuredAdFormBrand.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'AD'}
                    </span>
                    <span className="text-[13px] font-bold text-white truncate leading-tight">
                      {featuredAdFormBrand || 'Brand Name'}
                    </span>
                  </div>

                  <div>
                    <div className="text-[18px] font-bold font-mono text-white leading-none tracking-tight">
                      {featuredAdFormCode.toUpperCase() || 'PROMOCODE'}
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[13px] text-[#fdc800] font-extrabold">{featuredAdFormDiscount || 'Discount'}</span>
                      <span className="text-[11px] text-white font-medium">${parseFloat(featuredAdFormSalePrice || 0).toFixed(0)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/10">
                    <span className="text-[10px] text-white/95 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Exp: {featuredAdFormExpiry}d
                    </span>

                    <div className="bg-white/20 px-2 py-0.5 rounded text-[9px] font-bold tracking-wider">
                      COPY
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!featuredAdFormBrand.trim() || !featuredAdFormTitle.trim() || !featuredAdFormCode.trim() || !featuredAdFormDiscount.trim()) {
                  triggerToast('⚠️ Please fill in all required fields (Brand, Title, Code, Discount)!', 'warning');
                  return;
                }

                const logoInit = featuredAdFormBrand.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

                const finalAd = {
                  id: editingFeaturedAdIndex === -1 ? `d_custom_${Date.now()}` : editingFeaturedAd.id,
                  brand: featuredAdFormBrand.trim(),
                  logo: logoInit,
                  logoBg: `bg-slate-900 text-white`,
                  title: featuredAdFormTitle.trim(),
                  code: featuredAdFormCode.trim().toUpperCase(),
                  originalPrice: parseFloat(featuredAdFormOriginalPrice) || 0,
                  salePrice: parseFloat(featuredAdFormSalePrice) || 0,
                  discount: featuredAdFormDiscount.trim(),
                  expiry: parseInt(featuredAdFormExpiry) || 3,
                  expiryDays: parseInt(featuredAdFormExpiry) || 3,
                  category: featuredAdFormCategory,
                  state: featuredAdFormState,
                  image: featuredAdFormImage.trim() || 'https://picsum.photos/seed/ads/400/200',
                  description: featuredAdFormDesc.trim(),
                  brandColor: featuredAdFormBg.trim() || undefined,
                  bg: featuredAdFormBg.trim() || undefined
                };

                if (editingFeaturedAdIndex === -1) {
                  // Add new
                  setAllDeals(prev => [finalAd, ...prev]);
                  triggerToast('✓ Featured Ad campaign created!', 'success');
                } else {
                  // Edit existing
                  setAllDeals(prev => prev.map((item, idx) => idx === editingFeaturedAdIndex ? finalAd : item));
                  triggerToast('✓ Featured Ad campaign saved!', 'success');
                }

                setFeaturedAdModalOpen(false);
              }}
              className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 no-scrollbar"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Brand Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-white/60 uppercase tracking-wider block">Brand Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Woolworths"
                    value={featuredAdFormBrand}
                    onChange={(e) => setFeaturedAdFormBrand(e.target.value)}
                    className="w-full bg-[#141414] text-white p-3 text-xs border border-white/10 rounded-xl focus:outline-none focus:border-[#047c1f] focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-semibold"
                  />
                </div>

                {/* Coupon Code */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-white/60 uppercase tracking-wider block">Promo Code</label>
                  <input
                    type="text"
                    placeholder="e.g. WOOLIES10"
                    value={featuredAdFormCode}
                    onChange={(e) => setFeaturedAdFormCode(e.target.value)}
                    className="w-full bg-[#141414] text-white p-3 text-xs border border-white/10 rounded-xl focus:outline-none focus:border-[#047c1f] focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-mono font-bold uppercase"
                  />
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-white/60 uppercase tracking-wider block">Campaign Ad Title</label>
                <input
                  type="text"
                  placeholder="e.g. Half Price Cadbury Blocks & Kettle Chips"
                  value={featuredAdFormTitle}
                  onChange={(e) => setFeaturedAdFormTitle(e.target.value)}
                  className="w-full bg-[#141414] text-white p-3 text-xs border border-white/10 rounded-xl focus:outline-none focus:border-[#047c1f] focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-semibold"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {/* Discount */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-white/60 uppercase tracking-wider block">Discount Text</label>
                  <input
                    type="text"
                    placeholder="50% OFF"
                    value={featuredAdFormDiscount}
                    onChange={(e) => setFeaturedAdFormDiscount(e.target.value)}
                    className="w-full bg-[#141414] text-white p-3 text-xs border border-white/10 rounded-xl focus:outline-none focus:border-[#047c1f] focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-semibold"
                  />
                </div>

                {/* Sale Price */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-white/60 uppercase tracking-wider block">Sale Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="3.00"
                    value={featuredAdFormSalePrice}
                    onChange={(e) => setFeaturedAdFormSalePrice(e.target.value)}
                    className="w-full bg-[#141414] text-white p-3 text-xs border border-white/10 rounded-xl focus:outline-none focus:border-[#047c1f] focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-semibold"
                  />
                </div>

                {/* Original Price */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-white/60 uppercase tracking-wider block">Original Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="6.00"
                    value={featuredAdFormOriginalPrice}
                    onChange={(e) => setFeaturedAdFormOriginalPrice(e.target.value)}
                    className="w-full bg-[#141414] text-white p-3 text-xs border border-white/10 rounded-xl focus:outline-none focus:border-[#047c1f] focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-semibold"
                  />
                </div>
              </div>

              {/* Background Color Picker */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/60 uppercase tracking-wider block">Card Background Color</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Woolies Green', bg: '#006B3C' },
                    { name: 'Navy', bg: '#1A1A2E' },
                    { name: 'Charcoal', bg: '#1a1a1a' },
                    { name: 'Crimson', bg: '#B71C1C' },
                    { name: 'Royal Blue', bg: '#1565C0' },
                    { name: 'Orange', bg: '#D84315' },
                    { name: 'Purple', bg: '#4A148C' }
                  ].map((color) => {
                    const isSelected = featuredAdFormBg === color.bg;
                    return (
                      <button
                        key={color.bg}
                        type="button"
                        onClick={() => setFeaturedAdFormBg(color.bg)}
                        title={color.name}
                        className="w-6 h-6 rounded-full cursor-pointer relative border border-white/20 hover:scale-105 active:scale-95 transition-transform"
                        style={{ backgroundColor: color.bg }}
                      >
                        {isSelected && (
                          <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => setFeaturedAdFormBg('')}
                    className={`px-2.5 py-0.5 rounded-md text-[9px] font-bold cursor-pointer border hover:bg-white/10 transition-colors uppercase ${
                      featuredAdFormBg === '' ? 'border-[#047c1f] text-[#047c1f]' : 'border-white/10 text-white/60'
                    }`}
                  >
                    Default
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/20">
                    <input
                      type="color"
                      value={featuredAdFormBg || '#000000'}
                      onChange={(e) => setFeaturedAdFormBg(e.target.value)}
                      className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer scale-150"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Custom Hex (e.g. #006B3C)"
                    value={featuredAdFormBg}
                    onChange={(e) => setFeaturedAdFormBg(e.target.value)}
                    className="flex-1 bg-[#141414] text-white placeholder-white/30 p-2 text-xs border border-white/10 rounded-xl focus:outline-none focus:border-[#047c1f] focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {/* Expiry Days */}
                <div className="space-y-1 col-span-1">
                  <label className="text-[10px] font-black text-white/60 uppercase tracking-wider block">Expiry Days</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={featuredAdFormExpiry}
                    onChange={(e) => setFeaturedAdFormExpiry(parseInt(e.target.value) || 1)}
                    className="w-full bg-[#141414] text-white p-3 text-xs border border-white/10 rounded-xl focus:outline-none focus:border-[#047c1f] focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-semibold"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1 col-span-1">
                  <label className="text-[10px] font-black text-white/60 uppercase tracking-wider block">Category</label>
                  <select
                    value={featuredAdFormCategory}
                    onChange={(e) => setFeaturedAdFormCategory(e.target.value)}
                    className="w-full bg-[#141414] text-white p-3 text-xs border border-white/10 rounded-xl focus:outline-none focus:border-[#047c1f] focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-semibold"
                  >
                    <option value="Groceries">Groceries</option>
                    <option value="Tech">Tech</option>
                    <option value="Fashion">Fashion</option>
                    <option value="F&D">Food & Drink</option>
                    <option value="Travel">Travel</option>
                    <option value="Home">Home & Garden</option>
                    <option value="Sports">Sports</option>
                    <option value="Outdoors">Outdoors</option>
                    <option value="Health & Beauty">Health & Beauty</option>
                  </select>
                </div>

                {/* State */}
                <div className="space-y-1 col-span-1">
                  <label className="text-[10px] font-black text-white/60 uppercase tracking-wider block">State</label>
                  <select
                    value={featuredAdFormState}
                    onChange={(e) => setFeaturedAdFormState(e.target.value)}
                    className="w-full bg-[#141414] text-white p-3 text-xs border border-white/10 rounded-xl focus:outline-none focus:border-[#047c1f] focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-semibold"
                  >
                    <option value="National">National</option>
                    <option value="NSW">NSW</option>
                    <option value="VIC">VIC</option>
                    <option value="QLD">QLD</option>
                    <option value="WA">WA</option>
                    <option value="SA">SA</option>
                    <option value="TAS">TAS</option>
                  </select>
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-white/60 uppercase tracking-wider block">Image URL</label>
                <input
                  type="text"
                  placeholder="https://picsum.photos/..."
                  value={featuredAdFormImage}
                  onChange={(e) => setFeaturedAdFormImage(e.target.value)}
                  className="w-full bg-[#141414] text-white p-3 text-xs border border-white/10 rounded-xl focus:outline-none focus:border-[#047c1f] focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-semibold"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-white/60 uppercase tracking-wider block">Ad Description</label>
                <textarea
                  rows="2"
                  placeholder="Weekly discount campaign details..."
                  value={featuredAdFormDesc}
                  onChange={(e) => setFeaturedAdFormDesc(e.target.value)}
                  className="w-full bg-[#141414] text-white p-3 text-xs border border-white/10 rounded-xl focus:outline-none focus:border-[#047c1f] focus:ring-2 focus:ring-[#047c1f]/20 transition-all font-semibold resize-none no-scrollbar"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 mt-2 rounded-xl bg-[#047c1f] hover:bg-[#035a16] text-white font-black text-xs shadow-md shadow-[#047c1f]/10 cursor-pointer border-none transition-colors uppercase tracking-wider font-sans"
              >
                {editingFeaturedAdIndex === -1 ? '✓ Create Featured Ad' : '✓ Save Campaign Details'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3a. Send Restock Alert Modal */}
      {restockModalOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => {
            setRestockModalOpen(false);
            setRestockSuccess(false);
          }}
        >
          <div
            className="w-full max-w-lg bg-[#faf6f0] rounded-2xl border border-outline-variant/30 p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setRestockModalOpen(false);
                setRestockSuccess(false);
              }}
              className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer border-none bg-transparent"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="font-headline font-bold text-2xl text-on-surface">📢 Send Restock Alert</h3>
              <p className="text-xs text-on-surface-variant font-semibold">Notify customers waiting for out-of-stock items</p>
            </div>

            {(() => {
              const restockItems = [
                { key: 'linen', label: 'Organic Linen Bedding', waiting: 384 },
                { key: 'toothbrush', label: 'Bamboo Toothbrush Set', waiting: 192 },
                { key: 'bottles', label: 'Glass Spray Bottles', waiting: 95 },
                { key: 'wraps', label: 'Reusable Beeswax Wraps', waiting: 82 },
                { key: 'bento', label: 'Stainless Steel Bento Box', waiting: 74 },
                { key: 'mug', label: 'Ceramic Travel Coffee Mug', waiting: 67 },
                { key: 'tote', label: 'Organic Cotton Tote Bag', waiting: 58 },
                { key: 'laundry', label: 'Eco Laundry Detergent Sheets', waiting: 51 },
                { key: 'balls', label: 'Natural Wool Dryer Balls', waiting: 43 },
                { key: 'sponge', label: 'Biodegradable Sponge Pack', waiting: 39 }
              ];
              const selectedItem = restockItems.find(x => x.key === restockSelectedProduct) || restockItems[0];

              return restockSuccess ? (
                <div className="space-y-6 text-center py-6 animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-headline font-bold text-lg text-on-surface">Alert Queue Dispatched!</h4>
                    <p className="text-sm text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                      Restock notifications have been sent to all registered subscribers waiting for this item.
                    </p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 text-xs font-semibold text-primary max-w-xs mx-auto">
                    📨 Emails Sent: {selectedItem.waiting} subscribers
                  </div>
                  <button
                    onClick={() => {
                      setRestockModalOpen(false);
                      setRestockSuccess(false);
                    }}
                    className="w-full py-3 rounded-xl bg-primary hover:opacity-95 text-white font-bold text-sm shadow-md transition-all cursor-pointer border-none"
                  >
                    Back to Dashboard
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Select Product</label>
                    <select
                      value={restockSelectedProduct}
                      onChange={(e) => setRestockSelectedProduct(e.target.value)}
                      className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      {restockItems.map(item => (
                        <option key={item.key} value={item.key}>{item.label} ({item.waiting} waiting)</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Alert Message</label>
                    <textarea
                      rows={4}
                      value={`Good news! Our popular ${selectedItem.label} is back in stock. Order now before it runs out again!`}
                      onChange={() => { }}
                      className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>

                  <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/20 flex justify-between items-center text-xs font-semibold">
                    <span className="text-on-surface-variant">Waiting Subscribers:</span>
                    <span className="text-error font-extrabold text-sm">
                      {selectedItem.waiting} customers
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setIsRestockSending(true);
                      setTimeout(() => {
                        setIsRestockSending(false);
                        setRestockSuccess(true);
                        triggerToast('✓ Restock notifications dispatched!', 'success');
                      }, 1500);
                    }}
                    disabled={isRestockSending}
                    className="w-full py-3 rounded-xl bg-primary hover:opacity-95 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
                  >
                    {isRestockSending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending Alerts...</span>
                      </>
                    ) : (
                      <span>Send Restock Alerts</span>
                    )}
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* 3b. Sales Report Modal */}
      {salesReportModalOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSalesReportModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#faf6f0] rounded-2xl border border-outline-variant/30 p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200 text-left max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSalesReportModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer border-none bg-transparent"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-4 border-b border-outline-variant/20 pb-4">
              <div className="space-y-1">
                <h3 className="font-headline font-bold text-2xl text-on-surface">📊 Sales Performance Report</h3>
                <p className="text-xs text-on-surface-variant font-semibold">Detailed merchant channel sales overview</p>
              </div>
              <select
                value={salesReportTimeframe}
                onChange={(e) => {
                  setSalesReportTimeframe(e.target.value);
                  triggerToast(`Sales report loaded for ${e.target.value}`, 'success');
                }}
                className="bg-white border border-outline-variant/30 rounded-xl px-3 py-1.5 text-xs font-bold text-on-surface-variant focus:outline-none"
              >
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 12 Months</option>
              </select>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-outline-variant/10">
                <p className="text-[10px] font-bold text-on-surface-variant/75 uppercase tracking-wider">Total Revenue</p>
                <p className="text-xl font-headline font-extrabold text-primary mt-1">
                  {salesReportTimeframe === 'Last 7 Days' ? '$6,842.00' : salesReportTimeframe === 'Last 30 Days' ? '$24,842.00' : '$298,120.00'}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-outline-variant/10">
                <p className="text-[10px] font-bold text-on-surface-variant/75 uppercase tracking-wider">Net Profit</p>
                <p className="text-xl font-headline font-extrabold text-primary mt-1">
                  {salesReportTimeframe === 'Last 7 Days' ? '$2,460.00' : salesReportTimeframe === 'Last 30 Days' ? '$8,940.00' : '$107,320.00'}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-outline-variant/10">
                <p className="text-[10px] font-bold text-on-surface-variant/75 uppercase tracking-wider">Conversion</p>
                <p className="text-xl font-headline font-extrabold text-on-surface mt-1">
                  {salesReportTimeframe === 'Last 7 Days' ? '3.1%' : salesReportTimeframe === 'Last 30 Days' ? '3.4%' : '3.6%'}
                </p>
              </div>
            </div>

            {/* Sparkline Bar Visualization */}
            <div className="bg-white p-4 rounded-xl border border-outline-variant/10 space-y-3">
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Revenue Trend</h4>
              <div className="h-16 flex items-end gap-2 pt-4">
                {[45, 60, 55, 75, 90, 80, 95, 110, 85, 100, 115, 130].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="flex-1 bg-primary/20 hover:bg-primary rounded-t transition-all relative group cursor-pointer"
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none mb-1 font-bold">
                      ${(h * 150).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sales Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Product Sales Breakdown</h4>
              <div className="overflow-hidden border border-outline-variant/10 rounded-xl bg-white">
                <table className="w-full text-sm border-collapse text-left">
                  <thead>
                    <tr className="bg-surface-container border-b border-outline-variant/10 text-on-surface-variant text-xs font-bold uppercase tracking-wider select-none">
                      <th className="px-4 py-3">Product Name</th>
                      <th className="px-4 py-3 text-right">Units Sold</th>
                      <th className="px-4 py-3 text-right">Revenue</th>
                      <th className="px-4 py-3 text-right">Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10 font-semibold">
                    {[
                      { name: 'Sony WH-1000XM5 Headphones', sold: 68, rev: 27132, profit: 9496 },
                      { name: 'MacBook Air M3 13"', sold: 18, rev: 28782, profit: 10073 },
                      { name: 'iPad Pro M4 11"', sold: 12, rev: 14988, profit: 5245 },
                      { name: 'Organic Linen Bedding', sold: 45, rev: 8955, profit: 3134 }
                    ].map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-on-surface font-semibold text-xs truncate max-w-[200px]">{item.name}</td>
                        <td className="px-4 py-3 text-right text-xs text-on-surface-variant">{item.sold}</td>
                        <td className="px-4 py-3 text-right text-xs text-primary font-bold">${item.rev.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right text-xs text-[#00c853] font-bold">${item.profit.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex gap-3 border-t border-outline-variant/20 pt-4">
              <button
                onClick={() => triggerToast('✓ CSV report downloaded successfully!', 'success')}
                className="flex-1 py-2.5 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity border-none cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Export CSV
              </button>
              <button
                onClick={() => setSalesReportModalOpen(false)}
                className="px-6 py-2.5 bg-surface-container hover:bg-surface-variant/40 border border-outline-variant/30 text-on-surface-variant font-bold text-xs uppercase tracking-widest rounded-xl transition-colors border-none cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {communityPanelOpen && (
        <div
          className="fixed inset-0 z-[2000] flex 
            items-center justify-center p-4 sm:p-6
            bg-slate-900/70 backdrop-blur-sm 
            animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setCommunityPanelOpen(false);
              setExpandedPost(null);
              setShowCreatePost(false);
            }
          }}
        >
          <div
            className="bg-[#f6f7f8] rounded-2xl
              border border-[#e8e8e8] 
              shadow-2xl flex overflow-hidden 
              animate-in zoom-in-95 duration-300
              w-full max-w-[920px] h-[80vh] sm:h-[660px] 
              max-h-[calc(100vh-32px)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── LEFT COLUMN: existing feed content ── */}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

              {/* ── PANEL HEADER ── */}
              <div className="bg-white border-b 
              border-[#e8e8e8] px-4 py-3 
              flex items-center justify-between 
              shrink-0 select-none">
                <div className="flex items-center gap-2.5">
                  {expandedPost && (
                    <button
                      onClick={() => {
                        setExpandedPost(null);
                        setShowCreatePost(false);
                      }}
                      className="p-1.5 rounded-full hover:bg-slate-100 cursor-pointer mr-0.5 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-slate-650" />
                    </button>
                  )}
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-inner">
                    <MessageSquare className="w-4.5 h-4.5 text-[#047c1f]" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-[15px] text-slate-900 leading-tight">
                      {expandedPost
                        ? expandedPost.title.substring(0, 35) + '...'
                        : showCreatePost
                          ? 'Create Post'
                          : 'r/7deals Community 🇦🇺'}
                    </h2>
                    {!expandedPost && !showCreatePost && (
                      <p className="text-[10px] text-slate-400 font-bold tracking-wide">
                        {communityDeals.length} posts · Australian bargain hunters
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!expandedPost && !showCreatePost && (
                    <button
                      onClick={() => {
                        if (!currentUser) {
                          setCommunityPanelOpen(false);
                          setLoginModalOpen(true);
                          triggerToast('Sign in to post', 'warning');
                          return;
                        }
                        setShowCreatePost(true);
                      }}
                      className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#fdc800] hover:bg-[#e0b000] active:scale-95 text-[#0d0d0d] font-black text-[12px] cursor-pointer transition-all shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Post
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setCommunityPanelOpen(false);
                      setExpandedPost(null);
                      setShowCreatePost(false);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-red-50 hover:text-red-550 active:scale-95 text-slate-500 border border-slate-200 hover:border-red-200 transition-all duration-150 cursor-pointer font-bold text-[12px]"
                  >
                    <X className="w-3.5 h-3.5" />
                    Close
                  </button>
                </div>
              </div>

              {/* ── CREATE POST VIEW ── */}
              {showCreatePost && (
                <div className="flex-1 overflow-y-auto min-w-0 p-4 space-y-4">

                  {/* Post type selector */}
                  <div className="bg-white rounded-2xl 
                  border border-[#e8e8e8] p-1 
                  flex gap-1">
                    {['Deal', 'Discussion', 'Question'].map(
                      (type) => (
                        <button
                          key={type}
                          className="flex-1 py-2 rounded-xl 
                        text-[12px] font-bold 
                        cursor-pointer transition-colors
                        bg-[#047c1f] text-white 
                        first:bg-[#047c1f] 
                        [&:not(:first-child)]:bg-transparent 
                        [&:not(:first-child)]:text-slate-500 
                        hover:[&:not(:first-child)]:bg-slate-50"
                          onClick={() => { }}
                        >
                          {type}
                        </button>
                      ))}
                  </div>

                  {/* Avatar + Title input */}
                  <div className="bg-white rounded-2xl 
                  border border-[#e8e8e8] p-4 
                  space-y-3">
                    <div className="flex items-center 
                    gap-2 pb-3 border-b border-slate-100">
                      <div className={`w-8 h-8 rounded-full 
                      ${currentUser?.color || 'bg-[#047c1f]'} 
                      text-white font-bold text-[11px] 
                      flex items-center justify-center`}>
                        {currentUser?.avatar || '?'}
                      </div>
                      <span className="text-[13px] 
                      font-bold text-slate-700">
                        {currentUser?.name}
                      </span>
                      <span className="ml-auto text-[10px] 
                      font-bold text-[#047c1f] 
                      bg-[#e6f2e8] px-2 py-0.5 rounded-full">
                        Posting to r/7deals
                      </span>
                    </div>

                    <input
                      type="text"
                      placeholder="Title — be specific and helpful"
                      value={communityPostTitle}
                      onChange={(e) =>
                        setCommunityPostTitle(e.target.value)
                      }
                      className="w-full text-[14px] font-bold 
                      text-slate-900 placeholder-slate-300 
                      border-none outline-none bg-transparent 
                      resize-none"
                      maxLength={200}
                    />

                    <textarea
                      placeholder="Share the deal details, store link, or any tips for fellow Aussies..."
                      value={communityPostText}
                      onChange={(e) =>
                        setCommunityPostText(e.target.value)
                      }
                      rows={4}
                      className="w-full text-[13px] 
                      text-slate-700 placeholder-slate-300 
                      border-none outline-none 
                      bg-transparent resize-none 
                      font-medium"
                    />
                  </div>

                  {/* Deal details */}
                  <div className="bg-white rounded-2xl 
                  border border-[#e8e8e8] p-4 space-y-3">
                    <p className="text-[11px] font-bold 
                    text-slate-400 uppercase 
                    tracking-wider">
                      Deal Details (optional)
                    </p>
                    <input
                      type="text"
                      placeholder="Store / Retailer name"
                      value={communityPostStore}
                      onChange={(e) =>
                        setCommunityPostStore(e.target.value)
                      }
                      className="w-full bg-slate-50 
                      border border-[#e8e8e8] rounded-xl 
                      px-3 py-2.5 text-[13px] font-medium 
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-[#047c1f]/20"
                    />
                    <input
                      type="text"
                      placeholder="Deal link (paste URL)"
                      value={communityPostLink}
                      onChange={(e) =>
                        setCommunityPostLink(e.target.value)
                      }
                      className="w-full bg-slate-50 
                      border border-[#e8e8e8] rounded-xl 
                      px-3 py-2.5 text-[13px] font-medium 
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-[#047c1f]/20"
                    />
                    <select
                      value={communityPostCategory}
                      onChange={(e) =>
                        setCommunityPostCategory(e.target.value)
                      }
                      className="w-full bg-slate-50 
                      border border-[#e8e8e8] rounded-xl 
                      px-3 py-2.5 text-[13px] font-medium 
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-[#047c1f]/20"
                    >
                      {CATEGORY_NAMES.map(c => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Post rules reminder */}
                  <div className="bg-[#fff9e6] border 
                  border-[#fdc800]/30 rounded-2xl p-3">
                    <p className="text-[11px] font-bold 
                    text-amber-800 mb-1">
                      📋 Community Guidelines
                    </p>
                    <ul className="text-[11px] 
                    text-amber-700 space-y-0.5 
                    font-medium list-disc pl-4">
                      <li>Verify the deal is still active</li>
                      <li>Include store name and discount amount</li>
                      <li>No spam or self-promotion</li>
                      <li>Be a legend, help fellow Aussies save</li>
                    </ul>
                  </div>

                  {/* Submit */}
                  <button
                    onClick={() => {
                      if (!communityPostTitle.trim()) {
                        triggerToast(
                          'Add a title for your post',
                          'error'
                        );
                        return;
                      }
                      const newPost = {
                        id: 'cd' + Date.now(),
                        user: currentUser.name,
                        avatar: currentUser.avatar,
                        userColor: currentUser.color
                          || 'bg-[#047c1f]',
                        title: communityPostTitle,
                        body: communityPostText,
                        store: communityPostStore
                          || 'Various',
                        discount: 'Community Find',
                        upvotes: 1,
                        downvotes: 0,
                        comments: [],
                        time: 'Just now',
                        category: communityPostCategory,
                        state: selectedState !== 'All Australia'
                          ? selectedState : 'National',
                        link: communityPostLink,
                        hot: false,
                      };
                      setCommunityDeals(prev =>
                        [newPost, ...prev]
                      );
                      setCommunityPostTitle('');
                      setCommunityPostText('');
                      setCommunityPostStore('');
                      setCommunityPostLink('');
                      setShowCreatePost(false);
                      triggerToast(
                        '✓ Posted to r/7deals! 🦘',
                        'success'
                      );
                    }}
                    className="w-full py-3 rounded-full 
                    bg-[#047c1f] hover:bg-[#035a16] 
                    text-white font-bold text-[14px] 
                    cursor-pointer transition-colors 
                    shadow-md"
                  >
                    Post to Community
                  </button>
                </div>
              )}

              {/* ── EXPANDED POST VIEW (Reddit-style) ── */}
              {expandedPost && !showCreatePost && (() => {
                const post = communityDeals.find(
                  p => p.id === expandedPost.id
                ) || expandedPost;
                const isUpvoted = upvotedPosts.has(post.id);

                return (
                  <div className="flex-1 overflow-y-auto min-w-0">

                    {/* Post content */}
                    <div className="bg-white border-b 
                    border-[#e8e8e8] p-4 space-y-3">

                      {/* Post meta */}
                      <div className="flex items-center 
                      gap-2 text-[11px] text-slate-400 
                      font-semibold flex-wrap">
                        <div className={`w-6 h-6 rounded-full 
                        ${post.userColor} text-white 
                        font-bold text-[9px] 
                        flex items-center justify-center`}>
                          {post.avatar}
                        </div>
                        <span className="font-bold 
                        text-slate-700">
                          u/{post.user}
                        </span>
                        <span>·</span>
                        <span>{post.time}</span>
                        <span>·</span>
                        <span className="px-1.5 py-0.5 
                        rounded bg-[#e6f2e8] 
                        text-[#047c1f] font-bold">
                          {post.category}
                        </span>
                        {post.state && (
                          <span className="px-1.5 py-0.5 
                          rounded bg-slate-100 
                          text-slate-500 font-bold">
                            {post.state}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-[16px] font-bold 
                      text-slate-900 leading-snug">
                        {post.title}
                      </h3>

                      {/* Body text */}
                      {post.body && (
                        <p className="text-[13px] 
                        text-slate-600 font-medium 
                        leading-relaxed">
                          {post.body}
                        </p>
                      )}

                      {/* Store + discount */}
                      {post.store && (
                        <div className="flex flex-wrap 
                        gap-2">
                          <span className="px-2.5 py-1 
                          rounded-lg bg-slate-100 
                          text-slate-600 text-[12px] 
                          font-bold flex items-center gap-1">
                            <ShoppingBag className="w-3 h-3" />
                            {post.store}
                          </span>
                          <span className="px-2.5 py-1 
                          rounded-lg bg-[#fdc800] 
                          text-[#0d0d0d] text-[12px] 
                          font-bold">
                            {post.discount}
                          </span>
                        </div>
                      )}

                      {/* Link */}
                      {post.link && (
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 
                          text-[12px] text-[#047c1f] 
                          font-bold hover:underline"
                        >
                          <ExternalLink className="w-3.5 
                          h-3.5" />
                          View Deal Link
                        </a>
                      )}

                      {/* Vote + action bar */}
                      <div className="flex items-center 
                      gap-3 pt-2 border-t border-slate-100">

                        {/* Upvote/downvote */}
                        <div className="flex items-center 
                        gap-1 bg-slate-100 rounded-full 
                        p-1">
                          <button
                            onClick={() =>
                              handleUpvote(post.id)
                            }
                            className={`p-1.5 rounded-full 
                            cursor-pointer transition-colors 
                            ${isUpvoted
                                ? 'bg-[#047c1f] text-white'
                                : 'hover:bg-slate-200 text-slate-500'}`}
                          >
                            <TrendingUp className="w-3.5 
                            h-3.5" />
                          </button>
                          <span className={`text-[12px] 
                          font-bold px-1 
                          ${isUpvoted
                              ? 'text-[#047c1f]'
                              : 'text-slate-700'}`}>
                            {post.upvotes}
                          </span>
                          <button
                            className="p-1.5 rounded-full 
                            hover:bg-slate-200 
                            text-slate-400 cursor-pointer"
                          >
                            <ChevronDown className="w-3.5 
                            h-3.5" />
                          </button>
                        </div>

                        {/* Comment count */}
                        <div className="flex items-center 
                        gap-1 text-[12px] text-slate-500 
                        font-bold">
                          <MessageSquare className="w-3.5 
                          h-3.5" />
                          {post.comments.length} comments
                        </div>

                        {/* Share */}
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${window.location.origin}#community/${post.id}`
                            );
                            triggerToast(
                              '🔗 Link copied!', 'success'
                            );
                          }}
                          className="flex items-center gap-1 
                          text-[12px] text-slate-500 
                          font-bold hover:text-[#047c1f] 
                          cursor-pointer transition-colors"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          Share
                        </button>

                        {/* Save */}
                        <button
                          className="flex items-center gap-1 
                          text-[12px] text-slate-500 
                          font-bold hover:text-[#047c1f] 
                          cursor-pointer transition-colors 
                          ml-auto"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                          Save
                        </button>
                      </div>
                    </div>

                    {/* ── COMMENTS SECTION ── */}
                    <div className="p-4 space-y-4">

                      {/* Add comment box */}
                      {currentUser ? (
                        <div className="bg-white rounded-2xl 
                        border border-[#e8e8e8] p-3 
                        space-y-2">
                          <div className="flex items-center 
                          gap-2">
                            <div className={`w-7 h-7 
                            rounded-full 
                            ${currentUser.color} 
                            text-white font-bold text-[10px] 
                            flex items-center justify-center 
                            shrink-0`}>
                              {currentUser.avatar}
                            </div>
                            <textarea
                              placeholder="Add a comment... what do you know about this deal?"
                              value={commentInputs[post.id]
                                || ''}
                              onChange={(e) =>
                                setCommentInputs(prev => ({
                                  ...prev,
                                  [post.id]: e.target.value
                                }))
                              }
                              rows={2}
                              className="flex-1 bg-slate-50 
                              border border-[#e8e8e8] 
                              rounded-xl px-3 py-2 
                              text-[12px] font-medium 
                              text-slate-700 resize-none 
                              focus:outline-none 
                              focus:ring-2 
                              focus:ring-[#047c1f]/20"
                            />
                          </div>
                          <div className="flex justify-end">
                            <button
                              onClick={() => {
                                const text = commentInputs[
                                  post.id
                                ]?.trim();
                                if (!text) return;
                                setCommunityDeals(prev =>
                                  prev.map(p =>
                                    p.id === post.id
                                      ? {
                                        ...p,
                                        comments: [
                                          ...p.comments,
                                          {
                                            id: Date.now(),
                                            user:
                                              currentUser.name,
                                            avatar:
                                              currentUser.avatar,
                                            color:
                                              currentUser.color,
                                            comment: text,
                                            time: 'Just now',
                                            likes: 0,
                                          }
                                        ]
                                      }
                                      : p
                                  )
                                );
                                setCommentInputs(prev => ({
                                  ...prev,
                                  [post.id]: ''
                                }));
                                setExpandedPost(prev => ({
                                  ...prev,
                                  comments: [
                                    ...(prev.comments || []),
                                    {
                                      id: Date.now(),
                                      user: currentUser.name,
                                      avatar: currentUser.avatar,
                                      color: currentUser.color,
                                      comment: text,
                                      time: 'Just now',
                                      likes: 0,
                                    }
                                  ]
                                }));
                                triggerToast(
                                  '✓ Comment posted!',
                                  'success'
                                );
                              }}
                              className="px-4 py-1.5 
                              rounded-full bg-[#047c1f] 
                              hover:bg-[#035a16] 
                              text-white text-[12px] 
                              font-bold cursor-pointer 
                              transition-colors"
                            >
                              Comment
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white rounded-2xl 
                        border border-[#e8e8e8] p-4 
                        text-center">
                          <p className="text-[13px] 
                          text-slate-500 font-bold mb-2">
                            Join the discussion
                          </p>
                          <button
                            onClick={() => {
                              setCommunityPanelOpen(false);
                              setLoginModalOpen(true);
                            }}
                            className="px-4 py-2 rounded-full 
                            bg-[#047c1f] text-white 
                            text-[12px] font-bold 
                            cursor-pointer"
                          >
                            Sign in to comment
                          </button>
                        </div>
                      )}

                      {/* Comments list */}
                      {post.comments.length === 0 ? (
                        <div className="text-center py-8 
                        text-slate-400">
                          <MessageSquare className="w-8 h-8 
                          mx-auto mb-2 stroke-1" />
                          <p className="text-[13px] font-bold">
                            No comments yet
                          </p>
                          <p className="text-[11px]">
                            Be the first to comment, mate!
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {post.comments.map((c, i) => (
                            <div key={c.id || i}
                              className="bg-white rounded-2xl 
                              border border-[#e8e8e8] p-3">
                              <div className="flex items-start 
                              gap-2">
                                <div className={`w-7 h-7 
                                rounded-full shrink-0
                                ${c.color || 'bg-[#047c1f]'} 
                                text-white font-bold 
                                text-[10px] flex items-center 
                                justify-center`}>
                                  {c.avatar
                                    || c.user
                                      .substring(0, 2)
                                      .toUpperCase()}
                                </div>
                                <div className="flex-1 
                                min-w-0">
                                  <div className="flex items-center 
                                  gap-1.5 mb-1">
                                    <span className="text-[12px] 
                                    font-bold text-slate-800">
                                      u/{c.user}
                                    </span>
                                    <span className="text-[10px] 
                                    text-slate-400">
                                      {c.time || 'recently'}
                                    </span>
                                  </div>
                                  <p className="text-[12px] 
                                  text-slate-600 font-medium 
                                  leading-relaxed">
                                    {c.comment}
                                  </p>
                                  <div className="flex items-center 
                                  gap-3 mt-2">
                                    <button className="flex 
                                    items-center gap-1 
                                    text-[11px] text-slate-400 
                                    font-bold hover:text-[#047c1f] 
                                    cursor-pointer">
                                      <TrendingUp className="w-3 
                                      h-3" />
                                      {c.likes || 0}
                                    </button>
                                    <button className="text-[11px] 
                                    text-slate-400 font-bold 
                                    hover:text-slate-600 
                                    cursor-pointer">
                                      Reply
                                    </button>
                                    <button
                                      onClick={() => {
                                        navigator.clipboard
                                          .writeText(c.comment);
                                        triggerToast(
                                          '🔗 Comment copied!',
                                          'info'
                                        );
                                      }}
                                      className="text-[11px] 
                                      text-slate-400 font-bold 
                                      hover:text-slate-600 
                                      cursor-pointer 
                                      flex items-center gap-1"
                                    >
                                      <Share2 className="w-3 
                                      h-3" />
                                      Share
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* ── MAIN FEED VIEW ── */}
              {!expandedPost && !showCreatePost && (
                <div className="flex-1 flex flex-col min-w-0">
                  {/* Sort and Search bar */}
                  <div className="bg-white border-b border-[#e8e8e8]/50 px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2.5 shrink-0 flex-wrap">
                    {/* Sort segmented controls */}
                    <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200/40">
                      {[
                        { key: 'hot', label: '🔥 Hot' },
                        { key: 'new', label: '🆕 New' },
                        { key: 'top', label: '⬆️ Top' },
                      ].map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setCommunitySort(tab.key)}
                          className={`px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-bold cursor-pointer transition-all duration-250 ${communitySort === tab.key
                            ? 'bg-white text-[#047c1f] shadow-sm font-black border-none'
                            : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Search input */}
                    <div className="relative flex-1 min-w-[140px] max-w-full sm:max-w-[200px] ml-auto w-full sm:w-auto">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        placeholder={`Search ${communityDeals.length} posts...`}
                        value={communitySearchQuery}
                        onChange={(e) => setCommunitySearchQuery(e.target.value)}
                        className="w-full bg-slate-50 focus:bg-white pl-8 pr-7 py-1.5 text-[11px] border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#047c1f]/10 focus:border-[#047c1f] transition-all font-semibold text-slate-700"
                      />
                      {communitySearchQuery && (
                        <button
                          onClick={() => setCommunitySearchQuery('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-200 text-slate-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Horizontal Scrollable Categories Line */}
                  <div className="bg-white border-b border-[#e8e8e8] px-3 sm:px-4 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 select-none">
                    {CATEGORY_NAMES.map((c) => {
                      const emoji = COMMUNITY_CATEGORY_EMOJIS[c] || '🏷️';
                      const isSelected = communityCategoryFilter === c;
                      return (
                        <button
                          key={c}
                          onClick={() => setCommunityCategoryFilter(isSelected ? 'All' : c)}
                          className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all duration-150 cursor-pointer border flex items-center gap-1.5 whitespace-nowrap ${isSelected
                            ? 'bg-[#047c1f] border-[#047c1f] text-white shadow-sm font-extrabold'
                            : 'bg-slate-50 hover:bg-slate-105 border-slate-200 text-slate-600'
                            }`}
                        >
                          <span className="text-[12px]">{emoji}</span>
                          <span>{c}</span>
                          {isSelected && (
                            <span className="ml-0.5 hover:text-white/80 p-0.5 rounded-full bg-white/20">
                              <X className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Filter status row */}
                  {(communityCategoryFilter !== 'All' || communitySearchQuery.trim()) && (
                    <div className="bg-[#e6f2e8]/30 px-4 py-2 flex items-center justify-between border-b border-[#e8e8e8]/50 shrink-0">
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-[#047c1f]">
                        <span>Filtered:</span>
                        {communityCategoryFilter !== 'All' && (
                          <span className="bg-[#e6f2e8] text-[#047c1f] px-2 py-0.5 rounded-md border border-[#047c1f]/10 text-[10px]">
                            {communityCategoryFilter}
                          </span>
                        )}
                        {communitySearchQuery.trim() && (
                          <span className="bg-[#e6f2e8] text-[#047c1f] px-2 py-0.5 rounded-md border border-[#047c1f]/10 text-[10px] truncate max-w-[120px]">
                            "{communitySearchQuery}"
                          </span>
                        )}
                        <span className="text-slate-400 font-semibold ml-1">
                          ({filteredAndSortedCommunityDeals.length} found)
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setCommunityCategoryFilter('All');
                          setCommunitySearchQuery('');
                        }}
                        className="text-[10px] font-black text-slate-500 hover:text-red-500 transition-colors uppercase tracking-wider flex items-center gap-0.5 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" /> Clear
                      </button>
                    </div>
                  )}

                  {/* Feed */}
                  <div
                    className="overflow-y-auto p-3 space-y-3 flex-1"
                    style={{ flex: '1 1 0', minHeight: 0 }}
                  >
                    {filteredAndSortedCommunityDeals.length === 0 ? (
                      <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-[#e8e8e8] p-6 shadow-sm">
                        <Search className="w-10 h-10 mx-auto mb-3 stroke-1 text-slate-300" />
                        <h4 className="text-[14px] font-bold text-slate-700 mb-1">No community posts found</h4>
                        <p className="text-[11px] text-slate-400 max-w-xs mx-auto mb-4 leading-normal font-semibold">
                          We couldn't find any community posts matching "{communitySearchQuery}" {communityCategoryFilter !== 'All' ? `in category "${communityCategoryFilter}"` : ''}.
                        </p>
                        <button
                          onClick={() => {
                            setCommunityCategoryFilter('All');
                            setCommunitySearchQuery('');
                          }}
                          className="px-4 py-2 rounded-full bg-[#047c1f] hover:bg-[#035a16] text-white text-[12px] font-bold cursor-pointer transition-colors shadow-sm"
                        >
                          Reset Filters
                        </button>
                      </div>
                    ) : (
                      filteredAndSortedCommunityDeals.map((post) => {
                        const isUpvoted = upvotedPosts.has(post.id);
                        return (
                          <div
                            key={post.id}
                            className="bg-white rounded-2xl 
                            border border-[#e8e8e8] 
                            hover:border-[#047c1f]/35 
                            hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)]
                            transition-all duration-300 
                            overflow-hidden p-3.5 sm:p-4 cursor-pointer"
                            onClick={() => setExpandedPost(post)}
                            style={{
                              borderLeft: post.upvotes > 50
                                ? '3.5px solid #fdc800'
                                : '3.5px solid transparent',
                            }}
                          >
                            <div className="flex gap-4 items-start">
                              {/* ── LEFT: CONTENT ── */}
                              <div className="flex-1 min-w-0 space-y-2.5">
                                {/* Meta row */}
                                <div className="flex items-center gap-2 
                                text-[10px] sm:text-[11px] text-slate-400 font-bold 
                                mb-1 flex-wrap">
                                  <div className={`w-5.5 h-5.5 rounded-full 
                                  ${post.userColor} text-white font-bold 
                                  text-[9px] flex items-center 
                                  justify-center shrink-0`}>
                                    {post.avatar}
                                  </div>
                                  <span className="font-extrabold text-slate-700">
                                    u/{post.user}
                                  </span>
                                  <span className="text-slate-300">·</span>
                                  <span>{post.time}</span>
                                  {post.state && (
                                    <span className="px-2 py-0.5 rounded-full 
                                    bg-slate-100 text-slate-500 font-extrabold 
                                    text-[9px] tracking-wider uppercase">
                                      {post.state}
                                    </span>
                                  )}
                                  {post.upvotes > 50 && (
                                    <span className="px-2 py-0.5 rounded-full 
                                    bg-[#fdc800] text-[#0d0d0d] font-extrabold 
                                    text-[9px] tracking-wider uppercase">
                                      🔥 Hot
                                    </span>
                                  )}
                                </div>
                                {/* Title & snippet */}
                                <div className="space-y-1">
                                  <h4 className="text-[14px] sm:text-[15px] font-extrabold 
                                  text-slate-900 leading-snug 
                                  hover:text-[#047c1f] transition-colors">
                                    {post.title}
                                  </h4>
                                  {post.body && (
                                    <p className="text-[11px] sm:text-[12px] text-slate-500 line-clamp-2 leading-relaxed font-medium">
                                      {post.body}
                                    </p>
                                  )}
                                </div>
                                {/* Store, discount and category badges + Actions row */}
                                <div className="flex items-center justify-between gap-3 pt-1 mt-2.5 flex-wrap w-full">
                                  {/* Badges (Left) */}
                                  <div className="flex gap-1.5 flex-wrap">
                                    {post.store && (
                                      <span className="text-[10px] font-extrabold 
                                      px-2 py-0.5 rounded-md bg-[#e6f2e8] 
                                      text-[#047c1f] border border-[#047c1f]/10">
                                        🏪 {post.store}
                                      </span>
                                    )}
                                    {post.discount && (
                                      <span className="text-[10px] font-extrabold 
                                      px-2 py-0.5 rounded-md bg-[#fff9e6] 
                                      text-amber-800 border border-amber-200/50">
                                        🏷️ {post.discount}
                                      </span>
                                    )}
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                                      {post.category}
                                    </span>
                                  </div>
                                  {/* Actions (Right) */}
                                  <div className="flex items-center gap-1.5 select-none ml-auto shrink-0">
                                    <div className="flex items-center bg-slate-50 border border-slate-200/60 rounded-full p-0.5 select-none h-[26px]">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleUpvote(post.id, e);
                                        }}
                                        className={`p-1 rounded-full cursor-pointer transition-all ${isUpvoted
                                          ? 'bg-[#047c1f] text-white shadow-sm'
                                          : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
                                          }`}
                                      >
                                        <TrendingUp className="w-3.5 h-3.5" />
                                      </button>
                                      <span className={`text-[11px] font-black pr-2 pl-0.5 ${isUpvoted ? 'text-[#047c1f] font-black' : 'text-slate-650'}`}>
                                        {post.upvotes}
                                      </span>
                                    </div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setExpandedPost(post);
                                      }}
                                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/60 text-[11px] text-slate-555 hover:text-[#047c1f] hover:border-[#047c1f]/20 hover:bg-[#e6f2e8]/20 transition-all font-extrabold cursor-pointer h-[26px]"
                                    >
                                      <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                                      <span className="ml-0.5">{post.comments.length}</span>
                                    </button>
                                    {/* Share Pill */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigator.clipboard.writeText(
                                          `${window.location.origin}#community/${post.id}`
                                        );
                                        triggerToast('🔗 Link copied!', 'success');
                                      }}
                                      className="p-1 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-550 hover:text-[#047c1f] transition-all cursor-pointer flex items-center justify-center shrink-0 w-[26px] h-[26px]"
                                      title="Share"
                                    >
                                      <Share2 className="w-3.5 h-3.5 text-slate-400" />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* ── RIGHT: IMAGE THUMBNAIL (if exists) ── */}
                              {getCommunityPostImage(post) && (
                                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden relative border border-slate-150 shadow-sm bg-slate-50">
                                  <img
                                    src={getCommunityPostImage(post)}
                                    alt={post.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                  />
                                  {/* Category overlay pill */}
                                  <div className="absolute bottom-1 right-1">
                                    <span className="text-[8px] font-black bg-black/60 text-white px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                                      {post.category}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Subtle scroll hint */}
                  <div className="shrink-0 px-3 py-2 bg-white 
                    border-t border-[#e8e8e8] flex items-center 
                    justify-center gap-2">
                    <div className="w-8 h-0.5 rounded-full 
                      bg-slate-200"></div>
                    <span className="text-[10px] text-slate-400 
                      font-semibold">
                      Scroll to see {communityDeals.length - 3}+ more posts
                    </span>
                    <div className="w-8 h-0.5 rounded-full 
                      bg-slate-200"></div>
                  </div>

                </div>
              )}

            </div>

            {/* ── RIGHT COLUMN: Looping Advertisements Full Panel ── */}
            <div className="hidden md:flex w-[220px] shrink-0 bg-[#0d0d0d] flex-col overflow-hidden border-l border-[#047c1f]/30 select-none">
              <a
                href={COMMUNITY_ADS[currentAdIndex].link}
                className="flex-1 flex flex-col justify-between p-4 relative group no-underline"
              >
                {/* Top: Sponsor Header */}
                <div className="flex items-center justify-between z-10 shrink-0">
                  <span className="text-[9px] font-black text-[#fdc800] bg-[#fdc800]/10 border border-[#fdc800]/25 px-2 py-0.5 rounded uppercase tracking-wider">
                    Partner Sponsor
                  </span>
                  <span className="text-[10px] text-white/50 font-extrabold font-mono">
                    Ad {currentAdIndex + 1}/{COMMUNITY_ADS.length}
                  </span>
                </div>

                {/* Middle: Featured Image (fully visible) */}
                <div className="my-4 relative h-[350px] w-full overflow-hidden rounded-xl bg-slate-900 border border-white/10 shrink-0 shadow-md">
                  <img
                    key={`ad-img-${currentAdIndex}`}
                    src={COMMUNITY_ADS[currentAdIndex].image}
                    alt={COMMUNITY_ADS[currentAdIndex].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 animate-in fade-in duration-300"
                  />
                </div>

                {/* Bottom: Ad Main Details */}
                <div
                  key={`ad-content-${currentAdIndex}`}
                  className="flex-1 flex flex-col justify-between text-left animate-in fade-in slide-in-from-bottom-2 duration-300"
                >
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] text-[#fdc800] font-black tracking-wide uppercase">
                        {COMMUNITY_ADS[currentAdIndex].sponsor}
                      </span>
                      <h3 className="text-white font-black text-[14px] leading-snug tracking-tight">
                        {COMMUNITY_ADS[currentAdIndex].title}
                      </h3>
                    </div>

                    {/* Main discount badge */}
                    <div className="inline-block bg-[#fdc800] text-black text-[10px] font-black px-2.5 py-1 rounded-xl shadow-lg border border-[#fdc800]/20 scale-100 group-hover:scale-105 transition-transform duration-200">
                      {COMMUNITY_ADS[currentAdIndex].discount}
                    </div>

                    <p className="text-[11px] text-white/70 leading-relaxed font-semibold">
                      {COMMUNITY_ADS[currentAdIndex].description}
                    </p>
                  </div>

                  <div className="space-y-3 mt-auto">
                    {/* Action Button */}
                    <div className="w-full py-2 rounded-xl bg-[#047c1f] hover:bg-[#035a16] text-white text-center font-bold text-[11px] shadow-md transition-all duration-200 group-hover:bg-[#035a16]">
                      Shop Spotted Deal →
                    </div>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-1.5 pt-1">
                      {COMMUNITY_ADS.map((_, idx) => (
                        <div
                          key={`ad-dot-${idx}`}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentAdIndex ? 'bg-[#fdc800] w-3.5' : 'bg-white/20'
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* Floating Action Button: Aussie Community */}
      {currentRoute === '#home' && (
        <button
          onClick={() => setCommunityPanelOpen(true)}
          className="fixed bottom-20 sm:bottom-6 right-6 z-[996] bg-[#047c1f] hover:bg-[#035a16] text-white pl-4 pr-5 py-3 rounded-full flex items-center gap-2.5 shadow-xl border-2 border-[#fdc800] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer font-bold text-sm"
        >
          <span className="relative flex items-center justify-center">
            <MessageSquare className="w-4.5 h-4.5 text-[#fdc800]" />
            {communityDeals.length > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#fdc800] text-[#0d0d0d] text-[9px] font-black flex items-center justify-center leading-none">
                {communityDeals.length}
              </span>
            )}
          </span>
          Community
        </button>
      )}

      {/* Toast alert overlay */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full select-none pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-2xl shadow-xl border flex items-center justify-between gap-3 pointer-events-auto animate-in slide-in-from-bottom duration-250 bg-white ${toast.type === 'error' ? 'border-red-200 text-red-800' : toast.type === 'warning' ? 'border-amber-250 text-amber-800' : toast.type === 'info' ? 'border-blue-200 text-blue-800' : 'border-[#e8e8e8] text-emerald-800'}`}
          >
            <div className="flex items-center gap-2.5 text-xs font-bold">
              {toast.type === 'error' ? (
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0"></span>
              ) : toast.type === 'warning' ? (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
              ) : toast.type === 'info' ? (
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
              ) : (
                <Check className="w-4 h-4 text-[#047c1f] shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Global Mobile Bottom Navigation Bar */}
      {!isConsumerDashboard && !isAdminDashboard && !isModeratorDashboard && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#e8e8e8] z-[995] flex items-center justify-around px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] select-none">
          {[
            { href: '#home', label: 'Home', Icon: Home },
            { href: '#deals', label: 'Deals', Icon: Tag },
            { href: '#community', label: 'Community', Icon: MessageSquare },
            { href: '#profile', label: 'Profile', Icon: User }
          ].map((tab) => {
            const isActive = currentRoute === tab.href ||
              (tab.href === '#home' && (currentRoute === '' || currentRoute === '#home' || !currentRoute));
            const TabIcon = tab.Icon;
            return (
              <a
                key={tab.label}
                href={tab.href}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors cursor-pointer border-none bg-transparent no-underline ${isActive ? 'text-[#047c1f]' : 'text-slate-450 hover:text-[#047c1f]'
                  }`}
              >
                <TabIcon className="w-5 h-5 shrink-0" />
                <span className="text-[10px] font-extrabold mt-1 whitespace-nowrap">{tab.label}</span>
              </a>
            );
          })}
        </div>
      )}

    </div>
  );
}
