const services = [
    {
      id: 1,
      title: "Bussinesscard Design",
      price: 300,
      description: "make your bussinesscard look better",
    },
    {
      id: 2,
      title: "Fruit Flayer Design",
      price: 455,
      description: "come join us to create fruit flayer",
    },
    {
      id: 3,
      title: "Application Interface Design",
      price: 250,
      description: "join to create best app interface design",
    },
    {
      id: 4,
      title: "Theme Development",
      price: 150,
      description: "come and let's create theme together",
    },
    {
      id: 5,
      title: "Creative Logo Design",
      price: 200,
      description: "crete the best logo by joining us",
    },
  ];
  
  const form = document.querySelector("#form");
  const app = document.querySelector("#app");
  const selectService = document.querySelector("#select");
  const qty = document.querySelector("#qty");
  const tbody = document.querySelector("#tbody");
  const subTotal = document.querySelector("#subTotal");
  const tax = document.querySelector("#tax");
  const total = document.querySelector("#total");
  const addServiceOpenBtn = document.querySelector("#addServiceOpenBtn");
  const addServiceForm = document.querySelector("#addServiceForm");
  const addServiceCloseBtn = document.querySelector("#addServiceCloseBtn");
  const exampleModal = new bootstrap.Modal("#exampleModal");
  
  const createTr = (service, quantity) => {
    const tr = document.createElement("tr");
    tr.setAttribute("service-id", service.id);
    const total = service.price * quantity;
    tr.innerHTML = `
    <td>${service.title}</td>
    <td>${service.description}</td>
    <td class=" text-end list-quantity">${quantity}</td>
    <td class=" text-end">${service.price}</td>
    <td class=" text-end list-total">${total}</td>
    `;
    return tr;
  };
  
  services.forEach(({ title, id }) =>
    selectService.append(new Option(title, id))
  );
  
  const find_tax = (amount, percentage = 5) => {
    return amount * (percentage / 100);
  };
  
  const find_total = () => {
    const sub_total = [...document.querySelectorAll(".list-total")].reduce(
      (pv, cv) => pv + parseFloat(cv.innerText),
      0
    );
    subTotal.innerText = sub_total;
    tax.innerText = find_tax(sub_total);
    total.innerText = sub_total + find_tax(sub_total);
  };
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = services.find(
      (service) => service.id == selectService.value
    );
    //   tbody.append(createTr(selected, qty.valueAsNumber));
  
    // console.log(selected)
    const existedService = [...tbody.children].find(
      (tr) => tr.getAttribute("service-id") == selected.id
    );
    if (existedService) {
      const listQuantity = existedService.querySelector(".list-quantity");
      const listTotal = existedService.querySelector(".list-total");
      listQuantity.innerText =
        parseFloat(listQuantity.innerText) + qty.valueAsNumber;
      listTotal.innerText = parseFloat(listQuantity.innerText) * selected.price;
      // console.log(existedService)
    } else {
      tbody.append(createTr(selected, qty.valueAsNumber));
    }
    find_total();
    event.target.reset();
  });
  
  app.addEventListener("dblclick", (event) => {
    event.target.closest("tr").remove();
  });
  
  addServiceOpenBtn.addEventListener("click", () => {
    exampleModal.show();
  });
  
  addServiceForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(addServiceForm);
    // console.log(formData.get("serviceTitle"))
  
    const id = "id" + Date.now();
    services.push({
      id,
      title: formData.get("serviceTitle"),
      price: formData.get("servicePrice"),
      description: formData.get("description"),
    });
  
    selectService.append(new Option(formData.get("serviceTitle"), id));
  
    event.target.reset();
    exampleModal.hide();
  });