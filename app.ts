import {App} from "astal/gtk3"
import style from "./style.scss"
import SlightUIBAR from "./widgets/Bar"

App.start({
    css: style,
    instanceName: 'quiteasy-bar',
    main() {
        App.get_monitors().map(SlightUIBAR)
    },
});

// f