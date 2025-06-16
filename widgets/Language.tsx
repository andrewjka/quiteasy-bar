import {Gtk} from "astal/gtk3";
import Hyprctl from "../services/Hyprctl";
import {bind} from "astal";

function Language(): Gtk.Widget {
    const hyprctl = Hyprctl.get_default();

    const icon: string = "";

    return <button hexpand className="Language-panel"
                   cursor="pointer"
                   onClick={() => hyprctl.switch_layout()}>
        {bind(hyprctl, 'layout').as((layout) => `${layout.toUpperCase()} ${icon}`)}
    </button>
}

export default Language;