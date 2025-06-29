import{a as f,S as h,i as a}from"./assets/vendor-Dy2ZTtfi.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const g="51014016-712075211dd4ddd9d92f84ca4",v="https://pixabay.com/api/",L=15;class w{constructor(){this.query="",this.page=1}async getImagesByQuery(){const o={key:g,q:this.query,image_type:"photo",orientation:"horizontal",safesearch:!0,page:this.page,per_page:L},e=await f.get(v,{params:o});return this.page+=1,e.data}setQuery(o){this.query=o,this.page=1}}const u=document.querySelector(".gallery");document.querySelector(".loader");document.querySelector(".load-more");const q=new h(".gallery a");function m(t){const o=t.map(e=>`
    <li class="gallery-item">
        <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" width="360"/>
        </a>
        <div class="info">
            <div class="statistic-info">  
                <p class="statistic-item-name">Likes</p>
                <p class="statistic-item-value">${e.likes}</p>
            </div>
            <div class="statistic-info">
                <p class="statistic-item-name">Views</p>
                <p class="statistic-item-value">${e.views}</p>
            </div>
            <div class="statistic-info">
                <p class="statistic-item-name">Comments</p>
                <p class="statistic-item-value">${e.comments}</p>
            </div>
            <div class="statistic-info">
                <p class="statistic-item-name">Downloads</p>
                <p class="statistic-item-value">${e.downloads}</p>
            </div>
        </div>
    </li>`).join("");u.insertAdjacentHTML("beforeend",o),q.refresh()}function b(){u.innerHTML=""}function c(){const t=document.querySelector(".load-more");console.log("Hiding button:",t),t.classList.add("hidden")}function S(){document.querySelector(".load-more").classList.remove("hidden")}function p(){document.querySelector(".loader").classList.remove("hidden")}function y(){document.querySelector(".loader").classList.add("hidden")}const d=document.querySelector(".form"),P=document.querySelector(".load-more");c();const n=new w;d.addEventListener("submit",async t=>{t.preventDefault();const e=d.elements["search-text"].value.trim();if(!e){a.warning({title:"Warning",message:"Please enter a search term.",position:"topRight"});return}n.setQuery(e),b(),c(),p();try{const i=await n.getImagesByQuery();if(i.hits.length===0){a.info({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}m(i.hits),(n.page-1)*15<i.totalHits?S():(c(),a.info({title:"End of results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{a.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}finally{y()}});P.addEventListener("click",async()=>{p();try{const t=await n.getImagesByQuery();m(t.hits);const o=document.querySelector(".gallery-item");if(o){const{height:e}=o.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}(n.page-1)*15>=t.totalHits&&(c(),a.info({title:"End of results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{a.error({title:"Error",message:"Could not load more images.",position:"topRight"})}finally{y()}});
//# sourceMappingURL=index.js.map
