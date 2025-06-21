import {bind, GLib, Variable} from "astal";
import {Gtk} from "astal/gtk3";

function DateTime({format, OnClick}: { format: string, OnClick: () => void }): Gtk.Widget {

    const date = Variable<GLib.DateTime>(null!).poll(1000, () =>
        GLib.DateTime.new_now_local());

    return <button hexpand
                   className="DateTime-panel"
                   cursor="pointer"
                   onDestroy={() => date.drop()}
                   onClick={() => OnClick()}>
        {bind(date).as(x => x?.format(format))}
    </button>
}

export default DateTime;