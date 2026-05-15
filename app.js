let siswa=[];
let guru=[];
let presensi=[];

async function loadData(){

const res = await fetch(CONFIG.WEB_APP_URL);
const data = await res.json();

siswa = data.siswa;
guru = data.guru;

loadGuru();
loadKelas();
cekUltah();
}

function loadGuru(){

let html='';

 guru.forEach(g=>{
 html += `
 <option value="${g.nama}">
 ${g.nama}
 </option>`;
 });

 document.getElementById('guru').innerHTML = html;
}

function loadKelas(){

const kelas = [...new Set(
siswa.map(x=>x.kelas)
)];

let html='';

kelas.forEach(k=>{
html += `<option>${k}</option>`;
});

const select =
document.getElementById('kelas');

select.innerHTML = html;

showStudents();

select.addEventListener(
'change',
showStudents
);
}

function showStudents(){

const kelas =
document.getElementById('kelas').value;

const filtered = siswa.filter(
x=>x.kelas==kelas
);

let html='';

filtered.forEach((s,index)=>{

html += `
<div class="student">

<div>
${s.no}. ${s.nama}
</div>

<div class="status-group">

<button class="status-btn s"
onclick="setStatus(${index},'S')">
S
</button>

<button class="status-btn i"
onclick="setStatus(${index},'I')">
I
</button>

<button class="status-btn a"
onclick="setStatus(${index},'A')">
A
</button>

<button class="status-btn d"
onclick="setStatus(${index},'D')">
D
</button>

</div>
</div>
`;
});

 document.getElementById(
 'siswaContainer'
 ).innerHTML = html;
}

function setStatus(index,status){

const kelas =
document.getElementById('kelas').value;

const filtered = siswa.filter(
x=>x.kelas==kelas
);

const selected = filtered[index];

const existing = presensi.find(
p=>p.nama==selected.nama
);

if(existing){
existing.status=status;
}else{
presensi.push({
kelas,
nama:selected.nama,
status
});
}
}

async function kirimPresensi(){

const payload = {
action:'presensi',
guru:
document.getElementById('guru').value,
pin:
document.getElementById('pin').value,
waktu:new Date().toISOString(),
data:presensi
};

await fetch(CONFIG.WEB_APP_URL,{
method:'POST',
body:JSON.stringify(payload)
});

alert('Presensi berhasil dikirim');

sendWhatsapp();
}

async function revisiPresensi(){

const payload = {
action:'revisi',
guru:
document.getElementById('guru').value,
data:presensi,
waktu:new Date().toISOString()
};

await fetch(CONFIG.WEB_APP_URL,{
method:'POST',
body:JSON.stringify(payload)
});

alert('Revisi berhasil dikirim');
}

function sendWhatsapp(){

let text =
'Presensi Kehadiran SMKN 1 Sanden%0A%0A';

presensi.forEach((p,i)=>{
text +=
`${i+1}. ${p.nama} /${p.status}%0A`;
});

window.open(
`https://wa.me/?text=${text}`
);
}

function cekUltah(){

const hariIni = new Date();
const bulan = hariIni.getMonth()+1;
const tanggal = hariIni.getDate();

let html='';

siswa.forEach(s=>{

const tgl = new Date(s.lahir);

if(
tgl.getDate()==tanggal &&
(tgl.getMonth()+1)==bulan
){
html += `
<div class="card">
🎉 Selamat ulang tahun
${s.nama}
</div>`;
}
});

 document.getElementById(
 'birthday'
 ).innerHTML = html;
}

loadData();
