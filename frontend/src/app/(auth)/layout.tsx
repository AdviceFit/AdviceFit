import gymImage from "../../../public/gym-image.jpg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="wrapper grid grid-cols-2">
      {/* <div className="w-full bg-gray-900"/>
       */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${gymImage.src})` }}
      />
      <div>{children}</div>
    </main>
  );
};

export default AuthLayout;
