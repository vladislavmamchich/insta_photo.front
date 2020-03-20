import React, { Component } from 'react'
import ReactSelect from 'react-select'

import { colors } from '../../constants'

const height = 24

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        // borderBottom: `1px solid ${colors.white}`,
        color: state.isSelected ? colors.blue : colors.white,
        background: 'transparent',
        padding: 3
    }),
    control: provided => ({
        ...provided,
        // width: '100%',
        color: '#fff',
        height,
        minHeight: height,
        background: 'transparent',
        cursor: 'pointer',
        border: 'none'
    }),
    menu: () => ({
        width: '100%',
        color: '#fff',
        border: `1px solid ${colors.white}`,
        padding: 0,
        position: 'absolute',
        zIndex: 100,
        background: colors.coral
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1
        const transition = 'opacity 300ms'

        return {
            ...provided,
            opacity,
            transition,
            color: '#fff',
            height,
            lineHeight: `${height}px`
        }
    },
    indicatorsContainer: provided => ({
        ...provided,
        height: '22px'
    }),
    dropdownIndicator: provided => ({
        ...provided,
        color: colors.white,
        padding: 0
    }),
    valueContainer: provided => ({
        ...provided,
        height,
        padding: 0
    }),
    container: (provided, { selectProps }) => ({
        ...provided,
        width: selectProps.width
    }),
    indicatorSeparator: () => ({
        display: 'none'
    }),
    placeholder: provided => ({
        ...provided,
        color: colors.white
    })
}

class GeoSelect extends Component {
    state = {
        selectedOption: null,
        options: [],
        placeholder: 'Select'
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            nextProps.options &&
            (nextProps.options.length !== prevState.options.length ||
                JSON.stringify(nextProps.options) !==
                    JSON.stringify(prevState.options))
        ) {
            return {
                options: nextProps.options,
                selectedOption: nextProps.options[0]
            }
        }
        return null
    }
    handleChange = selectedOption => {
        const { onChange } = this.props
        this.setState({ selectedOption })
        if (onChange instanceof Function) {
            onChange(selectedOption)
        }
    }
    // componentDidUpdate() {
    //     const { selected, options } = this.props
    //     const { selectedOption } = this.state
    //     if (selected !== undefined && selectedOption.value !== selected) {
    //         this.setState({
    //             selectedOption:
    //                 options.find(o => o === selected || o.value === selected) ||
    //                 options[0]
    //         })
    //     }
    // }
    componentDidMount() {
        const { options, selected } = this.props
        if (options) {
            let selectedOption = options[0]
            if (selected) {
                selectedOption = options.find(o => o === selected) || options[0]
            }
            this.setState({ options, selectedOption })
        }
    }
    render() {
        const { selectedOption, options, placeholder } = this.state
        const { className, width, isDisabled } = this.props
        return (
            <ReactSelect
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
                styles={customStyles}
                className={`${className || ''}`}
                isSearchable={false}
                width={width || '140px'}
                placeholder={placeholder}
                isDisabled={isDisabled}
            />
        )
    }
}

export default GeoSelect
