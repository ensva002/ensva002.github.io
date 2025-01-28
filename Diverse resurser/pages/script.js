fetch('../pagelist.json')
    .then(response => response.json())
    .then(data => {
        const overview = document.getElementById("overview");
        overview.id = 'overview';
        document.body.prepend(overview);
        const currentPage = decodeURIComponent(decodeURIComponent(window.location.pathname.split('/').pop()));
        console.log(currentPage)
        data.files.forEach(file => {
            const fileName = file.replace('.html', '').replace(/_/g, ' ');
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `${file}`;
            link.textContent = fileName;
            listItem.appendChild(link);
            console.log(file)
            if (file === currentPage) {
                listItem.classList.add('current');
            }
            overview.appendChild(listItem);
        });
        addLogo(overview)
        addButton()
    })
    .catch(error => console.error('Error:', error));

    function addLogo(overview) {
        let logo = document.createElement('img');
        const fallbacks = ['../logo.svg', '../logo.webp', '../logo.png', '../logo.jpg'];
        let current = 0;
    
        function tryNext() {
            if (current < fallbacks.length) {
                logo.src = fallbacks[current++];
            } else {
                console.error('No logo.');
            }
        }
    
        logo.src = fallbacks[current++];
        logo.onerror = tryNext;
    
        logo.style.width = "95%";
        logo.style.padding = "0pt";
        logo.style.marginBottom = "5pt";
    
        logo.addEventListener("click", function () {
            window.location.href = "../../index.html";
        });

        overview.insertBefore(logo, overview.firstChild);
    }
    

function addButton(){
    const content = document.getElementById("content")
    let menuButton = document.createElement('button')
    menuButton.id = "toggle"
    menuButton.textContent = "☰"
    let toggle = true
    const docStyle = document.documentElement.style
    menuButton.addEventListener("click",function(){
        if (toggle){
            docStyle.setProperty('--drawer-shadow', "10px 0px 30px 0px rgba(0,0,0,0.3)")
            docStyle.setProperty('--toggle-left', "200pt")
            docStyle.setProperty('--drawer-margin', "0pt")
        }else{
            docStyle.setProperty('--drawer-margin', "-200pt")
            docStyle.setProperty('--drawer-shadow', "10px 0px 30px 0px rgba(0,0,0,0)")
            docStyle.setProperty('--toggle-left', "0pt")
            
        }
        toggle = !toggle
    })
    content.insertBefore(menuButton,content.firstChild)
    // Dark mode
    let codeStyle = document.getElementById("codeStyle")
    let mode = JSON.parse(localStorage.getItem("mode"));
    let modeButton = document.createElement('button')
    modeButton.id = "mode"
    modeButton.style.backgroundColor = "#FFFFFF"
    modeButton.style.borderRadius = "30pt"
    modeButton.style.padding = "2px"
    modeButton.style.marginLeft = "10px"
    modeButton.style.marginTop = "3px"
    let btnContentLight = "🌘"
    let btnContentDark = "☀️"
    modeButton.textContent = btnContentLight
    if (mode === null) {
        mode = true;
        localStorage.setItem("mode", mode);
    }
    if (!mode){
        setDarkMode()
    }
    const overview = document.getElementById("overview")
    modeButton.addEventListener("click",function(){
        if (mode){
            setDarkMode()
        }else{
            setLightMode()
        }
        mode = !mode
        localStorage.setItem("mode",mode)
    })
    function setDarkMode(){
        docStyle.setProperty('--primary', "#222222")
        docStyle.setProperty('--secondary', "#403340")
        docStyle.setProperty('--text', "#FFFFFF")
        codeStyle.href = "prismdark.css" 
        modeButton.textContent = btnContentDark
    }
    
    function setLightMode(){
        docStyle.setProperty('--primary', "#FFFFFF")
        docStyle.setProperty('--secondary', "#eef2f9")
        docStyle.setProperty('--text', "#000000")
        codeStyle.href = "prism.css"
        modeButton.textContent = btnContentLight
    }
    overview.insertBefore(modeButton,overview.firstChild)
    //add copy button
}