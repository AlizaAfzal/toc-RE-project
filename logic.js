const diseases = [
    "fever", "cough", "corona", "thyroid", "diabetic", "jaundice", "malaria",
    "dengue", "polio", "chickenpox", "cancer", "influenza", "common cold",
    "asthma", "pneumonia", "tuberculosis", "hepatitis", "HIV/AIDS", "arthritis",
    "hypertension", "heart disease", "stroke", "kidney disease", "liver disease",
    "anemia", "allergies", "migraine", "epilepsy", "depression", "anxiety disorders",
    "gastroenteritis", "ulcers", "IBS", "crohn's disease", "celiac disease"
];

const medicalSuggestions = {
    "fever": "Drink plenty of fluids, rest, and take fever-reducing medications like acetaminophen or ibuprofen. Seek medical attention if the fever is very high or persists for more than a few days.",
    "cough": "Stay hydrated, use cough drops or syrups, and consider using a humidifier. If the cough is severe or persists for more than a week, see a doctor.",
    "corona": "Isolate yourself, monitor your symptoms, and seek medical advice. Follow public health guidelines and get tested if necessary.",
    "thyroid": "Consult with an endocrinologist for proper diagnosis and treatment. Thyroid conditions may require medication or other therapies.",
    "diabetic": "Monitor blood sugar levels regularly, follow a healthy diet, exercise, and take medications as prescribed by your doctor.",
    "jaundice": "Seek medical attention to determine the underlying cause. Treatment may vary depending on the cause, such as medication or lifestyle changes.",
    "malaria": "See a doctor immediately for diagnosis and treatment. Antimalarial medications are usually prescribed.",
    "dengue": "Rest, stay hydrated, and use pain relievers like acetaminophen. Avoid aspirin and NSAIDs. Seek medical care if symptoms worsen.",
    "polio": "Polio is preventable through vaccination. Seek medical care for proper diagnosis and treatment if infected.",
    "chickenpox": "Rest, stay hydrated, and use antihistamines or topical treatments to relieve itching. Avoid scratching and seek medical care if complications arise.",
    "cancer": "Consult with an oncologist for proper diagnosis and treatment. Treatment options may include surgery, chemotherapy, radiation therapy, and other therapies.",
    "influenza": "Rest, stay hydrated, and use antiviral medications if prescribed by a doctor. Over-the-counter medications can help relieve symptoms.",
    "common cold": "Rest, stay hydrated, and use over-the-counter medications to relieve symptoms. Avoid close contact with others to prevent spreading the virus.",
    "asthma": "Follow your asthma action plan, use inhalers as prescribed, and avoid known triggers. Seek medical attention if symptoms worsen.",
    "pneumonia": "Seek medical attention for diagnosis and treatment. Treatment may include antibiotics, rest, and fluids.",
    "tuberculosis": "Seek medical attention for diagnosis and treatment. Treatment usually involves a course of antibiotics.",
    "hepatitis": "Seek medical attention for diagnosis and treatment. Treatment varies depending on the type of hepatitis.",
    "HIV/AIDS": "Consult with a healthcare provider for proper diagnosis and treatment. Antiretroviral therapy (ART) is the standard treatment.",
    "arthritis": "Manage symptoms with medications, physical therapy, and lifestyle changes. Consult with a rheumatologist for proper diagnosis and treatment.",
    "hypertension": "Monitor blood pressure regularly, follow a healthy diet, exercise, and take medications as prescribed by your doctor.",
    "heart disease": "Consult with a cardiologist for proper diagnosis and treatment. Treatment may include lifestyle changes, medications, and procedures.",
    "stroke": "Seek emergency medical attention immediately. Follow-up care may include medications, physical therapy, and lifestyle changes.",
    "kidney disease": "Consult with a nephrologist for proper diagnosis and treatment. Treatment may include medications, dietary changes, and dialysis.",
    "liver disease": "Seek medical attention for diagnosis and treatment. Treatment varies depending on the type of liver disease.",
    "anemia": "Consult with a healthcare provider for proper diagnosis and treatment. Treatment may include dietary changes, supplements, and medications.",
    "allergies": "Identify and avoid allergens, use antihistamines or other medications as prescribed, and consider allergy shots if recommended by your doctor.",
    "migraine": "Manage symptoms with medications, lifestyle changes, and avoiding known triggers. Consult with a healthcare provider for proper diagnosis and treatment.",
    "epilepsy": "Consult with a neurologist for proper diagnosis and treatment. Treatment may include medications, lifestyle changes, and surgery in some cases.",
    "depression": "Seek help from a mental health professional. Treatment may include therapy, medications, and lifestyle changes.",
    "anxiety disorders": "Consult with a mental health professional for proper diagnosis and treatment. Treatment may include therapy, medications, and stress management techniques.",
    "gastroenteritis": "Stay hydrated, rest, and follow a bland diet. Seek medical attention if symptoms are severe or persist for more than a few days.",
    "ulcers": "Consult with a healthcare provider for proper diagnosis and treatment. Treatment may include medications, dietary changes, and avoiding known triggers.",
    "IBS": "Manage symptoms with dietary changes, medications, and stress management techniques. Consult with a healthcare provider for proper diagnosis and treatment.",
    "crohn's disease": "Consult with a gastroenterologist for proper diagnosis and treatment. Treatment may include medications, dietary changes, and surgery in some cases.",
    "celiac disease": "Follow a strict gluten-free diet. Consult with a healthcare provider for proper diagnosis and treatment."
};

