/* سبارك كودرز — سكربت محلي واحد، بلا مكتبات خارجية */
(function () {
  'use strict';

  var doc = document.documentElement;
  doc.classList.add('js');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  /* ---------- الترويسة عند التمرير ---------- */
  var header = $('[data-header]');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- القائمة الكاملة ---------- */
  var menu = $('[data-menu]');
  var toggle = $('[data-menu-toggle]');
  function setMenu(open) {
    if (!menu || !toggle) return;
    toggle.setAttribute('aria-expanded', String(open));
    $('[data-open-label]', toggle).hidden = open;
    $('[data-close-label]', toggle).hidden = !open;
    document.body.classList.toggle('menu-open', open);
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(function () {
        menu.classList.add('is-visible');
      });
      var first = $('a', menu);
      if (first) first.focus({ preventScroll: true });
    } else {
      menu.classList.remove('is-visible');
      setTimeout(function () {
        if (!menu.classList.contains('is-visible')) menu.hidden = true;
      }, 350);
    }
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
  }
  $$('[data-menu-link]').forEach(function (a) {
    a.addEventListener('click', function () {
      setMenu(false);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });

  /* ---------- الكلمة المتبدّلة في البطل ---------- */
  var rotator = $('[data-rotator]');
  if (rotator && !reduceMotion) {
    var words = $$('span', rotator);
    var idx = 0;
    setInterval(function () {
      var cur = words[idx];
      idx = (idx + 1) % words.length;
      cur.classList.remove('is-active');
      cur.classList.add('is-leaving');
      setTimeout(function () {
        cur.classList.remove('is-leaving');
      }, 800);
      words[idx].classList.add('is-active');
    }, 2600);
  }

  /* ---------- شريط التقنيات اللانهائي ---------- */
  $$('[data-marquee] .marquee-track').forEach(function (track) {
    $$('li', track).forEach(function (li) {
      var c = li.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      track.appendChild(c);
    });
  });

  /* ---------- الظهور عند التمرير + العدّاد ---------- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    if (reduceMotion) {
      el.textContent = '+' + target;
      return;
    }
    var start = null;
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / 1600, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = '+' + Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add('is-in');
          var n = en.target.querySelector('[data-count]');
          if (n && !n.dataset.done) {
            n.dataset.done = '1';
            countUp(n);
          }
          io.unobserve(en.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    $$('.reveal').forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 0.08 + 's';
      io.observe(el);
    });
  } else {
    $$('.reveal').forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  /* زر "انقر!" يزيد العدّاد */
  var tap = $('[data-tap]');
  if (tap) {
    tap.addEventListener('click', function () {
      var n = $('.leads-num');
      if (!n) return;
      var v = parseInt(n.textContent.replace(/\D/g, ''), 10) || 0;
      n.textContent = '+' + (v + 1);
    });
  }

  /* ---------- نص البيان يتلوّن كلمة كلمة مع التمرير ---------- */
  var scrub = $('[data-scrub]');
  if (scrub) {
    var text = scrub.textContent.trim();
    scrub.setAttribute('aria-label', text);
    scrub.textContent = '';
    var spans = text.split(/\s+/).map(function (w, i, arr) {
      var s = document.createElement('span');
      s.className = 'w';
      s.setAttribute('aria-hidden', 'true');
      s.textContent = w;
      scrub.appendChild(s);
      if (i < arr.length - 1) scrub.appendChild(document.createTextNode(' '));
      return s;
    });
    var ticking = false;
    var paint = function () {
      ticking = false;
      var r = scrub.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = (vh * 0.85 - r.top) / (r.height + vh * 0.35);
      p = Math.max(0, Math.min(1, p));
      var on = Math.round(p * spans.length);
      spans.forEach(function (s, i) {
        s.classList.toggle('on', i < on);
      });
    };
    if (reduceMotion) {
      spans.forEach(function (s) {
        s.classList.add('on');
      });
    } else {
      window.addEventListener(
        'scroll',
        function () {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(paint);
          }
        },
        { passive: true },
      );
      paint();
    }
  }

  /* ---------- معاينة المشاريع تتبع المؤشر ---------- */
  var preview = $('[data-work-preview]');
  var list = $('[data-work-list]');
  if (preview && list && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var px = 0,
      py = 0,
      tx = 0,
      ty = 0,
      raf = null;
    var loop = function () {
      px += (tx - px) * 0.18;
      py += (ty - py) * 0.18;
      preview.style.left = px + 'px';
      preview.style.top = py + 'px';
      raf = Math.abs(tx - px) + Math.abs(ty - py) > 0.5 ? requestAnimationFrame(loop) : null;
    };
    list.addEventListener('mousemove', function (e) {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    });
    $$('a[data-preview]', list).forEach(function (a) {
      a.addEventListener('mouseenter', function (e) {
        if (!preview.classList.contains('is-on')) {
          px = tx = e.clientX;
          py = ty = e.clientY;
        }
        preview.setAttribute('data-v', a.getAttribute('data-preview'));
        preview.classList.add('is-on');
      });
    });
    list.addEventListener('mouseleave', function () {
      preview.classList.remove('is-on');
    });
  }

  /* ---------- التبويبات (متاحة بلوحة المفاتيح) ---------- */
  var tablist = $('[data-tabs]');
  if (tablist) {
    var tabs = $$('[role="tab"]', tablist);
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () {
        select(t);
      });
      t.addEventListener('keydown', function (e) {
        // في الاتجاه من اليمين لليسار: السهم الأيسر = التالي
        var dir = e.key === 'ArrowLeft' ? 1 : e.key === 'ArrowRight' ? -1 : 0;
        if (e.key === 'Home') select(tabs[0], true);
        else if (e.key === 'End') select(tabs[tabs.length - 1], true);
        else if (dir) select(tabs[(i + dir + tabs.length) % tabs.length], true);
        else return;
        e.preventDefault();
      });
    });
  }

  /* ---------- آراء العملاء ---------- */
  var quotes = $$('[data-quotes] .quote');
  var qLabel = $('[data-count-label]');
  if (quotes.length) {
    var q = 0;
    var timer = null;
    var show = function (n) {
      quotes[q].classList.remove('is-active');
      q = (n + quotes.length) % quotes.length;
      quotes[q].classList.add('is-active');
      if (qLabel) qLabel.textContent = q + 1 + ' / ' + quotes.length;
    };
    var auto = function () {
      clearInterval(timer);
      if (!reduceMotion)
        timer = setInterval(function () {
          show(q + 1);
        }, 7000);
    };
    var next = $('[data-next]');
    var prev = $('[data-prev]');
    if (next)
      next.addEventListener('click', function () {
        show(q + 1);
        auto();
      });
    if (prev)
      prev.addEventListener('click', function () {
        show(q - 1);
        auto();
      });
    auto();
  }

  /* ---------- النماذج (تحقق محلي — اربطها بالخادم لاحقًا) ---------- */
  var emailOk = function (v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  };
  function handleForm(form, okText) {
    if (!form) return;
    var msg = $('[data-msg]', form);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = null;
      $$('[required]', form).forEach(function (f) {
        var v = f.value.trim();
        var invalid = !v || (f.type === 'email' && !emailOk(v));
        f.classList.toggle('is-invalid', invalid);
        f.setAttribute('aria-invalid', String(invalid));
        if (invalid && !bad) bad = f;
      });
      if (bad) {
        msg.textContent = 'رجاءً أكمل الحقول المطلوبة ببيانات صحيحة.';
        msg.classList.add('is-error');
        bad.focus();
        return;
      }
      msg.classList.remove('is-error');
      msg.textContent = okText;
      form.reset();
    });
  }
  handleForm($('[data-guide-form]'), 'تم! سيصلك الدليل على بريدك قريبًا.');
  handleForm($('[data-contact-form]'), 'شكرًا لك! استلمنا رسالتك وسنتواصل معك خلال يوم عمل.');

  /* ---------- السنة الحالية ---------- */
  var y = $('[data-year]');
  if (y) y.textContent = String(new Date().getFullYear());
})();
