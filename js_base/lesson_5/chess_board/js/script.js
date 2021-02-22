const ChessBoard = {
    init: function () {
        const chessBoard = document.createElement('div');
        chessBoard.classList.add('chess-board');
        this.getChessBoard(chessBoard);

        return chessBoard;
    },

    getChessBoard: function (container) {
        const chessBoardFields = [];

        const emptyTopLeftCell = this.getEmptyCell();
        emptyTopLeftCell.style.gridArea = 'empty-top-left';
        chessBoardFields.push(emptyTopLeftCell);

        const topLettersField = this.getLetterField();
        topLettersField.style.gridArea = 'top-letters';
        chessBoardFields.push(topLettersField);

        const emptyTopRightCell = this.getEmptyCell();
        emptyTopRightCell.style.gridArea = 'empty-top-right';
        chessBoardFields.push(emptyTopRightCell);

        const leftNumbersField = this.getNumberField();
        leftNumbersField.style.gridArea = 'left-numbers';
        chessBoardFields.push(leftNumbersField);

        const gameField = this.getGameField();
        gameField.style.gridArea = 'game-field';
        chessBoardFields.push(gameField);

        const rightNumbersField = this.getNumberField();
        rightNumbersField.style.gridArea = 'right-numbers';
        chessBoardFields.push(rightNumbersField);

        const emptyBottomLeftCell = this.getEmptyCell();
        emptyBottomLeftCell.style.gridArea = 'empty-bottom-left';
        chessBoardFields.push(emptyBottomLeftCell);

        const bottomLettersField = this.getLetterField();
        bottomLettersField.style.gridArea = 'bottom-letters';
        chessBoardFields.push(bottomLettersField);

        const emptyBottomRightCell = this.getEmptyCell();
        emptyBottomRightCell.style.gridArea = 'empty-bottom-right';
        chessBoardFields.push(emptyBottomRightCell);

        chessBoardFields.forEach(item => {
            container.append(item);
        });

        return container;
    },

    getLetterField: function () {
        const letterField = document.createElement('div');
        letterField.classList.add('letters-container');
        this.fillWithCells(letterField, 8);

        const column = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const cells = letterField.querySelectorAll('.chess-board_cell');
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = column[i];
        }

        return letterField;
    },

    getNumberField: function () {
        const numberField = document.createElement('div');
        numberField.classList.add('numbers-container');
        this.fillWithCells(numberField, 8);

        const column = ['8', '7', '6', '5', '4', '3', '2', '1'];
        const cells = numberField.querySelectorAll('.chess-board_cell');

        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = column[i];
        }

        return numberField;
    },

    getEmptyCell: function () {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('chess-board_cell', 'chess-board_cell__empty');
        return emptyCell;
    },

    getGameField: function () {
        const gameField = document.createElement('div');
        gameField.classList.add('game-fields-container');
        this.fillWithCells(gameField, 64);
        this.paintGameFieldCells(gameField);
        this.arrangeFigures(gameField);
        return gameField;
    },

    paintGameFieldCells: function(gameField) {
        const cells = gameField.querySelectorAll('.chess-board_cell'); // Получаем массив ячеек
        for (let i = 0; i < cells.length; i++) { // бежим по ячейкам и в зависимости от ряда и позиции красим в разный цвет
            if ((Math.floor(i / 8) + i) % 2) {
                cells[i].classList.add('chess-board_cell__black');
            } else {
                cells[i].classList.add('chess-board_cell__white');
            }
        }
    },

    arrangeFigures: function (gameField) {
        const cells = gameField.querySelectorAll('.chess-board_cell'); // Получаем массив ячеек
        const figures = ['rook', 'knight', 'bishop', 'king', 'queen', 'bishop', 'knight', 'rook'];

        for (let i = 0; i < cells.length; i++) {
            const row = Math.floor(i / 8);
            const column = i % 8;
            let image = document.createElement('img');
            image.alt = 'figure';

            if (row === 0) { // Выбираем первую строку и расставляем чёрные фигуры
                image.src = `./image/${figures[column]}-black.png`; // указываем путь к картинке
                cells[i].append(image);
                continue;
            }

            if (row === 1) {  // Выбираем вторую строку и аналогичным образом добавляем картинки чёрных пешек.
                image.src = './image/pawn-black.png';
                cells[i].append(image);
                continue;
            }

            if (row === 6) {// Выбираем предпоследнюю строку и добавляем белые пешки.
                image.src = './image/pawn-white.png';
                cells[i].append(image);
                continue;
            }

            if (row === 7) { // выбираем последнюю строку и расставляем остальные белые фигуры
                image.src = `./image/${figures[column]}-white.png`;
                cells[i].append(image);
            }
        }
    },

    fillWithCells: function (container, count) {
        for (let i = count; i >= 1; i--) {
            const cell = document.createElement('div');
            cell.classList.add('chess-board_cell');
            container.append(cell);
        }
    }
};

const newChessBoard = ChessBoard.init();
const container = document.querySelector('#page-content');
container.append(newChessBoard);