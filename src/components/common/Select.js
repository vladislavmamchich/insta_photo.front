import React, { Component } from 'react'
import ReactSelect from 'react-select'

import {
    colors,
    sex,
    countries,
    regions,
    localities,
    nationalities,
    ages
} from '../../constants'

const height = 24

const defOptions = [
    { value: 'all countries', label: 'all countries' },
    { value: 'all regions', label: 'all regions' },
    { value: 'all localities', label: 'all localities' }
]

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

class Select extends Component {
    state = {
        selectedOption: null,
        options: [],
        placeholder: 'Select'
    }
    handleChange = selectedOption => {
        this.setState({ selectedOption }, () =>
            console.log(`Option selected:`, this.state.selectedOption)
        )
        this.props.onChange(selectedOption.value)
    }
    componentDidMount() {
        const { type, options } = this.props
        if (options) {
            this.setState({ options, selectedOption: options[0] })
        } else {
            this.setState({ options: [type], selectedOption: [type][0] })
            switch (type) {
                case 'sex':
                    this.setState({ options: sex, selectedOption: sex[0] })
                    break
                case 'countries':
                    this.setState({
                        options: countries,
                        selectedOption: countries[0]
                    })
                    break
                case 'country':
                    this.setState({
                        options: countries.slice(1),
                        selectedOption: null,
                        placeholder: 'country'
                    })
                    break
                case 'regions':
                    this.setState({
                        options: regions,
                        selectedOption: regions[0]
                    })
                    break
                case 'region':
                    this.setState({
                        options: regions.slice(1),
                        selectedOption: null,
                        placeholder: 'region'
                    })
                    break
                case 'localities':
                    this.setState({
                        options: localities,
                        selectedOption: localities[0]
                    })
                    break
                case 'locality':
                    this.setState({
                        options: localities.slice(1),
                        selectedOption: null,
                        placeholder: 'locality'
                    })
                    break
                case 'nationalities':
                    this.setState({
                        options: nationalities,
                        selectedOption: nationalities[0]
                    })
                    break
                case 'nationality':
                    this.setState({
                        options: nationalities.slice(1),
                        selectedOption: null,
                        placeholder: 'nationality'
                    })
                    break
                case 'ages':
                    this.setState({ options: ages, selectedOption: ages[0] })
                    break
                case 'age':
                    this.setState({
                        options: ages.slice(1),
                        selectedOption: null,
                        placeholder: 'age'
                    })
                    break
                default:
                    this.setState({ options: [], selectedOption: null })
            }
        }
    }
    render() {
        const { selectedOption, options, placeholder } = this.state
        const { className, width } = this.props
        return (
            <ReactSelect
                value={selectedOption}
                onChange={this.handleChange}
                options={options || defOptions}
                styles={customStyles}
                className={`${className || ''}`}
                //classNamePrefix="react-select"
                isSearchable={false}
                width={width || '120px'}
                placeholder={placeholder}
            />
        )
    }
}

export default Select
