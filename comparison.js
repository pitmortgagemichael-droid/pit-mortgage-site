(function (root) {
  'use strict';
  function loan(amount, rate, years) {
    if (![amount, rate, years].every(Number.isFinite) || amount < 1000 || amount > 1e8 || rate < 0 || rate > 20 || years < 1 || years > 40 || !Number.isInteger(years)) return null;
    const months = years * 12;
    const r = rate / 1200;
    const monthly = r === 0 ? amount / months : amount * r / -Math.expm1(-months * Math.log1p(r));
    return { monthly, total: monthly * months, interest: Math.max(0, monthly * months - amount) };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { loan };
  if (typeof document === 'undefined') return;
  const byId = id => document.getElementById(id);
  const money = n => 'RM ' + n.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const ids = ['amount', 'a-rate', 'a-years', 'b-rate', 'b-years'];
  const fields = ids.map(id => byId('compare-' + id));
  let summary = '';
  function update() {
    const values = fields.map(el => el.value.trim() === '' ? NaN : Number(el.value));
    const [amount, ar, ay, br, by] = values;
    const a = loan(amount, ar, ay), b = loan(amount, br, by);
    fields.forEach(el => el.setAttribute('aria-invalid', String(!el.validity.valid)));
    for (const [key, result] of [['a', a], ['b', b]]) {
      for (const metric of ['monthly', 'interest', 'total']) byId(`compare-${key}-${metric}`).textContent = a && b ? money(result[metric]) : '—';
    }
    byId('compare-share').disabled = !a || !b;
    if (!a || !b) {
      byId('compare-difference').textContent = '请输入有效金额（RM 1,000–100,000,000）、利率（0–20%）及整数年限（1–40年）。';
      byId('compare-cost').textContent = '';
      summary = '';
      return;
    }
    const delta = a.monthly - b.monthly;
    const totalDelta = a.total - b.total;
    const difference = Math.abs(delta) < .005 ? '两种方案的预估月供相同。' : `方案 B 每月${delta > 0 ? '少供' : '多供'} ${money(Math.abs(delta))}。`;
    const cost = Math.abs(totalDelta) < .005 ? '两种方案的预估总还款相同（未计费用）。' : `方案 B 全期总还款${totalDelta > 0 ? '减少' : '增加'} ${money(Math.abs(totalDelta))}（未计费用）。`;
    byId('compare-difference').textContent = difference;
    byId('compare-cost').textContent = cost + (by > ay ? ' 注意：方案 B 延长了还款年限。' : '');
    summary = `贷款比较（估算，非银行报价）\n本金：${money(amount)}\n方案 A：${ar}% / ${ay}年 / 月供 ${money(a.monthly)}\n方案 B：${br}% / ${by}年 / 月供 ${money(b.monthly)}\n${difference}\n${cost}\n请帮我进一步比较费用与条款。`;
  }
  fields.forEach(el => el.addEventListener('input', update));
  byId('compare-reset').addEventListener('click', () => {
    ['500000', '4.3', '30', '3.9', '30'].forEach((value, i) => fields[i].value = value);
    update();
  });
  byId('compare-share').addEventListener('click', () => {
    if (!summary) return;
    const box = byId('svc-msg');
    box.value = summary;
    root.goToContact('还不确定，想先了解一下');
    root.showHome('#contact');
    box.dispatchEvent(new Event('input', { bubbles: true }));
  });
  update();
})(typeof window === 'undefined' ? globalThis : window);

/* ─────────────────────────────────────────────────────────────
   MRTA vs MLTA — 示意图
   把三条线画在同一组坐标上：房贷余额、MRTA 递减保额、MLTA 水平保额。
   两张分开的小图看不出重点；重点是「余额下降后，两者之间差多少」。
   纯教育示意，不是任何保单报价。
   ───────────────────────────────────────────────────────────── */
(function () {
  var svg = document.getElementById('prot-chart');
  if (!svg) return;
  var $ = function (id) { return document.getElementById(id); };
  var W = 720, H = 340, L = 64, R = 18, T = 20, B = 44;

  function balances(principal, annualPct, years) {
    var n = years * 12, r = annualPct / 100 / 12, out = [], bal = principal;
    var pay = r ? principal * r / (1 - Math.pow(1 + r, -n)) : principal / n;
    for (var m = 0; m <= n; m++) {
      if (m % 12 === 0) out.push(Math.max(0, bal));
      bal = r ? bal * (1 + r) - pay : bal - pay;
    }
    return out;
  }
  function yrSuffix() {
    var l = 'zh';
    try { l = localStorage.getItem('pms.lang') || 'zh'; } catch (e) {}
    return l === 'en' ? 'y' : l === 'ms' ? 'th' : '年';
  }
  function approx() {
    var l = 'zh';
    try { l = localStorage.getItem('pms.lang') || 'zh'; } catch (e) {}
    return l === 'en' ? 'approx. ' : l === 'ms' ? 'lebih kurang ' : '约 ';
  }
  function money(v) {
    if (v >= 1e6) return 'RM ' + (v / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'M';
    if (v >= 1e3) return 'RM ' + Math.round(v / 1e3) + 'k';
    return 'RM ' + Math.round(v);
  }

  function draw() {
    var P = Math.max(0, parseFloat($('prot-loan').value) || 0);
    var Y = Math.min(40, Math.max(1, parseInt($('prot-years').value, 10) || 30));
    var rate = Math.max(0, parseFloat($('prot-rate').value) || 0);
    if (!P) { svg.innerHTML = ''; $('prot-readout').textContent = ''; return; }

    var bal = balances(P, rate, Y);
    var raw = P * 1.08, mag = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10));
    var maxY = Math.ceil(raw / (mag / 2)) * (mag / 2);   // a round number at the top of the axis
    var x = function (i) { return L + (i / Y) * (W - L - R); };
    var y = function (v) { return T + (1 - v / maxY) * (H - T - B); };

    var parts = [];
    // grid + y labels
    for (var g = 0; g <= 4; g++) {
      var v = maxY * g / 4, yy = y(v);
      parts.push('<line x1="' + L + '" y1="' + yy + '" x2="' + (W - R) + '" y2="' + yy + '" stroke="var(--line)" stroke-width="1"/>');
      parts.push('<text x="' + (L - 9) + '" y="' + (yy + 4) + '" text-anchor="end" font-size="11" fill="var(--muted)">' + money(v) + '</text>');
    }
    // x labels
    var step = Y <= 10 ? 2 : Y <= 20 ? 5 : 5;
    for (var t = 0; t <= Y; t += step) {
      parts.push('<text x="' + x(t) + '" y="' + (H - B + 20) + '" text-anchor="middle" font-size="11" fill="var(--muted)">' + t + yrSuffix() + '</text>');
    }
    // the gap MLTA covers once the balance has fallen away
    var gap = ['M ' + x(0) + ' ' + y(P)];
    for (var i = 0; i <= Y; i++) gap.push('L ' + x(i) + ' ' + y(bal[i]));
    gap.push('L ' + x(Y) + ' ' + y(P) + ' Z');
    parts.push('<path d="' + gap.join(' ') + '" fill="var(--gold-soft)" opacity=".85"/>');

    var line = function (pts, stroke, width, dash) {
      return '<path d="' + pts + '" fill="none" stroke="' + stroke + '" stroke-width="' + width +
        '" stroke-linecap="round" stroke-linejoin="round"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
    };
    var balPts = bal.map(function (v, i) { return (i ? 'L ' : 'M ') + x(i) + ' ' + y(v); }).join(' ');
    parts.push(line('M ' + x(0) + ' ' + y(P) + ' L ' + x(Y) + ' ' + y(P), 'var(--paper)', 3.5));          // MLTA level
    parts.push(line(balPts, 'var(--gold-strong)', 3.5));                                                   // MRTA, tracking the balance
    // axes
    parts.push('<line x1="' + L + '" y1="' + y(0) + '" x2="' + (W - R) + '" y2="' + y(0) + '" stroke="var(--muted)" stroke-width="1.5"/>');

    var mid = Math.round(Y / 2);
    parts.push('<circle cx="' + x(mid) + '" cy="' + y(bal[mid]) + '" r="4.5" fill="var(--gold-strong)"/>');
    parts.push('<circle cx="' + x(mid) + '" cy="' + y(P) + '" r="4.5" fill="var(--paper)"/>');
    svg.innerHTML = parts.join('');

    var diff = P - bal[mid];
    $('prot-readout').innerHTML =
      '<div class="pr-row"><span>第 ' + mid + ' 年的房贷余额</span><b>' + money(bal[mid]) + '</b></div>' +
      '<div class="pr-row"><span>当年 MRTA 的保额（贴着余额）</span><b>' + approx() + money(bal[mid]) + '</b></div>' +
      '<div class="pr-row"><span>当年 MLTA 的保额（维持水平）</span><b>' + money(P) + '</b></div>' +
      '<div class="pr-row pr-gap"><span>两者差额 — MLTA 多出来的保障</span><b>' + money(diff) + '</b></div>';
    if (window.applyI18n) window.applyI18n();
  }

  ['prot-loan', 'prot-years', 'prot-rate'].forEach(function (id) {
    var el = $(id); if (el) el.addEventListener('input', draw);
  });
  // the readout is built in JS and glues a prefix onto a changing number, so a
  // language switch has to rebuild it rather than swap text
  window.__protRedraw = draw;
  draw();
})();
