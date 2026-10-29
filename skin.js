/* TengHisob dizayn qatlami. index.html oxirida </body> dan oldin: <script src="skin.js"></script> */
(()=>{
const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
Object.assign(L,{kHome:['Bosh sahifa','Главная'],kMore:['Boshqa','Ещё'],kDeb:['Qarzdorlar','Должники'],kBal:['Umumiy balans','Общий баланс'],kIn:['Kirim','Приход'],kOut:['Chiqim','Расход'],kRec:['So‘nggi operatsiyalar','Последние операции'],kAll:['Barchasi','Все'],kTd:['Bugun','Сегодня'],kWk:['Bu hafta','Неделя'],kMo:['Bu oy','Месяц'],kOp:['Qarzdorlar','Должники'],kPd:['To‘langan','Оплачено'],kLt:['Muddati','Просрочено'],kStart:['Boshlash →','Начать →'],kTag:['Savdo va hisoblar har doim nazoratda','Продажи и расчёты всегда под контролем'],kEase:['Hisobni qulay va oson boshqaring','Управляйте учётом легко и просто'],kSale:['Sotuv','Продажа'],kExp:['Xarajat','Расход'],kCnt:['Jami mahsulot','Всего товаров'],kTv:['Umumiy qiymat','Общая стоимость']});
const P={home:'M3 11l9-8 9 8M5 9.5V20h5v-6h4v6h5V9.5',cart:'M3 4h2.5l2 11h10l2-8H6.5M9 20h.01M17 20h.01',wallet:'M3 7h16a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2zM3 7l2-3h12v3M16 14h2',box:'M12 3L3 7.5v9L12 21l9-4.5v-9zM3 7.5l9 4.5 9-4.5M12 12v9',users:'M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM2 20c0-3.5 3-6 7-6s7 2.5 7 6M17 5a3 3 0 010 6M19 14c2 .6 3 2.5 3 5',chart:'M5 20V12M12 20V5M19 20v-9',dots:'M6 12h.01M12 12h.01M18 12h.01',menu:'M4 7h16M4 12h16M4 17h16',plus:'M12 5v14M5 12h14',back:'M15 5l-7 7 7 7',up:'M7 17L17 7M8 7h9v9',dn:'M17 7L7 17M16 17H7V8',check:'M7 12l4 4 7-8'};
const ic=(n,s=22,c='currentColor')=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${P[n]}"/></svg>`;
const css=`
body.in{padding-bottom:92px}body{background:#f4f6fb}body.dk{background:#0b1224;color:#fff}
header{background:none;box-shadow:none;border-radius:0;color:#14213d;display:flex;align-items:center;gap:8px;padding:max(14px,env(safe-area-inset-top)) 16px 6px}
header:before,header:after,header p,.langbox label{display:none}
header h1{order:2;flex:1;margin:0;text-align:center;font-size:22px;color:#14213d;letter-spacing:-.5px}header h1 i{font-style:normal;color:#2563eb}body.dk header h1{color:#fff}
#mn{order:1;min-height:0;padding:4px;background:none;color:inherit}.langbox{order:3}
.langbox select{min-width:0;min-height:34px;padding:4px 6px;background:#fff;color:#14213d;border:1px solid #e2e4f0}
main{margin:0 auto;padding:0 0 20px;max-width:430px}#app>.card:first-child{margin:8px 16px}
body:not(.in) #mn,body:not(.in) #nv{display:none}
#shop>.stats,#shop>.nav,#shop>h2{display:none}
#hm{margin-bottom:12px}.bc{background:linear-gradient(135deg,#0f1b40,#16254f);color:#fff;border-radius:22px;padding:16px;margin-bottom:14px}.bc small{color:#aab6d8}.bv{font-size:30px;font-weight:800;margin:6px 0 14px}.kr{display:flex;gap:10px}
.kb{flex:1;display:flex;gap:8px;align-items:center;background:#ffffff14;border-radius:14px;padding:10px;font-size:13px}.kb svg{background:#10b981;border-radius:10px;padding:7px;box-sizing:content-box}.kb.o svg{background:#ef4444}.kb small{display:block;color:#34d399}.kb.o small{color:#fb7185}
.tg{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}.tg button{display:flex;align-items:center;gap:10px;background:#fff;border-radius:18px;padding:12px;min-height:0;color:#14213d;font-size:14px;box-shadow:0 2px 10px #1b2a5a14}.tg i{width:44px;height:44px;border-radius:13px;display:grid;place-items:center;color:#fff;flex:none}
.rc{background:#fff;border-radius:18px;padding:14px;box-shadow:0 2px 10px #1b2a5a14}.rc h3{font-size:15px;margin:0 0 6px}.ro{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #edf0f6;font-size:14px}.ro:last-child{border:0}.ro small{display:block;color:#8a94a8}
.page{position:relative;background:none;border:0;box-shadow:none;padding:0 16px 8px}
.page>h2{margin:0 -16px 12px;padding:20px 16px 20px 58px;color:#fff;font-size:20px;background:var(--hb,#5b21b6);border:0;border-radius:0 0 24px 24px}
.bkb,.pl{position:absolute;top:14px;min-height:0;width:38px;height:38px;padding:7px;background:#ffffff26;color:#fff;border-radius:12px;display:grid;place-items:center}.bkb{left:12px}.pl{right:16px}
body[data-pg=shop]{--a:#1e3a8a}body[data-pg=sales]{--hb:linear-gradient(#0a5c45,#0d6b50);--a:#0f9d6e}body[data-pg=products]{--hb:linear-gradient(#3d1a78,#5b21b6);--a:#5b21b6}body[data-pg=debts]{--hb:linear-gradient(#b45309,#d97706);--a:#ea7a0c}body[data-pg=expenses]{--hb:transparent;--a:#ef4444}body[data-pg=reports]{--hb:transparent;--a:#7c6cf5}body[data-pg=payments],body[data-pg=customers]{--hb:linear-gradient(#292650,#5140a9);--a:#7158e2}
.fm:not(.open)>:not(h2):not(.bkb):not(.pl):not(.kx):not([data-s]):not([id$=List]){display:none}
button.secondary[onclick="openPage('shop')"]{display:none}
[data-s]{border-radius:14px;background:#fff;margin:0 0 4px}
.ch{display:flex;gap:8px;overflow-x:auto;padding:8px 0 12px}.ch button{min-height:0;padding:9px 16px;border-radius:20px;background:#fff;color:#8a94a8;border:1px solid #edf0f6;font-size:13px;white-space:nowrap}
.sm{display:flex;gap:12px;background:#fff;border-radius:18px;padding:14px;margin-bottom:12px;box-shadow:0 2px 10px #1b2a5a14}.sm>div{flex:1}.sm small{display:block;color:#8a94a8;font-size:12px}.sm b{font-size:20px}
.item{background:#fff;border:0;border-radius:16px;padding:14px;margin-bottom:10px;box-shadow:0 2px 10px #1b2a5a10}
body.dk .card:not(.page){background:#141c33;border-color:#1f2845}body.dk label,body.dk .item b,body.dk .sm b{color:#fff}
body.dk input,body.dk select,body.dk textarea{background:#161f38;border-color:#232d4d;color:#fff}
body.dk .item,body.dk .sm,body.dk .ch button,body.dk #nv{background:#141c33;box-shadow:none;border-color:#1f2845}body.dk .small,body.dk .sm small{color:#8c97b3}
body.dk .stat{background:#141c33;border-color:#1f2845}body.dk .stat b{color:#fff}
body .ch button.on{background:var(--a);color:#fff;border-color:var(--a)}
#nv{position:fixed;left:50%;transform:translateX(-50%);bottom:0;width:100%;max-width:430px;display:flex;background:#fff;border-top:1px solid #edf0f6;padding:8px 4px calc(8px + env(safe-area-inset-bottom));z-index:20}
#nv button{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;gap:3px;background:none;color:#8a94a8;font-size:10.5px;padding:4px}#nv button.on{color:var(--a);font-weight:700}
#dwr{position:fixed;inset:0;z-index:40;background:#0b122477}#dwr aside{width:78%;height:100%;background:#fff;color:#14213d;padding:calc(env(safe-area-inset-top,0px) + 24px) 16px 20px;overflow-y:auto}
.pf{display:flex;gap:12px;align-items:center;margin-bottom:16px}.pf small{display:block;color:#8a94a8}.av{width:46px;height:46px;border-radius:50%;background:#14224f;color:#fff;display:grid;place-items:center;font-weight:700;font-size:18px}
.mi{display:flex;width:100%;align-items:center;gap:14px;padding:13px 12px;border-radius:12px;background:none;color:#14213d;font-size:15px;min-height:0}.mi.on{background:#e8eefb;color:#1d4ed8}
#sp{position:fixed;inset:0;z-index:50;background:radial-gradient(circle at 50% 38%,#1c2c62,#080e24 70%);color:#fff;display:flex;flex-direction:column;align-items:center;text-align:center;padding:calc(env(safe-area-inset-top,0px) + 56px) 26px 26px}
#sp h1{font-size:46px;margin:8px 0 10px;letter-spacing:-1px}#sp h1 i{font-style:normal;color:#e5b45a}
.il{position:relative;width:250px;height:210px;margin:30px 0 20px}.wl{position:absolute;left:10px;top:50px;width:170px;height:120px;border-radius:18px;background:linear-gradient(145deg,#2b3658,#0d1430);border:1px solid #e5b45a88;transform:rotate(-12deg)}
.rp{position:absolute;left:96px;top:70px;width:92px;height:130px;border-radius:6px;transform:rotate(8deg);background:repeating-linear-gradient(#f4f1ea 0 10px,#cfcabc 10px 11px)}.cn{position:absolute;right:6px;width:66px;height:15px;border-radius:50%;background:linear-gradient(#f6d17a,#c68b2c);box-shadow:0 3px #8a5d14}
#sp .gb{margin-top:auto;width:100%;height:56px;border-radius:28px;background:linear-gradient(90deg,#f0c36a,#d8a043);color:#1a1405;font-size:18px}`;
document.head.insertAdjacentHTML('beforeend','<style>'+css+'</style>');
window.RG={salesList:0,expensesList:0,debtsList:'all'};
const F=['sales','expenses','products','debts','payments'],H={sales:'kSales',expenses:'kExps',products:'products',debts:'kDeb',payments:'payments',reports:'reports',customers:'customers'};
Object.assign(L,{kSales:L.sales,kExps:L.expenses});
const C={sales:[0,1,7,30],expenses:[0,1,7,30],debts:['all','open','paid','late']},CL={sales:['kAll','kTd','kWk','kMo'],expenses:['kAll','kTd','kWk','kMo'],debts:['kAll','kOp','kPd','kLt']};
q('header h1').innerHTML='Teng<i>Hisob</i>';
q('header').insertAdjacentHTML('afterbegin',`<button id="mn" onclick="drw(1)">${ic('menu',26)}</button>`);
document.body.insertAdjacentHTML('beforeend',`<nav id="nv">${[['kHome','home','shop'],['sales','cart','sales'],['expenses','wallet','expenses'],['kMore','dots','']].map(([k,i,g])=>`<button data-g="${g}" onclick="${g?`openPage('${g}')`:'drw(1)'}">${ic(i)}<span data-i="${k}"></span></button>`).join('')}</nav>`);
q('#shop').insertAdjacentHTML('afterbegin','<div id="hm"></div>');
Object.keys(H).forEach(id=>{const p=q('#'+id);p.querySelector('h2').dataset.i=H[id];p.insertAdjacentHTML('afterbegin',`<button class="bkb" onclick="openPage('shop')">${ic('back',24)}</button>`+(F.includes(id)?`<button class="pl" onclick="this.parentNode.classList.toggle('open')">${ic('plus',24)}</button>`:''));if(F.includes(id))p.classList.add('fm')});
Object.keys(C).forEach(id=>q('#'+id+'List').insertAdjacentHTML('beforebegin',`<div class="kx ch" data-l="${id}List">${C[id].map((v,i)=>`<button data-v="${v}" data-i="${CL[id][i]}" onclick="RG['${id}List']=${JSON.stringify(v)};renderAll()"></button>`).join('')}</div><div class="kx sm" id="sm-${id}"></div>`));
q('#productsList').insertAdjacentHTML('beforebegin','<div class="kx sm" id="sm-products"></div>');
document.body.insertAdjacentHTML('beforeend',`<div id="sp"><svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#e5b45a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="${P.check}"/></svg><h1>Teng<i>Hisob</i></h1><div data-i="kTag" style="font-size:19px;max-width:230px;line-height:1.35"></div><div class="il"><div class="wl"></div><div class="rp"></div>${[18,33,48,63,78].map(b=>`<i class="cn" style="bottom:${b}px"></i>`).join('')}</div><button class="gb" data-i="kStart" onclick="this.parentNode.remove()"></button><div data-i="kEase" style="margin-top:16px;font-size:13px;color:#aab3cf"></div></div>`);
const sum=a=>a.reduce((n,x)=>n+x.amount,0);
const card=(l,v)=>`<div><small>${l}</small><b>${v}</b></div>`;
function hm(){
 const h=q('#hm');if(!h||!shop)return;
 const kir=sum(data.sales.filter(x=>x.type!=='qarz'))+sum(data.payments),chi=sum(data.expenses);
 const ops=[...data.sales.map(x=>({n:t('kSale'),d:x.date,a:x.amount,p:1})),...data.expenses.map(x=>({n:t('kExp'),d:x.date,a:x.amount,p:0}))].sort((a,b)=>new Date(b.d)-new Date(a.d)).slice(0,3);
 h.innerHTML=`<div class="bc"><small>${t('kBal')}</small><div class="bv">${money(kir-chi)}</div><div class="kr"><div class="kb">${ic('up',18,'#fff')}<span><small>${t('kIn')}</small><b>${money(kir)}</b></span></div><div class="kb o">${ic('dn',18,'#fff')}<span><small>${t('kOut')}</small><b>${money(chi)}</b></span></div></div></div>
<div class="tg">${[['sales','cart','#10b981','sales'],['expenses','wallet','#ef4444','expenses'],['products','box','#8b5cf6','products'],['kDeb','users','#f59e0b','debts']].map(([k,i,c,g])=>`<button onclick="openPage('${g}')"><i style="background:${c}">${ic(i,24,'#fff')}</i>${t(k==='sales'?'kSales':k==='expenses'?'kExps':k)}</button>`).join('')}</div>
<div class="rc"><h3>${t('kRec')}</h3>${ops.map(o=>`<div class="ro"><div>${o.n}<small>${new Date(o.d).toLocaleString(loc(),{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})}</small></div><b style="color:${o.p?'#10b981':'#ef4444'}">${o.p?'+':'-'} ${money(o.a)}</b></div>`).join('')||`<p class="small">${t('noData')}</p>`}</div>`;
}
function sync(){
 const id=(q('.page:not(.hidden)')||{}).id,on=!!(shop&&!q('#app').classList.contains('hidden')),b=document.body;
 b.classList.toggle('in',on);b.dataset.pg=id||'';b.classList.toggle('dk',id==='expenses'||id==='reports');
 qa('#nv button').forEach(x=>x.classList.toggle('on',x.dataset.g===id));
 qa('.ch').forEach(c=>c.querySelectorAll('button').forEach(x=>x.classList.toggle('on',String(RG[c.dataset.l])===x.dataset.v)));
 const sm=(k,h)=>{const e=q('#sm-'+k);if(e)e.innerHTML=h};
 sm('sales',card(t('totSales'),q('#totalSales').textContent));sm('expenses',card(t('expenses'),q('#totalExpenses').textContent));sm('debts',card(t('debtLeft'),q('#totalDebt').textContent));
 sm('products',card(t('kCnt'),data.products.length)+card(t('kTv'),money(data.products.reduce((n,p)=>n+p.price*p.quantity,0))));
 hm();tr();
}
window.drw=o=>{const d=q('#dwr');if(d)d.remove();if(!o||!shop)return;
 const cur=document.body.dataset.pg;
 document.body.insertAdjacentHTML('beforeend',`<div id="dwr" onclick="if(event.target==this)drw(0)"><aside><div class="pf"><span class="av">${esc((profile.full_name||'N')[0].toUpperCase())}</span><div><b>${esc(profile.full_name||user.email)}</b><small>${t('shopOwner')}</small></div></div>${[['kHome','home','shop'],['kSales','cart','sales'],['kExps','wallet','expenses'],['products','box','products'],['kDeb','users','debts'],['payments','wallet','payments'],['reports','chart','reports'],['customers','users','customers']].map(([k,i,g])=>`<button class="mi ${g===cur?'on':''}" onclick="drw(0);openPage('${g}')">${ic(i)}${t(k)}</button>`).join('')}<button class="mi" onclick="drw(0);logout()">${t('logout')}</button></aside></div>`)};
const oP=openPage;openPage=(...a)=>{oP(...a);sync()};
const oR=renderAll;renderAll=()=>{oR();sync()};
const oL=logout;logout=async()=>{await oL();sync()};
const oList=list;list=(id,items,h)=>{const r=RG[id];if(r!=null){
 if(id==='debtsList'){const td=new Date().toLocaleDateString('sv');items=items.filter(x=>r==='open'?remaining(x)>0:r==='paid'?remaining(x)===0:r==='late'?x.due&&remaining(x)>0&&x.due<td:1)}
 else if(r>0){const f=new Date().setHours(0,0,0,0)-(r-1)*864e5;items=items.filter(x=>new Date(x.date)>=f)}}
 return oList(id,items,h)};
tr();sync();
})();
