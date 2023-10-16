var tag_nav = document.querySelector('.nav');
var tag_toggler = document.querySelector('.header__toggler');
var tag_header = document.querySelector('.header');
var tag_filters = document.querySelectorAll('.filter');
var tag_workboxes = document.querySelectorAll('.workbox');
var scrollChange = 50;

const on__none = (e) => e.classList.add("d_none");
const off__none = (e) => e.classList.remove("d_none");
const on__flex = (e) => e.classList.add("d_flex");
const on__block = (e) => e.classList.add("d_block");
const off__block = (e) => e.classList.remove("d_block");
const on__active = (e) => e.classList.add("active");
const off__active = (e) => e.classList.remove("active");
const on__fixed = (e) => e.classList.add("fixed");
const off__fixed = (e) => e.classList.remove("fixed");
const on__slideInDown = (e) => e.classList.add("animation__slideInDown");
const off__slideInDown = (e) => e.classList.remove("animation__slideInDown");
const on__slideOutUp = (e) => e.classList.add("animation__slideOutUp");
const off__slideOutUp = (e) => e.classList.remove("animation__slideOutUp");

window.addEventListener('scroll', (e) => {
    let scrollpos = window.scrollY;
    if (scrollpos >= scrollChange && !tag_header.classList.contains('fixed')) { on__fixed(tag_header); on__fixed(tag_nav);  }
    else if (scrollpos < scrollChange && tag_header.classList.contains('fixed'))  { off__fixed(tag_header);  off__fixed(tag_nav); }
    else { e.preventDefault(); }
});


tag_toggler.addEventListener('click', (e) => {
    if(tag_nav.classList.contains('d_none')) { on__active(tag_toggler); off__none(tag_nav); on__slideInDown(tag_nav); }
    else if ( tag_nav.classList.contains('animation__slideInDown') ) { off__active(tag_toggler); off__slideInDown(tag_nav); on__slideOutUp(tag_nav); }
    else if (  tag_nav.classList.contains('animation__slideOutUp') ) { on__active(tag_toggler); off__slideOutUp(tag_nav); on__slideInDown(tag_nav); }
});

tag_nav.addEventListener('click', (e) => {
    if(tag_nav.classList.contains('animation__slideInDown')) { off__slideInDown(tag_nav); on__slideOutUp(tag_nav); off__active(tag_toggler); }
    else { e.preventDefault(); }
});

const WorkFilter = (e) => {
    let btn_click = e.target;
    let btn_attr = String(e.target.getAttribute('data-filter-category'));
    let btn_boxes = document.querySelectorAll('[data-box-category=' + btn_attr + ']');
    let btn_active = document.querySelector('.filter.active');

    if( !btn_click.classList.contains('active') && !btn_click.classList.contains('filter_all')) {
        off__active(btn_active); on__active(btn_click);
        tag_workboxes.forEach((workbox) => { off__block(workbox); on__none(workbox); });
        btn_boxes.forEach((btn_box) => { off__none(btn_box); });
    } else if(btn_click.classList.contains('filter_all') && !btn_click.classList.contains('active')) {
        off__active(btn_active); on__active(btn_click);
        tag_workboxes.forEach((workbox) => { off__block(workbox); off__none(workbox); on__block(workbox); });
    } else { e.preventDefault(); }

};
for (let tag_filter of tag_filters) { tag_filter.addEventListener('click', WorkFilter); }

window.onload = function () {
    var form = document.getElementById("form__contact");
    var pristine = new Pristine(form);
    form.addEventListener('submit', function (e) {
       e.preventDefault();
       var valid = pristine.validate();
    });
};