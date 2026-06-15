export default function TOS() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing or using Bloxbolt ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Platform. These terms apply to all users, including visitors, registered members, and VIP subscribers.`,
    },
    {
      title: '2. Platform Description',
      content: `Bloxbolt is a rewards platform that allows users to (a) purchase Robux using cryptocurrency payments, and (b) earn platform points through completing tasks, spinning the daily reward wheel, and participating in events. Earned points may be redeemed for Robux according to the current redemption schedule.`,
    },
    {
      title: '3. Account Registration',
      content: `To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your login credentials. You agree to provide accurate, current, and complete information during registration. You may not create accounts for others without their consent. We reserve the right to terminate accounts that violate these terms.`,
    },
    {
      title: '4. Cryptocurrency Payments',
      content: `All purchases made through Bloxbolt are processed via cryptocurrency. By making a purchase, you acknowledge that cryptocurrency transactions are irreversible and confirm all payment details before proceeding. Bloxbolt is not responsible for funds sent to incorrect addresses. Prices are displayed in USD equivalent at time of transaction.`,
    },
    {
      title: '5. Points & Rewards System',
      content: `Platform points have no monetary value and cannot be transferred, sold, or exchanged outside the Bloxbolt platform. Points expire after 365 days of account inactivity. Bloxbolt reserves the right to modify point values, redemption rates, and reward availability at any time without notice. Abuse of the rewards system, including use of bots or automated tools, will result in account termination.`,
    },
    {
      title: '6. Prohibited Conduct',
      content: `Users may not: use automated tools, bots, or scripts to earn points or manipulate the platform; create multiple accounts to circumvent restrictions; engage in fraud, chargebacks, or payment disputes without contacting support first; harass other users; attempt to hack or exploit the platform; resell or redistribute Robux obtained through Bloxbolt; or violate Roblox Corporation's Terms of Service.`,
    },
    {
      title: '7. Intellectual Property',
      content: `All content on Bloxbolt, including logos, designs, text, and code, is the property of Bloxbolt and is protected by applicable intellectual property laws. Roblox and Robux are trademarks of Roblox Corporation. Bloxbolt is not affiliated with, endorsed by, or sponsored by Roblox Corporation.`,
    },
    {
      title: '8. Disclaimer of Warranties',
      content: `Bloxbolt is provided "as is" without warranties of any kind, express or implied. We do not guarantee uninterrupted service, accuracy of information, or that defects will be corrected. Your use of the platform is at your own risk.`,
    },
    {
      title: '9. Limitation of Liability',
      content: `To the maximum extent permitted by law, Bloxbolt shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of the platform. Our total liability shall not exceed the amount you paid to us in the 12 months preceding the claim.`,
    },
    {
      title: '10. Privacy Policy',
      content: `We collect minimal information necessary to operate the platform. Account data is stored locally in your browser. We do not sell personal information to third parties. Cryptocurrency transaction data may be stored for fraud prevention. By using Bloxbolt, you consent to our data practices as described here.`,
    },
    {
      title: '11. Changes to Terms',
      content: `We may update these Terms of Service at any time. Continued use of the platform after changes constitutes acceptance of the new terms. We will make reasonable efforts to notify users of significant changes through platform announcements.`,
    },
    {
      title: '12. Contact',
      content: `For questions about these Terms of Service, please contact us through our Discord server or the Partners page. For account-specific issues, use the Settings page to contact support.`,
    },
  ];

  return (
    <div style={{ padding: '40px 72px 72px', maxWidth: '900px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '-1.2px', marginBottom: '8px', color: 'var(--text)' }}>Terms of Service</h1>
        <p style={{ fontSize: '14px', color: 'var(--text3)' }}>Last updated: June 1, 2026 · Effective immediately</p>
      </div>

      <div style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '14px', padding: '18px 22px', marginBottom: '36px' }}>
        <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--purpleL)' }}>Important:</strong> Bloxbolt is not affiliated with Roblox Corporation. "Robux" is a trademark of Roblox Corporation. Use of this platform is subject to both Bloxbolt's Terms of Service and Roblox's Terms of Service.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {sections.map((section, i) => (
          <div key={i} style={{
            borderBottom: i < sections.length - 1 ? '1px solid rgba(37,37,69,0.5)' : 'none',
            padding: '28px 0',
          }}>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text)', marginBottom: '12px' }}>{section.title}</h2>
            <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: 1.75 }}>{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
