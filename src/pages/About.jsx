import { ShoppingBasket, Target, Award, Users, Heart, Truck, Shield, Clock } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">About E-Shop</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Your trusted partner for quality products and exceptional shopping experiences since 2020
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Our Story */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBasket className="w-8 h-8 text-blue-900" />
            <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Founded in 2020, E-Shop started with a simple mission: to make quality products accessible to everyone. 
                What began as a small online store has grown into a thriving e-commerce platform serving thousands of 
                satisfied customers across Rwanda and beyond.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We believe in the power of technology to transform shopping experiences. Our platform combines cutting-edge 
                technology with a customer-first approach, ensuring that every purchase is seamless, secure, and satisfying.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Quick Facts</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-900" />
                  <span><strong>10,000+</strong> Products Available</span>
                </li>
                <li className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-900" />
                  <span><strong>50,000+</strong> Happy Customers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-blue-900" />
                  <span><strong>4.8/5</strong> Customer Rating</span>
                </li>
                <li className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-900" />
                  <span><strong>Fast</strong> Delivery Nationwide</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-blue-900" />
              <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To provide our customers with an unparalleled online shopping experience by offering high-quality 
              products, competitive prices, and exceptional customer service. We strive to make online shopping 
              accessible, convenient, and enjoyable for everyone.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-8 h-8 text-blue-900" />
              <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To become Rwanda's leading e-commerce platform, known for innovation, reliability, and customer 
              satisfaction. We envision a future where every household has access to quality products at their 
              fingertips, delivered with speed and care.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose E-Shop?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Shopping</h3>
              <p className="text-gray-600">
                Your data is protected with industry-standard encryption. Shop with confidence knowing your 
                information is safe.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                <Truck className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your orders delivered quickly with our reliable delivery partners. Track your order in real-time.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                <Clock className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our customer support team is always ready to help. Reach out anytime for assistance with your orders.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-900 text-white rounded-lg p-8 mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl text-gray-200 mb-6">
            Join thousands of satisfied customers and discover amazing products today!
          </p>
          <a
            href="/"
            className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Browse Products
          </a>
        </div>
      </div>
    </div>
  );
}
