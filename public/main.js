/**
 * @param chapter {string}
 */
const chapterType = (chapter) => chapter.split(".").pop();

const player = window.RufflePlayer.newest().createPlayer();
player.backgroundColor = "#000000";
player.id = "media";

const image = document.createElement("img");
image.id = "media";
image.src =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
image.alt = "";

window.wp = player;

/**
 * @param chapter {string}
 */
function loadChapter(chapter) {
  const media = `${window.baseDir}chapters/${chapter}`;

  // Clear any media currently loaded
  document.getElementById("media")?.remove();

  if (chapterType(chapter) == "swf") {
    document.getElementById("chapterView").appendChild(player);
    player.load(media);
  } else {
    image.src = media;
    document.getElementById("chapterView").appendChild(image);
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
      case "ArrowUp":
        event.preventDefault();
        seekChapter("previous");
        break;

      case "ArrowDown":
        event.preventDefault();
        seekChapter("next");
        break;

      case "Space":
        event.preventDefault();
        player.enterFullscreen();
        break;

      case "ArrowRight":
        event.preventDefault();
        if (!document.getElementById("chapterView").contains(player)) break;
        player
          .contextMenuItems()
          .find((e) => e?.text == "Forward")
          .onClick();
        break;

      case "ArrowLeft":
        event.preventDefault();
        if (!document.getElementById("chapterView").contains(player)) break;
        player
          .contextMenuItems()
          .find((e) => e?.text == "Back")
          .onClick();
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
