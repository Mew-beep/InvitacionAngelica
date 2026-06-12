document.addEventListener("DOMContentLoaded", () => {
  // 1. Quitar el Loader inicial
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => (loader.style.display = "none"), 500);
  }, 1500);

  // 2. Lógica del Botón "Abrir Invitación"
  const openBtn = document.getElementById("open-btn");
  const welcomeScreen = document.getElementById("welcome-screen");
  const mainContent = document.getElementById("main-content");
  const bgMusic = document.getElementById("bg-music");
  const musicToggle = document.getElementById("music-toggle");
  let isPlaying = false;

  openBtn.addEventListener("click", () => {
    // Transición de salida hacia arriba estilo sobre
    welcomeScreen.style.transform = "translateY(-100vh)";
    welcomeScreen.style.opacity = "0";

    // Mostrar el contenido principal
    mainContent.classList.remove("hidden");

    bgMusic.volume = 0;

    // Iniciar música automáticamente
    bgMusic
      .play()
      .then(() => {
        isPlaying = true;
        musicToggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
    let fadeIn = setInterval(() => {
                if (bgMusic.volume < 0.8) { // Mientras no llegue casi al máximo
                    bgMusic.volume += 0.05;  // Sube el volumen un 5%
                } else {
                    bgMusic.volume = 0.9;      // Lo asegura en 100%
                    clearInterval(fadeIn);   // Detiene el cronómetro
                }
            }, 300);  
    })
      .catch((err) =>
        console.log(
          "Auto-play bloqueado por el navegador, el usuario debe iniciar manual.",
        ),
      );

    // Iniciar sistema de partículas
    createParticles();

    setTimeout(() => {
      welcomeScreen.style.display = "none";
    }, 1000);
  });

  // Control Play/Pause Música
  musicToggle.addEventListener("click", () => {
    if (isPlaying) {
      bgMusic.pause();
      musicToggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    } else {
      bgMusic.play();
      bgMusic.volume = 0.9;
      musicToggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    isPlaying = !isPlaying;
  });

  // 3. Animaciones al hacer Scroll (Intersection Observer)
  const fadeElements = document.querySelectorAll(".fade-in");
  const observerOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Animar solo una vez
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => scrollObserver.observe(el));

  // 4. Cuenta Regresiva
  // Cambia esta fecha a la de tu evento (Año, Mes (0-11), Día, Hora, Minuto)
  // Ejemplo: 15 de Noviembre de 2026 a las 16:00
  const eventDate = new Date(2026, 7, 1, 19, 0, 0).getTime();

  const updateCountdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      clearInterval(updateCountdown);
      document.querySelector(".countdown-container").innerHTML =
        "<h3>¡El gran día ha llegado!</h3>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").innerText = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").innerText = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").innerText = seconds
      .toString()
      .padStart(2, "0");
  }, 1000);

  // 5. Sistema de Partículas (Brillos/Estrellas flotantes)
  function createParticles() {
    const container = document.getElementById("particles-container");
    const particleCount = 30; // Cantidad de partículas

    for (let i = 0; i < particleCount; i++) {
      let particle = document.createElement("div");
      particle.classList.add("particle");

      // Posición, tamaño y velocidad aleatoria
      let size = Math.random() * 5 + 2; // de 2px a 7px
      let posX = Math.random() * 100; // 0% a 100% de la pantalla
      let delay = Math.random() * 5;
      let duration = Math.random() * 10 + 5; // de 5s a 15s

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}vw`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;

      container.appendChild(particle);
    }
  }

  // 5.5 Sistema de Polvo de Hadas para las Mariposas
    function crearPolvoDeHadas() {
        const mariposas = document.querySelectorAll('.mariposa');
        const cantidadDestellos = 7;

        mariposas.forEach(mariposa => {
            for (let i = 0; i < cantidadDestellos; i++) {
                let destello = document.createElement('span');
                destello.classList.add('destello');
                
                // Generar valores matemáticos aleatorios para que sea orgánico
                let left = Math.random() * 60 + 20; // Posición horizontal (20% al 80%)
                let top = Math.random() * 50 + 20;  // Posición vertical (20% al 70%)
                let delay = Math.random() * 2;      // Retraso entre 0 y 2 segundos
                let duration = Math.random() * 1 + 1.5; // Duración de caída entre 1.5s y 2.5s

                destello.style.left = `${left}%`;
                destello.style.top = `${top}%`;
                destello.style.animationDelay = `${delay}s`;
                destello.style.animationDuration = `${duration}s`;

                mariposa.appendChild(destello);
            }
        });
    }
    crearPolvoDeHadas();

  rsvpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("guest-name").value;
    const count = document.getElementById("guest-count").value;
    const attendance = document.querySelector(
      'input[name="attendance"]:checked',
    ).value;

    // Construir el mensaje
    let message = `¡Hola! Soy *${name}*.\n\n`;
    message += `Quiero confirmar sobre la invitación al evento.\n`;
    message += `Respuesta: *${attendance}*\n`;

    if (attendance === "Sí asistiré") {
      message += `Número de pases requeridos: *${count}*\n\n¡Nos vemos pronto!`;
    } else {
      message += `\nGracias por la invitación, les deseo lo mejor.`;
    }

    // Codificar texto para URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Abrir en nueva pestaña
    window.open(whatsappURL, "_blank");
  });

  // Bloquear clic derecho
  document.addEventListener("contextmenu", (event) => event.preventDefault());

  // Bloquear atajos comunes (F12, Ctrl+Shift+I, Ctrl+U)
  document.onkeydown = function (e) {
    if (e.keyCode == 123) return false; // F12
    if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) return false; // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) return false; // Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) return false; // Ctrl+Shift+J
    if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) return false; // Ctrl+U
  };
});