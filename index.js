

let inputHasListener = false
let lastWord = ''

setInterval(() => {
  const iframe = getIframe()
  if (!iframe) {
    return
  }

  const isMyTurn = getIsMyTurn(iframe)
  if (!isMyTurn) {
    console.log('Not my turn');
    return
  }

  const aimWord = getAimWord(iframe)
  const value = getValue(aimWord)
  lastWord = value

  if (!value) {
    console.log('No similar word');
    return
  }

  setValue(iframe, value)

  listenSubmit(iframe, value)
}, 1000)

function getIframe () {
  const iframe = document.querySelector('iframe')

  return iframe?.contentDocument
}

function getIsMyTurn (iframe) {
  console.log(iframe);
  const selfTurn = iframe.body.querySelector('.selfTurn')
  const isActive = selfTurn.getAttribute('hidden')

  return isActive === null
}

function getAimWord (iframe) {
  return iframe.body.querySelector('.syllable').innerHTML
}

function getValue (aimWord) {
  return allWords.find(item => item.includes(aimWord))
}

function setValue (iframe, word) {
  const input = iframe.body.querySelector('input.styled')
  input.value = word
}

function listenSubmit (iframe) {
  if (inputHasListener) {
    return
  }

  const input = iframe.body.querySelector('input.styled')

  input.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault()

      const index = allWords.findIndex(item => item.includes(lastWord))
      if (index > -1) {
        allWords.splice(index, 1)
      }
    }
  })

  inputHasListener = true
}
