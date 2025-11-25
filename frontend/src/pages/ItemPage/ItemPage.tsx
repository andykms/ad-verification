import { useEffect, useState } from 'react'
import style from './ItemPage.module.css'
import { ImageCarousel } from '../../components/ui/ImageCarousel/ImageCarousel'
import { KeyValueList } from '../../components/ui/KeyValueList/KeyValueList'
import { ActionHistory } from '../../components/ui/ActionHistory/ActionHistory'
import { Button } from '../../components/ui/Button/Button'
import { ModalReject } from '../../components/widgets/ModalReject/ModalReject'
import { ArrowButton } from '../../components/ui/ArrowButton/ArrowButton'
import { SearchInput } from '../../components/ui/SearchInput/SearchInput'

export interface ProductHistory {
  moderator: string
  action: string
  comment: string
  date: string
}

export interface ProductSeller {
  id: number
  name: string
  rating: string
  totalAds: number
  registeredAt: string
}

export interface ProductPage {
  id: number
  images: string[]
  title: string
  price: number
  category: string
  createdAt: string
  status: string
  priority: 'normal' | 'urgent'
  description: string
  updatedAt: string
  characteristics: Record<string, string>
  moderationHistory: ProductHistory[]
  seller: ProductSeller
}

export interface ProductPageProps {
  product: ProductPage
  onNextPage: () => void
  onPrevPage: () => void
  onApprove: () => void
  onReject: (reason: string, comment: string) => void
  onRequestChanges: (reason: string, comment: string) => void
  onBack: () => void
  blockNextNav: boolean
  blockPrevNav: boolean
  onSearch: (query: string) => void
}

export const ProductPage = (props: ProductPageProps) => {
  const {
    product,
    onNextPage,
    onPrevPage,
    onApprove,
    onReject,
    onRequestChanges,
    onBack,
    blockNextNav,
    blockPrevNav,
    onSearch,
  } = props

  const [openedRejectReason, setOpenedReason] = useState<boolean>(false)

  const [openedChanges, setOpenedChanges] = useState<boolean>(false)

  const handleReject = () => {
    setOpenedReason(true)
  }

  const handleSubmitReject = (reason: string, comment: string) => {
    setOpenedReason(false)
    onReject(reason, comment)
  }

  const handleChanges = () => {
    setOpenedChanges(true)
  }

  const handleSubmitChanges = (reason: string, comment: string) => {
    setOpenedChanges(false)
    onRequestChanges(reason, comment)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      onPrevPage()
    }
    if (e.key === 'ArrowRight') {
      onNextPage()
    }
    if (e.key.toLowerCase() === 'a') {
      onApprove()
    }
    if (e.key.toLowerCase() === 'd') {
      handleReject()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <>
      <section className={style.productPage}>
        <SearchInput onEnter={onSearch}></SearchInput>
        <div className={style.productInfo}>
          <ImageCarousel type="large" images={product.images} />
          <ActionHistory actions={product.moderationHistory} />
        </div>
        <div className={style.productAbout}>
          <div className={style.sellerInfo}>
            <h2 className={style.sellerTitle}>Продавец</h2>
            <ul className={style.sellerList}>
              <li>{product.seller.name}</li>
              <li>{`Рейтинг: ${product.seller.rating}`}</li>
              <li>{`Всего объявлений: ${product.seller.totalAds}`}</li>
              <li>{`Регистрация: ${product.seller.registeredAt}`}</li>
            </ul>
          </div>
          <h1 className={style.productTitle}>{product.title}</h1>
          <div className={style.productDescription}>
            <h2 className={style.descriptionTitle}>Описание</h2>
            <p className={style.descriptionText}>{product.description}</p>
          </div>
          <KeyValueList
            title="Характеристики товара"
            data={product.characteristics}
          />
        </div>
        <div className={style.actions}>
          <div className={style.productActions}>
            <Button onClick={onApprove} type="primary">
              Одобрить
            </Button>
            <Button onClick={handleReject} type="danger">
              Отклонить
            </Button>
            <Button onClick={handleChanges} type="warning">
              Доработка
            </Button>
          </div>
          <nav className={style.productNav}>
            <Button
              onClick={onBack}
              type="transparent"
              styles={{ textDecoration: 'underline' }}
            >
              &lt; К списку
            </Button>
            <div className={style.productNavButtons}>
              {!blockPrevNav && (
                <ArrowButton
                  onClick={onPrevPage}
                  direction="left"
                ></ArrowButton>
              )}
              {!blockNextNav && (
                <ArrowButton
                  onClick={onNextPage}
                  direction="right"
                ></ArrowButton>
              )}
            </div>
          </nav>
        </div>
      </section>
      {openedRejectReason && (
        <ModalReject
          onSubmit={handleSubmitReject}
          onClose={() => setOpenedReason(false)}
        ></ModalReject>
      )}
      {openedChanges && (
        <ModalReject
          onSubmit={handleSubmitChanges}
          onClose={() => setOpenedChanges(false)}
        ></ModalReject>
      )}
    </>
  )
}
