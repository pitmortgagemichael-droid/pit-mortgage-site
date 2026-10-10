/* ─────────────────────────────────────────────────────────────
   语言切换 · Language switch — 中文 / English / Bahasa Malaysia
   只翻译主要部分：导航、首屏、贷款计算、MRTA/MLTA、服务、联系。
   其余（认识 Michael、常见问题、服务内页）保持中文。
   做法：以中文原文作为 key，切换时遍历指定区块的文字节点替换。
   第一次运行会把原文存进 dataset，所以切回中文永远不会丢字。
   ───────────────────────────────────────────────────────────── */
(function () {
  var T = {
/* ── nav / hero ── */
"服务":{en:"Services",ms:"Perkhidmatan"},
"贷款计算":{en:"Calculator",ms:"Kalkulator"},
"认识 Michael":{en:"About Michael",ms:"Tentang Michael"},
"留下联系方式 ↗":{en:"Get in touch ↗",ms:"Hubungi saya ↗"},
"房贷与保障，":{en:"Your loan and your cover,",ms:"Pinjaman dan perlindungan,"},
"一起看清楚。":{en:"seen clearly.",ms:"dilihat dengan jelas."},
"买房 Housing loan":{en:"Housing loan",ms:"Pinjaman rumah"},
"转贷 Refinance":{en:"Refinance",ms:"Refinance"},
"房贷保障 Protection":{en:"Protection",ms:"Perlindungan"},
"买房或考虑转贷？我是 Michael Liang，帮你比较月供、总利息与贷款条件，再一起整理申请文件、跟进审核。最终批准与条款由银行决定。":
 {en:"Buying, or thinking about refinancing? I am Michael Liang. I compare the monthly payment, the total interest and the loan terms with you, then help prepare the documents and follow the approval through. The final decision and terms rest with the bank.",
  ms:"Nak beli rumah atau fikir nak refinance? Saya Michael Liang. Saya bandingkan ansuran bulanan, jumlah faedah dan syarat pinjaman bersama anda, kemudian bantu sediakan dokumen dan ikut proses kelulusan. Keputusan dan syarat akhir di tangan bank."},
"预约初步咨询":{en:"Book a first chat",ms:"Buat temu janji"},
"自己先算一算 ↗":{en:"Try the calculator ↗",ms:"Cuba kalkulator ↗"},
"Loan Connect 官方系统操作":{en:"Submitted through Loan Connect",ms:"Dihantar melalui Loan Connect"},
"7人团队，各司其职":{en:"A team of 7, each with a role",ms:"Pasukan 7 orang, setiap satu ada peranan"},
"WhatsApp 全程可追踪":{en:"Everything traceable on WhatsApp",ms:"Semua boleh dijejak di WhatsApp"},
"房贷规划 · 保障比较":{en:"Loan planning · Protection comparison",ms:"Perancangan pinjaman · Perbandingan perlindungan"},
"YOUR ADVISOR · 你的顾问":{en:"YOUR ADVISOR",ms:"PENASIHAT ANDA"},
"和 Michael 聊聊 ↗":{en:"Talk to Michael ↗",ms:"Berbual dengan Michael ↗"},
/* ── strip ── */
"01 / 算清数字":{en:"01 / Run the numbers",ms:"01 / Kira dahulu"},
"比较月供与总利息":{en:"Compare payment and total interest",ms:"Banding ansuran dan jumlah faedah"},
"02 / 理解保障":{en:"02 / Understand the cover",ms:"02 / Faham perlindungan"},
"看懂 MRTA 与 MLTA":{en:"Make sense of MRTA and MLTA",ms:"Fahami MRTA dan MLTA"},
"03 / 聊聊情况":{en:"03 / Talk it through",ms:"03 / Berbincang"},
"让 Michael 帮你理清方向":{en:"Let Michael help you find the direction",ms:"Biar Michael bantu cari arah"},
/* ── tabs ── */
"MRTA / MLTA":{en:"MRTA / MLTA",ms:"MRTA / MLTA"},
"服务项目":{en:"Services",ms:"Perkhidmatan"},
"常见问题":{en:"FAQ",ms:"Soalan Lazim"},
"联系我":{en:"Contact",ms:"Hubungi"},
/* ── calculator ── */
"Loan comparison · 贷款比较":{en:"Loan comparison",ms:"Perbandingan pinjaman"},
"月供少一点，":{en:"A smaller monthly payment —",ms:"Ansuran lebih rendah —"},
"总利息也会少吗？":{en:"does it mean less interest?",ms:"adakah faedah pun kurang?"},
"用同一贷款金额，试着调整利率与年限。一起看每月负担和整段贷款的成本。":
 {en:"Keep the loan amount fixed and adjust the rate and the tenure. See what it does to the monthly burden and to the cost of the whole loan.",
  ms:"Kekalkan jumlah pinjaman, ubah kadar dan tempoh. Lihat kesannya pada beban bulanan dan kos sepanjang pinjaman."},
"贷款金额 / 未偿还本金 (RM)":{en:"Loan amount / outstanding principal (RM)",ms:"Jumlah pinjaman / baki pokok (RM)"},
"重设示例":{en:"Reset example",ms:"Set semula"},
"方案 A · 当前 / 第一份报价":{en:"Option A · current / first quote",ms:"Pilihan A · semasa / sebut harga pertama"},
"方案 B · 新方案 / 第二份报价":{en:"Option B · new / second quote",ms:"Pilihan B · baharu / sebut harga kedua"},
"年利率 Interest (% p.a.)":{en:"Interest rate (% p.a.)",ms:"Kadar faedah (% setahun)"},
"年限 / 剩余年限 (years)":{en:"Tenure / remaining years",ms:"Tempoh / baki tahun"},
"预估月供 Monthly payment":{en:"Estimated monthly payment",ms:"Anggaran ansuran bulanan"},
"总利息":{en:"Total interest",ms:"Jumlah faedah"},
"总还款（本金 + 利息）":{en:"Total repayment (principal + interest)",ms:"Jumlah bayaran (pokok + faedah)"},
"把比较结果带到咨询表 →":{en:"Take this comparison to the enquiry form →",ms:"Bawa perbandingan ini ke borang →"},
"了解服务":{en:"See the services",ms:"Lihat perkhidmatan"},
"输入仅在当前页面计算，不会自动发送。结果为估算，不代表可贷额度或批准。":
 {en:"Everything is calculated in your browser and nothing is sent automatically. These are estimates, not a lending limit or an approval.",
  ms:"Semua dikira dalam pelayar anda dan tiada apa dihantar secara automatik. Ini anggaran sahaja, bukan had pinjaman atau kelulusan."},
/* ── MRTA / MLTA ── */
"MRTA 与 MLTA，":{en:"MRTA and MLTA —",ms:"MRTA dan MLTA —"},
"先看懂，再选择。":{en:"understand first, then choose.",ms:"faham dahulu, baru pilih."},
"同样是房贷保障，保额变化和具体条款可以很不一样。把报价放在一起，比较才有意义。":
 {en:"Both cover a mortgage, but how the sum assured moves and what the terms say can differ sharply. Putting the quotes side by side is what makes a comparison mean something.",
  ms:"Dua-dua melindungi pinjaman rumah, tetapi cara jumlah perlindungan berubah dan syaratnya boleh sangat berbeza. Letak sebut harga bersebelahan, barulah perbandingan bermakna."},
"贷款金额 Loan (RM)":{en:"Loan amount (RM)",ms:"Jumlah pinjaman (RM)"},
"贷款年限 Tenure (years)":{en:"Tenure (years)",ms:"Tempoh (tahun)"},
"年利率 Rate (% p.a.)":{en:"Rate (% p.a.)",ms:"Kadar (% setahun)"},
"MRTA 保额 ≈ 房贷余额":{en:"MRTA cover ≈ outstanding loan",ms:"Perlindungan MRTA ≈ baki pinjaman"},
"MLTA 水平保额":{en:"MLTA level cover",ms:"Perlindungan rata MLTA"},
"差额 — MLTA 多出的保障":{en:"The gap — extra cover from MLTA",ms:"Jurang — perlindungan tambahan MLTA"},
"保额逐步递减":{en:"Cover reduces over time",ms:"Perlindungan menurun"},
"保额保持水平":{en:"Cover stays level",ms:"Perlindungan kekal rata"},
"保额按保单的递减表逐年下降，设计上贴着贷款余额走。不保证每个时间点都刚好等于当时的实际余额。":
 {en:"The sum assured falls each year along the policy's own reducing schedule, designed to track the outstanding loan. It is not guaranteed to equal the actual balance at every point.",
  ms:"Jumlah perlindungan menurun setiap tahun mengikut jadual polisi, direka mengikut baki pinjaman. Ia tidak dijamin sama dengan baki sebenar pada setiap masa."},
"在约定保障期内维持同一个保额。贷款余额下降后，保额与余额之间的差额仍在保障范围内。":
 {en:"The sum assured stays the same through the agreed term. As the loan balance falls, the difference between the cover and the balance remains insured.",
  ms:"Jumlah perlindungan kekal sepanjang tempoh. Apabila baki pinjaman turun, bezanya masih dilindungi."},
"常见一次性保费，可融入贷款":{en:"Usually a single premium, financeable into the loan",ms:"Biasanya premium sekali, boleh dimasukkan ke pinjaman"},
"保额随时间下降":{en:"Cover falls over time",ms:"Perlindungan turun mengikut masa"},
"贷款还清后保障通常结束":{en:"Cover usually ends once the loan is settled",ms:"Perlindungan biasanya tamat bila pinjaman selesai"},
"可能一次性或分期缴费，看产品":{en:"Single or instalment premium, depending on the product",ms:"Premium sekali atau ansuran, bergantung produk"},
"保额在保障期内不变":{en:"Cover unchanged through the term",ms:"Perlindungan tidak berubah sepanjang tempoh"},
"部分产品有现金价值，须核对条款":{en:"Some products carry cash value — check the terms",ms:"Sesetengah produk ada nilai tunai — semak syarat"},
"图表为教育用途的示意计算，依你输入的数字推算，不是任何保单的报价、现金价值或赔款预测。实际保额表、保费与条款以保险公司的产品披露文件为准。":
 {en:"The chart is an illustrative calculation for education, worked from the figures you enter. It is not a quote, a cash value or a claim projection for any policy. The actual schedule, premium and terms are those in the insurer's product disclosure sheet.",
  ms:"Carta ini pengiraan ilustrasi untuk pendidikan, berdasarkan angka yang anda masukkan. Ia bukan sebut harga, nilai tunai atau unjuran tuntutan. Jadual, premium dan syarat sebenar ikut dokumen pendedahan produk penanggung insurans."},
"比较的关键，是你的贷款与家庭需要。":{en:"What matters is your loan and what your family needs.",ms:"Yang penting ialah pinjaman anda dan keperluan keluarga."},
"请 Michael 帮我比较 ↗":{en:"Ask Michael to compare ↗",ms:"Minta Michael banding ↗"},
/* ── band ── */
"数字看过了，":{en:"You have seen the numbers.",ms:"Nombor sudah dilihat."},
"下一步聊聊你的情况。":{en:"Now let's talk about your situation.",ms:"Sekarang mari bincang situasi anda."},
"留下称呼、电话和想了解的项目，通过 WhatsApp 发给 Michael。":
 {en:"Leave your name, number and what you want to know — it goes to Michael on WhatsApp.",
  ms:"Tinggalkan nama, nombor dan apa yang anda nak tahu — ia pergi ke WhatsApp Michael."},
"留下联系方式，开始咨询 ↗":{en:"Leave your details to start ↗",ms:"Tinggalkan maklumat untuk mula ↗"}
  };
  window.__I18N_T = T;
})();

