const modal=document.querySelector('#modal');
const money=value=>'₲ '+Math.round(value).toLocaleString('es-PY');
let totals={sales:48200000,profit:16830000,commission:2410000};
const saleButton=document.querySelector('#sale');
const saveButton=document.querySelector('#save');
const cancelButton=document.querySelector('#cancel');
const customer=document.querySelector('#customer');
const saleInput=document.querySelector('#sale-total-input');
const movements=document.querySelector('#movements');
const status=document.querySelector('#status');
const inventoryButton=document.querySelector('#inventory-btn');
const inventoryBody=document.querySelector('#inventory-body');
saleButton.addEventListener('click',()=>modal.classList.add('open'));
cancelButton.addEventListener('click',()=>modal.classList.remove('open'));
modal.addEventListener('click',event=>{if(event.target===modal) modal.classList.remove('open')});
function renderTotals(){
  document.querySelector('#sales-total').textContent=money(totals.sales);
  document.querySelector('#profit-total').textContent=money(totals.profit);
  document.querySelector('#commission-total').textContent=money(totals.commission);
}
saveButton.addEventListener('click',()=>{
  const amount=Number(saleInput.value);
  const name=customer.value.trim();
  if(!name||!Number.isFinite(amount)||amount<=0){status.textContent='Completá cliente y total válido';return}
  totals.sales+=amount; totals.profit+=amount*.349; totals.commission+=amount*.05; renderTotals();
  const row=document.createElement('tr');
  row.innerHTML='<td>'+name.replace(/[<>&]/g,'')+'</td><td>Tienda online</td><td>'+money(amount)+'</td>';
  movements.prepend(row);
  status.textContent='Venta registrada';
  modal.classList.remove('open'); customer.value=''; saleInput.value='';
});
let expanded=false;
inventoryButton.addEventListener('click',()=>{
 expanded=!expanded;
 inventoryButton.textContent=expanded?'Ver críticos':'Ver inventario';
 inventoryBody.innerHTML=expanded
 ?'<tr><td>Monitor 24”</td><td>3</td><td><span class="badge">Reponer</span></td></tr><tr><td>Teclado mecánico</td><td>5</td><td><span class="badge">Reponer</span></td></tr><tr><td>Mouse inalámbrico</td><td>12</td><td><span class="badge">Correcto</span></td></tr><tr><td>Webcam HD</td><td>18</td><td><span class="badge">Correcto</span></td></tr><tr><td>Hub USB-C</td><td>24</td><td><span class="badge">Correcto</span></td></tr>'
 :'<tr><td>Monitor 24”</td><td>3</td><td><span class="badge">Reponer</span></td></tr><tr><td>Teclado mecánico</td><td>5</td><td><span class="badge">Reponer</span></td></tr><tr><td>Mouse inalámbrico</td><td>12</td><td><span class="badge">Correcto</span></td></tr>';
});
document.querySelectorAll('[data-view]').forEach(item=>item.addEventListener('click',()=>{
 document.querySelectorAll('[data-view]').forEach(link=>link.classList.remove('active')); item.classList.add('active');
 document.querySelector('#page-title').textContent=item.dataset.view==='Dashboard'?'Todo tu negocio, conectado.':item.dataset.view;
 document.querySelector('#page-subtitle').textContent='Vista de '+item.dataset.view.toLowerCase()+' · Datos de demostración';
}));