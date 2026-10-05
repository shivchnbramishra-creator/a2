(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
  // Seasonal produce (shun) by month
  var SH={1:['January',['Daikon','Napa cabbage','Citrus','Leeks']],2:['February',['Spinach','Turnips','Shiitake','Cabbage']],3:['March',['Spring onions','Peas','Broccoli','Watercress']],
    4:['April',['Asparagus','Fresh peas','Spring cabbage','Radishes']],5:['May',['Broad beans','New potatoes','Snap peas','Herbs']],6:['June',['Courgettes','Edamame','Cucumbers','Cherries']],
    7:['July',['Edamame','Sweetcorn','Aubergine','Tomatoes']],8:['August',['Sweetcorn','Edamame','Okra','Peppers']],9:['September',['Aubergine','Sweet potato','Mushrooms','Pears']],
    10:['October',['Mushrooms','Squash','Sweet potato','Apples']],11:['November',['Squash','Leeks','Turnips','Persimmons']],12:['December',['Daikon','Kale','Citrus','Brussels sprouts']]};
  var s=SH[new Date().getMonth()+1],sh=document.getElementById('shun');
  if(sh){sh.querySelector('.mm').textContent=s[0];sh.querySelector('ul').innerHTML=s[1].map(function(x){return '<li>'+x+'</li>';}).join('');}
  // Grill guide
  var G={eda:['Edamame in the pod','high','4–6 min','Grill basket or foil tray','Toss pods with oil and salt, grill until blistered, then finish with flaky salt and a squeeze of lime.'],
    corn:['Sweetcorn','med','10–15 min','Direct, turning often','Brush with butter or oil and soy as the kernels char; turn every couple of minutes so it colours evenly.'],
    shii:['Shiitake mushrooms','med','5–7 min','Skewered or in a basket','Grill gill-side down first, then brush with a soy and honey glaze for the final minute.'],
    aub:['Aubergine','low','15–20 min','Whole or halved','Grill whole over gentle heat until collapsed and smoky, then peel and dress with ginger and soy.'],
    tofu:['Firm tofu','med','6–8 min','Pressed slabs on an oiled grate','Press out moisture first, oil well and only turn once a crust forms so it releases cleanly.'],
    salmon:['Salmon fillet','med','8–10 min','Skin-side down, lid on','Start skin-side down and don’t move it; cook until the thickest part reaches 63°C (145°F).']};
  var gb=document.querySelectorAll('[data-g]');
  function grill(k){var g=G[k];document.getElementById('g-name').textContent=g[0];document.getElementById('g-time').textContent=g[2];document.getElementById('g-how').textContent=g[3];document.getElementById('g-tip').textContent=g[4];
    document.querySelectorAll('.zones div').forEach(function(z){z.classList.toggle('on',z.dataset.z===g[1]);});
    gb.forEach(function(x){x.setAttribute('aria-pressed',x.dataset.g===k?'true':'false');});}
  gb.forEach(function(x){x.addEventListener('click',function(){grill(x.dataset.g);});});
  if(gb.length)grill('eda');
  // Bowl builder: [umami, salty, sweet, acidity, freshness]
  var F={rice:[1,0,2,0,0],soba:[1,1,1,0,1],greens:[0,0,0,0,3],
    tofu:[2,0,0,0,0],salmon:[3,1,1,0,0],edamame:[2,0,1,0,2],egg:[2,1,0,0,0],
    miso:[4,3,2,0,0],ponzu:[1,2,1,4,2],sesame:[2,1,3,1,0],ginger:[1,2,1,2,3]};
  var NM={rice:'rice',soba:'soba',greens:'leafy greens',tofu:'grilled tofu',salmon:'charred salmon',edamame:'edamame',egg:'soft egg',miso:'miso glaze',ponzu:'citrus ponzu',sesame:'sesame dressing',ginger:'ginger-scallion sauce'};
  var bf=document.getElementById('bowlf');
  function bowl(){if(!bf)return;var base=bf.querySelector('[name=base]:checked').value,pro=bf.querySelector('[name=pro]:checked').value,sau=bf.querySelector('[name=sauce]:checked').value,tops=[].slice.call(bf.querySelectorAll('[name=top]:checked')).map(function(x){return x.value;});
    var t=[0,0,0,0,0];[base,pro,sau].forEach(function(k){F[k].forEach(function(v,i){t[i]+=v;});});
    tops.forEach(function(k){if(k==='nori'){t[0]+=1;t[1]+=1;}if(k==='pickle'){t[3]+=2;t[4]+=1;}if(k==='scallion'){t[4]+=2;}if(k==='chili'){t[1]+=1;t[4]+=1;}});
    document.getElementById('b-name').textContent=NM[pro].charAt(0).toUpperCase()+NM[pro].slice(1)+' & '+NM[base]+' with '+NM[sau];
    var lab=['u','s','w','a','f'];lab.forEach(function(l,i){var el=document.querySelector('.fbar[data-f='+l+'] i');if(el)el.style.width=Math.min(100,t[i]*13)+'%';});
    var low=t[3]<2?'Add pickles or a squeeze of citrus to brighten it.':t[4]<3?'Scatter over scallions or fresh greens for crunch and freshness.':t[0]>7?'Big on umami — a few quick pickles will balance the richness.':'Nicely balanced. Finish with toasted sesame seeds.';
    document.getElementById('b-tip').textContent=low;}
  if(bf){bf.addEventListener('change',bowl);bowl();}
  // Contact form -> email app
  var cf=document.getElementById('cform');
  if(cf)cf.addEventListener('submit',function(ev){ev.preventDefault();if(cf.website.value)return;
    var body='Name: '+cf.name.value+'\nEmail: '+cf.email.value+'\nTopic: '+cf.topic.value+'\n\n'+cf.message.value;
    window.location.href='mailto:'+cf.dataset.to+'?subject='+encodeURIComponent('Website enquiry: '+cf.topic.value)+'&body='+encodeURIComponent(body);
    var s=document.getElementById('fm');s.hidden=false;s.textContent='Your email app should now open with your message ready to send. If it doesn’t, please email us directly at '+cf.dataset.to+'.';});
  // Cookie
  var c=document.getElementById('cookie'),v=null;try{v=localStorage.getItem('ec_cookie');}catch(e){}
  if(c&&!v)c.classList.add('show');
  document.querySelectorAll('[data-cookie]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('ec_cookie',x.dataset.cookie);}catch(e){}c.classList.remove('show');});});
  var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();
