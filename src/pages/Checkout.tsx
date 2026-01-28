import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Ticket, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const Checkout = () => {
  const { items, totalAmount, removeItem } = useCart();
  const { user } = useAuth();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <Card className="p-8 text-center max-w-md">
          <Ticket className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-4">
            Browse events and add tickets to your cart to proceed with checkout.
          </p>
          <Button onClick={() => window.location.href = "/events"}>
            Browse Events
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Your Tickets</h2>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.ticketTypeName}</h3>
                      <p className="text-sm text-muted-foreground">{item.eventName}</p>
                      <p className="text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your order before payment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.ticketTypeName} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-primary" size="lg">
                  Proceed to Payment
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By completing this purchase, you agree to our Terms of Service
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
