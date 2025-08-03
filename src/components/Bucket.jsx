"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Bucket = ({ data, removedata, total }) => {
  const pathname = usePathname();
const router = useRouter()

  const handlePlaceOrder = () => {
    const user = JSON.parse(localStorage.getItem("currentuser"));
    if (!user) {
      toast.error("Please login to place order");
      router.push("/login");
      return;
    }

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      id: Date.now(),
      items: data,
      total,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder])
    );

    localStorage.removeItem("cart");

    router.push("/myorders");

    toast.success("Order placed successfully!");
  };

  return (
    <>
      {data && data.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {data &&
              data.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-4 rounded-xl shadow"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div>
                      <h2 className="font-bold text-gray-800">{item.brand}</h2>
                      <p className="text-gray-600 text-sm">{item.title}</p>
                      <p className="text-gray-800 mt-1 font-semibold">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removedata(item.id)}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>

          {/* Summary */}
          {pathname == "/showitem/cart" && (
            <div className="bg-white p-6 rounded-xl shadow h-fit">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Price Details
              </h2>
              <div className="flex justify-between text-gray-700">
                <span>Total Items:</span>
                {data && <span>{data.length}</span>}
              </div>
              <div className="flex justify-between text-gray-700 mt-2">
                <span>Total Price:</span>
                <span className="font-bold text-black">₹{total}</span>
              </div>
              <button
                className="w-full mt-6 bg-[#FF527B] hover:bg-[#e0466d] text-white font-bold py-3 rounded-full transition"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Bucket;
