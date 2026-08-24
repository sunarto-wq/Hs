const CACHE='catatan-keuangan-cache-v3';
const ASSETS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
let pendingData = null; // Menyimpan data sementara jika tertahan limit

// Fungsi khusus untuk mengeksekusi penyimpanan
function eksekusiSimpan(trx) {
  data.push(trx);
  simpan();
  $('form').reset();
  $('tanggal').value = hariIni();
  render();
}

// Logika baru saat form disubmit
$('form').addEventListener('submit', e => {
  e.preventDefault(); 
  const jumlah = Number($('jumlah').value);
  const jenis = $('jenis').value;
  const trx = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    tanggal: $('tanggal').value,
    jenis,
    kategori: $('kategori').value,
    jumlah,
    keterangan: $('keterangan').value.trim()
  };

  if (jenis === 'pengeluaran') {
    const p = periode();
    const mw = limits.mingguan > 0 && p.minggu + jumlah > limits.mingguan;
    const mb = limits.bulanan > 0 && p.bulanan + jumlah > limits.bulanan;
    
    // Jika melewati limit, tampilkan modal
    if (mw || mb) {
      const jenisLimit = mw && mb ? 'MINGGUAN DAN BULANAN' : (mw ? 'MINGGUAN' : 'BULANAN');
      $('modalPesan').textContent = `PERINGATAN ANDA TELAH MENCAPAI LIMIT ${jenisLimit}`;
      $('modalLimit').classList.add('active');
      pendingData = trx; // Simpan transaksi ke memori sementara
      return; // Hentikan proses simpan sementara
    }
  }
  
  // Jika aman dan tidak lewat limit, langsung simpan
  eksekusiSimpan(trx);
});

// Aksi untuk tombol Batal di pop-up
$('btnBatal').addEventListener('click', () => {
  $('modalLimit').classList.remove('active');
  pendingData = null; // Hapus transaksi dari memori
});

// Aksi untuk tombol Lanjutkan di pop-up
$('btnLanjut').addEventListener('click', () => {
  if (pendingData) {
    eksekusiSimpan(pendingData);
    $('modalLimit').classList.remove('active');
    pendingData = null;
  }
});
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match('./index.html'))));
});
