export function fetchJSON(...args) {
  return fetch(...args).then(r => r.json())
}

export function fetchStatus(...args) {
  return fetch(...args).then(r => r.status)
}

export function fetchStatusIsOK(...args) {
  return fetchStatus(...args).then(r => r === 200)
}

export function patch(path, update) {
  return fetchStatusIsOK(path, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
  })
}

export function post(path, item) {
  return fetchStatusIsOK(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
}
