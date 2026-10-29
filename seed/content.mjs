/**
 * Seed content — extracted from the Webflow export (esa-2026).
 *
 * This file does two jobs:
 *  1. `npm run seed:build` turns it into seed/esa-seed.tar.gz for `sanity dataset import`.
 *  2. Until Sanity is connected (no PUBLIC_SANITY_PROJECT_ID), the website renders from it directly.
 *
 * Headlines: one line per "\n". A line starting with * renders red.
 */

const I = (file, alt = '') => ({_type: 'imageAlt', _sanityAsset: `image@file://./images/${file}`, alt})
const btn = (label, href) => ({_type: 'linkButton', label, href})
const spec = (label, value) => ({_type: 'spec', label, value})
const point = (title, copy) => ({_type: 'point', title, copy})
const faq = (question, answer) => ({_type: 'faq', question, answer})
const photo = (label, image) => ({_type: 'photoCell', label, image})
const cta = (heading, copy, primary, secondary) => ({_type: 'cta', heading, copy, primary, secondary})
const seo = (title, description) => ({_type: 'seo', title, description})
const cls = (time, name, group) => ({_type: 'classItem', time, name, group})

const BOOK = btn('Book a free class', '/visit-us')
const CALL = btn('Call 516-868-5000', 'tel:15168685000')
const SCHEDULE = btn('See the schedule', '/schedule')

/* ------------------------------------------------------------------ */
export const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'Emerson Souza Brazilian Jiu-Jitsu',
  phone: '516-868-5000',
  phoneDial: '15168685000',
  email: 'souzabjj@gmail.com',
  street: '2420 Grand Avenue',
  city: 'Baldwin',
  region: 'NY',
  zip: '11510',
  entranceNote: 'Entrance and parking in the rear',
  directionsUrl: 'https://goo.gl/maps/LH9Cm5C7f74ysdCm8',
  mapQuery: '2420 Grand Ave, Baldwin, NY 11510',
  hours: [
    spec('Mon, Wed, Fri', '11:00 AM to 9:00 PM'),
    spec('Tue, Thu', '6:00 AM to 8:00 PM'),
    spec('Saturday', '10:00 AM to 1:00 PM · Closed Sunday'),
    spec('Entrance', 'Entrance and parking in the rear · 5 min from Baldwin LIRR'),
  ],
  towns: [
    ['Baldwin', 'Right here'], ['Freeport', '6 min'], ['Rockville Centre', '8 min'], ['Oceanside', '10 min'],
    ['Merrick', '10 min'], ['Bellmore', '13 min'], ['Lynbrook', '13 min'], ['Hempstead', '14 min'],
    ['Garden City', '15 min'], ['Wantagh', '16 min'], ['Long Beach', '17 min'], ['Valley Stream', '18 min'],
  ].map(([name, drive]) => ({_type: 'town', name, drive})),
  googleForm: {
    actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfM8PoVPVZuPZ-9yLKxcIEWAYCS46wLnKv3jBJ6UMnhDXGRHA/formResponse',
    emailField: 'emailAddress',
    nameField: 'entry.701788627',
    phoneField: 'entry.1454319295',
    classField: 'entry.2019743857',
    options: [
      ['Adult BJJ Fundamentals', 'Adult BJJ'],
      ['Early morning jiu-jitsu', 'Early Morning Adult BJJ Program'],
      ["Kids, Little Ninja's 5-7", "Kids Little Ninja's 5-7"],
      ["Kids, Young Samurai's 8+", "Kids Young Samurai's 8+"],
    ].map(([label, googleValue]) => ({_type: 'formOption', label, googleValue})),
    successMessage: 'Thank you! Your submission has been received!',
    errorMessage: 'Oops! Something went wrong while submitting the form.',
  },
  footerTitle: 'Built on the mat.',
  footerNote: 'Brazilian jiu-jitsu in Baldwin, New York. Serving Nassau County since 2003.',
  instagram: 'https://www.instagram.com/emersonsouzajiujitsu/',
  facebook: 'https://www.facebook.com/esabjj/',
  youtube: 'https://www.youtube.com/user/relaxinmind',
  marquee: ['Gi', 'No-gi', 'Kids', 'Open mat', 'Baldwin, NY', 'Since 2003'],
  siteUrl: 'https://souzabjj.com',
}

/* ------------------------------------------------------------------ */
const MWF = [
  cls('11:15', 'BJJ Fundamentals', 'Adults · Gi'),
  cls('12:15', 'Advanced live roll', 'Adults'),
  cls('17:00', "Little Ninja's", 'Ages 5-7'),
  cls('18:00', "Young Samurai's", 'Ages 8+'),
  cls('18:45', 'BJJ Fundamentals', 'Adults · Gi'),
  cls('19:30', 'Advanced live roll', 'Adults'),
]
const TT = [cls('06:00', 'Early morning jiu-jitsu', 'Adults'), cls('19:00', 'BJJ all levels', 'Adults')]
export const classSchedule = {
  _id: 'classSchedule',
  _type: 'classSchedule',
  monday: MWF,
  tuesday: TT,
  wednesday: MWF,
  thursday: TT,
  friday: MWF,
  saturday: [cls('10:00', 'Conditioning', 'All levels'), cls('11:00', 'Open mat', 'All levels')],
  sunday: [],
}

