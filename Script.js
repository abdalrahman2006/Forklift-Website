// باسورد لوحة التحكم
const ADMIN_PASS = "1234";

function checkAdminPassword() {
    let pass = prompt("الرجاء إدخال كلمة سر لوحة التحكم:");
    if (pass === ADMIN_PASS) {
        toggleAdminPanel();
    } else if (pass !== null) {
        alert("كلمة السر غير صحيحة! ❌");
    }
}

function toggleAdminPanel() {
    let modal = document.getElementById('adminModal');
    if (modal) {
        modal.classList.toggle('hidden');
        if (!modal.classList.contains('hidden')) {
            renderCardsAdminPanel();
        }
    }
}

// قائمة الـ 6 كروت الأساسية وبياناتهم المرتبطة بالـ HTML بتاعك
function getCardsData() {
    let defaultCards = [
        { id: 1, name: "كارت 1: كلاركات للبيع", imgKey: "card_img_1", defaultImg: "images/forklift/forklift1 (1).jpeg" },
        { id: 2, name: "كارت 2: كلاركات للإيجار", imgKey: "card_img_2", defaultImg: "forklift/forklift1 (2).jpg" },
        { id: 3, name: "كارت 3: ريتش تراك", imgKey: "card_img_3", defaultImg: "images/Reach track/reach1 (1).jpeg" },
        { id: 4, name: "كارت 4: ترانسات بالت", imgKey: "card_img_4", defaultImg: "images/pallet track/pallet1 (1).jpg" },
        { id: 5, name: "كارت 5: ورشة الصيانة والتشخيص", imgKey: "card_img_5", defaultImg: "images/Work shop/workshop1 (1).jpeg" },
        { id: 6, name: "كارت 6: قطع الغيار الأصلية", imgKey: "card_img_6", defaultImg: "images/Spare-Parts/spare parts1 (1).jpeg" }
    ];
    return defaultCards;
}

// عرض الكروت جوه لوحة التحكم مع معاينة الصورة الحقيقية لكل كارت
function renderCardsAdminPanel() {
    let container = document.getElementById('realSiteCardsControlList');
    if (!container) return;

    let cards = getCardsData();
    let html = '';

    cards.forEach(card => {
        // بنجيب الصورة المخزنة في الـ localStorage لو وجدت، وإلا بنعرض الصورة الافتراضية
        let currentImg = localStorage.getItem(card.imgKey) || card.defaultImg;

        html += `
            <div class="bg-gray-800 border border-gray-700 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-3 w-full md:w-auto">
                    <img src="${currentImg}" class="w-16 h-16 object-cover rounded-lg border border-gray-600" alt="معاينة">
                    <div>
                        <h4 class="text-white text-sm font-bold">${card.name}</h4>
                        <span class="text-[10px] text-gray-400">محدد بدقة لتعديل هذا الكارت فقط</span>
                    </div>
                </div>
                
                <div class="flex items-center gap-2 w-full md:w-auto justify-end">
                    <label class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-3 rounded cursor-pointer transition">
                        📁 تغيير الصورة
                        <input type="file" accept="image/*" class="hidden" onchange="uploadCardImage(event, '${card.imgKey}')">
                    </label>
                    <button onclick="deleteCardImage('${card.imgKey}', '${card.defaultImg}')" class="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-3 rounded transition">
                        🗑️ إزالة الصورة المخصصة
                    </button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// رفع صورة جديدة وتخزينها خصيصاً لهذا الكارت
function uploadCardImage(event, imgKey) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem(imgKey, e.target.result);
            renderCardsAdminPanel();
            applySavedImagesToSite();
            alert("تم رفع وتحديث صورة هذا الكارت بنجاح! ✅");
        };
        reader.readAsDataURL(file);
    }
}

// مسح الصورة المخصصة والرجوع للصورة الأصلية
function deleteCardImage(imgKey, defaultImg) {
    if (confirm("هل تريد إزالة الصورة المخصصة والرجوع للصورة الافتراضية لهذا الكارت؟")) {
        localStorage.removeItem(imgKey);
        renderCardsAdminPanel();
        applySavedImagesToSite();
        alert("تمت إزالة الصورة بنجاح! 🗑️");
    }
}

// تطبيق الصور المخزنة على الـ 6 كروت في الموقع تلقائياً بمجرد فتح الصفحة
function applySavedImagesToSite() {
    let cards = getCardsData();
    cards.forEach((card) => {
        let savedImg = localStorage.getItem(card.imgKey);
        if (savedImg) {
            // بنبحث عن الكارت بالـ ID المباشر بتاعه عشان مفيش حاجة تضيع
            let imgElement = document.getElementById(card.imgKey);
            if (imgElement) {
                imgElement.src = savedImg;
            }
        }
    });
}
// فتح الصورة بحجم كبير عند الضغط عليها
function openModal(imgElement) {
    let modal = document.getElementById('imageModal');
    let modalImg = document.getElementById('modalImg');
    
    if (modal && modalImg) {
        modal.classList.remove('hidden');
        modalImg.src = imgElement.src;
    }
}

// إغلاق نافذة الصورة الكبيرة
function closeModal() {
    let modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}