/* 服务 + 联系 + 切换逻辑 */
(function () {
  var T = window.__I18N_T;
  var MORE = {
"服务项目 Services":{en:"Services",ms:"Perkhidmatan"},
"我每天都在处理这些事":{en:"This is what I do every day",ms:"Ini kerja harian saya"},
"用简单的话讲清楚每个服务在做什么、适合什么人 — 不确定自己需要哪一个也没关系，留言问我就好。":
 {en:"Plain language on what each service does and who it suits. Not sure which one you need? Just message me.",
  ms:"Penjelasan ringkas apa setiap perkhidmatan buat dan sesuai untuk siapa. Tak pasti yang mana? Mesej saya."},
"房屋贷款":{en:"Housing Loan",ms:"Pinjaman Perumahan"},
"买新房或二手房需要贷款，从选银行、算DSR、准备文件到批准，我帮你安排整个流程。":
 {en:"Buying new or sub-sale and need a loan. From choosing the bank and working out DSR to documents and approval, I run the whole process with you.",
  ms:"Beli rumah baharu atau sub-sale dan perlu pinjaman. Dari pilih bank, kira DSR, sedia dokumen hingga kelulusan — saya uruskan bersama anda."},
"适合：第一次买房 / 换房的人":{en:"For: first-time buyers and upgraders",ms:"Untuk: pembeli kali pertama atau tukar rumah"},
"问问看 →":{en:"Ask about this →",ms:"Tanya →"},
"利率降了、想套现、或想合并债务？我帮你算清楚现在转贷划不划算，不是利率一降就该马上做。":
 {en:"Rates dropped, or you want to cash out or consolidate. I work out whether refinancing is actually worth it now — a lower rate alone is not a reason to move.",
  ms:"Kadar turun, atau nak cash out atau gabung hutang. Saya kira sama ada refinance berbaloi sekarang — kadar rendah sahaja bukan sebab untuk bertindak."},
"适合：已经供了几年房贷的人":{en:"For: those a few years into a mortgage",ms:"Untuk: yang sudah beberapa tahun bayar pinjaman"},
"公务员房屋贷款 Government Loan":{en:"Government servant housing loan",ms:"Pinjaman perumahan kakitangan kerajaan"},
"公务员专属贷款，流程跟银行贷款不一样。我熟悉常见卡关的地方，帮你整理文件、跟进审核。":
 {en:"A scheme for government servants that works differently from a bank loan. I know where it usually gets stuck, and handle the documents and follow-up.",
  ms:"Skim khas kakitangan kerajaan, prosesnya lain dari pinjaman bank. Saya tahu di mana biasanya tersekat, dan uruskan dokumen serta susulan."},
"适合：公务员 / Kakitangan Kerajaan":{en:"For: government servants",ms:"Untuk: kakitangan kerajaan"},
"房产估价协助":{en:"Property Valuation Assist",ms:"Bantuan Penilaian Hartanah"},
"想知道手上的房子现在大概值多少？我帮你安排估价、看懂估价报告，再对照贷款额度来规划下一步。":
 {en:"Want to know roughly what your property is worth now? I arrange the valuation, walk you through the report, and line it up against your loan to plan the next step.",
  ms:"Nak tahu nilai hartanah anda sekarang? Saya aturkan penilaian, terangkan laporannya, dan bandingkan dengan pinjaman anda untuk langkah seterusnya."},
"适合：准备转贷、套现或卖房的人":{en:"For: those refinancing, cashing out or selling",ms:"Untuk: yang nak refinance, cash out atau jual"},
"律师 / 室内设计转介":{en:"Lawyer & Interior Referral",ms:"Rujukan Peguam & Reka Dalaman"},
"买卖房子要找律师处理合约，拿了钥匙要找设计师装修。我可以依你的情况给建议，介绍合作过的专业人士。":
 {en:"Buying or selling needs a lawyer for the contract; once you have the keys you need a designer. I can advise based on your case and introduce people I have worked with.",
  ms:"Jual beli perlu peguam untuk kontrak; dapat kunci perlu pereka. Saya boleh nasihat ikut kes anda dan kenalkan orang yang saya pernah bekerjasama."},
"适合：需要律师或装修设计的人":{en:"For: anyone needing a lawyer or a designer",ms:"Untuk: sesiapa perlukan peguam atau pereka"},
"加入我们":{en:"Join Us",ms:"Sertai Kami"},
"MLTA 房贷保险":{en:"MLTA Mortgage Insurance",ms:"Insurans Pinjaman MLTA"},
"不确定该问哪个？":{en:"Not sure which one to ask about?",ms:"Tak pasti nak tanya yang mana?"},
"了解详情 →":{en:"Find out more →",ms:"Ketahui lanjut →"},
"直接留言给我 →":{en:"Just message me →",ms:"Terus mesej saya →"},
"先看 MRTA / MLTA 比较 →":{en:"See the MRTA / MLTA comparison →",ms:"Lihat perbandingan MRTA / MLTA →"},
/* ── contact ── */
"联系我 Contact":{en:"Contact",ms:"Hubungi"},
"有个方向了？我们聊聊。":{en:"Got a direction? Let's talk.",ms:"Sudah ada arah? Mari berbincang."},
"填好以下资料，按下按钮会打开WhatsApp，把你的资料整理好发给我 — 我看到会尽快回复你。":
 {en:"Fill this in and the button opens WhatsApp with your details tidied up and ready to send. I reply as soon as I see it.",
  ms:"Isi ini dan butang akan buka WhatsApp dengan maklumat anda tersusun dan sedia dihantar. Saya balas sebaik nampak."},
"最快回复，直接对话":{en:"Fastest reply, straight to chat",ms:"Balasan terpantas, terus berbual"},
"电邮 Email":{en:"Email",ms:"E-mel"},
"姓名 Name":{en:"Name",ms:"Nama"},
"联系电话 / WhatsApp":{en:"Phone / WhatsApp",ms:"Telefon / WhatsApp"},
"地区 Area":{en:"Area",ms:"Kawasan"},
"月收入 Monthly Income (RM)":{en:"Monthly income (RM)",ms:"Pendapatan bulanan (RM)"},
"我想咨询":{en:"I want to ask about",ms:"Saya nak tanya tentang"},
"房屋贷款 New Housing Loan":{en:"New housing loan",ms:"Pinjaman rumah baharu"},
"LPPSA 公务员贷款":{en:"LPPSA government loan",ms:"Pinjaman LPPSA"},
"MRTA / MLTA 比较":{en:"MRTA / MLTA comparison",ms:"Perbandingan MRTA / MLTA"},
"加入团队 Join Us":{en:"Joining the team",ms:"Sertai pasukan"},
"还不确定，想先了解一下":{en:"Not sure yet, just exploring",ms:"Belum pasti, nak tahu dulu"},
"简单说说你的情况（可留空）":{en:"Tell me a bit about your situation (optional)",ms:"Ceritakan sedikit situasi anda (pilihan)"},
"请先填写姓名、电话和咨询项目，才能发送 🙂":{en:"Name, phone and topic first, then you can send 🙂",ms:"Isi nama, telefon dan topik dahulu 🙂"},
"打开 WhatsApp，确认后发送":{en:"Open WhatsApp and send",ms:"Buka WhatsApp dan hantar"},
"此表格不会在本站提交或保存。点击后会将所填内容带到 WhatsApp，由你确认发送给 Michael。月收入可留空；初步咨询无需提供身份证或银行文件。":
 {en:"Nothing is submitted or stored on this site. The button carries what you typed into WhatsApp for you to confirm and send. Income is optional, and a first chat needs no IC or bank documents.",
  ms:"Tiada apa dihantar atau disimpan di laman ini. Butang membawa apa yang anda taip ke WhatsApp untuk anda sahkan dan hantar. Pendapatan pilihan sahaja; perbualan awal tidak perlu IC atau dokumen bank."},
"或直接邮件：":{en:"Or email directly:",ms:"Atau e-mel terus:"},
"你的名字":{en:"Your name",ms:"Nama anda"},
"例如：012-3456789":{en:"e.g. 012-3456789",ms:"cth. 012-3456789"},
"例如：Penang, KL":{en:"e.g. Penang, KL",ms:"cth. Penang, KL"},
"例如：5000":{en:"e.g. 5000",ms:"cth. 5000"},
"例如：想买RM50万的房子，第一次贷款，想知道要准备多少钱":
 {en:"e.g. Looking at a RM500k home, first loan, want to know what to prepare",
  ms:"cth. Nak beli rumah RM500k, pinjaman pertama, nak tahu apa perlu disediakan"},
/* chart readout, rebuilt by JS on every change */
"每月相差":{en:"Monthly difference",ms:"Beza sebulan"},
"第 15 年的房贷余额":{en:"Outstanding loan in year 15",ms:"Baki pinjaman tahun ke-15"},
"当年 MRTA 的保额（贴着余额）":{en:"MRTA cover that year (tracking the balance)",ms:"Perlindungan MRTA tahun itu (ikut baki)"},
"当年 MLTA 的保额（维持水平）":{en:"MLTA cover that year (stays level)",ms:"Perlindungan MLTA tahun itu (kekal rata)"},
"两者差额 — MLTA 多出来的保障":{en:"The difference — extra cover from MLTA",ms:"Bezanya — perlindungan tambahan MLTA"}
  };
  for (var k in MORE) T[k] = MORE[k];

  var LANGS = ['zh', 'en', 'ms'];
  var cur = localStorage.getItem('pms.lang') || 'zh';
  // only the main sections are translated; the rest stays Chinese on purpose
  var SCOPE = '.nav-inner, section.hero, section.strip, #tabbar, #compare, #protection, .consult-band, #services, #contact';

  function translateNode(node, lang) {
    var raw = node.nodeValue;
    var key = raw.replace(/\s+/g, ' ').trim();
    if (!key) return;
    if (!node.__zh) node.__zh = raw;              // remember the original once
    var src = node.__zh.replace(/\s+/g, ' ').trim();
    var e = T[src];
    if (!e) return;
    node.nodeValue = (lang === 'zh' || !e[lang]) ? node.__zh : node.__zh.replace(src, e[lang]);
  }
  function walk(root, lang) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var n, list = [];
    while ((n = w.nextNode())) list.push(n);
    list.forEach(function (x) { translateNode(x, lang); });
    root.querySelectorAll('[placeholder]').forEach(function (el) {
      if (!el.dataset.phZh) el.dataset.phZh = el.getAttribute('placeholder');
      var e = T[el.dataset.phZh];
      el.setAttribute('placeholder', (lang === 'zh' || !e || !e[lang]) ? el.dataset.phZh : e[lang]);
    });
  }
  function apply(lang) {
    document.querySelectorAll(SCOPE).forEach(function (r) { walk(r, lang); });
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans-MY' : (lang === 'ms' ? 'ms-MY' : 'en-MY');
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('is-on', b.dataset.lang === lang);
    });
  }
  window.applyI18n = function () { apply(cur); };
  window.setLang = function (lang) {
    if (LANGS.indexOf(lang) < 0) return;
    cur = lang; localStorage.setItem('pms.lang', lang); apply(lang);
    if (window.__protRedraw) window.__protRedraw();
    if (window.__compareRedraw) window.__compareRedraw();
  };
  document.addEventListener('DOMContentLoaded', function () { apply(cur); });
  if (document.readyState !== 'loading') apply(cur);
})();
