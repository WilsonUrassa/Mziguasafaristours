(function () {
  var c = window.MZ || {};
  if (!c.url || !c.key || !window.supabase) return;
  var sb = supabase.createClient(c.url, c.key, { auth: { persistSession: false } });
  sb.from("site_images").select("slot,path").then(function (r) {
    if (r.error || !r.data || !r.data.length) return;
    r.data.forEach(function (x) { IMG[x.slot] = x.path; });
    document.querySelectorAll(".im[aria-label]").forEach(function (e) {
      var u = IMG[e.getAttribute("aria-label")] || IMG[e.getAttribute("data-fb")];
      if (u) { e.style.backgroundImage = "url(" + u + ")"; var sp = e.querySelector("span"); if (sp) sp.remove(); }
    });
    document.querySelectorAll(".ph").forEach(function (e) {
      var k = "card-" + e.getAttribute("aria-label").toLowerCase().replace(/[^a-z]+/g, "-");
      if (IMG[k]) { e.style.background = "url(" + IMG[k] + ") center/cover"; e.textContent = ""; }
    });
    if (IMG.hero) { var h = document.querySelector(".hero"); h.classList.add("hasimg"); h.style.background = "linear-gradient(180deg,#00000066,#00000022 55%,#00000099),url(" + IMG.hero + ") center 50%/cover"; }
    if (IMG.logo) { var l = document.querySelector(".brand svg, .brand img"); if (l) { if (l.tagName == "IMG") l.src = IMG.logo; else l.outerHTML = '<img src="' + IMG.logo + '" width="46" height="46" alt="" style="border-radius:50%;object-fit:cover">'; } var ic = document.querySelector('link[rel=icon]'); if (ic) ic.href = IMG.logo; }
    if (IMG.whatsapp) document.getElementById("wafab").innerHTML = '<img src="' + IMG.whatsapp + '" width="58" height="58" alt="" style="border-radius:50%">';
    if (/^#pkg-/.test(location.hash) && typeof view == "function") view();
  });
})();