/* ------------------------------------------------------------------ */
export const blackBelts = [
  ['Emerson Souza', '1998', 'Professor · Head instructor', 5],
  ['Brian Punger', '2011-12-01', 'Coach'],
  ['Betsy Lantner', '2011-12-01', ''],
  ['Gennady Tsakh', null, ''],
  ['Ivan Gomez', null, 'Coach'],
  ['Chester Indiviglio', '2014-05-23', ''],
  ['Anthony Chipe', '2014-05-23', ''],
  ['John Reilly', '2015-12-19', ''],
  ['Mark Gray', '2016-12', ''],
  ['Bryan Bruno', '2016-12', ''],
  ['Anthony Senatore', '2017-12-13', ''],
  ['Dave Kogan', '2018-12', ''],
  ['Mike Loscalzo', '2019-12', ''],
  ['Chris Alexander', '2021-12', ''],
  ['Mike Riservato', '2025-09-09', ''],
  ['Dave Palmeri', '2026-04-24', ''],
  ['John Giotis', null, ''],
  ['Thomas Tona', null, ''],
  ['Edward Sylvia', null, ''],
  ['Sam Johnson', null, ''],
  ['Keith Hanuman', null, ''],
].map(([name, promoted, role, degreeOverride]) => ({
  _id: 'bb-' + name.toLowerCase().replace(/[^a-z]+/g, '-'),
  _type: 'blackBelt',
  name,
  ...(promoted ? {promoted} : {}),
  ...(role ? {role} : {}),
  ...(degreeOverride != null ? {degreeOverride} : {}),
}))
const bbRef = (name) => ({_type: 'reference', _ref: 'bb-' + name.toLowerCase().replace(/[^a-z]+/g, '-')})

/* ------------------------------------------------------------------ */
export const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  heroHeadline: 'World\nchampion\njiu-jitsu\n*in Baldwin',
  heroButton: 'Book your free class',
  heroImage: I('souzafam.png', 'Professor Emerson Souza throwing a training partner'),
  heroCardTitle: 'Convenient\nlocation',
  heroCardCopy: '2420 Grand Avenue, Baldwin. Entrance and parking in the rear, five minutes from the Baldwin LIRR.',
  heroNoteTitle: "Gi, no-gi, kids\nand Little Ninja's",
  heroNoteCopy: 'Six days a week with a black belt coaching staff trained by Professor Emerson Souza.',
  heroNextImages: [I('mats.jpg'), I('group-shot.jpg')],
  programsRail: 'Programs',
  programsHeading: 'Everyone\nstarts somewhere',
  programs: [
    ['BJJ Fundamentals', 'Position, escape, submission. Built for day one.', '/adult-classes'],
    ['Advanced live roll', 'Positional sparring and open rolling. The competition team trains here.', '/adult-classes'],
    ["Little Ninja's, 5-7", 'Respect, teamwork and confidence, taught through real jiu-jitsu.', '/kids-classes'],
    ["Young Samurai's, 8+", 'Fundamentals, self defense and bully prevention.', '/kids-classes'],
  ].map(([title, copy, href]) => ({_type: 'programRow', title, copy, href})),
  scheduleEyebrow: 'This week on the mats',
  scheduleHeading: 'Six days a week',
  scheduleNote: 'Closed Sunday. Saturday is conditioning and open mat. Today is highlighted.',
  firstClassLabel: 'Before your first class',
  firstClassCopy: 'Book ahead and we will have a gi in your size waiting. Arrive ten minutes early. Talk pricing after.',
  firstClassButton: 'Claim a spot',
  profEyebrow: 'The professor',
  profHeading: 'Emerson\n"Eminho" Souza',
  profLead:
    'Training since the age of 12. A black belt under Carlos Gracie Jr. out of Gracie Barra in Rio de Janeiro, and a world champion competitor. He came to New York in 2003 and built one of the premier schools on Long Island here in Baldwin.',
  profTitles: [spec('World', 'IBJJF champion'), spec('Pan-Am', 'IBJJF champion'), spec('Brasil', 'National champion'), spec('2010', 'NY International Open')],
  profLink: 'Meet the instructors',
  profImage: I('EMERSONBW.jpg', 'Professor Emerson Souza'),
  profBadge: '5th degree black belt',
  townsEyebrow: 'Serving Nassau County',
  townsHeading: 'Minutes from the South Shore',
  cta: cta('Your first class\nis free', 'No commitment. Tell us when you want to come in and we will have a gi waiting for you.', BOOK, CALL),
  seo: seo(
    'Brazilian Jiu-Jitsu in Baldwin, NY | Emerson Souza BJJ',
    'World champion Brazilian jiu-jitsu in Baldwin, NY. Gi, no-gi and kids classes six days a week with Professor Emerson Souza and his black belt staff. First class free.',
  ),
}

