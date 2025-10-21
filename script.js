 // ELEMENTOS
 const gallery = document.getElementById('gallery')
 const filters = document.getElementById('filters')
 const search = document.getElementById('search')
 const overlay = document.getElementById('overlay')
 const lightboxImg = document.getElementById('lightbox-img')
 const lightboxCaption = document.getElementById('lightbox-caption')
 const closeBtn = document.getElementById('closeBtn')

 // Abrir lightbox al click en imagen
 gallery.addEventListener('click', e => {
   const card = e.target.closest('.card')
   if(!card) return
   const img = card.querySelector('img')
   openLightbox(img.src, card.dataset.title || img.alt)
 })

 // Filtrar por botones
 filters.addEventListener('click', e => {
   const btn = e.target.closest('button')
   if(!btn) return
   Array.from(filters.querySelectorAll('.btn')).forEach(b=>b.classList.remove('active'))
   btn.classList.add('active')
   applyFilters()
 })

 // Búsqueda en vivo
 search.addEventListener('input', applyFilters)

 // Función que aplica filtros y búsqueda
 function applyFilters(){
   const active = filters.querySelector('.btn.active')?.dataset.filter || 'all'
   const q = search.value.trim().toLowerCase()

   // Galería
   Array.from(gallery.children).forEach(card=>{
     const tags = (card.dataset.tags||'').toLowerCase()
     const title = (card.dataset.title||'').toLowerCase()
     const matchesFilter = active === 'all' || tags.includes(active)
     const matchesQuery = q === '' || title.includes(q) || tags.includes(q)
     card.style.display = (matchesFilter && matchesQuery) ? '' : 'none'
   })

   // Portfolio projects
   const projects = document.querySelectorAll('#portfolio-items .project')
   projects.forEach(p=>{
     const tags = (p.dataset.tags||'').toLowerCase()
     const title = (p.dataset.title||'').toLowerCase()
     const matchesFilter = active === 'all' || tags.includes(active)
     const matchesQuery = q === '' || title.includes(q) || tags.includes(q)
     p.style.display = (matchesFilter && matchesQuery) ? '' : 'none'
   })
 }

 // Lightbox controls
 function openLightbox(src, caption){
   lightboxImg.src = src
   lightboxCaption.textContent = caption || ''
   overlay.classList.remove('hidden')
   overlay.classList.add('open')
   overlay.setAttribute('aria-hidden','false')
 }
 function closeLightbox(){
   overlay.classList.remove('open')
   overlay.classList.add('hidden')
   overlay.setAttribute('aria-hidden','true')
   lightboxImg.src = ''
 }
 closeBtn.addEventListener('click', closeLightbox)
 overlay.addEventListener('click', e => { if(e.target === overlay) closeLightbox() })
 document.addEventListener('keydown', e=>{ if(e.key === 'Escape') closeLightbox() })

 // Botones "Ver" en proyectos (muestra un modal con detalle simple)
 document.getElementById('portfolio-items').addEventListener('click', e=>{
   const btn = e.target.closest('[data-action="view-project"]')
   if(!btn) return
   const project = btn.closest('.project')
   const img = project.querySelector('img')
   const title = project.dataset.title || project.querySelector('h3').textContent
   openLightbox(img.src, title + ' — ' + project.querySelector('p').textContent)
 })

 // Inicial
 applyFilters()