document.addEventListener('DOMContentLoaded', () => {
    const columns = 7; // Nombre de colonnes dans la grille
    const rows = 6; // Nombre de rangées dans la grille
    const board = []; // Tableau pour représenter la grille du jeu
    let currentPlayer = 1; // Le joueur actuel (1 ou 2)
    let gameActive = true; // Indicateur pour savoir si le jeu est actif

    // Références aux éléments HTML
    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');
    const resetButton = document.getElementById('reset');

    // Initialisation du plateau de jeu
    for (let row = 0; row < rows; row++) 
    {
        const rowArray = []; // Crée une nouvelle rangée
        for (let col = 0; col < columns; col++) 
        {
            const cell = document.createElement('div'); 
            cell.classList.add('cell', 'empty'); 
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick); 
            boardElement.appendChild(cell);
            rowArray.push(cell);
        }
        board.push(rowArray); 
    }

    // Gestionnaire de clics sur une cellule
    function handleCellClick(e)
    {
        if (!gameActive) return; // Ne fait rien si le jeu n'est pas actif

        const col = e.target.dataset.col; // Récupère l'indice de la colonne cliquée
        const row = getAvailableRow(col); // Trouve la première rangée vide dans cette colonne

        if (row !== null) 
        { // Si une rangée vide est trouvée
            board[row][col].classList.remove('empty'); // Marque la cellule comme non vide
            board[row][col].classList.add(`player${currentPlayer}`); // Marque la cellule avec le joueur actuel

            if (checkWin(row, col)) 
            {
                statusElement.textContent = `Le joueur ${currentPlayer} a gagné !`; // Affiche le message de victoire
                gameActive = false; // Met fin au jeu
            }
            else if (board.flat().every(cell => !cell.classList.contains('empty'))) 
            { // Vérifie si toutes les cellules sont remplies (match nul)
                statusElement.textContent = `Match nul !`; // Affiche le message de match nul
                gameActive = false; // Met fin au jeu
            }
            else 
            { // si la partie n'est pas finie, on change le tour du joueur
                if (currentPlayer == 1)
                {
                    currentPlayer = 2;
                }
                else
                {
                    currentPlayer = 1;
                }
                statusElement.textContent = `Tour du joueur ${currentPlayer}`; // Affiche le message pour le tour du prochain joueur
            }
        }
    }

    // Trouve la première ligne vide dans une colonne
    function getAvailableRow(col) {
        for (let row = rows - 1; row >= 0; row--) 
        { // Parcourt les rangées de bas en haut
            if (board[row][col].classList.contains('empty')) 
            { 
                return row;
            }
        }
        return null;
    }

    

    function checkWin(row, col) {
        // Définit les quatre directions dans lesquelles nous allons vérifier les alignements:
        // Horizontal (droite et gauche), vertical (haut et bas), diagonale montante (en bas à gauche et en haut à droite), diagonale descendante (en bas à droite et en haut à gauche)
        const directions = [
            { dr: 0, dc: 1 },  
            { dr: 1, dc: 0 },  
            { dr: 1, dc: 1 },  
            { dr: 1, dc: -1 }  
        ];
       
        for (const { dr, dc } of directions) {
            let count = 1; // Compteur pour suivre le nombre de jetons alignés
            
            // Vérifie dans la direction positive
            /// problème dans cette petite boucle for idk
            for (let i = 1; i < 4; i++) {
                let r = row + (dr * i); 
                let c = col + (dc * i); 
                if (r < 0 || r >= rows || c < 0 || c >= columns || !board[r][c] || !board[r][c].classList.contains(`player${currentPlayer}`)) 
                {
                    break; 
                }
                count++; 
            }
            console.log(count);
            // Vérifie dans la direction négative
            for (let i = 1; i < 4; i++) {
                let r = row - (dr * i); 
                let c = col - (dc * i); 
                if (r < 0 || r >= rows || c < 0 || c >= columns || !board[r][c] || !board[r][c].classList.contains(`player${currentPlayer}`)) 
                {
                    break; 
                }
                count++;
            }
            console.log(count);
            if (count >= 4) {
                return true; 
            }
        }
        // Si aucune direction ne contient 4 jetons alignés, retourne faux
        return false;
    }

    // Réinitialise le jeu
    resetButton.addEventListener('click', resetGame);

    function resetGame() {
        for (let row = 0; row < rows; row++) 
        {
            for (let col = 0; col < columns; col++) 
            {
                board[row][col].classList.remove('player1', 'player2'); // Enlève les marques des joueurs
                board[row][col].classList.add('empty'); // Marque toutes les cellules comme vides
            }
        }
        currentPlayer = 1; // Réinitialise le joueur actuel
        gameActive = true; // Réactive le jeu
        statusElement.textContent = `Tour du joueur ${currentPlayer}`; // Affiche le message pour le tour du premier joueur
    }

    // Initialisation de l'état du jeu
    resetGame();
});