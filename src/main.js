const $siteList = $(".siteList")
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject ||
                [
                {logo:"A", url:"https://www.acfun.cn"},
                {logo:"B", url:"https://www.bilibili.com"},
                {logo:"Z", url:"https://www.zhihu.com/"}
                ]

const simplify=(url)=>{
    return url.replace("https://", "")
              .replace("http://", "")
              .replace("www.", "")
              .replace("/\/.*/", "")
}
const render= ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach(node=>{
        const $li = $(
            ` <li>
            <a href=${node.url}>
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplify(node.url)}</div>
                    <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                    </div>
                </div>
                </a>
            </li>`
        ).insertBefore($lastLi)
    })
}

render()
$('.addButton')
 .on('click', ()=>{
     let url = window.prompt("请问你要添加的网址是啥？")
     if(url.indexOf('http') !== 0){
        url = "https://" + url
     }
     
     
     hashMap.push({logo:simplify(url)[0], url:url})
    render()
 })
 
 window.onbeforeunload=()=>{
     const string = JSON.stringify(hashMap)
     localStorage.setItem('x', string)
 }
 