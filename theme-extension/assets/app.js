const text = `<div class="toggle-container"><div class='more-banner'></div><div class="blue-box"> <img src="https://cdn.shopify.com/s/files/1/0597/9330/9769/products/Frame11.png?v=1705486625" alt="" width="" height="" loading="lazy">
</div><div class='md-bk-rm flex-col'><div class="tagline"><h2>Protect+ Package Protection</h2><p>Protection Against Lost, Stolen or Damaged Goods</p></div><label class="switch"><input type="checkbox" id="toggleSwitch1" checked><span class="slider"></span></label> </div><p id="toggleStatus1"></p></div>`;
const escapedText = JSON.stringify(text);
let inner=`if(document.getElementsByClassName("theme-md")[0]){document.getElementsByClassName("theme-md")[0].innerHTML =""}`;
const variant = document.getElementById("variantDynamic").innerHTML;
const PercentagePriceData = document.getElementById("percentagePriceData").innerHTML;
const mimimumCostPrice = document.getElementById("mimimumCostPriceData").innerHTML;
const setEnabledisableToggle = document.getElementById("setEnabledisableToggleCheck").innerHTML;
console.log(variant, "variant fetching");
if (setEnabledisableToggle) {
   inner = `if(document.getElementsByClassName("theme-md")[0]){document.getElementsByClassName("theme-md")[0].innerHTML = ${escapedText};}`;

// Add your JavaScript code as a text node inside the script element
let jsvar = `if(document.getElementsByClassName("theme-md")[0]){
var toggleState = "true" === localStorage.getItem("checkboxStatus");

function updateToggleStatus(t) {
  document.getElementById("toggleStatus").textContent = ""
}

function callApiAddToCart() {
  var t = variant;
  console.log(t, "callApiAddToCart"),
  t = {
    items: [{
      id: t,
      quantity: 1,
      properties: {
        Insurance:"${PercentagePriceData} %",
        minmum_price:"${mimimumCostPrice}"
      }
    }]
  }
   console.log(t, "callApiAddToCart"), fetch(window.Shopify.routes.root + "cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(t)
  }).then(t => (window.location.href = "", t.json())).catch(t => {
    console.error("Error:", t)
  })
}

function callApiRemoveToCart() {
  var t = variant;
  console.log(t, "callApiRemoveToCart"), t = {
    id: t,
    quantity: 0
  }, fetch(window.Shopify.routes.root + "cart/change.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(t)
  }).then(t => (window.location.href = "", t.json())).catch(t => {
    console.error("Error:", t)
  })
}
updateToggleStatus(document.getElementById("toggleSwitch1").checked = toggleState), document.getElementById(
  "toggleSwitch1").addEventListener("change", function () {
  var t = this.checked;
  updateToggleStatus(t), localStorage.setItem("checkboxStatus", t), (t ? callApiAddToCart : callApiRemoveToCart)()
});}`;
var script = document.createElement("script");
var codes = document.createTextNode(inner);
script.appendChild(codes);
// Add your JavaScript code as a text node inside the script element
var code = document.createTextNode(jsvar);
script.appendChild(code);
// Append the script element to the head of the document
document.head.appendChild(script);
}
document.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM fully loaded and parsed",localStorage.getItem('variantIdData'));
  console.log(" percent loaded",localStorage.getItem('percentage'));
  console.log(" mimimumCostPrice loaded",localStorage.getItem('mimimumCostPrice'));
  setTimeout(function () {
    if (localStorage.getItem('percentage') && localStorage.getItem('mimimumCostPrice') && localStorage.getItem('variantIdData') && localStorage.getItem('checkboxStatus') === null) {
      console.log("HELLO");
      
      (t = {
      items: [
        {
          id: localStorage.getItem('variantIdData'),
          quantity: 1,
          properties: {
            _Insurance: `${localStorage.getItem('percentage')}%`,
            _minmum_price: `${localStorage.getItem('mimimumCostPrice')}`,
          },
        },
      ],
    }),
    console.log(t, 'callApiAddToCart'),
    fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(t),
    })
      .then((t) => ((window.location.href = ''), t.json()))
      .catch((t) => {
        console.error('Error:', t);
      });
      localStorage.setItem('checkboxStatus', 'true');
    }
    }, 5000);
});
