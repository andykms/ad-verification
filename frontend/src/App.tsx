import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './styles/global.css'
import './styles/variables.css'
import './styles/fonts.css'
import { AdsPresenter } from './presenters/AdsPresenter'
import { ItemPresenter } from './presenters/ItemPresenter'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'
import { StatsPresenter } from './presenters/StatsPresenter'
import { MainPresenter } from './presenters/MainPresenter'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPresenter />}></Route>
      <Route path="/list" element={<AdsPresenter />} />
      <Route path="/item/:id" element={<ItemPresenter />} />
      <Route path="/stats" element={<StatsPresenter />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
