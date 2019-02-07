export function fetchJSON(...args) {
  return fetch(...args).then(r => r.json())
}

export function fetchStatus(...args) {
  return fetch(...args).then(r => r.status)
}

export function fetchStatusIsOK(...args) {
  return fetchStatus(...args).then(r => r === 200)
}
