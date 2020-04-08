let inputs = document.querySelectorAll('.form-control')
let requiredIfAbove = document.querySelector('.required-if-above')
let submit = document.querySelector('.btn')
let formsOK = false
let explosion = new Audio('../sounds/235968__tommccann__explosion-01.wav')
let fanfare = new Audio('../sounds/413204__joepayne__clean-trumpet-fanfare-with-wobble.mp3')
let body = document.querySelector('body')
const LETTERSONLY = /^[A-Za-z]+$/
const NUMBERSONLY = /^[0-9]+$/
const EMAILADDRESS = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

// Able to validate required fields tick
// Able to change field required state depending on other fields state
// Able to prevent numbers submitting in letter only fields tick
// Able to prevent letters in number fields tick
// Able to validate string lengths tick
// Must display appropriate error messages and prevent form submission tick

inputs.forEach(element => {
    element.addEventListener('blur', (e)=>{
        let activeElement = e.target
        let value = activeElement.value
        let minLength = activeElement.minLength
        let maxLength = activeElement.maxLength
        formsOK = true
        if(fieldRequired(activeElement)){
            activeElement.value = ''
            activeElement.placeholder = "This field is required"
            explosion.play()
            explosionBackground(body)
            formsOK = false
        }

        if(checkRegex(activeElement, LETTERSONLY, 'letters-only')){
            activeElement.value = ''
            activeElement.placeholder = "This field only accepts letters"
            explosion.play()
            explosionBackground(body)
            formsOK = false
        }
        if(checkRegex(activeElement, NUMBERSONLY, 'numbers-only')){
            activeElement.value = ''
            activeElement.placeholder = "This field only accepts numbers"
            explosion.play()
            explosionBackground(body)
            formsOK = false
        }
        if(maxLength > -1 || minLength > -1){
            if((value.length < minLength) || (value.length > maxLength)){
                activeElement.value = ''
                activeElement.placeholder = `Entry must be longer than ${minLength} and shorter than ${maxLength}`
                explosion.play()
                explosionBackground(body)
                formsOK = false
            }
        }
        if(activeElement.type == 'radio' && activeElement.checked && activeElement.value == 1){
            requiredIfAbove.placeHolder = 'This field is required'
            requiredIfAbove.required = true
        } else {
            requiredIfAbove.placeHolder = 'This field is not required'
            requiredIfAbove.required = false
        }
        if(checkRegex(activeElement, EMAILADDRESS, 'e-mail')){
            activeElement.value = ''
            activeElement.placeholder = `Entry must be a valid email`
            explosion.play()
            explosionBackground(body)
            formsOK = false
        }
    })
});

submit.addEventListener('click', (e)=>{
    if(formsOK){
        fanfare.play()
    } else {
        e.preventDefault()
        explosionBackground(body)
        console.log('There\'s something wrong with the form')
    }
})

function explosionBackground(anElement){
    anElement.style.backgroundImage = 'url(../images/images.jpeg)'
    setTimeout(()=>{
        anElement.style.backgroundImage = 'url(../images/bald-eagle.jpg)'
    }, 2000)
}

function fieldRequired(anElement){
    return anElement.required && anElement.value.length < 1
}

function checkRegex(anElement, aRegex, aClass){
    return anElement.classList.contains(aClass) && !(aRegex.test(anElement.value))
}