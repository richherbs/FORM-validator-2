let inputs = document.querySelectorAll('.form-control')
let requiredIfAbove = document.querySelector('.required-if-above')
let submit = document.querySelector('.btn')
let formsOK = false
let explosion = new Audio('../sounds/235968__tommccann__explosion-01.wav')
let fanfare = new Audio('../sounds/413204__joepayne__clean-trumpet-fanfare-with-wobble.mp3')
let body = document.querySelector('body')
const LETTERSONLY = /^[A-Z,a-z]+$/
const NUMBERSONLY = /^[0-9]+$/

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
        if(activeElement.required && activeElement.value.length < 1){
            activeElement.placeholder = "This is a required field"
            explosion.play()
            explosionBackground(body)
            formsOK = false
        }

        console.log(activeElement.classList)
        if(activeElement.classList.contains('letters-only') && !(LETTERSONLY.test(value))){
            activeElement.placeholder = "This field only accepts letters"
            explosion.play()
            explosionBackground(body)
            formsOK = false
        }
        if(activeElement.classList.contains('numbers-only') && !(NUMBERSONLY.test(activeElement))){
            activeElement.placeholder = "This field only accepts numbers"
            formsOK = false
        }
        if(maxLength > -1 || minLength > -1){
            if(value.length <= parse(minLength) || value.length > parse(maxLength)){
                activeElement.placeholder = `This field must be between ${minLength} and ${maxLength}`
                formsOK = false
            }
        }
        if(activeElement.type == 'radio' && activeElement.checked && activeElement.value == 1){
            requiredIfAbove.required = true
        }
    })
});

submit.addEventListener('click', ()=>{
    if(!formsOK){
        console.log('There\'s something wrong with the form')
    }
    fanfare.play()
})

function explosionBackground(anElement){
    anElement.style.backgroundImage = 'url(../images/images.jpeg)'
    setTimeout(()=>{
        anElement.style.backgroundImage = 'url(../images/bald-eagle.jpg)'
    }, 2000)
}