import { useRef, useState } from 'react'
import './App.css'

import imgAntonio from './assets/images/antonio.jpeg'
import imgBicha    from './assets/images/bicha.jpeg'
import imgCabra    from './assets/images/cabra.png'
import imgCj       from './assets/images/cj.png'
import imgMete     from './assets/images/mete-tua-vida.png'
import imgPatrick  from './assets/images/patrick.png'
import imgPiru     from './assets/images/peru.png'

import sndAntonio from './assets/audios/antonio.m4a'
import sndBicha    from './assets/audios/bicha.m4a'
import sndCabra    from './assets/audios/cabra.m4a'
import sndCjtinha  from './assets/audios/cjtinha.m4a'
import sndMete     from './assets/audios/metetenatuavida.m4a'
import sndPatrick  from './assets/audios/patrick.m4a'
import sndPiru     from './assets/audios/piru.m4a'

const sounds = [
  { id: 'antonio',         label: 'Antonio',         file: sndAntonio, image: imgAntonio },
  { id: 'bicha',           label: 'Bicha',            file: sndBicha,   image: imgBicha   },
  { id: 'cabra',           label: 'Cabra',            file: sndCabra,   image: imgCabra   },
  { id: 'cjtinha',         label: 'CJ Tinha',         file: sndCjtinha, image: imgCj      },
  { id: 'metetenatuavida', label: 'Mete na Tua Vida', file: sndMete,    image: imgMete    },
  { id: 'patrick',         label: 'Patrick',          file: sndPatrick, image: imgPatrick },
  { id: 'piru',            label: 'Piru',             file: sndPiru,    image: imgPiru    },
]

function SoundButton({ sound, isPlaying, isSpinning, onClick }) {
  return (
    <button
      className={`sound-btn ${isPlaying ? 'playing' : ''} ${isSpinning ? 'spinning' : ''}`}
      onClick={() => onClick(sound)}
      title={sound.label}
    >
      <div className="btn-image-wrapper">
        <img
          src={sound.image}
          alt={sound.label}
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div className="btn-placeholder-icon">🔊</div>
      </div>
      <span className="btn-label">{sound.label}</span>
      {isPlaying && (
        <div className="sound-wave">
          <span/><span/><span/><span/>
        </div>
      )}
    </button>
  )
}

export default function App() {
  const [playingId, setPlayingId] = useState(null)
  const [playingAll, setPlayingAll] = useState(false)
  const audioRef = useRef(null)
  const allAudiosRef = useRef([])

  function stopAll() {
    allAudiosRef.current.forEach((a) => { a.pause(); a.currentTime = 0 })
    allAudiosRef.current = []
    setPlayingAll(false)
  }

  function handlePlay(sound) {
    stopAll()

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    if (playingId === sound.id) {
      setPlayingId(null)
      return
    }

    const audio = new Audio(sound.file)
    audioRef.current = audio
    setPlayingId(sound.id)

    audio.play().catch(console.error)
    audio.onended = () => setPlayingId(null)
  }

  function handlePlayAll() {
    if (playingAll) {
      stopAll()
      return
    }

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setPlayingId(null)

    const audios = sounds.map((s) => new Audio(s.file))
    allAudiosRef.current = audios
    setPlayingAll(true)

    audios.forEach((a) => a.play().catch(console.error))

    Promise.all(
      audios.map((a) => new Promise((res) => { a.onended = res }))
    ).then(() => setPlayingAll(false))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎵 Wonton's Sound</h1>
        <p>Time MORE forever</p>
      </header>
      <main className="sound-grid">
        {sounds.map((sound) => (
          <SoundButton
            key={sound.id}
            sound={sound}
            isPlaying={playingId === sound.id}
            isSpinning={playingAll || playingId === sound.id}
            onClick={handlePlay}
          />
        ))}
        <button
          className={`sound-btn play-all-btn ${playingAll ? 'playing' : ''}`}
          onClick={handlePlayAll}
          title="Tocar todos"
        >
          <div className="btn-image-wrapper">
            <div className="btn-placeholder-icon">{playingAll ? '⏹️' : '🎉'}</div>
          </div>
          <span className="btn-label">{playingAll ? 'Parar' : 'Todos!'}</span>
          {playingAll && (
            <div className="sound-wave">
              <span/><span/><span/><span/>
            </div>
          )}
        </button>
      </main>
    </div>
  )
}
