import React, { PureComponent } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css' // This only needs to be imported once in your app

class LightBox extends PureComponent {
    state = {
        index: 0
    }

    // static getDerivedStateFromProps(props, state) {
    //     const { selectedDialog, viewImage } = props
    //     const { images } = state
    //     if (!images && selectedDialog) {
    //         let images = [],
    //             messages = []
    //         selectedDialog.messages.forEach(m => {
    //             if (m.type === 'image') {
    //                 images.push(REACT_APP_SERVER + m.src)
    //                 messages.push(m)
    //             }
    //         })
    //         const photoIndex = images.findIndex(i => i.includes(viewImage))
    //         return {
    //             images,
    //             photoIndex,
    //             messages
    //         }
    //     }
    //     return null
    // }
    componentDidMount() {
        const { index } = this.props
        this.setState({ index })
    }

    // componentWillUnmount() {
    //     this.setState({ images: null })
    // }

    render() {
        const { index } = this.state
        const { close, images } = this.props
        const nextSrc = (index + 1) % images.length
        const prevSrc = (index + images.length - 1) % images.length
        return (
            <Lightbox
                imageCaption={`${index + 1}/${images.length}`}
                mainSrc={images[index]}
                nextSrc={images.length > 1 ? images[nextSrc] : undefined}
                prevSrc={images.length > 1 ? images[prevSrc] : undefined}
                onCloseRequest={() => close()}
                onMovePrevRequest={() =>
                    this.setState({
                        index: prevSrc
                    })
                }
                onMoveNextRequest={() =>
                    this.setState({
                        index: nextSrc
                    })
                }
            />
        )
    }
}

export default LightBox
