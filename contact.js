(function () {
  'use strict';
  const dialog = document.getElementById('quick-contact');
  const form = document.getElementById('quick-form');
  const name = document.getElementById('quick-name');
  const phone = document.getElementById('quick-phone');
  const interest = document.getElementById('quick-interest');
  const error = document.getElementById('quick-error');
  let opener;
  function validPhone(value) {
    return /^[+\d\s()-]+$/.test(value) && /^\d{8,15}$/.test(value.replace(/\D/g, ''));
  }
  document.querySelectorAll('[data-lead]').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      opener = button;
      interest.value = button.dataset.lead;
      error.textContent = '';
      phone.removeAttribute('aria-invalid');
      if (typeof dialog.showModal !== 'function') {
        window.showHome('#contact');
        window.goToContact(button.dataset.lead);
        return;
      }
      dialog.showModal();
      name.focus();
    });
  });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { if (opener) opener.focus(); });
  phone.addEventListener('input', () => { phone.removeAttribute('aria-invalid'); error.textContent = ''; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!name.value.trim()) { error.textContent = '请填写你的称呼。'; name.focus(); return; }
    if (!validPhone(phone.value.trim())) {
      phone.setAttribute('aria-invalid', 'true');
      error.textContent = '请填写有效联系电话（8–15位数字，可包含国家区号）。';
      phone.focus(); return;
    }
    error.textContent = '';
    const message = ['Hi Michael, 我想预约初步咨询。', '', '称呼：' + name.value.trim(), '联系电话：' + phone.value.trim(), '咨询项目：' + interest.value].join('\n');
    if (window.saveLead) window.saveLead({
      name: name.value.trim(), phone: phone.value.trim(), service: interest.value
    });
    window.open('https://wa.me/60174648113?text=' + encodeURIComponent(message), '_blank', 'noopener');
    error.textContent = '请在 WhatsApp 内确认并发送，Michael 才会收到。若未打开，请检查浏览器是否拦截了新窗口。';
  });
})();

/* ─────────────────────────────────────────────────────────────
   分页导航 — 把一页到底的长滚动拆成几个分页，手机上不用一直滑。
   注意：Google Ads 的金融服务政策要求公司身份与地址「不需点击即可见」，
   所以 footer 的法律资讯刻意放在分页之外，永远显示。
   ───────────────────────────────────────────────────────────── */
