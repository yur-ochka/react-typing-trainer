export default function SettingsBar({
  themeSwitchChecked,
  handleSetThemeSwitchChecked,
}) {
  return (
    <div className="settings">
      <MenuButton></MenuButton>
      <ColorModeSwitch
        themeSwitchChecked={themeSwitchChecked}
        handleSetThemeSwitchChecked={handleSetThemeSwitchChecked}
      ></ColorModeSwitch>
    </div>
  );
}

function MenuButton() {
  return <div className="returnMenu"></div>;
}

function ColorModeSwitch({ themeSwitchChecked, handleSetThemeSwitchChecked }) {
  return (
    <div className="colorMode">
      <div className="switch">
        <span className="switch__slider">
          <div
            className={themeSwitchChecked ? "circle checked" : "circle"}
          ></div>
        </span>
        <input
          className="switch__input"
          type="checkbox"
          onChange={handleSetThemeSwitchChecked}
        ></input>
      </div>
    </div>
  );
}
