    const gameBox = document.querySelector('.game-box');
    const gameBoxItems = [...document.querySelectorAll('.game-box__item')];
    const startBtn = document.querySelector('.btn--start');
    const winBtn = document.querySelector('.btn--win');
    const winBox = document.querySelector('.win-box');
    const startBox = document.querySelector('.start-box');

    function shuffleArray() {
        let array = [1, 2, 3, 4, 5, 6, 7, 8];

            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }

        return array;
    }

    function runGame(arr, el) {
        for (let i = 0; i < arr.length; i++) {
            gameBoxItems[i].textContent = arr[i];
            gameBoxItems[i].setAttribute('id', arr[i]);
        }

        el.classList.add('js-invisible');

        return setTimeout(() => el.parentNode.removeChild(el), 500);
    }

    startBtn.addEventListener('click', function (e) {
        e.preventDefault();
        runGame(shuffleArray(), startBox);
    });

    function moveBox(e) {
        let emptyBox = document.querySelector('.js-empty');
        let currentBox = e.currentTarget;

        emptyBox.textContent = currentBox.getAttribute('id');
        emptyBox.setAttribute('id', `${currentBox.getAttribute('id')}`);
        emptyBox.classList.remove('js-empty');
        currentBox.classList.add('js-empty');
        currentBox.setAttribute('id', '9');
        currentBox.textContent = '';

        return checkIfWin();
    };


    function checkIfWin() {
        let gameWin = gameBoxItems.every(item => item.getAttribute('id') === item.dataset.position);
        if (gameWin) {

            const winBox = document.createElement('div');
            const winBtn = document.createElement('a');
            const winText = document.createElement('p');
            const winTextSpan = document.createElement('span');

            winBox.className = 'win-box';

            winBtn.className = 'btn btn--win';
            winBtn.textContent = 'Play again';

            winText.className = 'win-box__text';
            winText.textContent = '🏆 Yeah! You won the game 🏆';

            winTextSpan.className = 'win-box__span';
            winTextSpan.textContent = 'Psst... Maybe you want try again?';

            document.body.appendChild(winBox);
            winBox.appendChild(winText);
            winText.appendChild(winTextSpan);
            winBox.appendChild(winBtn);
            winBtn.addEventListener('click', function (e) {
                e.preventDefault();
                runGame(shuffleArray(), winBox);
            })
        };
    }

    for (item of gameBoxItems) {
        item.addEventListener('click', (e) => {
            let emptyBox = document.querySelector('.js-empty');
            let emptyBoxPosition = parseInt(emptyBox.dataset.position);
            let boxPosition = parseInt(e.currentTarget.dataset.position);

            // Check if we can move box left
            if (boxPosition - 1 === emptyBoxPosition && emptyBoxPosition % 3 !== 0) {
                moveBox(e);
            }

            // Check if we can move box right
            if (boxPosition + 1 === emptyBoxPosition && emptyBoxPosition !== 4 && emptyBoxPosition !== 7) {
                moveBox(e);
            }

            // Check if we can move box up or down
            if (boxPosition + 3 === emptyBoxPosition || boxPosition - 3 === emptyBoxPosition) {
                moveBox(e);
            }
        });
    }
