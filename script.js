const serviceName = "Re:hear";
let isSubscribed = false;
let submitCount = 0;

function makeSubcribeMessage(email, subscribed) {
    if (subscribed == true) {
        return email + "로 신청이 완료되었습니다.";
    }

    return "이메일을 입력한 뒤 신청해주세요.";
}

const subscribeForm = document.querySelector("#subscribe-form");
const emailInput = document.querySelector("#email");

const subscribebutton = document.querySelector("#subscribebutton");
const subscribeMessage = document.querySelector("#subscribeMessage");

function handleSubscribe(event) {
    event.preventDefault();

    const subscriberEmail = emailInput.value.trim();

    if (subscriberEmail === "") {
        subscribeMessage.textContent =
            "이메일을 입력한 뒤 신청해주세요.";
        emailInput.focus();
        return;
    }

    isSubscribed = true;
    submitCount += 1;

    subscribeMessage.textContent = 
        makeSubcribeMessage(subscriberEmail, isSubscribed);

    subscribeMessage.classList.add("is-success");

    subscribebutton.textContent = "신청 완료";
    subscribebutton.disabled = true;
}

subscribeForm.addEventListener("submit", handleSubscribe);

const themeButton = document.querySelector("#themeButton");
const nicknameInput = document.querySelector("#nickname");
const nicknameCount = document.querySelector("#nicknameCount");
const agreeCheckbox = document.querySelector("#agreeCheck");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

function handleThemeButtonClick(event) {
    const isDork = document.body.classList.toggle("dark");
    themeButton.textContent = isDork ? "라이트 테마로 바꾸기" : "다크 테마로 바꾸기";
}
themeButton.addEventListener("click", handleThemeButtonClick);
function handleNicknameInput(event) {
    const maxLength = nicknameInput.maxLength;
    const cuirrentLength = Math.min(nicknameInput.value.length, maxLength);
    nicknameCount.textContent =  cuirrentLength + " / " + maxLength;
}
nicknameInput.addEventListener("input", handleNicknameInput);
function handleAgreeChange(){
    const agree = agreeCheck.checked;
    startButton.disabled = !agree;
    agreeMessage.textContent = agree
        ? "훈련을 시작할 수 있습니다."
        : "동의 후 훈련을 시작할 수 있습니다.";
    if (agree) {
        agreeMessage.classList.remove("is-ready");

    } else {
        agreeMessage.classList.add("is-ready");
    }
}
agreeCheck.addEventListener("change", handleAgreeChange);

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function resetTabsAndPanels(){
    tabs.forEach(function(tab){
        tab.classList.remove("si-active");
        tab.setAttribute("aria-selected", "false");
    });
    panels.forEach(function(panel){
        panel.classList.remove("is-active");
        panel.hidden = true;
    });
}

function activateTab(clickedTab){
    const targetSelector = clickedTab.dataset.targer;
    const targetpanel = document.querySelector(targetSelector);

    clickedTab.classList.add("is-activate");
    clickedTab.setAttribute("aria-selected", "true");

    targetpanel.classList.add("is-active");
    targetpanel.hidden = false;
}

function handleTabClick(event){
    resetTabsAndPanels();
    activateTab(event.currentTarget);
}

tabs.forEach(function(tab){
    tab.addEventListener("click", handleTabClick);
});