import { ReactComponent as  back } from './svgs/back.svg'

const icons = {
    back 
}

export const Icon = ({ name, ...props }) => {
    const Element = icons[name]
    return <Element {...props} />
}
