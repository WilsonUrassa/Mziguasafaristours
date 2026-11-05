(function () {
  var c = window.MZ || {};
  var fallbackLogo = "images/mzigua-logo.jpg";
  if (!window.IMG) window.IMG = {};
  if (!IMG.logo) IMG.logo = fallbackLogo;
  function apply() {
    document.querySelectorAll(".im[aria-label]").forEach(function (e) {
      var u = IMG[e.getAttribute("aria-label")];
      if (u) { e.style.backgroundImage = "url(" + u + ")"; var sp = e.querySelector("span"); if (sp) sp.remove(); }
    });
    document.querySelectorAll(".ph").forEach(function (e) {
      var k = "card-" + e.getAttribute("aria-label").toLowerCase().replace(/[^a-z]+/g, "-");
      if (IMG[k]) { e.style.background = "url(" + IMG[k] + ") center/cover"; e.textContent = ""; }
    });
    if (IMG.hero) { var h = document.querySelector(".hero"); h.classList.add("hasimg"); h.style.background = "linear-gradient(180deg,#00000066,#00000022 55%,#00000099),url(" + IMG.hero + ") center 50%/cover"; }
    // The primary brand logo is a local public asset. Do not let a stale/broken
    // Supabase site_images record replace it.
    var brandLogo = document.querySelector(".brand img");
    if (brandLogo) {
      brandLogo.src = "/images/mzigua-logo.jpg?v=3";
      brandLogo.onerror = function () {
        this.onerror = null;
        this.src = "/images/mzigua-logo.jpg";
      };
    }
    if (IMG.whatsapp) document.getElementById("wafab").innerHTML = '<img src="' + IMG.whatsapp + '" width="58" height="58" alt="" style="border-radius:50%">';
  }
  apply();
  if (!c.url || !c.key || !window.supabase) return;
  var sb = supabase.createClient(c.url, c.key, { auth: { persistSession: false } });
  sb.from("site_images").select("slot,path").then(function (r) {
    if (r.error || !r.data) return;
    r.data.forEach(function (x) { if (x.slot !== "logo") IMG[x.slot] = x.path; });
    apply();
    if (/^#pkg-/.test(location.hash) && typeof view == "function") view();
  });
})();