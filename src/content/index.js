let url = location.href

if (url.includes('chat.openai.com')) {
  // ChatGPT generation done notification
  const body = document.querySelector('body')
  let startedGeneration = false
  let isGenerating = false
  let isGenerationDone = false

  // Init an observer to check if a generation is done
  // By checking for a button with the text "Regenerate response"
  new MutationObserver(() => {
    isGenerating = body && body.innerHTML.indexOf('Stop generating') != -1

    if (isGenerating && !startedGeneration && !isGenerationDone) {
      startedGeneration = true
    }

    if (!isGenerating && startedGeneration) {
      startedGeneration = false
      isGenerationDone = true
    }

    if (isGenerationDone) {
      isGenerationDone = false
      onGenerationDone()
    }
  }).observe(document, { subtree: true, childList: true })

  async function getStorageValuePromise(key) {
    const result = await new Promise((resolve) => {
      chrome.storage.sync.get(key, resolve)
    })
    return result[key]
  }

  const onGenerationDone = async () => {
    // Volume control
    const volume = await getStorageValuePromise('volume')

    const audio = new Audio(chrome.runtime.getURL('audio/notification.mp3'))
    audio.volume = volume || 1

    console.log('Generation done!')

    // Play sound with volume
    audio.currentTime = 0
    audio.play()
  }
}
