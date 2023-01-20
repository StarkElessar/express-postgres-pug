const { log } = console

const createUser = () => {
  const formCreateUser = document.getElementById('formCreate')

  formCreateUser.addEventListener('submit', handleCreateUser)

  async function handleCreateUser(e) {
    e.preventDefault()
    const textMessage = formCreateUser.querySelector('.page__message')
    const fields = formCreateUser.querySelectorAll('[name]')
    const formData = {}

    textMessage.style.display = 'block'
    textMessage.innerText = 'Sending...'

    try {
      for (const input of fields) {
        log(input.value)
        formData[input.name] = input.value
      }
      
      log(formData)
      log(JSON.stringify(formData))

      const res = await fetch('/api/user/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(formData),
      })

      const { message } = await res.json()
      
      textMessage.innerText = res.status === 200 ? 'Пользователь успешно создан' : message
      log({ res })
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(() => {
        textMessage.style.display = ''
        textMessage.innerText = ''
      }, 3000)
    }
  }
}

export default createUser
