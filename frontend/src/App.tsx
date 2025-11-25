import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './styles/global.css'
import './styles/variables.css'
import './styles/fonts.css'
import { useLocalStorage } from './hooks/useLocalStorage'
import { AdsPresenter } from './presenters/AdsPresenter'
import { ItemPresenter } from './presenters/ItemPresenter'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'
import { StatsPresenter } from './presenters/StatsPresenter'
import { MainPresenter } from './presenters/MainPresenter'
import { SettingsPage } from './pages/SettingsPage/SettingsPage'

type Theme = 'light' | 'dark'

const App: React.FC = () => {
  const [theme] = useLocalStorage<Theme>('theme', 'light')

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [theme])

  return (
    <Routes>
      <Route path="/" element={<MainPresenter />}></Route>
      <Route path="/list" element={<AdsPresenter />} />
      <Route path="/item/:id" element={<ItemPresenter />} />
      <Route path="/stats" element={<StatsPresenter />} />
      <Route path="/settings" element={<SettingsPage />}></Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
