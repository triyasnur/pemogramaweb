<?php
function hitungDiskon($hargaAwal, $persenDiskon) {
    $potongan = $hargaAwal * ($persenDiskon / 100);
    
    $hargaAkhir = $hargaAwal - $potongan;
    
    return $hargaAkhir;
}
$hargaSetelahDiskon = "";

if (isset($_POST['hitung'])) {
    $harga = $_POST['harga'];
    $diskon = $_POST['diskon'];
    
    $hargaSetelahDiskon = hitungDiskon($harga, $diskon);
}
?>
<form method="post">
    <label>Harga Awal (Rp):</label>
    <input type="number" name="harga" required><br><br>

    <label>Diskon (%):</label>
    <input type="number" name="diskon" required><br><br>

    <button type="submit" name="hitung">Hitung Harga Setelah Diskon</button>
</form>

<?php
if ($hargaSetelahDiskon !== "") {
    echo "<h3>Harga Setelah Diskon: Rp " . number_format($hargaSetelahDiskon, 0, ',', '.') . "</h3>";
}
?>