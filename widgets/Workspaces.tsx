import {bind} from "astal";
import Hyprland from "gi://AstalHyprland?version=0.1";
import {Gtk} from "astal/gtk3";
import GLib from "gi://GLib?version=2.0";

function Workspaces(): Gtk.Widget {
    const hyprland: Hyprland.Hyprland = Hyprland.get_default()

    const defaultIcon = '';
    const specificIcons: Map<number, string> = new Map<number, string>()
        .set(1, '')
        .set(2, '')
        .set(3, '')
        .set(4, '');

    //bindings
    const workspaces = bind(hyprland, "workspaces");
    const focusedWorkspace = bind(hyprland, "focusedWorkspace");

    return <box className="Workspaces-panel">
        {workspaces.as(workspaces =>
            workspaces
                .sort((a, b) => a.id - b.id)
                .map(workspace =>
                    <button hexpand className={focusedWorkspace.as(focusedWorkspace =>
                        focusedWorkspace == workspace ? "workspace active" : "workspace")}
                            cursor="pointer"
                            onClick={() => workspace.focus()}>
                        <label className="workspace-icon">
                            {specificIcons.get(workspace.id) ?? defaultIcon}
                        </label>
                    </button>
                ))}
    </box>
}

export default Workspaces;