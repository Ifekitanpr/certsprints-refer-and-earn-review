import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {
  Bell, BookOpen, BriefcaseBusiness, CalendarDays, ChevronDown, ChevronRight,
  CalendarClock, Check, CheckCircle2, CircleUserRound, Clock3, Columns3, Copy,
  CreditCard, Download, Edit3, ExternalLink, FileBadge2, Flame, Folder,
  Gamepad2, Gauge, Gift, Grid2X2, HelpCircle, Info, List,
  Mail, Menu, MessageSquare, MoreHorizontal, Rocket, Send, Settings, Share2,
  Plus, ShieldCheck, SlidersHorizontal, Smartphone, Sparkles, Target, Trophy,
  UserPlus, UserRound, Users, Volume2, VolumeX, WalletCards, X
} from 'lucide-react';
import './styles.css';

const assetPath = path => `${import.meta.env.BASE_URL}${path.replace(/^\//,'')}`;

const settings = [
  ['profile','Profile',UserRound], ['account','Account',Settings], ['security','Security',ShieldCheck],
  ['billing','Billing',CreditCard], ['referrals','Refer & Earn',Gift], ['notifications','Notifications',Bell],
  ['sounds','Sounds & Haptics',Volume2], ['learning','Learning plan',BookOpen], ['more','More',Menu]
];
const mainNav = [
  ['Dashboard',Grid2X2], ['Progress',Columns3], ['Resources',Folder],
  ['Practice games',Gamepad2], ['Practice exam',BookOpen], ['Settings',Settings]
];

function Toggle({on,setOn,label}) {
  return <button aria-label={label} className={'toggle '+(on?'on':'')} onClick={()=>setOn?.(!on)}>
    <span />
  </button>
}

function Sidebar(){
  return <aside className="sidebar">
    <div>
      <div className="brand"><img className="brandlogo" src={assetPath('/assets/certsprints-logo.svg')} alt="CertSprints"/><button className="collapse">↤</button></div>
      <nav className="mainnav">{mainNav.map(([label,Icon])=><button key={label} className={label==='Settings'?'active':''}><Icon/><span>{label}</span></button>)}</nav>
    </div>
    <div className="asidefoot"><button>Help & Support <ExternalLink/></button><button>Resources <ExternalLink/></button></div>
  </aside>
}

function Topbar(){
  return <header className="topbar">
    <button className="cert"><FileBadge2/><span>PMP Project Management Professional</span><ChevronDown/></button>
    <div className="headeractions"><button className="streak"><Flame/><b>123 days</b></button><button><FileBadge2/></button><button><Bell/></button><button><Settings/></button><img src="https://i.pravatar.cc/80?img=12"/><ChevronDown/></div>
  </header>
}

function SettingsMenu({page,setPage}){
  return <nav className="settingsnav">{settings.map(([id,label,Icon])=><button className={page===id?'active':''} key={id} onClick={()=>setPage(id)}><Icon/><span>{label}</span></button>)}</nav>
}

function Profile({editing,setEditing}){
 const fields=[['First name','Patrick'],['Last name','Adanini'],['Email address','patrick@gmail.com'],['Phone number','N/A'],['Gender','Male'],['Job title','Designer'],['Company/Organization','Certsprints']];
 if(editing) return <section className="panel profile edit">
   <h2>Profile Information</h2>
   <div className="editbody">
    <div className="profilehead"><img src="https://i.pravatar.cc/160?img=12"/><div><h3>Adanini Patrick</h3><p>patrick@gmail.com</p></div></div>
    <div className="formgrid">
      <label>First name<input defaultValue="Patrick"/></label><label>Last name<input defaultValue="Adanini"/></label>
      <label className="wide">Email address<input className="muted" defaultValue="example@gmail.com"/></label>
      <label>Gender<select defaultValue=""><option value="" disabled>Select a gender</option><option>Male</option><option>Female</option></select></label>
      <label>Job title<input placeholder="What is your role?"/></label>
      <label>Phone number<div className="phone"><input value="+234" readOnly/><input placeholder="90 3200 0000"/></div></label>
      <label>Company/Organization<input placeholder="E.g. CertSprints"/></label>
    </div>
    <div className="formactions"><button onClick={()=>setEditing(false)}>Cancel</button><button className="primary" onClick={()=>setEditing(false)}>Save changes</button></div>
   </div>
 </section>;
 return <section className="panel profile">
   <div className="paneltitle"><h2>Profile Information</h2><button onClick={()=>setEditing(true)}><Edit3/>Edit profile</button></div>
   <div className="profilebody">
    <div className="profilehead"><img src="https://i.pravatar.cc/160?img=12"/><div><h3>Adanini Patrick</h3><p>patrick@gmail.com</p></div></div>
    <div className="detailrows">{fields.map(([k,v])=><div key={k}><span>{k}</span><b>{v}</b></div>)}</div>
   </div>
 </section>
}

