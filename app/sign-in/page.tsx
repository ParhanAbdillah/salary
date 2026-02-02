import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950 px-4">
      <main className="flex w-full max-w-md flex-col items-center gap-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-2">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={24}
            priority
          />
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Selamat Datang Kembali
          </h1>
          <p>Silahkan login</p>
        </div>

        {/* Form Section */}
        <form className="flex w-full flex-col gap-4 mt-8" action="#">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="nama@perusahaan.com"
              className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none transition-all focus:border-black focus:ring-1 focus:ring-black dark:border-zinc-700 dark:focus:border-white dark:focus:ring-white"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="password">
                Kata Sandi
              </label>
              <a href="#" className="text-xs text-zinc-500 hover:underline dark:text-zinc-400">
                Lupa sandi?
              </a>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none transition-all focus:border-black focus:ring-1 focus:ring-black dark:border-zinc-700 dark:focus:border-white dark:focus:ring-white"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
          >
            Masuk Sekarang
          </button>
        </form>

        {/* Footer Section */}
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Belum punya akun?{" "}
          <a href="#" className="font-medium text-zinc-900 hover:underline dark:text-zinc-50">
            Daftar gratis
          </a>
        </p>
      </main>
    </div>
  );
}