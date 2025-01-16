const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="wrapper grid grid-cols-2">
            <div className="w-full bg-gray-900"/>
            <div>
                {children}
            </div>
        </main>
    )
}

export default AuthLayout
