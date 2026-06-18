<?php
function hitungLuasPersegiPanjang($panjang, $lebar) {
    $luas = $panjang * $lebar;
    return $luas;
}

echo "Luas 5 x 3 = " . hitungLuasPersegiPanjang(5, 3) . "<br>";
echo "Luas 10 x 7 = " . hitungLuasPersegiPanjang(10, 7) . "<br>";
?>