const cityPicker=document.querySelector('#city-picker');
const cities={
  asuncion:{name:'Asunción',temp:29,feels:32,condition:'Parcialmente nublado',humidity:'68%',wind:'14 km/h',icon:'☀',hours:[29,31,32,33,32,29,26],week:[['Hoy','⛅',21,33],['Mañana','☀',20,34],['Viernes','🌦',19,28],['Sábado','⛅',18,26],['Domingo','☀',19,30],['Lunes','🌧',20,25],['Martes','🌤',19,29]]},
  'san-lorenzo':{name:'San Lorenzo',temp:27,feels:29,condition:'Nublado con claros',humidity:'74%',wind:'11 km/h',icon:'⛅',hours:[27,28,29,29,28,26,23],week:[['Hoy','⛅',20,29],['Mañana','🌦',19,27],['Viernes','🌧',18,25],['Sábado','⛅',17,27],['Domingo','☀',18,30],['Lunes','🌤',19,29],['Martes','☀',20,31]]},
  luque:{name:'Luque',temp:28,feels:30,condition:'Soleado',humidity:'61%',wind:'17 km/h',icon:'☀',hours:[28,30,32,33,31,28,25],week:[['Hoy','☀',20,33],['Mañana','☀',20,34],['Viernes','🌤',19,30],['Sábado','⛅',18,27],['Domingo','☀',19,31],['Lunes','🌦',20,28],['Martes','☀',19,30]]},
  encarnacion:{name:'Encarnación',temp:25,feels:26,condition:'Lluvias aisladas',humidity:'82%',wind:'19 km/h',icon:'🌦',hours:[25,26,26,25,24,22,20],week:[['Hoy','🌦',18,26],['Mañana','🌧',17,24],['Viernes','⛅',16,25],['Sábado','☀',16,28],['Domingo','☀',17,29],['Lunes','🌤',18,27],['Martes','🌦',17,25]]},
  'ciudad-del-este':{name:'Ciudad del Este',temp:26,feels:28,condition:'Tormentas cercanas',humidity:'79%',wind:'16 km/h',icon:'🌩',hours:[26,27,28,27,25,24,22],week:[['Hoy','🌩',19,28],['Mañana','🌧',18,25],['Viernes','⛅',18,27],['Sábado','🌤',18,29],['Domingo','☀',19,30],['Lunes','🌦',19,27],['Martes','⛅',18,28]]}
};
let selected='asuncion',fahrenheit=false;
const celsius=value=>fahrenheit?Math.round(value*9/5+32):value;
const showTemp=value=>celsius(value)+'°';
function render(){
 const data=cities[selected];
 document.querySelector('.eyebrow').textContent=data.name.toUpperCase()+', PARAGUAY · AHORA';
 temp.textContent=celsius(data.temp); feels.textContent=showTemp(data.feels);
 condition.textContent=data.condition; humidity.textContent=data.humidity; wind.textContent=data.wind;
 document.querySelector('.sun').textContent=data.icon;
 hours.innerHTML=data.hours.map((value,index)=>'<div class="hour">'+(index?' '+(12+index)+':00':'Ahora')+'<i>'+data.icon+'</i><b>'+showTemp(value)+'</b></div>').join('');
 week.innerHTML=data.week.map(day=>'<div class="day"><b>'+day[0]+'</b><i>'+day[1]+'</i><span class="range"></span><span>'+showTemp(day[2])+'</span><b>'+showTemp(day[3])+'</b></div>').join('');
}
unit.addEventListener('click',()=>{fahrenheit=!fahrenheit;unit.textContent=fahrenheit?'°F':'°C';render()});
city.addEventListener('click',()=>{const open=cityPicker.hasAttribute('hidden');cityPicker.toggleAttribute('hidden',!open);city.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('[data-city]').forEach(button=>button.addEventListener('click',()=>{selected=button.dataset.city;cityPicker.setAttribute('hidden','');city.setAttribute('aria-expanded','false');render()}));
place.addEventListener('click',()=>{selected='asuncion';render();place.textContent='⌖ Asunción activa';setTimeout(()=>place.textContent='⌖ Mi ubicación',1600)});
render();