/* ------------------------------------------------------------------ */
export const adultPage = {
  _id: 'adultPage',
  _type: 'adultPage',
  kicker: 'Adult classes · Baldwin, NY',
  headline: 'Adult\njiu-jitsu,\ntaught\n*properly',
  primaryButton: btn('Book your free class', '/visit-us'),
  secondaryButton: SCHEDULE,
  heroImage: I('websitehero_0001_Layer-0.png', 'Adult jiu-jitsu class on the mats in Baldwin, NY'),
  points: [
    point('No experience\nneeded', 'Most people who walk in have never trained. Fundamentals is built for day one.'),
    point('Gi provided\nfor your first class', 'Wear something you can move in and bring water. We take care of the rest.'),
  ],
  timesLabel: 'Adult class times',
  times: [
    spec('Mon Wed Fri', '11:15 AM · 12:15 PM · 6:45 PM · 7:30 PM'),
    spec('Tue Thu', '6:00 AM · 7:00 PM'),
    spec('Sat', '10:00 AM conditioning · 11:00 AM open mat'),
  ],
  programRail: 'The program',
  programHeading: 'Empower yourself\nand your mind',
  programCopy:
    'When you join the Emerson Souza Academy, no matter what level you come in at, you become part of a family. You will learn quickly how effective jiu-jitsu is in self defense and in your day to day life.',
  programCopy2:
    'There is no striking in jiu-jitsu. That is the point. Training without strikes lets you drill and roll at full speed against a resisting partner, which is why it works.',
  specs: [
    spec('Levels', 'Day one beginners through black belt'),
    spec('Formats', 'Gi fundamentals, advanced live rolling, no-gi and conditioning'),
    spec('Ages', 'Teens 14 and up train in the adult program'),
    spec('Gear', 'Gi provided for your first class'),
    spec('Instruction', 'A black belt coaching staff promoted by Professor Emerson Souza'),
  ],
  cardsHeading: 'Three ways in',
  cards: [
    {_type: 'programCard', kicker: 'Gi · All levels', title: 'BJJ Fundamentals', description: 'Position, escape, submission. The core curriculum, taught so a first-timer can follow it on day one.', when: 'Mon, Wed, Fri · 11:15 AM and 6:45 PM', image: I('mats.jpg', 'BJJ Fundamentals class')},
    {_type: 'programCard', kicker: 'Advanced', title: 'Advanced live roll', description: 'Positional sparring and open rolling for students with the basics down. The competition team trains out of this class.', when: 'Mon, Wed, Fri · 12:15 PM and 7:30 PM', image: I('group-shot.jpg', 'Advanced live roll')},
    {_type: 'programCard', kicker: 'Before and after work', title: 'Early morning and all levels', description: 'Train before the commute or after the office. Saturday adds conditioning and a two hour open mat.', when: 'Tue, Thu · 6:00 AM and 7:00 PM', image: I('group-shot.jpg', 'Early morning and all levels class')},
  ],
  stripRail: 'On the mat',
  strip: [photo('Live rolling', I('group-shot.jpg', 'Live rolling')), photo('No-gi', I('mats.jpg', 'No-gi training')), photo('Competition team', I('coaching.jpg', 'Competition team'))],
  benefitsHeading: 'What an hour\non the mat does',
  benefitsAside: 'Self defense is why most people walk in. It is rarely why they stay.',
  benefits: [
    point('Real self defense', 'Leverage, not strength. You learn how to control a larger opponent, and how to get back to your feet.'),
    point('A hard hour of cardio', 'A single class burns in the range of 700 to 1,100 calories depending on how hard you roll.'),
    point('Stress drops', 'Better sleep, better mood, and an hour where you cannot think about anything else.'),
    point('Training partners', 'You will meet people who care whether you improve. There are no strangers on the mat for long.'),
    point('A problem to solve', 'Jiu-jitsu is a chess match with thousands of positions. It trains you to think outside your comfort zone.'),
    point('Measurable progress', 'Stripes and belts are earned on the mat over time. Nobody tests for a belt here.'),
  ],
  feature: {
    _type: 'feature',
    kicker: 'Gi and no-gi',
    heading: 'The best workout\nyou will stick with',
    copy: 'An hour of rolling is serious cardio and full-body strength work, but you are too busy solving problems to notice. People who hate the gym come back to this.',
    image: I('websitehero_0001_Layer-0.png', 'Adult in a gi'),
    calloutTitle: '6 days',
    calloutText: 'Mornings, evenings and Saturday open mat',
  },
  whyKicker: 'Why Brazilian jiu-jitsu',
  whyHeading: 'A smaller person can\nbeat a stronger one',
  whyCopy:
    'In the early days of the UFC, jiu-jitsu made it clear that a smaller, weaker opponent was not to be taken lightly. Leverage did the work, and the Gracie name became a household one overnight.',
  whyCopy2:
    'Because of the gentle aspect of the art, it can be trained close to full speed and full force daily, without the toll striking arts take on their practitioners.',
  whyImage: I('portrait-emerson.png', 'Competition jiu-jitsu'),
  cta: cta('Ready to try\na class?', 'No commitment necessary. Come in for a trial so you can see how much you will like it.', BOOK, SCHEDULE),
  seo: seo(
    'Adult Brazilian Jiu-Jitsu Classes in Baldwin, NY | Emerson Souza BJJ',
    'Gi and no-gi Brazilian jiu-jitsu for adults in Baldwin, NY. Fundamentals, advanced live rolling, early morning classes. Serving Freeport, Rockville Centre, Oceanside and Nassau County. First class free.',
  ),
}

