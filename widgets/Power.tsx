import {Gtk} from "astal/gtk3";

function Power(): Gtk.Widget {
    const icon: string = "⏻";

    return <button hexpand className="Power-panel"
                   cursor="pointer">
        {icon}
    </button>
}

export default Power;