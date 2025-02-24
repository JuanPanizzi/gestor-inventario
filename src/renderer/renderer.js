const information = document.getElementById('info')
//information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`
information.innerText = `¿Que es boca? ${versions.bocaJuniors()}`


async function llamarBoca(){
  const response =  await window.versions.ping()
  console.log('reepsonse', response)
}

llamarBoca();