/* ------------------------------------------------------------------ */
export const kidsPage = {
  _id: 'kidsPage',
  _type: 'kidsPage',
  kicker: 'Kids martial arts · Baldwin, NY',
  headline: 'Kids jiu-jitsu\nand self\n*defense',
  intro: 'A fun, challenging after-school activity that teaches your child to defend themselves and to carry themselves differently.',
  primaryButton: btn('Book a free kids class', '/visit-us'),
  secondaryButton: btn('Call the academy', 'tel:15168685000'),
  heroImage: I('lucas-thor.png', 'Kids jiu-jitsu class in Baldwin, NY'),
  points: [
    point('Parents watch\nfrom the floor', 'Come and watch a full class before you decide. Plenty of parents do.'),
    point('Three days\na week', "Monday, Wednesday and Friday afternoons. Little Ninja's at 5:00, Young Samurai's at 6:00."),
  ],
  sideLabel: 'No belt tests',
  sideCopy: 'Jiu-jitsu is the one art that does not test for rank. As Carlos Gracie Jr. says, the mats never lie. Kids learn that hard work is what pays off.',
  agesRail: 'Two age groups',
  agesHeading: 'Age specific\ninstruction, not\na mixed room',
  ageGroups: [
    {_type: 'ageGroup', name: "Little Ninja's", ages: 'Ages 5-7', time: '5:00 PM', meta: 'Mon, Wed, Fri · 45 minutes', description: "Using the jiu-jitsu discipline, we teach our Little Ninja's character traits like respect, teamwork and confidence, while introducing physical skills and communication strategies.", button: BOOK},
    {_type: 'ageGroup', name: "Young Samurai's", ages: 'Ages 8+', time: '6:00 PM', meta: 'Mon, Wed, Fri · 45 minutes', description: "Our Young Samurai's learn the fundamentals of jiu-jitsu alongside the importance of a healthy, active lifestyle. Hard work is expected, and it does not go without praise.", button: BOOK},
  ],
  stripRail: 'On the mat',
  strip: [
    photo('Class in session', I('portrait-emerson.png', 'Kids class in session')),
    photo('Drilling', I('group-shot.jpg', 'Kids drilling')),
    photo('Belt promotion', I('476447451_1119564140013446_5916638983177006637_n.jpg', 'Belt promotion')),
  ],
  benefitsHeading: 'What changes in the\nfirst few months',
  benefitsAside: 'Building confidence matters as much as learning self defense. We build up, we do not break down.',
  benefits: [
    point('Self confidence', "After a few weeks you will see a change in your child's demeanor and how they carry themselves."),
    point('Bully prevention', 'Bullies look for an easy target. Confidence and skill make a child stand differently.'),
    point('Real exercise', 'A healthy after-school habit that breaks the screen-time cycle three days a week.'),
    point('New friends', 'Kids meet teammates outside their school and grade, and the friendships tend to last.'),
    point('Help with anxiety', 'Confidence, patience and hard exercise together give anxious kids an outlet that works.'),
    point('Teamwork', 'Children learn to work with a partner to drill safely and get each other better.'),
    point('Earning things', 'Jiu-jitsu does not test for belts. You put the time in and the rank comes.'),
    point('Problem solving', 'Hundreds of positions and thousands of techniques. Your child solves puzzles without noticing.'),
  ],
  feature: {
    _type: 'feature',
    kicker: 'What parents notice',
    heading: 'They stand\na little taller',
    copy: 'The first thing most parents mention is not a technique. It is how their kid walks into school a month later.',
    image: I('kids-classes-Medium.png', 'Kid in a gi'),
    calloutTitle: 'Ages 5+',
    calloutText: 'Mon, Wed, Fri · First class free',
  },
  quote: '"The art of jiu-jitsu is worth more in every way than all of our athletics combined."',
  quoteCite: 'President Theodore Roosevelt - 1905',
  quoteImage: I('theodoreroosevelt.jpg', 'Kids drilling jiu-jitsu'),
  faqKicker: 'Parent questions',
  faqHeading: "Before your child's\nfirst class",
  faqSince: 'Teaching Baldwin families since 2003',
  faqs: [
    faq('How young can my child start?', "Little Ninja's begins at age 5. Young Samurai's is ages 8 and up. If your child is on the line between the two, we will put them where they will do best."),
    faq('Does my child need a gi?', 'Not for the first class. We lend one. If they keep training we will point you to the right size and where to get it.'),
    faq('Is it safe?', 'There is no striking in jiu-jitsu. Kids drill and roll with supervision and with partners matched by size and experience.'),
    faq('Can I watch?', 'Yes. Parents watch from the floor. We ask that coaching stays with the coaches during class.'),
    faq('What if my child is shy?', 'Most are, on day one. The curriculum is built to bring a quiet kid along at their own pace rather than put them on the spot.'),
  ],
  cta: cta(
    "Your child's first\nclass is free",
    "Come and watch first if you would rather. Little Ninja's at 5:00, Young Samurai's at 6:00, Monday, Wednesday and Friday.",
    btn('Book a free kids class', '/visit-us'),
    CALL,
  ),
  seo: seo(
    'Kids Jiu-Jitsu & Martial Arts in Baldwin, NY | Emerson Souza BJJ',
    "Kids jiu-jitsu and self defense in Baldwin, NY. Little Ninja's ages 5-7 and Young Samurai's ages 8+, Mon, Wed, Fri. Confidence, respect and bully prevention. Serving Freeport, Oceanside, Rockville Centre and Nassau County. First class free.",
  ),
}

