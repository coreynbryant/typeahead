/* globals zlFetch */

zlFetch('https://restcountries.eu/rest/v2/all?fields=name;flag')
  .then(response => initAutocomplete(response.body))
  .catch(console.log())

// Functions
// =========
const boldSearchTerms = (string, searchTerms) => {
  const length = searchTerms.length
  const toBold = string.substring(0, length)
  const rest = string.substring(length)
  return `<strong>${toBold}</strong>${rest}`
}

const showList = (list, innerHTML) => {
  list.removeAttribute('hidden')
  list.innerHTML = innerHTML
}

const hidelist = list => {
  list.setAttribute('hidden', true)
  list.innerHTML = ''
}

// Execution
// =========
const initAutocomplete = (countries) => {
  const input = document.querySelector('.typeahead__input')
  const list = document.querySelector('.typeahead-list')

  input.addEventListener('input', ev => {
    const input = ev.target
    const inputValue = input.value.trim().toLowerCase()

    // Hides list
    if (!inputValue) {
      hidelist(list)
      return
    }

    // Finds a list of matched countries
    const matches = countries.filter(country => {
      return country.name.toLowerCase().startsWith(inputValue)
    })

    // Creates the innerHTML
    const listItems = matches.map(country => {
      return `<li>
      <img src="${country.flag}" alt="${country.name}'s flag" />
      <span>${boldSearchTerms(country.name, inputValue)}</span>
      </li>`
    }).join('')

    // Shows list
    showList(list, listItems)
  })

  list.addEventListener('click', ev => {
    if (!ev.target.matches('li')) return
    const li = ev.target
    const countryName = li.textContent
    input.value = countryName
    hidelist(list)
  })
}
