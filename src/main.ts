import "./style.css";

type Email = {
  from: string;
  header: string;
  content: string;
  emailAddress: string;
  img: string;
  read: boolean;
  contains: boolean;
};
type Emails = {
  emails: Email[];
};

const state: Emails = {
  emails: [
    {
      from: "Nico",
      header: "Link to today's video and slides is up!",
      content:
        "Link is up and you know where to find it! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.",
      emailAddress: "nico@email.com",
      img: "assets/nico.JPG",
      read: false,
      contains: true,
    },
    {
      from: "Ed",
      header:
        "Congratulations! You have received a free beaver! Your name will now be displayed in the classroom's beaver list!",
      content:
        "Beaver beaver beaver beaver beaver beaver beaver beaver ! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.",
      emailAddress: "ed@email.com",
      img: "assets/ed.JPG",
      read: false,
      contains: true,
    },
    {
      from: "Government",
      header: "Time to pay your tax!",
      content:
        "Pay us now! Pay us now! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.",
      emailAddress: "government@email.com",
      img: "assets/gov.jpg",
      read: false,
      contains: true,
    },
  ],
};
let main = document.querySelector("main");
let filterEmails = document.querySelector<HTMLInputElement>(".filter-input");
if (filterEmails) filterEmails.addEventListener("input", filterEmailsAction);

function filterEmailsAction(e: any) {
  let filterInput = e.target.value;

  if (!main) return;
  for (let email of state.emails) {
    if (!email.from.includes(filterInput) && filterInput.length !== 0) {
      main.innerHTML = "";
      email.contains = false;
      renderEmails();
    } else {
      email.contains = true;
      main.innerHTML = "";
      renderEmails();
    }
  }
}
renderEmails();

function renderEmails() {
  if (!main) return;

  let inboxTitle = document.createElement("h1");
  inboxTitle.textContent = "Inbox";

  main.appendChild(inboxTitle);

  let emailsUl = document.createElement("ul");
  emailsUl.className = "emails-list";

  let emails = getEmails();
  for (let email of emails) {
    let emailList = document.createElement("li");
    emailList.className = "emails-list__item";
    emailList.addEventListener("click", () => {
      emailsUl.remove();
      inboxTitle.remove();
      email.read = true;
      clickEmail(email);
    });

    let mark = document.createElement("span");
    if (!email.read) {
      mark.className = "emails-list__item__read-icon material-symbols-outlined";
      mark.textContent = "mark_email_unread";
    } else {
      mark.className = "emails-list__item__read-icon material-symbols-outlined";
      mark.textContent = "mark_email_read";
    }

    let userAvatar = document.createElement("img");
    userAvatar.className = "emails-list__item__image";
    userAvatar.src = email.img;

    let senderName = document.createElement("p");
    senderName.className = "emails-list__item__from";
    senderName.textContent = email.from;

    let emailContent = document.createElement("p");
    emailContent.className = "emails-list__item__content";
    emailContent.textContent = email.content;

    emailList.append(mark, userAvatar, senderName, emailContent);
    emailsUl.appendChild(emailList);
  }
  main.appendChild(emailsUl);
}

function getEmails() {
  let emails = state.emails.filter((email) => email.contains);
  return emails;
}

function clickEmail(email: Email) {
  if (!main) return;

  let singleEmailSec = document.createElement("section");
  singleEmailSec.className = "single-email";

  let backBtn = document.createElement("button");
  backBtn.className = "single-email__button";
  backBtn.textContent = "⬅Back";
  backBtn.addEventListener("click", () => {
    singleEmailSec.remove();
    renderEmails();
  });

  let singleEmailSenderSec = document.createElement("div");
  singleEmailSenderSec.className = "single-email__sender-section";

  let singleEmailSenderAvatar = document.createElement("img");
  singleEmailSenderAvatar.className = "single-email__image";
  singleEmailSenderAvatar.src = email.img;

  let singleEmailSender = document.createElement("span");
  singleEmailSender.className = "single-email__sender";
  singleEmailSender.textContent = `${email.from} (${email.emailAddress})`;

  let singleEmailTitle = document.createElement("h1");
  singleEmailTitle.className = "single-email__header";
  singleEmailTitle.textContent = email.header;

  let singleEmailContent = document.createElement("p");
  singleEmailContent.className = "single-email__content";
  singleEmailContent.textContent = email.content;

  singleEmailSenderSec.append(singleEmailSenderAvatar, singleEmailSender);
  singleEmailSec.append(
    backBtn,
    singleEmailSenderSec,
    singleEmailTitle,
    singleEmailContent
  );
  main.appendChild(singleEmailSec);
}