function Sounds(){
 const [sound,setSound]=useState(true), [haptic,setHaptic]=useState(true), [intensity,setIntensity]=useState('Medium');
 return <section className="panel sounds"><h2>Sounds & Haptics</h2><div className="soundbody">
  <div className="subcard">
   <div className="settinghead"><span className="peach"><Volume2/></span><div><b>Enable Sounds</b><small>Play audio cues for actions & events</small></div><Toggle on={sound} setOn={setSound} label="Enable sounds"/></div>
   <div className="volume"><span>Volume</span><em>70%</em><input type="range" defaultValue="60"/></div>
   <div className="selectgrid">{['Completion sound','Quiz Answer sound','Failed question sound','Correct Answer sound'].map(x=><label key={x}>{x}<select><option>Pop</option><option>Chime</option></select></label>)}</div>
  </div>
  <div className="subcard">
   <div className="settinghead"><span className="peach"><Smartphone/></span><div><b>Enable Haptic Feedback</b><small>Tactile feedback on supported devices (mobile).</small></div><Toggle on={haptic} setOn={setHaptic} label="Enable haptics"/></div>
   <div className="choice"><b>Intensity</b><div>{['Light','Medium','Strong'].map(x=><button className={x===intensity?'selected':''} onClick={()=>setIntensity(x)} key={x}><i/>{x}</button>)}</div></div>
   <div className="choice"><b>Vibrate on:</b><div>{['Correct answer','Milestone reaches','Wrong answer'].map(x=><label className="check" key={x}><input type="checkbox" defaultChecked/>{x}</label>)}</div></div>
  </div>
 </div></section>
}

function Notifications(){
 const items=[
  ['Study Reminders','Daily reminders to start your study sessions',true,false,CalendarDays],
  ['Sprint Completion','When you complete a sprint or milestone',false,true,Trophy],
  ['Quiz Results','Scores and feedback from practice quizzes',true,true,HelpCircle],
  ['Streak Alerts','Warnings when your study streak is at risk',false,false,Flame],
  ['Weekly Summary','Weekly progress report and insights',false,false,CalendarDays],
  ['Product Updates','New features and platform improvements',false,false,Rocket]
 ];
 return <section className="panel notifications"><div className="notifytitle"><h2>Notifications</h2><b>Email</b><b>Push</b></div><div className="notifybody">
  {items.map(([title,desc,email,push,Icon])=><NotifyRow key={title} {...{title,desc,email,push,Icon}}/>)}
 </div></section>
}

