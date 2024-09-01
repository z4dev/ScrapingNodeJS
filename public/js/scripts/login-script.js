const form = document.querySelector('form');
const errorMessage = document.querySelector('#errorMessage');

function getCsrfToken() {
    return document.querySelector('input[name="_csrf"]').value;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = e.submitter;
    
    // reset errors
    errorMessage.textContent = '';
    // get values
    const username = form.username.value;
    const password = form.password.value;
    
    if (!username){
        errorMessage.style.display = 'block';
        errorMessage.textContent = "من فضلك أدخل اسم المستخدم";
        return;
    }
    if (!password){
        errorMessage.style.display = 'block';
        errorMessage.textContent = "من فضلك أدخل كلمة المرور";
        return;
    }
    try {
        submitBtn.classList.add('disabled');
        const res = await fetch('/', { 
            method: 'POST', 
            body: JSON.stringify({ username, password }),
            headers: {'Content-Type': 'application/json', 'X-CSRF-Token': getCsrfToken()},
            credentials: 'include'            
        });
        const data = await res.json();
        if ( ! data.isLogged ){
            errorMessage.style.display = 'block';   
            errorMessage.textContent = data.text; 
        } else {
            location.assign('/home');
        }
    }
    catch (err) {
        console.log(err);
    }
    finally {
        submitBtn.classList.remove('disabled');
    }
});