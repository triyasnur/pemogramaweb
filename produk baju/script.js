const steps = {
    1: { 
        icon: "fa-shirt", 
        title: "Pilih Gaya Kamu", 
        desc: "Jelajahi koleksi kami yang beragam. Pilih kategori, ukuran, dan warna yang mencerminkan kepribadianmu di season 2026 ini." 
    },

    2: { 
        icon: "fa-credit-card", 
        title: "Pembayaran Instan", 
        desc: "Nikmati kemudahan bertransaksi dengan QRIS, Bank Transfer, atau E-Wallet. Seluruh transaksi dijamin aman dan terenkripsi." 
    },

    3: { 
        icon: "fa-truck-fast", 
        title: "Pengiriman Prioritas", 
        desc: "Pesananmu akan dikemas secara premium dan dikirim melalui layanan kilat untuk memastikan barang sampai dalam kondisi sempurna." 
    }
};

function showOrderStep(id) {

    const data = steps[id];

    const modal = document.getElementById('modal-order');
    const content = document.getElementById('modal-content');

    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-desc').innerText = data.desc;

    document.getElementById('modal-icon').innerHTML = `
        <i class="fa-solid ${data.icon}"></i>
    `;

    modal.classList.remove('hidden');

    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
    }, 10);
}

function closeModal() {

    const modal = document.getElementById('modal-order');
    const content = document.getElementById('modal-content');

    content.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

let cart = [];

function toggleCart() {

    const overlay = document.getElementById('cart-overlay');
    const panel = document.getElementById('cart-panel');

    overlay.classList.toggle('opacity-0');
    overlay.classList.toggle('pointer-events-none');

    panel.classList.toggle('translate-x-full');
}

function addToCart(name, price) {

    const item = cart.find(i => i.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({
            name,
            price,
            qty: 1
        });
    }

    updateUI();
}

function changeQty(index, change) {

    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    updateUI();
}

function updateUI() {

    const count = document.getElementById('cart-count');
    const itemsCont = document.getElementById('cart-items');
    const totalCont = document.getElementById('cart-total');

    const totalQty = cart.reduce((acc, curr) => acc + curr.qty, 0);

    const totalPrice = cart.reduce((acc, curr) => {
        return acc + (curr.price * curr.qty);
    }, 0);

    count.innerText = totalQty;

    totalCont.innerText = `Rp${totalPrice.toLocaleString()}`;

    if (cart.length === 0) {

        itemsCont.innerHTML = `
            <div class="text-center py-20 opacity-20">
                <i class="fa-solid fa-shopping-bag text-5xl"></i>
                <p class="text-[9px] font-bold mt-4">
                    Tas Kosong
                </p>
            </div>
        `;

    } else {

        itemsCont.innerHTML = cart.map((item, i) => `

            <div class="flex items-center gap-4">

                <div class="w-16 h-20 bg-light rounded-xl overflow-hidden flex-shrink-0">

                    <img 
                        src="img/2.png" 
                        class="w-full h-full object-cover"
                    >

                </div>

                <div class="flex-1">

                    <p class="text-[10px] font-bold uppercase truncate">
                        ${item.name}
                    </p>

                    <p class="text-[9px] text-gray-400 mb-2">
                        Rp${item.price.toLocaleString()}
                    </p>

                    <div class="flex items-center gap-3">

                        <button 
                            onclick="changeQty(${i}, -1)" 
                            class="w-5 h-5 border border-gray-100 rounded text-[10px]"
                        >
                            -
                        </button>

                        <span class="text-[10px] font-bold">
                            ${item.qty}
                        </span>

                        <button 
                            onclick="changeQty(${i}, 1)" 
                            class="w-5 h-5 border border-gray-100 rounded text-[10px]"
                        >
                            +
                        </button>

                    </div>

                </div>

                <button 
                    onclick="changeQty(${i}, -${item.qty})" 
                    class="text-gray-300 hover:text-red-500"
                >
                    <i class="fa-solid fa-trash-can text-sm"></i>
                </button>

            </div>

        `).join('');
    }
}

function checkout() {

    if (cart.length === 0) return;

    const totalPrice = cart.reduce((acc, curr) => {
        return acc + (curr.price * curr.qty);
    }, 0);

    const itemList = cart.map(item => 
        `• ${item.name} x${item.qty} = Rp${(item.price * item.qty).toLocaleString()}`
    ).join('\n');

    const pesan = `Halo kak, mau order:

${itemList}

*Total: Rp${totalPrice.toLocaleString()}*

Mohon konfirmasi stok & pengirimannya ya, terima kasih! 🙏`;

    window.open(
        "https://wa.me/6281312575928?text=" + encodeURIComponent(pesan),
        '_blank'
    );
}

// ANIMASI
window.addEventListener('scroll', () => {

    document.querySelectorAll('.reveal').forEach(el => {

        if (el.getBoundingClientRect().top < window.innerHeight - 50) {
            el.classList.add('active');
        }

    });

});

document.addEventListener('DOMContentLoaded', () => {

    window.dispatchEvent(new Event('scroll'));

});