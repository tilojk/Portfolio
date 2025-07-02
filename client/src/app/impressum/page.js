import Link from "next/link";

export default function Imprint() {
  return (
    <div className="container px-8 lg:px-12 xl:px-24 2xl:px-36 m-auto">
      <h1 className="relative text-4xl md:text-5xl pt-16 mb-8 md:mb-12 2xl:mb-16 text-center">
            <b>Impressum</b>
      </h1>
      <div>
        <h2 className="text-2xl mb-4">Angaben gemäß § 5 TMG:</h2>
        <p className="text-base mb-6">
          Tilo Jäkel<br />
          Riegelpfad 70<br />
          35392 Gießen<br />
          Deutschland
        </p>

        <h2 className="text-2xl mb-4">Kontakt:</h2>
        <p className="text-base mb-6">
          Telefon: +49 175 6288916<br />
          E-Mail: <Link href='mailto:tilo@v-jaekel.de' className='text-secondary-1 hover:underline'>tilo@v-jaekel.de</Link>
        </p>

        <h2 className="text-2xl mb-4">Bild- und Icon-Credits</h2>
        <p className="text-base mb-6">
          Der Header-Hintergrund und die Hero-Figur stammen aus der Design-Bibliothek <Link href='https://humaaans.com/' target='_blank' className='text-secondary-1 hover:underline'>Humaaans</Link> von Pablo Stanley.<br />
          Die Hintergründe im Abschnitt „Wie ich hierher gekommen bin“ wurden von <Link href='https://de.freepik.com/autor/vectorjuice' target='_blank' className='text-secondary-1 hover:underline'>vectorjuice</Link> über <Link href='https://www.freepik.com' target='_blank' className='text-secondary-1 hover:underline'>Freepik</Link> bereitgestellt.<br />
          Die verwendeten Icons stammen von <Link href='https://heroicons.com/' target='_blank' className='text-secondary-1 hover:underline'>Heroicons</Link>, <Link href='https://fontawesome.com/' target='_blank' className='text-secondary-1 hover:underline'>Font Awesome</Link> und <Link href='https://simpleicons.org/' target='_blank' className='text-secondary-1 hover:underline'>simple-icons</Link>.
        </p>

        <h2 className="text-2xl mb-4">Haftungsausschluss:</h2>
        <p className="text-base mb-16">
          Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
        </p>
      </div>
    </div>
  );
}
