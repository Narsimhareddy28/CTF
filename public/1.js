// Initialising the canvas
// var canvas = document.querySelector('canvas'),
//     ctx = canvas.getContext('2d');

// // Setting the width and height of the canvas
// function resizeCanvas() {
//   canvas.width = document.body.scrollWidth;
//   canvas.height = document.body.scrollHeight;
// }

// // Resize canvas when the window is resized
// window.addEventListener('resize', resizeCanvas);

// // Resize canvas when the document body is resized or scrolled
// document.body.addEventListener('resize', resizeCanvas);
// document.body.addEventListener('scroll', resizeCanvas);

// // Initial resizing
// resizeCanvas();
// // Setting up the letters
// var letters = 'CYBER BILLIKENS';
// letters = letters.split('');

// // Setting up the columns
// var fontSize = 10,
//     columns = canvas.width / fontSize;

// // Setting up the drops
// var drops = [];
// for (var i = 0; i < columns; i++) {
//   drops[i] = 1;
// }

// // Setting up the draw function
// function draw() {
//   ctx.fillStyle = 'rgba(0, 0, 0, .1)';
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   for (var i = 0; i < drops.length; i++) {
//     var text = letters[Math.floor(Math.random() * letters.length)];
//     ctx.fillStyle = '#0f0';
//     ctx.fillText(text, i * fontSize, drops[i] * fontSize);
//     drops[i]++;
//     if (drops[i] * fontSize > canvas.height && Math.random() > 0.1) {
//       drops[i] = 0;
//     }
//   }
// }

// // Loop the animation
// setInterval(draw, 80);


const random_char = () => {
  const possible = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" +
        "0123456789" +
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz";
  return possible.charAt(Math.floor(Math.random() * possible.length));
};

const mask = (chars, progress) => {
  const masked = [];

  for (let i = 0; i < chars.length; i++) {
    const position = (i + 1) / chars.length;
    if (position > progress) {
      masked.push(random_char());
    } else {
      masked.push(chars[i]);
    }
  }

  return masked.join('');
};

const shuffle = el => {
  const chars = el.textContent.split('');

  const params = {
    progress: 0
  };

  const a = anime({
    targets: params,
    progress: 1,
    delay: 1000,
    duration: 1000,
    easing: 'easeInQuad',
    update: () => {
      el.textContent = mask(chars, params.progress);
    },
    complete: () => {
      el.classList.add('completed');
    }
  });
  
  el.onclick = () => {
    el.classList.remove('completed');
    a.restart();
  };
};

for (const el of document.querySelectorAll('.shuffle')) {
  shuffle(el);
}

  /* Demo purposes only */
  $(".hover").mouseleave(
    function () {
      $(this).removeClass("hover");
    }
  );