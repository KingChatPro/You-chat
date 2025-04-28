// دالة لتغيير حالة التنقل بين الصفحات
function setActiveLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// دالة لتحميل صورة المستخدم الشخصية الجديدة
function updateProfileImage(event) {
    const fileInput = event.target;
    const image = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const profileImage = document.getElementById('profile-image');
        profileImage.src = e.target.result;
    }

    if (image) {
        reader.readAsDataURL(image);
    }
}

// دالة لتعديل البيانات الشخصية
function editProfile() {
    const profileForm = document.getElementById('edit-profile-form');
    profileForm.style.display = 'block';

    const username = document.getElementById('username').textContent;
    const email = document.getElementById('email').textContent;

    document.getElementById('edit-username').value = username;
    document.getElementById('edit-email').value = email;
}

// دالة لإلغاء التعديل على الملف الشخصي
function cancelEdit() {
    const profileForm = document.getElementById('edit-profile-form');
    profileForm.style.display = 'none';
}

// دالة لحفظ التعديلات الجديدة في الملف الشخصي
function saveProfileChanges(event) {
    event.preventDefault();

    const username = document.getElementById('edit-username').value;
    const email = document.getElementById('edit-email').value;

    document.getElementById('username').textContent = username;
    document.getElementById('email').textContent = email;

    cancelEdit();  // إخفاء نموذج التعديل
    alert('تم حفظ التغييرات بنجاح!');
}

// دالة لتسجيل الخروج
function logout() {
    // هنا يجب أن تضيف الكود الخاص بتسجيل الخروج، مثل مسح الجلسة أو ملف الكوكيز
    alert('تم تسجيل الخروج بنجاح!');
    window.location.href = 'index.html'; // العودة إلى صفحة تسجيل الدخول
}

// دالة لفتح محادثة جديدة
function openChat(contactId) {
    // هنا يجب أن تضيف الكود الخاص بفتح المحادثة مع الشخص المحدد
    console.log('فتح المحادثة مع الشخص: ' + contactId);
}

// دالة لإرسال رسالة جديدة
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;

    if (message.trim() !== '') {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message', 'sent');
        messageContainer.textContent = message;
        
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.appendChild(messageContainer);
        
        messageInput.value = ''; // مسح حقل الرسالة بعد الإرسال
        chatMessages.scrollTop = chatMessages.scrollHeight; // التمرير إلى أسفل المحادثة
    }
}

// دالة لتحميل المحادثات والاتصالات
function loadContacts() {
    const contacts = [
        { id: 1, name: 'أحمد', status: 'مستخدم نشط' },
        { id: 2, name: 'سارة', status: 'مشغول' },
        { id: 3, name: 'محمد', status: 'متصل الآن' },
    ];

    const contactsList = document.querySelector('.contacts-list ul');
    contactsList.innerHTML = ''; // مسح القائمة السابقة

    contacts.forEach(contact => {
        const contactItem = document.createElement('li');
        contactItem.classList.add('contact');
        contactItem.setAttribute('data-id', contact.id);
        contactItem.textContent = `${contact.name} - ${contact.status}`;
        
        contactItem.addEventListener('click', () => {
            openChat(contact.id); // فتح المحادثة مع الشخص المحدد
        });

        contactsList.appendChild(contactItem);
    });
}

// استدعاء دالة تحميل المحادثات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    loadContacts();
    setActiveLink(); // تفعيل الرابط الحالي في التنقل
});
