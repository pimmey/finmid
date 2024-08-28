export default function Nav() {
  return (
    <nav className="sticky top-2 z-50">
      <div className="container mx-auto mb-8 px-4">
        <div className="bg-brand flex justify-between rounded-full px-8 py-4 text-2xl">
          <div className="flex items-center justify-between gap-x-2">
            <img src="/logo.png" className="w-8" />
            <span>SME transactions</span>
          </div>
          Sme Name | Hey, Gandalf! | Logout
        </div>
      </div>
    </nav>
  );
}
