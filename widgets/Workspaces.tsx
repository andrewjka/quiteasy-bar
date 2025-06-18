import {bind, exec} from "astal";
import Hyprland from "gi://AstalHyprland?version=0.1";
import {Gtk} from "astal/gtk3";
import Hyprctl from "../services/Hyprctl";

// custom type for workspace
interface Workspace {
    id: number;
    icon: string;
}

interface WorkspacesProps {
    defaultWorkspaces: Workspace[];
    defaultIcon: string;
}

function Workspaces(props: WorkspacesProps): Gtk.Widget {
    const hyprland: Hyprland.Hyprland = Hyprland.get_default()
    const hyprctl: Hyprctl = Hyprctl.get_default();

    // bindings
    const _workspaces = bind(hyprland, "workspaces");
    const _focusedWorkspace = bind(hyprland, "focusedWorkspace");

    // handlers
    function OnClick(workspace_id: number) {
        hyprctl.dispatch('workspace', workspace_id);
    }

    return <box className="Workspaces-panel">
        {_workspaces.as(_workspaces => {
            const workspaces: Workspace[] = _workspaces.map(workspace => (
                    {
                        id: workspace.id,
                        icon: props.defaultWorkspaces.find(default_workspace =>
                            default_workspace.id == workspace.id
                        )?.icon ?? props.defaultIcon
                    }
                )
            );

            // What's all this for anyway ?
            // for default workspaces that are always displayed independently.
            for (const default_workspace of props.defaultWorkspaces) {
                const is_defined: boolean = workspaces.some(
                    (workspace: Workspace) => workspace.id == default_workspace.id
                );

                if (!is_defined) {
                    workspaces.push(default_workspace);
                }
            }

            const sorted: Workspace[] = workspaces.sort(
                (a, b) => a.id - b.id
            );

            return sorted.map(workspace =>
                <button hexpand className={_focusedWorkspace.as(focusedWorkspace =>
                    focusedWorkspace.id == workspace.id ? "workspace active" : "workspace")}
                        cursor="pointer"
                        onClick={() => OnClick(workspace.id)}>
                    <label className="workspace-icon">
                        {workspace.icon}
                    </label>
                </button>
            )
        })}
    </box>
}

export default Workspaces;