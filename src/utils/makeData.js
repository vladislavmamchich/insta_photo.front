import namor from 'namor'

const range = len => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const newPerson = () => {
    const statusChance = Math.random()
    return {
        _id: Math.floor(Math.random() * 100),
        email:
            statusChance > 0.5 ? namor.generate({ words: 1, numbers: 0 }) : '',
        nickname:
            statusChance <= 0.5 ? namor.generate({ words: 1, numbers: 0 }) : '',
        age: Math.floor(Math.random() * 30),
        sex: statusChance > 0.5 ? 'male' : 'female',
        role: statusChance > 0.5 ? 'participant' : 'observer',
        moderated: statusChance > 0.5 ? true : false,
        is_active: statusChance > 0.5 ? false : true
    }
}

export default function makeData(...lens) {
    const makeDataLevel = (depth = 0) => {
        const len = lens[depth]
        return range(len).map(d => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
            }
        })
    }

    return makeDataLevel()
}
