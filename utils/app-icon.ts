import {App, Astal, Gdk, Gtk,} from "astal/gtk3"
import Hyprland from "gi://AstalHyprland"

/*
* Finds the path to the application icon, given the current theme.
* @param client instance of app
* @param size prefered size for icon
* */
export function GetAppIcon(client: Hyprland.Client, size: number): string | null {
    const theme = Gtk.IconTheme.get_default();
    const icons: string[] = theme.list_icons(null);

    // without hashed value for each window
    const app_name: string = client.initial_class.split('._')[0];

    if (icons.includes(app_name)) {
        const icon_info = theme.lookup_icon(app_name, size, Gtk.IconLookupFlags.GENERIC_FALLBACK);

        return icon_info?.get_filename() ?? null;
    }

    return null;

}