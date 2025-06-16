import {Gtk} from "astal/gtk3";
import {bind, exec, execAsync, Variable} from "astal";
import {cpu_monitor} from "../constants/app_names";


interface TemperatureProps {
    title: string;
    hwmon_path: string;
    interval: number;
}

function Temperature({title, hwmon_path, interval}: TemperatureProps): Gtk.Widget {
    const icon = '°C ';

    const temperature = Variable<number>(0).poll(interval * 1000,
        ['/bin/bash', '-c', `cat ${hwmon_path}`],
        (out, prev) => parseInt(out)
    );

    function OnClick() {
        // opening monitor
        execAsync(["/bin/bash", "-c", cpu_monitor]);
    }

    return <button hexpand
                   className="Temperature-panel"
                   cursor="pointer"
                   onDestroy={() => temperature.drop()}
                   tooltipText={title}
                   onClick={() => OnClick()}>
        {bind(temperature).as(temperature => (temperature / 1000).toFixed(1) + icon)}
    </button>
}

export default Temperature;