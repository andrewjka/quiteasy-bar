import GObject from "gi://GObject?version=2.0";
import {exec, execAsync, property, register} from "astal";
import Hyprland from "gi://AstalHyprland?version=0.1";

type layout = string;


function get_current_layout(): layout {
    const command = 'hyprctl devices -j | jq -r \'.keyboards[] | select(.main == true) | .active_keymap\'';

    return (exec(['/bin/bash', '-c', command])).slice(0, 2);
}

@register({GTypeName: "Hyprctl"})
class Hyprctl extends GObject.Object {
    static instance: Hyprctl;

    static get_default(): Hyprctl {
        if (!this.instance) {
            this.instance = new Hyprctl();
        }

        return this.instance;
    }


    private hyprland = Hyprland.get_default();
    private exec = async (command: string) => execAsync(['/bin/bash', '-c', `hyprctl ${command}`]);

    private current_layout: string = get_current_layout();


    @property(String)
    public get layout() {
        return this.current_layout;
    }

    public async switchxkblayout(device: 'current' | 'all' | string, cmd: 'next' | 'prev' | number) {
        const command = `switchxkblayout ${device} ${cmd}`;

        await this.exec(command);

        this.current_layout = get_current_layout();
        this.notify('layout');
    }

    public async dispatch(dispatcher: 'workspace', workspace: number): Promise<void> {
        const command = `dispatch workspace ${workspace}`;

        await this.exec(command);
    }

    public constructor() {
        super();

        const listening_change_layout = this.hyprland.connect('keyboard-layout', () => {
            this.current_layout = get_current_layout();
            this.notify('layout');
        });
    }
}

export default Hyprctl;