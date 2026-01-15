import { useEffect, useRef } from 'react';
import './LiquidBackground.css';

const LiquidBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId = null;

    // Configuração do canvas
    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    
    // Aguardar um frame para garantir que o canvas está renderizado
    setTimeout(() => {
      resizeCanvas();
    }, 0);

    window.addEventListener('resize', resizeCanvas);

    // Variáveis globais
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let isHovered = false;
    let particles = [];
    let ambientParticles = [];
    let centerX = 0;
    let centerY = 0;
    let animationStartTime = Date.now();
    let isInitialAnimation = true;
    let animationOffset = 0; // Offset para animação contínua ao longo do infinito
    let lastMouseInteraction = Date.now();
    const MOUSE_IDLE_TIME = 2000; // Tempo em ms sem mouse para iniciar animação

    // Classe para partículas líquidas
    class LiquidParticle {
      constructor(x, y, radius, color, group, startDelay = 0, particleIndex = 0, totalParticles = 0) {
        this.originalX = x;
        this.originalY = y;
        this.radius = radius;
        this.color = color;
        this.group = group; // 'left' ou 'right'
        this.vx = 0;
        this.vy = 0;
        this.mass = radius;
        this.startDelay = startDelay;
        this.hasArrived = false;
        this.particleIndex = particleIndex; // Índice da partícula na sequência
        this.totalParticles = totalParticles; // Total de partículas
        this.opacity = 0; // Começar transparente
        
        // Começar na posição final (sem queda)
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
      }

      update() {
        const elapsed = Date.now() - animationStartTime;
        const delayTime = this.startDelay * 50; // Delay escalonado
        
        // Animação de opacidade (aparecer gradualmente)
        if (isInitialAnimation && elapsed < delayTime + 2000) {
          // Calcular opacidade baseada no tempo
          const fadeStart = delayTime;
          const fadeDuration = 1500; // Duração do fade (1.5 segundos)
          const fadeProgress = Math.max(0, Math.min(1, (elapsed - fadeStart) / fadeDuration));
          
          // Aplicar easing suave (ease-out)
          const easedProgress = 1 - Math.pow(1 - fadeProgress, 3);
          this.opacity = easedProgress;
        } else {
          // Após a animação inicial, opacidade total
          if (isInitialAnimation && elapsed > 2000) {
            isInitialAnimation = false;
          }
          this.opacity = 1;
        }
        
        // Comportamento normal de movimento
        // Verificar se deve animar continuamente (sem interação do mouse)
        const timeSinceMouseInteraction = Date.now() - lastMouseInteraction;
        const shouldAnimate = !isHovered && timeSinceMouseInteraction > MOUSE_IDLE_TIME;
        
        // Calcular posição alvo baseada no hover ou animação contínua
        if (isHovered) {
          // No hover, expandir o infinito suavemente
          const dx = this.originalX - centerX;
          const dy = this.originalY - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);
          const expansion = 1.15; // Expandir 15% (reduzido para evitar duplicação)
          this.targetX = centerX + Math.cos(angle) * distance * expansion;
          this.targetY = centerY + Math.sin(angle) * distance * expansion;
        } else if (shouldAnimate) {
          // Animação contínua: mover ao longo do caminho do infinito
          // Usar o índice da partícula + offset de animação para criar movimento
          const t = ((this.particleIndex / this.totalParticles) * Math.PI * 2 + animationOffset) % (Math.PI * 2);
          
          // Recalcular posição na curva do infinito
          const sinT = Math.sin(t);
          const cosT = Math.cos(t);
          const denom = 1 + sinT * sinT;
          const scale = Math.min(canvas.width * 0.4, 300);
          
          this.targetX = centerX + scale * cosT / denom;
          this.targetY = centerY + scale * sinT * cosT / denom;
        } else {
          this.targetX = this.originalX;
          this.targetY = this.originalY;
        }

        // Adicionar influência do mouse (apenas se não estiver animando e não estiver em hover)
        if (!shouldAnimate && !isHovered) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            this.targetX += (dx / distance) * force * 30;
            this.targetY += (dy / distance) * force * 30;
          }
        }

        // Aplicar física de mola - mais suave para evitar "fantasmas"
        const springStrength = isHovered ? 0.08 : 0.05; // Mais rápido no hover para evitar duplicação
        const damping = 0.88; // Mais amortecimento para movimento mais suave
        
        const ax = (this.targetX - this.x) * springStrength;
        const ay = (this.targetY - this.y) * springStrength;

        this.vx += ax;
        this.vy += ay;
        this.vx *= damping;
        this.vy *= damping;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        // Aplicar opacidade à cor
        // Extrair valores RGB da cor original e aplicar opacidade
        const rgbaMatch = this.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d\.]+)?\)/);
        let colorWithOpacity;
        
        if (rgbaMatch) {
          const r = rgbaMatch[1];
          const g = rgbaMatch[2];
          const b = rgbaMatch[3];
          colorWithOpacity = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
        } else {
          // Fallback: tentar substituir o último valor (opacidade)
          colorWithOpacity = this.color.replace(/[\d\.]+\)$/, `${this.opacity})`);
        }
        
        // Criar gradiente radial
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, colorWithOpacity);
        gradient.addColorStop(1, `rgba(0, 142, 249, 0)`);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Brilho adicional com opacidade
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.25 * this.opacity})`;
        ctx.fill();
      }
    }

    // Classe para conexões entre partículas
    class Connection {
      constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
      }

      draw() {
        const dx = this.p2.x - this.p1.x;
        const dy = this.p2.y - this.p1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.15;
          
          // Criar gradiente para a linha - mais transparente
          const gradient = ctx.createLinearGradient(
            this.p1.x, this.p1.y,
            this.p2.x, this.p2.y
          );
          gradient.addColorStop(0, `rgba(0, 142, 249, ${opacity})`);
          gradient.addColorStop(0.5, `rgba(51, 153, 255, ${opacity})`);
          gradient.addColorStop(1, `rgba(0, 142, 249, ${opacity})`);

          ctx.beginPath();
          ctx.moveTo(this.p1.x, this.p1.y);
          ctx.lineTo(this.p2.x, this.p2.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }
    }

    // Função para criar partículas em formato de infinito
    function createParticles() {
      particles = [];
      ambientParticles = [];
      
      centerX = canvas.width / 2;
      centerY = canvas.height / 2;
      
      // Parâmetros do infinito - maior e mais ao fundo
      const scale = Math.min(canvas.width * 0.65, 500); // Aumentado para ocupar mais espaço
      const numParticles = 50; // Mais partículas para suavidade
      const roughness = 8; // Bordas mais suaves

      // Criar partículas para o símbolo de infinito usando equação paramétrica
      // Lemniscata de Bernoulli: forma perfeita do infinito
      for (let i = 0; i < numParticles; i++) {
        const t = (i / numParticles) * Math.PI * 2;
        
        // Equação paramétrica da lemniscata de Bernoulli
        const sinT = Math.sin(t);
        const cosT = Math.cos(t);
        const denom = 1 + sinT * sinT;
        
        // Posição base do infinito
        const baseX = scale * cosT / denom;
        const baseY = scale * sinT * cosT / denom;
        
        // Determinar se é loop esquerdo (azul escuro) ou direito (azul claro)
        const isLeftLoop = baseX < 0 || (baseX === 0 && Math.abs(t - Math.PI) < Math.PI / 2);
        
        // Adicionar variação sutil para bordas rasgadas (menos intenso)
        const roughnessX = (Math.random() - 0.5) * roughness;
        const roughnessY = (Math.random() - 0.5) * roughness;
        
        const x = centerX + baseX + roughnessX;
        const y = centerY + baseY + roughnessY;
        
        const particleRadius = 10 + Math.random() * 5; // Tamanho reduzido para parecer mais ao fundo
        
        // Cores diferentes para cada loop - mais transparentes para parecer mais ao fundo
        let color;
        if (isLeftLoop) {
          // Azul mais escuro para o loop esquerdo - mais transparente
          color = `rgba(${0 + Math.random() * 50}, ${142 + Math.random() * 30}, 249, 0.25)`;
        } else {
          // Azul mais claro para o loop direito - mais transparente
          color = `rgba(${51 + Math.random() * 30}, ${153 + Math.random() * 30}, 255, 0.25)`;
        }
        
        const startDelay = i * 0.05; // Mesmo delay do original
        particles.push(new LiquidParticle(x, y, particleRadius, color, isLeftLoop ? 'left' : 'right', startDelay, i, numParticles));
      }

      // Partículas de fundo ambiente - mais transparentes
      for (let i = 0; i < 60; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ambientParticles.push({
          x: x,
          y: y,
          radius: Math.random() * 3 + 2,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.1
        });
      }
    }

    // Event listeners
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
      
      // Atualizar tempo da última interação
      lastMouseInteraction = Date.now();
      
      // Verificar se está sobre o símbolo de infinito
      // Calcula a distância até o centro e verifica se está dentro da área do infinito
      const dx = targetMouseX - centerX;
      const dy = targetMouseY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      // Ajustado para o novo tamanho maior do infinito (65% da largura)
      const scale = Math.min(canvas.width * 0.65, 500);
      isHovered = distance < scale * 0.6; // Área de hover proporcional ao tamanho
    };

    const handleMouseLeave = () => {
      isHovered = false;
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Loop de animação
    function animate() {
      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      // Fundo com gradiente escuro
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      bgGradient.addColorStop(0, 'rgba(10, 10, 10, 0.8)');
      bgGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.9)');
      bgGradient.addColorStop(1, '#000000');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Atualizar posição do mouse com suavização
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;
      
      // Atualizar offset de animação contínua (se não houver interação do mouse)
      const timeSinceMouseInteraction = Date.now() - lastMouseInteraction;
      if (!isHovered && timeSinceMouseInteraction > MOUSE_IDLE_TIME) {
        // Incrementar offset para fazer as partículas "correrem" pelo infinito
        animationOffset += 0.02; // Velocidade da animação
        if (animationOffset > Math.PI * 2) {
          animationOffset = 0; // Resetar quando completar uma volta
        }
      } else {
        // Resetar offset quando houver interação
        animationOffset = 0;
      }

      // Desenhar e atualizar partículas ambiente
      ambientParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 142, 249, ${p.opacity * 0.5})`;
        ctx.fill();
      });

      // Desenhar conexões entre partículas próximas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const connection = new Connection(particles[i], particles[j]);
          connection.draw();
        }
      }

      // Atualizar e desenhar partículas principais
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Efeito de brilho central quando hover - removido para evitar duplicação visual

      animationId = requestAnimationFrame(animate);
    }

    // Aguardar um pouco antes de iniciar a animação para garantir que o canvas está pronto
    setTimeout(() => {
      resizeCanvas();
      animationStartTime = Date.now();
      createParticles();
      animate();
    }, 100);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="liquid-background" />;
};

export default LiquidBackground;

