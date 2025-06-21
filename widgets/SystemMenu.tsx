import {Gtk} from "astal/gtk3";

function SystemMenu(): Gtk.Widget {
    const icon: string = '';

    return <button hexpand className="SystemMenu"
                   cursor="pointer">
        {icon}
    </button>
}

export default SystemMenu;