/* ------------------------------------------------------------------ */
export const schedulePage = {
  _id: 'schedulePage',
  _type: 'schedulePage',
  kicker: 'Class schedule · Baldwin, NY',
  headline: 'Six days\n*a week',
  lead: 'Taught by a black belt coaching staff promoted by Professor Emerson Souza. Closed Sunday.',
  upNextButton: 'Claim a spot',
  boardNotes: ['Crossed-out classes have already started today', 'Doors open 15 minutes before the first class'],
  weekHeading: 'Everything on the mat,\nMonday to Saturday',
  weekAside: 'Today is highlighted',
  weekNote: 'Closed Sunday. Saturday is conditioning at 10:00 followed by a two hour open mat.',
  guideRail: 'Which class',
  guideHeading: 'Start with\nfundamentals',
  guideCopy:
    'If you have never trained, come to BJJ Fundamentals or BJJ All Levels. Advanced live roll is for students who already have the basics. Nobody will put you somewhere you are not ready for.',
  guide: [
    spec('Never trained', 'BJJ Fundamentals or BJJ all levels'),
    spec('Six months in', 'Fundamentals plus advanced live roll'),
    spec('Competing', 'Advanced live roll and Saturday open mat'),
    spec('Tight schedule', 'Early morning jiu-jitsu, Tue and Thu at 6:00 AM'),
  ],
  cta: cta('Pick a class\nand come in', '2420 Grand Avenue, Baldwin. Entrance and parking in the rear. Your first class is free.', BOOK, CALL),
  seo: seo(
    'BJJ Class Schedule in Baldwin, NY | Emerson Souza BJJ',
    "Brazilian jiu-jitsu class schedule in Baldwin, NY. Adult gi and no-gi, early morning, kids and Saturday open mat, six days a week. See today's next class and book your free first class.",
  ),
}

/* ------------------------------------------------------------------ */
const ev = (year, place, title, body, stageName, file, alt, keyWhite) => ({
  _type: 'historyEvent', year, place, title, body, stageName, image: I(file, alt), keyWhite,
})
export const historyPage = {
  _id: 'historyPage',
  _type: 'historyPage',
  kicker: 'History · Brazilian jiu-jitsu',
  headline: 'From the\nsamurai to\n*Grand Avenue',
  lead: 'A martial art built on leverage, carried from Japan to Brazil, refined by the Gracie family and taught in Baldwin since 2003.',
  kanji: [
    {_type: 'kanjiRow', glyph: '柔', title: 'Jū · gentle', copy: "Use the opponent's strength instead of meeting it."},
    {_type: 'kanjiRow', glyph: '術', title: 'Jutsu · art', copy: 'Technique over size. Hence the name, the gentle art.'},
  ],
  timelineLabel: 'The line, year by year',
  events: [
    ev('1500s', 'Japan', 'Born in the samurai schools', 'A samurai who lost his sword on the battlefield still had to fight. Strikes did little against armour, so takedowns, locks and chokes won out.', 'Samurai', '1-samurai.png', 'Samurai', true),
    ev('1878', 'Aomori, Japan', 'Mitsuyo Maeda is born', 'The son of a sumo wrestler, he trains at the Kodokan under Jigoro Kano and becomes one of its most travelled instructors.', 'Hirosaki Castle', 'Hirosaki.png', 'Hirosaki Castle', false),
    ev('1904', 'United States', 'Maeda leaves Japan', 'He fights challengers across the Americas and Europe, earning the name Count Koma against opponents of every size and style.', 'Mitsuyo Maeda', 'maeda-2.png', 'Mitsuyo Maeda', true),
    ev('1914', 'Belém, Brazil', 'Maeda settles in Brazil', 'He puts on the country’s first jiu-jitsu tournament, a festival of challenge matches to introduce an art nobody there knew.', 'Kasato Maru', '1908a.png', 'Kasato Maru', false),
    ev('1917', 'Belém, Brazil', 'Carlos Gracie sees Maeda fight', 'Maeda, a friend of the family, agrees to teach the teenager. Carlos passes the art to his brothers, Helio among them.', 'Conde Koma poster', 'condekoma.png', 'Conde Koma poster', false),
    ev('1925', 'Rio de Janeiro', 'The first Gracie academy', 'Carlos opens the family’s first school. Helio refines the technique around leverage, so a smaller body can beat a bigger one.', 'Helio Gracie', '6-Gracie-academy.png', 'Helio Gracie', true),
    ev('1967', 'Rio de Janeiro', 'Jiu-jitsu becomes a sport', 'The Guanabara Jiu-Jitsu Federation brings time limits and a points system, with Helio Gracie as its president.', 'Helio Gracie · Guanabara Federation', 'guanabara.png', 'Helio Gracie, Guanabara Federation', false),
    ev('1993', 'Denver, USA', 'The first UFC', 'Royce Gracie wins the first Ultimate Fighting Championship against bigger strikers. The art has nothing left to prove.', 'Royce Gracie', 'ufc-beginning.png', 'Royce Gracie', true),
    ev('1994', 'Rio de Janeiro', 'Carlos Gracie Jr. founds the IBJJF', 'The International Brazilian Jiu-Jitsu Federation. Its World Championship has run every year since 1996.', 'IBJJF', 'ibjjf-carlos-gracie-jr.png', 'IBJJF', true),
    ev('2003', 'Baldwin, New York', 'Emerson Souza arrives', 'A Gracie Barra black belt under Carlos Gracie Jr. and a world champion, he starts teaching jiu-jitsu on Long Island.', 'Professor Emerson Souza', 'emerson-enhanced.png', 'Professor Emerson Souza', false),
    ev('Today', '2420 Grand Ave, Baldwin', 'Twelve black belts later', 'A 5th degree professor, twelve black belts promoted and a new home on Grand Avenue. Entrance and parking in the rear.', 'Grand Avenue, Baldwin', 'logotype-white.svg', '12 Blackbelts Later', false),
  ],
  quoteKicker: 'Carlos Gracie Jr. · Founder, Gracie Barra',
  quote: '"Jiu-jitsu\nfor\n*everyone."',
  quoteCopy:
    'The motto Carlos Gracie Jr. gave Gracie Barra when he opened it in 1986, and the lineage Emerson Souza brought to Baldwin. Not a sport for a certain kind of person. A way of training that fits whoever walks in.',
  lineageRail: 'Our part of the line',
  lineageHeading: 'Maeda to\nBaldwin in five steps',
  lineageCopy: 'Every rank awarded at the academy traces back through Gracie Barra in Rio de Janeiro. That line shapes how the curriculum is taught.',
  lineageLink: btn('Meet our black belts', '/black-belts'),
  lineage: [
    spec('Mitsuyo Maeda', 'Kodokan judoka, landed in Brazil in 1914'),
    spec('Carlos Gracie Sr.', 'Opened the family academy in 1925'),
    spec('Carlos Gracie Jr.', 'Founded Gracie Barra and the IBJJF'),
    spec('Emerson Souza', '5th degree black belt, Baldwin, New York'),
    spec('TweNTY FOUR black belts', 'Promoted on these mats since 2003'),
  ],
  cta: cta('Add your name\nto the line', '2420 Grand Avenue, Baldwin. Your first class is free.', BOOK, SCHEDULE),
  seo: seo(
    'History of Brazilian Jiu-Jitsu | Emerson Souza BJJ, Baldwin NY',
    'The history of Brazilian jiu-jitsu, from the samurai and Mitsuyo Maeda to the Gracie family and Gracie Barra, and how it reached Baldwin, NY. Emerson Souza BJJ, serving Nassau County since 2003.',
  ),
}

