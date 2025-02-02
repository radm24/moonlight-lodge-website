import Header from "@/app/_components/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header isHomepage={true} />
      <div className="flex-1 px-8 py-12 grid">
        <main className="max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </>
  );
}