const diseaseRegex = new RegExp(`^(${diseases.map(disease => disease.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})$`, 'i');
const genderRegex = /^(male|female|other)$/i;
const ageRegex = /^(?:1[01][0-9]|120|1[89]|[2-9][0-9])$/;  // 18-120

function checkDisease(input) {
    return diseaseRegex.test(input);
}

function checkGender(input) {
    return genderRegex.test(input);
}

function checkAge(input) {
    return ageRegex.test(input);
}

function getMedicalSuggestion(disease) {
    return medicalSuggestions[disease.toLowerCase()] || "No suggestion available for this disease.";
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('page1.html')) {
        const form = document.getElementById('symptomForm');
        const symptomsInput = document.getElementById('symptoms');
        const genderInput = document.getElementById('gender');
        const ageInput = document.getElementById('age');
        const symptomError = document.getElementById('symptomError');
        const genderError = document.getElementById('genderError');
        const ageError = document.getElementById('ageError');

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const symptoms = symptomsInput.value;
            const gender = genderInput.value;
            const age = ageInput.value;
            
            let valid = true;

            if (!checkDisease(symptoms)) {
                symptomError.textContent = "The symptom you entered is not in our list. Please try again with a valid symptom.";
                symptomError.style.display = 'block';
                valid = false;
            } else {
                symptomError.style.display = 'none';
            }

            if (!checkGender(gender)) {
                genderError.textContent = "The gender you entered is invalid. Please enter 'male', 'female', or 'other'.";
                genderError.style.display = 'block';
                valid = false;
            } else {
                genderError.style.display = 'none';
            }

            if (!checkAge(age)) {
                ageError.textContent = "The age you entered is invalid. Please enter an age between 18 and 120.";
                ageError.style.display = 'block';
                valid = false;
            } else {
                ageError.style.display = 'none';
            }

            if (valid) {
                const urlParams = new URLSearchParams();
                urlParams.append('symptoms', symptoms);
                urlParams.append('gender', gender);
                urlParams.append('age', age);
                window.location.href = `page2.html?${urlParams.toString()}`;
            }
        });
    }

    if (window.location.pathname.endsWith('page2.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const symptom = urlParams.get('symptoms');
        const gender = urlParams.get('gender');
        const age = urlParams.get('age');
        const suggestions = document.getElementById('suggestions');
        document.getElementById('displaySymptom').textContent = symptom;
        document.getElementById('displayGender').textContent = gender;
        document.getElementById('displayAge').textContent = age;
        suggestions.textContent = getMedicalSuggestion(symptom);
    }
});


