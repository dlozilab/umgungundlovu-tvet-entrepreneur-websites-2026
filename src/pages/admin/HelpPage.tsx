const QUESTIONS = [
  { q: 'How do I change a photo?', a: 'Open Gallery or Services, find the photo you want to change, and press Replace. Choose a new photo from your phone.' },
  { q: 'How do I change my trading hours?', a: 'Open Contact and hours, type the new hours, and press Save changes.' },
  { q: 'Why does my link look plain when I send it?', a: 'Open Branding and set a share picture. That is the photo people see when you send your link on WhatsApp.' },
  { q: 'Why only one colour?', a: 'All the writing on your site is black on white so that it is easy to read. Your colour is used for the buttons and the small details.' },
  { q: 'Something looks wrong on the site', a: 'Phone mLab. We look after this site and there is no charge to fix it.' },
];

export default function HelpPage() {
  return (
    <section>
      <h2>Help</h2>
      <p>Short instructions for the things you will do most often.</p>

      {QUESTIONS.map(({ q, a }) => (
        <div key={q} style={{ borderBottom: '1px solid var(--line-soft)', padding: '16px 0' }}>
          <h3 style={{ marginBottom: 4 }}>{q}</h3>
          <p style={{ margin: 0, fontSize: 14 }}>{a}</p>
        </div>
      ))}
    </section>
  );
}