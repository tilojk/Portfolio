import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="container px-8 lg:px-12 xl:px-24 2xl:px-36 m-auto">
      <h1 className="relative text-4xl md:text-5xl 3xl:text-6xl pt-16 mb-8 md:mb-12 2xl:mb-16 text-center">
            <b>Datenschutzerklärung</b>
      </h1>
      <div>
        <p className="text-base 3xl:text-lg mb-6 3xl:mb-8">Ich freue mich über dein Interesse an meiner Webseite. Datenschutz hat für mich einen hohen Stellenwert. Nachfolgend informiere ich dich ausführlich über den Umgang mit deinen Daten im Rahmen des Kontaktformulars.</p>

        <h2 className="text-2xl 3xl:text-3xl mb-4 3xl:mb-6">1. Verantwortlicher</h2>
        <p className="text-base 3xl:text-lg mb-6 3xl:mb-8">
          Tilo Jäkel<br />
          Riegelpfad 70<br />
          35392 Gießen<br />
          Deutschland<br />
          <Link href='mailto:tilo@v-jaekel.de' className='text-secondary-1 hover:underline'>tilo@v-jaekel.de</Link><br />
        </p>

        <h2 className="text-2xl 3xl:text-3xl mb-4 3xl:mb-6">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
        <p className="text-base 3xl:text-lg mb-4 3xl:mb-6">Wenn du mein Kontaktformular nutzt, erhebe ich die folgenden personenbezogenen Daten:</p>
        <ul className="text-base 3xl:text-lg mb-4 3xl:mb-6 list-disc list-inside">
          <li>Deine E-Mail-Adresse</li>
          <li>Betreff</li>
          <li>Nachrichtentext</li>
        </ul>
        <p className="text-base 3xl:text-lg mb-6 3xl:mb-8">Diese Daten benötige ich, um deine Anfrage zu bearbeiten und dir ggf. antworten zu können.</p>

        <h2 className="text-2xl 3xl:text-3xl mb-4 3xl:mb-6">3. Zweck und Rechtsgrundlage der Verarbeitung</h2>
        <p className="text-base 3xl:text-lg mb-6 3xl:mb-8">Die Verarbeitung deiner Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, um deine Anfrage zu beantworten und mit dir in Kontakt treten zu können.</p>

        <h2 className="text-2xl 3xl:text-3xl mb-4 3xl:mb-6">4. Versand der E-Mails</h2>
        <p className="text-base 3xl:text-lg mb-6 3xl:mb-8">Der Versand deiner Nachricht erfolgt über den SMTP-Mailserver der Telekom (securesmtp.t-online.de). Die Telekom stellt lediglich die technische Infrastruktur bereit. Eine Auftragsverarbeitung im Sinne der DSGVO findet hierbei nicht statt, da die Telekom keinen Zugriff auf den Inhalt der E-Mails erhält.</p>

        <h2 className="text-2xl 3xl:text-3xl mb-4 3xl:mb-6">5. Speicherung der Daten</h2>
        <p className="text-base 3xl:text-lg mb-6 3xl:mb-8">Deine Daten werden nur so lange gespeichert, wie es für die Bearbeitung deiner Anfrage erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.</p>

        <h2 className="text-2xl 3xl:text-3xl mb-4 3xl:mb-6">6. Weitergabe an Dritte</h2>
        <p className="text-base 3xl:text-lg mb-6 3xl:mb-8">Eine Weitergabe deiner personenbezogenen Daten an Dritte erfolgt nicht, es sei denn, ich bin hierzu gesetzlich verpflichtet oder du hast ausdrücklich eingewilligt.</p>

        <h2 className="text-2xl 3xl:text-3xl mb-4 3xl:mb-6">7. Deine Rechte</h2>
        <p className="text-base 3xl:text-lg mb-4 3xl:mb-6">Du hast das Recht, jederzeit Auskunft über die von mir gespeicherten personenbezogenen Daten zu erhalten sowie Berichtigung, Löschung oder Einschränkung der Verarbeitung zu verlangen. Außerdem kannst du der Verarbeitung widersprechen und das Recht auf Datenübertragbarkeit geltend machen.</p>
        <p className="text-base 3xl:text-lg mb-6 3xl:mb-8">Zur Ausübung dieser Rechte wende dich bitte an die unter Punkt 1 genannten Kontaktdaten.</p>

        <h2 className="text-2xl 3xl:text-3xl mb-4 3xl:mb-6">8. Kontakt für Datenschutzfragen</h2>
        <p className="text-base 3xl:text-lg mb-16">Bei Fragen zum Datenschutz kannst du dich gerne an mich wenden unter: <Link href='mailto:tilo@v-jaekel.de' className='text-secondary-1 hover:underline'>tilo@v-jaekel.de</Link>.</p>
      </div>
    </div>
  );
}
