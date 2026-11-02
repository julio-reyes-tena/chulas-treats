import { products, formatPrice } from "@/data/products";


export default function Home() {
  return (
    <main className="min-h-screen bg-pink-50 text-stone-900">
      <header className="border-b border-pink-100 bg-white">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5"
        >
          <a href="#" className="text-xl font-bold text-pink-800">
            Chula&apos;s Treats
          </a>

          <div className="flex gap-5 text-sm font-medium">
            <a href="#menu" className="hover:text-pink-700">
              Menu
            </a>
            <a href="#pickup" className="hover:text-pink-700">
              Pickup
            </a>
            <a
              href="https://www.instagram.com/laschulastreats/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-700"
            >
              Instagram
            </a>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
        <p className="text-sm font-semibold uppercase tracking-widest text-pink-700">
          A little sweetness for every occasion
        </p>

        <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-7xl">
          Chula&apos;s Treats
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
          Cookies, cupcakes, and chocolate-covered strawberries for
          celebrations, thoughtful gifts, and everyday cravings.
        </p>

        <a
          href="#menu"
          className="mt-8 inline-block rounded-full bg-pink-700 px-8 py-3 font-semibold text-white transition hover:bg-pink-800"
        >
          Explore the menu
        </a>
      </section>

      <section id="menu" className="mx-auto max-w-6xl scroll-mt-6 px-6 pb-20">
        <h2 className="text-3xl font-bold">The sweet lineup</h2>
        <p className="mt-3 text-stone-600">
          Sample menu and pricing. Online ordering is coming soon.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.name}
              className="flex flex-col rounded-3xl border border-pink-100 bg-white p-7 shadow-sm"
            >
              <div
                aria-hidden="true"
                className="flex h-36 items-center justify-center rounded-2xl bg-pink-100 text-6xl"
              >
                {product.emoji}
              </div>

              <h3 className="mt-6 text-xl font-bold">{product.name}</h3>

              <p className="mt-3 flex-1 leading-relaxed text-stone-600">
                {product.description}
              </p>

              <p className="mt-6">
                <span className="text-2xl font-bold text-pink-800">
{formatPrice(product.priceInCents)}                </span>{" "}
                <span className="text-sm text-stone-500">
                  {product.quantity}
                </span>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="pickup" className="scroll-mt-6 bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">Planning your pickup</h2>

          <p className="mt-3 text-stone-600">
            Proposed pickup policy—details will be confirmed before ordering
            opens.
          </p>

          <ul className="mt-6 space-y-4 leading-relaxed text-stone-700">
            <li>
              <strong>Order ahead:</strong> At least 72 hours before pickup.
            </li>
            <li>
              <strong>Pickup days:</strong> Friday and Saturday, 11 AM–5 PM,
              Pacific time.
            </li>
            <li>
              <strong>Appointments:</strong> Choose an available 30-minute
              pickup window when ordering opens.
            </li>
            <li>
              <strong>Minimum order:</strong> One dozen per product and flavor.
            </li>
            <li>
              <strong>Location:</strong> Pickup instructions will be included
              with confirmed orders.
            </li>
            <li>
              <strong>Custom designs:</strong> Contact us at least seven days
              ahead for a quote.
            </li>
          </ul>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <h2 className="text-3xl font-bold">Follow the sweetness</h2>
        <p className="mt-4 text-stone-600">
          See our latest treats and ask about custom designs.
        </p>

        <a
          href="https://www.instagram.com/laschulastreats/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full border border-pink-700 px-7 py-3 font-semibold text-pink-800 transition hover:bg-pink-100"
        >
          @laschulastreats
        </a>
      </section>

      <footer className="border-t border-pink-200 px-6 py-6 text-center text-sm text-stone-600">
        Chula&apos;s Treats · Made with love
      </footer>
    </main>
  );
}