/* ------------------------------------------------------------------ */
const g = (file, alt, caption) => ({_type: 'galleryItem', image: I(file, alt), caption})
const C = 'Champion'
const belt = (beltColor, name, stripes, wins) => ({
  _type: 'beltRecord', belt: beltColor, name, stripes, wins: wins.map(([e, p]) => spec(e, p || C)),
})
const coach = (name, bb, bio) => ({_type: 'coach', name, kicker: 'Coach', ...(bb ? {blackBelt: bbRef(name)} : {}), ...(bio ? {bio} : {})})

export const instructorsPage = {
  _id: 'instructorsPage',
  _type: 'instructorsPage',
  kicker: 'Our instructors',
  headline: 'Emerson\n"Eminho"\n*Souza',
  sub: '5th degree black belt under Carlos Gracie Jr.',
  heroImage: I('emerson-enhanced.png', 'Professor Emerson Souza, 5th degree black belt, seated in his gi'),
  bio: 'Emerson has been training Brazilian jiu-jitsu since the age of 12. He is a black belt under Carlos Gracie Jr. from the Gracie Barra Academy in Rio de Janeiro. Since arriving in 2003 he has built one of the premier schools on Long Island and promoted more than twenty black belts, who now lead the classes in Baldwin.',
  titles: [spec('World', 'IBJJF champion'), spec('Pan-Am', 'IBJJF champion'), spec('Brasil', 'National champion'), spec('2010', 'NY International Open')],
  galleryRail: 'Archive · Emerson Souza',
  galleryKicker: 'Through the years',
  gallery: [
    g('Emerson-First-School-in-Brazil.jpg', "Emerson's first school in Brazil", 'Brazil, early 1990s. Emerson with his first group of students, before the move to New York.'),
    g('84564420_2850219748397113_2045028478759206912_n.jpg', 'Emerson as a blue belt with a training partner', 'Purple belt years. The start of a long competition run in Rio.'),
    g('eminho-tinguinha-feitosa.jpg', 'Eminho with Tinguinha and Feitosa on the podium', 'Emerson on the Podium with Renzo Gracie, Carlos Gracie Jr., Rommel Cardozo, Mauricio "Tinguinha" Mariano and Márcio Feitosa. The Gracie Barra generation that would go on to teach around the world.'),
    g('1996-The-First-IBJJF-Pan-Ams--2.jpg', 'Brazilian team at the first IBJJF Pan Ams, 1996', '1996. The Brazilian team at the first IBJJF Pan American Championship.'),
    g('1996-The-First-IBJJF-Pan-Ams.jpg', 'Emerson with a Pan Ams medal in Hollywood, 1996', 'Hollywood, 1996. Medal from the first Pan Ams, hours after the final.'),
    g('Royce-Gracie.jpg', 'Emerson with Royce Gracie and teammates', 'With Royce Gracie. Three years after UFC 1, the art was proving itself everywhere.'),
    g('archive-pan-ams-departure.jpg', 'Brazilian team in tracksuits at the airport before the first Pan Ams', 'Rio airport, 1996. More than 40 athletes with visas in hand, most on their first international trip. The team set the mats and refereed the event themselves.'),
    g('archive-pan-ams-airport-four.jpg', 'Four teammates at the departures gate in Brazilian team tracksuits', 'Departures. Carlos Gracie Jr. wanted a tournament in the USA so the art could grow. The hotel manager in Irvine gave the team a room to train in.'),
    g('archive-paixao-eminho.jpg', 'Marcio Paixão and Eminho under the Gracie Barra sign', 'Marcio Paixão and Eminho under the Gracie Barra sign in Rio. Purple and brown belt years.'),
    g('archive-gracie-barra-team.jpg', 'Gracie Barra team celebrating after a tournament', 'Gracie Barra team after a tournament in Rio. One academy, one result.'),
    g('archive-2002-gb-blackbelts-shirt.jpg', 'Gracie Barra Blackbelts 2002 shirt listing every black belt under Carlos Gracie Jr.', '2002. The Gracie Barra black belt roster under Mestre Carlos Gracie Jr. Eminho is on the list. Loyalty is the law.'),
    g('archive-1996-pan-ams-celebration.jpg', 'The Brazilian team hoisting Carlos Gracie Jr. after the 1996 Pan Ams', 'Irvine, 1996. The team lifts Carlos Gracie Jr. after the first Pan Ams. An event many said could not be put together.'),
    g('archive-2010-rga-stambowsky.jpg', 'Emerson with Márcio Stambowsky at the 2010 Renzo Gracie Academy promotions', 'New York, 2010. Emerson with Mestre Márcio Stambowsky, red and black coral belt under Rolls Gracie. In memoriam.'),
    g('archive-2010-rga-third-degree.jpg', "Renzo Gracie tying the third degree on Emerson's black belt", "Renzo Gracie Academy, 2010. Renzo ties the third degree on Emerson's black belt."),
    g('archive-2010-rga-promotions-group.jpg', 'Black belts at the 2010 Renzo Gracie Academy promotions', '2010 promotions at Renzo Gracie Academy, New York. Black belts from Gracie Barra and RGA on one mat.'),
    g('federation-card-front.jpg', "Emerson's federation competitor card", 'Federation card. The paperwork behind every tournament entry in Rio.'),
  ],
  recordKicker: 'Competition record',
  recordHeading: 'Every belt,\nearned on the mat',
  recordCount: 22,
  recordCountLabel: 'First place finishes, blue to black',
  belts: [
    belt('blue', 'Blue belt', 4, [['LINJJI Niteroi City Jiu-Jitsu Cup'], ['X Commem. LINJJI Niteroi City Cup'], ['AKXE Jiu-Jitsu Cup'], ['IX Taca City of Niteroi'], ['III Paes Jiu-Jitsu Cup'], ['Novo Leblon Jiu-Jitsu Cup']]),
    belt('purple', 'Purple belt', 4, [['First Pro-Fit Jiu-Jitsu Cup'], ['V South Atlantic Competition'], ['VI South Atlantic Competition'], ['VII South Atlantic Competition'], ['Flucar Jiu-Jitsu Cup'], ['Brazilian Jiu-Jitsu Circuit, Mamelu']]),
    belt('brown', 'Brown belt', 4, [['III Novo Leblon Jiu-Jitsu Cup'], ['I Jucao Jiu-Jitsu Cup'], ['I C.P.T Jiu-Jitsu Cup'], ['II Gavazza Jiu-Jitsu Cup'], ['Brazilian Jiu-Jitsu Championship'], ['Pan-American IBJJF Championship']]),
    belt('black', 'Black belt', 5, [['Brazilian Jiu-Jitsu Championship'], ['Pan-American IBJJF Championship'], ['World Jiu-Jitsu IBJJF Championship'], ['World Jiu-Jitsu IBJJF Championship', 'Vice champion'], ['2010 New York International Open IBJJF']]),
  ],
  staffRail: 'Coaching staff',
  staffHeading: 'Seven coaches\non the floor with him',
  coaches: [
    coach('Brian Punger', true, 'Brian began training jiu-jitsu in 2003, when Emerson first arrived in the US from Rio de Janeiro. He has been with Emerson from the beginning and earned his black belt in 2011. Brian is a graphic designer known for his work with BJJ brands including Kingz Kimonos, Ronin Brand, Loyal, Choke Republic and Maeda Brand.'),
    coach('Ivan Gomez', true),
    coach('Mark Gray', true),
    coach('John Reilly', true),
    coach('Dave Kogan', true),
    coach('Anthony Senatore', true),
    coach('Karinna Rocha', false),
  ],
  staffLink: btn('See all twelve black belts', '/black-belts'),
  quote: '"Join the Emerson Souza Academy and become part of a fantastic family atmosphere and more importantly learn jiu-jitsu from a world champion."',
  quoteCite: 'Emerson Souza Brazilian Jiu-Jitsu · Baldwin, NY',
  quoteImage: I('group-shot.jpg', 'Students and instructors on the mats'),
  cta: cta('Train with\nblack belts', 'Train with black belts promoted by Emerson. Your first class is free.', BOOK, SCHEDULE),
  seo: seo(
    'Instructors | Professor Emerson Souza & Black Belt Coaches | Baldwin, NY',
    'Meet Professor Emerson "Eminho" Souza, black belt under Carlos Gracie Jr. and world champion, and the black belt coaching staff at Emerson Souza BJJ in Baldwin, NY.',
  ),
}

