import { IDivision, IEmployee, useUserStore } from '../../store/user-store/user-store.ts'
import { AdditionalData } from './AdditionalData.tsx'
import { AllowStaffAndDivisionList } from './AllowStaffAndDivision/AllowStaffAndDivisionList.tsx'
import { DateTime } from './DateTime.tsx'
import { DetailArrow } from './detailArrow.tsx'
import { Employee } from './employee/Employee.tsx'
import { Division } from './division/Division.tsx'
import { ItemDetail } from './ItemDetail.tsx'
import { ItemStatus } from './ItemStatus.tsx'
import { MouseEventHandler, useCallback, useRef, useState } from 'react'
import { IItem } from '../../store/data-store/types.ts'
import { useDataStore } from '../../store/data-store/data-store.ts'
import { MapItem } from '../MapItem.tsx'
import { replaceSpecialSymbols } from '../../utils/replacelSymbols.ts'

export const Item = (props: IItem) => {
  const {
    id,
    staff,
    address,
    type,
    numberItem
  } = props

  const [open, setOpen] = useState(false)
  const refItem = useRef<HTMLDivElement | null>(null)
  const [switchComponent, setSwitchComponent] = useState(false)
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 })
  const getCoordinates = useDataStore(state => state.getCoordinates)
  const getAllowStaff = useDataStore(state => state.getAllowStaff)
  const getEmployees = useUserStore(state => state.getEmployees)
  const getDivisions = useUserStore(state => state.getDivisions)
  const [isEdit, setIsEdit] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const [staffNames, setStaffNames] = useState<IEmployee[]>([])
  const [divisionsNames, setDivisionsNames] = useState<IDivision[]>([])

  const handleOpen: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    setOpen(!open)
  }

  const handleClickItem = () => {
    if (refItem.current) {
      refItem.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const AllowStaffAndDivisionHandler = useCallback(async () => {
    const data = await getAllowStaff(id)
    const staffResponse = await getEmployees(data.staff.join(','))
    const divisionResponse = await getDivisions(data.division.join(','))
    if (staffResponse) setStaffNames(staffResponse)
    if (divisionResponse) setDivisionsNames(divisionResponse)
    setIsAdd(prevState => !prevState)
  }, [getAllowStaff, getDivisions, getEmployees, id])


  const getMap = async (claimId: number | undefined) => {
    if (claimId) {
      getCoordinates(claimId)
        .then((data) => {
          if (data?.lat && data?.lon) {
            setCoordinates({ lat: data.lat, lon: data.lon })
          }
          setSwitchComponent(true)
        })
    }
  }

  if (switchComponent) {
    if (coordinates.lat && coordinates.lon) {
      return <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
        <MapItem coordinates={coordinates} />
        <button onClick={() => setSwitchComponent(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               className="bi bi-arrow-return-left" viewBox="0 0 16 16">
            <path fillRule="evenodd"
                  d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5" />
          </svg>
        </button>
      </div>
    }
  }
  return (
    <>
      <div className="accordion-item box-shadow position-relative" ref={refItem}>
        <div className="accordion-header flex flex-column">
          <div
            className={!open
              ? 'accordion-button'
              : 'accordion-button btn-accordion-active'}
          >
            <div className="content-btn d-flex flex-wrap align-items-center">
              <div className="d-flex align-items-center justify-content-between w-100">
                <small className=" me-3 d-flex">#{numberItem}</small>
                <div className="btn btn-hover fs-4 d-flex"
                     onClick={() => getMap(address?.addressId)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                       className="bi bi-geo-alt-fill text-danger" viewBox="0 0 16 16">
                    <path
                      d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                  </svg>
                </div>
                <div className="d-flex flex-wrap  align-items-center">
                  <strong
                    className="text-secondary d-flex">
                    <span className="me-1"> id:</span>
                  </strong>
                  <div className="btn btn-primary text-white d-flex box-shadow"
                       onClick={handleOpen}
                  >
                                <span
                                  className="text-white text-decoration-none"
                                >
                                {id}
                                </span>
                  </div>
                </div>
              </div>

              {address?.text && <div className="w-100">
                <hr className="w-75" />
                <strong className="me-2">Адрес:</strong>
                {address?.text}
              </div>}
              <DetailArrow handleOpen={handleOpen} open={open} />
              <DateTime {...props} />
              <ItemStatus {...props} />
              {type?.name && <div><strong className="me-2">Тип:</strong>{replaceSpecialSymbols(type?.name)}</div>}

              <AdditionalData {...props} />
              <div className="w-100 d-flex flex-wrap position-relative">
                <hr className="w-75" />
                <Employee staff={staff} id={id} isEdit={isEdit}/>
                <Division staff={staff} id={id} isEdit={isEdit} />
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="30"
                     height="30"
                     fill="currentColor"
                     className="bi bi-pencil-square btn-edit box-shadow btn-target"
                     style={isEdit ? { color: 'brown' } : { color: 'inherit' }}
                     viewBox="0 0 16 16"
                     onClick={() => setIsEdit(prevState => !prevState)}
                >
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
                {isEdit &&
                  <>
                    {isAdd &&
                      <AllowStaffAndDivisionList
                        staffNames={staffNames}
                        divisionsNames={divisionsNames}
                        id={id}
                      />
                    }
                    <svg xmlns="http://www.w3.org/2000/svg"
                         width="28"
                         height="28"
                         fill="currentColor"
                         className="bi bi-plus-square box-shadow btn-add btn-target"
                         viewBox="0 0 16 16"
                         onClick={AllowStaffAndDivisionHandler}
                    >
                      <path
                        d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                      <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
        <ItemDetail
          {...props}
          setOpen={setOpen}
          open={open}
          handleClickItem={handleClickItem}
          itemId={id}
        />
      </div>
    </>
  )
}
