document.addEventListener('DOMContentLoaded', function() {
    // Находим все изображения с классом img-placeholder
    const placeholders = document.querySelectorAll('.img-placeholder');
    
    // Для каждого изображения-заглушки
    placeholders.forEach(function(img) {
        // Создаем canvas
        const canvas = document.createElement('canvas');
        const width = img.width || 400;
        const height = img.height || 300;
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        
        // Рисуем градиентный фон
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#007bff');
        gradient.addColorStop(1, '#0056b3');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Добавляем текст
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const altText = img.alt || 'Изображение';
        
        ctx.fillText(altText, width / 2, height / 2);
        
        // Заменяем src изображения на data URL
        img.src = canvas.toDataURL('image/png');
    });
}); 