/* ------------------------------------------------------------------ */
export const blackBeltsPage = {
  _id: 'blackBeltsPage',
  _type: 'blackBeltsPage',
  kicker: 'Our black belts',
  headline: 'over 20\nblack belts\n*earned on\n*these mats',
  heroImage: I('portrait-emerson.png', 'Archive competition photograph'),
  intro: 'A black belt takes ten years on average. Every name here earned it under Professor Emerson Souza in Baldwin.',
  lineageLabel: 'One lineage',
  lineageText: 'Carlos Gracie Jr. · Gracie Barra · Rio de Janeiro',
  gridHeading: 'Ranked in order\nof degree',
  lineageRail: 'The lineage',
  lineageHeading: 'Straight down from\nMitsuyo Maeda',
  lineageCopy: 'Every rank awarded here traces back through Gracie Barra in Rio de Janeiro. That line is the reason the curriculum looks the way it does.',
  lineage: [
    spec('Mitsuyo Maeda', 'Kodokan judoka, landed in Brazil in 1914'),
    spec('Carlos Gracie Sr.', 'Opened the family academy in 1925'),
    spec('Helio Gracie', 'Refined the art around leverage over strength'),
    spec('Carlos Gracie Jr.', 'Founded Gracie Barra and the IBJJF'),
    spec('Emerson Souza', '5th degree black belt, Baldwin, New York'),
    spec('The names above', 'Promoted on these mats since 2003'),
  ],
  rankKicker: 'How rank works here',
  rankHeading: 'Nobody tests\nfor a belt',
  rankCopy: 'Jiu-jitsu is the one art that does not test for rank. As Carlos Gracie Jr. put it, the mats never lie. You put the time in, the professor sees it, and the stripe comes when it comes.',
  rankImage: I('group-shot.jpg', 'Competition at the academy'),
  cta: cta('Every black belt\nstarted at white', 'Twelve of them started right here in Baldwin. Your first class is free.', BOOK, btn('Meet the instructors', '/instructors')),
  seo: seo(
    'Black Belts | Emerson Souza Brazilian Jiu-Jitsu, Baldwin NY',
    'Meet the black belts promoted by Professor Emerson Souza at his Baldwin, NY academy. Gracie Barra lineage under Carlos Gracie Jr. Serving Nassau County and the South Shore since 2003.',
  ),
}

