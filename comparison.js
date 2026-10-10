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
