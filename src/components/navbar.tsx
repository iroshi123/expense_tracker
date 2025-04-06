"use client";
import { useState } from "react";
import { cn } from "@/lib/utils"; // Ensure you have the cn utility from ShadCN
import { GraduationCap, Menu } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);  


 return (
    <nav className="bg-white shadow-md dark:bg-gray-900">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo / Icon */}
        <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">ExpenseTracker</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <a href="/#" className="text-gray-700 hover:text-blue-500 dark:text-gray-300">Dashboard</a>
          <a href="/category" className="text-gray-700 hover:text-blue-500 dark:text-gray-300">Category</a>
          <a href="/expense" className="text-gray-700 hover:text-blue-500 dark:text-gray-300">Expense</a>
          <a href="/tag" className="text-gray-700 hover:text-blue-500 dark:text-gray-300">Tag</a>
         
        </div>
      </div> 

    </nav>
  );
}