/* ------------------------------------------------------------------ */
export const visitPage = {
  _id: 'visitPage',
  _type: 'visitPage',
  kicker: 'Contact · Baldwin, NY',
  headline: 'Your first\n*class is free',
  intro: 'No commitment necessary. Tell us when you want to come in and we will have a gi waiting for you. Or just call the academy and we will sort it out on the phone.',
  steps: [
    point('Tell us when', 'Send the form or call. We will confirm a class that fits your schedule.'),
    point('Arrive 15 minutes early', 'Entrance and parking are in the rear. Fill out the waiver, meet the coach, and we will show you around.'),
    point('Borrow a gi and train', 'You take the full class. Nobody will throw you into anything you are not ready for.'),
    point('Talk pricing after', 'If you liked it, we will go through the options then. No pitch before you have trained.'),
  ],
  formKicker: 'Book a free class',
  formHeading: 'Tell us when',
  formButton: 'Book my free class',
  formNote: 'We reply the same day. Or call',
  academyKicker: 'The academy',
  academyHeading: '2420 Grand Avenue\nBaldwin, NY 11510',
  directionsLabel: 'Get directions',
  townsHeading: 'Minutes from\nthe South Shore',
  townsAside: 'Entrance and parking in the rear. Five minutes from the Baldwin LIRR station.',
  faqRail: 'Questions',
  faqHeading: 'Before you\ncome in',
  faqs: [
    faq('Do I need to book ahead?', 'Yes. Book the class you want so we know you are coming and can have a gi ready in your size.'),
    faq('What should I wear?', 'Athletic clothes you can move in, and bring water. No shoes on the mat. We lend the gi for your first class.'),
    faq('I have never trained. Is that a problem?', 'No. Most people who walk in have never trained. Come to BJJ Fundamentals or BJJ All Levels.'),
    faq('Can I watch a class first?', 'Yes. Come in, sit on the floor and watch a full class before you decide. Parents do this all the time.'),
    faq('What does it cost?', 'Your first class is free. We go through membership options after you have trained, not before.'),
    faq('When should I arrive?', 'Come 15 minutes early to fill out the waiver and meet the coach before class.'),
    faq('Can someone under 18 train?', 'Yes. Anyone under the age of 18 must be accompanied by a parent, and the parent must sign the waiver.'),
  ],
  seo: seo(
    'Book a Free BJJ Class in Baldwin, NY | Visit Emerson Souza BJJ',
    'Book a free Brazilian jiu-jitsu class at 2420 Grand Ave, Baldwin, NY. Entrance and parking in the rear. Minutes from Freeport, Rockville Centre, Oceanside and Merrick. Call 516-868-5000.',
  ),
}

export const documents = [
  siteSettings, classSchedule, ...blackBelts,
  homePage, adultPage, kidsPage, schedulePage, historyPage, instructorsPage, blackBeltsPage, visitPage,
]
