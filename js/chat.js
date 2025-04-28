// دالة لتحميل المحادثات القديمة عند فتح المحادثة
function loadChat(contactId) {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = ''; // مسح الرسائل السابقة

    // مثال بيانات وهمية للمحادثة
    const messages = [
        { sender: 'أنت', message: 'مرحباً، كيف حالك؟', time: '10:00 AM' },
        { sender: 'أحمد', message: 'أنا بخير، شكراً. ماذا عنك؟', time: '10:02 AM' },
        { sender: 'أنت', message: 'أنا بخير أيضاً. هل لديك خطط لهذا اليوم؟', time: '10:05 AM' },
    ];

    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        if (msg.sender === 'أنت') {
            messageElement.classList.add('sent');
        } else {
            messageElement.classList.add('received');
        }
        
        messageElement.innerHTML = `
            <div class="message-content">${msg.message}</div>
            <div class="message-time">${msg.time}</div>
        `;

        chatMessages.appendChild(messageElement);
    });

    // التمرير إلى أسفل المحادثة عند تحميل الرسائل
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// دالة لإرسال رسالة جديدة
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();

    if (message) {
        const chatMessages = document.getElementById('chat-messages');
        
        const newMessage = document.createElement('div');
        newMessage.classList.add('message', 'sent');
        newMessage.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">${getCurrentTime()}</div>
        `;

        chatMessages.appendChild(newMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight; // التمرير لأسفل الرسائل

        // إرسال الرسالة إلى الخادم (مثال وهمي هنا)
        simulateSendMessage(message);

        messageInput.value = ''; // مسح حقل الإدخال
    }
}

// دالة لحساب الوقت الحالي بصيغة سريعة
function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';

    if (hours > 12) {
        hours -= 12;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    return `${hours}:${minutes} ${period}`;
}

// دالة لمحاكاة إرسال رسالة إلى الخادم (في حالة استخدام الخادم)
function simulateSendMessage(message) {
    console.log('تم إرسال الرسالة: ' + message);

    // هنا يمكن أن يتم إرسال الرسالة إلى الخادم باستخدام AJAX أو WebSocket
    // مثال على إرسال الرسالة باستخدام WebSocket
    /*
    const socket = new WebSocket('wss://yourserver.com');
    socket.onopen = function() {
        socket.send(JSON.stringify({ message: message }));
    };
    */
}

// دالة لإظهار المحادثة مع شخص معين
function openChat(contactId) {
    // تحميل المحادثة مع الشخص المحدد
    loadChat(contactId);

    // تحديث عنوان المحادثة في واجهة المستخدم (مثل اسم الشخص)
    const chatHeader = document.getElementById('chat-header');
    const contactName = getContactNameById(contactId); // الحصول على الاسم من قائمة جهات الاتصال
    chatHeader.textContent = `محادثة مع ${contactName}`;
}

// دالة للحصول على اسم الشخص بناءً على ID (مثال بيانات وهمية)
function getContactNameById(contactId) {
    const contacts = [
        { id: 1, name: 'أحمد' },
        { id: 2, name: 'سارة' },
        { id: 3, name: 'محمد' },
    ];

    const contact = contacts.find(contact => contact.id === contactId);
    return contact ? contact.name : 'مستخدم غير معروف';
}

// استدعاء دالة لفتح المحادثة عند الضغط على جهة اتصال
document.querySelectorAll('.contact').forEach(contactElement => {
    contactElement.addEventListener('click', () => {
        const contactId = parseInt(contactElement.getAttribute('data-id'));
        openChat(contactId);
    });
});

// استدعاء دالة لإرسال الرسالة عند الضغط على زر الإرسال
document.getElementById('send-btn').addEventListener('click', sendMessage);

// استدعاء دالة لإرسال الرسالة عند الضغط على زر "Enter"
document.getElementById('message-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// تحميل المحادثة الافتراضية عند تحميل الصفحة (مثال)
document.addEventListener('DOMContentLoaded', () => {
    // تحميل المحادثة مع أول شخص عند تحميل الصفحة
    openChat(1);
});
