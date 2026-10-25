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
        ? "훈련 설정을 시작할 수 있습니다."
        : "동의 후 훈련 설정을 시작할 수 있습니다.";
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

const traingFlow = document.querySelector("#traing-flow");
const flowSteps = traingFlow.querySelectorAll(".step");
const progressItems = traingFlow.querySelectorAll(".progress_item");
const titleInput = document.querySelector("#presentation-title");
const titleError = document.querySelector("#title-error");
const titleNext = document.querySelector("#title-next");
const durationRange = document.querySelector("#duration-range");
const durationValue = document.querySelector("#duration-value");
const qnaOption = document.querySelector("#qna-option");
const qnaOptions = document.querySelector("#qna-options");
const optionPrev = document.querySelector("#option-prev");
const optionNext = document.querySelector("#option-next");
const summaryPrev = document.querySelector("#summary-prev");
const finishButton = document.querySelector("#finish-button");
const restartButton = document.querySelector("#restart-button");
const summaryTitle = document.querySelector("#summary-title");
const summaryDuration = document.querySelector("#summary-duration");
const summaryQna = document.querySelector("#summary-qna");
const durationValues =["3","5","10"];

const formData = {
    title:"", duration:"5", qna:false, qnaCount:"2"
};

function showStep(index){
    flowSteps.forEach((step, i) => {step.hidden = i !== index;});
    progressItems.forEach((item, i) => {
        item.classList.toggle("is-active", i === index);
    });
}

const recordingDialog = document.querySelector("#recording-dialog");
const recordingCancel = document.querySelector("#recording-cancel");
const recordingConfirm = document.querySelector("#recording-confirm");

function revokeRecordingAreement(){
    agreeCheck.checked = false;
    trainingFlow.hidden = true;
    handleAgreeChange();
    agreeCheck.focus();
}

startButton.addEventListener("click", () => {
    if(!agreeCheck.checked) return;
    recordingDialog.showModal();
});

recordingCancel.addEventListener("click", () => {
    recordingDialog.class();
    revokeRecordingAreement();
});

recordingDialog.addEventListener("cancel", revokeRecordingAreement);
recordingConfirm.addEventListener("click", () => {
    if (!agreeCheck.checked) return;
    recordingDialog.hidden = false;
    showStep(0);
    traingFlow.scrollIntoView({behavior:"smooth"});
    titleInput.focus();
});

function validateTitle(){
    const value = titleInput.value.trim();
    if(!value) {
        titleError.textContent = "발표 제목을 입력해 주세요.";
        titleInput.classList.add("has-error");
        titleInput.focus();
        return false;
    }

    titleError.textContent="";
    titleInput.classList.remove("has-error");
    formData.title = value;
    return true;
}

titleNext.addEventListener("click", () => {
    if (!validateTitle()) return;
    showStep(1);
});

durationRange.addEventListener("input", () => {
    durationValue.value = durationValues[durationRange.value] + "분";   
});

qnaOption.addEventListener("change", () => {
    qnaOptions.hidden = !qnaOption.checked;
});

optionPrev.addEventListener("click", () => showStep(0));
optionNext.addEventListener("click", () => {
    formData.duration = durationValues[durationRange.value];
    formData.qna = qnaOption.checked;
    const count = document.querySelector('input[name="qna-count"]:checked');
    formData.qnaCount = count.value;
    summaryTitle.textContent = formData.title;
    summaryDuration.textContent = formData.duration + "분";
    summaryQna.textContent = formData.qna ? formData.qnaCount + "개 포함" : "미포함";
    showStep(2);
});

summaryPrev.addEventListener("click", () => showStep(1));
finishButton.addEventListener("click", () => showStep(3));
restartButton.addEventListener("click", () => {
    formData.title = "";
    formData.duration ="5";
    formData.qna = false;
    formData.qnaCount = "2";
    titleInput.value = "";
    titleError.textContent = "";
    titleInput.classList.remove("has-error");
    durationRange.value = "1";
    durationValue.value = "5분";
    qnaOption.checked = false;
    qnaOptions.hidden = true;
    document.querySelector('input[name="qna-count"][value="2"]').checked = true;
    summaryTitle.textContent = "";
    summaryDuration.textContent = "";
    summaryQna.textContent = ""
    showStep(0);
});