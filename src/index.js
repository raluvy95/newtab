function greetings() {
    const greetings = [
        "Hello", "Howdy", "Hi", "Yo", "Hey", "Hey there"
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
}

document.getElementById("greeting").innerText = greetings() + ", cat!"

function getFavicon(url) {
    const baseUrl = new URL(url);
    if (!baseUrl) {
        return ''
    }
    return `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${baseUrl.origin}&size=256`
}

function shortText(text) {
    if (text.length > 25) {
        text = text.slice(0, 21) + "..."
    }
    return text;
}

function getTopSites() {
    const element = `
    <div class="topSites">
        <img src={img} >
        <a href={url}>{title}</a>
    </div>
    `
    chrome.topSites.get((data) => {
        for (const info of data.slice(0, 7)) {
            const rawel = element
                .replace("{url}", info.url)
                .replace("{title}", shortText(info.title))
                .replace("{img}", getFavicon(info.url))
                .trim();
            console.log(getFavicon(info.url), info.url);
            document.getElementById("topsites").insertAdjacentHTML('beforeend', rawel);
        }
    })
}

getTopSites();