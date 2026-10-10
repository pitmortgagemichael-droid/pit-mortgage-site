// Add only client-approved, anonymised case stories. Empty keeps the section hidden.
const pitCaseStories = [];
// Shape: { title, situation, approach, outcome, date, image, imageAlt }
(function () {
  const list = document.getElementById('case-list');
  pitCaseStories.forEach(story => {
    const article = document.createElement('article');
    article.className = 'svc-card';
    if (story.image) {
      const img = document.createElement('img');
      img.src = story.image; img.alt = story.imageAlt || ''; img.loading = 'lazy';
      article.appendChild(img);
    }
    const heading = document.createElement('h3'); heading.textContent = story.title; article.appendChild(heading);
    for (const [key, label] of [['situation', '原本情况'], ['approach', '处理方式'], ['outcome', '结果'], ['date', '案例日期']]) {
      const p = document.createElement('p'); p.textContent = label + '：' + story[key]; article.appendChild(p);
    }
    const note = document.createElement('p'); note.className = 'calc-note'; note.textContent = '个别案例不代表其他申请的结果；批准与条款由银行决定。'; article.appendChild(note);
    list.appendChild(article);
  });
  document.getElementById('real-cases').hidden = pitCaseStories.length === 0;
})();