function ReferEarn(){
 const referralUrl='https://certsprints.com/join?ref=PATRICK24';
 const rewardCurrency={code:'NGN',locale:'en-NG',valuePerCredit:1000,country:'Nigeria'};
 const localValue=credits=>new Intl.NumberFormat(rewardCurrency.locale,{style:'currency',currency:rewardCurrency.code,maximumFractionDigits:0}).format(credits*rewardCurrency.valuePerCredit);
 const [copied,setCopied]=useState(false);
 const [redeem,setRedeem]=useState(null);
 const [coupon,setCoupon]=useState('');
 const [redeemed,setRedeemed]=useState(false);
 const [payoutMethod,setPayoutMethod]=useState('');
 const [infoView,setInfoView]=useState(null);
 const copyLink=async()=>{try{await navigator.clipboard.writeText(referralUrl)}catch{} setCopied(true); setTimeout(()=>setCopied(false),1800)};
 const share=async()=>{
  const data={title:'Join me on CertSprints',text:'Prepare for your next certification with CertSprints and receive a welcome benefit.',url:referralUrl};
  if(navigator.share) await navigator.share(data); else copyLink();
 };
 const referrals=[
  ['MA','Maria A.','Jul 22, 2026','Reward earned','25 credits','earned'],
  ['DK','Daniel K.','Jul 18, 2026','Reward pending','25 credits','pending'],
  ['SL','Sofia L.','Jul 12, 2026','Signed up','—','joined'],
  ['JM','James M.','Jul 04, 2026','Link opened','—','opened']
  ];
 return <section className="referralpage">
  <div className="referralhero">
   <img className="herodecor" src={assetPath('/assets/refer-hero/decor.svg')} alt=""/>
   <div className="heroart"><img src={assetPath('/assets/refer-hero/gift.png')} alt="Gift box"/></div>
   <div className="herocopy"><span className="eyebrow">CERTSPRINTS REFERRALS</span><h2>Learn together. Earn together.</h2><p>Invite friends to prepare for their next certification. They receive a welcome benefit, and you earn CertSprints Credits after their first eligible purchase.</p></div>
   <button className="terms" onClick={()=>setInfoView('terms')}>Program Terms <img src={assetPath('/assets/refer-hero/link-icon.svg')} alt=""/></button>
  </div>
  <div className="rewardstats">
   <article><span className="staticon blue"><WalletCards/></span><div><small>Available earnings</small><strong>75 credits</strong><em>≈ {localValue(75)} value</em></div></article>
   <article><span className="staticon amber"><Clock3/></span><div><small>Pending credits</small><strong>25</strong><em>1 referral validating</em></div></article>
   <article><span className="staticon purple"><Users/></span><div><small>Successful referrals</small><strong>3</strong><em>4 total invitations</em></div></article>
  </div>
  <section className="useearnings">
   <div className="useearningshead"><div><h3>Use your earnings</h3><p>Choose how you want to redeem your available CertSprints Credits.</p></div></div>
   <div className="compactredeem">
    <button onClick={()=>setRedeem('coupon')}><Gift/>Create coupon</button>
    <button className="withdraw" onClick={()=>setRedeem('withdraw')}><Send/>Withdraw</button>
   </div>
  </section>
  <div className="referralgrid">
   <article className="sharecard">
    <div className="cardheading"><span className="shareicon"><UserPlus/></span><div><h3>Invite your friends</h3><p>Share your unique referral link anywhere.</p></div><button onClick={share} className="shareprimary"><Share2/>Share invite</button></div>
    <label className="referralinput">Your referral link<div><input value={referralUrl} readOnly/><button aria-label="Copy referral link" onClick={copyLink}>{copied?<Check/>:<Copy/>}</button></div></label>
    <p className="regionalnote">Rewards and eligibility may vary by country, currency, and active campaign.</p>
   </article>
   <article className="howcard"><h3>How it works</h3><div className="howsteps">
    <div><span className="stepblue"><img src={assetPath('/assets/refer-details/share-icon.svg')} alt=""/></span><p><b>Share your link</b><small>Share your invite link with anyone</small></p></div><img className="steparrow" src={assetPath('/assets/refer-details/step-arrow.png')} alt=""/>
    <div><span className="stepcoral"><img src={assetPath('/assets/refer-details/user-icon.svg')} alt=""/></span><p><b>Friend enrolls</b><small>Your friend creates an account and enrolls</small></p></div><img className="steparrow" src={assetPath('/assets/refer-details/step-arrow.png')} alt=""/>
    <div><span className="stepgreen"><img src={assetPath('/assets/refer-details/gift-icon.svg')} alt=""/></span><p><b>You earn credits</b><small>Credits are added after their purchase qualifies</small></p></div>
   </div>
   </article>
  </div>
  <article className="activitycard"><div className="activitytitle"><div><h3>Referral activity</h3><p>Track everyone who has joined through your link.</p></div><button onClick={()=>setInfoView('history')}>View reward history <img src={assetPath('/assets/refer-details/history-arrow.svg')} alt=""/></button></div>
   <div className="activitytable"><div className="tablerow tablehead"><span>Referral</span><span>Date</span><span>Status</span><span>Reward</span></div>{referrals.map(([initials,name,date,status,reward,type])=><div className="tablerow" key={name}><span className="person">{name==='Maria A.'?<img className="personavatar" src={assetPath('/assets/refer-details/maria-avatar.png')} alt=""/>:name==='Daniel K.'?<i className="avatarplaceholder"><img src={assetPath('/assets/refer-details/placeholder-user.svg')} alt=""/></i>:<i>{initials}</i>}<b>{name}</b></span><span className="activitydate">{date}</span><span><em className={'status '+type}>{status}</em></span><strong>{reward}</strong></div>)}</div>
  </article>
  {redeem==='coupon'&&<Modal close={()=>{setRedeem(null);setRedeemed(false)}} title="Create course coupon" wide>
   {!redeemed?<form className="redeemform" onSubmit={e=>{e.preventDefault();setCoupon('CERT-PATRICK-75');setRedeemed(true)}}>
    <div className="redeemintro"><span className="redeemicon"><Gift/></span><div><h3>Turn earnings into a coupon</h3><p>Use your referral earnings toward any eligible CertSprints course or certification plan.</p></div></div>
    <div className="redeembalance"><span>Available earnings</span><b>75 credits <small>≈ {localValue(75)}</small></b></div>
    <label>Credits to convert<div className="amountinput"><input type="number" defaultValue="25" min="5" max="75"/><span>credits</span></div></label>
    <div className="couponvalue"><span>Coupon value</span><b>≈ {localValue(25)}</b></div>
    <p className="redeemnote"><Info/>Coupons can be applied at checkout, cannot be exchanged for cash, and expire 12 months after creation.</p>
    <button className="primary redeemsubmit">Create coupon</button>
   </form>:<div className="couponcreated"><img className="successasset" src={assetPath('/assets/success-badge.svg')} alt="Success"/><h3>Your coupon is ready</h3><p>Apply this code during checkout for an eligible course or plan.</p><div className="couponcode"><b>{coupon}</b><button onClick={()=>navigator.clipboard?.writeText(coupon)}><Copy/>Copy</button></div><button className="primary" onClick={()=>{setRedeem(null);setRedeemed(false)}}>Done</button></div>}
  </Modal>}
  {redeem==='withdraw'&&!redeemed&&<div className="overlay"><button className="scrim" onClick={()=>{setRedeem(null);setPayoutMethod('')}}/><aside className="withdrawdrawer">
   <div className="withdrawdrawerhead"><div><h2>Withdraw earnings</h2><p>Transfer your available Credits through a supported payout method.</p></div><button onClick={()=>{setRedeem(null);setPayoutMethod('')}}><X/></button></div>
   <div className="withdrawdrawerscroll"><form className="redeemform" onSubmit={e=>{e.preventDefault();setRedeemed(true)}}>
    <div className="redeemintro"><span className="redeemicon cash"><Send/></span><div><h3>Withdraw to your payout account</h3><p>Available methods are based on your verified country and currency.</p></div></div>
    <div className="redeembalance"><span>Available to withdraw</span><b>75 credits <small>≈ {localValue(75)}</small></b></div>
    <label>Withdrawal amount<div className="amountinput"><input type="number" defaultValue="50" min="10" max="75"/><span>credits</span></div></label>
    <label>Payout method<select value={payoutMethod} onChange={e=>setPayoutMethod(e.target.value)} required><option value="" disabled>Select a payout method</option><option>Stripe</option><option>Bank transfer</option></select></label>
    {payoutMethod&&<div className="methodnotice"><span className={'methodbadge '+payoutMethod.toLowerCase().replaceAll(' ','-')}>{payoutMethod==='Stripe'?'S':<CreditCard/>}</span><div><b>{payoutMethod}</b><p>{payoutMethod==='Stripe'?'Connect or select a verified Stripe payout account. Stripe will handle identity verification and supported settlement currencies.':'Enter the receiving bank details. Required account identifiers adapt to the selected bank country.'}</p></div></div>}
    {payoutMethod==='Stripe'&&<div className="stripeconnect"><div><span className="stripebrand">stripe</span><div><b>No Stripe account connected</b><p>Connect securely to receive international payouts.</p></div></div><button type="button">Connect Stripe</button></div>}
    {payoutMethod==='Bank transfer'&&<div className="bankfields">
      <label>Account holder name<input required placeholder="Name exactly as shown on the account"/></label>
      <label>Bank country<select required defaultValue=""><option value="" disabled>Select country</option><option>United States</option><option>United Kingdom</option><option>Canada</option><option>Germany</option><option>Nigeria</option><option>South Africa</option><option>Other</option></select></label>
      <label>Bank name<input required placeholder="Enter bank name"/></label>
      <label>Account currency<select required defaultValue={rewardCurrency.code}><option>USD</option><option>EUR</option><option>GBP</option><option>CAD</option><option>NGN</option><option>ZAR</option></select></label>
      <label>Account number or IBAN<input required placeholder="Enter account number or IBAN"/></label>
      <label>Routing, sort or SWIFT/BIC code<input required placeholder="Enter routing identifier"/></label>
    </div>}
    <div className="withdrawsummary"><span>You withdraw<b>50 credits</b></span><span>Estimated payout<b>{payoutMethod==='Stripe'?`≈ ${localValue(48.5)}`:payoutMethod==='Bank transfer'?`≈ ${localValue(50)}`:'—'}</b></span><span>Processing time<b>{payoutMethod==='Stripe'?'1–3 business days':payoutMethod==='Bank transfer'?'2–5 business days':'Select a method'}</b></span></div>
    <p className="redeemnote"><Info/>Currency conversion, payout fees, tax checks, and identity verification may apply based on your region.</p>
    <button className="primary redeemsubmit" disabled={!payoutMethod}>Review withdrawal</button>
   </form></div>
  </aside></div>}
  {redeem==='withdraw'&&redeemed&&<Modal close={()=>{setRedeem(null);setRedeemed(false);setPayoutMethod('')}} wide>
   <div className="couponcreated"><img className="successasset" src={assetPath('/assets/success-badge.svg')} alt="Success"/><h3>Withdrawal submitted</h3><p>We’ll review the request and notify you when the payout is processed.</p><div className="withdrawreceipt"><span>Payout method<b>{payoutMethod}</b></span><span>Request amount<b>50 credits</b></span><span>Estimated payout<b>≈ {payoutMethod==='Stripe'?localValue(48.5):localValue(50)}</b></span><span>Payout currency<b>{rewardCurrency.code} · {rewardCurrency.country}</b></span><span>Status<b className="pendingtext">Pending review</b></span></div><button className="primary" onClick={()=>{setRedeem(null);setRedeemed(false);setPayoutMethod('')}}>Done</button></div>
  </Modal>}
  {infoView==='terms'&&<Modal close={()=>setInfoView(null)} title="Refer & Earn program terms" wide>
   <div className="termscontent"><p className="termsupdated">Effective July 24, 2026 · International program</p>
    <section><h3>1. Eligibility</h3><p>You must have an active, verified CertSprints account and be permitted to participate under the laws of your country. Availability, reward values, payout methods, and eligible products may vary by region.</p></section>
    <section><h3>2. Qualifying referrals</h3><p>A referral qualifies when a new customer uses your unique link or code, creates an eligible account, and completes their first eligible paid purchase. Self-referrals, duplicate accounts, existing customers, and fraudulent or manipulated activity do not qualify.</p></section>
    <section><h3>3. Reward validation</h3><p>Rewards remain pending until payment succeeds and the applicable refund or chargeback period ends. CertSprints may reverse rewards connected to refunded, disputed, cancelled, duplicated, or ineligible transactions.</p></section>
    <section><h3>4. Credits, coupons, and withdrawals</h3><p>Available earnings may be converted into eligible course coupons or withdrawn through a supported Stripe or bank-transfer method. Currency conversion, payout charges, taxes, minimum thresholds, identity verification, and processing times may apply.</p></section>
    <section><h3>5. Responsible sharing</h3><p>Referral messages must be honest and must not be sent as spam. Participants may not purchase advertising against CertSprints brand terms, misrepresent the offer, or publish referral codes on misleading coupon websites.</p></section>
    <section><h3>6. Program changes</h3><p>CertSprints may change, suspend, or end a campaign where permitted, while honouring valid rewards already earned unless fraud, abuse, legal restrictions, or payment reversals apply.</p></section>
    <p className="legalnote"><Info/>This product summary should be reviewed and approved by legal counsel before public launch. Country-specific consumer, tax, privacy, sanctions, and payout requirements may apply.</p>
   </div>
  </Modal>}
  {infoView==='history'&&<Modal close={()=>setInfoView(null)} title="Reward history" wide>
   <div className="historysummary"><div><small>Total earned</small><b>125 credits</b></div><div><small>Available</small><b>75 credits</b></div><div><small>Withdrawn or used</small><b>50 credits</b></div></div>
   <div className="historyfilters"><button className="active">All activity</button><button>Credits earned</button><button>Coupons</button><button>Withdrawals</button></div>
   <div className="historyledger">
    {[
      ['Referral reward','Maria A. completed an eligible purchase','Jul 22, 2026','+25 credits','positive'],
      ['Course coupon','Coupon CERT-PATRICK-25 created','Jul 17, 2026','−25 credits','negative'],
      ['Referral reward','Michael T. completed an eligible purchase','Jul 10, 2026','+25 credits','positive'],
      ['Bank withdrawal','Withdrawal paid to account ending 3201','Jun 28, 2026','−25 credits','negative'],
      ['Referral reward','Sofia L. completed an eligible purchase','Jun 20, 2026','+25 credits','positive']
    ].map(([title,desc,date,amount,tone])=><div className="historyitem" key={title+date}><span className={tone}><WalletCards/></span><div><b>{title}</b><p>{desc}</p></div><time>{date}</time><strong className={tone}>{amount}</strong></div>)}
   </div>
   <button className="downloadhistory"><Download/>Download statement</button>
  </Modal>}
 </section>
}

