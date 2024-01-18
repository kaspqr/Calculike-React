export const ADD_ONE = "addOne"
export const ADD_TWO = "addTwo"
export const ADD_THREE = "addThree"
export const ADD_ALL = "addAll"

export const SUBTRACT_ONE = "subtractOne"
export const SUBTRACT_TWO = "subtractTwo"
export const SUBTRACT_THREE = "subtractThree"
export const SUBTRACT_ALL = "subtractAll"

export const MULTIPLY_ONE = "multiplyOne"
export const MULTIPLY_TWO = "multiplyTwo"
export const MULTIPLY_THREE = "multiplyThree"
export const MULTIPLY_ALL = "multiplyAll"

export const DIVIDE_ONE = "divideOne"
export const DIVIDE_TWO = "divideTwo"
export const DIVIDE_THREE = "divideThree"
export const DIVIDE_ALL = "divideAll"

export const COMBO_ONE = "comboOne"
export const COMBO_TWO = "comboTwo"
export const COMBO_THREE = "comboThree"
export const COMBO_ALL = "comboAll"

export const LEVEL_ALLS = [ADD_ALL, SUBTRACT_ALL, MULTIPLY_ALL, DIVIDE_ALL, COMBO_ALL]

export const ADD_LEVELS = [
  ADD_ONE,
  ADD_TWO,
  ADD_THREE,
  ADD_ALL,
]

export const SUBTRACT_LEVELS = [
  SUBTRACT_ONE,
  SUBTRACT_TWO,
  SUBTRACT_THREE,
  SUBTRACT_ALL,
]

export const MULTIPLY_LEVELS = [
  MULTIPLY_ONE,
  MULTIPLY_TWO,
  MULTIPLY_THREE,
  MULTIPLY_ALL,
]

export const DIVIDE_LEVELS = [
  DIVIDE_ONE,
  DIVIDE_TWO,
  DIVIDE_THREE,
  DIVIDE_ALL,
]

export const COMBO_LEVELS = [
  COMBO_ONE,
  COMBO_TWO,
  COMBO_THREE,
  COMBO_ALL,
]

export const ALL_LEVELS = [...ADD_LEVELS, ...SUBTRACT_LEVELS, ...MULTIPLY_LEVELS, ...DIVIDE_LEVELS, ...COMBO_LEVELS]

export const LEVEL_OPTIONS = [
  { value: 'All', label: 'All' },
  { value: 'Three', label: '3' },
  { value: 'Two', label: '2' },
  { value: 'One', label: '1' }
]

export const TYPE_OPTIONS = [
  { value: 'combo', label: 'Combo' },
  { value: 'add', label: 'Add' },
  { value: 'subtract', label: 'Subtract' },
  { value: 'multiply', label: 'Multiply' },
  { value: 'divide', label: 'Divide' },
]
