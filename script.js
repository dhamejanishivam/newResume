const BACKEND_URL = 'http://165.22.208.62/api/resume'; // Make sure this matches your Flask API endpoint
// const BACKEND_URL = 'http://192.168.1.195:5002/api/resume'; // Make sure this matches your Flask API endpoint

// Global data arrays
let educationData = [];
let workExperienceData = [];
let skillsData = [];
let projectsData = [];

// Helper function to show/clear custom validation errors
function setValidationError(inputElement, message) {
    inputElement.classList.remove('is-invalid');
    let existingError = inputElement.nextElementSibling;
    if (existingError && existingError.classList.contains('validation-error')) {
        existingError.remove();
    }
    if (message) {
        inputElement.classList.add('is-invalid');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'validation-error';
        errorDiv.style.color = 'var(--danger)';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.textContent = message;
        inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
    }
}

function clearAllValidationErrors() {
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    document.querySelectorAll('.validation-error').forEach(el => el.remove());
}

// Initialize animated particles
function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        container.appendChild(particle);
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Toggle sections
function toggleSection(header) {
    const content = header.nextElementSibling;
    const chevron = header.querySelector('.chevron');
    document.querySelectorAll('.section-content.active').forEach(activeContent => {
        if (activeContent !== content) {
            activeContent.classList.remove('active');
            activeContent.previousElementSibling.querySelector('.chevron').classList.remove('rotated');
        }
    });
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        chevron.classList.remove('rotated');
    } else {
        content.classList.add('active');
        chevron.classList.add('rotated');
    }
}

// Education functions
function addEducation() {
    const id = Date.now();
    educationData.push({ id, degreeName: '', startYear: '', endYear: '', instituteName: '', location: '', isPresent: false });
    renderEducation();
}

function removeEducation(id) {
    educationData = educationData.filter(item => item.id !== id);
    renderEducation();
}

function updateEducation(id, field, value) {
    const index = educationData.findIndex(item => item.id === id);
    if (index !== -1) {
        if (field === 'isPresent') {
            educationData[index][field] = value;
            if (value) educationData[index].endYear = 'Present';
            else if (educationData[index].endYear === 'Present') educationData[index].endYear = '';
        } else {
            educationData[index][field] = value;
        }
        const inputElement = document.getElementById(`${field === 'endYear' ? 'eduEndYear' : field === 'startYear' ? 'eduStartYear' : field === 'degreeName' ? 'eduDegree' : field === 'instituteName' ? 'eduInstitute' : 'eduLocation'}-${id}`);
        if (inputElement) setValidationError(inputElement, '');
    }
}

function renderEducation() {
    const container = document.getElementById('educationList');
    container.innerHTML = '';
    if (educationData.length === 0) { addEducation(); return; }
    educationData.forEach((edu, index) => {
        const div = document.createElement('div');
        div.className = 'dynamic-item';
        div.innerHTML = `
            <div class="item-header">
                <div class="item-title"><i class="fas fa-graduation-cap" style="color: var(--accent-primary); margin-right: 0.5rem;"></i> Education #${index + 1}</div>
                <button type="button" class="remove-btn" onclick="removeEducation(${edu.id})"><i class="fas fa-trash-alt"></i> Remove</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="eduDegree-${edu.id}">Degree Name</label>
                    <input type="text" id="eduDegree-${edu.id}" name="eduDegree-${edu.id}" class="form-control" placeholder="B.Tech Computer Science" value="${edu.degreeName}" oninput="updateEducation(${edu.id}, 'degreeName', this.value)" required>
                </div>
                <div class="form-group">
                    <label for="eduInstitute-${edu.id}">Institution Name</label>
                    <input type="text" id="eduInstitute-${edu.id}" name="eduInstitute-${edu.id}" class="form-control" placeholder="Indian Institute of Technology Delhi" value="${edu.instituteName}" oninput="updateEducation(${edu.id}, 'instituteName', this.value)" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="eduStartYear-${edu.id}">Start Year</label>
                    <input type="text" id="eduStartYear-${edu.id}" name="eduStartYear-${edu.id}" class="form-control" placeholder="2018" pattern="\\d{4}" value="${edu.startYear}" oninput="updateEducation(${edu.id}, 'startYear', this.value)" required>
                </div>
                <div class="form-group">
                    <label for="eduEndYear-${edu.id}">End Year</label>
                    <input type="text" id="eduEndYear-${edu.id}" name="eduEndYear-${edu.id}" class="form-control" placeholder="2022" pattern="\\d{4}" value="${edu.endYear !== 'Present' ? edu.endYear : ''}" ${edu.isPresent ? 'disabled' : ''}>
                    <div class="checkbox-group">
                        <input type="checkbox" id="eduPresent-${edu.id}" name="eduPresent-${edu.id}" ${edu.isPresent ? 'checked' : ''} onchange="togglePresent(${edu.id}, 'education', this.checked)">
                        <label for="eduPresent-${edu.id}">Present</label>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="eduLocation-${edu.id}">Location</label>
                <input type="text" id="eduLocation-${edu.id}" name="eduLocation-${edu.id}" class="form-control" placeholder="New Delhi, India" value="${edu.location}" oninput="updateEducation(${edu.id}, 'location', this.value)" required>
            </div>
        `;
        container.appendChild(div);
        const endYearInput = div.querySelector(`#eduEndYear-${edu.id}`);
        if (endYearInput) endYearInput.addEventListener('input', (e) => { updateEducation(edu.id, 'endYear', e.target.value); });
    });
}

