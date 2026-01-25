function submitData() {
    let firstName = document.querySelector('input[name="firstname"]').value;
    let lastName = document.querySelector('input[name="lastname"]').value;
    let age = document.querySelector('input[name="age"]').value;

    let genderElement = document.querySelector('input[name="gender"]:checked');
    let gender = genderElement ? genderElement.value : ""; 

    let interestElements = document.querySelectorAll('input[name="interest"]:checked');
    let interests = Array.from(interestElements).map(el => el.value);

    let description = document.querySelector('textarea[name="description"]').value;

    let userData = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        gender: gender,       
        interests: interests,
        description: description
    };

    console.log('submit data', userData);
}