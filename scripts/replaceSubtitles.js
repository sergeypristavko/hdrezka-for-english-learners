// const subsWrapper = document.querySelector("#oframecdnplayer > pjsdiv:nth-child(29)")
//
// subsWrapper.style.opacity = 0
//
// const getSubsText = () => document.querySelector("#oframecdnplayer > pjsdiv:nth-child(29) > span")?.innerHTML?.replaceAll('<br>', ' ')
//
// let prevSubsText = getSubsText()
// const observer = new MutationObserver(() => {
//     const subsText = getSubsText()
//
//     if (subsText && prevSubsText !== subsText) {
//         prevSubsText = subsText
//         rerenderSubs(subsText)
//     }
// })
//
// observer.observe(subsWrapper, { childList: true })
//
// const rerenderSubs = text => {
//     const playerBody = document.querySelector("#pjsfrrscdnplayer").contentWindow.document.body
//
//     const div = document.createElement('div')
//     const id = 'subtitles'
//
//     div.onmouseover = () => {
//         console.log('bla')
//     }
//
//     const subtitlesBlock = playerBody.querySelector(`#${id}`)
//
//     if (subtitlesBlock) {
//         subtitlesBlock.innerHTML = text
//         return;
//     }
//
//     div.id = id
//     div.innerHTML = text
//     div.style.cssText = `
//         color: white;
//         position: absolute;
//         background-color: rgba(0,0,0,0.7);
//         padding: 5px 10px;
//         border-radius: 3px;
//         line-height: 1.9;
//         transform: translate(-50%);
//         left: 50%;
//         bottom: 15%;
//     `
//     playerBody.append(div)
// }
