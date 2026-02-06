//  Learn How To Get This Form Working
// https://youtu.be/HeF8AqbU9QY
// PreCodeCamp.com for more lessons

// * DEFINE JOB APPLICATION CLASS

class JobApplication {
  constructor() {
    this.jobApplications = [];
    this.loadJobApplicationsFromLocalStorage(); // Load existing data on instantiation
  }

  addJobApplication(jobApplication) {
    this.jobApplications.push(jobApplication);
    this.saveJobApplicationsToLocalStorage();
  }

  getAllJobApplications() {
    return this.jobApplications;
  }

  saveJobApplicationsToLocalStorage() {
    localStorage.setItem(
      "jobApplications",
      JSON.stringify(this.jobApplications)
    );
  }

  loadJobApplicationsFromLocalStorage() {
    let storedJobs = JSON.parse(localStorage.getItem("jobApplications")) || [];
    this.jobApplications = storedJobs;
  }

  clearJobApplications() {
    this.jobApplications = [];
    localStorage.removeItem("jobApplications"); // Ensure localStorage is also cleared
  }

  deleteJobApplication(index) {
    this.jobApplications.splice(index, 1);
    this.saveJobApplicationsToLocalStorage();
  }
}
// ** Form Information**
let formElement = document.querySelector("#job-application-form");
let jobApplications = new JobApplication();

formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const company = formElement["company"].value;
  const position = formElement["position"].value;
  const jobApplicationDate = formElement["date"].value;
  const status = formElement["status"].value;
  const notes = formElement["notes"].value;

  let jobApplicationData = {
    company,
    position,
    jobApplicationDate,
    status,
    notes,
  };

  jobApplications.addJobApplication(jobApplicationData);

  alert("Job Application Submitted Successfully!");

  formElement.reset(); // Clear form inputs after submission
  displayDataAndBuildTable();
});

// ** Table Information**
let jobApplicationTableBodyElement = document.querySelector(
  "#job-application-table-body"
);

function clearTable() {
  jobApplicationTableBodyElement.innerHTML = "";
}

function displayDataAndBuildTable() {
  clearTable();
  const allJobApplications = jobApplications.getAllJobApplications();

  allJobApplications.forEach((jobApplication, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${jobApplication.company}</td>
      <td>${jobApplication.position}</td>
      <td>${jobApplication.jobApplicationDate}</td>
      <td>${jobApplication.status}</td>
      <td>${jobApplication.notes}</td>
      <td><button class="delete-btn" data-index="${index}">Delete</button></td>
    `;

    jobApplicationTableBodyElement.appendChild(row);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const index = event.target.dataset.index;
      jobApplications.deleteJobApplication(index);
      displayDataAndBuildTable();
    });
  });
}

displayDataAndBuildTable();
