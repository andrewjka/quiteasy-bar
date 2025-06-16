import {Gtk} from "astal/gtk3";
import Hyprland from "gi://AstalHyprland?version=0.1";

function Language(): Gtk.Widget {
    const hyprland: Hyprland.Hyprland = Hyprland.get_default();

    const icon: string = "";

    const output = `RU ${icon}`;

    return <button hexpand className="Language-panel"
                   cursor="pointer">
        {output}
    </button>
}

export default Language;