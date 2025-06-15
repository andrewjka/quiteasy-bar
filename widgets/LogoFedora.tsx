import {Gtk} from "astal/gtk3";

function LogoFedora(): Gtk.Widget {
    const icon: string = "";

    return <label className="LogoFedora-panel"
                  tooltipText="created by andrewjka :3">
        {icon}
    </label>
}

export default  LogoFedora;