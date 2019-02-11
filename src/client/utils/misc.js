export function withValue(fn) {
  return ({ target }) => fn({ name: target.name, value: target.value })
}

export function withSlugifiedValue(fn) {
  return (value) => fn(value.toLowerCase()
                          .replace(/[^\w\.\-_]/gi, '-')
                          .replace(/\-+/gi, '-')
                      )
}
