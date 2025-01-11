// 1 sgd = p x;
// 1 sgd = q y;

// m x = ? y

// mx = m*(q/p)


let url = 'https://open.er-api.com/v6/latest/SGD';
let curr = [];
let rate = [];

// Function to fetch data and populate currency arrays
async function converter() {
    let data;
    try {
        let response = await fetch(url);
        data = await response.json();
        console.log(data);
        for (let i in data.rates) {
            curr.push(i);
            rate.push(data.rates[i]);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to create dropdown options
function createDropdownOptions(selectElement) {
    // Create a default option
    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'select a currency';
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectElement.appendChild(defaultOption);

    // Populate select options with currencies
    curr.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        selectElement.appendChild(option);
    });
}

// Function to handle form submission
function handleSubmit() {
    const select = document.getElementById('country-select');
    const input = document.getElementById('number-input');
    const select2 = document.getElementById('country-select2');

    const selectedCountry = select.value;
    const enteredNumber = input.value;
    const selectedCountry2 = select2.value;

    console.log('Selected Country:', selectedCountry);
    console.log('Entered Number:', enteredNumber);
    console.log('The other thing is ', selectedCountry2);

    if (selectedCountry && selectedCountry2 && enteredNumber) {
        let y = enteredNumber * (rate[curr.indexOf(selectedCountry2)] / rate[curr.indexOf(selectedCountry)]);
        const printing = document.createElement('p');
        printing.innerHTML = `${enteredNumber} ${selectedCountry} = ${y.toFixed(2)} ${selectedCountry2}`;
        document.body.append(printing);
    } else {
        alert('Please select both countries and enter a valid number.');
    }
}

// Initialize the converter and populate dropdowns after DOM content is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await converter();

    const select = document.getElementById('country-select');
    const select2 = document.getElementById('country-select2');
    createDropdownOptions(select);
    createDropdownOptions(select2);

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', handleSubmit);
});