function Billing(){
 const [overlay,setOverlay]=useState(null);
 const [modifyTab,setModifyTab]=useState('extend');
 const [choice,setChoice]=useState('Professional Growth');
 const [methods,setMethods]=useState([
  ['Mastercard •••• 8899','via Paystack · Expires 09/28','mastercard',true],
  ['Kuda Bank Transfer','via Paystack · Verified','kuda',false]
 ]);
 const openModify=()=>{setModifyTab('extend');setChoice('Professional Growth');setOverlay('modify')};
 const confirm=()=>setOverlay('confirm');
 const pay=()=>setOverlay(modifyTab==='upgrade'?'success':'done');
 const close=()=>setOverlay(null);
 const invoices=[
  ['INV-0041','Essentials Plan','Sep 15, 2026','₦199,000','Active'],
  ['INV-0038','Advanced Tier upgrade','Aug 3, 2026','₦100,000','Active'],
  ['INV-0031','60-day extension','Jul 12, 2026','₦50,000','Refunded'],
  ['INV-0024','Essentials Plan','Jun 1, 2026','₦199,000','Active']
 ];
 return <section className="panel billingpanel">
  <h2>Billing</h2>
  <div className="billingbody">
   <div className="billsectiontitle"><h3>My Plan <em>Active</em></h3></div>
   <article className="plancard">
    <div className="plansummary"><h3>Essentials Plan</h3><p><strong>₦199,000</strong><span>One-time payment</span></p><small><CalendarClock/>Sept 15, 2026 — Oct 15, 2026</small><small>No automatic renewals</small><div><button className="softprimary" onClick={openModify}><Edit3/>Modify plan</button><button onClick={()=>setOverlay('details')}>View plan details</button></div></div>
    <div className="readiness"><b>CERTIFICATION READINESS</b><strong>74%</strong><span><CheckCircle2/>On track</span><small>Target: 85% to be exam ready</small><div className="progressbar"><i/></div><div className="progresslabels"><span>0</span><span>100%</span></div></div>
    <div className="usagecards"><div><i className="green"><CalendarClock/></i><span>Days remaining<strong>12 <small>of 30 days</small></strong></span></div><div><i className="blue"><Trophy/></i><span>Mock exams<strong>2 / 2 <small>Completed</small></strong></span></div><div><i className="orange"><Clock3/></i><span>Subscription usage<strong>18 <small>/ 30 days used</small></strong></span></div></div>
   </article>
   <div className="billingdivider"/>
   <div className="billsectiontitle"><h3>Payment methods</h3><p>Auto-routed based on your billing region</p></div>
   <div className="paymentmethods">{methods.map(([name,sub,type,isDefault],i)=><div className="paymentrow" key={name}><span className={'paylogo '+type}>{type==='mastercard'?'●●':'K'}</span><div><b>{name}</b><small>{sub}</small></div>{isDefault&&<em>Default</em>}<button aria-label={'Remove '+name} onClick={()=>setMethods(methods.filter((_,x)=>x!==i))}><X/></button></div>)}</div>
   <div className="currency"><b>Billing currency</b><span><Check/>NGN · Auto-detected (Nigeria)</span></div>
   <button className="addmethod" onClick={()=>setOverlay('payment')}><Plus/>Add payment method</button>
   <div className="billingdivider"/>
   <div className="billsectiontitle"><h3>Invoice history</h3><p>Recent transactions on your account</p></div>
   <div className="invoicelist">{invoices.map(([id,item,date,amount,status])=><div className="invoicerow" key={id}><b>{id}</b><span>{item}</span><span>{date}</span><strong>{amount}</strong><em className={status==='Refunded'?'refund':'active'}>{status}</em><button><Download/></button></div>)}</div>
   <button className="allinvoices">View all invoices <ChevronRight/></button>
  </div>
  {overlay&&<BillingOverlay type={overlay} close={close} {...{modifyTab,setModifyTab,choice,setChoice,confirm,pay}}/>}
 </section>
}

