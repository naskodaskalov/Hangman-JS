$('document').ready(() => {
  let letters = 'abcdefghijklmnopqrstuvwxyz'
  let winMsg = 'You win! Do you want to play again?'
  let loseMsg = 'Game over! Do you want to play again?'
  let wordsArray = [
    'house',
    'chocolate',
    'card',
    'watch',
    'football',
    'rose'
  ]
  let errorDiv = $('<div>')
        .addClass('error')
  let infoDiv = $('<div>')
        .addClass('winBox')
  let choosedLetter = ''

  let guessedLetters = 0
  let currentWordDiv = $('.current-word')

  let maxLives = 5
  let ulList = $('<ul>')
  let inputField = $('#guessLetter')
  let submitBtn = $('#submitBtn')
  let infoPanel = $('.info-panel')
  let reloadBtn = $('<input>').attr('type', 'submit').attr('value', 'Reload').addClass('reloadBtn')
  let livesLeftDiv = $('<div>').addClass('lives-left-div').html(maxLives).append($('<span>').text('  \u2764'))
  let usedLettersHeading = 'used letters: '
  let usedLetters = []

  play()
  
  function play () {
    let choosedWord = wordsArray[Math.floor(Math.random() * wordsArray.length)]
    let lastLetterId = choosedWord.length - 1
    ulList
            .append($('<li>')
                .append($('<span>')
                    .addClass(`letter-number-${0}`)
                    .text(choosedWord[0])))

    for (let i = 1; i < choosedWord.length - 1; i++) {
      ulList
                .append($('<li>')
                    .append($('<span>')
                        .addClass(`letter-number-${i}`)
                        .css('visibility', 'hidden')
                        .text(choosedWord[i])))
    }

    ulList
            .append($('<li>')
                .append($('<span>')
                    .addClass(`letter-number-${lastLetterId}`)
                    .text(choosedWord[lastLetterId])))

    
    currentWordDiv.append(ulList)
    currentWordDiv.append(errorDiv)
    infoPanel.append(usedLettersHeading)
    infoPanel.append(livesLeftDiv)

    submitBtn.click((e) => {
      e.preventDefault()

      choosedLetter = inputField.val()
      inputField.val('')
      errorDiv.text('')
      livesLeftDiv.remove()
      usedLetters.push(choosedLetter)

      if (letters.indexOf(choosedLetter) === -1) {
        errorDiv.text('This letter is not correct')
        return
      }

      for (let i = 1; i < choosedWord.length - 1; i++) {
        if (choosedWord.charAt(i) === choosedLetter) {
          console.log(choosedLetter)
          $(`.letter-number-${i}`).css('visibility', 'visible')
          guessedLetters++
        }
      }

      for (let i = 0; i < usedLetters.length; i++) {
        
          usedLettersHeading = usedLetters[i] + ' '
      }

      if (choosedWord.slice(1, -1).indexOf(choosedLetter) < 0) {
        maxLives--
        livesLeftDiv = $('<div>').addClass('lives-left-div').html(maxLives).append($('<span>').text('  \u2764'))
        
        if (maxLives == 0) {
          inputField.attr('disabled', 'disabled')
          errorDiv.text(loseMsg)
          $('.container').append(reloadBtn.click(playAgain))        
        }
      }

      if (guessedLetters === choosedWord.length - 2) {
        infoDiv.text(winMsg)
        inputField.attr('disabled', 'disabled')
        currentWordDiv.append(infoDiv)

        $('.container').append(reloadBtn.click(playAgain))
      }

      infoPanel.append(usedLettersHeading)
      infoPanel.append(livesLeftDiv)
    })
  }

  function playAgain(e) {
      e.preventDefault()
      inputField.removeAttr('disabled')
      location.reload()
  }
})