// Work Experience functions
function addWorkExperience() {
    const id = Date.now();
    workExperienceData.push({ id, jobTitle: '', companyName: '', startDate: '', endDate: '', description: '', isPresent: false });
    renderWorkExperience();
}

function removeWorkExperience(id) {
    workExperienceData = workExperienceData.filter(item => item.id !== id);
    renderWorkExperience();
}

function updateWorkExperience(id, field, value) {
    const index = workExperienceData.findIndex(item => item.id === id);
    if (index !== -1) {
        if (field === 'isPresent') {
            workExperienceData[index][field] = value;
            if (value) workExperienceData[index].endDate = 'Present';
            else if (workExperienceData[index].endDate === 'Present') workExperienceData[index].endDate = '';
        } else {
            workExperienceData[index][field] = value;
        }
        const inputElement = document.getElementById(`${field === 'jobTitle' ? 'expTitle' : field === 'companyName' ? 'expCompany' : field === 'startDate' ? 'expStartDate' : field === 'endDate' ? 'expEndDate' : 'expDescription'}-${id}`);
        if (inputElement) setValidationError(inputElement, '');
    }
}

function renderWorkExperience() {
    const container = document.getElementById('workExperienceList');
    container.innerHTML = '';
    workExperienceData.forEach((exp, index) => {
        const div = document.createElement('div');
        div.className = 'dynamic-item';
        div.innerHTML = `
            <div class="item-header">
                <div class="item-title"><i class="fas fa-briefcase" style="color: var(--accent-secondary); margin-right: 0.5rem;"></i> Experience #${index + 1}</div>
                <button type="button" class="remove-btn" onclick="removeWorkExperience(${exp.id})"><i class="fas fa-trash-alt"></i> Remove</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="expTitle-${exp.id}">Job/Internship Title</label>
                    <input type="text" id="expTitle-${exp.id}" name="expTitle-${exp.id}" class="form-control" placeholder="Software Engineer Intern" value="${exp.jobTitle}" oninput="updateWorkExperience(${exp.id}, 'jobTitle', this.value)">
                </div>
                <div class="form-group">
                    <label for="expCompany-${exp.id}">Company Name</label>
                    <input type="text" id="expCompany-${exp.id}" name="expCompany-${exp.id}" class="form-control" placeholder="Google" value="${exp.companyName}" oninput="updateWorkExperience(${exp.id}, 'companyName', this.value)">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="expStartDate-${exp.id}">Start Date (MM/YYYY)</label>
                    <input type="text" id="expStartDate-${exp.id}" name="expStartDate-${exp.id}" class="form-control" placeholder="01/2022" pattern="(0[1-9]|1[0-2])\\/\\d{4}" value="${exp.startDate}" oninput="updateWorkExperience(${exp.id}, 'startDate', this.value)">
                </div>
                <div class="form-group">
                    <label for="expEndDate-${exp.id}">End Date (MM/YYYY)</label>
                    <input type="text" id="expEndDate-${exp.id}" name="expEndDate-${exp.id}" class="form-control" placeholder="06/2022" pattern="(0[1-9]|1[0-2])\\/\\d{4}" value="${exp.endDate !== 'Present' ? exp.endDate : ''}" ${exp.isPresent ? 'disabled' : ''}>
                    <div class="checkbox-group">
                        <input type="checkbox" id="expPresent-${exp.id}" name="expPresent-${exp.id}" ${exp.isPresent ? 'checked' : ''} onchange="togglePresent(${exp.id}, 'workExperience', this.checked)">
                        <label for="expPresent-${exp.id}">Present</label>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="expDescription-${exp.id}">Description</label>
                <textarea id="expDescription-${exp.id}" name="expDescription-${exp.id}" class="form-control" placeholder="Developed and deployed a full-stack application..." oninput="updateWorkExperience(${exp.id}, 'description', this.value)"></textarea>
            </div>
        `;
        container.appendChild(div);
        const endDateInput = div.querySelector(`#expEndDate-${exp.id}`);
        if (endDateInput) endDateInput.addEventListener('input', (e) => { updateWorkExperience(exp.id, 'endDate', e.target.value); });
    });
}

