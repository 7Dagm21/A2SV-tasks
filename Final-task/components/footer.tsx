export function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">JobPortal</h3>
            <p className="text-sm text-gray-600">
              Find your dream job or the perfect candidate. JobPortal connects talented individuals with great
              opportunities.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact</h3>
            <address className="not-italic text-sm text-gray-600 space-y-2">
              <p>123 Job Street</p>
              <p>Addis Ababa, Ethiopia</p>
              <p>Email: info@jobportal.com</p>
              <p>Phone: +251 123 456 789</p>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
