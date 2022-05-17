class TicTacToe {
	constructor() {
		document.querySelector('body').addEventListener('click', this.playerMove.bind(this));
		this.emptySpaces = 9;
		this.winScenarios = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
		this.gameOver = false;
	}

	playerMove(event) {
		if (!this.gameOver) {
			let elementIdInnerText = event.target.innerText;
			if (!elementIdInnerText) {
				event.target.innerText = 'X';
			}
			this.emptySpaces--;
			this.checkWinCondition();
			if (this.emptySpaces) {
				this.computerMove();
			}
		}
	}

	computerMove() {
		if (!this.gameOver) {
			let randomNum = Math.ceil(Math.random() * 9);
			if (!this.getCell(randomNum).innerText) {
				this.getCell(randomNum).innerText = 'O';
				this.emptySpaces--;
				this.checkWinCondition();
			} else if (this.emptySpaces > 0) {
				this.computerMove();
			}
		}
	}

	getCell(n) {
		return document.querySelector(`#c${n}`);
	}

	getText(n) {
		return this.getCell(n).innerText;
	}

	checkWinCondition() {
		for (let i = 0; i < this.winScenarios.length; i++) {
			let scenario = this.winScenarios[i];
			if (
				this.getText(scenario[0]) === 'X' && 
				this.getText(scenario[1]) === 'X' && 
				this.getText(scenario[2]) === 'X'
			) {
				document.querySelector('body').style.backgroundColor = 'lightgreen';
				this.gameOver = true;
			} else if (
				this.getText(scenario[0]) === 'O' && 
				this.getText(scenario[1]) === 'O' && 
				this.getText(scenario[2]) === 'O'
			) {
				console.log('It\'s alive!');
				document.querySelector('body').style.backgroundColor = 'pink';
				this.gameOver = true;
			}
		}
	}
}

let newGame = new TicTacToe;