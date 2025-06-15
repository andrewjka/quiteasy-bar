import {Gtk} from "astal/gtk3";

function Language(): Gtk.Widget {
    const icon: string = "";

    const output = `RU ${icon}`;

    return <button hexpand className="Language-panel"
                   cursor="pointer">
        {output}
    </button>
}

export default Language;