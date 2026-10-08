const rates={buy:7350,sell:7300};
const usd=document.querySelector('#usd'),type=document.querySelector('#type'),result=document.querySelector('#result');
let cash=82450000;
const money=value=>'₲ '+Math.round(value).toLocaleString('es-PY');
function calc(){
 const amount=Number(usd.value||0), value=amount*rates[type.value];
 result.textContent=amount>0?(type.value==='buy'?'Vas a pagar ':'Vas a recibir ')+money(value):'Ingresá un monto válido';
 return {amount,value};
}
document.querySelector('#calculate').addEventListener('click',calc);
usd.addEventListener('input',calc); type.addEventListener('change',calc);
document.querySelector('#register').addEventListener('click',()=>{
 const {amount,value}=calc(); if(!amount||amount<=0)return;
 const action=type.value==='buy'?'Compra USD':'Venta USD';
 const row=document.createElement('div'); row.className='row';
 row.innerHTML='<span>'+action+' · Operación demo</span><b>USD '+amount.toLocaleString('es-PY')+'</b>';
 document.querySelector('#operations').prepend(row);
 cash+=type.value==='buy'?-value:value;
 document.querySelector('#cash').textContent=money(cash);
 document.querySelector('#cash-status').textContent='Operación demo registrada · Caja actualizada';
 result.textContent='Operación registrada en la demo: '+money(value);
});
document.querySelectorAll('[data-view]').forEach(item=>item.addEventListener('click',()=>{
 document.querySelectorAll('[data-view]').forEach(link=>link.classList.remove('active'));item.classList.add('active');
 document.querySelector('#page-title').textContent=item.dataset.view==='Operaciones'?'Operá con precisión.':item.dataset.view;
 document.querySelector('#page-subtitle').textContent='Módulo de '+item.dataset.view.toLowerCase()+' · Datos de demostración';
}));
calc();