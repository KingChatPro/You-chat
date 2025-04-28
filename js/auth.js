// دالة لتسجيل مستخدم جديد
function registerUser(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const confirmPassword = document.getElementById('register-confirm-password').value.trim();

    // تحقق من أن جميع الحقول ممتلئة
    if (!username || !email || !password || !confirmPassword) {
        alert('يرجى تعبئة جميع الحقول.');
        return;
    }

    // تحقق من تطابق كلمة المرور
    if (password !== confirmPassword) {
        alert('كلمتا المرور غير متطابقتين.');
        return;
    }

    // حفظ بيانات المستخدم في Local Storage
    const userData = {
        username,
        email,
        password, // ملاحظة: في التطبيقات الحقيقية، لا تحفظ كلمات السر بهذه الطريقة!
    };

    localStorage.setItem('youChatUser', JSON.stringify(userData));

    alert('تم التسجيل بنجاح! يمكنك تسجيل الدخول الآن.');
    window.location.href = 'login.html'; // الانتقال إلى صفحة تسجيل الدخول
}

// دالة لتسجيل الدخول
function loginUser(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    // تحقق من أن جميع الحقول ممتلئة
    if (!email || !password) {
        alert('يرجى تعبئة جميع الحقول.');
        return;
    }

    // استرجاع بيانات المستخدم من Local Storage
    const storedUser = JSON.parse(localStorage.getItem('youChatUser'));

    // التحقق من وجود المستخدم ومطابقة البيانات
    if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert('تم تسجيل الدخول بنجاح!');
        // إنشاء جلسة وهمية
        localStorage.setItem('youChatLoggedIn', 'true');
        window.location.href = 'chat.html'; // الانتقال إلى صفحة المحادثات
    } else {
        alert('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
    }
}

// دالة لتسجيل الخروج
function logoutUser() {
    localStorage.removeItem('youChatLoggedIn');
    window.location.href = 'login.html'; // العودة إلى صفحة تسجيل الدخول
}

// دالة لفحص ما إذا كان المستخدم مسجلاً دخوله أم لا
function checkAuthentication() {
    const isLoggedIn = localStorage.getItem('youChatLoggedIn');

    if (!isLoggedIn) {
        alert('يجب عليك تسجيل الدخول أولاً.');
        window.location.href = 'login.html'; // إعادة التوجيه إلى تسجيل الدخول
    }
}

// ربط النماذج بالأحداث المناسبة
document.addEventListener('DOMContentLoaded', () => {
    // صفحة التسجيل
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', registerUser);
    }

    // صفحة تسجيل الدخول
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', loginUser);
    }

    // التحقق من الدخول في الصفحات التي تتطلب تسجيل الدخول
    const pagesRequireAuth = ['chat.html', 'profile.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (pagesRequireAuth.includes(currentPage)) {
        checkAuthentication();
    }

    // زر تسجيل الخروج
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }
});