// Projects functions
function addProject() {
    const id = Date.now();
    projectsData.push({ id, projectName: '', projectUrl: '', projectDescription: '' });
    renderProjects();
}

function removeProject(id) {
    projectsData = projectsData.filter(item => item.id !== id);
    renderProjects();
}

function updateProject(id, field, value) {
    const index = projectsData.findIndex(item => item.id === id);
    if (index !== -1) projectsData[index][field] = value;
    const inputElement = document.getElementById(`${field === 'projectName' ? 'projName' : field === 'projectUrl' ? 'projLink' : 'projDesc'}-${id}`);
    if (inputElement) setValidationError(inputElement, '');
}

function renderProjects() {
    const container = document.getElementById('projectsList');
    container.innerHTML = '';
    projectsData.forEach((project, index) => {
        const div = document.createElement('div');
        div.className = 'dynamic-item';
        div.innerHTML = `
            <div class="item-header">
                <div class="item-title"><i class="fas fa-code" style="color: var(--accent-tertiary); margin-right: 0.5rem;"></i> Project #${index + 1}</div>
                <button type="button" class="remove-btn" onclick="removeProject(${project.id})"><i class="fas fa-trash-alt"></i> Remove</button>
            </div>
            <div class="form-group">
                <label for="projName-${project.id}">Project Name</label>
                <input type="text" id="projName-${project.id}" name="projName-${project.id}" class="form-control" placeholder="Portfolio Website" value="${project.projectName}" oninput="updateProject(${project.id}, 'projectName', this.value)">
            </div>
            <div class="form-group">
                <label for="projLink-${project.id}">Project Link (Optional)</label>
                <input type="url" id="projLink-${project.id}" name="projLink-${project.id}" class="form-control" placeholder="https://github.com/your-project" value="${project.projectUrl}" oninput="updateProject(${project.id}, 'projectUrl', this.value)">
            </div>
            <div class="form-group">
                <label for="projDesc-${project.id}">Project Description</label>
                <textarea id="projDesc-${project.id}" name="projDesc-${project.id}" class="form-control" placeholder="A responsive personal portfolio built with React and Tailwind CSS." oninput="updateProject(${project.id}, 'projectDescription', this.value)"></textarea>
            </div>
        `;
        container.appendChild(div);
    });
}

// Skills functions
function renderSkills() {
    const skillsInputDiv = document.getElementById('skillsInput');
    skillsInputDiv.innerHTML = '';
    skillsData.forEach((skill, index) => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.innerHTML = `${skill} <i class="fas fa-times skill-remove" onclick="removeSkill(${index})"></i>`;
        skillsInputDiv.appendChild(span);
    });
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type a skill and press Enter';
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && this.value.trim() !== '') {
            event.preventDefault();
            addSkill(this.value.trim());
            this.value = '';
        }
    });
    skillsInputDiv.appendChild(input);
}

function addSkill(skill) {
    if (!skillsData.includes(skill)) {
        skillsData.push(skill);
        renderSkills();
    }
}

