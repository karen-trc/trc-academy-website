import styles from './page.module.css';

export const metadata = {
  title: 'Career Coach Certification | TRC Transition Services',
  description: 'Become a certified career coach. A professional certification for aspiring coaches who want to guide others through meaningful career journeys.',
};

export default function CareerCoachCertification() {
  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>Tabula Rasa Coaching · Certification Program</span>
          <h1>Become a <em>Career Coach</em><br />Who Changes Lives</h1>
          <p className={styles.heroSub}>A professional certification for aspiring coaches who want to guide others through one of life's most meaningful journeys — finding work that matters, leading with purpose, and building a career that's truly their own.</p>
          <a href="/contact" className={styles.heroCta}>Reserve Your Seat</a>
          <div className={styles.heroBadges}>
            <div className={styles.badge}><span className={styles.badgeNum}>30</span><span className={styles.badgeLabel}>Training Hours</span></div>
            <div className={styles.badge}><span className={styles.badgeNum}>6</span><span className={styles.badgeLabel}>Saturday Classes</span></div>
            <div className={styles.badge}><span className={styles.badgeNum}>∞</span><span className={styles.badgeLabel}>Earning Potential</span></div>
          </div>
        </div>
      </section>

      {/* Opportunity */}
      <section className={styles.opportunity}>
        <span className={styles.opportunityEyebrow}>The Moment Is Now</span>
        <h2>Careers Are Changing. Skilled Coaches Are in Greater Demand Than Ever.</h2>
        <p>With companies restructuring across every industry, more professionals than ever are navigating unexpected transitions — seeking clarity, direction, and someone genuinely in their corner. As a certified career coach, you become exactly that person.</p>
        <p>Whether your future clients are facing a layoff, pursuing a long-overdue pivot, or stepping into leadership for the first time, your coaching can make all the difference — and build you a livelihood that is entirely your own.</p>
        <span className={styles.opportunityHighlight}>The need for qualified career coaches has never been greater. There is no better time to build this skill — and this practice.</span>
      </section>

      {/* Truth */}
      <section className={styles.truth}>
        <h2>The one thing AI will never replace? A human being who truly sees you.</h2>
        <p>Career coaching is deeply personal work. It takes a living, breathing, attuned presence to help someone unlock clarity, courage, and confidence. That's what you'll learn to offer — and why the demand for skilled career coaches continues to grow.</p>
      </section>

      {/* About */}
      <section>
        <div className={styles.about}>
          <div>
            <span className={styles.aboutLabel}>The Program</span>
            <h2>Coaching That Goes Beyond the Résumé</h2>
            <p>This isn't a course about career advice. It's a training in the art of powerful conversation — listening at a level that transforms, asking questions that unlock what a client already knows but hasn't found words for yet.</p>
            <p>You'll graduate certified and ready to support clients who want to move up, pivot entirely, deepen their leadership, or simply reconnect with what lights them up professionally.</p>
            <p>Six Saturday sessions — designed to fit around your life while you build toward something extraordinary. Dedicated peer practice coaching is built into the program so you develop real skills with real feedback before you ever see a paying client.</p>
          </div>
          <div className={styles.aboutVisual}>
            <p className={styles.aboutQuote}>"The role of a coach isn't to hand people answers. It's to ask questions so good that the answers rise up from within."</p>
            <p className={styles.aboutQuoteAttr}>— Tabula Rasa Coaching Philosophy</p>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className={styles.curriculum}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>What You'll Master</span>
          <h2>A Curriculum Built for Real Transformation</h2>
        </div>
        <div className={styles.curriculumGrid}>
          <div className={styles.curriculumCard}>
            <div className={styles.cardNum}>01</div>
            <h3 className={styles.cardTitle}>The Art of Deep Listening</h3>
            <p className={styles.cardDesc}>Move beyond hearing words to understanding what a client is truly communicating — beneath the surface, between the lines. This is the foundation everything else rests on.</p>
          </div>
          <div className={styles.curriculumCard}>
            <div className={styles.cardNum}>02</div>
            <h3 className={styles.cardTitle}>Powerful Questions That Open Doors</h3>
            <p className={styles.cardDesc}>Learn the craft of asking questions that create breakthroughs — questions that invite clients to step into their own wisdom rather than looking to you for answers.</p>
          </div>
          <div className={styles.curriculumCard}>
            <div className={styles.cardNum}>03</div>
            <h3 className={styles.cardTitle}>Career Clarity &amp; Direction</h3>
            <p className={styles.cardDesc}>Frameworks for guiding clients through the fog of "what do I actually want?" — from leadership development and promotions to full career pivots and rediscovery.</p>
          </div>
          <div className={styles.curriculumCard}>
            <div className={styles.cardNum}>04</div>
            <h3 className={styles.cardTitle}>Modern Job Search Strategy</h3>
            <p className={styles.cardDesc}>Equip your clients with a comprehensive, modern approach to finding the right opportunities — from sourcing roles to navigating the full arc of landing an offer.</p>
          </div>
          <div className={styles.curriculumCard}>
            <div className={styles.cardNum}>05</div>
            <h3 className={styles.cardTitle}>AI Tools for Every Career Stage</h3>
            <p className={styles.cardDesc}>Master the latest AI-powered tools for résumé writing, LinkedIn optimization, networking, interview prep, and research — and teach your clients to use them with confidence.</p>
          </div>
          <div className={styles.curriculumCard}>
            <div className={styles.cardNum}>06</div>
            <h3 className={styles.cardTitle}>Peer Practice Coaching</h3>
            <p className={styles.cardDesc}>Practice your skills in a safe, supportive environment — coach and be coached by your peers, building real confidence and competence you can bring directly into client work.</p>
          </div>
          <div className={styles.curriculumCard}>
            <div className={styles.cardNum}>07</div>
            <h3 className={styles.cardTitle}>Building Your Coaching Practice</h3>
            <p className={styles.cardDesc}>From your first client to a thriving full-time business or a fulfilling part-time practice — the practical roadmap for pricing, marketing, and growing with integrity.</p>
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className={styles.accreditation}>
        <h2>30 Hours That Put You <em>Halfway to Full Accreditation</em></h2>
        <p>This program's 30 training hours count directly toward professional coaching accreditation. From the moment you complete this certification, you're already halfway to the hours required for your full credential — a meaningful head start on becoming a fully accredited professional coach.</p>
      </section>

      {/* AI Section */}
      <section className={styles.aiSection}>
        <span className={styles.sectionLabel}>Tools of the Trade</span>
        <h2>AI Empowers. <em style={{ fontStyle: 'italic', color: '#F28D0D' }}>You</em> Transform.</h2>
        <p>The most effective career coaches today know how to leverage powerful AI tools — not to replace their guidance, but to amplify it. You'll graduate fluent in the tools your clients need, knowing exactly when and how to use them.</p>
        <div className={styles.aiTools}>
          {['Résumé Writing with AI', 'LinkedIn Profile Optimization', 'Job Search Strategy', 'Cover Letter Crafting', 'Networking Outreach', 'Interview Prep', 'Personal Brand Building', 'Career Research Tools', 'Salary Negotiation Prep', 'Executive Presence Online'].map((tool) => (
            <span key={tool} className={styles.aiToolTag}>{tool}</span>
          ))}
        </div>
      </section>

      {/* Human Banner */}
      <section className={styles.humanBanner}>
        <h2>"No algorithm can hold space for another human being. That's yours to offer."</h2>
        <p>AI can write a résumé. It cannot look someone in the eye — virtually or in person — and help them believe in themselves again. The human connection at the core of coaching is irreplaceable. That's not a limitation of technology. It's the entire point.</p>
      </section>

      {/* Income */}
      <section className={styles.income}>
        <div className={styles.incomeInner}>
          <div className={styles.incomeText}>
            <span className={styles.aboutLabel}>Your Future Practice</span>
            <h2>The Sky Really Is the Limit</h2>
            <p>Career coaching is one of the most accessible, meaningful, and financially rewarding paths you can build for yourself. Whether you want to make it your full-time calling or a purposeful side practice, the opportunity is real — and it's growing.</p>
            <p>You'll graduate not just certified, but equipped with a clear framework for launching, pricing, and scaling a practice that fits your life — on your terms, no matter what the economy does.</p>
          </div>
          <div className={styles.incomeCards}>
            <div className={styles.incomeCard}>
              <h3>Full-Time Practice</h3>
              <p>Experienced career coaches routinely earn $80K–$200K+ annually working with individuals, executives, and corporate clients on a retainer or package basis.</p>
            </div>
            <div className={styles.incomeCard}>
              <h3>Part-Time &amp; Flexible</h3>
              <p>Even a modest client roster can generate meaningful income alongside your current role — a purposeful addition to your professional life on your own timeline.</p>
            </div>
            <div className={styles.incomeCard}>
              <h3>Corporate &amp; Group Programs</h3>
              <p>Expand into workshops, outplacement programs, and organizational partnerships — one of the fastest-growing and highest-paying areas in the field.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={styles.pricing}>
        <span className={styles.pricingEyebrow}>Investment in Your Future</span>
        <h2>Clear, Simple Pricing</h2>
        <span className={styles.pricingAmount}>$995</span>
        <p className={styles.pricingIncludes}>Full program tuition — includes all six Saturday sessions, peer practice coaching, course materials, final certification exam, and your Career Coach Certificate upon successful completion.</p>
        <a href="/contact" className={styles.pricingBtn}>Reserve Your Seat</a>
      </section>

      {/* Scholarship */}
      <section className={styles.scholarship}>
        <h2>Making This Possible for Everyone</h2>
        <p>We believe cost should never stand between someone and a calling. That's why every cohort includes scholarship opportunities and flexible financing options.</p>
        <div className={styles.scholarshipCards}>
          <div className={styles.scholarshipCard}>
            <div className={styles.scholarshipRibbon}>Full Award</div>
            <div className={styles.scholarshipAward}>100%</div>
            <h3>Full Scholarship</h3>
            <p>One full-tuition scholarship is available per cohort for a candidate who demonstrates exceptional commitment and financial need. Application required.</p>
          </div>
          <div className={styles.scholarshipCard}>
            <div className={styles.scholarshipRibbon}>Partial Award</div>
            <div className={styles.scholarshipAward}>50%</div>
            <h3>Half Scholarship</h3>
            <p>One 50% scholarship is awarded per cohort. We're looking for people with a genuine drive to serve others and build something meaningful.</p>
          </div>
        </div>
        <div className={styles.financingNote}>
          <p><strong>Flexible Financing Available.</strong> Payment plans make it easy to begin your journey now and invest over time. Reach out to discuss what works for you — we'll find a way.</p>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection} id="apply">
        <div className={styles.ctaUrgency}>⏳ &nbsp; Limited Seats Available — Cohort Forming Now</div>
        <h2>Ready to Begin<br />Something Remarkable?</h2>
        <p>Seats are intentionally limited so every student receives real attention, real practice, and a true community of peers. Scholarship applications are reviewed on a rolling basis. When the cohort is full, enrollment closes.</p>
        <a href="/contact" className={styles.ctaBtn}>Apply for the Next Cohort</a>
      </section>

    </div>
  );
}
