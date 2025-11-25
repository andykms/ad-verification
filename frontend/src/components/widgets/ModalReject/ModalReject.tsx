import { useState, type ChangeEvent } from 'react'
import style from './ModalReject.module.css'
import { SingleSelectDropdown } from '../../ui/SingleSelectDropdown/SingleSelectDropdown'
import { Modal } from '../../ui/Modal/Modal'
import { Button } from '../../ui/Button/Button'

export const rejectReasons = [
  'Запрещённый товар',
  'Неверная категория',
  'Некорректное описание',
  'Проблемы с фото',
  'Подозрение на мошенничество',
  'другое',
]

export interface ModalRejectProps {
  onClose: () => void
  onSubmit: (reason: string, comment: string) => void
}

export const ModalReject = (props: ModalRejectProps) => {
  const { onClose, onSubmit } = props

  const [choosenOption, setChoosenOption] = useState<string | null>(null)

  const [comment, setComment] = useState<string>('')

  const handleSelect = (choosen: string | null) => {
    if (choosen == null) {
      setChoosenOption(null)
      return
    }
    if (choosen && rejectReasons.includes(choosen)) {
      setChoosenOption(choosen)
    }
  }

  return (
    <Modal onClose={onClose} width="300px" height="400px">
      <section className={style.reject}>
        <h2 className={style.title}>Укажите причину</h2>
        <SingleSelectDropdown
          initialSelected={choosenOption}
          options={rejectReasons}
          onChange={handleSelect}
        />
        <textarea
          className={style.comment}
          placeholder="Комментарий"
          value={comment}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setComment(e.target.value)
          }
        ></textarea>
        <Button
          type="danger"
          onClick={() => onSubmit(choosenOption!, comment)}
          disabled={choosenOption === null}
          styles={{ marginTop: 'auto', width: '100%' }}
        >
          Подтвердить
        </Button>
      </section>
    </Modal>
  )
}
