import { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import { a_setModal } from '../../redux/actions'

const modalRoot = document.getElementById('modal-root')

class Modal extends PureComponent {
    constructor(props) {
        super(props)
        this.el = document.createElement('div')
        this.body = document.querySelector('body')
        this.el.classList.add('my-modal-window')
        this.el.classList.add('pt-5')
        this.body.classList.add('modal-open')
    }

    componentDidMount() {
        document.addEventListener('click', this.onOutClick, false)
        modalRoot.appendChild(this.el)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onOutClick, false)
        modalRoot.removeChild(this.el)
        this.body.classList.remove('modal-open')
    }

    onOutClick = e => {
        const modal = document.querySelector('.modal-content')
        if (!modal.contains(e.target)) {
            // console.log(e.target)
            // console.log('not contain')
            this.props.setModal(null)
        }
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el)
    }
}
const mapDispatchToProps = dispatch => ({
    setModal: payload => {
        dispatch(a_setModal(payload))
    }
})
export default connect(null, mapDispatchToProps)(Modal)
