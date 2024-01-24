import { CSSTransition } from 'react-transition-group';
import { Iitem } from '../../store/data-store/types.ts';
import { Comments } from '../comments/Comments.tsx';
import { regExpSortDescription } from '../../utils/replacelSymbols.ts';

export const ItemDetail = (props: Iitem) => {
  const {
    id,
    date,
    customer,
    comments,
    description,
    setOpen,
    open,
    handleClickItem
  } = props

  console.log(comments, 'comments')
  return (
    <CSSTransition in={open} classNames="show-body" timeout={300} unmountOnExit>
      <>
        <div className="accordion-body mt-2 text-wrap world-break d-flex flex-column">
          <div className="mb-1"><strong>id: </strong>{id}</div>
          <hr />
          <div><strong>Дата создания: </strong>{date?.create}</div>
          <hr />
          <div><strong>Назначено: </strong>{date?.todo}</div>
          <hr />
          <div><strong>Абонент: </strong>{customer?.fullName}</div>
          <hr />
          {customer?.login && <div><strong>Логин: </strong>{customer?.login}
            <hr />
          </div>
          }

          <div className="text-wrap"><strong>Описание: </strong>
            <br />{description?.replace(regExpSortDescription, '')}</div>
          <hr />
          {comments && <Comments {...comments}/>}
          <hr />
          <button className="btn btn-outline-secondary d-flex align-self-end btn-hover"
                  onClick={() => {
                    setOpen(false)
                    handleClickItem()
                  }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                 className="bi bi-arrows-collapse" viewBox="0 0 16 16">
              <path fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8m7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0m-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0z" />
            </svg>
          </button>

        </div>
      </>
    </CSSTransition>
  )
}