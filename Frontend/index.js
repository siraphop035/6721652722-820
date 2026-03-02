const submitData = async () => {
    // grab elements (might be null if DOM changes)
    const firstNameDOM = document.querySelector('input[name=firstname]');
    const lastNameDOM = document.querySelector('input[name=lastname]');
    const ageDOM = document.querySelector('input[name=age]');
    const genderDOM = document.querySelector('input[name=gender]:checked');
    const interestDOMs = document.querySelectorAll('input[name=interests]:checked');
    const descriptionDOM = document.querySelector('textarea[name=description]');
    const messageEl = document.getElementById('message');
    if (messageEl) {
        messageEl.textContent = ''; // clear earlier messages
        messageEl.className = 'message';
    }

    // build sanitized values
    const firstName = firstNameDOM ? firstNameDOM.value.trim() : '';
    const lastName = lastNameDOM ? lastNameDOM.value.trim() : '';
    const age = ageDOM ? parseInt(ageDOM.value, 10) || null : null;
    const gender = genderDOM ? genderDOM.value : '';
    const interests = Array.from(interestDOMs).map(el => el.value).join(',');
    const description = descriptionDOM ? descriptionDOM.value.trim() : '';

    const nameRegex = /^[A-Za-zก-๙]+$/;
    if (!firstName || !nameRegex.test(firstName)) {
        if (messageEl) {
            messageEl.textContent = 'ส่งขอมูลไม่สำเร็จ';
            messageEl.classList.add('error');
        }
        firstNameDOM.focus();
        return;
    }
    if (!lastName || !nameRegex.test(lastName)) {
        if (messageEl) {
            messageEl.textContent = 'ส่งขอมูลไม่สำเร็จ';
            messageEl.classList.add('error');
        }
        lastNameDOM.focus();
        return;
    }
    if (age === null || isNaN(age)) {
        if (messageEl) {
            messageEl.textContent = 'ส่งขอมูลไม่สำเร็จ';
            messageEl.classList.add('error');
        }
        ageDOM.focus();
        return;
    }

    const userData = { firstName, lastName, age, gender, description, interests };

    try {
        const response = await axios.post('http://localhost:8000/users', userData);
        console.log('submitData', userData);
        console.log('response', response.data);
        if (messageEl) {
            // response.data expected to have { message, data }
            const id = response.data?.data?.insertId ?? response.data?.data?.id;
            messageEl.textContent = id
                ? `User created`
                : 'User created successfully';
            messageEl.classList.add('success');
        }
    } catch (err) {
        console.error('Submission error', err);
        const msg = err.response?.data?.message || err.message;
        if (messageEl) {
            messageEl.textContent = 'Error submitting data: ' + msg;
            messageEl.classList.add('error');
        }
    }
};
