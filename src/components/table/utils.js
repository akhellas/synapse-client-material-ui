const interpolate = (string, params) => {
  const names = Object.keys(params)
  const vals = Object.values(params)
  // eslint-disable-next-line no-new-func
  return new Function(...names, `return \`${string}\`;`)(...vals)
}

const getValue = (item, field) => {
  const value = item[field.name]

  if (field.valueFormatFn) {
    var str = field.valueFormatFn

    if (typeof field.valueFormatFn === 'object') {
      str = field.valueFormatFn[item.type] || field.valueFormatFn.default
    }
    return interpolate(str, { item, field })
  }

  if (value && value.name) {
    return value.name
  }

  switch (field.type) {
    case 'text':
      return value

    case 'date':
      return value ? new Date(value).toLocaleDateString('el-GR') : ''

    case 'select':
    case 'asyncSelect':
      if (value && value._id) {
        return (
          value.name ||
          Object.values(value)
            .slice(1)
            .join(' ')
        )
      }
      const selected = field.options && field.options.find(x => x._id === value)
      return selected ? selected.name : null

    default:
      return value
  }
}

export const dataToRow = (fields, item) => {
  return fields.map(field => getValue(item, field))
}
