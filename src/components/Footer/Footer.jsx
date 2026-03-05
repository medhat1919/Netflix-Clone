import React, { memo } from 'react'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

const Footer = memo(() => {
  return (
    <footer className="mx-auto max-w-5xl px-4 py-12 text-gray-500 lg:px-8">
      <div className="flex space-x-6 mb-6">
        <Facebook className="h-6 w-6 cursor-pointer hover:text-white transition" />
        <Instagram className="h-6 w-6 cursor-pointer hover:text-white transition" />
        <Twitter className="h-6 w-6 cursor-pointer hover:text-white transition" />
        <Youtube className="h-6 w-6 cursor-pointer hover:text-white transition" />
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs sm:grid-cols-3 md:grid-cols-4">
        <p className="cursor-pointer hover:underline">Audio Description</p>
        <p className="cursor-pointer hover:underline">Help Center</p>
        <p className="cursor-pointer hover:underline">Gift Cards</p>
        <p className="cursor-pointer hover:underline">Media Center</p>
        <p className="cursor-pointer hover:underline">Investor Relations</p>
        <p className="cursor-pointer hover:underline">Jobs</p>
        <p className="cursor-pointer hover:underline">Terms of Use</p>
        <p className="cursor-pointer hover:underline">Privacy</p>
        <p className="cursor-pointer hover:underline">Legal Notices</p>
        <p className="cursor-pointer hover:underline">Cookie Preferences</p>
        <p className="cursor-pointer hover:underline">Corporate Information</p>
        <p className="cursor-pointer hover:underline">Contact Us</p>
      </div>

      <div className="mt-8 border border-gray-600 px-2 py-1 text-xs inline-block cursor-pointer hover:text-white transition">
        Service Code
      </div>

      <p className="mt-6 text-[10px]">© 1997-2024 Netflix, Inc.</p>
    </footer>
  )
})

export default Footer