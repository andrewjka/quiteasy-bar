import {bind, execAsync, GLib, Variable} from "astal";
import {Gtk} from "astal/gtk3";
import {clocks} from "../constants/app_names";

function Time({format = "%I:%M %p"}): Gtk.Widget {
    const icon = '';

    const time = Variable<GLib.DateTime>(null!).poll(1000, () =>
        GLib.DateTime.new_now_local());

    function OnClick() {
        // opening clocks
        execAsync(["/bin/bash", "-c", clocks]);
    }

    return <button hexpand
                   className="Time-panel"
                   cursor="pointer"
                   onDestroy={() => time.drop()}
                   onClick={() => OnClick()}>
        {bind(time).as(x => x?.format(format) + ` ${icon}`)}
    </button>
}

export default Time;