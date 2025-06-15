import {bind, execAsync, GLib, Variable} from "astal";
import {Gtk} from "astal/gtk3";
import {calendar} from "../constants/app_names";

function Date({format = "%e %a %b"}): Gtk.Widget {
    const icon = '';

    const date = Variable<GLib.DateTime>(null!).poll(1000, () =>
        GLib.DateTime.new_now_local());

    function OnClick() {
        // opening calendar
        execAsync(["/bin/bash", "-c", calendar]);
    }

    return <button hexpand
                   className="Date-panel"
                   cursor="pointer"
                   onDestroy={() => date.drop()}
                   onClick={() => OnClick()}>
        {bind(date).as(x => x?.format(format) + ` ${icon}`)}
    </button>
}

export default Date;