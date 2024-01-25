export interface Iitem {
    index?: number
    id?: number
    parentTaskId?: number
    priority?: number
    type?: Type
    date?: Date | undefined
    state?: any
    customer?: Customer
    address?: Address
    node?: any[]
    description?: string
    description_short?: string
    author_employee_id?: number
    employee?: any[]
    priceCustom?: string
    volumeCustom?: string
    comments?: Comment[]
    additional_data?: additionalDate[]
    staff?: {
        division?: object | undefined
        employee?: object | undefined
    }
    history?: History[],
    setOpen?: (bool: boolean) => void,
    handleClickItem?: () => void,
    open?: boolean,
    isEdit: boolean
}

export interface Type {
    id: number
    name: string | undefined
}

export interface Date {
    create: string
    todo?: any
    update: string
    complete: any
    deadline_individual_hour: string
    runtime_individual_hour: number
}

export interface State {
    id: number
    name: string
    systemRole: number
}

export interface Customer {
    id: number
    fullName: string
    login: string
    dateActivity: string
}

export interface Address {
    text: string
    addressId: number
    apartament: string
}

export interface History {
    type: number
    date: string
    employee_id: number
    param1: number
    comment: string
}

export interface Comment {
    id: number
    dateAdd: string
    employee_id: number | string
    comment: string
}

export interface additionalDate {
    id: number
    caption: string,
    value: string
}
