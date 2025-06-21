import {Gtk} from "astal/gtk3";
import {bind, exec, execAsync, Variable} from "astal";


interface TemperatureProps {
    title: string;
    hwmon_path: string;
    interval: number;
    OnClick: () => void;
}

function Temperature(props: TemperatureProps): Gtk.Widget {
    const icon = '°C ';

    const temperature = Variable<number>(0).poll(props.interval * 1000,
        ['/bin/bash', '-c', `cat ${props.hwmon_path}`],
        (out, prev) => parseInt(out)
    );

    return <button hexpand
                   className="Temperature-panel"
                   cursor="pointer"
                   onDestroy={() => temperature.drop()}
                   tooltipText={props.title}
                   onClick={() => props.OnClick()}>
        {bind(temperature).as(temperature => (temperature / 1000).toFixed(1) + icon)}
    </button>
}

export default Temperature;