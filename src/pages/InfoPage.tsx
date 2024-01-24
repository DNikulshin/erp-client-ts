import {useEffect, useState} from "react";
import {useDataStore} from "../store/data-store/data-store.ts";
import {useDebounce} from 'use-debounce'
export const InfoPage = () => {
    const [inputValue, setInputValue] = useState('')
    const [value] = useDebounce(inputValue, 500)
    const getOwners = useDataStore((state) => state.getOwners)
    const owners = useDataStore((state) => state.owners)
    const [openOwners, setOpenOwners] = useState(false)

    const filteredOwner = owners.filter(owner => {
        if (value) {
            return owner.address?.toLowerCase().includes(value.toLowerCase()) ||
                owner.name?.toLowerCase().includes(value.toLowerCase())

        }
        return owners
    })


    useEffect(() => {
        getOwners()
    }, [getOwners])

    return (
        <>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">@</span>
                </div>
                <input type="text" className="form-control"
                       placeholder="Поиск..." aria-label="Username"
                       aria-describedby="basic-addon1"
                       onChange={(e) => setInputValue(e.target.value)}
                />
            </div>
            <div className="d-flex justify-content-around align-items-center mb-2">
                <button className="btn btn-outline-primary"
                        onClick={() => setOpenOwners(prevState => !prevState)}>
                    Собственники объектов
                </button>
                {/*<button className="btn btn-outline-primary btn-hover"*/}
                {/*        onClick={() => setOpenOwners(false)}>*/}
                {/*    Блокнот*/}
                {/*</button>*/}
            </div>
            {/*{!openOwners && <Notepad/>}*/}
            {openOwners && <ul className="list-group d-flex flex-column gap-2 mb-5">
                {owners && filteredOwner.map((item, idx) => {
                    return (
                        <li className="list-group-item" key={item?.name}>
                            <small className="fw-bold mx-1">#{idx + 1}</small>
                            {item?.address}
                            <p>{item?.name}</p>
                            <a href={'tel:' + item?.phone}>{item?.phone}</a>
                        </li>
                    )
                })}
            </ul>}
            {!filteredOwner.length && <p className="text-danger text-center">Не найдено.</p>}
        </>

    )
}