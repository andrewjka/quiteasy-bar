import {App, Astal, Gdk, Gtk} from "astal/gtk3"
import Workspaces from "./Workspaces";
import SystemMenu from "./SystemMenu";
import Language from "./Language";
import Temperature from "./Temperature";
import DateTime from "./DateTime";
import { execAsync} from "astal";
import {clocks, cpu_monitor} from "../constants/app_names";


function Window({monitor, child}: { monitor: Gdk.Monitor, child?: Gtk.Widget }): Gtk.Widget {
    const {LEFT, TOP, RIGHT} = Astal.WindowAnchor;

    return <window
        className="Canvas"
        gdkmonitor={monitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        layer={Astal.Layer.BOTTOM}
        anchor={LEFT | TOP | RIGHT}
        application={App}>
        {child}
    </window>
}

export default function QiteasyBar(gdkmonitor: Gdk.Monitor): Gtk.Widget {
    return <Window
        monitor={gdkmonitor}>
        {
            // Centring the bar
        }
        <box hexpand
             className="Layout">
            <eventbox hexpand className={"Bar"}>
                {
                    // eventbox must have 1 child element, so it is just fix the issue
                }
                <centerbox hexpand className={"Content"}>
                    <box hexpand
                         halign={Gtk.Align.START}
                         className={"Group"}>
                        {/*<LogoFedora/>*/}
                        <Workspaces
                            defaultIcon={''}
                            defaultWorkspaces={[
                                {id: 1, icon: ''},
                                {id: 2, icon: ''},
                                {id: 3, icon: ''},
                                {id: 4, icon: ''},
                            ]}/>
                    </box>
                    <box hexpand
                         halign={Gtk.Align.CENTER}
                         className={"Group"}>
                        <DateTime format='%I:%M %p | %b %e'
                                  OnClick={() => execAsync(['/bin/bash', '-c', clocks])}/>
                    </box>
                    <box hexpand
                         halign={Gtk.Align.END}
                         className={"Group"}>
                        <Temperature title="CPU"
                                     hwmon_path="/sys/class/hwmon/hwmon3/temp1_input"
                                     interval={4}
                                     OnClick={() => execAsync(["/bin/bash", "-c", cpu_monitor])}/>
                        <Language/>
                        <SystemMenu/>
                    </box>
                </centerbox>
            </eventbox>
        </box>
    </Window>
}
