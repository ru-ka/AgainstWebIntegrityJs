import { UAParser } from "https://deno.land/x/ua_parser_js@2.0.0-alpha.2/src/ua-parser.mjs";
const { browser, device } = UAParser(navigator.userAgent);

if (['Chrome', 'Chromium', 'Chrome WebView'].includes(browser.name) && !['console', 'mobile', 'tablet', 'smarttv', 'wearable', 'embedded'].includes(device.type) && localStorage.getItem("ChromeWebIntegrityWarningClosed") != "True") {
  var shadowHost = document.createElement('div');
  var shadowRoot = shadowHost.attachShadow({ mode: 'open' });

  var popupDiv = document.createElement('div');
  popupDiv.className = 'popup';

  var popupContent = document.createElement('div');
  popupContent.innerHTML = '<b>Google Chrome is developing a new standard</b> that <b>threatens privacy</b>, user freedom and <b>free speech</b>. Defend your freedom, <a href="https://www.mozilla.org/firefox/new/">chose Firefox</a>.<br><a href="https://openwebdefenders.org/">Learn more</a>.';

  var closeButton = document.createElement('button');
  closeButton.innerHTML = '<span aria-hidden="true"></span>';
  closeButton.className = 'close-button';
  closeButton.ariaLabel = "Close";
  closeButton.addEventListener('click', function() {
    localStorage.setItem("ChromeWebIntegrityWarningClosed", "True");
    shadowRoot.removeChild(popupDiv);
  });

  popupDiv.appendChild(popupContent);
  popupDiv.appendChild(closeButton);

  var style = document.createElement('style');
  style.textContent = `
    .popup {
      position: fixed;
      width: calc(100% - 17px);
      top: 0;
      left: 0;
      background-color: #f2f2f2;
      padding: 10px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    .popup > * {
      color: black;
    }

    @media screen and (max-width: 600px) {
      .popup {
        flex-direction: column;
        gap: 10px;
      }
      .close-button {
        width: 100%;
        box-sizing: border-box;
        background-color: lightgreen !important;
        border-radius: 4px;
        padding: 5px;
      }
       .close-button > span:after {
        content: "Close" !important;
        font-weight: normal;
      }
    }

    .close-button {
      font-size: 16px;
      font-weight: bold;
      background: none;
      border: none;
      cursor: pointer;
    }
    .close-button > span:after {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-x-circle' viewBox='0 0 16 16'%3E%3Cpath d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/%3E%3Cpath d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
    }
  `;

  shadowRoot.appendChild(style);
  shadowRoot.appendChild(popupDiv);

  var firstChild = document.body.firstChild;
  document.body.insertBefore(shadowHost, firstChild);
}
