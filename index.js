let myLeads = [];

const inputBtn = document.getElementById("input-btn");
const textFieldEl = document.getElementById("input-el");
const ulEl = document.getElementById("list-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));


if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads(myLeads);
} else {
  console.log("we have no leads");
}

tabBtn.addEventListener("click", function saveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
  });
});

function renderLeads(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
          <a target='_blank' href='${leads[i]}'>
              ${leads[i]}
          </a>
      </li>
  `;
    //An alternative for innerHTML =>// const li = document.createElement("li")// li.textContent = myLeads[i]// ulEl.appendChild(li)
  }
  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function deleteLead() {
  localStorage.clear("myLeads");
  myLeads = [];
  renderLeads(myLeads);
});

inputBtn.addEventListener("click", function saveInput() {
  myLeads.push(textFieldEl.value);
  textFieldEl.value = "";

  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  renderLeads(myLeads);
});
