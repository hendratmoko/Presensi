async function loginAdmin(){

const u =
document.getElementById('username').value;

const p =
document.getElementById('password').value;

if(
u==CONFIG.ADMIN.username &&
p==CONFIG.ADMIN.password
){

 document.getElementById(
 'dashboard'
 ).style.display='block';

 loadLaporan();
 loadGrafik();

}else{
 alert('Login gagal');
}
}

async function loadLaporan(){

const res = await fetch(
CONFIG.WEB_APP_URL+
'?action=laporan'
);

const data = await res.json();

let html='';

 data.harian.forEach((d,i)=>{
 html += `
 ${i+1}. ${d.nama} /${d.status}<br>`;
 });

 document.getElementById(
 'laporan'
 ).innerHTML = html;
}

function loadGrafik(){

const ctx =
document.getElementById('grafik');

new Chart(ctx,{
 type:'bar',
 data:{
 labels:['S','I','A','D'],
 datasets:[{
 label:'Jumlah',
 data:[5,2,1,4]
 }]
 }
});
}
