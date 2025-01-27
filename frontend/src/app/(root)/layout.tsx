import Footer from "@/components/shared/Footer"
import Navbar from "@/components/shared/Navbar"

const HomepageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="h-screen bg-gradient-to-r from-blue-500 to-green-500">
            <Navbar />
            {children}
            <Footer />
        </main>
    )
}

export default HomepageLayout