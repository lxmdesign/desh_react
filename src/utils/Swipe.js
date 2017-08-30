export function startMoveImg(e) {
    this.setState({
        hasMoveStyle: false
    })
    this.touchRange = e.touches[0].pageX
    e.preventDefault()
}

export function movingImg(length, e) {
    let moveDirection = this.touchRange - e.touches[0].pageX // 当滑动到边界时，再滑动会没有效果
    if ((this.count === 0 && moveDirection < 0) || (this.count === length - 1 && moveDirection > 0)) {
        return
    }

    let conunts = this.count * -this.screenWidth

    this.refs.carouselImg.style.webkitTransform = 'translate3d(' + (conunts - (this.touchRange - e.changedTouches[0].pageX)) + 'px, 0, 0)'
}

export function endMoveImg(length, itemImages, e) {

    this.setState({
        hasMoveStyle: true
    })

    if (this.touchRange - e.changedTouches[0].pageX > 100) {
        this.count++
        if (this.count === length) {
            this.count = length - 1
            return
        }
        this.setState({
            imgIndex: this.state.imgIndex + 1
        })
    } else if (this.touchRange - e.changedTouches[0].pageX < -100) {
        this.count--
        if (this.count < 0) {
            this.count = 0
            return
        }
        this.setState({
            imgIndex: this.state.imgIndex - 1
        })
    }

    this.refs.carouselImg.style.webkitTransform = 'translate3d(' + this.count * (-this.screenWidth) + 'px, 0, 0)'
}