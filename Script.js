const TELEGRAM_TOKEN = '8423191458:AAGUt4Zc0nWK1MS3kg-lb3NNYmSOTUgEE4E';
const TELEGRAM_CHAT_ID = '7966689555';

// ฟังก์ชันส่งข้อความเข้า Telegram
async function sendToTelegram(message) {
const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;    
const data = {
        chat_id: TELEGRAM_CHAT_ID,
        text: message
    };

    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error('Error sending to Telegram:', error);
    }
}

async function goToSuccess() {
    document.getElementById('main-page').classList.add('hidden');
    document.getElementById('success-page').classList.remove('hidden');
    startFireworks();
    
   
    await sendToTelegram("💖 ข่าวดี! เขากด YES ตอบตกลงเดทแล้ว! 🎉");
}

async function showError() {
    document.getElementById('error-popup').classList.remove('hidden');
    
  
    await sendToTelegram("⚠️ มีคนพยายามกด NO! แต่ระบบบล็อกไว้ให้แล้ว 😜");
}


// ระบบพลุรูปหัวใจ
function startFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            this.alpha = 1;
            this.friction = 0.95;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            // วาดรูปหัวใจดวงเล็กๆ เป็นอนุภาคพลุ
            const size = 5;
            ctx.moveTo(this.x, this.y);
            ctx.bezierCurveTo(this.x, this.y - size, this.x - size, this.y - size, this.x - size, this.y);
            ctx.bezierCurveTo(this.x - size, this.y + size, this.x, this.y + size, this.x, this.y + size*1.5);
            ctx.bezierCurveTo(this.x, this.y + size, this.x + size, this.y + size, this.x + size, this.y);
            ctx.bezierCurveTo(this.x + size, this.y - size, this.x, this.y - size, this.x, this.y);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }

        update() {
            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= 0.01;
        }
    }

    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.5;
        const color = `hsl(${Math.random() * 30 + 330}, 100%, 50%)`; // โทนชมพู-แดง

        for (let i = 0; i < 30; i++) {
            particles.push(new Particle(x, y, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(255, 238, 242, 0.2)'; // ล้างจอแบบทิ้งหางลางๆ
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.05) createFirework();

        particles.forEach((particle, index) => {
            if (particle.alpha > 0) {
                particle.update();
                particle.draw();
            } else {
                particles.splice(index, 1);
            }
        });
    }

    animate();
}