import { useState, useEffect } from 'react'
import './Popup.css'

function App() {
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    // Retrieve volume value from local storage
    chrome.storage.sync.get('volume', (result) => {
      setVolume(result.volume || 1)
    })
  }, [])

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value
    setVolume(newVolume)
    // Save new volume value to local storage
    chrome.storage.sync.set({ volume: newVolume })
  }

  return (
    <main>
      <div className="branding">
        <h3>ChatGPT Notification</h3>
      </div>
      <div className="volume-control">
        <label htmlFor="volume-slider">Volume</label>
        <input
          id="volume-slider"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
        <span>{Math.round(volume * 100)}%</span>
      </div>
    </main>
  )
}

export default App
