import { legacy_createStore as createStore } from "redux";

function subject() {
  document.querySelector("#subject").innerHTML = `
    <header>
      <h1>WEB</h1>
      hello, WEB!
    </header>
  `;
}
function TOC() {
  let state = store.getState();
  let i = 0;
  const NAV = document.createElement("nav");
  const OL = document.createElement("ol");

  while (i < state.contents.length) {
    let li = document.createElement("li");
    let btn = document.createElement("a");
    btn.innerText = state.contents[i].title;
    btn.classList.add("btn-toc");
    li.appendChild(btn);
    OL.appendChild(li);
    i = i + 1;
  }
  NAV.appendChild(OL);
  document.querySelector("#toc").innerHTML = "";
  document.querySelector("#toc").appendChild(NAV);

  const BTNS = document.querySelectorAll(".btn-toc");
  for (let idx = 0; idx < BTNS.length; idx++) {
    BTNS[idx].onclick = (event) => {
      event.preventDefault();
      let action = { type: "SELECT", id: state.contents[idx].id };
      store.dispatch(action);
    };
  }
}
function control() {
  document.querySelector("#control").innerHTML = `
    <ul>
      <li><a href="/create">create</a></li>
      <li><input type="button" value="delete" /></li>
    </ul>
  `;
}
function article() {
  let state = store.getState();

  if (state.mode === "create") {
    const ARTICLE = document.createElement("article");
    const FORM = document.createElement("form");
    const P1 = document.createElement("p");
    const P2 = document.createElement("p");
    const P3 = document.createElement("p");
    const INPUT_T = document.createElement("input");
    const INPUT_S = document.createElement("input");
    const TEXTAREA = document.createElement("textarea");

    INPUT_T.type = "text";
    INPUT_T.name = "title";
    INPUT_T.placeholder = "text";
    TEXTAREA.name = "desc";
    TEXTAREA.placeholder = "description";
    INPUT_S.type = "submit";

    P1.appendChild(INPUT_T);
    P2.appendChild(TEXTAREA);
    P3.appendChild(INPUT_S);
    FORM.appendChild(P1);
    FORM.appendChild(P2);
    FORM.appendChild(P3);
    ARTICLE.appendChild(FORM);
    document.querySelector("#content").appendChild(ARTICLE);

    const FORM_EL = document.querySelector("form");

    FORM_EL.onsubmit = (event) => {
      event.preventDefault();
      let _title = event.target.querySelector("input[name='title']").value;
      let _desc = event.target.querySelector("textarea[name='desc']").value;
      store.dispatch({
        type: "CREATE",
        title: _title,
        desc: _desc,
      });
    };
  } else if (state.mode === "read") {
    let aTitle, aDesc;
    let i = 0;
    while (i < state.contents.length) {
      if (state.contents[i].id === state.selected_id) {
        aTitle = state.contents[i].title;
        aDesc = state.contents[i].desc;
        break;
      }
      i = i + 1;
    }
    document.querySelector("#content").innerHTML = `
      <article>
        <h2>${aTitle}</h2>
        ${aDesc}
      </article>
    `;
  }
}

function reducer(state, action) {
  if (state === undefined) {
    return {
      max_id: 2,
      mode: "create",
      selected_id: 1,
      contents: [
        { id: 1, title: "HTML", desc: "HTML is ..." },
        { id: 2, title: "CSS", desc: "CSS is ..." },
      ],
    };
  }
  let newState;
  if (action.type === "SELECT") {
    newState = Object.assign({}, state, { selected_id: action.id });
  } else if (action.type === "CREATE") {
    var newMaxId = state.max_id + 1;
    var newContents = state.contents.concat();
    newContents.push({
      id: newMaxId,
      title: action.title,
      desc: action.desc,
    });
    newState = Object.assign({}, state, {
      max_id: newMaxId,
      contents: newContents,
      mode: "read",
    });
  }
  console.log(action, state, newState);
  return newState;
}
let store = createStore(reducer);

store.subscribe(article);
store.subscribe(TOC);

subject();
TOC();
control();
article();
