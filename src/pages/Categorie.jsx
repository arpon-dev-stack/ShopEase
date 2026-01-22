import { TrendingUp, Shield, Truck, RefreshCw } from 'lucide-react';

function Categorie() {
    return (
        <div className="h-screen w-full">
            <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <Truck className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Free Shipping</h3>
                    <p className="text-gray-600 text-sm">On orders over $50</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Secure Payment</h3>
                    <p className="text-gray-600 text-sm">100% secure payment</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <RefreshCw className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Easy Returns</h3>
                    <p className="text-gray-600 text-sm">30-day return policy</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Best Price</h3>
                    <p className="text-gray-600 text-sm">Price match guarantee</p>
                </div>
            </section>
        </div>
    )
}

export default Categorie