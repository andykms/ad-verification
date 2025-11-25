import style from './Error.module.css'
import { ArrowButton } from '../../components/ui/ArrowButton/ArrowButton'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button/Button'

export const ErrorPage = ({ error }: { error?: string }) => {
  const navigate = useNavigate()

  return (
    <div className={style.notFoundPage}>
      <h1 className={style.title}>500</h1>
      <span className={style.subtitle}>
        {error ? error : 'Что-то пошло не так'}
      </span>
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
