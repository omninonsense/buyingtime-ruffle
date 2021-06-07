/**
 * @param chapter {string}
 */
const chapterType = (chapter) => chapter.split(".").pop();

/**
 * @param chapter {string}
 */
function loadChapter(chapter) {
  const media = `${window.baseDir}chapters/${chapter}`;

  // Clear any media currently loaded
  document.getElementById("media")?.remove();

  if (chapterType(chapter) == "swf") {
    const ruffle = window.RufflePlayer.newest();
    const player = ruffle.createPlayer();
    player.backgroundColor = "#000000";
    player.id = "media";

    document.getElementById("chapterView").appendChild(player);
    player.load(media);
  } else {
    let img = document.createElement("img");
    img.id = "media";
    img.src = media;
    // Honestly doubt accessibility is a concern here lol
    img.alt = "";

    document.getElementById("chapterView").appendChild(img);
  }
}

/**
 * @param {"next" | "previous" | "first" | "last"} command
 */
function seekChapter(command) {
  /** @type HTMLSelectElement */
  const select = document.getElementById("chapterSelector");

  switch (command) {
    case "next": {
      if (select.selectedIndex + 1 < select.options.length) {
        select.selectedIndex += 1;
      }

      break;
    }

    case "previous": {
      if (select.selectedIndex > 0) {
        select.selectedIndex -= 1;
      }

      break;
    }

    case "first": {
      select.selectedIndex = 0;
      break;
    }

    case "last": {
      select.selectedIndex = select.options.length - 1;
      break;
    }

    default:
      break;
  }

  select.dispatchEvent(new Event("change"), { bubbles: true });
}

function main() {
  /** @type HTMLSelectElement */
  const select = document.getElementById("chapterSelector");
  const first = document.getElementById("first");
  const next = document.getElementById("next");
  const previous = document.getElementById("previous");
  const last = document.getElementById("last");

  const hash = location.hash.slice(1);

  select.addEventListener("change", (event) => {
    let value = event.currentTarget.value;
    window.location.hash = value;
  });

  first.addEventListener("click", () => seekChapter("first"));
  last.addEventListener("click", () => seekChapter("last"));
  next.addEventListener("click", () => seekChapter("next"));
  previous.addEventListener("click", () => seekChapter("previous"));

  document.addEventListener("keydown", (event) => {
    switch (event.code) {
      case "ArrowLeft":
        seekChapter("previous");
        break;

      case "ArrowRight":
      case "Space":
        seekChapter("next");
        break;

      default:
        break;
    }
  });

  window.addEventListener(
    "hashchange",
    () => {
      let chapter = location.hash.slice(1);
      loadChapter(chapter);
    },
    { capture: false }
  );

  if (hash) {
    const index = [...select.options].findIndex((opt) => opt.value === hash);
    if (index !== -1) {
      select.selectedIndex = index;
      loadChapter(select.options[index].value);
    } else {
      seekChapter("first");
    }
  } else {
    seekChapter("first");
  }
}

main();