(function () {
  var bar = document.getElementById('tabbar');
  if (!bar) return;
  var btns = [].slice.call(bar.querySelectorAll('.tab-btn'));
  var panels = [].slice.call(document.querySelectorAll('[data-tab-panel]'));

  function activate(name, scroll) {
    if (!btns.some(function (b) { return b.dataset.tab === name; })) name = 'compare';
    btns.forEach(function (b) {
      var on = b.dataset.tab === name;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    panels.forEach(function (p) { p.hidden = p.dataset.tabPanel !== name; });
    try { history.replaceState(null, '', '#' + name); } catch (e) {}
    if (scroll) {
      var top = bar.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  }
  bar.addEventListener('click', function (e) {
    var b = e.target.closest('.tab-btn');
    if (b) activate(b.dataset.tab, true);
  });
  // the header links and any in-page anchor should switch tabs, not jump
  window.showHome = function (hash) {
    var home = document.getElementById('page-home');
    if (home) home.style.display = '';
    ['svc-loan', 'svc-refinance', 'svc-lppsa', 'svc-mlta'].forEach(function (p) {
      var el = document.getElementById('page-' + p);
      if (el) el.style.display = 'none';
    });
    var name = (hash || '').replace('#', '');
    if (name === 'content') name = 'trust';
    activate(name || 'compare', true);
  };
  var initial = (location.hash || '').replace('#', '');
  activate(initial === 'content' ? 'trust' : initial, false);
})();

/* 隐私政策与使用条款 — 马来西亚 PDPA 2010 要求收集个人资料前先给通知。
   表单会收集姓名、电话、地区与收入，所以这份通知是必要的，不只是广告平台的要求。 */
(function () {
  var dlg = document.getElementById('legal-dialog');
  if (!dlg) return;
  var TXT = {
    privacy: {
      h: '隐私政策 Privacy Notice',
      b: '<p>本通知依据马来西亚《2010年个人资料保护法令》(PDPA 2010) 提供。</p>' +
         '<h3>我们收集什么</h3><p>当你填写咨询表单时，我们会收集你主动提供的：姓名、联络电话、电邮、所在地区、大约收入范围，以及你想咨询的项目与留言内容。</p>' +
         '<h3>为什么收集</h3><p>仅用于回复你的咨询、评估适合的贷款或保障方案，以及在你同意下代你向银行或保险公司提交申请。</p>' +
         '<h3>会给谁</h3><p>在处理你的申请所必要的范围内，可能提供给你所申请的银行、金融机构或保险公司。我们不会把你的资料出售或租予第三方作营销用途。</p>' +
         '<h3>储存与安全</h3><p>资料保存在受密码保护的系统中，只有处理你个案的人员可以存取。保存期限为处理需要及法律要求的期间。</p>' +
         '<h3>你的权利</h3><p>你可以随时要求查阅、更正或删除你的个人资料，或撤回同意。请电邮 <a href="mailto:pit.mortgage.michael@gmail.com">pit.mortgage.michael@gmail.com</a>。</p>' +
         '<h3>本网站的工具</h3><p>页面上的计算器完全在你的浏览器内运算，输入的数字不会自动传送给我们，除非你按下发送按钮。</p>'
    },
    terms: {
      h: '使用条款 Terms of Use',
      b: '<h3>资讯性质</h3><p>本网站的内容、计算器与图表仅供一般参考与教育用途，不构成贷款批准、利率承诺、保险投保建议或任何投资建议。</p>' +
         '<h3>估算的局限</h3><p>所有计算结果均依你输入的数字推算，采用标准摊还公式，不含银行的个别政策、手续费、保险成本或信用评估。实际可贷额度、利率与批准结果，完全由各银行与保险公司决定。</p>' +
         '<h3>保险说明</h3><p>MRTA 与 MLTA 的图表为走势示意，不代表任何特定保单的保额表、现金价值或赔付金额。请以保险公司的产品披露文件 (PDS) 与保单条款为准。</p>' +
         '<h3>费用</h3><p>我们不向客户收取任何前期咨询费用。</p>' +
         '<h3>外部链接</h3><p>本站可能链接至银行或保险公司的公开资料页面，仅供查阅，不表示本站与该机构存在代理或合作关系。</p>'
    }
  };
  window.openLegal = function (key) {
    var t = TXT[key]; if (!t) return;
    document.getElementById('legal-h').textContent = t.h;
    document.getElementById('legal-body').innerHTML = t.b;
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
  };
})();

/* ─────────────────────────────────────────────────────────────
   Google Form 收件箱 — 每一份咨询都存下来，不再只靠 WhatsApp。
   原本的做法：表单只是拼出一段文字再打开 WhatsApp。客户若没按发送，
   这条线索就永远消失，而且 Michael 完全不会知道它存在过。
   现在：先静默写进 Google Form（即写进他的 Google Sheet 并触发邮件通知），
   再照常打开 WhatsApp。两条路都走，哪一条断了都还有记录。

   设定方法：把 FORM_ID 与每个栏位的 entry.xxx 填进去即可启用。
   未填之前行为完全不变，不会有任何东西被破坏。
   ───────────────────────────────────────────────────────────── */
window.LEAD_SINK = {
  FORM_ID: '',              // 例：1FAIpQLSd....  (来自 /forms/d/e/<FORM_ID>/viewform)
  fields: {
    name:    '',            // entry.xxxxxxxxx
    phone:   '',
    email:   '',
    area:    '',
    income:  '',
    service: '',
    message: ''
  }
};
window.saveLead = function (data) {
  var C = window.LEAD_SINK;
  if (!C || !C.FORM_ID) return false;          // 未设定就安静跳过
  try {
    var body = new URLSearchParams();
    Object.keys(C.fields).forEach(function (k) {
      if (C.fields[k] && data[k] != null && data[k] !== '') body.append(C.fields[k], data[k]);
    });
    if (![].concat(body).length && !body.toString()) return false;
    // no-cors：Google 不回传结果，所以这是「尽力送达」，绝不阻挡 WhatsApp 那一步
    fetch('https://docs.google.com/forms/d/e/' + C.FORM_ID + '/formResponse',
          { method: 'POST', mode: 'no-cors', body: body });
    return true;
  } catch (e) { return false; }
};
