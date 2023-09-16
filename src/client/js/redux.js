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
  let liTags = "";
  while (i < state.contents.length) {
    liTags =
      liTags +
      `
      <li>
        <a href="${state.contents[i].id}".html>${state.contents[i].title}</a>
      </li>
    `;
    i = i + 1;
  }

  document.querySelector("#toc").innerHTML = `
    <nav>
      <ol>${liTags}</ol>
    </nav>
  `;
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
  document.querySelector("#content").innerHTML = `
    <article>
      <h2>HTML</h2>
      HTML is ...
    </article>
  `;
}

function reducer(state, action) {
  if (state === undefined) {
    return {
      contents: [
        { id: 1, title: "HTML", disc: "HTML is ..." },
        { id: 2, title: "CSS", disc: "CSS is ..." },
      ],
    };
  }
}
let store = createStore(reducer);

subject();
TOC();
control();
article();