function BillingOverlay({type,close,modifyTab,setModifyTab,choice,setChoice,confirm,pay}){
 if(type==='modify') return <div className="overlay"><button className="scrim" onClick={close}/><aside className="plandrawer">
  <div className="drawerhead"><div><h2>Modify your plan</h2><p>Extend your access or move to a plan with more support.</p></div><button onClick={close}><X/></button></div>
  <div className="plantabs"><button className={modifyTab==='extend'?'active':''} onClick={()=>{setModifyTab('extend');setChoice('Professional Growth')}}><CalendarClock/>Extend duration</button><button className={modifyTab==='upgrade'?'active':''} onClick={()=>{setModifyTab('upgrade');setChoice('Advanced')}}>↗ Upgrade tier</button></div>
  <div className="planoptions">{(modifyTab==='extend'?[
   ['Professional Growth','+60 days access','₦50,000',['Extended support','Full mock exams','Resource centre access'],'Recommended'],
   ['Mastery Path','+90 days access','₦99,000',['Everything in 60 days','Mentor access','Priority support'],'Popular']
  ]:[
   ['Advanced','More content & exams','₦100,000',['Practical case studies','Explainer videos','4 mock exams'],'Recommended'],
   ['Elite','Career-accelerator bundle','₦400,000',['LinkedIn & CV revamp','Career advisory','Unlimited mock exams'],'Popular']
  ]).map(([name,sub,price,features,badge],i)=><button className={'planoption '+(choice===name?'selected':'')} onClick={()=>setChoice(name)} key={name}><span className={i?'optionicon coral':'optionicon'}><Sparkles/></span><div><h3>{name}</h3><p>{sub}</p><strong>{price}<small>one-time</small></strong>{features.map(x=><span className="feature" key={x}><Check/>{x}</span>)}</div><em className={i?'popular':''}>{badge}</em><i className="radio"/></button>)}</div>
  <div className="drawerfoot"><p><Info/>All payments are secure and encrypted.<br/>You won't be charged until you confirm.</p><div><button onClick={close}>Cancel</button><button className="primary" onClick={confirm}>Proceed to pay</button></div></div>
 </aside></div>;
 if(type==='details') return <Modal close={close} title="Essentials Plan details"><div className="planinfobox"><b>Essentials Plan</b><small>Active until October 15, 2026 · No automatic renewals</small></div><div className="detailpairs"><span>Full learning library<b>Included</b></span><span>Mock exams<b>2 included</b></span><span>Certification readiness tracking<b>Included</b></span><span>Mentor support<b>Standard</b></span><span className="total">Amount paid<b>₦199,000</b></span></div></Modal>;
 if(type==='payment') return <Modal close={close} title="Add payment method" wide><form className="cardform" onSubmit={e=>{e.preventDefault();close()}}><label>Name on card<input placeholder="Marina Wilson"/></label><label>Card number<input placeholder="0000 0000 0000 0000"/></label><div><label>Expiry date<input placeholder="MM / YY"/></label><label>CVC<input placeholder="123"/></label></div><p>Your payment details are securely processed by Paystack and are never stored by CertSprints.</p><button className="primary">Save payment method</button></form></Modal>;
 if(type==='confirm') {const upgraded=modifyTab==='upgrade';return <Modal close={close} title="Confirm & pay"><div className="planinfobox"><b>{upgraded?'Advanced Tier':'60 Days Extension'}</b><small>{upgraded?'Tier upgrade on your Essentials Plan':'Duration extension to your Essentials Plan'}</small></div><div className="pricecalc"><span>Option price<b>{upgraded?'₦100,000':'₦50,000'}</b></span><span>Unused plan credit<b className={upgraded?'credit':''}>- {upgraded?'₦100,000':'₦50,000'}</b></span><span className="due">Due today<b>₦0</b></span></div><div className="paymethodconfirm"><CreditCard/><b>Mastercard •••• 8899</b><span>NGN · Paystack</span><button>Change</button></div><p className="paynote"><Info/>Your plan end date will update immediately after payment is confirmed. No automatic renewals.</p><button className="primary paybutton" onClick={pay}>Pay ₦0</button></Modal>}
 if(type==='success'||type==='done') return <Modal close={close} success><img className="successasset billing" src={assetPath('/assets/success-badge.svg')} alt="Success"/><h2>{type==='success'?'Plan upgraded!':'Plan extended!'}</h2><p>{type==='success'?<>You're now on the <b>Advanced Tier.</b><br/>New features are live on your account.</>:<>Your plan now includes 60 additional days.<br/>Your new end date is December 14, 2026.</>}</p><button className="primary" onClick={close}>Back to dashboard</button></Modal>;
}
function Modal({close,title,children,wide,success}){
 return <div className="overlay"><button className="scrim" onClick={close}/><div className={'billmodal '+(wide?'wide ':'')+(success?'successmodal':'')}><button className="modalclose" onClick={close}><X/></button>{title&&<h2>{title}</h2>}{children}</div></div>
}
function NotifyRow({title,desc,email,push,Icon}){
 const [e,setE]=useState(email), [p,setP]=useState(push);
 return <div className="notifyrow"><span className="peach"><Icon/></span><div><b>{title}</b><small>{desc}</small></div><Toggle on={e} setOn={setE} label={title+' email'}/><Toggle on={p} setOn={setP} label={title+' push'}/></div>
}

function App(){
 const referOnly=import.meta.env.VITE_REFER_ONLY==='true';
 if(referOnly) return <div className="reviewapp"><header className="reviewheader"><img src={assetPath('/assets/certsprints-logo.svg')} alt="CertSprints"/><span>Refer &amp; Earn review</span></header><main className="reviewmain"><ReferEarn/></main></div>;
 const hash=location.hash.replace('#','');
 const [page,setPage]=useState(['sounds','notifications','referrals','billing'].includes(hash)?hash:'profile');
 const [editing,setEditing]=useState(hash==='edit');
 const changePage=p=>{setPage(p); setEditing(false); location.hash=p};
 return <div className="app"><Sidebar/><main><Topbar/><div className="shell">
  <div className="heading"><h1>Settings</h1><p>Showing a deep dive into your current learning progress</p></div>
  <div className="content"><SettingsMenu page={page} setPage={changePage}/>{page==='profile'?<Profile editing={editing} setEditing={setEditing}/>:page==='sounds'?<Sounds/>:page==='notifications'?<Notifications/>:page==='referrals'?<ReferEarn/>:page==='billing'?<Billing/>:<section className="panel empty"><h2>{settings.find(x=>x[0]===page)?.[1]}</h2><p>This section is ready for your settings.</p></section>}</div>
 </div></main></div>
}

createRoot(document.getElementById('root')).render(<App/>);