function removeSkill(index) {
    skillsData.splice(index, 1);
    renderSkills();
}

// Toggle 'Present' checkbox for end date/year
function togglePresent(id, type, isChecked) {
    if (type === 'education') updateEducation(id, 'isPresent', isChecked);
    else if (type === 'workExperience') updateWorkExperience(id, 'isPresent', isChecked);
    if (type === 'education') renderEducation();
    else if (type === 'workExperience') renderWorkExperience();
}

// Form submission
const resumeForm = document.getElementById('resumeForm');
const submitBtn = document.getElementById('submitBtn');

resumeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.classList.add('loading');
    clearAllValidationErrors();
    let firstInvalidInput = null;

    // Validate Basic Information (always required)
    const basicInfoFields = ['name', 'email', 'phone', 'location'];
    for (const fieldId of basicInfoFields) {
        const input = document.getElementById(fieldId);
        if (input.hasAttribute('required') && !input.value.trim()) {
            setValidationError(input, `This field is required.`);
            if (!firstInvalidInput) firstInvalidInput = input;
        } else if (input.type === 'email' && input.value.trim() && !/\S+@\S+\.\S+/.test(input.value.trim())) {
            setValidationError(input, `Please enter a valid email address.`);
            if (!firstInvalidInput) firstInvalidInput = input;
        } else {
            setValidationError(input, '');
        }
    }

    // Validate Education (always required to have at least one entry, and its fields filled)
    if (educationData.length === 0) {
        const eduSectionHeader = document.querySelector('.form-section:nth-of-type(2) .section-header');
        setValidationError(eduSectionHeader, 'Please add at least one education entry.');
        if (!firstInvalidInput) firstInvalidInput = eduSectionHeader;
    } else {
        for (const edu of educationData) {
            const fields = ['degreeName', 'instituteName', 'startYear', 'location'];
            for (const field of fields) {
                const input = document.getElementById(`edu${field.charAt(0).toUpperCase() + field.slice(1)}-${edu.id}`);
                if (input && !input.value.trim()) {
                    setValidationError(input, `Education ${field.replace('Name', ' Name')} is required.`);
                    if (!firstInvalidInput) firstInvalidInput = input;
                } else if (field.includes('Year') && input && input.value.trim() && !/^\d{4}$/.test(input.value.trim())) {
                    setValidationError(input, `Please enter a valid 4-digit year.`);
                    if (!firstInvalidInput) firstInvalidInput = input;
                } else {
                    if (input) setValidationError(input, '');
                }
            }
            const endYearInput = document.getElementById(`eduEndYear-${edu.id}`);
            if (endYearInput && !edu.isPresent && endYearInput.value.trim() && !/^\d{4}$/.test(endYearInput.value.trim())) {
                 setValidationError(endYearInput, `Please enter a valid 4-digit end year or check 'Present'.`);
                 if (!firstInvalidInput) firstInvalidInput = endYearInput;
            } else {
                if (endYearInput) setValidationError(endYearInput, '');
            }
        }
    }


    // Validate Work Experience ONLY IF there is at least one entry
    if (workExperienceData.length > 0) {
        for (const exp of workExperienceData) {
            const fields = ['jobTitle', 'companyName', 'startDate'];
            for (const field of fields) {
                const input = document.getElementById(`exp${field.charAt(0).toUpperCase() + field.slice(1)}-${exp.id}`);
                if (input && !input.value.trim()) {
                    setValidationError(input, `Experience ${field.replace('Title', ' Title').replace('Name', ' Name')} is required for this entry.`);
                    if (!firstInvalidInput) firstInvalidInput = input;
                } else if (field.includes('Date') && input && input.value.trim() && !/^(0[1-9]|1[0-2])\/\d{4}$/.test(input.value.trim())) {
                    setValidationError(input, `Please use MM/YYYY format.`);
                    if (!firstInvalidInput) firstInvalidInput = input;
                } else {
                    if (input) setValidationError(input, '');
                }
            }
            const endDateInput = document.getElementById(`expEndDate-${exp.id}`);
            if (endDateInput && !exp.isPresent && endDateInput.value.trim() && !/^(0[1-9]|1[0-2])\/\d{4}$/.test(endDateInput.value.trim())) {
                setValidationError(endDateInput, `Please use MM/YYYY format for end date or check 'Present'.`);
                if (!firstInvalidInput) firstInvalidInput = endDateInput;
            } else {
                if (endDateInput) setValidationError(endDateInput, '');
            }
        }
    }

    // Validate Projects ONLY IF there is at least one entry
    if (projectsData.length > 0) {
        for (const project of projectsData) {
            const input = document.getElementById(`projName-${project.id}`);
            if (input && !input.value.trim()) {
                setValidationError(input, `Project name is required for this entry.`);
                if (!firstInvalidInput) firstInvalidInput = input;
            } else {
                if (input) setValidationError(input, '');
            }
            const urlInput = document.getElementById(`projLink-${project.id}`);
            if (urlInput && urlInput.value.trim() && !/^https?:\/\/\S+\.\S+/.test(urlInput.value.trim())) {
                setValidationError(urlInput, `Please enter a valid URL (e.g., https://...).`);
                if (!firstInvalidInput) firstInvalidInput = urlInput;
            } else {
                if (urlInput) setValidationError(urlInput, '');
            }
        }
    }

    // Validate Objective and Achievements (if required attributes are added in HTML)
    const objectiveInput = document.getElementById('objective');
    if (objectiveInput.hasAttribute('required') && !objectiveInput.value.trim()) {
        setValidationError(objectiveInput, `Career Objective is required.`);
        if (!firstInvalidInput) firstInvalidInput = objectiveInput;
    } else {
        setValidationError(objectiveInput, '');
    }

    const achievementsInput = document.getElementById('achievements');
    if (achievementsInput.hasAttribute('required') && !achievementsInput.value.trim()) {
        setValidationError(achievementsInput, `Achievements & Certificates are required.`);
        if (!firstInvalidInput) firstInvalidInput = achievementsInput;
    } else {
        setValidationError(achievementsInput, '');
    }
    
    // Check if any error was found
    if (firstInvalidInput) {
        const sectionContent = firstInvalidInput.closest('.section-content');
        if (sectionContent) {
            if (!sectionContent.classList.contains('active')) {
                sectionContent.previousElementSibling.click();
            }
            setTimeout(() => {
                firstInvalidInput.focus();
                firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
        submitBtn.classList.remove('loading');
        return;
    }

    const formData = {
        selectedTemplateId: 1,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        objective: document.getElementById('objective').value,
        work_experience: workExperienceData.map(exp => ({
            title: exp.jobTitle,
            company: exp.companyName,
            duration: `${exp.startDate} - ${exp.isPresent ? 'Present' : exp.endDate}`,
            description: exp.description,
        })),
        education: educationData.map(edu => ({
            // FIX: Map frontend keys to backend expected keys
            degree: edu.degreeName,
            year: `${edu.startYear} - ${edu.isPresent ? 'Present' : edu.endYear}`, // Combine start and end year into 'year'
            institution: edu.instituteName,
            // location: edu.location, // Backend 'test_data' structure doesn't include 'location' here
        })),
        projects: projectsData.map(proj => ({
            // FIX: Map frontend keys to backend expected keys
            projectName: proj.projectName, // This was already `projectName` in your data, ensure backend uses this.
            projectLink: proj.projectUrl,  // This was already `projectUrl`, ensure backend uses `projectLink`
            projectDesc: proj.projectDescription // This was already `projectDescription`, ensure backend uses `projectDesc`
        })),
        skills: skillsData,
        additional_details: document
            .getElementById('achievements')
            .value.split(',')
            .map((detail) => detail.trim())
            .filter(detail => detail !== ''),
    };

    console.log('Resume Data:', JSON.stringify(formData, null, 2));

    try {
        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "resume.pdf";
            a.click();
            window.URL.revokeObjectURL(url);
            alert("Resume generated and downloading...");
        } else {
            const errorText = await response.text();
            console.error("Error response text:", errorText);
            alert("Failed to generate resume. Server responded with an error.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while generating the resume!");
    } finally {
        submitBtn.classList.remove('loading');
    }
});

// Initial render calls
initParticles();
renderEducation();
renderWorkExperience();
renderSkills();
renderProjects();

// Initially open the first section
document.querySelector('.section-header').click();