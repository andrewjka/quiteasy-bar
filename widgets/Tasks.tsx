import {bind} from "astal";
import {Gtk} from "astal/gtk3";
import Hyprland from "gi://AstalHyprland?version=0.1";
import {GetAppIcon} from "../utils/app-icon";

function Tasks(): JSX.Element {
    const hyprland: Hyprland.Hyprland = Hyprland.get_default();

    // bindings
    const clients = bind(hyprland, "clients"); // this binding is making CPU issue
    const focusedClient = bind(hyprland, "focusedClient");

    return <box className="Tasks-panel">
        {clients.as(clients =>
            clients
                .sort((a, b) => a.workspace.id - b.workspace.id)
                .map(client =>
                    <button hexpand className={focusedClient.as(focusedClient =>
                        focusedClient == client ? "Task active" : "Task")}
                            cursor="pointer"
                            tooltipText={client.title}
                            onClick={() => client.focus()}>
                        <icon className="icon"
                              gicon={GetAppIcon(client, 48)!}
                            // don't use icon,it's causing performance issues.
                        />
                    </button>
                ))}
    </box>
}

export default Tasks;