(function () {
  var c = window.MZ || {};
  if (!c.url || !c.key || !window.supabase) return; /* not configured: booking form falls back to email */
  var sb = supabase.createClient(c.url, c.key), sid;
  try { sid = sessionStorage.getItem("mz_sid"); if (!sid) { sid = Math.random().toString(36).slice(2) + Date.now().toString(36); sessionStorage.setItem("mz_sid", sid); } } catch (e) { sid = null; }
  function hit() {
    sb.from("page_views").insert({
      path: location.pathname + location.hash, referrer: document.referrer || null,
      device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
      language: navigator.language, screen: screen.width + "x" + screen.height, session_id: sid
    }).then(function () {});
  }
  hit(); addEventListener("hashchange", hit);
  var f = document.getElementById("bf"); if (!f) return;
  f.addEventListener("submit", function (e) {
    e.preventDefault(); e.stopImmediatePropagation();
    var b = f.querySelector("button"), n = document.getElementById("bn"); b.disabled = true;
    sb.from("bookings").insert({
      name: f.n.value, email: f.e.value, package: f.p.value, start_date: f.d.value || null,
      people: +f.g.value || 1, message: f.m.value, session_id: sid
    }).then(function (r) {
      b.disabled = false;
      if (r.error) n.textContent = "Sorry, something went wrong. Please email or WhatsApp us.";
      else { n.textContent = "Thank you! We received your request and will reply within 24 hours."; f.reset(); }
    });
  }, true);
})();
