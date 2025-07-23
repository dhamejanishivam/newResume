        const BACKEND_URL = 'http://localhost:5000/api'; // Make sure this matches your Flask API endpoint

        // Global data arrays
        let educationData = [];
        let workExperienceData = [];
        let skillsData = [];
        let projectsData = [];

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
            
            // Close all other active sections
            document.querySelectorAll('.section-content.active').forEach(activeContent => {
                if (activeContent !== content) {
                    activeContent.classList.remove('active');
                    activeContent.previousElementSibling.querySelector('.chevron').classList.remove('rotated');
                }
            });

            // Toggle current section
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
            educationData.push({
                id,
                degreeName: '',
                startYear: '',
                endYear: '',
                instituteName: '',
                location: '',
                isPresent: false
            });
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
                    if (value) {
                        educationData[index].endYear = 'Present';
                    } else if (educationData[index].endYear === 'Present') {
                        educationData[index].endYear = ''; // Clear if unchecked from 'Present'
                    }
                } else {
                    educationData[index][field] = value;
                }
            }
        }

        function renderEducation() {
            const container = document.getElementById('educationList');
            container.innerHTML = '';

            if (educationData.length === 0) {
                addEducation(); // Add one empty entry by default if none exist
                return;
            }

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
                            <input type="text" id="eduDegree-${edu.id}" class="form-control" placeholder="B.Tech Computer Science" value="${edu.degreeName}" oninput="updateEducation(${edu.id}, 'degreeName', this.value)" required>
                        </div>
                        <div class="form-group">
                            <label for="eduInstitute-${edu.id}">Institution Name</label>
                            <input type="text" id="eduInstitute-${edu.id}" class="form-control" placeholder="Indian Institute of Technology Delhi" value="${edu.instituteName}" oninput="updateEducation(${edu.id}, 'instituteName', this.value)" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="eduStartYear-${edu.id}">Start Year</label>
                            <input type="text" id="eduStartYear-${edu.id}" class="form-control" placeholder="2018" pattern="\\d{4}" value="${edu.startYear}" oninput="updateEducation(${edu.id}, 'startYear', this.value)" required>
                        </div>
                        <div class="form-group">
                            <label for="eduEndYear-${edu.id}">End Year</label>
                            <input type="text" id="eduEndYear-${edu.id}" class="form-control" placeholder="2022" pattern="\\d{4}" value="${edu.endYear !== 'Present' ? edu.endYear : ''}" ${edu.isPresent ? 'disabled' : ''}>
                            <div class="checkbox-group">
                                <input type="checkbox" id="eduPresent-${edu.id}" ${edu.isPresent ? 'checked' : ''} onchange="togglePresent(${edu.id}, 'education', this.checked)">
                                <label for="eduPresent-${edu.id}">Present</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="eduLocation-${edu.id}">Location</label>
                        <input type="text" id="eduLocation-${edu.id}" class="form-control" placeholder="New Delhi, India" value="${edu.location}" oninput="updateEducation(${edu.id}, 'location', this.value)" required>
                    </div>
                `;
                container.appendChild(div);

                // Add event listener for end year input to update model immediately
                const endYearInput = div.querySelector(`#eduEndYear-${edu.id}`);
                if (endYearInput) {
                    endYearInput.addEventListener('input', (e) => {
                        updateEducation(edu.id, 'endYear', e.target.value);
                    });
                }
            });
        }

        // Work Experience functions
        function addWorkExperience() {
            const id = Date.now();
            workExperienceData.push({
                id,
                jobTitle: '',
                companyName: '',
                startDate: '',
                endDate: '',
                description: '',
                isPresent: false
            });
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
                    if (value) {
                        workExperienceData[index].endDate = 'Present';
                    } else if (workExperienceData[index].endDate === 'Present') {
                        workExperienceData[index].endDate = ''; // Clear if unchecked from 'Present'
                    }
                } else {
                    workExperienceData[index][field] = value;
                }
            }
        }

        function renderWorkExperience() {
            const container = document.getElementById('workExperienceList');
            container.innerHTML = '';

            if (workExperienceData.length === 0) {
                addWorkExperience(); // Add one empty entry by default if none exist
                return;
            }

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
                            <input type="text" id="expTitle-${exp.id}" class="form-control" placeholder="Software Engineer Intern" value="${exp.jobTitle}" oninput="updateWorkExperience(${exp.id}, 'jobTitle', this.value)" required>
                        </div>
                        <div class="form-group">
                            <label for="expCompany-${exp.id}">Company Name</label>
                            <input type="text" id="expCompany-${exp.id}" class="form-control" placeholder="Google" value="${exp.companyName}" oninput="updateWorkExperience(${exp.id}, 'companyName', this.value)" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="expStartDate-${exp.id}">Start Date (MM/YYYY)</label>
                            <input type="text" id="expStartDate-${exp.id}" class="form-control" placeholder="01/2022" pattern="(0[1-9]|1[0-2])\\/\\d{4}" value="${exp.startDate}" oninput="updateWorkExperience(${exp.id}, 'startDate', this.value)" required>
                        </div>
                        <div class="form-group">
                            <label for="expEndDate-${exp.id}">End Date (MM/YYYY)</label>
                            <input type="text" id="expEndDate-${exp.id}" class="form-control" placeholder="06/2022" pattern="(0[1-9]|1[0-2])\\/\\d{4}" value="${exp.endDate !== 'Present' ? exp.endDate : ''}" ${exp.isPresent ? 'disabled' : ''}>
                            <div class="checkbox-group">
                                <input type="checkbox" id="expPresent-${exp.id}" ${exp.isPresent ? 'checked' : ''} onchange="togglePresent(${exp.id}, 'workExperience', this.checked)">
                                <label for="expPresent-${exp.id}">Present</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="expDescription-${exp.id}">Description</label>
                        <textarea id="expDescription-${exp.id}" class="form-control" placeholder="Developed and deployed a full-stack application..." oninput="updateWorkExperience(${exp.id}, 'description', this.value)"></textarea>
                    </div>
                `;
                container.appendChild(div);

                const endDateInput = div.querySelector(`#expEndDate-${exp.id}`);
                if (endDateInput) {
                    endDateInput.addEventListener('input', (e) => {
                        updateWorkExperience(exp.id, 'endDate', e.target.value);
                    });
                }
            });
        }

        // Projects functions
        function addProject() {
            const id = Date.now();
            projectsData.push({
                id,
                projectName: '',
                projectUrl: '',
                projectDescription: ''
            });
            renderProjects();
        }

        function removeProject(id) {
            projectsData = projectsData.filter(item => item.id !== id);
            renderProjects();
        }

        function updateProject(id, field, value) {
            const index = projectsData.findIndex(item => item.id === id);
            if (index !== -1) {
                projectsData[index][field] = value;
            }
        }

        function renderProjects() {
            const container = document.getElementById('projectsList');
            container.innerHTML = '';

            if (projectsData.length === 0) {
                addProject(); // Add one empty entry by default if none exist
                return;
            }

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
                        <input type="text" id="projName-${project.id}" class="form-control" placeholder="Portfolio Website" value="${project.projectName}" oninput="updateProject(${project.id}, 'projectName', this.value)" required>
                    </div>
                    <div class="form-group">
                        <label for="projLink-${project.id}">Project Link (Optional)</label>
                        <input type="url" id="projLink-${project.id}" class="form-control" placeholder="https://github.com/your-project" value="${project.projectUrl}" oninput="updateProject(${project.id}, 'projectUrl', this.value)">
                    </div>
                    <div class="form-group">
                        <label for="projDesc-${project.id}">Project Description</label>
                        <textarea id="projDesc-${project.id}" class="form-control" placeholder="A responsive personal portfolio built with React and Tailwind CSS." oninput="updateProject(${project.id}, 'projectDescription', this.value)"></textarea>
                    </div>
                `;
                container.appendChild(div);
            });
        }

        // Skills functions
        function renderSkills() {
            const skillsInputDiv = document.getElementById('skillsInput');
            skillsInputDiv.innerHTML = ''; // Clear current tags

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
                    event.preventDefault(); // Prevent form submission
                    addSkill(this.value.trim());
                    this.value = ''; // Clear input
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
            if (type === 'education') {
                updateEducation(id, 'isPresent', isChecked);
            } else if (type === 'workExperience') {
                updateWorkExperience(id, 'isPresent', isChecked);
            }
            // Re-render to update disabled state and value
            if (type === 'education') {
                renderEducation();
            } else if (type === 'workExperience') {
                renderWorkExperience();
            }
        }


        // Form submission
        const resumeForm = document.getElementById('resumeForm');
        const submitBtn = document.getElementById('submitBtn');

        resumeForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Form validation
            if (!resumeForm.checkValidity()) {
                alert('Please fill out all required fields.');
                return;
            }

            submitBtn.classList.add('loading'); // Show loading state

            const formData = {
                selectedTemplateId: 1, // Hardcoded as per instructions
                // Basic Information
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                location: document.getElementById('location').value,
                objective: document.getElementById('objective').value,

                // Work Experience
                work_experience: workExperienceData.map(({ id, isPresent, ...rest }) => ({
                    title: rest.title,
                    company: rest.company,
                    duration: `${rest.startDate} - ${isPresent ? 'Present' : rest.endDate}`,
                    description: rest.description,
                })),

                // Education
                education: educationData.map(({ id, isPresent, ...rest }) => ({
                    ...rest,
                    endYear: isPresent ? 'Present' : rest.endYear,
                })),

                // Projects
                projects: projectsData.map(({ id, name }) => name),

                // Skills
                skills: skillsData,

                // Additional Details
                additional_details: document
                    .getElementById('achievements')
                    .value.split(',')
                    .map((detail) => detail.trim()),
                };

            console.log('Resume Data:', JSON.stringify(formData, null, 2));

            
            try {
                const response = await fetch(BACKEND_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                });
            
                if (response.ok) {
                // Handle successful response and trigger the file download
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "resume.pdf";  // You can set the filename as needed
                a.click();
            
                // Clean up the URL object after the download
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
            }
            });

        // Initial render calls
        initParticles();
        renderEducation(); // Render at least one education field on load
        renderWorkExperience(); // Render at least one work experience field on load
        renderSkills(); // Render skills input
        renderProjects(); // Render at least one project field on load

        // Initially open the first section
        document.querySelector('.section-header').click();