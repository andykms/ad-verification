import style from './NotFoundPage.module.css'
import { ArrowButton } from '../../components/ui/ArrowButton/ArrowButton'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button/Button'

export const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className={style.notFoundPage}>
      <h1 className={style.title}>404</h1>
      <span className={style.subtitle}>Страница не найдена</span>
      <div className={style.navigation}>
        <ArrowButton
          direction="left"
          leftTitle="На главную"
          onClick={() => navigate('/')}
        ></ArrowButton>
        <Button onClick={() => navigate(-1)} type="secondary">
          Назад
        </Button>
      </div>
    </div>
  )
}
